import PreHarvestingCard from "./PreHarvestingCard";
import AfterHarvestingCard from "./AfterHarvestingCard";
import "./CapitalGainsCards.css";

function CapitalGainsCards() {
  return (
    <div className="capital-gains-cards">
      <PreHarvestingCard />
      <AfterHarvestingCard />
    </div>
  );
}

export default CapitalGainsCards;
