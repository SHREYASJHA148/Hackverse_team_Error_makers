import React, { useState, useMemo } from 'react';
import {
  fullCorpus,
  allNewsHeadlines,
  getCorpusByTicker,
  getHeadlinesByTicker,
  getSentimentDistribution,
  getCorpusStats,
  getEdgeCaseScenarios,
  type DocumentChunk,
  type NewsHeadline,
} from '../data/mockCorpusData';
import './FinancialDashboard.css';

type SentimentFilter = 'all' | 'bullish' | 'neutral' | 'bearish';

interface TickerData {
  ticker: string;
  name: string;
  color: string;
}

const TICKERS: TickerData[] = [
  { ticker: 'RELIANCE.NS', name: 'Reliance Industries', color: '#3B82F6' },
  { ticker: 'TATASTEEL.NS', name: 'Tata Steel', color: '#F59E0B' },
  { ticker: 'INFY.NS', name: 'Infosys', color: '#10B981' },
];

const FinancialDashboard: React.FC = () => {
  const [selectedTicker, setSelectedTicker] = useState<string>('RELIANCE.NS');
  const [sentimentFilter, setSentimentFilter] = useState<SentimentFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'corpus' | 'news' | 'stats'>('corpus');
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const stats = useMemo(() => getCorpusStats(), []);
  const edgeCases = useMemo(() => getEdgeCaseScenarios(), []);

  const corpusData = useMemo(() => {
    const data = getCorpusByTicker(selectedTicker);
    if (!searchQuery) return data;
    return data.filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedTicker, searchQuery]);

  const newsData = useMemo(() => {
    const headlines = getHeadlinesByTicker(selectedTicker);
    if (sentimentFilter === 'all') return headlines;

    return headlines.filter((h) => {
      if (sentimentFilter === 'bullish') return h.sentimentScore > 0.3;
      if (sentimentFilter === 'neutral') return h.sentimentScore >= -0.3 && h.sentimentScore <= 0.3;
      if (sentimentFilter === 'bearish') return h.sentimentScore < -0.3;
      return true;
    });
  }, [selectedTicker, sentimentFilter]);

  const sentiment = useMemo(() => getSentimentDistribution(selectedTicker), [selectedTicker]);

  const currentTickerData = TICKERS.find((t) => t.ticker === selectedTicker);

  const getSentimentColor = (score: number): string => {
    if (score > 0.3) return '#10B981';
    if (score < -0.3) return '#EF4444';
    return '#8B5CF6';
  };

  const getSentimentLabel = (score: number): string => {
    if (score > 0.3) return 'Bullish';
    if (score < -0.3) return 'Bearish';
    return 'Neutral';
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="financial-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="main-title">📊 Financial RAG Pipeline</h1>
            <p className="subtitle">Multi-Agent Document Analysis & Sentiment Synthesis</p>
          </div>
          <div className="stats-badges">
            <div className="badge pulse">
              <span className="badge-label">Documents</span>
              <span className="badge-value">{stats.totalDocuments}</span>
            </div>
            <div className="badge pulse" style={{ animationDelay: '0.1s' }}>
              <span className="badge-label">Tickers</span>
              <span className="badge-value">{stats.totalTickers}</span>
            </div>
            <div className="badge pulse" style={{ animationDelay: '0.2s' }}>
              <span className="badge-label">Edge Cases</span>
              <span className="badge-value">{edgeCases.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Ticker Selector */}
        <section className="ticker-selector slide-in">
          <h2>Select Equity Ticker</h2>
          <div className="ticker-buttons">
            {TICKERS.map((t) => (
              <button
                key={t.ticker}
                className={`ticker-btn ${selectedTicker === t.ticker ? 'active' : ''}`}
                onClick={() => setSelectedTicker(t.ticker)}
                style={
                  selectedTicker === t.ticker
                    ? { borderColor: t.color, backgroundColor: `${t.color}15` }
                    : {}
                }
              >
                <span className="ticker-code">{t.ticker.split('.')[0]}</span>
                <span className="ticker-name">{t.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Sentiment Overview Card */}
        <section className="sentiment-overview fade-in">
          <h2>Sentiment Distribution</h2>
          <div className="sentiment-grid">
            <div className="sentiment-card bullish fade-in-up">
              <div className="sentiment-icon">📈</div>
              <div className="sentiment-content">
                <h3>Bullish</h3>
                <p className="sentiment-count">{sentiment.bullish}</p>
              </div>
            </div>
            <div className="sentiment-card neutral fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="sentiment-icon">➡️</div>
              <div className="sentiment-content">
                <h3>Neutral</h3>
                <p className="sentiment-count">{sentiment.neutral}</p>
              </div>
            </div>
            <div className="sentiment-card bearish fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="sentiment-icon">📉</div>
              <div className="sentiment-content">
                <h3>Bearish</h3>
                <p className="sentiment-count">{sentiment.bearish}</p>
              </div>
            </div>
            <div
              className="sentiment-card average fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="sentiment-icon">⚖️</div>
              <div className="sentiment-content">
                <h3>Average Score</h3>
                <p className="sentiment-count">{sentiment.averageScore.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="search-filter slide-in">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search corpus documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          {activeTab === 'news' && (
            <div className="filter-buttons">
              {(['all', 'bullish', 'neutral', 'bearish'] as const).map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${sentimentFilter === filter ? 'active' : ''}`}
                  onClick={() => setSentimentFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Tab Navigation */}
        <section className="tab-navigation">
          {(['corpus', 'news', 'stats'] as const).map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'corpus' && '📄 Documents'}
              {tab === 'news' && '📰 News'}
              {tab === 'stats' && '📊 Statistics'}
            </button>
          ))}
        </section>

        {/* Corpus Tab */}
        {activeTab === 'corpus' && (
          <section className="content-section">
            <div className="documents-list">
              {corpusData.length === 0 ? (
                <div className="empty-state fade-in">
                  <p>No documents found matching your search.</p>
                </div>
              ) : (
                corpusData.map((doc, idx) => (
                  <div
                    key={`${doc.docId}-${doc.chunkId}`}
                    className="document-card fade-in-up"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div
                      className="doc-header"
                      onClick={() =>
                        setExpandedDoc(
                          expandedDoc === `${doc.docId}-${doc.chunkId}`
                            ? null
                            : `${doc.docId}-${doc.chunkId}`
                        )
                      }
                      role="button"
                      tabIndex={0}
                    >
                      <div className="doc-meta">
                        <span className="doc-type-badge" title={doc.docType}>
                          {doc.docType === 'SEBI_FILING' && '🏛️'}
                          {doc.docType === 'EARNINGS_TRANSCRIPT' && '📞'}
                          {doc.docType === 'ANNUAL_REPORT' && '📑'}
                        </span>
                        <div className="doc-info">
                          <h3 className="doc-title">{doc.title}</h3>
                          <p className="doc-citation">{doc.citationLabel}</p>
                        </div>
                      </div>
                      <div className={`expand-icon ${expandedDoc === `${doc.docId}-${doc.chunkId}` ? 'expanded' : ''}`}>
                        ▼
                      </div>
                    </div>

                    {expandedDoc === `${doc.docId}-${doc.chunkId}` && (
                      <div className="doc-content expand-content">
                        <p>{doc.content}</p>
                        {doc.content.includes('EDGE CASE SCENARIO') && (
                          <div className="edge-case-badge">⚠️ Edge Case - Conflict Resolution Test</div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <section className="content-section">
            <div className="news-list">
              {newsData.length === 0 ? (
                <div className="empty-state fade-in">
                  <p>No news headlines found for this filter.</p>
                </div>
              ) : (
                newsData.map((news, idx) => (
                  <div
                    key={`${news.ticker}-${news.headline}`}
                    className="news-card fade-in-up"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="news-header">
                      <span
                        className="sentiment-badge"
                        style={{ backgroundColor: getSentimentColor(news.sentimentScore) }}
                      >
                        {getSentimentLabel(news.sentimentScore)}
                      </span>
                      <span className="sentiment-score">
                        Score: {(news.sentimentScore * 100).toFixed(0)}%
                      </span>
                    </div>
                    <h3 className="news-headline">{news.headline}</h3>
                    <div className="news-footer">
                      <span className="news-source">📑 {news.source}</span>
                      <span className="news-date">{formatDate(news.timestamp)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <section className="content-section">
            <div className="stats-container">
              <div className="stat-card fade-in-up">
                <h3>Total Documents</h3>
                <p className="stat-value">{stats.totalDocuments}</p>
              </div>
              <div className="stat-card fade-in-up" style={{ animationDelay: '0.05s' }}>
                <h3>Active Tickers</h3>
                <p className="stat-value">{stats.totalTickers}</p>
              </div>
              <div className="stat-card fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h3>Total Headlines</h3>
                <p className="stat-value">{stats.totalNewsHeadlines}</p>
              </div>
              <div className="stat-card fade-in-up" style={{ animationDelay: '0.15s' }}>
                <h3>Edge Cases</h3>
                <p className="stat-value">{stats.edgeCaseCount}</p>
              </div>

              <div className="doc-breakdown fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3>Documents by Type</h3>
                <div className="breakdown-items">
                  {Object.entries(stats.documentsByType).map(([type, count]) => (
                    <div key={type} className="breakdown-item">
                      <span className="breakdown-label">
                        {type === 'SEBI_FILING' && '🏛️ SEBI Filings'}
                        {type === 'EARNINGS_TRANSCRIPT' && '📞 Earnings Transcripts'}
                        {type === 'ANNUAL_REPORT' && '📑 Annual Reports'}
                      </span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${(count / stats.totalDocuments) * 100}%` }}
                        />
                      </div>
                      <span className="breakdown-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="edge-cases fade-in-up" style={{ animationDelay: '0.25s' }}>
                <h3>Edge Case Scenarios</h3>
                <div className="edge-cases-list">
                  {edgeCases.map((edgeCase, idx) => (
                    <div
                      key={`${edgeCase.docId}-${edgeCase.chunkId}`}
                      className="edge-case-item"
                      style={{ animationDelay: `${0.3 + idx * 0.05}s` }}
                    >
                      <span className="edge-case-ticker">{edgeCase.ticker}</span>
                      <p>{edgeCase.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="dashboard-footer slide-up">
        <p>🤖 Multi-Agent RAG Pipeline | Financial Data Synthesis & Analysis</p>
        <p className="footer-date">Ready for Production Deployment</p>
      </footer>
    </div>
  );
};

export default FinancialDashboard;
