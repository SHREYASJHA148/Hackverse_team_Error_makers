import React, { useMemo } from 'react';
import {
  fullCorpus,
  allNewsHeadlines,
  getCorpusByTicker,
  getEdgeCaseScenarios,
  getSentimentDistribution,
  getCorpusStats,
  type DocumentChunk,
} from '../data/mockCorpusData';
import './ReportPage.css';

interface ReportSection {
  title: string;
  content: string;
  icon: string;
}

const ReportPage: React.FC = () => {
  const stats = useMemo(() => getCorpusStats(), []);
  const edgeCases = useMemo(() => getEdgeCaseScenarios(), []);

  const relianceSentiment = useMemo(() => getSentimentDistribution('RELIANCE.NS'), []);
  const tataSentiment = useMemo(() => getSentimentDistribution('TATASTEEL.NS'), []);
  const infySentiment = useMemo(() => getSentimentDistribution('INFY.NS'), []);

  const reportSections: ReportSection[] = [
    {
      title: 'Executive Summary',
      icon: '📋',
      content: `This comprehensive report analyzes three major Indian equity tickers (Reliance Industries, Tata Steel, and Infosys) using a multi-agent RAG pipeline. The analysis incorporates ${stats.totalDocuments} regulatory documents and ${stats.totalNewsHeadlines} news headlines to generate sentiment-weighted insights. The portfolio exhibits mixed sentiment patterns with ${edgeCases.length} identified edge cases for conflict resolution testing.`,
    },
    {
      title: 'Methodology',
      icon: '🔬',
      content: `The analysis employs a Retrieval-Augmented Generation (RAG) pipeline that integrates multiple data sources: (1) SEBI regulatory filings for compliance and financial disclosures, (2) Earnings call transcripts for management guidance and Q&A insights, (3) Annual reports for strategic direction, and (4) Real-time news sentiment streams. Each document is processed through NLP pipelines to extract financial metrics, sentiment indicators, and risk factors.`,
    },
    {
      title: 'Data Quality & Coverage',
      icon: '📊',
      content: `The corpus contains ${stats.totalDocuments} documents spanning three document types: SEBI Filings (${stats.documentsByType.SEBI_FILING}), Earnings Transcripts (${stats.documentsByType.EARNINGS_TRANSCRIPT}), and Annual Reports (${stats.documentsByType.ANNUAL_REPORT}). News sentiment analysis covers ${stats.totalNewsHeadlines} headlines with continuous sentiment scoring from -1.0 (bearish) to +1.0 (bullish). All data is synthetic and designed for RAG pipeline demonstration.`,
    },
    {
      title: 'Risk Assessment Framework',
      icon: '⚠️',
      content: `Identified ${edgeCases.length} edge case scenarios representing potential conflicts between positive and negative signals: Reliance faces growth vs. credit risk tension (strong revenue but rising debt), Tata Steel balances operational excellence with regulatory uncertainty, and Infosys navigates booking-revenue timing mismatches. These scenarios test the RAG system's ability to reconcile contradictory indicators.`,
    },
  ];

  return (
    <div className="report-page">
      {/* Header */}
      <header className="report-header">
        <div className="header-content">
          <h1 className="report-title">📑 Financial Analysis Report</h1>
          <p className="report-subtitle">Multi-Agent RAG Pipeline Analysis Report</p>
          <div className="report-meta">
            <span>Generated: September 1, 2026</span>
            <span>•</span>
            <span>Tickers: {stats.totalTickers}</span>
            <span>•</span>
            <span>Documents: {stats.totalDocuments}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="report-main">
        {/* Table of Contents */}
        <section className="table-of-contents slide-in">
          <h2>Table of Contents</h2>
          <div className="toc-list">
            <a href="#executive-summary" className="toc-item">1. Executive Summary</a>
            <a href="#methodology" className="toc-item">2. Methodology</a>
            <a href="#data-quality" className="toc-item">3. Data Quality & Coverage</a>
            <a href="#risk-assessment" className="toc-item">4. Risk Assessment</a>
            <a href="#ticker-analysis" className="toc-item">5. Ticker-Specific Analysis</a>
            <a href="#sentiment-analysis" className="toc-item">6. Sentiment Distribution</a>
            <a href="#edge-cases" className="toc-item">7. Edge Cases & Conflicts</a>
            <a href="#recommendations" className="toc-item">8. Recommendations</a>
          </div>
        </section>

        {/* Report Sections */}
        {reportSections.map((section, idx) => (
          <section
            key={section.title}
            className="report-section fade-in-up"
            style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
            id={section.title.toLowerCase().replace(/\s+/g, '-')}
          >
            <h2>
              <span className="section-icon">{section.icon}</span>
              {section.title}
            </h2>
            <p className="section-content">{section.content}</p>
          </section>
        ))}

        {/* Ticker Analysis */}
        <section className="ticker-analysis fade-in-up">
          <h2>
            <span className="section-icon">📈</span>
            Ticker-Specific Analysis
          </h2>

          <div className="ticker-reports">
            {/* RELIANCE */}
            <div className="ticker-report reliance-report">
              <h3>RELIANCE.NS - Reliance Industries</h3>
              <div className="report-body">
                <p>
                  <strong>Sector:</strong> Energy, Petrochemicals & Retail
                </p>
                <p>
                  Reliance demonstrates strong growth momentum with 12.3% YoY revenue growth and 18.5% YoY
                  retail expansion. However, the company faces margin compression in its O2C segment (EBITDA
                  margin 9.8%, down 180 bps) due to global refining margin pressures. The New Energy business
                  shows strategic commitment but execution delays and elevated capex (₹32,180 Cr in Q1) are
                  pressuring free cash flow generation (down 22% YoY).
                </p>
                <p>
                  <strong>Key Metrics:</strong> Net debt ₹1,28,340 Cr, debt-to-equity 0.42, Jio ARPU ₹195.3
                </p>
                <p>
                  <strong>Sentiment Score:</strong> {relianceSentiment.averageScore.toFixed(2)} (Bullish: {relianceSentiment.bullish}, Bearish: {relianceSentiment.bearish})
                </p>
              </div>
            </div>

            {/* TATASTEEL */}
            <div className="ticker-report tatasteel-report">
              <h3>TATASTEEL.NS - Tata Steel</h3>
              <div className="report-body">
                <p>
                  <strong>Sector:</strong> Metals & Mining
                </p>
                <p>
                  Tata Steel shows resilient domestic performance with 6.8% YoY deliveries growth (4.94 MT)
                  but faces headwinds from elevated coking coal costs and Chinese export surge creating margin
                  compression. European operations reported losses (£68M EBITDA loss) necessitating strategic
                  restructuring. The Kalinganagar brownfield expansion (8 to 13 MTPA) is on track for Q3
                  FY2027 commissioning, representing long-term capacity growth.
                </p>
                <p>
                  <strong>Key Metrics:</strong> Crude steel production 7.82 MT, realized prices ₹54,380/tonne,
                  net debt-to-EBITDA 2.8x
                </p>
                <p>
                  <strong>Sentiment Score:</strong> {tataSentiment.averageScore.toFixed(2)} (Bullish: {tataSentiment.bullish}, Bearish: {tataSentiment.bearish})
                </p>
              </div>
            </div>

            {/* INFOSYS */}
            <div className="ticker-report infy-report">
              <h3>INFY.NS - Infosys</h3>
              <div className="report-body">
                <p>
                  <strong>Sector:</strong> IT Services
                </p>
                <p>
                  Infosys maintains steady growth at 3.6% YoY constant currency with operating margins of 21.3%.
                  Large deal pipeline remains healthy (TCV $2.38B, 18 large deals in Q1) but macro uncertainties
                  persist. Digital services now contribute 64.8% of revenues, reflecting portfolio transformation.
                  Attrition improvement (12.8% LTM) and operational leverage gains provide structural support.
                  Client budget cycles remain elongated, tempering discretionary spending visibility.
                </p>
                <p>
                  <strong>Key Metrics:</strong> Revenues $4,824M, operating margin 21.3%, utilization 85.2%, FCF
                  ₹7,420 Cr
                </p>
                <p>
                  <strong>Sentiment Score:</strong> {infySentiment.averageScore.toFixed(2)} (Bullish: {infySentiment.bullish}, Bearish: {infySentiment.bearish})
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sentiment Analysis */}
        <section className="sentiment-section fade-in-up">
          <h2>
            <span className="section-icon">📊</span>
            Sentiment Distribution Analysis
          </h2>

          <div className="sentiment-grid">
            <div className="sentiment-card bullish-card">
              <h4>Bullish Headlines</h4>
              <p className="count">
                {relianceSentiment.bullish + tataSentiment.bullish + infySentiment.bullish}
              </p>
              <p className="description">Positive sentiment indicators across portfolio</p>
            </div>
            <div className="sentiment-card neutral-card">
              <h4>Neutral Headlines</h4>
              <p className="count">
                {relianceSentiment.neutral + tataSentiment.neutral + infySentiment.neutral}
              </p>
              <p className="description">Balanced market observations</p>
            </div>
            <div className="sentiment-card bearish-card">
              <h4>Bearish Headlines</h4>
              <p className="count">
                {relianceSentiment.bearish + tataSentiment.bearish + infySentiment.bearish}
              </p>
              <p className="description">Risk and headwind indicators</p>
            </div>
            <div className="sentiment-card overall-card">
              <h4>Portfolio Sentiment</h4>
              <p className="count">
                {(
                  (relianceSentiment.averageScore +
                    tataSentiment.averageScore +
                    infySentiment.averageScore) /
                  3
                ).toFixed(2)}
              </p>
              <p className="description">Average across all tickers</p>
            </div>
          </div>
        </section>

        {/* Edge Cases */}
        <section className="edge-cases-section fade-in-up">
          <h2>
            <span className="section-icon">⚠️</span>
            Edge Cases & Conflict Resolution
          </h2>

          <div className="edge-cases-list">
            {edgeCases.map((edgeCase, idx) => (
              <div
                key={`${edgeCase.docId}-${edgeCase.chunkId}`}
                className="edge-case-detail fade-in-up"
                style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
              >
                <div className="case-header">
                  <span className="case-ticker">{edgeCase.ticker}</span>
                  <h4>{edgeCase.title}</h4>
                </div>
                <div className="case-content">
                  <p>
                    {edgeCase.content.substring(0, 250)}
                    ...
                  </p>
                </div>
                <div className="case-badge">🧪 Conflict Resolution Test Case</div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="recommendations-section fade-in-up">
          <h2>
            <span className="section-icon">💡</span>
            Recommendations & Conclusions
          </h2>

          <div className="recommendations-list">
            <div className="recommendation-item">
              <h4>1. Monitor Refinement Margin Recovery</h4>
              <p>
                Reliance's O2C segment margin compression requires close tracking. Watch for recovery as
                global refining capacity rationalization materializes in H2 FY2026.
              </p>
            </div>

            <div className="recommendation-item">
              <h4>2. Track European Restructuring Progress</h4>
              <p>
                Tata Steel's Port Talbot transition to EAF technology is critical. Monitor capital deployment
                efficiency and timeline adherence for the £1.2B investment.
              </p>
            </div>

            <div className="recommendation-item">
              <h4>3. Assess Client Budget Normalization</h4>
              <p>
                Infosys faces macro headwinds with elongated deal cycles. Track discretionary spending
                normalization and margin guidance for FY2026-27 visibility.
              </p>
            </div>

            <div className="recommendation-item">
              <h4>4. Leverage RAG Pipeline for Conflict Detection</h4>
              <p>
                The identified edge cases demonstrate the RAG system's value in surfacing contradictory
                signals. Continue using multi-agent orchestration to reconcile leading vs. lagging indicators.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Appendix */}
        <section className="appendix-section fade-in-up">
          <h2>
            <span className="section-icon">🔧</span>
            Technical Appendix
          </h2>

          <div className="appendix-content">
            <h4>Corpus Composition</h4>
            <ul>
              <li>
                <strong>SEBI Filings:</strong> {stats.documentsByType.SEBI_FILING} documents covering Q1/Q2 FY2026
                regulatory disclosures
              </li>
              <li>
                <strong>Earnings Transcripts:</strong> {stats.documentsByType.EARNINGS_TRANSCRIPT} documents with
                management commentary
              </li>
              <li>
                <strong>Annual Reports:</strong> {stats.documentsByType.ANNUAL_REPORT} documents with strategic
                insights
              </li>
            </ul>

            <h4>Sentiment Scoring Methodology</h4>
            <p>
              Headlines are scored on a continuous scale from -1.0 (strongly bearish) to +1.0 (strongly bullish).
              Classification thresholds: Bullish (&gt;0.3), Neutral (-0.3 to 0.3), Bearish (&lt;-0.3).
            </p>

            <h4>Data Integrity</h4>
            <p>
              All data is synthetic and designed for demonstration purposes. Financial metrics are realistic but
              fictional. The corpus is optimized for multi-agent RAG pipeline evaluation and conflict resolution
              testing.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="report-footer slide-up">
        <p>📑 Financial Analysis Report | Multi-Agent RAG Pipeline</p>
        <p className="footer-note">
          This report is generated from synthetic financial data for demonstration purposes. For actual
          investment decisions, consult with financial advisors and review official regulatory filings.
        </p>
      </footer>
    </div>
  );
};

export default ReportPage;
