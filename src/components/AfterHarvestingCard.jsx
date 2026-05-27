import { useHarvesting } from "../context/HarvestingContext";
import { formatCurrency } from "../utils/formatters";
import "./AfterHarvestingCard.css";

function AfterHarvestingCard() {
  const { capitalGains, afterHarvestingGains, savings, loading } = useHarvesting();

  if (loading || !capitalGains || !afterHarvestingGains) {
    return (
      <div className="card card-blue">
        <h3 className="card-title-blue">After Harvesting</h3>
        <div className="card-skeleton">
          <div className="skeleton-line blue" />
          <div className="skeleton-line blue" />
          <div className="skeleton-line blue" />
          <div className="skeleton-line blue wide" />
        </div>
      </div>
    );
  }

  const stcgNet =
    afterHarvestingGains.stcg.profits - afterHarvestingGains.stcg.losses;
  const ltcgNet =
    afterHarvestingGains.ltcg.profits - afterHarvestingGains.ltcg.losses;
  const effectiveGains = stcgNet + ltcgNet;

  const stcgProfit = formatCurrency(afterHarvestingGains.stcg.profits);
  const ltcgProfit = formatCurrency(afterHarvestingGains.ltcg.profits);
  const stcgLoss = formatCurrency(-afterHarvestingGains.stcg.losses);
  const ltcgLoss = formatCurrency(-afterHarvestingGains.ltcg.losses);
  const stcgNetFmt = formatCurrency(stcgNet);
  const ltcgNetFmt = formatCurrency(ltcgNet);
  const effectiveFmt = formatCurrency(effectiveGains);
  const savingsFmt = formatCurrency(savings);

  return (
    <div className="card card-blue">
      <h3 className="card-title-blue">After Harvesting</h3>
      <table className="gains-table blue-table">
        <thead>
          <tr>
            <th></th>
            <th>Short-term</th>
            <th>Long-term</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="row-label-blue">Profits</td>
            <td data-tooltip={stcgProfit.exact}>{stcgProfit.display}</td>
            <td data-tooltip={ltcgProfit.exact}>{ltcgProfit.display}</td>
          </tr>
          <tr>
            <td className="row-label-blue">Losses</td>
            <td data-tooltip={stcgLoss.exact}>{stcgLoss.display}</td>
            <td data-tooltip={ltcgLoss.exact}>{ltcgLoss.display}</td>
          </tr>
          <tr className="net-row-blue">
            <td className="row-label-blue">Net Capital Gains</td>
            <td data-tooltip={stcgNetFmt.exact}>{stcgNetFmt.display}</td>
            <td data-tooltip={ltcgNetFmt.exact}>{ltcgNetFmt.display}</td>
          </tr>
        </tbody>
      </table>
      <div className="effective-row">
        <span className="effective-label">Effective Capital Gains:</span>
        <span className="effective-value" data-tooltip={effectiveFmt.exact}>{effectiveFmt.display}</span>
      </div>
      {savings > 0 && (
        <div className="savings-banner">
          <span className="savings-icon">🎉</span>
          <span>
            You are going to save upto{" "}
            <strong data-tooltip={savingsFmt.exact}>{savingsFmt.display}</strong>
          </span>
        </div>
      )}
    </div>
  );
}

export default AfterHarvestingCard;
