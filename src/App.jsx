import { HarvestingProvider } from "./context/HarvestingContext";
import Header from "./components/Header";
import Disclaimer from "./components/Disclaimer";
import CapitalGainsCards from "./components/CapitalGainsCards";
import HoldingsTable from "./components/HoldingsTable";
import "./App.css";
import "./components/Tooltip.css";

function App() {
  return (
    <HarvestingProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <div className="page-header">
            <h1 className="page-title">Tax Harvesting</h1>
            <div className="how-it-works-container">
              <span className="how-it-works">How it works?</span>
              <div className="how-it-works-tooltip">
                <p>
                  Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh
                  semper mattis scelerisque tellus. Vel mattis diam duis morbi
                  tellus dui consectetur. <a href="#" className="know-more">Know More</a>
                </p>
              </div>
            </div>
          </div>
          <Disclaimer />
          <div className="section-gap">
            <CapitalGainsCards />
          </div>
          <div className="section-gap">
            <HoldingsTable />
          </div>
        </main>
      </div>
    </HarvestingProvider>
  );
}

export default App;
