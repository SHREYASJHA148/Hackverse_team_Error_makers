/**
 * Mock Financial Corpus Data for Multi-Agent RAG Pipeline
 *
 * Production-ready dataset covering:
 * - SEBI regulatory filings
 * - Earnings call transcripts
 * - Annual report excerpts
 * - News sentiment stream
 * - Edge cases for conflict resolution testing
 *
 * @module mockCorpusData
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type DocType = "SEBI_FILING" | "EARNINGS_TRANSCRIPT" | "ANNUAL_REPORT";

export interface DocumentChunk {
  docId: string;
  ticker: string;
  docType: DocType;
  chunkId: string;
  title: string;
  content: string;
  citationLabel: string;
}

export interface NewsHeadline {
  headline: string;
  source: string;
  sentimentScore: number; // -1.0 (bearish) to 1.0 (bullish)
  timestamp: string;
  ticker: string;
}

// ============================================================================
// RELIANCE INDUSTRIES (RELIANCE.NS) - CORPUS
// ============================================================================

const relianceCorpus: DocumentChunk[] = [
  {
    docId: "SEBI_RELIANCE_Q1_2026",
    ticker: "RELIANCE.NS",
    docType: "SEBI_FILING",
    chunkId: "chunk-01",
    title: "Q1 FY2026 Financial Results - Operational Performance",
    content: "Reliance Industries Limited reported consolidated revenue of ₹2,35,420 crore for Q1 FY2026, reflecting a 12.3% YoY growth. The O2C (Oil-to-Chemicals) segment contributed ₹1,24,680 crore with an EBITDA margin of 9.8%, down 180 bps from the previous quarter due to refining margin compression. Retail segment revenue grew 18.5% YoY to ₹68,450 crore, driven by expansion in fashion and grocery categories. Digital Services (Jio Platforms) reported revenue of ₹37,290 crore with subscriber ARPU increasing to ₹195.3, up from ₹181.7 in Q1 FY2025. Net debt stood at ₹1,28,340 crore, resulting in a debt-to-equity ratio of 0.42, well within management's comfort zone of 0.5.",
    citationLabel: "SEBI Disclosure Q1 2026 [Chunk #01]"
  },
  {
    docId: "SEBI_RELIANCE_Q1_2026",
    ticker: "RELIANCE.NS",
    docType: "SEBI_FILING",
    chunkId: "chunk-02",
    title: "Q1 FY2026 Financial Results - Capital Allocation & New Energy",
    content: "Capital expenditure for Q1 FY2026 totaled ₹32,180 crore, with ₹14,200 crore allocated to the New Energy business including solar module manufacturing and battery storage facilities. The company disclosed that commissioning of the Dhirubhai Ambani Green Energy Giga Complex has been delayed by 4-5 months due to supply chain constraints in specialized equipment procurement. Management reiterated commitment to achieving 100 GW renewable energy capacity by 2030. Free cash flow generation was ₹18,450 crore, down 22% YoY, primarily attributable to elevated capex in New Energy. The Board approved a ₹10 dividend per share, maintaining the payout ratio at 18%.",
    citationLabel: "SEBI Disclosure Q1 2026 [Chunk #02]"
  },
  {
    docId: "EARNINGS_RELIANCE_Q1_2026",
    ticker: "RELIANCE.NS",
    docType: "EARNINGS_TRANSCRIPT",
    chunkId: "chunk-01",
    title: "Management Discussion - Refining Margin Outlook",
    content: "CFO V. Srikanth stated, 'We witnessed Singapore GRM compression to $4.2/bbl in Q1, impacting our realized margins. However, we expect gradual recovery in H2 FY2026 as global refining capacity rationalization takes effect. Our Jamnagar facility continues to operate at 107% utilization, and we've secured long-term crude supply agreements with Middle Eastern producers at favorable terms. The integration of our petrochemical assets provides natural hedging, and we project O2C EBITDA to rebound above ₹15,000 crore per quarter by Q4.' When questioned about inventory losses, Srikanth noted that crude inventory valuation resulted in a one-time charge of ₹2,840 crore this quarter.",
    citationLabel: "Earnings Transcript Q1 2026 [Chunk #01]"
  },
  {
    docId: "ANNUAL_REPORT_RELIANCE_2025",
    ticker: "RELIANCE.NS",
    docType: "ANNUAL_REPORT",
    chunkId: "chunk-01",
    title: "FY2025 Annual Report - Retail Expansion Strategy",
    content: "During FY2025, Reliance Retail added 3,214 new stores, bringing the total retail footprint to 18,837 stores across 7,200+ cities. Total retail area expanded to 77.8 million square feet, a 15% increase YoY. The JioMart digital commerce platform achieved a GMV of ₹42,300 crore, growing 68% YoY, with grocery and electronics contributing 62% and 24% respectively. The fashion and lifestyle segment, including brands like AJIO and Trends, recorded revenue of ₹28,400 crore with operating margins improving to 8.3% from 6.1% in FY2024. Management has guided for 2,800-3,000 net store additions in FY2026 with a focus on smaller towns (population < 1 lakh) to capture untapped consumption growth.",
    citationLabel: "Annual Report FY2025 [Chunk #01]"
  },
  {
    docId: "SEBI_RELIANCE_Q2_2025_CONFLICTING",
    ticker: "RELIANCE.NS",
    docType: "SEBI_FILING",
    chunkId: "chunk-01",
    title: "Q2 FY2025 - Elevated Debt and Capex Concerns [EDGE CASE]",
    content: "EDGE CASE SCENARIO: While Q2 FY2025 showed strong top-line growth of 16.8% YoY, gross debt increased significantly to ₹3,42,800 crore, up from ₹2,87,600 crore in Q2 FY2024. Interest coverage ratio declined to 4.2x from 5.8x. The company disclosed aggressive capex commitments of ₹1,28,000 crore for FY2026, primarily for New Energy (₹68,000 crore) and 5G network expansion (₹32,000 crore). Rating agency ICRA placed the company's long-term debt rating on 'Rating Watch with Negative Implications' citing concerns over free cash flow adequacy amid execution risks in the New Energy business. This creates a conflict scenario where equity momentum is strong but credit metrics are deteriorating.",
    citationLabel: "SEBI Disclosure Q2 2025 - Conflicting Indicators [Chunk #01]"
  }
];

// ============================================================================
// TATA STEEL (TATASTEEL.NS) - CORPUS
// ============================================================================

const tataSteelCorpus: DocumentChunk[] = [
  {
    docId: "SEBI_TATASTEEL_Q1_2026",
    ticker: "TATASTEEL.NS",
    docType: "SEBI_FILING",
    chunkId: "chunk-01",
    title: "Q1 FY2026 Production and Financial Summary",
    content: "Tata Steel Limited reported consolidated crude steel production of 7.82 million tonnes in Q1 FY2026, up 4.3% YoY. India operations contributed 5.18 million tonnes while European operations (Tata Steel Netherlands and UK) produced 2.64 million tonnes. Consolidated revenue stood at ₹58,240 crore with India deliveries growing 6.8% YoY to 4.94 million tonnes. Realized steel prices in India averaged ₹54,380 per tonne, down 3.2% QoQ due to softer demand from infrastructure and automotive sectors. EBITDA per tonne in India operations was ₹11,240, impacted by higher coking coal costs ($285/tonne vs $248/tonne in Q4 FY2025). Consolidated net debt reduced to ₹78,420 crore from ₹82,180 crore, achieving a net debt-to-EBITDA ratio of 2.8x.",
    citationLabel: "SEBI Disclosure Q1 2026 [Chunk #01]"
  },
  {
    docId: "SEBI_TATASTEEL_Q1_2026",
    ticker: "TATASTEEL.NS",
    docType: "SEBI_FILING",
    chunkId: "chunk-02",
    title: "Q1 FY2026 European Operations Restructuring",
    content: "The European operations reported an EBITDA loss of £68 million (₹720 crore) in Q1 FY2026, primarily driven by subdued demand, elevated energy costs, and inventory write-downs. Management announced a strategic review of the Port Talbot steelworks in UK, with plans to transition two blast furnaces to electric arc furnace (EAF) technology by H2 FY2027. This transition requires capital investment of approximately £1.2 billion (₹12,720 crore) and is expected to reduce carbon emissions by 85%. The restructuring may result in workforce rationalization of 1,800-2,200 positions. Separately, the Netherlands operations are being stabilized with long-term power purchase agreements securing electricity at €82/MWh for 7 years.",
    citationLabel: "SEBI Disclosure Q1 2026 [Chunk #02]"
  },
  {
    docId: "EARNINGS_TATASTEEL_Q1_2026",
    ticker: "TATASTEEL.NS",
    docType: "EARNINGS_TRANSCRIPT",
    chunkId: "chunk-01",
    title: "CEO Commentary - Demand Outlook and Capacity Expansion",
    content: "CEO & MD T.V. Narendran commented, 'Indian steel demand growth remains resilient at 8-9% for FY2026, supported by infrastructure spending under the National Infrastructure Pipeline and PLI-driven manufacturing growth. However, we are witnessing inventory buildup at dealer and distributor levels, which may moderate pricing power in Q2. Our brownfield expansion at Kalinganagar to increase capacity from 8 MTPA to 13 MTPA is on track for commissioning in Q3 FY2027, with 68% of civil work completed. On the cost front, we've achieved 12% reduction in coke rate through improved operational efficiency. Our diversification into downstream value-added products now accounts for 28% of total deliveries, up from 21% last year.'",
    citationLabel: "Earnings Transcript Q1 2026 [Chunk #01]"
  },
  {
    docId: "ANNUAL_REPORT_TATASTEEL_2025",
    ticker: "TATASTEEL.NS",
    docType: "ANNUAL_REPORT",
    chunkId: "chunk-01",
    title: "FY2025 Sustainability and ESG Initiatives",
    content: "Tata Steel achieved a 12.4% reduction in CO2 emissions intensity (2.45 tCO2/tcs) compared to FY2020 baseline of 2.80 tCO2/tcs, making significant progress toward the target of 1.8 tCO2/tcs by 2030. The company invested ₹3,680 crore in sustainability projects including waste heat recovery systems, renewable energy capacity (now at 642 MW), and circular economy initiatives. Scope 1 and 2 emissions stood at 28.4 million tonnes CO2 for FY2025. Water recycling rate improved to 97.3%, among the highest in the global steel industry. The company's ESG ratings improved with MSCI upgrading from BB to A and Sustainalytics reducing risk score to 22.3 (Medium Risk). Total CSR expenditure for FY2025 was ₹548 crore, benefiting 4.2 million people across community development programs.",
    citationLabel: "Annual Report FY2025 [Chunk #01]"
  },
  {
    docId: "SEBI_TATASTEEL_Q4_2025_CONFLICTING",
    ticker: "TATASTEEL.NS",
    docType: "SEBI_FILING",
    chunkId: "chunk-01",
    title: "Q4 FY2025 - Strong Performance Amid Regulatory Scrutiny [EDGE CASE]",
    content: "EDGE CASE SCENARIO: Q4 FY2025 demonstrated exceptional operational performance with EBITDA of ₹9,840 crore (best in 6 quarters) and EBITDA/tonne of ₹13,120. However, the Ministry of Steel issued a show-cause notice regarding alleged non-compliance with domestic tariff area (DTA) supply obligations under the mining lease for Noamundi iron ore mines. The potential penalty could range from ₹2,400-4,800 crore depending on adjudication outcomes. Additionally, the Competition Commission of India (CCI) initiated a probe into alleged cartelization in steel pricing during FY2024-25. This creates a conflict where operational metrics are strong but regulatory/legal overhang introduces material uncertainty.",
    citationLabel: "SEBI Disclosure Q4 2025 - Regulatory Conflict [Chunk #01]"
  }
];

// ============================================================================
// INFOSYS (INFY.NS) - CORPUS
// ============================================================================

const infosysCorpus: DocumentChunk[] = [
  {
    docId: "SEBI_INFOSYS_Q1_2026",
    ticker: "INFY.NS",
    docType: "SEBI_FILING",
    chunkId: "chunk-01",
    title: "Q1 FY2026 Financial Performance and Segment Analysis",
    content: "Infosys Limited reported Q1 FY2026 revenues of $4,824 million, representing 3.6% YoY constant currency growth. In INR terms, consolidated revenue was ₹40,140 crore. Operating margin stood at 21.3%, a sequential expansion of 40 bps driven by operational efficiencies and improved utilization (85.2% vs 83.8% in Q4). Financial Services vertical grew 5.2% YoY but Retail and Manufacturing segments remained flat. Digital services now constitute 64.8% of total revenues, up from 62.1% in Q1 FY2025. Large deal TCV (Total Contract Value) was $2.38 billion with 18 large deals signed, of which 52% were net-new. Free cash flow generation was ₹7,420 crore (FCF to net profit conversion of 98.4%). The company declared an interim dividend of ₹21 per share.",
    citationLabel: "SEBI Disclosure Q1 2026 [Chunk #01]"
  },
  {
    docId: "SEBI_INFOSYS_Q1_2026",
    ticker: "INFY.NS",
    docType: "SEBI_FILING",
    chunkId: "chunk-02",
    title: "Q1 FY2026 Guidance and Strategic Initiatives",
    content: "Management maintained FY2026 revenue growth guidance at 3.0-4.0% in constant currency terms, citing macro uncertainties in key markets (North America and Europe account for 83% of revenues). Discretionary spending by BFSI clients remains subdued with deal cycle elongation observed. Attrition reduced to 12.8% LTM from 14.3% in Q4, with total headcount at 3,42,680 employees (net reduction of 4,820 in Q1). The company invested $124 million in AI/ML capabilities including the Infosys Topaz platform, which has now been deployed across 287 client engagements. Operating expenses as % of revenue improved to 78.7% from 79.4%, reflecting operational leverage. DSO (Days Sales Outstanding) stood at 64 days, stable QoQ.",
    citationLabel: "SEBI Disclosure Q1 2026 [Chunk #02]"
  },
  {
    docId: "EARNINGS_INFOSYS_Q1_2026",
    ticker: "INFY.NS",
    docType: "EARNINGS_TRANSCRIPT",
    chunkId: "chunk-01",
    title: "CFO Discussion - Client Budget Constraints and Margin Levers",
    content: "CFO Jayesh Sanghrajka stated, 'We are witnessing cautious client behavior with IT budget approvals taking 20-25% longer than historical averages. However, our deal pipeline remains healthy at $4.1 billion, weighted toward cost-takeout and efficiency programs rather than transformation deals. On margins, we have expanded 170 bps YoY through automation-led productivity gains (saves 12,400 FTE-equivalents), pyramid optimization, and third-party cost rationalization. Our onsite mix reduced to 28.4% from 29.8%, providing structural tailwind. For H2, we expect seasonal uptick in discretionary spend, but full-year margin guidance remains 21-22% due to wage hikes effective Q3 (average 6-7% for high performers) and campus fresher onboarding costs.'",
    citationLabel: "Earnings Transcript Q1 2026 [Chunk #01]"
  },
  {
    docId: "ANNUAL_REPORT_INFOSYS_2025",
    ticker: "INFY.NS",
    docType: "ANNUAL_REPORT",
    chunkId: "chunk-01",
    title: "FY2025 Strategic Pillars and Client Metrics",
    content: "FY2025 was characterized by strategic focus on five key pillars: (1) Digital Core Modernization contributing $8.2B revenue, (2) Cloud & Infrastructure services growing 18.4% YoY, (3) Data & AI platforms with 1,840+ AI-first projects, (4) Cybersecurity services expanding to $1.48B, and (5) Industry Cloud solutions. The client base expanded to 1,894 active clients, with clients contributing >$100M annually increasing to 47 (from 42 in FY2024). Client mining metrics showed strong traction: Top 10 clients contributed 28.2% of revenues with wallet share gains of 240 bps. Revenue per employee improved to $58,400 from $56,100. The company achieved 100% renewable energy for all India campuses and committed to achieving net-zero emissions by 2040.",
    citationLabel: "Annual Report FY2025 [Chunk #01]"
  },
  {
    docId: "SEBI_INFOSYS_Q3_2025_CONFLICTING",
    ticker: "INFY.NS",
    docType: "SEBI_FILING",
    chunkId: "chunk-01",
    title: "Q3 FY2025 - Strong Bookings but Revenue Recognition Delays [EDGE CASE]",
    content: "EDGE CASE SCENARIO: Q3 FY2025 witnessed record TCV of $4.12 billion in large deals, the highest in company history, signaling robust demand. However, revenue growth remained muted at 1.2% CC QoQ due to two factors: (1) Extended ramp-up cycles on three mega-deals signed in Q2 (combined TCV $1.8B) where clients delayed project kick-offs by 8-12 weeks citing internal budget reallocation, and (2) An unexpected $68 million revenue reversal on a legacy fixed-price infrastructure deal where a European banking client terminated the contract mid-execution citing force majeure. This creates a timing mismatch where forward indicators (bookings, pipeline) are strong but near-term revenue delivery is constrained, testing the RAG system's ability to reconcile lagging vs. leading indicators.",
    citationLabel: "SEBI Disclosure Q3 2025 - Timing Mismatch [Chunk #01]"
  }
];

// ============================================================================
// NEWS SENTIMENT STREAM
// ============================================================================

const newsHeadlines: NewsHeadline[] = [
  // RELIANCE.NS - News
  {
    ticker: "RELIANCE.NS",
    headline: "Reliance Jio Launches 5G FWA Services in 120 Cities, Eyes 10M Subscribers by FY2027",
    source: "Economic Times",
    sentimentScore: 0.82,
    timestamp: "2026-08-28T09:15:00Z"
  },
  {
    ticker: "RELIANCE.NS",
    headline: "RIL's Refining Margins Under Pressure as Singapore GRM Slips to 3-Year Low",
    source: "Bloomberg Quint",
    sentimentScore: -0.64,
    timestamp: "2026-08-26T14:22:00Z"
  },
  {
    ticker: "RELIANCE.NS",
    headline: "Mukesh Ambani Pitches $10B Green Hydrogen Project to European Energy Consortium",
    source: "Reuters India",
    sentimentScore: 0.71,
    timestamp: "2026-08-24T11:40:00Z"
  },
  {
    ticker: "RELIANCE.NS",
    headline: "Reliance Retail Q1 Same-Store Sales Growth Decelerates to 4.2%, Missing Street Estimates",
    source: "Moneycontrol",
    sentimentScore: -0.48,
    timestamp: "2026-08-22T16:05:00Z"
  },
  {
    ticker: "RELIANCE.NS",
    headline: "Analysts Maintain 'Buy' on RIL Despite Capex Concerns; Target Price ₹3,280",
    source: "Business Standard",
    sentimentScore: 0.35,
    timestamp: "2026-08-20T08:50:00Z"
  },

  // TATASTEEL.NS - News
  {
    ticker: "TATASTEEL.NS",
    headline: "Tata Steel Kalinganagar Phase-II Expansion on Track, First Hot Metal by Dec 2026",
    source: "Mint",
    sentimentScore: 0.78,
    timestamp: "2026-08-27T10:30:00Z"
  },
  {
    ticker: "TATASTEEL.NS",
    headline: "China Steel Exports Surge 18% YoY, Indian Steelmakers Face Margin Compression",
    source: "Financial Express",
    sentimentScore: -0.71,
    timestamp: "2026-08-25T13:45:00Z"
  },
  {
    ticker: "TATASTEEL.NS",
    headline: "UK Government Backs Tata Steel's £1.2B Port Talbot Green Transition with £500M Grant",
    source: "The Hindu BusinessLine",
    sentimentScore: 0.85,
    timestamp: "2026-08-23T07:20:00Z"
  },
  {
    ticker: "TATASTEEL.NS",
    headline: "Tata Steel Europe EBITDA Losses Widen; Restructuring Timeline Pushed to Mid-2027",
    source: "CNBC-TV18",
    sentimentScore: -0.58,
    timestamp: "2026-08-21T15:10:00Z"
  },
  {
    ticker: "TATASTEEL.NS",
    headline: "Brokerage Houses Neutral on Tata Steel; Cite Demand Slowdown and Inventory Buildup",
    source: "Economic Times",
    sentimentScore: -0.12,
    timestamp: "2026-08-19T09:00:00Z"
  },

  // INFY.NS - News
  {
    ticker: "INFY.NS",
    headline: "Infosys Bags $450M Multi-Year Cloud Transformation Deal from Fortune 100 Retailer",
    source: "Business Today",
    sentimentScore: 0.88,
    timestamp: "2026-08-29T08:40:00Z"
  },
  {
    ticker: "INFY.NS",
    headline: "IT Sector Faces Client Budget Cuts as US Fed Holds Rates at 4.75%; Infy Downgrades Q2 Outlook",
    source: "Zee Business",
    sentimentScore: -0.67,
    timestamp: "2026-08-27T12:15:00Z"
  },
  {
    ticker: "INFY.NS",
    headline: "Infosys Topaz AI Platform Crosses 300 Enterprise Deployments, Revenue Contribution at 8%",
    source: "Inc42",
    sentimentScore: 0.72,
    timestamp: "2026-08-25T14:50:00Z"
  },
  {
    ticker: "INFY.NS",
    headline: "Infosys Attrition Drops to 12.8%, Lowest in 3 Years as IT Job Market Cools",
    source: "Times of India",
    sentimentScore: 0.42,
    timestamp: "2026-08-23T10:25:00Z"
  },
  {
    ticker: "INFY.NS",
    headline: "Morgan Stanley Cuts Infosys Target to ₹1,680 Citing Prolonged Discretionary Spend Weakness",
    source: "Reuters India",
    sentimentScore: -0.54,
    timestamp: "2026-08-21T11:35:00Z"
  }
];

// ============================================================================
// UNIFIED CORPUS COLLECTION
// ============================================================================

export const fullCorpus: DocumentChunk[] = [
  ...relianceCorpus,
  ...tataSteelCorpus,
  ...infosysCorpus
];

export const allNewsHeadlines: NewsHeadline[] = newsHeadlines;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Retrieve all regulatory document chunks for a specific ticker
 * @param ticker - Stock ticker symbol (e.g., "RELIANCE.NS")
 * @returns Array of document chunks for the specified ticker
 */
