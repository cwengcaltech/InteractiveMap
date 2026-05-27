export type MarketType = "monopoly" | "oligopoly" | "high_growth" | "low_growth" | "emerging";

export interface Category {
  id: string;
  name: string;
  name_en: string;
  color: string;
  icon: string;
  description: string;
  marketType: MarketType;
}

export const marketTypeLabels: Record<MarketType, { label: string; color: string; bg: string }> = {
  monopoly:    { label: "壟斷",   color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
  oligopoly:   { label: "寡佔",   color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  high_growth: { label: "高成長", color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
  low_growth:  { label: "低成長", color: "#6b7280", bg: "rgba(107,114,128,0.15)" },
  emerging:    { label: "新興",   color: "#a78bfa", bg: "rgba(167,139,250,0.15)" },
};

export const healthMarketTypeLabels: Record<MarketType, { label: string; color: string; bg: string }> = {
  monopoly:    { label: "強證據",   color: "#16a34a", bg: "rgba(22,163,74,0.12)" },
  oligopoly:   { label: "中等證據", color: "#2563eb", bg: "rgba(37,99,235,0.12)" },
  high_growth: { label: "熱門趨勢", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  low_growth:  { label: "基礎保養", color: "#6b7280", bg: "rgba(107,114,128,0.12)" },
  emerging:    { label: "前沿研究", color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
};

export const categories: Category[] = [
  {
    id: "materials",
    name: "材料",
    name_en: "Materials",
    color: "#95A5A6",
    icon: "🧪",
    description: "供應矽晶圓、光阻劑等半導體製造所需之關鍵材料。",
    marketType: "oligopoly",
  },
  {
    id: "equipment",
    name: "半導體設備",
    name_en: "Semiconductor Equipment",
    color: "#1ABC9C",
    icon: "🔧",
    description: "提供晶圓製造所需之光刻機、蝕刻機、沉積設備等關鍵製程設備。",
    marketType: "monopoly",
  },
  {
    id: "eda_ip",
    name: "EDA / IP",
    name_en: "EDA & IP",
    color: "#8E44AD",
    icon: "🛠️",
    description: "提供電子設計自動化工具與矽智財，是晶片設計不可或缺的軟體基礎設施。",
    marketType: "oligopoly",
  },
  {
    id: "foundry",
    name: "晶圓代工",
    name_en: "Foundry",
    color: "#E74C3C",
    icon: "🏭",
    description: "提供半導體製造服務，將 IC 設計轉化為實體晶片，技術門檻與資本投入極高。",
    marketType: "monopoly",
  },
  {
    id: "chip_design",
    name: "IC 設計",
    name_en: "Chip Design",
    color: "#2ECC71",
    icon: "⚡",
    description: "設計高效能處理器、GPU、AI 加速器等半導體晶片，為產業鏈核心環節。",
    marketType: "high_growth",
  },
  {
    id: "memory",
    name: "記憶體",
    name_en: "Memory",
    color: "#F39C12",
    icon: "💾",
    description: "生產 DRAM、NAND Flash 及 HBM 等記憶體產品，AI 伺服器帶動 HBM 需求暴增。",
    marketType: "oligopoly",
  },
  {
    id: "packaging",
    name: "封裝測試",
    name_en: "Packaging & Testing",
    color: "#E67E22",
    icon: "📦",
    description: "提供晶片封裝與測試服務，先進封裝技術（如 CoWoS）為 AI 晶片關鍵瓶頸。",
    marketType: "oligopoly",
  },
  {
    id: "ai_cloud",
    name: "AI 雲端平台",
    name_en: "AI Cloud Platform",
    color: "#4285F4",
    icon: "☁️",
    description: "提供大規模雲端運算基礎設施與 AI 服務的科技巨頭，是 AI 晶片與伺服器的最大採購者。",
    marketType: "oligopoly",
  },
  {
    id: "ai_model",
    name: "AI 模型與應用",
    name_en: "AI Model & Application",
    color: "#9B59B6",
    icon: "🧠",
    description: "專注於開發大型語言模型與生成式 AI 應用的公司，推動 AI 算力需求持續成長。",
    marketType: "emerging",
  },
];
