import { useState, useMemo } from "react";
import { useHarvesting } from "../context/HarvestingContext";
import HoldingRow from "./HoldingRow";
import "./HoldingsTable.css";

const INITIAL_VISIBLE = 6;

function HoldingsTable() {
  const { holdings, selectedIndices, toggleSelectAll, loading, error } =
    useHarvesting();
  const [showAll, setShowAll] = useState(false);
  // null = default, 'asc' = low to high, 'desc' = high to low
  const [stcgSort, setStcgSort] = useState(null);

  const allSelected =
    holdings.length > 0 && selectedIndices.size === holdings.length;

  const toggleStcgSort = () => {
    setStcgSort((prev) => {
      if (prev === null) return "desc";
      if (prev === "desc") return "asc";
      return null;
    });
  };

  // Map holdings with original indices, then sort
  const sortedHoldings = useMemo(() => {
    const indexed = holdings.map((h, i) => ({ holding: h, originalIndex: i }));

    if (stcgSort === "desc") {
      indexed.sort((a, b) => b.holding.stcg.gain - a.holding.stcg.gain);
    } else if (stcgSort === "asc") {
      indexed.sort((a, b) => a.holding.stcg.gain - b.holding.stcg.gain);
    }

    return indexed;
  }, [holdings, stcgSort]);

  const visibleHoldings = showAll
    ? sortedHoldings
    : sortedHoldings.slice(0, INITIAL_VISIBLE);

  if (error) {
    return (
      <div className="holdings-section">
        <h3 className="holdings-title">Holdings</h3>
        <div className="holdings-error">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <span>Failed to load holdings data. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="holdings-section">
      <h3 className="holdings-title">Holdings</h3>
      <div className="table-wrapper">
        <table className="holdings-table">
          <thead>
            <tr>
              <th className="checkbox-header">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    id="select-all-checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
              </th>
              <th className="asset-header">Asset</th>
              <th className="holdings-col-header">
                <div>
                  <span>Holdings</span>
                  <span className="header-sub">Avg Buy Price</span>
                </div>
              </th>
              <th className="hide-mobile">Current Price</th>
              <th
                className="sortable-header hide-mobile"
                onClick={toggleStcgSort}
                title="Click to sort by Short-Term gain"
                id="sort-stcg-header"
              >
                <span className={`sort-arrow-single ${stcgSort ? "active" : ""}`}>
                  {stcgSort === "asc" ? "▲" : "▼"}
                </span>
                Short-Term
              </th>
              <th className="hide-mobile">Long-Term</th>
              <th className="hide-mobile">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: INITIAL_VISIBLE }).map((_, i) => (
                  <tr key={i} className="holding-row skeleton-row">
                    <td><div className="skeleton-box small" /></td>
                    <td><div className="skeleton-box medium" /></td>
                    <td><div className="skeleton-box medium" /></td>
                    <td className="hide-mobile"><div className="skeleton-box" /></td>
                    <td className="hide-mobile"><div className="skeleton-box" /></td>
                    <td className="hide-mobile"><div className="skeleton-box" /></td>
                    <td className="hide-mobile"><div className="skeleton-box small" /></td>
                  </tr>
                ))
              : visibleHoldings.map(({ holding, originalIndex }) => (
                  <HoldingRow
                    key={`${holding.coin}-${holding.coinName}-${originalIndex}`}
                    holding={holding}
                    index={originalIndex}
                    originalIndex={originalIndex}
                  />
                ))}
          </tbody>
        </table>
      </div>
      {!loading && holdings.length > INITIAL_VISIBLE && (
        <button
          className="view-all-btn"
          onClick={() => setShowAll(!showAll)}
          id="view-all-button"
        >
          {showAll ? "Show less" : "View all"}
        </button>
      )}
    </div>
  );
}

export default HoldingsTable;
