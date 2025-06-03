import { useNavigate, useLocation } from "react-router-dom";
import { FiPieChart, FiPlusCircle } from "react-icons/fi";
import { FaExchangeAlt } from "react-icons/fa";
import "./FooterNav.css";

const FooterNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddClick = () => {
    window.dispatchEvent(new CustomEvent("startAddNavigation"));
  };

  const handleTransactionsClick = () => {
    window.dispatchEvent(new CustomEvent("startTransactionsNavigation"));
  };

  const handlePortfolioClick = () => {
    window.dispatchEvent(new CustomEvent("startPortfolioNavigation"));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <footer className="footer">
      <button onClick={handlePortfolioClick} className={`nav-item ${isActive("/portfolio") ? "active" : ""}`}>
        <FiPieChart />
        <span>Portfolio</span>
      </button>

      <button onClick={handleAddClick} className={`nav-item ${isActive("/add") ? "active" : ""}`}>
        <FiPlusCircle />
        <span>Add</span>
      </button>

      <button onClick={handleTransactionsClick} className={`nav-item ${isActive("/transactions") ? "active" : ""}`}>
        <FaExchangeAlt />
        <span>Movements</span>
      </button>
    </footer>
  );
};

export default FooterNav;