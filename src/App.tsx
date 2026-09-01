import React, { useState } from 'react';
import FinancialDashboard from './components/FinancialDashboard';
import PortfolioInsights from './components/PortfolioInsights';
import ReportPage from './components/ReportPage';
import './App.css';

type PageType = 'dashboard' | 'portfolio' | 'report';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="app-nav">
        <div className="nav-content">
          <div className="nav-brand">💼 Financial RAG</div>
          <div className="nav-links">
            <button
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-link ${currentPage === 'portfolio' ? 'active' : ''}`}
              onClick={() => setCurrentPage('portfolio')}
            >
              💼 Portfolio
            </button>
            <button
              className={`nav-link ${currentPage === 'report' ? 'active' : ''}`}
              onClick={() => setCurrentPage('report')}
            >
              📑 Report
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="page-content">
        {currentPage === 'dashboard' && <FinancialDashboard />}
        {currentPage === 'portfolio' && <PortfolioInsights />}
        {currentPage === 'report' && <ReportPage />}
      </div>
    </div>
  );
};

export default App;
