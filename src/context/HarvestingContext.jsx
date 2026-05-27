import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react";
import { fetchHoldings, fetchCapitalGains } from "../api/mockApi";

const HarvestingContext = createContext(null);

const initialState = {
  holdings: [],
  capitalGains: null,
  selectedIndices: new Set(),
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        holdings: action.holdings,
        capitalGains: action.capitalGains,
        loading: false,
      };
    case "SET_ERROR":
      return { ...state, error: action.error, loading: false };
    case "TOGGLE_SELECTION": {
      const newSet = new Set(state.selectedIndices);
      if (newSet.has(action.index)) {
        newSet.delete(action.index);
      } else {
        newSet.add(action.index);
      }
      return { ...state, selectedIndices: newSet };
    }
    case "SELECT_ALL": {
      const allIndices = new Set(
        state.holdings.map((_, i) => i)
      );
      return { ...state, selectedIndices: allIndices };
    }
    case "DESELECT_ALL":
      return { ...state, selectedIndices: new Set() };
    default:
      return state;
  }
}

export function HarvestingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [holdings, capitalGainsResponse] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        dispatch({
          type: "SET_DATA",
          holdings,
          capitalGains: capitalGainsResponse.capitalGains,
        });
      } catch (err) {
        dispatch({ type: "SET_ERROR", error: err.message });
      }
    };
    loadData();
  }, []);

  const toggleSelection = useCallback((index) => {
    dispatch({ type: "TOGGLE_SELECTION", index });
  }, []);

  const selectAll = useCallback(() => {
    dispatch({ type: "SELECT_ALL" });
  }, []);

  const deselectAll = useCallback(() => {
    dispatch({ type: "DESELECT_ALL" });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (state.selectedIndices.size === state.holdings.length) {
      deselectAll();
    } else {
      selectAll();
    }
  }, [state.selectedIndices.size, state.holdings.length, selectAll, deselectAll]);

  // Compute after-harvesting gains
  const afterHarvestingGains = useMemo(() => {
    if (!state.capitalGains) return null;

    const base = state.capitalGains;
    let addedStcgProfits = 0;
    let addedStcgLosses = 0;
    let addedLtcgProfits = 0;
    let addedLtcgLosses = 0;

    state.selectedIndices.forEach((index) => {
      const holding = state.holdings[index];
      if (!holding) return;

      // Short-term capital gains
      if (holding.stcg.gain > 0) {
        addedStcgProfits += holding.stcg.gain;
      } else if (holding.stcg.gain < 0) {
        addedStcgLosses += Math.abs(holding.stcg.gain);
      }

      // Long-term capital gains
      if (holding.ltcg.gain > 0) {
        addedLtcgProfits += holding.ltcg.gain;
      } else if (holding.ltcg.gain < 0) {
        addedLtcgLosses += Math.abs(holding.ltcg.gain);
      }
    });

    return {
      stcg: {
        profits: base.stcg.profits + addedStcgProfits,
        losses: base.stcg.losses + addedStcgLosses,
      },
      ltcg: {
        profits: base.ltcg.profits + addedLtcgProfits,
        losses: base.ltcg.losses + addedLtcgLosses,
      },
    };
  }, [state.capitalGains, state.selectedIndices, state.holdings]);

  // Compute savings
  const savings = useMemo(() => {
    if (!state.capitalGains || !afterHarvestingGains) return 0;

    const pre = state.capitalGains;
    const preRealised =
      pre.stcg.profits - pre.stcg.losses + (pre.ltcg.profits - pre.ltcg.losses);

    const post = afterHarvestingGains;
    const postRealised =
      post.stcg.profits - post.stcg.losses + (post.ltcg.profits - post.ltcg.losses);

    return preRealised - postRealised;
  }, [state.capitalGains, afterHarvestingGains]);

  const value = useMemo(
    () => ({
      ...state,
      afterHarvestingGains,
      savings,
      toggleSelection,
      selectAll,
      deselectAll,
      toggleSelectAll,
    }),
    [state, afterHarvestingGains, savings, toggleSelection, selectAll, deselectAll, toggleSelectAll]
  );

  return (
    <HarvestingContext.Provider value={value}>
      {children}
    </HarvestingContext.Provider>
  );
}

export function useHarvesting() {
  const context = useContext(HarvestingContext);
  if (!context) {
    throw new Error("useHarvesting must be used within a HarvestingProvider");
  }
  return context;
}
