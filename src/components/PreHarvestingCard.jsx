import { useHarvesting } from "../context/HarvestingContext";
import { formatCurrency } from "../utils/formatters";
import "./PreHarvestingCard.css";

function PreHarvestingCard() {
  const { capitalGains, loading } = useHarvesting();

  if (loading || !capitalGains) {
    return (
      <div className="card card-dark">
        <h3 className="card-title">Pre Harvesting</h3>
        <div className="card-skeleton">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line wide" />
        </div>
      </div>
    );
  }

  const stcgNet = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const ltcgNet = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
  const realisedGains = stcgNet + ltcgNet;

  const stcgProfit = formatCurrency(capitalGains.stcg.profits);
  const ltcgProfit = formatCurrency(capitalGains.ltcg.profits);
  const stcgLoss = formatCurrency(-capitalGains.stcg.losses);
  const ltcgLoss = formatCurrency(-capitalGains.ltcg.losses);
  const stcgNetFmt = formatCurrency(stcgNet);
  const ltcgNetFmt = formatCurrency(ltcgNet);
  const realisedFmt = formatCurrency(realisedGains);

  return (
    <div className="card card-dark">
      <h3 className="card-title">Pre Harvesting</h3>
      <table className="gains-table">
        <thead>
          <tr>
            <th></th>
            <th>Short-term</th>
            <th>Long-term</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="row-label">Profits</td>
            <td data-tooltip={stcgProfit.exact}>{stcgProfit.display}</td>
            <td data-tooltip={ltcgProfit.exact}>{ltcgProfit.display}</td>
          </tr>
          <tr>
            <td className="row-label">Losses</td>
            <td data-tooltip={stcgLoss.exact}>{stcgLoss.display}</td>
            <td data-tooltip={ltcgLoss.exact}>{ltcgLoss.display}</td>
          </tr>
          <tr className="net-row">
            <td className="row-label">Net Capital Gains</td>
            <td data-tooltip={stcgNetFmt.exact}>{stcgNetFmt.display}</td>
            <td data-tooltip={ltcgNetFmt.exact}>{ltcgNetFmt.display}</td>
          </tr>
        </tbody>
      </table>
      <div className="realised-row">
        <span className="realised-label">Realised Capital Gains:</span>
        <span className="realised-value" data-tooltip={realisedFmt.exact}>{realisedFmt.display}</span>
      </div>
    </div>
  );
}

export default PreHarvestingCard;
