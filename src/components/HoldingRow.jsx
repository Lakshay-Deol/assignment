import { memo } from "react";
import { useHarvesting } from "../context/HarvestingContext";
import { formatHolding, formatPrice, formatGain } from "../utils/formatters";

const HoldingRow = memo(function HoldingRow({ holding, index, originalIndex }) {
  const { selectedIndices, toggleSelection } = useHarvesting();
  const isSelected = selectedIndices.has(originalIndex);

  const currentPriceFmt = formatPrice(holding.currentPrice);
  const currentValueFmt = formatPrice(holding.totalHolding * holding.currentPrice);
  const stcgFormatted = formatGain(holding.stcg.gain);
  const ltcgFormatted = formatGain(holding.ltcg.gain);

  return (
    <tr
      className={`holding-row ${isSelected ? "selected" : ""}`}
      onClick={() => toggleSelection(originalIndex)}
    >
      <td className="checkbox-cell">
        <label className="custom-checkbox" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelection(originalIndex)}
            id={`holding-checkbox-${originalIndex}`}
          />
          <span className="checkmark"></span>
        </label>
      </td>
      <td className="asset-cell">
        <div className="asset-info">
          <img
            src={holding.logo}
            alt={holding.coin}
            className="asset-logo"
            onError={(e) => {
              e.target.src =
                "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
            }}
          />
          <div className="asset-names">
            <span className="asset-name">{holding.coinName}</span>
            <span className="asset-ticker">{holding.coin}</span>
          </div>
        </div>
      </td>
      <td className="holdings-cell">
        <div className="holdings-info">
          <span className="holdings-amount">
            {formatHolding(holding.totalHolding)} {holding.coin}
          </span>
          <span className="holdings-price" data-tooltip={currentValueFmt.exact}>
            {currentValueFmt.display}
          </span>
        </div>
      </td>
      <td className="value-cell hide-mobile" data-tooltip={currentPriceFmt.exact}>{currentPriceFmt.display}</td>
      <td className="gain-cell hide-mobile">
        <div className="gain-info">
          <span className={stcgFormatted.className} data-tooltip={stcgFormatted.exact}>
            {stcgFormatted.display}
          </span>
          <span className="gain-balance">
            {formatHolding(holding.stcg.balance)} {holding.coin}
          </span>
        </div>
      </td>
      <td className="gain-cell hide-mobile">
        <div className="gain-info">
          <span className={ltcgFormatted.className} data-tooltip={ltcgFormatted.exact}>
            {ltcgFormatted.display}
          </span>
          <span className="gain-balance">
            {formatHolding(holding.ltcg.balance)} {holding.coin}
          </span>
        </div>
      </td>
      <td className="sell-cell hide-mobile">
        {isSelected ? (
          <span className="sell-amount">
            {formatHolding(holding.totalHolding)} {holding.coin}
          </span>
        ) : (
          <span className="sell-dash">—</span>
        )}
      </td>
    </tr>
  );
});

export default HoldingRow;