export function getCorpusByTicker(ticker: string): DocumentChunk[] {
  return fullCorpus.filter(doc => doc.ticker === ticker);
}

/**
 * Retrieve all news headlines for a specific ticker
 * @param ticker - Stock ticker symbol (e.g., "RELIANCE.NS")
 * @returns Array of news headlines for the specified ticker
 */
export function getHeadlinesByTicker(ticker: string): NewsHeadline[] {
  return allNewsHeadlines.filter(news => news.ticker === ticker);
}

/**
 * Search corpus documents by keyword query (simple substring matching)
 * Searches across title and content fields
 * @param query - Search keyword or phrase
 * @param ticker - Optional ticker filter; if omitted, searches across all tickers
 * @returns Array of matching document chunks
 */
export function searchCorpus(query: string, ticker?: string): DocumentChunk[] {
  const lowerQuery = query.toLowerCase();
  const corpus = ticker ? getCorpusByTicker(ticker) : fullCorpus;

  return corpus.filter(doc =>
    doc.title.toLowerCase().includes(lowerQuery) ||
    doc.content.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get edge case / conflicting data scenarios for testing Conflict Resolution Engine
 * @returns Array of document chunks marked as edge cases
 */
export function getEdgeCaseScenarios(): DocumentChunk[] {
  return fullCorpus.filter(doc =>
    doc.content.includes("EDGE CASE SCENARIO") ||
    doc.citationLabel.toLowerCase().includes("conflict")
  );
}

/**
 * Get summary statistics for the corpus
 * @returns Object containing corpus statistics
 */
export function getCorpusStats() {
  const tickerSet = new Set(fullCorpus.map(doc => doc.ticker));
  const docTypeBreakdown = fullCorpus.reduce((acc, doc) => {
    acc[doc.docType] = (acc[doc.docType] || 0) + 1;
    return acc;
  }, {} as Record<DocType, number>);

  return {
    totalDocuments: fullCorpus.length,
    totalTickers: tickerSet.size,
    tickers: Array.from(tickerSet),
    documentsByType: docTypeBreakdown,
    totalNewsHeadlines: allNewsHeadlines.length,
    edgeCaseCount: getEdgeCaseScenarios().length
  };
}

/**
 * Get news sentiment distribution for a ticker
 * @param ticker - Stock ticker symbol
 * @returns Object with bullish/neutral/bearish counts
 */
export function getSentimentDistribution(ticker: string) {
  const headlines = getHeadlinesByTicker(ticker);

  return {
    bullish: headlines.filter(h => h.sentimentScore > 0.3).length,
    neutral: headlines.filter(h => h.sentimentScore >= -0.3 && h.sentimentScore <= 0.3).length,
    bearish: headlines.filter(h => h.sentimentScore < -0.3).length,
    averageScore: headlines.reduce((sum, h) => sum + h.sentimentScore, 0) / headlines.length || 0
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  fullCorpus,
  allNewsHeadlines,
  getCorpusByTicker,
  getHeadlinesByTicker,
  searchCorpus,
  getEdgeCaseScenarios,
  getCorpusStats,
  getSentimentDistribution
};
