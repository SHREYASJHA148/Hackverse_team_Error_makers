import React, { useMemo } from 'react';
import {
  fullCorpus,
  allNewsHeadlines,
  getCorpusByTicker,
  getSentimentDistribution,
  type DocumentChunk,
  type NewsHeadline,
} from '../data/mockCorpusData';
import './PortfolioInsights.css';

interface TickerInsight {
  ticker: string;
  name: string;
  color: string;
  documentCount: number;
  newsCount: number;
  sentiment: {
    bullish: number;
    neutral: number;
    bearish: number;
    averageScore: number;
  };
}

const PortfolioInsights: React.FC = () => {
  const insights: TickerInsight[] = useMemo(() => {
    return [
      {
        ticker: 'RELIANCE.NS',
        name: 'Reliance Industries',
        color: '#3B82F6',
        documentCount: getCorpusByTicker('RELIANCE.NS').length,
        newsCount: allNewsHeadlines.filter(h => h.ticker === 'RELIANCE.NS').length,
        sentiment: getSentimentDistribution('RELIANCE.NS'),
      },
      {
        ticker: 'TATASTEEL.NS',
        name: 'Tata Steel',
        color: '#F59E0B',
        documentCount: getCorpusByTicker('TATASTEEL.NS').length,
        newsCount: allNewsHeadlines.filter(h => h.ticker === 'TATASTEEL.NS').length,
        sentiment: getSentimentDistribution('TATASTEEL.NS'),
      },
      {
        ticker: 'INFY.NS',
        name: 'Infosys',
        color: '#10B981',
        documentCount: getCorpusByTicker('INFY.NS').length,
        newsCount: allNewsHeadlines.filter(h => h.ticker === 'INFY.NS').length,
        sentiment: getSentimentDistribution('INFY.NS'),
      },
    ];
  }, []);

  const getSentimentTrend = (score: number): string => {
    if (score > 0.4) return 'Strong Bullish 📈';
    if (score > 0.1) return 'Bullish 📈';
    if (score > -0.1) return 'Neutral ➡️';
    if (score > -0.4) return 'Bearish 📉';
    return 'Strong Bearish 📉';
  };

  return (
    <div className="portfolio-insights">
      {/* Header */}
      <header className="insights-header">
        <div className="header-content">
          <h1 className="main-title">💼 Portfolio Insights</h1>
          <p className="subtitle">Multi-ticker sentiment analysis & financial overview</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="insights-main">
        {/* Overview Stats */}
        <section className="overview-stats slide-in">
          <h2>Portfolio Overview</h2>
          <div className="stats-grid">
            <div className="stat-box fade-in-up">
              <h3>Total Tickers</h3>
              <p className="stat-value">{insights.length}</p>
              <span className="stat-label">Covered equities</span>
            </div>
            <div className="stat-box fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3>Total Documents</h3>
              <p className="stat-value">{fullCorpus.length}</p>
              <span className="stat-label">Regulatory filings</span>
            </div>
            <div className="stat-box fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3>News Headlines</h3>
              <p className="stat-value">{allNewsHeadlines.length}</p>
              <span className="stat-label">Sentiment monitored</span>
            </div>
            <div className="stat-box fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3>Portfolio Health</h3>
              <p className="stat-value">
                {(
                  insights.reduce((sum, t) => sum + t.sentiment.averageScore, 0) /
                  insights.length
                ).toFixed(2)}
              </p>
              <span className="stat-label">Average sentiment</span>
            </div>
          </div>
        </section>

        {/* Ticker Cards */}
        <section className="ticker-insights fade-in">
          <h2>Ticker Analysis</h2>
          <div className="insights-grid">
            {insights.map((ticker, idx) => (
              <div
                key={ticker.ticker}
                className="insight-card fade-in-up"
                style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
              >
                <div className="card-header" style={{ borderLeftColor: ticker.color }}>
                  <h3 className="ticker-code">{ticker.ticker}</h3>
                  <p className="ticker-name">{ticker.name}</p>
                </div>

                <div className="card-body">
                  {/* Sentiment Gauge */}
                  <div className="sentiment-gauge">
                    <div className="gauge-label">Sentiment Trend</div>
                    <div className="gauge-value">
                      {getSentimentTrend(ticker.sentiment.averageScore)}
                    </div>
                    <div className="gauge-bar">
                      <div
                        className="gauge-fill"
                        style={{
                          width: `${((ticker.sentiment.averageScore + 1) / 2) * 100}%`,
                          backgroundColor: ticker.color,
                        }}
                      />
                    </div>
                    <div className="gauge-score">Score: {ticker.sentiment.averageScore.toFixed(2)}</div>
                  </div>

                  {/* Sentiment Breakdown */}
                  <div className="sentiment-breakdown">
                    <div className="breakdown-item bullish">
                      <span className="label">Bullish</span>
                      <span className="value">{ticker.sentiment.bullish}</span>
                    </div>
                    <div className="breakdown-item neutral">
                      <span className="label">Neutral</span>
                      <span className="value">{ticker.sentiment.neutral}</span>
                    </div>
                    <div className="breakdown-item bearish">
                      <span className="label">Bearish</span>
                      <span className="value">{ticker.sentiment.bearish}</span>
                    </div>
                  </div>

                  {/* Document Stats */}
                  <div className="document-stats">
                    <div className="stat-item">
                      <span className="icon">📄</span>
                      <span className="text">{ticker.documentCount} Documents</span>
                    </div>
                    <div className="stat-item">
                      <span className="icon">📰</span>
                      <span className="text">{ticker.newsCount} Headlines</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <button className="view-btn" onClick={() => window.location.href = '/'}>
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Insights Section */}
        <section className="insights-details slide-in">
          <h2>Key Insights</h2>
          <div className="insights-list">
            <div className="insight-item fade-in-up">
              <div className="insight-icon">🎯</div>
              <div className="insight-content">
                <h4>Sentiment-Weighted Analysis</h4>
                <p>
                  Portfolio exhibits mixed sentiment across sectors. Reliance shows strong retail growth
                  momentum but refinement margins under pressure. Tata Steel benefits from infrastructure
                  tailwinds while managing European operations restructuring. Infosys faces macro headwinds
                  but maintains strong deal pipeline.
                </p>
              </div>
            </div>

            <div className="insight-item fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="insight-icon">📊</div>
              <div className="insight-content">
                <h4>Document Coverage</h4>
                <p>
                  Comprehensive corpus includes {fullCorpus.length} regulatory documents spanning SEBI
                  filings, earnings transcripts, and annual reports. Each ticker has {fullCorpus.length / insights.length} documents
                  providing multi-dimensional financial insights for RAG pipeline ingestion.
                </p>
              </div>
            </div>

            <div className="insight-item fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="insight-icon">⚠️</div>
              <div className="insight-content">
                <h4>Risk Indicators</h4>
                <p>
                  Edge case scenarios identified for conflict resolution testing: debt vs. growth (Reliance),
                  regulatory risk vs. operational excellence (Tata Steel), and timing mismatches between
                  bookings and revenue recognition (Infosys).
                </p>
              </div>
            </div>

            <div className="insight-item fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="insight-icon">💡</div>
              <div className="insight-content">
                <h4>Recommendations</h4>
                <p>
                  Monitor sector-specific headwinds closely. Reliance: Watch refining margin recovery.
                  Tata Steel: Track European restructuring progress. Infosys: Assess client discretionary
                  spending normalization timeline. Portfolio maintains diversification across energy,
                  metals, and IT services.
                </p>
              </div>
            </section>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="insights-footer slide-up">
        <p>📊 Portfolio Intelligence Dashboard | Real-time Financial Analysis</p>
        <p className="footer-meta">Data sourced from regulatory filings & market sentiment</p>
      </footer>
    </div>
  );
};

export default PortfolioInsights;
