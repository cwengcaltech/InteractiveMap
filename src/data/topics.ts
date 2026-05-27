export type MarketType = "monopoly" | "oligopoly" | "high_growth" | "low_growth" | "emerging";

export interface SectionCompany {
  id: string;
  name: string;
  ticker?: string;
  country: string;
  role: string;
  marketShare?: string;
}

export interface TopicSection {
  id: string;
  name: string;
  name_en: string;
  keyInfo: string;
  marketType: MarketType;
  companies: SectionCompany[];
}

export interface Topic {
  id: string;
  slug: string;
  category: "hw" | "sw" | "hl";
  name: string;
  name_en: string;
  description: string;
  icon: string;
  color: string;
  flowSummary: string;
  sections: TopicSection[];
}

export const topics: Topic[] = [
  // ============================================================
  // 1. hw/asic — 客製 AI 晶片 (ASIC/XPU) 供應鏈
  // ============================================================
  {
    id: "asic",
    slug: "asic",
    category: "hw",
    name: "客製 AI 晶片 (ASIC/XPU) 供應鏈",
    name_en: "Custom AI Silicon Supply Chain",
    description:
      "涵蓋從矽智財授權、ASIC 設計服務到先進製程代工與封裝的完整客製化 AI 晶片供應鏈，追蹤 Hyperscaler 自研晶片趨勢。",
    icon: "🔲",
    color: "#E74C3C",
    flowSummary: "IP/SerDes 授權 → ASIC 設計服務 → 先進製程代工 → CoWoS 先進封裝 → 雲端 XPU 終端",
    sections: [
      {
        id: "asic-hyperscaler-xpu",
        name: "Hyperscaler XPU 自研晶片",
        name_en: "Hyperscaler XPU Products",
        keyInfo: "2025 年 Hyperscaler XPU 出貨量預估突破 200 萬顆，侵蝕 GPU 市場份額",
        marketType: "high_growth",
        companies: [
          { id: "google", name: "Google", ticker: "GOOGL", country: "US", role: "TPU v5p/v6 — 自研 AI 訓練與推論加速器" },
          { id: "amazon", name: "Amazon", ticker: "AMZN", country: "US", role: "Trainium2/Inferentia — AWS 自研 AI 晶片" },
          { id: "microsoft", name: "Microsoft", ticker: "MSFT", country: "US", role: "Maia 100 — Azure 自研 AI 加速器" },
          { id: "meta", name: "Meta", ticker: "META", country: "US", role: "MTIA v2 — 自研推論與訓練加速器" },
          { id: "tesla", name: "Tesla / xAI", ticker: "TSLA", country: "US", role: "Dojo D2 — 自研 AI 訓練晶片" },
        ],
      },
      {
        id: "asic-design-tier1",
        name: "ASIC 設計服務 Tier-1",
        name_en: "ASIC Design Services Tier-1",
        keyInfo: "Broadcom 與 Marvell 合計拿下超過 80% 雲端 XPU 設計訂單",
        marketType: "oligopoly",
        companies: [
          { id: "broadcom", name: "Broadcom", ticker: "AVGO", country: "US", role: "Google TPU、Meta MTIA 設計夥伴，客製 AI ASIC 龍頭", marketShare: "~55%" },
          { id: "marvell", name: "Marvell", ticker: "MRVL", country: "US", role: "AWS Trainium、Microsoft Maia 設計夥伴", marketShare: "~25%" },
          { id: "mediatek", name: "聯發科", ticker: "2454.TW", country: "TW", role: "NVIDIA 合作開發 ARM 架構資料中心晶片" },
        ],
      },
      {
        id: "asic-design-longtail",
        name: "ASIC 設計服務 Long-tail",
        name_en: "ASIC Design Services Long-tail",
        keyInfo: "台系 ASIC 設計公司受惠於客製化晶片需求，2024-2025 營收翻倍成長",
        marketType: "high_growth",
        companies: [
          { id: "alchip", name: "世芯電子", ticker: "3661.TW", country: "TW", role: "高階 ASIC 設計服務（3nm/5nm），服務北美 Hyperscaler" },
          { id: "guc", name: "創意電子", ticker: "3443.TW", country: "TW", role: "台積電旗下 ASIC 設計公司，提供先進製程 turnkey 服務" },
          { id: "faraday", name: "智原科技", ticker: "3035.TW", country: "TW", role: "中階 ASIC 設計服務，專注 IoT 與車用領域" },
          { id: "socionext", name: "Socionext", ticker: "6526.T", country: "JP", role: "日本 ASIC 設計公司，車用與資料中心 SoC" },
        ],
      },
      {
        id: "asic-foundry",
        name: "先進製程代工 (N3/N2)",
        name_en: "Foundry N3/N2",
        keyInfo: "台積電 3nm 良率突破 80%，2nm GAA 預計 2025H2 量產",
        marketType: "monopoly",
        companies: [
          { id: "tsmc", name: "台積電", ticker: "2330.TW", country: "TW", role: "N3E/N2 先進製程代工，XPU 晶片唯一代工選擇", marketShare: "~92%" },
          { id: "samsung", name: "Samsung Foundry", ticker: "005930.KS", country: "KR", role: "SF3/SF2 製程代工，積極爭取 AI 晶片訂單", marketShare: "~5%" },
          { id: "intel", name: "Intel Foundry", ticker: "INTC", country: "US", role: "Intel 18A 製程，爭取外部客戶代工訂單", marketShare: "~3%" },
        ],
      },
      {
        id: "asic-advanced-packaging",
        name: "先進封裝 CoWoS / HBM 整合",
        name_en: "Advanced Packaging CoWoS/HBM",
        keyInfo: "CoWoS 產能為 AI 晶片最大瓶頸，2025 年月產能目標 4.5 萬片",
        marketType: "monopoly",
        companies: [
          { id: "tsmc", name: "台積電 CoWoS", ticker: "2330.TW", country: "TW", role: "CoWoS-S/CoWoS-L 先進封裝，AI 晶片 2.5D 封裝壟斷者", marketShare: "~90%" },
          { id: "ase", name: "日月光", ticker: "3711.TW", country: "TW", role: "Fan-out 與 2.5D 先進封裝服務" },
          { id: "sk_hynix", name: "SK Hynix", ticker: "000660.KS", country: "KR", role: "HBM3E/HBM4 記憶體供應，TSV 堆疊整合", marketShare: "~53%" },
          { id: "micron", name: "Micron", ticker: "MU", country: "US", role: "HBM3E 量產，打入 NVIDIA 與 AMD 供應鏈", marketShare: "~15%" },
        ],
      },
      {
        id: "asic-xpu-products",
        name: "雲端 XPU 加速器成品",
        name_en: "Cloud XPU Accelerators",
        keyInfo: "2025 年 XPU 預計佔 AI 加速器市場 15-20%，對 GPU 形成替代壓力",
        marketType: "high_growth",
        companies: [
          { id: "google", name: "Google Cloud TPU", ticker: "GOOGL", country: "US", role: "TPU v5p Pod — 用於 Gemini 模型訓練" },
          { id: "amazon", name: "AWS Trainium", ticker: "AMZN", country: "US", role: "Trainium2 UltraCluster — 大規模 AI 訓練叢集" },
          { id: "microsoft", name: "Azure Maia", ticker: "MSFT", country: "US", role: "Maia 100 加速器 — 搭載 Cobalt CPU 部署" },
          { id: "meta", name: "Meta MTIA", ticker: "META", country: "US", role: "MTIA v2 — 推薦系統與生成式 AI 推論" },
        ],
      },
      {
        id: "asic-tam-erosion",
        name: "需求/TAM/GPU 侵蝕分析",
        name_en: "Demand / TAM / GPU Erosion",
        keyInfo: "2026 年 AI 加速器 TAM 預估達 $4,000 億，XPU 佔比持續提升",
        marketType: "high_growth",
        companies: [
          { id: "nvidia", name: "NVIDIA", ticker: "NVDA", country: "US", role: "GPU 市場領導者，面臨 XPU 替代壓力" },
          { id: "broadcom", name: "Broadcom", ticker: "AVGO", country: "US", role: "XPU 設計龍頭，AI 營收 FY2025 預估 $150 億" },
          { id: "marvell", name: "Marvell", ticker: "MRVL", country: "US", role: "客製化矽預計 FY2026 營收翻倍" },
        ],
      },
      {
        id: "asic-cpu-ip",
        name: "CPU 架構 / CSS IP 授權",
        name_en: "CPU Architecture / CSS IP",
        keyInfo: "Arm CSS 授權模式加速 ASIC 設計週期，從 18 個月縮短至 12 個月",
        marketType: "monopoly",
        companies: [
          { id: "arm", name: "Arm Holdings", ticker: "ARM", country: "GB", role: "Neoverse CSS/V-series — XPU 搭載 CPU 核心 IP 授權", marketShare: "~95%" },
          { id: "sifive", name: "SiFive", ticker: "Private", country: "US", role: "RISC-V CPU IP — 開源 ISA 替代方案" },
          { id: "andes", name: "晶心科技", ticker: "6533.TW", country: "TW", role: "RISC-V CPU IP 供應商，嵌入式與 AI 加速應用" },
        ],
      },
      {
        id: "asic-eda",
        name: "EDA 設計工具 / 3DIC Sign-off",
        name_en: "EDA / 3DIC Sign-off",
        keyInfo: "先進製程 EDA 工具市場由雙寡頭壟斷，毛利率超過 80%",
        marketType: "oligopoly",
        companies: [
          { id: "synopsys", name: "Synopsys", ticker: "SNPS", country: "US", role: "Fusion Compiler — 先進製程設計與 sign-off 工具", marketShare: "~55%" },
          { id: "cadence", name: "Cadence", ticker: "CDNS", country: "US", role: "Innovus/Cerebrus — AI 驅動 P&R 與 3DIC 設計", marketShare: "~35%" },
          { id: "siemens_eda", name: "Siemens EDA", ticker: "SIE.DE", country: "DE", role: "Calibre — 光罩驗證與 DFM 工具" },
        ],
      },
      {
        id: "asic-serdes-ip",
        name: "SerDes / Die-to-Die / UCIe IP",
        name_en: "SerDes / Die-to-Die / UCIe IP",
        keyInfo: "UCIe 2.0 標準將 die-to-die 頻寬推升至 40 GT/s，支援 Chiplet 架構",
        marketType: "oligopoly",
        companies: [
          { id: "synopsys", name: "Synopsys", ticker: "SNPS", country: "US", role: "112G/224G SerDes IP、UCIe PHY IP 領導者" },
          { id: "cadence", name: "Cadence", ticker: "CDNS", country: "US", role: "112G/224G SerDes IP、PCIe 6.0 IP" },
          { id: "alphawave", name: "Alphawave Semi", ticker: "AWE.L", country: "CA", role: "224G SerDes IP 與高速連接矽智財" },
          { id: "arm", name: "Arm", ticker: "ARM", country: "GB", role: "AMBA CHI 互連 IP — chiplet 通訊基礎" },
        ],
      },
      {
        id: "asic-envm-security",
        name: "嵌入式 NVM / 安全 IP",
        name_en: "Embedded NVM / Security IP",
        keyInfo: "先進製程嵌入式記憶體 IP 需求隨 ASIC 設計激增而快速成長",
        marketType: "oligopoly",
        companies: [
          { id: "synopsys", name: "Synopsys", ticker: "SNPS", country: "US", role: "嵌入式 Flash/SRAM/安全 IP 最大授權商" },
          { id: "rambus", name: "Rambus", ticker: "RMBS", country: "US", role: "安全/記憶體控制器 IP，支援 HBM/DDR5 介面" },
          { id: "kilopass", name: "Synopsys (原 Kilopass)", ticker: "SNPS", country: "US", role: "OTP/MTP 嵌入式 NVM IP" },
        ],
      },
      {
        id: "asic-connectivity",
        name: "高速連接 / Retimer / 光學元件",
        name_en: "Connectivity / Retimer / Optical",
        keyInfo: "AI 叢集網路頻寬需求推動 800G/1.6T 光模組與 PCIe Retimer 爆發成長",
        marketType: "high_growth",
        companies: [
          { id: "astera_labs", name: "Astera Labs", ticker: "ALAB", country: "US", role: "PCIe/CXL Retimer 與智慧連接晶片" },
          { id: "credo", name: "Credo Technology", ticker: "CRDO", country: "US", role: "高速 SerDes 與 Active Electrical Cable (AEC)" },
          { id: "broadcom", name: "Broadcom", ticker: "AVGO", country: "US", role: "PCIe Switch、光模組 DSP 與網路 ASIC" },
          { id: "marvell", name: "Marvell", ticker: "MRVL", country: "US", role: "PAM4 DSP、Ethernet Switch 與光模組方案" },
        ],
      },
    ],
  },

  // ============================================================
  // 2. hw/hbm — HBM 高頻寬記憶體供應鏈
  // ============================================================
  {
    id: "hbm",
    slug: "hbm",
    category: "hw",
    name: "HBM 高頻寬記憶體供應鏈",
    name_en: "HBM Supply Chain",
    description:
      "追蹤 HBM 從 DRAM 製程、TSV 堆疊到封裝整合的完整供應鏈，分析三大記憶體廠的市場競爭格局與 AI 驅動的爆發性需求。",
    icon: "🧊",
    color: "#F39C12",
    flowSummary: "DRAM 製程 → TSV 堆疊 → HBM 封裝 → 整合至 AI 加速器",
    sections: [
      {
        id: "hbm-products",
        name: "HBM 產品世代總覽",
        name_en: "HBM Products Overview",
        keyInfo: "HBM3E 頻寬達 1.18 TB/s；HBM4 預計 2025Q4 量產，頻寬翻倍至 2 TB/s",
        marketType: "high_growth",
        companies: [
          { id: "sk_hynix", name: "SK Hynix", ticker: "000660.KS", country: "KR", role: "HBM3E 12-Hi 量產領先，HBM4 開發中", marketShare: "~53%" },
          { id: "samsung", name: "Samsung", ticker: "005930.KS", country: "KR", role: "HBM3E 12-Hi 量產，良率追趕中", marketShare: "~32%" },
          { id: "micron", name: "Micron", ticker: "MU", country: "US", role: "HBM3E 8-Hi/12-Hi 量產，打入 NVIDIA 供應鏈", marketShare: "~15%" },
        ],
      },
      {
        id: "hbm-dram-manufacturing",
        name: "DRAM 製造商",
        name_en: "DRAM Manufacturers",
        keyInfo: "全球 DRAM 市場由三家寡頭壟斷，2025 年 DRAM 總營收預估超過 $1,000 億",
        marketType: "oligopoly",
        companies: [
          { id: "samsung", name: "Samsung Memory", ticker: "005930.KS", country: "KR", role: "全球最大 DRAM 廠商，1a/1b nm 製程量產", marketShare: "~40%" },
          { id: "sk_hynix", name: "SK Hynix", ticker: "000660.KS", country: "KR", role: "全球第二大 DRAM 廠商，HBM 技術領先", marketShare: "~35%" },
          { id: "micron", name: "Micron", ticker: "MU", country: "US", role: "美國唯一 DRAM 廠商，1-beta 製程量產", marketShare: "~25%" },
        ],
      },
      {
        id: "hbm-tsv-bonding",
        name: "TSV / 晶圓接合設備",
        name_en: "TSV / Wafer Bonding Equipment",
        keyInfo: "HBM TSV 蝕刻與晶圓接合設備需求年增 40% 以上",
        marketType: "oligopoly",
        companies: [
          { id: "lam_research", name: "Lam Research", ticker: "LRCX", country: "US", role: "TSV 深矽蝕刻設備龍頭" },
          { id: "applied_materials", name: "Applied Materials", ticker: "AMAT", country: "US", role: "PVD 阻障層/種子層沉積設備" },
          { id: "tokyo_electron", name: "Tokyo Electron", ticker: "8035.T", country: "JP", role: "晶圓接合與臨時鍵合設備" },
          { id: "besi", name: "BE Semiconductor", ticker: "BESI.AS", country: "NL", role: "熱壓接合 (TCB) 設備龍頭，HBM die bonding 關鍵供應商" },
          { id: "evg", name: "EV Group", ticker: "Private", country: "AT", role: "晶圓級接合與光刻對準設備" },
        ],
      },
      {
        id: "hbm-packaging-testing",
        name: "HBM 封裝與測試",
        name_en: "HBM Packaging & Testing",
        keyInfo: "HBM 封裝良率為成本關鍵，12-Hi 堆疊良率需達 95%+ 方具經濟規模",
        marketType: "high_growth",
        companies: [
          { id: "sk_hynix", name: "SK Hynix (自有封裝)", ticker: "000660.KS", country: "KR", role: "自有 HBM 封裝產線，垂直整合優勢" },
          { id: "samsung", name: "Samsung (自有封裝)", ticker: "005930.KS", country: "KR", role: "自有 HBM 封裝產線" },
          { id: "ase", name: "日月光", ticker: "3711.TW", country: "TW", role: "HBM 測試與後端封裝服務" },
          { id: "advantest", name: "Advantest", ticker: "6857.T", country: "JP", role: "HBM 記憶體測試設備龍頭" },
        ],
      },
      {
        id: "hbm-key-customers",
        name: "HBM 主要客戶",
        name_en: "Key Customers",
        keyInfo: "NVIDIA 消耗全球約 60% HBM 產能，單顆 B200 GPU 搭載 8 顆 HBM3E",
        marketType: "high_growth",
        companies: [
          { id: "nvidia", name: "NVIDIA", ticker: "NVDA", country: "US", role: "最大 HBM 買家 — H200/B200/GB300 GPU 大量搭載 HBM3E", marketShare: "~60%" },
          { id: "amd", name: "AMD", ticker: "AMD", country: "US", role: "MI300X/MI400 搭載 HBM3E，第二大 HBM 客戶", marketShare: "~15%" },
          { id: "broadcom", name: "Broadcom", ticker: "AVGO", country: "US", role: "XPU ASIC 整合 HBM，客戶包含 Google TPU" },
          { id: "intel", name: "Intel", ticker: "INTC", country: "US", role: "Gaudi 3 AI 加速器搭載 HBM" },
        ],
      },
      {
        id: "hbm-materials",
        name: "材料與關鍵零組件",
        name_en: "Materials & Key Components",
        keyInfo: "HBM 對矽晶圓消耗量為同製程 DRAM 的 3-4 倍",
        marketType: "oligopoly",
        companies: [
          { id: "shin_etsu", name: "信越化學", ticker: "4063.T", country: "JP", role: "300mm 矽晶圓最大供應商", marketShare: "~30%" },
          { id: "sumco", name: "SUMCO", ticker: "3436.T", country: "JP", role: "高純度矽晶圓供應商", marketShare: "~25%" },
          { id: "resonac", name: "Resonac (原昭和電工)", ticker: "4004.T", country: "JP", role: "HBM 接合材料 (NCF/DAF) 與化學品" },
          { id: "ajinomoto", name: "味之素精細科技", ticker: "2802.T", country: "JP", role: "ABF 載板材料 — AI 晶片封裝關鍵絕緣膜" },
        ],
      },
      {
        id: "hbm-demand-outlook",
        name: "需求與產能展望",
        name_en: "Demand / Capacity Outlook",
        keyInfo: "2025 年全球 HBM 營收預估達 $350 億，2024-2028 CAGR 超過 50%",
        marketType: "high_growth",
        companies: [
          { id: "sk_hynix", name: "SK Hynix", ticker: "000660.KS", country: "KR", role: "計畫 2025 年 HBM 產能提升 150%，營收佔比過半" },
          { id: "samsung", name: "Samsung", ticker: "005930.KS", country: "KR", role: "加速 HBM3E 量產追趕，轉產 DRAM 產能至 HBM" },
          { id: "micron", name: "Micron", ticker: "MU", country: "US", role: "HBM 營收目標 FY2025 突破 $80 億" },
        ],
      },
    ],
  },

  // ============================================================
  // 3. hw/advanced — 先進製程 (3nm/2nm GAA) 供應鏈
  // ============================================================
  {
    id: "advanced",
    slug: "advanced",
    category: "hw",
    name: "先進製程 (3nm/2nm GAA) 供應鏈",
    name_en: "Advanced Process Supply Chain",
    description:
      "分析 3nm 至 2nm 先進製程的完整供應鏈，從 EDA 設計工具、EUV 光刻設備到矽晶圓材料，追蹤 GAA 電晶體架構的技術突破。",
    icon: "🔬",
    color: "#1ABC9C",
    flowSummary: "EDA 設計 → 光刻設備 → 先進製程代工 → 良率提升",
    sections: [
      {
        id: "advanced-node-roadmap",
        name: "先進節點技術藍圖",
        name_en: "Advanced Node Roadmap",
        keyInfo: "TSMC N2 採用 GAA (GAAFET) 架構，效能提升 10-15%、功耗降低 25-30%",
        marketType: "high_growth",
        companies: [
          { id: "tsmc", name: "台積電", ticker: "2330.TW", country: "TW", role: "N3E 量產中 → N2 (2025H2) → A14 (2028) 技術路線圖" },
          { id: "samsung", name: "Samsung Foundry", ticker: "005930.KS", country: "KR", role: "SF3 量產中 → SF2 (GAA, 2025) → SF1.4 (2027)" },
          { id: "intel", name: "Intel Foundry", ticker: "INTC", country: "US", role: "Intel 18A (GAA RibbonFET, 2025) → Intel 14A (2026)" },
        ],
      },
      {
        id: "advanced-euv",
        name: "EUV 極紫外光光刻",
        name_en: "EUV Lithography",
        keyInfo: "ASML 是全球唯一 EUV 光刻機供應商，High-NA EUV 單台售價超過 $3.5 億",
        marketType: "monopoly",
        companies: [
          { id: "asml", name: "ASML", ticker: "ASML", country: "NL", role: "EUV/High-NA EUV 光刻機獨佔供應商", marketShare: "~100%" },
          { id: "zeiss", name: "Carl Zeiss SMT", ticker: "Private", country: "DE", role: "EUV 光學鏡組唯一供應商 — ASML 核心零組件" },
          { id: "trumpf", name: "TRUMPF", ticker: "Private", country: "DE", role: "EUV 光源 (CO2 雷射) 唯一供應商" },
          { id: "cymer", name: "Cymer (ASML 子公司)", ticker: "ASML", country: "US", role: "DUV 準分子雷射光源" },
        ],
      },
      {
        id: "advanced-foundry",
        name: "先進製程代工服務",
        name_en: "Foundry Services",
        keyInfo: "台積電先進製程 (<7nm) 營收佔比超過 70%，3nm 成長最快",
        marketType: "monopoly",
        companies: [
          { id: "tsmc", name: "台積電", ticker: "2330.TW", country: "TW", role: "全球先進製程代工龍頭，Apple/NVIDIA/AMD 最大代工夥伴", marketShare: "~90%" },
          { id: "samsung", name: "Samsung Foundry", ticker: "005930.KS", country: "KR", role: "GAA 3nm 量產，Qualcomm/Google 部分訂單", marketShare: "~7%" },
          { id: "intel", name: "Intel Foundry", ticker: "INTC", country: "US", role: "18A 製程爭取外部客戶，Microsoft 為首批客戶", marketShare: "~3%" },
        ],
      },
      {
        id: "advanced-etch-dep",
        name: "蝕刻與沉積設備",
        name_en: "Etch & Deposition Equipment",
        keyInfo: "GAA 架構使蝕刻/沉積步驟數增加 25-30%，推升設備需求",
        marketType: "oligopoly",
        companies: [
          { id: "lam_research", name: "Lam Research", ticker: "LRCX", country: "US", role: "先進蝕刻設備龍頭，GAA 選擇性蝕刻關鍵供應商", marketShare: "~35%" },
          { id: "applied_materials", name: "Applied Materials", ticker: "AMAT", country: "US", role: "PVD/CVD/ALD 沉積與 CMP 設備龍頭", marketShare: "~30%" },
          { id: "tokyo_electron", name: "Tokyo Electron", ticker: "8035.T", country: "JP", role: "塗佈顯影設備壟斷、ALD/蝕刻設備主要供應商", marketShare: "~25%" },
          { id: "asm_international", name: "ASM International", ticker: "ASM.AS", country: "NL", role: "先進 ALD 設備龍頭，GAA 製程關鍵供應商" },
        ],
      },
      {
        id: "advanced-inspection",
        name: "製程檢測與量測",
        name_en: "Process Control & Inspection",
        keyInfo: "KLA 在半導體檢測設備市佔率超過 55%，先進製程推升檢測需求",
        marketType: "oligopoly",
        companies: [
          { id: "kla", name: "KLA", ticker: "KLAC", country: "US", role: "製程檢測與量測設備龍頭，光罩檢測壟斷", marketShare: "~55%" },
          { id: "onto_innovation", name: "Onto Innovation", ticker: "ONTO", country: "US", role: "先進封裝與光學量測設備" },
          { id: "applied_materials", name: "Applied Materials", ticker: "AMAT", country: "US", role: "電子束檢測與量測設備" },
          { id: "hitachi_hi_tech", name: "Hitachi High-Tech", ticker: "6501.T", country: "JP", role: "CD-SEM 關鍵尺寸量測設備" },
        ],
      },
      {
        id: "advanced-eda",
        name: "先進製程 EDA 工具",
        name_en: "EDA for Advanced Nodes",
        keyInfo: "2nm 設計複雜度使單次 tape-out 成本超過 $5 億，EDA 工具不可或缺",
        marketType: "oligopoly",
        companies: [
          { id: "synopsys", name: "Synopsys", ticker: "SNPS", country: "US", role: "數位設計全流程工具、DTCO 設計技術協同優化", marketShare: "~55%" },
          { id: "cadence", name: "Cadence", ticker: "CDNS", country: "US", role: "先進節點 P&R、熱/應力多物理模擬工具", marketShare: "~35%" },
          { id: "siemens_eda", name: "Siemens EDA", ticker: "SIE.DE", country: "DE", role: "Calibre 光罩驗證、PCB 與封裝設計工具", marketShare: "~10%" },
        ],
      },
      {
        id: "advanced-photomask",
        name: "光罩與光柵",
        name_en: "Photomask & Reticles",
        keyInfo: "單組 EUV 光罩費用超過 $500 萬，光罩品質直接影響良率",
        marketType: "oligopoly",
        companies: [
          { id: "photronics", name: "Photronics", ticker: "PLAB", country: "US", role: "全球最大獨立光罩廠商" },
          { id: "dai_nippon", name: "大日本印刷 (DNP)", ticker: "7912.T", country: "JP", role: "EUV 光罩基板與光罩供應商" },
          { id: "toppan", name: "Toppan", ticker: "7911.T", country: "JP", role: "光罩基板與先進光罩供應商" },
          { id: "hoya", name: "Hoya", ticker: "7741.T", country: "JP", role: "EUV 光罩空白基板壟斷供應商", marketShare: "~80%" },
        ],
      },
      {
        id: "advanced-wafer-materials",
        name: "矽晶圓與材料",
        name_en: "Wafer Materials",
        keyInfo: "全球 300mm 矽晶圓市場由五大廠商壟斷，年出貨量約 1,400 萬片",
        marketType: "oligopoly",
        companies: [
          { id: "shin_etsu", name: "信越化學", ticker: "4063.T", country: "JP", role: "全球最大矽晶圓供應商", marketShare: "~30%" },
          { id: "sumco", name: "SUMCO", ticker: "3436.T", country: "JP", role: "全球第二大矽晶圓供應商", marketShare: "~25%" },
          { id: "sk_siltron", name: "SK Siltron", ticker: "Private", country: "KR", role: "SK 集團旗下矽晶圓廠商", marketShare: "~15%" },
          { id: "siltronic", name: "Siltronic", ticker: "WAF.DE", country: "DE", role: "歐洲最大矽晶圓供應商", marketShare: "~13%" },
        ],
      },
    ],
  },

  // ============================================================
  // 4. hw/gpu — AI GPU 供應鏈
  // ============================================================
  {
    id: "gpu",
    slug: "gpu",
    category: "hw",
    name: "AI GPU 供應鏈",
    name_en: "AI GPU Supply Chain",
    description:
      "從 GPU 設計架構到先進製程代工、HBM 整合封裝與 AI 伺服器系統組裝的完整 AI GPU 供應鏈追蹤。",
    icon: "🎮",
    color: "#2ECC71",
    flowSummary: "GPU 設計 → 先進製程代工 → HBM 整合封裝 → AI 伺服器系統",
    sections: [
      {
        id: "gpu-products",
        name: "GPU / AI 加速器產品",
        name_en: "GPU / Accelerator Products",
        keyInfo: "NVIDIA B200 算力達 9 PFLOPS (FP4)，單顆售價 $30,000-$40,000",
        marketType: "monopoly",
        companies: [
          { id: "nvidia", name: "NVIDIA", ticker: "NVDA", country: "US", role: "H100 → H200 → B200 → GB300 系列，AI 加速器壟斷者", marketShare: "~85%" },
          { id: "amd", name: "AMD", ticker: "AMD", country: "US", role: "MI300X → MI325X → MI400 系列，第二大 AI GPU 供應商", marketShare: "~10%" },
          { id: "intel", name: "Intel", ticker: "INTC", country: "US", role: "Gaudi 3 AI 加速器，主打性價比市場", marketShare: "~3%" },
        ],
      },
      {
        id: "gpu-design",
        name: "GPU 設計與架構",
        name_en: "GPU Design & Architecture",
        keyInfo: "NVIDIA Blackwell 架構採用雙晶粒設計，集成 2,080 億電晶體",
        marketType: "monopoly",
        companies: [
          { id: "nvidia", name: "NVIDIA", ticker: "NVDA", country: "US", role: "Hopper → Blackwell → Rubin 架構迭代，CUDA 生態系壟斷" },
          { id: "amd", name: "AMD", ticker: "AMD", country: "US", role: "CDNA 4 架構 (MI400)，ROCm 軟體生態系追趕中" },
          { id: "intel", name: "Intel", ticker: "INTC", country: "US", role: "Intel Xe GPU 架構 (Gaudi/Falcon Shores)" },
        ],
      },
      {
        id: "gpu-foundry",
        name: "代工製造",
        name_en: "Foundry Manufacturing",
        keyInfo: "NVIDIA B200 採用台積電 N4P 製程，下一代 Rubin 預計轉 N3",
        marketType: "monopoly",
        companies: [
          { id: "tsmc", name: "台積電", ticker: "2330.TW", country: "TW", role: "NVIDIA/AMD AI GPU 唯一代工夥伴，N4P/N3E 製程", marketShare: "~100%" },
          { id: "samsung", name: "Samsung Foundry", ticker: "005930.KS", country: "KR", role: "部分 NVIDIA 網通晶片代工" },
        ],
      },
      {
        id: "gpu-hbm",
        name: "HBM 記憶體整合",
        name_en: "HBM Integration",
        keyInfo: "單顆 B200 GPU 搭載 192GB HBM3E，記憶體成本佔 GPU 總成本 40%+",
        marketType: "oligopoly",
        companies: [
          { id: "sk_hynix", name: "SK Hynix", ticker: "000660.KS", country: "KR", role: "NVIDIA/AMD HBM3E 主要供應商", marketShare: "~53%" },
          { id: "micron", name: "Micron", ticker: "MU", country: "US", role: "HBM3E 第三供應商，NVIDIA 認證通過", marketShare: "~15%" },
          { id: "samsung", name: "Samsung", ticker: "005930.KS", country: "KR", role: "HBM3E 供應商，NVIDIA 良率驗證中", marketShare: "~32%" },
        ],
      },
      {
        id: "gpu-packaging",
        name: "先進封裝",
        name_en: "Advanced Packaging",
        keyInfo: "B200 GPU 使用 CoWoS-L 封裝，面積達 ~5,000 mm2，為史上最大 2.5D 封裝",
        marketType: "monopoly",
        companies: [
          { id: "tsmc", name: "台積電 CoWoS", ticker: "2330.TW", country: "TW", role: "CoWoS-S/CoWoS-L 封裝，AI GPU 2.5D 封裝壟斷", marketShare: "~90%" },
          { id: "ase", name: "日月光", ticker: "3711.TW", country: "TW", role: "GPU 後端封裝測試與 FCBGA 基板" },
          { id: "amkor", name: "Amkor", ticker: "AMKR", country: "US", role: "2.5D/3D 先進封裝技術，部分 GPU 封裝訂單" },
        ],
      },
      {
        id: "gpu-substrate",
        name: "PCB 與載板",
        name_en: "PCB & Substrate",
        keyInfo: "AI GPU 載板需使用 ABF 高階基板，價格為傳統載板 5-10 倍",
        marketType: "oligopoly",
        companies: [
          { id: "ibiden", name: "Ibiden", ticker: "4062.T", country: "JP", role: "高階 ABF 載板龍頭，NVIDIA GPU 主要基板供應商", marketShare: "~30%" },
          { id: "shinko", name: "Shinko Electric", ticker: "6967.T", country: "JP", role: "ABF 載板供應商，受惠於 AI GPU 需求", marketShare: "~20%" },
          { id: "unimicron", name: "欣興電子", ticker: "3037.TW", country: "TW", role: "台灣最大 ABF 載板廠商，AMD/Intel 供應商", marketShare: "~15%" },
          { id: "nan_ya_pcb", name: "南亞電路板", ticker: "8046.TW", country: "TW", role: "ABF 載板與高階 HDI PCB" },
        ],
      },
      {
        id: "gpu-server-odm",
        name: "伺服器 ODM 整合",
        name_en: "Server ODM Integration",
        keyInfo: "單台 DGX B200 伺服器價格達 $275,000，含 8 顆 B200 GPU",
        marketType: "oligopoly",
        companies: [
          { id: "foxconn", name: "鴻海 (Foxconn)", ticker: "2317.TW", country: "TW", role: "NVIDIA GB200 NVL72/NVL36 伺服器最大組裝商", marketShare: "~40%" },
          { id: "quanta", name: "廣達電腦", ticker: "2382.TW", country: "TW", role: "AI 伺服器 ODM 大廠，NVIDIA 與雲端客戶主力供應商", marketShare: "~25%" },
          { id: "wistron", name: "緯創資通", ticker: "3231.TW", country: "TW", role: "AI 伺服器組裝，微軟與 Meta 供應商" },
          { id: "supermicro", name: "Supermicro", ticker: "SMCI", country: "US", role: "AI 伺服器直接銷售與客製化組裝" },
        ],
      },
      {
        id: "gpu-major-customers",
        name: "主要客戶 (Hyperscalers)",
        name_en: "Major Customers",
        keyInfo: "四大 Hyperscaler 合計佔 NVIDIA 資料中心 GPU 採購量超過 50%",
        marketType: "high_growth",
        companies: [
          { id: "microsoft", name: "Microsoft / Azure", ticker: "MSFT", country: "US", role: "最大 NVIDIA GPU 買家，支援 OpenAI 訓練基礎設施" },
          { id: "meta", name: "Meta", ticker: "META", country: "US", role: "大規模 GPU 叢集部署，訓練 Llama 系列模型" },
          { id: "google", name: "Google / GCP", ticker: "GOOGL", country: "US", role: "GPU Cloud 服務與自研 TPU 並行策略" },
          { id: "amazon", name: "Amazon / AWS", ticker: "AMZN", country: "US", role: "GPU Cloud 最大平台，同時推 Trainium 替代方案" },
          { id: "oracle", name: "Oracle Cloud", ticker: "ORCL", country: "US", role: "OCI GPU 叢集快速擴張，服務 AI 新創客戶" },
        ],
      },
    ],
  },

  // ============================================================
  // 5. hw/server — AI 伺服器供應鏈
  // ============================================================
  {
    id: "server",
    slug: "server",
    category: "hw",
    name: "AI 伺服器供應鏈",
    name_en: "AI Server & Data Center Supply Chain",
    description:
      "從晶片模組到系統組裝、機架整合與資料中心部署的 AI 伺服器完整供應鏈，追蹤 ODM、散熱、電源與網路關鍵環節。",
    icon: "🖥️",
    color: "#4285F4",
    flowSummary: "晶片模組 → 主機板/系統組裝 → 機架整合 → 資料中心部署",
    sections: [
      {
        id: "server-platforms",
        name: "AI 伺服器平台",
        name_en: "Server Platforms Overview",
        keyInfo: "NVIDIA GB200 NVL72 機架含 72 顆 GPU，單機架算力達 720 PFLOPS (FP4)",
        marketType: "high_growth",
        companies: [
          { id: "nvidia", name: "NVIDIA", ticker: "NVDA", country: "US", role: "DGX/HGX/MGX/GB200 NVL 平台定義者" },
          { id: "amd", name: "AMD", ticker: "AMD", country: "US", role: "Instinct MI300X/MI325X 平台，搭配 EPYC CPU" },
          { id: "intel", name: "Intel", ticker: "INTC", country: "US", role: "Gaudi 3 加速器搭配 Xeon CPU 平台" },
        ],
      },
      {
        id: "server-gpu-modules",
        name: "GPU 模組與加速卡",
        name_en: "GPU Modules & Accelerators",
        keyInfo: "2025 年全球 AI 加速器出貨量預估超過 600 萬顆",
        marketType: "monopoly",
        companies: [
          { id: "nvidia", name: "NVIDIA", ticker: "NVDA", country: "US", role: "H100/H200/B200/GB300 SXM/NVLink 加速模組", marketShare: "~85%" },
          { id: "amd", name: "AMD", ticker: "AMD", country: "US", role: "MI300X OAM 加速模組", marketShare: "~10%" },
          { id: "google", name: "Google", ticker: "GOOGL", country: "US", role: "TPU v5p/v6 — 僅 Google Cloud 使用" },
          { id: "amazon", name: "AWS", ticker: "AMZN", country: "US", role: "Trainium2 / Inferentia2 — 僅 AWS 使用" },
        ],
      },
      {
        id: "server-odm-oem",
        name: "伺服器 ODM/OEM",
        name_en: "Server ODM/OEM",
        keyInfo: "台灣 ODM 廠合計生產全球超過 90% AI 伺服器",
        marketType: "oligopoly",
        companies: [
          { id: "foxconn", name: "鴻海 (Foxconn)", ticker: "2317.TW", country: "TW", role: "全球最大 AI 伺服器組裝商，GB200 NVL72 主力", marketShare: "~40%" },
          { id: "quanta", name: "廣達電腦", ticker: "2382.TW", country: "TW", role: "第二大 AI 伺服器 ODM，NVIDIA/雲端雙軌客戶", marketShare: "~25%" },
          { id: "wistron", name: "緯創資通", ticker: "3231.TW", country: "TW", role: "AI 伺服器組裝，Meta 與微軟主要供應商", marketShare: "~10%" },
          { id: "inventec", name: "英業達", ticker: "2356.TW", country: "TW", role: "AI 伺服器 ODM，HP 與 Dell 代工" },
          { id: "supermicro", name: "Supermicro", ticker: "SMCI", country: "US", role: "AI 伺服器直銷 OEM，自有品牌與客製化方案" },
        ],
      },
      {
        id: "server-networking",
        name: "網路設備與晶片",
        name_en: "Networking",
        keyInfo: "AI 叢集網路頻寬需求從 400G 快速升級至 800G/1.6T",
        marketType: "oligopoly",
        companies: [
          { id: "nvidia", name: "NVIDIA (Mellanox)", ticker: "NVDA", country: "US", role: "InfiniBand / NVLink Switch — AI 叢集高速互連", marketShare: "~80%" },
          { id: "arista", name: "Arista Networks", ticker: "ANET", country: "US", role: "資料中心 Ethernet Switch 龍頭，AI 後端網路" },
          { id: "broadcom", name: "Broadcom", ticker: "AVGO", country: "US", role: "Tomahawk/Jericho 網路交換晶片，PCIe Switch" },
          { id: "cisco", name: "Cisco", ticker: "CSCO", country: "US", role: "資料中心 Ethernet 與 AI 網路方案" },
        ],
      },
      {
        id: "server-power",
        name: "電源供應與管理",
        name_en: "Power Supply & Management",
        keyInfo: "單台 GB200 NVL72 機架功耗達 120kW，推升高瓦數電源需求激增",
        marketType: "high_growth",
        companies: [
          { id: "delta", name: "台達電", ticker: "2308.TW", country: "TW", role: "AI 伺服器電源供應器 (3kW+) 龍頭", marketShare: "~30%" },
          { id: "liteon", name: "光寶科技", ticker: "2301.TW", country: "TW", role: "伺服器電源供應器，轉型高瓦數 AI 電源" },
          { id: "vertiv", name: "Vertiv", ticker: "VRT", country: "US", role: "資料中心電源基礎設施與 UPS 系統" },
          { id: "eaton", name: "Eaton", ticker: "ETN", country: "US", role: "資料中心配電與 UPS 系統" },
        ],
      },
      {
        id: "server-cooling",
        name: "散熱解決方案",
        name_en: "Cooling Solutions",
        keyInfo: "液冷滲透率預計從 2024 年 <10% 提升至 2027 年 >50%",
        marketType: "high_growth",
        companies: [
          { id: "cooler_master", name: "Cooler Master", ticker: "Private", country: "TW", role: "伺服器散熱模組與液冷方案" },
          { id: "auras", name: "雙鴻科技", ticker: "3324.TW", country: "TW", role: "AI 伺服器散熱模組，NVIDIA 認證供應商" },
          { id: "vertiv", name: "Vertiv", ticker: "VRT", country: "US", role: "資料中心液冷 CDU 與精密空調系統" },
          { id: "schneider", name: "Schneider Electric", ticker: "SU.PA", country: "FR", role: "資料中心冷卻與電力基礎設施整合方案" },
        ],
      },
      {
        id: "server-datacenter",
        name: "資料中心營運商",
        name_en: "Data Center Operators",
        keyInfo: "2025 年全球 Hyperscaler 資本支出預估超過 $3,000 億，AI 佔比持續攀升",
        marketType: "high_growth",
        companies: [
          { id: "microsoft", name: "Microsoft Azure", ticker: "MSFT", country: "US", role: "全球第二大雲端平台，AI 基礎設施投資最積極" },
          { id: "amazon", name: "AWS", ticker: "AMZN", country: "US", role: "全球最大雲端平台，GPU 實例與自研晶片並行" },
          { id: "google", name: "Google Cloud", ticker: "GOOGL", country: "US", role: "第三大雲端平台，TPU + GPU 雙軌 AI 服務" },
          { id: "meta", name: "Meta", ticker: "META", country: "US", role: "自建大規模 AI 訓練資料中心，非公有雲模式" },
          { id: "oracle", name: "Oracle Cloud", ticker: "ORCL", country: "US", role: "OCI GPU 超級叢集，服務 AI 新創與企業客戶" },
        ],
      },
    ],
  },

  // ============================================================
  // 6. sw/ai_stack — AI 軟體與模型生態系
  // ============================================================
  {
    id: "ai_stack",
    slug: "ai_stack",
    category: "sw",
    name: "AI 軟體與模型生態系",
    name_en: "AI Software & Model Ecosystem",
    description:
      "從基礎模型訓練、雲端 AI 基礎設施到模型服務平台與企業應用部署的完整 AI 軟體生態系追蹤。",
    icon: "🧠",
    color: "#9B59B6",
    flowSummary: "基礎模型訓練 → 模型服務平台 → AI 應用框架 → 企業端部署",
    sections: [
      {
        id: "ai-foundation-models",
        name: "基礎模型公司",
        name_en: "Foundation Model Companies",
        keyInfo: "全球基礎模型公司累計融資超過 $500 億，GPT/Claude/Gemini 三強鼎立",
        marketType: "high_growth",
        companies: [
          { id: "openai", name: "OpenAI", ticker: "Private", country: "US", role: "GPT-4o/o3 — 全球最大 AI 模型公司，估值 $3,000 億+", marketShare: "~50%" },
          { id: "anthropic", name: "Anthropic", ticker: "Private", country: "US", role: "Claude 4 系列 — 強調安全性的 AI 模型公司，估值 $600 億+" },
          { id: "google_deepmind", name: "Google DeepMind", ticker: "GOOGL", country: "US", role: "Gemini 2.5 系列 — Google 旗下 AI 研究實驗室" },
          { id: "meta_ai", name: "Meta AI", ticker: "META", country: "US", role: "Llama 4 系列 — 全球最大開源模型生態系" },
          { id: "mistral", name: "Mistral AI", ticker: "Private", country: "FR", role: "歐洲最大 AI 模型公司，開源與商用雙軌策略" },
        ],
      },
      {
        id: "ai-cloud-infra",
        name: "雲端 AI 基礎設施",
        name_en: "Cloud AI Infrastructure",
        keyInfo: "全球雲端 AI 服務市場 2025 年預估達 $1,500 億，三大雲佔比超過 65%",
        marketType: "oligopoly",
        companies: [
          { id: "amazon", name: "AWS", ticker: "AMZN", country: "US", role: "Bedrock/SageMaker — 最大雲端 AI 平台", marketShare: "~32%" },
          { id: "microsoft", name: "Microsoft Azure", ticker: "MSFT", country: "US", role: "Azure OpenAI Service — 企業 AI 平台首選", marketShare: "~24%" },
          { id: "google", name: "Google Cloud", ticker: "GOOGL", country: "US", role: "Vertex AI — TPU/GPU 雲端 AI 訓練與推論", marketShare: "~11%" },
          { id: "oracle", name: "Oracle Cloud", ticker: "ORCL", country: "US", role: "OCI AI 服務 — GPU 超級叢集快速擴張" },
        ],
      },
      {
        id: "ai-training-frameworks",
        name: "AI 訓練框架",
        name_en: "AI Training Frameworks",
        keyInfo: "PyTorch 佔研究與訓練框架使用率超過 80%，JAX 在 Google 生態系快速成長",
        marketType: "oligopoly",
        companies: [
          { id: "meta_ai", name: "Meta (PyTorch)", ticker: "META", country: "US", role: "PyTorch — 全球最廣泛使用的 AI 訓練框架", marketShare: "~80%" },
          { id: "google_jax", name: "Google (JAX)", ticker: "GOOGL", country: "US", role: "JAX/Flax — 高效能數值計算與 TPU 原生框架" },
          { id: "nvidia_nemo", name: "NVIDIA (NeMo)", ticker: "NVDA", country: "US", role: "NeMo/Megatron-LM — 大規模 LLM 訓練框架" },
          { id: "huggingface", name: "Hugging Face", ticker: "Private", country: "US", role: "Transformers/Accelerate — 開源模型 Hub 與訓練工具" },
        ],
      },
      {
        id: "ai-model-serving",
        name: "模型服務與推論",
        name_en: "Model Serving & Inference",
        keyInfo: "推論運算佔 AI 算力消耗 60%+，推論優化成為降低成本關鍵",
        marketType: "high_growth",
        companies: [
          { id: "nvidia_triton", name: "NVIDIA (TensorRT/Triton)", ticker: "NVDA", country: "US", role: "TensorRT-LLM / Triton — GPU 推論優化與服務框架" },
          { id: "vllm", name: "vLLM (UC Berkeley)", ticker: "Private", country: "US", role: "vLLM — 高效能開源 LLM 推論引擎，PagedAttention 技術" },
          { id: "together_ai", name: "Together AI", ticker: "Private", country: "US", role: "雲端推論 API 與開源模型託管平台" },
          { id: "fireworks_ai", name: "Fireworks AI", ticker: "Private", country: "US", role: "快速推論 API，支援 Function Calling 與多模態" },
        ],
      },
      {
        id: "ai-application-platforms",
        name: "AI 應用平台",
        name_en: "AI Application Platforms",
        keyInfo: "企業 AI 應用市場 2025 年預估達 $800 億，年增長率超過 35%",
        marketType: "high_growth",
        companies: [
          { id: "microsoft", name: "Microsoft Copilot", ticker: "MSFT", country: "US", role: "Microsoft 365 Copilot / GitHub Copilot — 企業 AI 助手" },
          { id: "salesforce", name: "Salesforce", ticker: "CRM", country: "US", role: "Einstein AI / Agentforce — CRM AI 自動化平台" },
          { id: "servicenow", name: "ServiceNow", ticker: "NOW", country: "US", role: "Now Assist — 企業 IT 流程 AI 自動化" },
          { id: "databricks", name: "Databricks", ticker: "Private", country: "US", role: "Mosaic ML / DBRX — 企業級 AI 數據平台" },
        ],
      },
      {
        id: "ai-chip-software",
        name: "AI 晶片軟體生態系",
        name_en: "AI Chip Software Ecosystem",
        keyInfo: "CUDA 生態系護城河深厚，超過 500 萬開發者與 1,000+ GPU 加速函式庫",
        marketType: "monopoly",
        companies: [
          { id: "nvidia", name: "NVIDIA (CUDA)", ticker: "NVDA", country: "US", role: "CUDA / cuDNN / NCCL — GPU 運算軟體生態系壟斷者", marketShare: "~90%" },
          { id: "amd", name: "AMD (ROCm)", ticker: "AMD", country: "US", role: "ROCm / MIOpen — 開源 GPU 運算軟體堆疊" },
          { id: "intel", name: "Intel (oneAPI)", ticker: "INTC", country: "US", role: "oneAPI / OpenVINO — 跨平台 AI 加速軟體" },
          { id: "openai_triton", name: "OpenAI (Triton Lang)", ticker: "Private", country: "US", role: "Triton — 開源 GPU kernel 編程語言，降低 CUDA 依賴" },
        ],
      },
    ],
  },

  // ============================================================
  // 7. hw/cowos — CoWoS 先進封裝供應鏈
  // ============================================================
  {
    id: "cowos",
    slug: "cowos",
    category: "hw",
    name: "CoWoS 先進封裝供應鏈",
    name_en: "Advanced Packaging Supply Chain",
    description:
      "追蹤 CoWoS 先進封裝從中介層製造、封裝整合到 HBM 堆疊與系統級測試的完整供應鏈，分析產能瓶頸與 OSAT 委外趨勢。",
    icon: "📦",
    color: "#E67E22",
    flowSummary: "晶圓製造 → 中介層/RDL → CoWoS 整合封裝 → HBM 堆疊 → 系統級封裝測試",
    sections: [
      {
        id: "cowos-tech-overview",
        name: "CoWoS 產品技術總覽",
        name_en: "CoWoS Technology Overview",
        keyInfo: "CoWoS-L 封裝面積可達 5x reticle size，支援多 chiplet 整合，為 AI 超大晶片封裝首選方案",
        marketType: "high_growth",
        companies: [
          { id: "tsmc", name: "台積電", ticker: "2330.TW", country: "TW", role: "CoWoS-S / CoWoS-L / SoIC 三大先進封裝技術平台開發者" },
          { id: "nvidia", name: "NVIDIA", ticker: "NVDA", country: "US", role: "Blackwell GPU 採用 CoWoS-L 封裝，驅動技術演進主要推手" },
          { id: "amd", name: "AMD", ticker: "AMD", country: "US", role: "MI300X 採用 CoWoS-S 封裝整合 CPU+GPU+HBM chiplet" },
          { id: "broadcom", name: "Broadcom", ticker: "AVGO", country: "US", role: "XPU ASIC 大量採用 CoWoS 封裝，推動 CoWoS-L 產能需求" },
        ],
      },
      {
        id: "cowos-interposer",
        name: "中介層製造 (Interposer / RDL)",
        name_en: "Interposer / RDL Manufacturing",
        keyInfo: "台積電壟斷矽中介層製造，CoWoS-L 採用 RDL interposer 突破面積限制",
        marketType: "monopoly",
        companies: [
          { id: "tsmc", name: "台積電", ticker: "2330.TW", country: "TW", role: "矽中介層 (Si interposer) 與 InFO-based RDL 唯一量產供應商", marketShare: "~95%" },
          { id: "umc", name: "聯電", ticker: "2303.TW", country: "TW", role: "成熟製程矽中介層代工，爭取 CoWoS 溢出產能訂單" },
          { id: "samsung", name: "Samsung Foundry", ticker: "005930.KS", country: "KR", role: "I-Cube / H-Cube 2.5D 封裝平台，開發自有中介層技術", marketShare: "~3%" },
        ],
      },
      {
        id: "cowos-capacity",
        name: "CoWoS 封裝產能",
        name_en: "CoWoS Packaging Capacity",
        keyInfo: "2025 年台積電 CoWoS 月產能目標 4.5 萬片，仍無法滿足 AI 晶片爆發性需求",
        marketType: "monopoly",
        companies: [
          { id: "tsmc", name: "台積電 CoWoS", ticker: "2330.TW", country: "TW", role: "CoWoS-S/CoWoS-L 封裝產能壟斷者，持續擴產仍供不應求", marketShare: "~90%" },
          { id: "ase", name: "日月光", ticker: "3711.TW", country: "TW", role: "承接台積電 CoWoS 溢出產能，Fan-out 先進封裝產線擴建中" },
          { id: "amkor", name: "Amkor", ticker: "AMKR", country: "US", role: "2.5D 先進封裝產能擴充，承接部分 CoWoS 替代訂單" },
        ],
      },
      {
        id: "cowos-osat",
        name: "OSAT 封裝委外",
        name_en: "OSAT Outsourced Packaging",
        keyInfo: "台積電產能不足推動 OSAT 廠投資 2.5D 先進封裝技術，2025 年 OSAT 先進封裝營收年增 30%+",
        marketType: "oligopoly",
        companies: [
          { id: "ase", name: "日月光", ticker: "3711.TW", country: "TW", role: "全球最大 OSAT 廠，先進封裝技術 (FOCoS) 承接 AI 晶片封裝", marketShare: "~35%" },
          { id: "amkor", name: "Amkor", ticker: "AMKR", country: "US", role: "全球第二大 OSAT 廠，2.5D/3D 封裝技術服務 Apple 與 AI 客戶", marketShare: "~20%" },
          { id: "spil", name: "矽品精密 (SPIL)", ticker: "3711.TW", country: "TW", role: "日月光集團旗下，先進封裝產能擴充中", marketShare: "~15%" },
          { id: "jcet", name: "長電科技 (JCET)", ticker: "600584.SS", country: "CN", role: "中國最大 OSAT 廠，投資 2.5D 封裝技術追趕" },
        ],
      },
      {
        id: "cowos-hbm-integration",
        name: "HBM 整合封裝",
        name_en: "HBM Integration on CoWoS",
        keyInfo: "HBM3E 12-Hi 堆疊需精密 TSV 對準與熱壓接合，CoWoS 封裝上整合 6-8 顆 HBM 已成標準配置",
        marketType: "oligopoly",
        companies: [
          { id: "sk_hynix", name: "SK Hynix", ticker: "000660.KS", country: "KR", role: "HBM3E/HBM4 堆疊封裝技術領先，供應 CoWoS 整合所需 HBM 晶粒", marketShare: "~53%" },
          { id: "samsung", name: "Samsung", ticker: "005930.KS", country: "KR", role: "HBM3E 封裝良率提升中，12-Hi 堆疊技術追趕 SK Hynix", marketShare: "~32%" },
          { id: "micron", name: "Micron", ticker: "MU", country: "US", role: "HBM3E 8-Hi/12-Hi 通過 NVIDIA 認證，與 CoWoS 封裝整合", marketShare: "~15%" },
          { id: "tsmc", name: "台積電", ticker: "2330.TW", country: "TW", role: "CoWoS 封裝時整合 HBM 晶粒到中介層上，為最終封裝整合者" },
        ],
      },
      {
        id: "cowos-bonding-equipment",
        name: "封裝設備供應商",
        name_en: "Packaging Equipment Suppliers",
        keyInfo: "熱壓接合 (TCB) 設備需求因 HBM 與 CoWoS 爆發性成長，BESI TCB 設備交期超過 12 個月",
        marketType: "oligopoly",
        companies: [
          { id: "besi", name: "BE Semiconductor (BESI)", ticker: "BESI.AS", country: "NL", role: "熱壓接合 (TCB) 設備龍頭，HBM die bonding 與 CoWoS 關鍵設備", marketShare: "~40%" },
          { id: "kulicke_soffa", name: "Kulicke & Soffa", ticker: "KLIC", country: "US", role: "先進封裝打線接合與 TCB 設備，轉型先進封裝市場" },
          { id: "asmpt", name: "ASMPT (ASM Pacific)", ticker: "0522.HK", country: "HK", role: "半導體封裝設備與 SMT 解決方案，die bonding 主要供應商", marketShare: "~25%" },
          { id: "evg", name: "EV Group", ticker: "Private", country: "AT", role: "晶圓接合與光刻對準設備，CoWoS 晶圓級封裝關鍵設備" },
        ],
      },
      {
        id: "cowos-substrate-materials",
        name: "封裝基板與材料",
        name_en: "Substrates & Materials",
        keyInfo: "ABF 載板為 AI 晶片封裝瓶頸之一，高階 ABF 基板單片價格達數百美元，供不應求",
        marketType: "oligopoly",
        companies: [
          { id: "ibiden", name: "Ibiden", ticker: "4062.T", country: "JP", role: "高階 ABF 載板龍頭，NVIDIA/AMD AI GPU 主要基板供應商", marketShare: "~30%" },
          { id: "shinko", name: "Shinko Electric", ticker: "6967.T", country: "JP", role: "ABF 載板第二大供應商，先進封裝基板技術領先", marketShare: "~20%" },
          { id: "ajinomoto", name: "味之素精細科技", ticker: "2802.T", country: "JP", role: "ABF (Ajinomoto Build-up Film) 絕緣膜壟斷供應商，先進封裝關鍵材料", marketShare: "~90%" },
          { id: "unimicron", name: "欣興電子", ticker: "3037.TW", country: "TW", role: "台灣最大 ABF 載板廠商，積極擴充 AI 晶片封裝基板產能", marketShare: "~15%" },
        ],
      },
      {
        id: "cowos-testing",
        name: "測試設備",
        name_en: "Testing Equipment",
        keyInfo: "CoWoS 封裝後系統級測試 (SLT) 時間長達數小時，測試成本佔封裝總成本 15-20%",
        marketType: "oligopoly",
        companies: [
          { id: "advantest", name: "Advantest", ticker: "6857.T", country: "JP", role: "SoC 與 HBM 測試設備龍頭，AI 晶片測試需求驅動營收創新高", marketShare: "~55%" },
          { id: "teradyne", name: "Teradyne", ticker: "TER", country: "US", role: "半導體自動測試設備 (ATE)，SoC 與記憶體測試方案", marketShare: "~30%" },
          { id: "cohu", name: "Cohu", ticker: "COHU", country: "US", role: "測試分選設備 (Handler) 與接觸器，後端測試自動化" },
          { id: "chroma", name: "致茂電子", ticker: "2360.TW", country: "TW", role: "系統級測試 (SLT) 與自動化測試設備，AI 伺服器電源測試" },
        ],
      },
      {
        id: "cowos-customers",
        name: "主要客戶與需求",
        name_en: "Key Customers & Demand",
        keyInfo: "NVIDIA 獨佔約 60% CoWoS 產能，Broadcom XPU 與 AMD MI 系列為第二、三大客戶",
        marketType: "high_growth",
        companies: [
          { id: "nvidia", name: "NVIDIA", ticker: "NVDA", country: "US", role: "CoWoS 最大客戶，B200/GB300 GPU 驅動 CoWoS-L 產能需求", marketShare: "~60%" },
          { id: "amd", name: "AMD", ticker: "AMD", country: "US", role: "MI300X/MI400 系列使用 CoWoS-S 封裝", marketShare: "~10%" },
          { id: "broadcom", name: "Broadcom", ticker: "AVGO", country: "US", role: "Google TPU / Meta MTIA 等 XPU 採用 CoWoS 封裝", marketShare: "~15%" },
          { id: "google", name: "Google", ticker: "GOOGL", country: "US", role: "TPU v5p/v6 採用 CoWoS 封裝，間接推動產能需求" },
          { id: "amazon", name: "Amazon", ticker: "AMZN", country: "US", role: "Trainium2 ASIC 採用先進封裝，貢獻 CoWoS 需求成長" },
        ],
      },
    ],
  },

  // ============================================================
  // 8. hw/cpo — CPO 共封裝光學供應鏈
  // ============================================================
  {
    id: "cpo",
    slug: "cpo",
    category: "hw",
    name: "CPO 共封裝光學供應鏈",
    name_en: "Co-Packaged Optics Supply Chain",
    description:
      "追蹤共封裝光學 (CPO) 從光源雷射、矽光子晶片到光電整合封裝與資料中心互連的完整供應鏈，分析 AI 驅動的光通訊技術變革。",
    icon: "🔬",
    color: "#3498DB",
    flowSummary: "光源/雷射 → 矽光子晶片 → 光電整合封裝 → 光收發模組 → 資料中心互連",
    sections: [
      {
        id: "cpo-tech-overview",
        name: "CPO 技術總覽",
        name_en: "CPO Technology Overview",
        keyInfo: "CPO 將光學元件與交換晶片共封裝，可降低功耗 30-50%，為 AI 資料中心 51.2T+ 互連關鍵技術",
        marketType: "emerging",
        companies: [
          { id: "broadcom", name: "Broadcom", ticker: "AVGO", country: "US", role: "CPO 技術領導者，Bailly CPO 平台搭配 Tomahawk 5 交換晶片" },
          { id: "nvidia", name: "NVIDIA", ticker: "NVDA", country: "US", role: "NVLink 與光互連技術整合，推動下一代 GPU 叢集光學互連" },
          { id: "intel", name: "Intel", ticker: "INTC", country: "US", role: "矽光子先驅，開發整合式光學 I/O 與 CPO 解決方案" },
          { id: "cisco", name: "Cisco", ticker: "CSCO", country: "US", role: "收購 Acacia 進入矽光子市場，資料中心 CPO 方案開發中" },
        ],
      },
      {
        id: "cpo-silicon-photonics",
        name: "矽光子平台",
        name_en: "Silicon Photonics Platforms",
        keyInfo: "矽光子利用 CMOS 製程整合光學元件，GlobalFoundries 與 TSMC 均推出矽光子製程平台",
        marketType: "emerging",
        companies: [
          { id: "globalfoundries", name: "GlobalFoundries", ticker: "GFS", country: "US", role: "矽光子代工領導者，GF Fotonix 300mm 矽光子平台量產中", marketShare: "~40%" },
          { id: "tsmc", name: "台積電", ticker: "2330.TW", country: "TW", role: "COUPE (Compact Universal Photonic Engine) 矽光子平台開發中" },
          { id: "intel", name: "Intel", ticker: "INTC", country: "US", role: "自有矽光子晶圓廠，整合式光學收發器技術領先" },
          { id: "tower_semi", name: "Tower Semiconductor", ticker: "TSEM", country: "IL", role: "特殊製程矽光子代工，服務中小型光通訊客戶" },
        ],
      },
      {
        id: "cpo-laser-sources",
        name: "光源 / 雷射",
        name_en: "Laser Sources",
        keyInfo: "EEL/VCSEL 雷射為矽光子晶片外部光源，III-V 族材料與矽的異質整合為 CPO 核心挑戰",
        marketType: "oligopoly",
        companies: [
          { id: "coherent", name: "Coherent (原 II-VI)", ticker: "COHR", country: "US", role: "III-V 族雷射與光學元件龍頭，CPO 外部光源 (EEL) 主要供應商", marketShare: "~35%" },
          { id: "lumentum", name: "Lumentum", ticker: "LITE", country: "US", role: "高功率雷射與光子元件，VCSEL/DFB 雷射供應商", marketShare: "~25%" },
          { id: "source_photonics", name: "Source Photonics", ticker: "Private", country: "US", role: "光收發模組與光源元件供應商，專注資料中心市場" },
          { id: "neophotonics", name: "Lumentum (原 NeoPhotonics)", ticker: "LITE", country: "US", role: "高速光學元件技術，併入 Lumentum 後強化 CPO 元件佈局" },
        ],
      },
      {
        id: "cpo-transceivers",
        name: "光收發器模組",
        name_en: "Optical Transceivers",
        keyInfo: "800G 光模組 2025 年出貨量年增 150%+，1.6T 光模組預計 2026 年量產",
        marketType: "high_growth",
        companies: [
          { id: "innolight", name: "中際旭創 (Innolight)", ticker: "300308.SZ", country: "CN", role: "全球 800G 光模組出貨量第一，NVIDIA 與 Microsoft 主要供應商", marketShare: "~35%" },
          { id: "broadcom", name: "Broadcom", ticker: "AVGO", country: "US", role: "光模組 DSP 晶片龍頭，同時供應 CPO 與 Pluggable 方案" },
          { id: "marvell", name: "Marvell", ticker: "MRVL", country: "US", role: "PAM4 DSP 與光模組控制晶片，800G/1.6T 方案" },
          { id: "coherent", name: "Coherent", ticker: "COHR", country: "US", role: "800G/1.6T 光收發模組與光學元件垂直整合供應商" },
          { id: "eoptolink", name: "易飛揚 (Eoptolink)", ticker: "300502.SZ", country: "CN", role: "800G 光模組中國第二大供應商，AI 資料中心客戶擴張中" },
        ],
      },
      {
        id: "cpo-fiber-connectors",
        name: "光纖 / 連接器",
        name_en: "Fiber & Connectors",
        keyInfo: "AI 資料中心單一機架光纖連接數達數百條，高密度光纖連接器需求激增",
        marketType: "oligopoly",
        companies: [
          { id: "corning", name: "Corning", ticker: "GLW", country: "US", role: "全球最大光纖供應商，AI 資料中心光纖佈線需求爆發", marketShare: "~40%" },
          { id: "amphenol", name: "Amphenol", ticker: "APH", country: "US", role: "高速光學連接器龍頭，CPO 與 800G 光模組連接方案" },
          { id: "te_connectivity", name: "TE Connectivity", ticker: "TEL", country: "CH", role: "光纖連接器與高速互連解決方案" },
          { id: "us_conec", name: "US Conec", ticker: "Private", country: "US", role: "多芯 (MPO/MTP) 光纖連接器專業供應商" },
        ],
      },
      {
        id: "cpo-packaging-integration",
        name: "CPO 封裝整合",
        name_en: "CPO Packaging Integration",
        keyInfo: "CPO 需將光學 die 與電子 die 在同一基板上共封裝，對先進封裝技術提出全新挑戰",
        marketType: "emerging",
        companies: [
          { id: "tsmc", name: "台積電", ticker: "2330.TW", country: "TW", role: "COUPE 矽光子整合封裝平台，CoWoS 技術延伸至光電共封裝" },
          { id: "ase", name: "日月光", ticker: "3711.TW", country: "TW", role: "光電整合封裝技術開發中，SiP 封裝應用於光模組" },
          { id: "intel", name: "Intel", ticker: "INTC", country: "US", role: "EMIB/Foveros 封裝技術應用於矽光子整合" },
          { id: "broadcom", name: "Broadcom", ticker: "AVGO", country: "US", role: "CPO 光學 die 與 switch die 共封裝設計與整合" },
        ],
      },
      {
        id: "cpo-eda-photonics",
        name: "光子 EDA / 設計工具",
        name_en: "Photonic EDA & Design Tools",
        keyInfo: "光子 IC 設計工具市場處早期階段，Synopsys 與 Cadence 積極收購與開發光子模擬工具",
        marketType: "oligopoly",
        companies: [
          { id: "synopsys", name: "Synopsys", ticker: "SNPS", country: "US", role: "OptoCompiler — 光子 IC 設計與模擬工具，光電協同設計平台", marketShare: "~45%" },
          { id: "cadence", name: "Cadence", ticker: "CDNS", country: "US", role: "光子設計與電磁場模擬工具，光電整合設計流程" },
          { id: "ansys", name: "Ansys (Synopsys 旗下)", ticker: "SNPS", country: "US", role: "Lumerical 光子模擬引擎 — 矽光子元件與系統級模擬領導者" },
          { id: "luceda", name: "Luceda Photonics", ticker: "Private", country: "BE", role: "IPKISS 光子 IC 設計框架，矽光子 PDK 開發工具" },
        ],
      },
      {
        id: "cpo-datacenter-customers",
        name: "資料中心客戶",
        name_en: "Data Center Customer Adoption",
        keyInfo: "Hyperscaler CPO 導入時程預估 2027-2028 年大規模量產，51.2T+ switch 為首要應用場景",
        marketType: "high_growth",
        companies: [
          { id: "microsoft", name: "Microsoft Azure", ticker: "MSFT", country: "US", role: "積極評估 CPO 技術，AI 資料中心光互連升級計畫" },
          { id: "google", name: "Google Cloud", ticker: "GOOGL", country: "US", role: "TPU Pod 光互連需求驅動 CPO 技術導入" },
          { id: "amazon", name: "AWS", ticker: "AMZN", country: "US", role: "資料中心光互連大規模升級，800G/1.6T 光模組主要買家" },
          { id: "meta", name: "Meta", ticker: "META", country: "US", role: "大規模 AI 訓練叢集光互連需求，推動 CPO 技術評估" },
        ],
      },
    ],
  },

  // ============================================================
  // 9. hw/icdesign — IC 設計 (Fabless/EDA/IP) 供應鏈
  // ============================================================
  {
    id: "icdesign",
    slug: "icdesign",
    category: "hw",
    name: "IC 設計 (Fabless/EDA/IP) 供應鏈",
    name_en: "IC Design Ecosystem",
    description:
      "涵蓋從 EDA 設計工具、IP 授權、晶片設計到驗證模擬的完整 IC 設計生態系，追蹤 AI 加速器、行動處理器與網通晶片設計趨勢。",
    icon: "⚡",
    color: "#2ECC71",
    flowSummary: "EDA 工具 → IP 授權 → 晶片設計 → 驗證/模擬 → Tape-out → 量產",
    sections: [
      {
        id: "icdesign-ai-accelerator",
        name: "AI 加速器設計",
        name_en: "AI Accelerator Design",
        keyInfo: "AI 加速器晶片設計投入達數十億美元，NVIDIA Blackwell 研發費用佔營收 15%+",
        marketType: "high_growth",
        companies: [
          { id: "nvidia", name: "NVIDIA", ticker: "NVDA", country: "US", role: "Blackwell/Rubin GPU 架構設計，AI 加速器設計龍頭", marketShare: "~85%" },
          { id: "amd", name: "AMD", ticker: "AMD", country: "US", role: "CDNA 4 (MI400) 架構設計，CPU+GPU 異構整合", marketShare: "~10%" },
          { id: "intel", name: "Intel", ticker: "INTC", country: "US", role: "Gaudi 3 / Falcon Shores AI 加速器設計" },
          { id: "google", name: "Google", ticker: "GOOGL", country: "US", role: "TPU v5p/v6 自研 AI 加速器設計，搭配 Arm CPU 核心" },
          { id: "amazon", name: "Amazon", ticker: "AMZN", country: "US", role: "Trainium2 / Inferentia 自研推論與訓練晶片設計" },
        ],
      },
      {
        id: "icdesign-mobile-soc",
        name: "行動處理器設計",
        name_en: "Mobile SoC Design",
        keyInfo: "旗艦行動 SoC 已整合 NPU，Snapdragon 8 Elite 與 Dimensity 9400 內建超 40 TOPS AI 算力",
        marketType: "oligopoly",
        companies: [
          { id: "qualcomm", name: "Qualcomm", ticker: "QCOM", country: "US", role: "Snapdragon 8 Elite — 旗艦行動 SoC，Oryon CPU + Adreno GPU", marketShare: "~35%" },
          { id: "mediatek", name: "聯發科", ticker: "2454.TW", country: "TW", role: "Dimensity 9400 — 中高階行動 SoC，全球出貨量第一", marketShare: "~38%" },
          { id: "apple", name: "Apple", ticker: "AAPL", country: "US", role: "A18 Pro / M4 系列 — 自研 ARM 架構晶片，台積電 3nm 製程", marketShare: "~20%" },
          { id: "samsung_lsi", name: "Samsung LSI", ticker: "005930.KS", country: "KR", role: "Exynos 2500 — 自研行動 SoC，Galaxy 系列部分機型搭載" },
        ],
      },
      {
        id: "icdesign-networking",
        name: "網通 / 基礎設施晶片",
        name_en: "Networking & Infrastructure Chips",
        keyInfo: "AI 資料中心推動 800G/1.6T 網路交換晶片需求，Broadcom Tomahawk 5 市佔率超過 70%",
        marketType: "oligopoly",
        companies: [
          { id: "broadcom", name: "Broadcom", ticker: "AVGO", country: "US", role: "Tomahawk 5 / Jericho3 網路交換晶片龍頭，XPU ASIC 設計服務", marketShare: "~70%" },
          { id: "marvell", name: "Marvell", ticker: "MRVL", country: "US", role: "DPU / 網路交換晶片，客製化 AI 晶片設計服務" },
          { id: "cisco", name: "Cisco", ticker: "CSCO", country: "US", role: "Silicon One 自研交換晶片，資料中心網路設備龍頭" },
          { id: "arista", name: "Arista Networks", ticker: "ANET", country: "US", role: "雲端資料中心 Ethernet 交換器，搭配 Broadcom/自研晶片" },
        ],
      },
      {
        id: "icdesign-eda-tools",
        name: "EDA 設計工具",
        name_en: "EDA Design Tools",
        keyInfo: "EDA 工具市場由 Synopsys 與 Cadence 雙寡頭壟斷，合計市佔率超過 85%，毛利率逾 80%",
        marketType: "monopoly",
        companies: [
          { id: "synopsys", name: "Synopsys", ticker: "SNPS", country: "US", role: "Fusion Compiler / VCS / Design Compiler — 全球最大 EDA 公司", marketShare: "~55%" },
          { id: "cadence", name: "Cadence", ticker: "CDNS", country: "US", role: "Innovus / Genus / Cerebrus AI — 全球第二大 EDA 公司", marketShare: "~33%" },
          { id: "siemens_eda", name: "Siemens EDA", ticker: "SIE.DE", country: "DE", role: "Calibre 光罩驗證 / Questa 模擬 — 前 Mentor Graphics", marketShare: "~10%" },
        ],
      },
      {
        id: "icdesign-cpu-ip",
        name: "CPU / GPU IP 授權",
        name_en: "CPU / GPU IP Licensing",
        keyInfo: "Arm 架構佔全球行動處理器市佔率 99%，RISC-V 在 IoT 與嵌入式市場加速滲透",
        marketType: "monopoly",
        companies: [
          { id: "arm", name: "Arm Holdings", ticker: "ARM", country: "GB", role: "Cortex / Neoverse CPU IP 授權壟斷者，CSS 加速設計流程", marketShare: "~95%" },
          { id: "sifive", name: "SiFive", ticker: "Private", country: "US", role: "RISC-V CPU IP 領導者，P870 高效能核心進軍資料中心" },
          { id: "andes", name: "晶心科技", ticker: "6533.TW", country: "TW", role: "RISC-V CPU IP 供應商，AX45MP 多核心處理器 IP" },
          { id: "imagination", name: "Imagination Technologies", ticker: "Private", country: "GB", role: "GPU IP 授權 (PowerVR)，IMG DXT GPU IP 回歸高階市場" },
        ],
      },
      {
        id: "icdesign-interface-ip",
        name: "介面 IP (SerDes / PCIe / DDR)",
        name_en: "Interface IP",
        keyInfo: "224G SerDes IP 為 1.6T 網路與 AI 互連核心技術，IP 授權費用每次可達數百萬美元",
        marketType: "oligopoly",
        companies: [
          { id: "synopsys", name: "Synopsys", ticker: "SNPS", country: "US", role: "112G/224G SerDes、PCIe 6.0、DDR5/HBM 控制器 IP 龍頭", marketShare: "~45%" },
          { id: "cadence", name: "Cadence", ticker: "CDNS", country: "US", role: "112G/224G SerDes、PCIe 6.0、UCIe IP 供應商", marketShare: "~30%" },
          { id: "alphawave", name: "Alphawave Semi", ticker: "AWE.L", country: "CA", role: "224G SerDes IP 與高速連接矽智財，專注資料中心互連" },
          { id: "rambus", name: "Rambus", ticker: "RMBS", country: "US", role: "DDR5 / HBM 記憶體控制器 IP 與安全 IP" },
        ],
      },
      {
        id: "icdesign-memory-ip",
        name: "記憶體 IP / 嵌入式 NVM",
        name_en: "Memory IP / Embedded NVM",
        keyInfo: "力旺電子壟斷嵌入式 OTP/MTP IP 市場，全球累計超過 5,000 個授權案",
        marketType: "monopoly",
        companies: [
          { id: "ememory", name: "力旺電子 (eMemory)", ticker: "3529.TW", country: "TW", role: "嵌入式 OTP/MTP/PUF NVM IP 壟斷供應商，全球市佔率超過 70%", marketShare: "~70%" },
          { id: "synopsys", name: "Synopsys", ticker: "SNPS", country: "US", role: "嵌入式記憶體 IP (SRAM/ROM) 與安全 IP 授權" },
          { id: "rambus", name: "Rambus", ticker: "RMBS", country: "US", role: "安全記憶體控制器 IP、CryptoManager 安全引擎" },
        ],
      },
      {
        id: "icdesign-fpga",
        name: "FPGA / 可程式邏輯",
        name_en: "FPGA / Programmable Logic",
        keyInfo: "FPGA 廣泛應用於 AI 推論加速與通訊基礎設施，AI FPGA 市場 CAGR 超過 15%",
        marketType: "oligopoly",
        companies: [
          { id: "amd", name: "AMD (Xilinx)", ticker: "AMD", country: "US", role: "Versal Premium / Alveo — 最大 FPGA 供應商，AI 推論加速", marketShare: "~52%" },
          { id: "intel", name: "Intel (Altera)", ticker: "INTC", country: "US", role: "Agilex 7/9 FPGA — 第二大 FPGA 供應商，分拆 Altera 獨立運營", marketShare: "~33%" },
          { id: "lattice", name: "Lattice Semiconductor", ticker: "LSCC", country: "US", role: "低功耗 FPGA 龍頭，專注邊緣 AI 與工業自動化", marketShare: "~8%" },
          { id: "efinix", name: "Efinix", ticker: "Private", country: "US", role: "Quantum 可程式加速器平台，RISC-V + FPGA 整合" },
        ],
      },
      {
        id: "icdesign-verification",
        name: "驗證與模擬",
        name_en: "Verification & Simulation",
        keyInfo: "驗證佔 IC 設計流程 60-70% 工時，硬體模擬器 (Emulator) 單台售價超過 $1,000 萬",
        marketType: "oligopoly",
        companies: [
          { id: "synopsys", name: "Synopsys", ticker: "SNPS", country: "US", role: "VCS 模擬器 / ZeBu 硬體加速模擬器 / Verdi 除錯工具", marketShare: "~45%" },
          { id: "cadence", name: "Cadence", ticker: "CDNS", country: "US", role: "Xcelium 模擬器 / Palladium Z3 硬體加速模擬器", marketShare: "~40%" },
          { id: "siemens_eda", name: "Siemens EDA", ticker: "SIE.DE", country: "DE", role: "Questa 模擬器 / Veloce 硬體加速模擬器" },
        ],
      },
      {
        id: "icdesign-analog-mixed",
        name: "Analog / Mixed-Signal 設計",
        name_en: "Analog / Mixed-Signal Design",
        keyInfo: "類比 IC 市場規模約 $800 億，產品生命週期長達 10 年以上，毛利率穩定在 50-65%",
        marketType: "low_growth",
        companies: [
          { id: "texas_instruments", name: "Texas Instruments", ticker: "TXN", country: "US", role: "全球最大類比 IC 公司，電源管理與訊號鏈產品線最廣", marketShare: "~20%" },
          { id: "analog_devices", name: "Analog Devices (ADI)", ticker: "ADI", country: "US", role: "高效能類比/混合訊號/DSP IC 龍頭，併入 Maxim 後產品線擴大", marketShare: "~14%" },
          { id: "nxp", name: "NXP Semiconductors", ticker: "NXPI", country: "NL", role: "車用半導體龍頭，車用 MCU 與安全連接晶片", marketShare: "~8%" },
          { id: "infineon", name: "Infineon Technologies", ticker: "IFX.DE", country: "DE", role: "功率半導體與車用 MCU 龍頭，SiC/GaN 寬能隙材料" },
          { id: "renesas", name: "Renesas Electronics", ticker: "6723.T", country: "JP", role: "車用 MCU 全球第三大，類比與嵌入式處理器整合方案" },
        ],
      },
    ],
  },

  // ============================================================
  // 10. hl/brain — 🧠 大腦與認知健康
  // ============================================================
  {
    id: "brain",
    slug: "brain",
    category: "hl",
    name: "大腦與認知健康",
    name_en: "Brain & Cognitive Health",
    description:
      "從神經退化預防、認知訓練到腸腦軸前沿研究，涵蓋大腦健康的關鍵營養素、血流優化與生物標記追蹤的完整知識體系。",
    icon: "🧠",
    color: "#6366f1",
    flowSummary: "神經保護 → 認知訓練 → 血流優化 → 睡眠修復 → 長期維護",
    sections: [
      {
        id: "brain-neuroprotection",
        name: "神經退化預防",
        name_en: "Neurodegeneration Prevention",
        keyInfo: "每週 150 分鐘中等強度有氧運動可降低阿茲海默症風險 45%（Lancet 2020 meta-analysis）",
        marketType: "monopoly",
        companies: [
          { id: "omega3-dha", name: "Omega-3 DHA", ticker: "1-2g/day", country: "SP", role: "維持神經細胞膜流動性與突觸可塑性，降低神經發炎", marketShare: "Meta-analysis" },
          { id: "curcumin", name: "薑黃素 (Curcumin)", ticker: "500mg/day", country: "SP", role: "抗氧化與抗神經發炎，促進 BDNF 分泌，需搭配黑胡椒素增吸收", marketShare: "多項 RCT" },
          { id: "aerobic-neuro", name: "有氧運動", ticker: "150min/週", country: "EX", role: "增加腦源性神經營養因子 BDNF，促進海馬迴神經新生", marketShare: "Meta-analysis" },
          { id: "blueberries", name: "藍莓 / 莓果類", ticker: "1杯/day", country: "FD", role: "花青素穿越血腦屏障，改善記憶與認知功能", marketShare: "多項 RCT" },
          { id: "lion-mane", name: "猴頭菇 (Lion's Mane)", ticker: "500-1000mg/day", country: "SP", role: "刺激神經生長因子 NGF 合成，支持神經再生", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "brain-cognitive-training",
        name: "認知訓練與神經可塑性",
        name_en: "Cognitive Training & Neuroplasticity",
        keyInfo: "持續性冥想練習可增加前額葉皮質灰質密度，8 週 MBSR 即可觀察到大腦結構變化",
        marketType: "oligopoly",
        companies: [
          { id: "meditation", name: "冥想練習", ticker: "10-20min/day", country: "HA", role: "強化前額葉皮質功能，提升注意力與工作記憶容量", marketShare: "多項 RCT" },
          { id: "new-skill", name: "學習新技能", ticker: "持續性", country: "HA", role: "建立新突觸連結，增強認知儲備 (cognitive reserve)", marketShare: "觀察性研究" },
          { id: "dual-nback", name: "Dual N-back 訓練", ticker: "20min/day", country: "HA", role: "唯一有證據支持可遷移的工作記憶訓練方法", marketShare: "多項 RCT" },
          { id: "social-engagement", name: "社交互動", ticker: "規律性", country: "HA", role: "多元社交活動活化大腦多區域網路，降低認知衰退風險", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "brain-blood-flow",
        name: "腦部血流與供氧",
        name_en: "Brain Blood Flow & Oxygenation",
        keyInfo: "大腦僅佔體重 2% 但消耗 20% 心輸出量，腦血流量每下降 10% 認知功能顯著下降",
        marketType: "oligopoly",
        companies: [
          { id: "aerobic-brain", name: "有氧運動", ticker: "30min/day", country: "EX", role: "提升腦部血流量 15-20%，增加一氧化氮合成促進血管擴張", marketShare: "Meta-analysis" },
          { id: "beetroot", name: "甜菜根汁", ticker: "250ml/day", country: "FD", role: "豐富硝酸鹽轉化為一氧化氮，改善腦部微循環", marketShare: "多項 RCT" },
          { id: "ginkgo", name: "銀杏萃取物", ticker: "120-240mg/day", country: "SP", role: "改善末梢與腦部微循環，標準化萃取物 EGb 761 證據較佳", marketShare: "多項 RCT" },
          { id: "deep-breathing", name: "深呼吸訓練", ticker: "5min/多次/day", country: "HA", role: "優化血氧濃度與自律神經平衡，間接改善腦部供氧", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "brain-nutrients",
        name: "關鍵營養素",
        name_en: "Key Brain Nutrients",
        keyInfo: "維生素 B12 缺乏與認知衰退顯著相關，全球約 20% 老年人 B12 不足",
        marketType: "monopoly",
        companies: [
          { id: "vitb12", name: "維生素 B12", ticker: "500-1000mcg/day", country: "SP", role: "維持髓鞘完整性與甲基化反應，缺乏導致不可逆神經損傷", marketShare: "Meta-analysis" },
          { id: "folate", name: "葉酸 (Methylfolate)", ticker: "400-800mcg/day", country: "SP", role: "與 B12 協同降低同半胱胺酸，保護腦血管健康", marketShare: "Meta-analysis" },
          { id: "vitd-brain", name: "維生素 D", ticker: "2000-4000IU/day", country: "SP", role: "大腦廣泛分布維生素 D 受體，缺乏與失智風險增加 50% 相關", marketShare: "Meta-analysis" },
          { id: "magnesium-brain", name: "鎂 (Mg-Threonate)", ticker: "2000mg/day", country: "SP", role: "L-Threonate 形式可穿越血腦屏障，提升突觸密度與記憶力", marketShare: "多項 RCT" },
          { id: "choline", name: "膽鹼 (Choline)", ticker: "500mg/day", country: "SP", role: "乙醯膽鹼前驅物，影響記憶形成與肝臟健康", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "brain-biomarkers",
        name: "腦部健康生物標記",
        name_en: "Brain Health Biomarkers",
        keyInfo: "血液 BDNF 濃度與認知功能正相關，可作為運動與介入效果的追蹤指標",
        marketType: "oligopoly",
        companies: [
          { id: "bdnf", name: "BDNF (腦源性神經營養因子)", ticker: "血液檢測", country: "BM", role: "反映神經可塑性與認知儲備量，運動後顯著上升", marketShare: "多項 RCT" },
          { id: "homocysteine", name: "同半胱胺酸", ticker: "<10 μmol/L", country: "BM", role: "升高與腦萎縮及失智風險相關，B 群維生素可有效降低", marketShare: "Meta-analysis" },
          { id: "brain-mri", name: "腦部 MRI", ticker: "每1-2年", country: "MD", role: "追蹤海馬迴體積、白質病變與腦萎縮程度", marketShare: "Meta-analysis" },
          { id: "cognitive-test", name: "認知功能測試 (MoCA)", ticker: "每年", country: "MD", role: "蒙特利爾認知評估量表，篩檢輕度認知障礙", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "brain-gut-axis",
        name: "前沿研究：腸腦軸",
        name_en: "Gut-Brain Axis Research",
        keyInfo: "腸道微生物可透過迷走神經與代謝物影響大腦功能，90% 血清素由腸道合成",
        marketType: "emerging",
        companies: [
          { id: "probiotics-brain", name: "精神益生菌 (Psychobiotics)", ticker: "特定菌株", country: "SP", role: "特定乳酸桿菌與雙歧桿菌株可改善焦慮與認知功能", marketShare: "觀察性研究" },
          { id: "fermented-brain", name: "發酵食品", ticker: "每日攝取", country: "FD", role: "優格、味噌、泡菜等增加腸道菌相多樣性，間接改善腦功能", marketShare: "觀察性研究" },
          { id: "vagus-nerve", name: "迷走神經刺激", ticker: "研究階段", country: "RS", role: "非侵入性迷走神經刺激 (tVNS) 可改善記憶與情緒調節", marketShare: "觀察性研究" },
          { id: "fiber-brain", name: "膳食纖維", ticker: "25-35g/day", country: "FD", role: "短鏈脂肪酸 (SCFAs) 的前驅物質，支持腸腦軸訊號傳遞", marketShare: "多項 RCT" },
        ],
      },
    ],
  },

  // ============================================================
  // 11. hl/heart — ❤️ 心血管健康
  // ============================================================
  {
    id: "heart",
    slug: "heart",
    category: "hl",
    name: "心血管健康",
    name_en: "Cardiovascular Health",
    description:
      "從心血管風險因子評估、飲食與運動處方到血脂管理與新興療法，建構完整的心血管保護策略與生物標記追蹤體系。",
    icon: "❤️",
    color: "#ef4444",
    flowSummary: "風險評估 → 飲食優化 → 運動處方 → 指標追蹤 → 介入治療",
    sections: [
      {
        id: "heart-risk-factors",
        name: "心血管風險因子",
        name_en: "Cardiovascular Risk Factors",
        keyInfo: "心血管疾病為全球第一大死因，90% 心肌梗塞可歸因於 9 個可修正風險因子（INTERHEART 研究）",
        marketType: "monopoly",
        companies: [
          { id: "ldl-risk", name: "LDL 膽固醇", ticker: "<100mg/dL", country: "BM", role: "動脈粥狀硬化的核心驅動因子，每降低 1 mmol/L 心血管事件降 22%", marketShare: "Meta-analysis" },
          { id: "bp-risk", name: "血壓控制", ticker: "<120/80mmHg", country: "BM", role: "高血壓為中風與心衰竭最大風險因子，SPRINT 研究證實積極控制獲益大", marketShare: "Meta-analysis" },
          { id: "smoking-risk", name: "戒菸", ticker: "完全戒除", country: "HA", role: "吸菸使心血管疾病風險增加 2-4 倍，戒菸 1 年後風險降一半", marketShare: "Meta-analysis" },
          { id: "diabetes-risk", name: "血糖管理", ticker: "HbA1c<7%", country: "BM", role: "糖尿病使心血管風險增加 2-4 倍，良好血糖控制顯著降低風險", marketShare: "Meta-analysis" },
          { id: "waist-risk", name: "腰圍 / 內臟脂肪", ticker: "男<90cm/女<80cm", country: "BM", role: "內臟脂肪分泌促炎因子，腹型肥胖為獨立心血管風險因子", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "heart-diet",
        name: "心臟保護飲食",
        name_en: "Heart-Healthy Diet",
        keyInfo: "地中海飲食可降低主要心血管事件 30%（PREDIMED 研究，N=7,447）",
        marketType: "monopoly",
        companies: [
          { id: "mediterranean", name: "地中海飲食", ticker: "每日實踐", country: "FD", role: "大量蔬果、橄欖油、堅果、魚類，降低心血管事件與全因死亡率", marketShare: "Meta-analysis" },
          { id: "dash-diet", name: "DASH 飲食", ticker: "每日實踐", country: "FD", role: "強調蔬果、低脂乳品、全穀物，可降低收縮壓 8-14 mmHg", marketShare: "Meta-analysis" },
          { id: "omega3-fish", name: "富含 Omega-3 魚類", ticker: "2-3份/週", country: "FD", role: "鮭魚、鯖魚等富含 EPA/DHA，降低三酸甘油酯與心律不整風險", marketShare: "Meta-analysis" },
          { id: "nuts-heart", name: "堅果", ticker: "30g/day", country: "FD", role: "每日一把堅果降低心血管死亡率 29%（PREDIMED 研究子分析）", marketShare: "Meta-analysis" },
          { id: "fiber-heart", name: "膳食纖維", ticker: "25-35g/day", country: "FD", role: "可溶性纖維降低 LDL 膽固醇，每增加 7g/day 冠心病風險降 9%", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "heart-exercise",
        name: "有氧運動處方",
        name_en: "Aerobic Exercise Prescription",
        keyInfo: "Zone 2 有氧訓練 150 分鐘/週可降低全因死亡率 30%，VO2max 每提升 1 MET 死亡率降 12%",
        marketType: "monopoly",
        companies: [
          { id: "zone2", name: "Zone 2 有氧訓練", ticker: "150-300min/週", country: "EX", role: "維持可對話強度的持續有氧，提升粒線體功能與脂肪氧化能力", marketShare: "Meta-analysis" },
          { id: "vo2max", name: "VO2max 訓練", ticker: "HIIT 1-2次/週", country: "EX", role: "最大攝氧量是最強的全因死亡預測因子，高 VO2max 組死亡風險降 5 倍", marketShare: "Meta-analysis" },
          { id: "walking", name: "每日步行", ticker: "8000-10000步/day", country: "EX", role: "每日 8000 步較 4000 步全因死亡率降低 51%（JAMA 2020）", marketShare: "Meta-analysis" },
          { id: "swimming", name: "游泳", ticker: "2-3次/週", country: "EX", role: "低關節負擔的全身有氧運動，改善血壓與血管彈性", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "heart-supplements",
        name: "關鍵補充品",
        name_en: "Key Heart Supplements",
        keyInfo: "CoQ10 200-300mg/day 可改善心衰竭患者預後（Q-SYMBIO 研究），Omega-3 4g/day 降低三酸甘油酯 25-30%",
        marketType: "oligopoly",
        companies: [
          { id: "coq10", name: "輔酶 Q10 (CoQ10)", ticker: "200-300mg/day", country: "SP", role: "粒線體能量產生關鍵輔因子，改善心肌功能與降低氧化壓力", marketShare: "多項 RCT" },
          { id: "omega3-heart", name: "Omega-3 (EPA/DHA)", ticker: "2-4g/day", country: "SP", role: "高劑量 EPA 可降低心血管事件 25%（REDUCE-IT 研究）", marketShare: "Meta-analysis" },
          { id: "magnesium-heart", name: "鎂 (Magnesium)", ticker: "400mg/day", country: "SP", role: "維持正常心律與血管彈性，缺乏與心律不整及高血壓相關", marketShare: "Meta-analysis" },
          { id: "k2d3", name: "維生素 K2 + D3", ticker: "K2:100mcg+D3:2000IU", country: "SP", role: "D3 促進鈣吸收，K2 引導鈣進入骨骼而非沉積於血管壁", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "heart-lipid",
        name: "血脂管理",
        name_en: "Lipid Management",
        keyInfo: "ApoB 是比 LDL-C 更準確的心血管風險預測因子，反映致動脈粥狀硬化脂蛋白顆粒總數",
        marketType: "monopoly",
        companies: [
          { id: "statin", name: "他汀類藥物 (Statins)", ticker: "醫師處方", country: "MD", role: "降低 LDL-C 30-50%，心血管事件風險降低 25-35%，最強證據基礎", marketShare: "Meta-analysis" },
          { id: "pcsk9", name: "PCSK9 抑制劑", ticker: "醫師處方", country: "MD", role: "可額外降低 LDL-C 50-60%，適用於 statin 不耐受或極高風險患者", marketShare: "多項 RCT" },
          { id: "apob-track", name: "ApoB 追蹤", ticker: "<90mg/dL", country: "BM", role: "整合 LDL、VLDL、Lp(a) 顆粒數的單一指標，優於傳統血脂面板", marketShare: "Meta-analysis" },
          { id: "plant-sterol", name: "植物固醇", ticker: "2g/day", country: "SP", role: "競爭性抑制膽固醇腸道吸收，可額外降低 LDL 5-15%", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "heart-bp",
        name: "血壓控制",
        name_en: "Blood Pressure Control",
        keyInfo: "DASH 飲食搭配減鈉可在 4 週內降低收縮壓 11 mmHg，效果接近一線降壓藥",
        marketType: "monopoly",
        companies: [
          { id: "sodium-reduction", name: "減鈉攝取", ticker: "<2300mg/day", country: "FD", role: "每減少 1g 鈉攝取可降低收縮壓 2.5 mmHg，鈉敏感型個體效果更大", marketShare: "Meta-analysis" },
          { id: "potassium", name: "增加鉀攝取", ticker: "3500-4700mg/day", country: "FD", role: "鉀鈉比例比單純減鈉更重要，香蕉、菠菜、酪梨為佳", marketShare: "Meta-analysis" },
          { id: "dash-bp", name: "DASH 飲食模式", ticker: "每日實踐", country: "FD", role: "蔬果、全穀物、低脂乳品組合，系統性降壓效果最佳", marketShare: "Meta-analysis" },
          { id: "aerobic-bp", name: "有氧運動降壓", ticker: "30min/day", country: "EX", role: "規律有氧運動平均降低血壓 5-8 mmHg，效果持續性佳", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "heart-biomarkers",
        name: "心血管生物標記",
        name_en: "Cardiovascular Biomarkers",
        keyInfo: "冠狀動脈鈣化分數 (CAC) 為無症狀個體最強的心血管事件預測因子，CAC=0 的 10 年事件率 <2%",
        marketType: "oligopoly",
        companies: [
          { id: "apob-marker", name: "ApoB", ticker: "<90mg/dL", country: "BM", role: "反映所有致動脈粥狀硬化脂蛋白顆粒數，優於 LDL-C 作為治療目標", marketShare: "Meta-analysis" },
          { id: "lpa", name: "Lp(a) 脂蛋白(a)", ticker: "一生測一次", country: "BM", role: "遺傳性心血管風險因子，升高者需更積極控制其他風險因子", marketShare: "Meta-analysis" },
          { id: "hscrp", name: "hs-CRP 高敏感 C 反應蛋白", ticker: "<1mg/L", country: "BM", role: "反映全身性血管發炎程度，與心血管事件風險獨立相關", marketShare: "Meta-analysis" },
          { id: "cac-score", name: "冠狀動脈鈣化分數 (CAC)", ticker: "每3-5年", country: "MD", role: "低劑量 CT 量化冠狀動脈鈣化程度，最佳的亞臨床動脈硬化偵測方法", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "heart-emerging",
        name: "新興療法",
        name_en: "Emerging Heart Therapies",
        keyInfo: "GLP-1 受體促效劑不僅降血糖減重，SELECT 研究證實可降低心血管事件 20%",
        marketType: "emerging",
        companies: [
          { id: "glp1", name: "GLP-1 受體促效劑", ticker: "醫師處方", country: "MD", role: "semaglutide (Ozempic/Wegovy) 降低體重 15%+ 並減少心血管事件", marketShare: "多項 RCT" },
          { id: "sglt2", name: "SGLT2 抑制劑", ticker: "醫師處方", country: "MD", role: "除降血糖外，顯著降低心衰竭住院率與腎臟惡化風險", marketShare: "多項 RCT" },
          { id: "colchicine-cv", name: "低劑量秋水仙素", ticker: "0.5mg/day", country: "MD", role: "抗炎治療新範式，LoDoCo2 研究顯示降低心血管事件 31%", marketShare: "多項 RCT" },
          { id: "inclisiran", name: "Inclisiran (siRNA)", ticker: "每6個月注射", country: "MD", role: "長效 PCSK9 siRNA 療法，每年僅需兩次注射即可降低 LDL 50%", marketShare: "多項 RCT" },
        ],
      },
    ],
  },

  // ============================================================
  // 12. hl/gut — 🦠 腸道與消化健康
  // ============================================================
  {
    id: "gut",
    slug: "gut",
    category: "hl",
    name: "腸道與消化健康",
    name_en: "Gut & Digestive Health",
    description:
      "從腸道微生態基礎、益生菌選擇到消化功能優化與腸漏症修復，建構完整的腸道健康維護與檢測追蹤體系。",
    icon: "🦠",
    color: "#f59e0b",
    flowSummary: "腸道微生態 → 消化功能 → 免疫調節 → 營養吸收 → 腸腦連結",
    sections: [
      {
        id: "gut-microbiome",
        name: "腸道微生態基礎",
        name_en: "Gut Microbiome Basics",
        keyInfo: "腸道微生物數量約 38 兆，基因數為人體基因的 150 倍，菌相多樣性與長壽及健康正相關",
        marketType: "oligopoly",
        companies: [
          { id: "fiber-gut", name: "多元膳食纖維", ticker: "30g+/day", country: "FD", role: "不同纖維餵養不同菌種，每週攝取 30 種以上植物性食物可最大化菌相多樣性", marketShare: "Meta-analysis" },
          { id: "fermented-gut", name: "發酵食品", ticker: "每日多種", country: "FD", role: "優格、泡菜、味噌、康普茶等，Stanford 研究顯示每日 6 份發酵食品可顯著增加菌相多樣性", marketShare: "多項 RCT" },
          { id: "polyphenol-gut", name: "多酚類食物", ticker: "多元攝取", country: "FD", role: "綠茶、莓果、黑巧克力中的多酚為腸道益菌的燃料，促進有益代謝物生成", marketShare: "多項 RCT" },
          { id: "avoid-processed", name: "避免超加工食品", ticker: "盡量減少", country: "FD", role: "人工添加劑與乳化劑可破壞腸道黏膜屏障，降低菌相多樣性", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "gut-probiotics",
        name: "益生菌與益生元",
        name_en: "Probiotics & Prebiotics",
        keyInfo: "益生菌效果具菌株特異性，不同菌株適應不同症狀，需選擇有臨床證據支持的特定菌株",
        marketType: "high_growth",
        companies: [
          { id: "lactobacillus", name: "乳酸桿菌屬", ticker: "10-50B CFU/day", country: "SP", role: "L. rhamnosus GG 用於腹瀉、L. reuteri 用於嬰兒腸絞痛，菌株選擇最關鍵", marketShare: "多項 RCT" },
          { id: "bifidobacterium", name: "雙歧桿菌屬", ticker: "10-50B CFU/day", country: "SP", role: "B. longum 與 B. infantis 改善腸躁症症狀，調節免疫功能", marketShare: "多項 RCT" },
          { id: "prebiotic-fiber", name: "益生元纖維", ticker: "5-10g/day", country: "SP", role: "菊糖 (Inulin)、FOS、GOS 等選擇性餵養腸道益菌，促進短鏈脂肪酸產生", marketShare: "多項 RCT" },
          { id: "spore-probiotic", name: "芽孢桿菌", ticker: "依產品建議", country: "SP", role: "Bacillus coagulans/subtilis 耐胃酸能力強，常溫保存穩定性佳", marketShare: "多項 RCT" },
          { id: "saccharomyces", name: "布拉酵母菌", ticker: "250-500mg/day", country: "SP", role: "Saccharomyces boulardii 預防抗生素相關腹瀉，旅行者腹瀉預防", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "gut-digestion",
        name: "消化功能優化",
        name_en: "Digestive Optimization",
        keyInfo: "胃酸 pH 值需低於 3 才能有效消化蛋白質並殺死病原菌，年齡增長胃酸分泌自然下降",
        marketType: "low_growth",
        companies: [
          { id: "hcl-pepsin", name: "甜菜鹼鹽酸 (Betaine HCl)", ticker: "隨餐服用", country: "SP", role: "補充胃酸不足，改善蛋白質消化與礦物質吸收，需排除胃潰瘍", marketShare: "觀察性研究" },
          { id: "digestive-enzyme", name: "消化酵素", ticker: "隨餐服用", country: "SP", role: "蛋白酶、脂肪酶、澱粉酶補充，改善餐後脹氣與消化不適", marketShare: "多項 RCT" },
          { id: "meal-timing", name: "進食節奏管理", ticker: "細嚼慢嚥", country: "HA", role: "每口咀嚼 20-30 次，餐間隔 4 小時以上允許消化間期清潔波 (MMC) 運作", marketShare: "觀察性研究" },
          { id: "apple-cider", name: "蘋果醋", ticker: "1-2湯匙/餐前", country: "FD", role: "稀釋後餐前飲用可刺激胃酸分泌，改善消化與血糖反應", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "gut-leaky",
        name: "腸漏症與慢性發炎",
        name_en: "Leaky Gut & Chronic Inflammation",
        keyInfo: "腸道通透性增加 (腸漏) 與自體免疫疾病、過敏、慢性疲勞等多種慢性病相關",
        marketType: "emerging",
        companies: [
          { id: "l-glutamine", name: "L-麩醯胺酸", ticker: "5-10g/day", country: "SP", role: "腸道上皮細胞的主要能量來源，支持腸黏膜屏障修復", marketShare: "多項 RCT" },
          { id: "zinc-carnosine", name: "鋅肌肽 (Zinc Carnosine)", ticker: "75mg 2次/day", country: "SP", role: "穩定黏膜層、促進胃腸道傷口癒合，對胃炎與腸漏有修復作用", marketShare: "多項 RCT" },
          { id: "bone-broth", name: "骨頭湯", ticker: "1-2杯/day", country: "FD", role: "富含膠原蛋白、甘胺酸與礦物質，傳統醫學用於腸道修復", marketShare: "觀察性研究" },
          { id: "colostrum", name: "牛初乳 (Colostrum)", ticker: "依產品建議", country: "SP", role: "含免疫球蛋白與生長因子，支持腸黏膜屏障與免疫功能", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "gut-biomarkers",
        name: "腸道檢測指標",
        name_en: "Gut Health Biomarkers",
        keyInfo: "糞便微生物組定序可揭示菌相組成與失衡，但結果解讀仍需結合臨床症狀",
        marketType: "oligopoly",
        companies: [
          { id: "stool-test", name: "綜合糞便分析 (CDSA)", ticker: "每年", country: "MD", role: "評估消化功能、發炎指標、寄生蟲與菌群失衡", marketShare: "多項 RCT" },
          { id: "microbiome-seq", name: "微生物組定序", ticker: "每6-12個月", country: "MD", role: "16S rRNA 或宏基因組定序分析腸道菌相組成與多樣性", marketShare: "觀察性研究" },
          { id: "zonulin", name: "Zonulin (連蛋白)", ticker: "血液/糞便", country: "BM", role: "反映腸道通透性的生物標記，升高提示腸漏症可能", marketShare: "觀察性研究" },
          { id: "calprotectin", name: "糞便鈣衛蛋白", ticker: "<50 μg/g", country: "BM", role: "腸道發炎的敏感指標，用於區分功能性與器質性腸道疾病", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "gut-anti-inflammatory",
        name: "抗發炎飲食",
        name_en: "Anti-inflammatory Diet",
        keyInfo: "慢性低度發炎是多數慢性病的共同病理基礎，飲食是調控發炎最有力的日常工具",
        marketType: "monopoly",
        companies: [
          { id: "mediterranean-gut", name: "地中海飲食模式", ticker: "每日實踐", country: "FD", role: "整體飲食模式比單一食物更重要，地中海飲食可顯著降低全身發炎指標", marketShare: "Meta-analysis" },
          { id: "omega3-anti", name: "Omega-3 脂肪酸", ticker: "2g/day", country: "SP", role: "EPA 與 DHA 競爭性抑制促炎花生四烯酸代謝路徑", marketShare: "Meta-analysis" },
          { id: "turmeric-gut", name: "薑黃 (Turmeric)", ticker: "入菜或補充", country: "FD", role: "薑黃素抑制 NF-κB 發炎通路，每日入菜搭配黑胡椒與脂肪提升吸收", marketShare: "多項 RCT" },
          { id: "eliminate-processed", name: "排除超加工食品", ticker: "盡量避免", country: "FD", role: "精製糖、氫化油、人工添加劑促進全身性發炎，減少攝取是抗炎基礎", marketShare: "Meta-analysis" },
        ],
      },
    ],
  },

  // ============================================================
  // 13. hl/muscle — 💪 肌肉與骨骼健康
  // ============================================================
  {
    id: "muscle",
    slug: "muscle",
    category: "hl",
    name: "肌肉與骨骼健康",
    name_en: "Muscle & Skeletal Health",
    description:
      "從阻力訓練與蛋白質攝取到骨密度維護與關節保養，建構肌少症與骨質疏鬆預防的完整策略與關鍵指標追蹤。",
    icon: "💪",
    color: "#22c55e",
    flowSummary: "阻力訓練 → 蛋白質攝取 → 恢復修復 → 骨密度 → 關節保養",
    sections: [
      {
        id: "muscle-sarcopenia",
        name: "肌少症預防",
        name_en: "Sarcopenia Prevention",
        keyInfo: "30 歲後每十年流失 3-8% 肌肉量，肌少症使跌倒風險增加 3 倍、全因死亡率增加 2 倍",
        marketType: "monopoly",
        companies: [
          { id: "resistance-training", name: "阻力訓練", ticker: "2-4次/週", country: "EX", role: "漸進式超負荷是維持與增加肌肉量的最強介入，每週 2-4 次全身或分部位訓練", marketShare: "Meta-analysis" },
          { id: "progressive-overload", name: "漸進式超負荷", ticker: "持續增加", country: "EX", role: "逐步增加重量、次數或組數，持續挑戰肌肉以刺激適應與生長", marketShare: "Meta-analysis" },
          { id: "compound-lifts", name: "多關節複合動作", ticker: "每次訓練", country: "EX", role: "深蹲、硬舉、臥推、划船等同時訓練多肌群，效率最高且功能性最強", marketShare: "Meta-analysis" },
          { id: "daily-movement", name: "日常活動量", ticker: "NEAT 最大化", country: "EX", role: "走樓梯、站立辦公等非運動性活動產熱 (NEAT)，累積效果不容忽視", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "muscle-protein",
        name: "蛋白質需求",
        name_en: "Protein Requirements",
        keyInfo: "最佳肌肉蛋白合成需每日 1.6-2.2g/kg 蛋白質，每餐達到 2.5g 白胺酸閾值",
        marketType: "monopoly",
        companies: [
          { id: "protein-intake", name: "每日蛋白質攝取", ticker: "1.6-2.2g/kg/day", country: "FD", role: "分散於 3-4 餐攝取，每餐 30-40g 蛋白質以最大化肌肉蛋白合成", marketShare: "Meta-analysis" },
          { id: "leucine", name: "白胺酸 (Leucine)", ticker: "2.5-3g/餐", country: "FD", role: "mTOR 路徑的關鍵啟動因子，每餐需達到白胺酸閾值才能有效刺激肌肉合成", marketShare: "Meta-analysis" },
          { id: "whey-protein", name: "乳清蛋白", ticker: "25-40g/次", country: "SP", role: "吸收快速、白胺酸含量高，訓練後補充的黃金標準", marketShare: "Meta-analysis" },
          { id: "creatine", name: "肌酸 (Creatine)", ticker: "3-5g/day", country: "SP", role: "研究最透徹的運動補充品，增加肌力 5-10%、肌肉量、且有認知益處", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "muscle-bone",
        name: "骨質疏鬆預防",
        name_en: "Osteoporosis Prevention",
        keyInfo: "50 歲以上女性 1/3、男性 1/5 將發生骨質疏鬆性骨折，負重運動可增加骨密度 1-3%/年",
        marketType: "monopoly",
        companies: [
          { id: "weight-bearing", name: "負重運動", ticker: "2-3次/週", country: "EX", role: "骨骼需要機械負荷刺激才能維持密度，跑步、跳躍、重訓均有效", marketShare: "Meta-analysis" },
          { id: "calcium", name: "鈣質", ticker: "1000-1200mg/day", country: "SP", role: "骨骼結構的基本建材，優先從食物攝取（乳品、深綠蔬菜、小魚乾）", marketShare: "Meta-analysis" },
          { id: "vitd-bone", name: "維生素 D3", ticker: "2000-4000IU/day", country: "SP", role: "促進腸道鈣吸收率從 10% 提升至 30%，血清濃度目標 40-60 ng/mL", marketShare: "Meta-analysis" },
          { id: "vitk2-bone", name: "維生素 K2 (MK-7)", ticker: "100-200mcg/day", country: "SP", role: "活化骨鈣素引導鈣進入骨骼，搭配 D3 使用效果更佳", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "muscle-joint",
        name: "關節保養",
        name_en: "Joint Health",
        keyInfo: "膠原蛋白補充品 10g/day 可改善關節疼痛與活動功能（24 週 RCT），搭配維生素 C 促進合成",
        marketType: "oligopoly",
        companies: [
          { id: "collagen-joint", name: "膠原蛋白肽", ticker: "10-15g/day", country: "SP", role: "II 型膠原蛋白保護軟骨，I/III 型支持肌腱韌帶，運動前 60 分鐘搭配 C 攝取效果最佳", marketShare: "多項 RCT" },
          { id: "glucosamine", name: "葡萄糖胺", ticker: "1500mg/day", country: "SP", role: "關節軟骨基質的組成成分，長期使用可減緩關節空間狹窄進程", marketShare: "多項 RCT" },
          { id: "mobility-work", name: "關節活動度訓練", ticker: "每日 10-15min", country: "EX", role: "控制性關節全範圍活動訓練 (CARs)，維持關節活動範圍與滑液分泌", marketShare: "觀察性研究" },
          { id: "omega3-joint", name: "Omega-3", ticker: "2-3g/day", country: "SP", role: "EPA/DHA 降低關節發炎因子 (IL-6, TNF-α)，改善類風濕性關節炎症狀", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "muscle-flexibility",
        name: "柔軟度與活動度",
        name_en: "Flexibility & Mobility",
        keyInfo: "隨年齡增長，肌筋膜組織硬化使活動範圍每十年減少 10%，規律伸展可延緩退化",
        marketType: "low_growth",
        companies: [
          { id: "stretching", name: "靜態伸展", ticker: "每日 10-15min", country: "EX", role: "訓練後或睡前進行，每個肌群保持 30-60 秒，改善柔軟度與恢復", marketShare: "Meta-analysis" },
          { id: "yoga", name: "瑜伽", ticker: "2-3次/週", country: "EX", role: "整合柔軟度、力量與平衡訓練，改善身體覺察與壓力管理", marketShare: "多項 RCT" },
          { id: "foam-rolling", name: "泡棉滾筒 / 筋膜放鬆", ticker: "訓練前後", country: "EX", role: "自我筋膜放鬆可短期增加關節活動度 10-20%，降低訓練後延遲性肌肉痠痛", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "muscle-recovery",
        name: "運動恢復",
        name_en: "Exercise Recovery",
        keyInfo: "運動後 24-72 小時內肌肉蛋白合成持續升高，充足睡眠與營養是恢復的核心",
        marketType: "oligopoly",
        companies: [
          { id: "sleep-recovery", name: "充足睡眠", ticker: "7-9小時/夜", country: "HA", role: "生長激素 70% 在深層睡眠期間分泌，睡眠不足使肌肉恢復速度降低 60%", marketShare: "Meta-analysis" },
          { id: "creatine-recovery", name: "肌酸 (Creatine)", ticker: "3-5g/day", country: "SP", role: "加速 ATP 再合成，減少訓練後肌肉損傷指標 (CK)，長期每日補充最有效", marketShare: "Meta-analysis" },
          { id: "magnesium-recovery", name: "鎂 (Magnesium)", ticker: "400-600mg/day", country: "SP", role: "參與 300+ 種酶反應，缺乏導致肌肉痙攣、恢復變慢，睡前服用甘胺酸鎂效果佳", marketShare: "多項 RCT" },
          { id: "cold-exposure", name: "冷暴露 / 冰浴", ticker: "11min/週 累計", country: "HA", role: "降低訓練後發炎指標，但避免在肌肥大訓練後立即冷療（可能抑制 mTOR）", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "muscle-metrics",
        name: "關鍵指標追蹤",
        name_en: "Key Musculoskeletal Metrics",
        keyInfo: "握力是全因死亡率的獨立預測因子，握力每下降 5kg 死亡風險增加 17%（Lancet 2015, N=140,000）",
        marketType: "oligopoly",
        companies: [
          { id: "dexa", name: "DEXA 骨密度掃描", ticker: "每1-2年", country: "MD", role: "同時測量骨密度與身體組成（肌肉量/脂肪量），肌少症與骨質疏鬆診斷金標準", marketShare: "Meta-analysis" },
          { id: "grip-strength", name: "握力測試", ticker: "定期追蹤", country: "BM", role: "全身肌力的代理指標，男性 <26kg、女性 <18kg 提示肌少症風險", marketShare: "Meta-analysis" },
          { id: "walking-speed", name: "步行速度", ticker: ">1.0 m/s", country: "BM", role: "4 公尺步行速度 <0.8 m/s 為肌少症診斷標準之一，與跌倒和死亡風險相關", marketShare: "Meta-analysis" },
          { id: "sit-stand", name: "坐站測試", ticker: "5次<12秒", country: "BM", role: "評估下肢肌力與功能，5 次坐站時間 >15 秒提示功能性衰退", marketShare: "多項 RCT" },
        ],
      },
    ],
  },

  // ============================================================
  // 14. hl/sleep — 😴 睡眠科學
  // ============================================================
  {
    id: "sleep",
    slug: "sleep",
    category: "hl",
    name: "睡眠科學",
    name_en: "Sleep Science",
    description:
      "從晝夜節律管理、睡眠衛生實踐到深層睡眠與 REM 優化，建構完整的睡眠品質提升策略與監測技術追蹤。",
    icon: "😴",
    color: "#8b5cf6",
    flowSummary: "晝夜節律 → 睡眠衛生 → 深層睡眠 → REM 優化 → 睡眠監測",
    sections: [
      {
        id: "sleep-circadian",
        name: "晝夜節律管理",
        name_en: "Circadian Rhythm Management",
        keyInfo: "晨間陽光暴露 10-30 分鐘可提前啟動皮質醇覺醒反應，並在 14-16 小時後觸發褪黑激素分泌",
        marketType: "monopoly",
        companies: [
          { id: "morning-light", name: "晨間陽光暴露", ticker: "起床後30min內", country: "HA", role: "10-30 分鐘戶外陽光刺激視交叉上核 (SCN)，校準中央生理時鐘", marketShare: "Meta-analysis" },
          { id: "consistent-schedule", name: "固定作息時間", ticker: "±30min", country: "HA", role: "即使週末也保持一致的睡覺與起床時間，社交時差每增加 1 小時死亡風險增 11%", marketShare: "Meta-analysis" },
          { id: "blue-light-block", name: "夜間藍光阻隔", ticker: "睡前2-3小時", country: "HA", role: "藍光 (450-490nm) 抑制褪黑激素分泌達 50%，使用藍光眼鏡或夜間模式", marketShare: "多項 RCT" },
          { id: "evening-dim", name: "傍晚光線調暗", ticker: "日落後", country: "HA", role: "日落後切換為暖光照明，模擬自然光週期，幫助身體準備入睡", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "sleep-hygiene",
        name: "睡眠衛生實踐",
        name_en: "Sleep Hygiene Practices",
        keyInfo: "臥室溫度 18-19°C 為深層睡眠最佳溫度，核心體溫下降 1-1.5°C 是入睡的必要條件",
        marketType: "monopoly",
        companies: [
          { id: "dark-room", name: "全暗臥室", ticker: "每夜", country: "HA", role: "即使微弱光線也會抑制褪黑激素分泌，使用遮光窗簾確保完全黑暗", marketShare: "Meta-analysis" },
          { id: "cool-temp", name: "涼爽室溫", ticker: "18-19°C", country: "HA", role: "核心體溫下降觸發入睡機制，較涼環境促進深層睡眠比例", marketShare: "多項 RCT" },
          { id: "no-screen", name: "睡前無螢幕時間", ticker: "睡前1小時", country: "HA", role: "螢幕藍光與刺激性內容雙重干擾入睡，改為閱讀或冥想", marketShare: "多項 RCT" },
          { id: "caffeine-cutoff", name: "咖啡因截止時間", ticker: "午後2點前", country: "HA", role: "咖啡因半衰期 5-7 小時，下午攝取可減少深層睡眠 20%（睡眠研究期刊）", marketShare: "多項 RCT" },
          { id: "alcohol-avoid", name: "避免睡前飲酒", ticker: "睡前3小時", country: "HA", role: "酒精雖助入睡但嚴重破壞 REM 睡眠與睡眠連續性，即使少量也有影響", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "sleep-deep",
        name: "深層睡眠優化",
        name_en: "Deep Sleep Optimization",
        keyInfo: "深層睡眠 (N3) 佔總睡眠 15-25%，是記憶鞏固、生長激素分泌與代謝廢物清除的關鍵階段",
        marketType: "oligopoly",
        companies: [
          { id: "exercise-timing", name: "運動時機優化", ticker: "睡前4-6小時", country: "EX", role: "規律運動增加深層睡眠 75%，但睡前 2 小時內高強度運動可能干擾入睡", marketShare: "Meta-analysis" },
          { id: "mag-glycinate", name: "甘胺酸鎂", ticker: "200-400mg/睡前", country: "SP", role: "甘胺酸鎂形式吸收率高且具鎮靜作用，同時補充鎂與甘胺酸", marketShare: "多項 RCT" },
          { id: "ashwagandha-sleep", name: "南非醉茄 (Ashwagandha)", ticker: "300-600mg/day", country: "SP", role: "降低皮質醇 28%（RCT），改善睡眠品質與入睡時間，KSM-66 萃取物證據最佳", marketShare: "多項 RCT" },
          { id: "sauna-sleep", name: "桑拿浴", ticker: "睡前1-2小時", country: "HA", role: "升高核心體溫後的散熱效應加速入睡，芬蘭研究顯示規律桑拿改善深層睡眠", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "sleep-rem",
        name: "REM 睡眠與夢境",
        name_en: "REM Sleep & Dreams",
        keyInfo: "REM 睡眠佔總睡眠 20-25%，負責情緒處理與創造性問題解決，後半夜 REM 比例最高",
        marketType: "emerging",
        companies: [
          { id: "alcohol-rem", name: "避免酒精", ticker: "完全避免或限量", country: "HA", role: "即使一杯酒也可減少 REM 睡眠 20-30%，是 REM 最大的日常破壞因子", marketShare: "Meta-analysis" },
          { id: "sleep-duration", name: "充足睡眠時長", ticker: "7-9小時", country: "HA", role: "REM 在後半夜比例增加，睡眠不足 7 小時將大幅犧牲 REM 時間", marketShare: "Meta-analysis" },
          { id: "antidepressant-rem", name: "藥物影響監測", ticker: "諮詢醫師", country: "RS", role: "多數抗憂鬱藥物 (SSRIs) 會抑制 REM 睡眠，需與醫師討論替代方案", marketShare: "多項 RCT" },
          { id: "stress-rem", name: "睡前壓力管理", ticker: "每晚", country: "HA", role: "高皮質醇打斷 REM 循環，睡前冥想或日記寫作可降低心理反芻", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "sleep-supplements",
        name: "助眠補充品",
        name_en: "Sleep Supplements",
        keyInfo: "褪黑激素 0.3-1mg 低劑量即有效，高劑量反而可能導致隔日嗜睡與受體下調",
        marketType: "high_growth",
        companies: [
          { id: "melatonin", name: "褪黑激素 (Melatonin)", ticker: "0.3-1mg/睡前", country: "SP", role: "校準晝夜節律的定時信號，低劑量效果最佳，適合時差或輪班工作者", marketShare: "Meta-analysis" },
          { id: "l-theanine-sleep", name: "L-茶胺酸", ticker: "200-400mg/睡前", country: "SP", role: "促進 alpha 腦波、降低焦慮，不引起嗜睡但改善入睡品質", marketShare: "多項 RCT" },
          { id: "glycine-sleep", name: "甘胺酸 (Glycine)", ticker: "3g/睡前", country: "SP", role: "降低核心體溫促進入睡，改善隔日精神狀態而非延長睡眠時間", marketShare: "多項 RCT" },
          { id: "apigenin", name: "芹菜素 (Apigenin)", ticker: "50mg/睡前", country: "SP", role: "洋甘菊活性成分，溫和 GABA 受體調節，輕度鎮靜助眠", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "sleep-tracking",
        name: "睡眠監測技術",
        name_en: "Sleep Tracking Technology",
        keyInfo: "消費級穿戴裝置偵測睡眠階段準確度約 70-80%，追蹤趨勢比絕對數值更有意義",
        marketType: "high_growth",
        companies: [
          { id: "oura", name: "Oura Ring", ticker: "戒指型", country: "MD", role: "睡眠追蹤準確度業界領先，監測心率變異性、體溫與血氧", marketShare: "觀察性研究" },
          { id: "apple-watch-sleep", name: "Apple Watch", ticker: "手錶型", country: "MD", role: "整合睡眠呼吸暫停偵測、血氧與心率追蹤，生態系最完整", marketShare: "觀察性研究" },
          { id: "whoop", name: "WHOOP", ticker: "手環型", country: "MD", role: "專注恢復與睡眠指標，提供每日睡眠需求預測與恢復評分", marketShare: "觀察性研究" },
          { id: "psg", name: "多導睡眠檢測 (PSG)", ticker: "醫師建議時", country: "MD", role: "睡眠醫學金標準，診斷睡眠呼吸中止症、猝睡症等睡眠障礙", marketShare: "Meta-analysis" },
        ],
      },
    ],
  },

  // ============================================================
  // 15. hl/nutrition — 🍎 營養與代謝
  // ============================================================
  {
    id: "nutrition",
    slug: "nutrition",
    category: "hl",
    name: "營養與代謝",
    name_en: "Nutrition & Metabolism",
    description:
      "從長壽飲食模式、間歇性斷食到血糖管理與微量營養素補充，建構代謝健康優化的完整知識體系與追蹤指標。",
    icon: "🍎",
    color: "#0ea5e9",
    flowSummary: "熱量平衡 → 巨量營養素 → 微量營養素 → 進食時間 → 代謝健康",
    sections: [
      {
        id: "nutrition-longevity-diets",
        name: "長壽飲食模式",
        name_en: "Longevity Diet Patterns",
        keyInfo: "藍色地帶 (Blue Zones) 人群飲食以植物為主 (95%)、適量飲酒、自然限食，百歲人瑞比例為全球 10 倍",
        marketType: "monopoly",
        companies: [
          { id: "mediterranean-longevity", name: "地中海飲食", ticker: "每日實踐", country: "FD", role: "全球證據最充分的健康飲食模式，降低全因死亡率 25%，心血管事件 30%", marketShare: "Meta-analysis" },
          { id: "blue-zone", name: "藍色地帶飲食", ticker: "生活模式", country: "FD", role: "沖繩、薩丁尼亞、伊卡利亞等長壽區域共同飲食特徵：全食物、少肉、多豆類", marketShare: "觀察性研究" },
          { id: "okinawan", name: "沖繩飲食", ticker: "每日實踐", country: "FD", role: "「腹八分」八分飽原則，紫薯、豆腐、苦瓜、海藻為主食，低熱量高營養密度", marketShare: "觀察性研究" },
          { id: "plant-rich", name: "植物為主飲食", ticker: "每日實踐", country: "FD", role: "每日至少 5 份蔬果，最佳為 8-10 份，蔬果攝取量與全因死亡率呈負相關", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "nutrition-fasting",
        name: "間歇性斷食",
        name_en: "Intermittent Fasting",
        keyInfo: "16:8 限時進食可改善胰島素敏感度 30%，斷食 24-48 小時可啟動自噬作用 (autophagy)",
        marketType: "oligopoly",
        companies: [
          { id: "trf-168", name: "16:8 限時進食", ticker: "每日 8h 進食窗", country: "HA", role: "最易執行的斷食模式，將進食限於早上 8 點至下午 4 點效果最佳", marketShare: "多項 RCT" },
          { id: "early-trf", name: "早期限時進食 (eTRF)", ticker: "早間進食窗", country: "HA", role: "進食窗口提前到白天，與晝夜節律同步，血糖與血壓改善更顯著", marketShare: "多項 RCT" },
          { id: "autophagy", name: "自噬作用啟動", ticker: "24-48h 斷食", country: "RS", role: "細胞清除受損蛋白質與胞器的回收機制，2016 年諾貝爾獎肯定其重要性", marketShare: "觀察性研究" },
          { id: "fasting-caution", name: "斷食注意事項", ticker: "個人化評估", country: "RS", role: "糖尿病患者、孕婦、進食障礙史者需醫師指導，過度斷食可能流失肌肉量", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "nutrition-blood-sugar",
        name: "血糖管理",
        name_en: "Blood Sugar Management",
        keyInfo: "餐後血糖波動幅度比空腹血糖更能預測代謝健康，理想餐後波動 <30 mg/dL",
        marketType: "monopoly",
        companies: [
          { id: "cgm", name: "連續血糖監測 (CGM)", ticker: "14天/次", country: "MD", role: "即時追蹤血糖波動，了解個人對不同食物的血糖反應，Levels/Dexcom 常見品牌", marketShare: "多項 RCT" },
          { id: "fiber-first", name: "纖維優先進食順序", ticker: "每餐", country: "HA", role: "先吃蔬菜纖維 → 蛋白質脂肪 → 最後碳水，可降低餐後血糖波動 30-40%", marketShare: "多項 RCT" },
          { id: "gi-awareness", name: "升糖指數 (GI) 管理", ticker: "每日選擇", country: "FD", role: "優先選擇低 GI 碳水化合物（全穀、豆類），搭配蛋白質與脂肪減緩血糖上升", marketShare: "Meta-analysis" },
          { id: "post-meal-walk", name: "餐後散步", ticker: "15-30min", country: "EX", role: "餐後步行可降低血糖峰值 30-50%，是最簡單有效的血糖管理策略", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "nutrition-micronutrients",
        name: "關鍵微量營養素",
        name_en: "Key Micronutrients",
        keyInfo: "全球約 10 億人維生素 D 不足，50% 人口鎂攝取低於建議量，微量營養素缺乏是隱性流行病",
        marketType: "monopoly",
        companies: [
          { id: "vitd-nutrition", name: "維生素 D3", ticker: "2000-4000IU/day", country: "SP", role: "免疫調節、骨骼健康、基因表達，血清目標 40-60 ng/mL，需定期檢測", marketShare: "Meta-analysis" },
          { id: "magnesium-nutrition", name: "鎂 (Magnesium)", ticker: "400-600mg/day", country: "SP", role: "參與 600+ 酶反應，甘胺酸鎂/蘇糖酸鎂吸收率最佳，是最常見的缺乏礦物質", marketShare: "Meta-analysis" },
          { id: "zinc-nutrition", name: "鋅 (Zinc)", ticker: "15-30mg/day", country: "SP", role: "免疫功能、傷口癒合、睾酮合成必需，過量會抑制銅吸收，需平衡攝取", marketShare: "Meta-analysis" },
          { id: "b-vitamins", name: "B 群維生素", ticker: "複合B群/day", country: "SP", role: "能量代謝、神經功能與甲基化反應必需，素食者尤須注意 B12 補充", marketShare: "Meta-analysis" },
          { id: "iron-nutrition", name: "鐵 (Iron)", ticker: "需檢測後補充", country: "SP", role: "缺鐵性貧血影響全球 25% 人口，但過量鐵促氧化壓力，補充前需檢測 ferritin", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "nutrition-antioxidant",
        name: "抗氧化與抗糖化",
        name_en: "Antioxidants & Anti-glycation",
        keyInfo: "多酚類化合物每日攝取 >650mg 可降低全因死亡率 30%，比單一抗氧化劑補充更有效",
        marketType: "oligopoly",
        companies: [
          { id: "polyphenols", name: "多酚類食物", ticker: "多元攝取", country: "FD", role: "綠茶兒茶素、莓果花青素、可可黃烷醇等，透過食物攝取比補充劑更佳", marketShare: "Meta-analysis" },
          { id: "berberine", name: "小檗鹼 (Berberine)", ticker: "500mg 2-3次/day", country: "SP", role: "啟動 AMPK 通路，降血糖效果媲美 metformin，同時改善血脂", marketShare: "多項 RCT" },
          { id: "ala", name: "α-硫辛酸 (ALA)", ticker: "300-600mg/day", country: "SP", role: "水溶與脂溶雙性抗氧化劑，再生維生素 C/E，改善胰島素敏感度", marketShare: "多項 RCT" },
          { id: "sulforaphane", name: "蘿蔔硫素 (Sulforaphane)", ticker: "綠花椰菜芽", country: "FD", role: "活化 Nrf2 通路，是最強效的天然解毒與抗氧化激活劑", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "nutrition-hydration",
        name: "水分與電解質",
        name_en: "Hydration & Electrolytes",
        keyInfo: "體重 2% 脫水即降低認知功能 25% 與運動表現 10-20%，多數人處於慢性輕度脫水",
        marketType: "low_growth",
        companies: [
          { id: "water-intake", name: "每日水分攝取", ticker: "體重kg×30-40ml", country: "FD", role: "口渴已是脫水信號，主動規律飲水，尿液顏色淺黃為理想指標", marketShare: "Meta-analysis" },
          { id: "sodium-electrolyte", name: "鈉 (Sodium)", ticker: "運動後補充", country: "FD", role: "汗液中流失最多的電解質，長時間運動或低碳飲食需額外補充", marketShare: "多項 RCT" },
          { id: "potassium-balance", name: "鉀 (Potassium)", ticker: "3500-4700mg/day", country: "FD", role: "調節細胞內液平衡與肌肉收縮，多數人攝取不足，香蕉與深綠蔬菜為佳", marketShare: "Meta-analysis" },
          { id: "mag-electrolyte", name: "鎂 (Magnesium)", ticker: "400mg/day", country: "SP", role: "汗液中鎂流失常被忽略，運動員尤其需要額外補充", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "nutrition-metabolic-markers",
        name: "代謝健康指標",
        name_en: "Metabolic Health Biomarkers",
        keyInfo: "僅 12% 美國成人代謝完全健康（5 項指標均正常），定期追蹤代謝指標是預防的基礎",
        marketType: "monopoly",
        companies: [
          { id: "hba1c", name: "糖化血色素 (HbA1c)", ticker: "<5.5%", country: "BM", role: "反映過去 2-3 個月平均血糖，5.7-6.4% 為糖尿病前期，需積極介入", marketShare: "Meta-analysis" },
          { id: "fasting-insulin", name: "空腹胰島素", ticker: "<8 μIU/mL", country: "BM", role: "比空腹血糖更早反映胰島素阻抗，是代謝健康的領先指標", marketShare: "多項 RCT" },
          { id: "triglycerides", name: "三酸甘油酯", ticker: "<100mg/dL", country: "BM", role: "TG/HDL 比值 >2.0 強烈提示胰島素阻抗，是簡便的代謝風險篩檢指標", marketShare: "Meta-analysis" },
          { id: "waist-circ", name: "腰圍", ticker: "男<90cm/女<80cm", country: "BM", role: "內臟脂肪的最簡便代理指標，比 BMI 更能預測代謝疾病風險", marketShare: "Meta-analysis" },
        ],
      },
    ],
  },

  // ============================================================
  // 16. hl/hormones — ⚡ 荷爾蒙與內分泌
  // ============================================================
  {
    id: "hormones",
    slug: "hormones",
    category: "hl",
    name: "荷爾蒙與內分泌",
    name_en: "Hormones & Endocrine Health",
    description:
      "從男女荷爾蒙健康、甲狀腺功能到皮質醇管理與胰島素敏感度，建構內分泌系統平衡的完整策略與監測體系。",
    icon: "⚡",
    color: "#ec4899",
    flowSummary: "荷爾蒙檢測 → 生活型態調整 → 營養支持 → 壓力管理 → 醫療介入",
    sections: [
      {
        id: "hormones-male",
        name: "男性荷爾蒙健康",
        name_en: "Male Hormone Health",
        keyInfo: "男性睾酮從 30 歲後每年下降 1-2%，睡眠不足 5 小時可使睾酮降低 10-15%（JAMA 2011）",
        marketType: "oligopoly",
        companies: [
          { id: "testosterone-track", name: "睾酮 (Total/Free T)", ticker: "每6-12個月", country: "BM", role: "Total T 目標 >500 ng/dL，Free T 更能反映生物活性，上午檢測最準確", marketShare: "Meta-analysis" },
          { id: "shbg", name: "SHBG 性荷爾蒙結合球蛋白", ticker: "血液檢測", country: "BM", role: "SHBG 過高會降低游離睾酮，過低提示胰島素阻抗，需整體評估", marketShare: "多項 RCT" },
          { id: "sleep-testosterone", name: "充足睡眠", ticker: "7-9小時/夜", country: "HA", role: "睾酮 70% 在睡眠中產生，睡眠品質是自然維持睾酮的最重要因子", marketShare: "Meta-analysis" },
          { id: "zinc-testosterone", name: "鋅 (Zinc)", ticker: "30mg/day", country: "SP", role: "鋅是睾酮合成與精子生成的必需礦物質，缺乏可使睾酮降低 50%", marketShare: "多項 RCT" },
          { id: "resistance-testosterone", name: "阻力訓練", ticker: "3-4次/週", country: "EX", role: "重訓急性提升睾酮 15-30%，長期訓練改善睾酮基線水平", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "hormones-female",
        name: "女性荷爾蒙健康",
        name_en: "Female Hormone Health",
        keyInfo: "女性更年期平均 51 歲，雌激素下降導致骨質流失加速 (每年 2-3%)、心血管風險上升與認知變化",
        marketType: "oligopoly",
        companies: [
          { id: "estrogen-track", name: "雌激素 / 黃體素監測", ticker: "定期檢測", country: "BM", role: "追蹤 E2、孕酮、FSH/LH 比值，了解月經週期與更年期進程", marketShare: "多項 RCT" },
          { id: "hrt", name: "荷爾蒙替代療法 (HRT)", ticker: "醫師處方", country: "MD", role: "更年期 10 年內開始 HRT 可降低全因死亡率 30%，需個人化風險評估", marketShare: "Meta-analysis" },
          { id: "phytoestrogen", name: "植物雌激素", ticker: "食物來源", country: "FD", role: "大豆異黃酮、亞麻籽木酚素等，輕度更年期症狀的天然替代方案", marketShare: "多項 RCT" },
          { id: "vitex", name: "聖潔莓 (Vitex)", ticker: "40mg/day", country: "SP", role: "調節黃體素，改善經前症候群 (PMS) 與月經不規則", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "hormones-thyroid",
        name: "甲狀腺功能",
        name_en: "Thyroid Function",
        keyInfo: "亞臨床甲狀腺低下影響 5-10% 人口，常被忽略但顯著影響代謝、體重與情緒",
        marketType: "oligopoly",
        companies: [
          { id: "tsh-track", name: "TSH / T3 / T4 面板", ticker: "每年檢測", country: "BM", role: "TSH 最佳範圍 1.0-2.5 mIU/L（而非實驗室正常上限 4.5），需同時檢測 Free T3/T4", marketShare: "Meta-analysis" },
          { id: "iodine", name: "碘 (Iodine)", ticker: "150-300mcg/day", country: "SP", role: "甲狀腺素合成的必需原料，海藻、碘鹽為主要來源，過量或不足皆有害", marketShare: "Meta-analysis" },
          { id: "selenium-thyroid", name: "硒 (Selenium)", ticker: "200mcg/day", country: "SP", role: "T4 轉化為活性 T3 的必需輔因子，降低甲狀腺抗體 (TPO)，巴西堅果為佳", marketShare: "多項 RCT" },
          { id: "thyroid-antibodies", name: "甲狀腺抗體監測", ticker: "TPO / TG Ab", country: "BM", role: "甲狀腺過氧化酶抗體升高提示橋本氏甲狀腺炎，需長期追蹤", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "hormones-cortisol",
        name: "皮質醇與壓力",
        name_en: "Cortisol & Stress Management",
        keyInfo: "慢性高皮質醇加速內臟脂肪堆積、肌肉流失、免疫抑制與海馬迴萎縮，是加速老化的核心荷爾蒙",
        marketType: "monopoly",
        companies: [
          { id: "stress-management", name: "壓力管理技術", ticker: "每日實踐", country: "HA", role: "冥想、正念、自然暴露等，規律練習可降低皮質醇 25-30%（多項 RCT）", marketShare: "Meta-analysis" },
          { id: "ashwagandha-cortisol", name: "南非醉茄 (Ashwagandha)", ticker: "300-600mg/day", country: "SP", role: "最強證據的適應原草藥，KSM-66 萃取物可降低皮質醇 28% 並改善壓力症狀", marketShare: "多項 RCT" },
          { id: "rhodiola", name: "紅景天 (Rhodiola)", ticker: "200-400mg/day", country: "SP", role: "調節 HPA 軸壓力反應，減少疲勞感與倦怠 (burnout)，SHR-5 萃取物研究最多", marketShare: "多項 RCT" },
          { id: "cortisol-rhythm", name: "皮質醇日節律追蹤", ticker: "唾液 4 點檢測", country: "BM", role: "正常應早高晚低，曲線平坦化提示 HPA 軸失調，需評估壓力源與恢復策略", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "hormones-insulin",
        name: "胰島素敏感度",
        name_en: "Insulin Sensitivity",
        keyInfo: "胰島素阻抗是第二型糖尿病、心血管疾病與某些癌症的共同根源，通常先於診斷 10-15 年出現",
        marketType: "monopoly",
        companies: [
          { id: "exercise-insulin", name: "規律運動", ticker: "每日 30min+", country: "EX", role: "單次運動即可改善胰島素敏感度 24-48 小時，阻力與有氧訓練均有效", marketShare: "Meta-analysis" },
          { id: "berberine-insulin", name: "小檗鹼 (Berberine)", ticker: "500mg 2-3次/day", country: "SP", role: "啟動 AMPK 通路改善胰島素敏感度，Meta-analysis 顯示效果媲美 metformin", marketShare: "Meta-analysis" },
          { id: "chromium", name: "鉻 (Chromium)", ticker: "200-1000mcg/day", country: "SP", role: "增強胰島素受體訊號傳遞，改善血糖控制，吡啶甲酸鉻吸收率最佳", marketShare: "Meta-analysis" },
          { id: "trf-insulin", name: "限時進食 (TRF)", ticker: "8-10h 進食窗", country: "HA", role: "延長斷食期間允許胰島素水平回到基線，改善胰島素敏感度 20-30%", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "hormones-gh",
        name: "生長激素與 IGF-1",
        name_en: "Growth Hormone & IGF-1",
        keyInfo: "生長激素 95% 在深層睡眠分泌，40 歲後每十年下降 14%，維持 GH 需優化睡眠與運動",
        marketType: "emerging",
        companies: [
          { id: "sleep-gh", name: "深層睡眠最佳化", ticker: "7-9小時/夜", country: "HA", role: "GH 脈衝分泌集中在入睡後第一個深睡期，睡眠品質直接決定 GH 分泌量", marketShare: "Meta-analysis" },
          { id: "fasting-gh", name: "間歇性斷食", ticker: "16-24h 斷食", country: "HA", role: "斷食 24 小時可使 GH 分泌增加 2000%（研究數據），但長期需平衡營養", marketShare: "多項 RCT" },
          { id: "hiit-gh", name: "高強度間歇訓練 (HIIT)", ticker: "2-3次/週", country: "EX", role: "高強度運動可急性刺激 GH 分泌增加 450%，效果持續數小時", marketShare: "多項 RCT" },
          { id: "sauna-gh", name: "桑拿浴", ticker: "3-4次/週", country: "HA", role: "20 分鐘桑拿可使 GH 分泌增加 2-3 倍，熱休克蛋白同時激活細胞保護機制", marketShare: "多項 RCT" },
        ],
      },
    ],
  },

  // ============================================================
  // 17. hl/longevity — ⏳ 抗老與長壽科學
  // ============================================================
  {
    id: "longevity",
    slug: "longevity",
    category: "hl",
    name: "抗老與長壽科學",
    name_en: "Anti-aging & Longevity Science",
    description:
      "從老化九大標誌、NAD+ 代謝到 senolytics 與生物年齡檢測，追蹤長壽科學最前沿的研究進展與實用介入策略。",
    icon: "⏳",
    color: "#14b8a6",
    flowSummary: "細胞老化機制 → 端粒保護 → 幹細胞再生 → NAD+ 補充 → 老化指標追蹤",
    sections: [
      {
        id: "longevity-hallmarks",
        name: "老化九大標誌",
        name_en: "Nine Hallmarks of Aging",
        keyInfo: "2023 年更新為十二大標誌，核心包含基因體不穩定、端粒損耗、表觀遺傳改變、蛋白質穩態喪失等",
        marketType: "monopoly",
        companies: [
          { id: "genomic-instability", name: "基因體不穩定", country: "RS", role: "DNA 損傷累積是老化的根本驅動力，抗氧化防禦與 DNA 修復機制隨年齡衰退", marketShare: "Meta-analysis" },
          { id: "epigenetic", name: "表觀遺傳改變", country: "RS", role: "DNA 甲基化模式隨年齡改變，是生物年齡時鐘的基礎，可透過生活型態部分逆轉", marketShare: "多項 RCT" },
          { id: "cellular-senescence", name: "細胞衰老", country: "RS", role: "衰老細胞分泌 SASP 促炎因子，加速鄰近組織老化，senolytics 可選擇性清除", marketShare: "觀察性研究" },
          { id: "mitochondrial", name: "粒線體功能障礙", country: "RS", role: "細胞能量工廠效率隨年齡下降，NAD+ 補充與運動可部分恢復粒線體功能", marketShare: "多項 RCT" },
          { id: "proteostasis", name: "蛋白質穩態喪失", country: "RS", role: "錯誤折疊蛋白質累積導致阿茲海默症等神經退化疾病，自噬作用是主要清除機制", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "longevity-nad",
        name: "NAD+ 代謝通路",
        name_en: "NAD+ Metabolism Pathway",
        keyInfo: "NAD+ 水平從 40 歲後每 20 年下降 50%，NAD+ 是 500+ 酶反應的輔因子，與 Sirtuins 長壽基因活性直接相關",
        marketType: "high_growth",
        companies: [
          { id: "nmn", name: "NMN (煙醯胺單核苷酸)", ticker: "500-1000mg/day", country: "SP", role: "NAD+ 的直接前驅物，動物研究顯著逆轉老化指標，人體 RCT 陸續發表中", marketShare: "多項 RCT" },
          { id: "nr", name: "NR (煙醯胺核糖)", ticker: "300-600mg/day", country: "SP", role: "另一條 NAD+ 合成路徑前驅物，Niagen 品牌有較多人體安全性數據", marketShare: "多項 RCT" },
          { id: "niacin", name: "菸鹼酸 (Niacin / B3)", ticker: "50-500mg/day", country: "SP", role: "最經濟的 NAD+ 前驅物，高劑量有潮紅副作用但同時改善血脂", marketShare: "Meta-analysis" },
          { id: "nad-protocol", name: "NAD+ 補充策略", country: "RS", role: "結合 NMN + TMG (三甲基甘胺酸) + 白藜蘆醇的協同方案，長期安全性仍在研究中", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "longevity-telomere",
        name: "端粒與端粒酶",
        name_en: "Telomeres & Telomerase",
        keyInfo: "端粒長度是細胞老化的生物時鐘，每次細胞分裂縮短 50-200 bp，壓力與不良生活型態加速縮短",
        marketType: "oligopoly",
        companies: [
          { id: "lifestyle-telomere", name: "生活型態介入", ticker: "綜合實踐", country: "HA", role: "Dean Ornish 研究：綜合生活型態改變（飲食+運動+冥想）5 年可延長端粒 10%", marketShare: "多項 RCT" },
          { id: "ta65", name: "TA-65 (環黃芪醇)", ticker: "依產品建議", country: "SP", role: "黃芪萃取物，宣稱可活化端粒酶，人體研究規模小但顯示端粒延長趨勢", marketShare: "觀察性研究" },
          { id: "astragalus", name: "黃芪 (Astragalus)", ticker: "500-1000mg/day", country: "SP", role: "傳統中醫補氣藥材，含環黃芪醇等可能活化端粒酶的成分", marketShare: "觀察性研究" },
          { id: "telomere-test", name: "端粒長度檢測", ticker: "每1-2年", country: "MD", role: "qPCR 或 Flow-FISH 方法測量白血球端粒長度，追蹤生活型態介入效果", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "longevity-mtor-ampk",
        name: "mTOR 與 AMPK 信號通路",
        name_en: "mTOR & AMPK Signaling Pathways",
        keyInfo: "mTOR 過度活化加速老化，AMPK 活化促進長壽；熱量限制與運動是最天然的 AMPK 激活劑",
        marketType: "emerging",
        companies: [
          { id: "rapamycin", name: "雷帕黴素 (Rapamycin)", ticker: "低劑量/間歇", country: "MD", role: "mTOR 抑制劑，動物研究延壽 10-25%，低劑量人體試驗探索中，需醫師處方", marketShare: "多項 RCT" },
          { id: "metformin-longevity", name: "二甲雙胍 (Metformin)", ticker: "500-1000mg/day", country: "MD", role: "AMPK 活化劑，TAME 臨床試驗測試抗老效果，糖尿病患者使用者癌症風險較低", marketShare: "多項 RCT" },
          { id: "caloric-restriction", name: "熱量限制 (CR)", ticker: "減少 10-20%", country: "HA", role: "非人類靈長類研究延壽 30%，CALERIE 人體試驗顯示改善多項老化生物標記", marketShare: "多項 RCT" },
          { id: "spermidine-mtor", name: "亞精胺 (Spermidine)", ticker: "1-5mg/day", country: "SP", role: "誘導自噬作用的天然多胺，小麥胚芽含量最高，觀察性研究與心血管保護相關", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "longevity-stem-cells",
        name: "幹細胞與再生醫學",
        name_en: "Stem Cells & Regenerative Medicine",
        keyInfo: "造血幹細胞功能隨年齡衰退，50 歲後幹細胞池明顯縮小，再生醫學致力於恢復組織修復能力",
        marketType: "emerging",
        companies: [
          { id: "prp", name: "富血小板血漿 (PRP)", ticker: "醫師處方", country: "MD", role: "濃縮自體血小板生長因子，用於關節修復、皮膚再生與落髮治療", marketShare: "多項 RCT" },
          { id: "exosomes", name: "外泌體 (Exosomes)", ticker: "研究階段", country: "RS", role: "幹細胞分泌的奈米囊泡，攜帶修復訊號蛋白與 RNA，為新興再生醫學載體", marketShare: "觀察性研究" },
          { id: "stem-cell-therapy", name: "幹細胞療法", ticker: "醫師處方", country: "MD", role: "間質幹細胞 (MSC) 用於關節炎、心臟修復等，FDA 僅核准少數適應症", marketShare: "觀察性研究" },
          { id: "yamanaka-factors", name: "山中因子 (細胞重編程)", ticker: "前沿研究", country: "RS", role: "部分重編程可逆轉表觀遺傳老化時鐘，Altos Labs 等公司投入數十億美元研發", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "longevity-senolytics",
        name: "Senolytics 清除衰老細胞",
        name_en: "Senolytics — Clearing Senescent Cells",
        keyInfo: "衰老細胞僅佔組織 <5% 但分泌大量 SASP 促炎因子，動物研究中清除衰老細胞可延壽 25%",
        marketType: "emerging",
        companies: [
          { id: "fisetin", name: "漆黃素 (Fisetin)", ticker: "100-500mg/day", country: "SP", role: "草莓中天然存在的黃酮類，Mayo Clinic 研究顯示為最有效的天然 senolytic 候選物", marketShare: "觀察性研究" },
          { id: "quercetin-dasatinib", name: "槲皮素 + Dasatinib", ticker: "間歇性療程", country: "MD", role: "第一個被研究的 senolytic 組合，間歇性給藥 (hit-and-run) 可清除衰老細胞", marketShare: "多項 RCT" },
          { id: "quercetin-alone", name: "槲皮素 (Quercetin)", ticker: "500-1000mg/day", country: "SP", role: "廣泛存在的植物黃酮，抗炎抗氧化，作為單獨 senolytic 的效果較溫和", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "longevity-bio-age",
        name: "生物年齡檢測",
        name_en: "Biological Age Testing",
        keyInfo: "DNA 甲基化時鐘可精確估算生物年齡 (±2 年)，生物年齡比實際年齡更能預測疾病與死亡風險",
        marketType: "high_growth",
        companies: [
          { id: "dna-methylation", name: "DNA 甲基化時鐘", ticker: "每6-12個月", country: "MD", role: "Horvath/Hannum 時鐘測量表觀遺傳年齡，生活型態改變可逆轉生物年齡 1-3 歲", marketShare: "多項 RCT" },
          { id: "grimage", name: "GrimAge 時鐘", ticker: "血液檢測", country: "MD", role: "結合 DNA 甲基化與血漿蛋白預測壽命，是目前預測死亡率最準確的生物時鐘", marketShare: "多項 RCT" },
          { id: "truage", name: "TruAge 檢測", ticker: "每年", country: "MD", role: "消費級 DNA 甲基化檢測服務，DunedinPACE 速率指標追蹤老化速度", marketShare: "觀察性研究" },
          { id: "phenoage", name: "PhenoAge (表型年齡)", ticker: "血液生化指標", country: "BM", role: "基於 9 項常規血液指標計算，無需昂貴基因檢測即可估算生物年齡", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "longevity-exercise",
        name: "運動作為長壽藥",
        name_en: "Exercise as Longevity Medicine",
        keyInfo: "規律運動是唯一同時改善全部十二項老化標誌的介入方式，低 VO2max 的死亡風險是吸菸的 2 倍",
        marketType: "monopoly",
        companies: [
          { id: "vo2max-longevity", name: "VO2max 最大攝氧量", ticker: "HIIT 2-3次/週", country: "EX", role: "最強的全因死亡預測因子，從低轉中 VO2max 組死亡風險降 50%，值得終生訓練", marketShare: "Meta-analysis" },
          { id: "strength-longevity", name: "肌力訓練", ticker: "2-3次/週", country: "EX", role: "肌肉量與肌力是獨立於有氧之外的長壽預測因子，維持功能性獨立不可或缺", marketShare: "Meta-analysis" },
          { id: "zone2-longevity", name: "Zone 2 有氧", ticker: "150-200min/週", country: "EX", role: "提升粒線體密度與脂肪氧化能力，是長壽運動處方的基礎量", marketShare: "Meta-analysis" },
          { id: "flexibility-balance", name: "柔軟度與平衡", ticker: "2-3次/週", country: "EX", role: "跌倒是 65 歲以上意外死亡首因，平衡訓練可降低跌倒風險 23%", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "longevity-social",
        name: "社交連結與目的感",
        name_en: "Social Connection & Purpose",
        keyInfo: "社會孤立使死亡風險增加 26%，效果相當於每天吸 15 支菸；擁有生活目的感可延壽 7 年",
        marketType: "monopoly",
        companies: [
          { id: "blue-zone-social", name: "藍色地帶社交模式", ticker: "持續經營", country: "HA", role: "所有藍色地帶長壽人群的共同特徵：緊密社交圈、多代同堂、社區歸屬感", marketShare: "觀察性研究" },
          { id: "ikigai", name: "生活目的感 (Ikigai)", ticker: "自我探索", country: "HA", role: "沖繩 ikigai（生活意義）概念，擁有明確人生目的者心血管死亡率降低 60%", marketShare: "觀察性研究" },
          { id: "community", name: "社區參與", ticker: "規律參與", country: "HA", role: "志工服務、宗教團體、興趣社群等，持續的社會連結是長壽的保護因子", marketShare: "Meta-analysis" },
          { id: "close-relationships", name: "親密關係", ticker: "主動維護", country: "HA", role: "Harvard 長達 85 年研究結論：良好人際關係是健康與幸福最強預測因子", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "longevity-stack",
        name: "長壽補充品整合方案",
        name_en: "Longevity Supplement Stack",
        keyInfo: "Bryan Johnson 的 Blueprint 方案涵蓋 100+ 補充品，但證據品質參差，核心 5-10 項有較強支持",
        marketType: "high_growth",
        companies: [
          { id: "nmn-stack", name: "NMN (NAD+ 前驅物)", ticker: "500-1000mg/day", country: "SP", role: "核心長壽補充品，恢復 NAD+ 水平支持 Sirtuin 長壽基因與 DNA 修復", marketShare: "多項 RCT" },
          { id: "resveratrol", name: "白藜蘆醇 (Resveratrol)", ticker: "250-500mg/day", country: "SP", role: "Sirtuin 1 活化劑，與 NMN 協同作用，但人體大型 RCT 結果不一致", marketShare: "觀察性研究" },
          { id: "spermidine", name: "亞精胺 (Spermidine)", ticker: "1-5mg/day", country: "SP", role: "誘導自噬作用，小麥胚芽來源，流行病學數據與降低心血管死亡率相關", marketShare: "觀察性研究" },
          { id: "coq10-longevity", name: "輔酶 Q10", ticker: "200mg/day", country: "SP", role: "粒線體電子傳遞鏈關鍵輔因子，隨年齡內源性合成減少，補充支持能量代謝", marketShare: "多項 RCT" },
          { id: "omega3-longevity", name: "Omega-3 (EPA/DHA)", ticker: "2g/day", country: "SP", role: "全方位抗炎與心腦保護，Omega-3 Index >8% 與端粒長度保留正相關", marketShare: "Meta-analysis" },
        ],
      },
    ],
  },

  // ============================================================
  // 18. hl/skin — 🧴 皮膚與外在老化
  // ============================================================
  {
    id: "skin",
    slug: "skin",
    category: "hl",
    name: "皮膚與外在老化",
    name_en: "Skin & External Aging",
    description:
      "從防曬保護、外用抗老成分到膠原蛋白維護與醫美療程，建構皮膚健康與抗老化的完整策略。",
    icon: "🧴",
    color: "#f472b6",
    flowSummary: "防曬保護 → 抗氧化 → 膠原蛋白 → 保濕修復 → 醫美介入",
    sections: [
      {
        id: "skin-sun-protection",
        name: "防曬與光老化",
        name_en: "Sun Protection & Photoaging",
        keyInfo: "80% 面部老化來自紫外線光老化 (photoaging)，防曬是最有效的單一抗老措施",
        marketType: "monopoly",
        companies: [
          { id: "sunscreen", name: "廣譜防曬乳", ticker: "SPF 30-50/每日", country: "SP", role: "UVA+UVB 全波段保護，每 2 小時補擦，陰天室內也需要（UVA 穿透玻璃）", marketShare: "Meta-analysis" },
          { id: "uva-uvb", name: "UVA / UVB 防護", ticker: "PA+++以上", country: "HA", role: "UVB 造成曬傷，UVA 穿透更深造成膠原蛋白分解與色素沉著，兩者都需防護", marketShare: "Meta-analysis" },
          { id: "physical-sunscreen", name: "物理性防曬 (鋅/鈦)", ticker: "每日使用", country: "SP", role: "氧化鋅與二氧化鈦反射紫外線，較溫和不刺激敏感肌，無內分泌干擾疑慮", marketShare: "多項 RCT" },
          { id: "sun-avoidance", name: "物理性遮蔽", ticker: "帽子/太陽眼鏡", country: "HA", role: "寬簾帽、UPF 衣物與太陽眼鏡是最可靠的防曬手段，不受補擦頻率影響", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "skin-topical",
        name: "外用抗老成分",
        name_en: "Topical Anti-aging Ingredients",
        keyInfo: "維 A 酸 (Retinoid) 是唯一有大量 RCT 支持能逆轉光老化的外用成分，使用 12 週以上見效",
        marketType: "monopoly",
        companies: [
          { id: "retinol", name: "維 A 酸 / 視黃醇 (Retinol)", ticker: "每晚使用", country: "SP", role: "促進細胞更新、膠原蛋白合成與色素均勻化，從低濃度開始建立耐受性", marketShare: "Meta-analysis" },
          { id: "vitamin-c-topical", name: "維生素 C 精華", ticker: "每日早晨", country: "SP", role: "L-ascorbic acid 15-20% 中和自由基、抑制黑色素合成、促進膠原蛋白生成", marketShare: "多項 RCT" },
          { id: "niacinamide", name: "菸鹼醯胺 (Niacinamide)", ticker: "5%/每日", country: "SP", role: "維生素 B3 衍生物，改善毛孔粗大、色素不均與皮膚屏障功能，溫和適合所有膚質", marketShare: "多項 RCT" },
          { id: "peptides", name: "胜肽 (Peptides)", ticker: "每日使用", country: "SP", role: "銅胜肽、基質金屬蛋白酶抑制胜肽等，訊號傳遞刺激膠原蛋白與彈性蛋白合成", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "skin-collagen",
        name: "膠原蛋白維護",
        name_en: "Collagen Maintenance",
        keyInfo: "25 歲後膠原蛋白每年流失 1-1.5%，口服膠原蛋白肽 5-10g/day 可改善皮膚彈性與皺紋深度",
        marketType: "oligopoly",
        companies: [
          { id: "collagen-oral", name: "口服膠原蛋白肽", ticker: "5-10g/day", country: "SP", role: "水解膠原蛋白肽 (2.5-10kDa) 可到達真皮層，Meta-analysis 顯示改善皮膚彈性與水分", marketShare: "Meta-analysis" },
          { id: "vitc-collagen", name: "維生素 C (內服)", ticker: "500-1000mg/day", country: "SP", role: "膠原蛋白合成的必需輔因子，缺乏會導致壞血病（膠原蛋白崩解）", marketShare: "Meta-analysis" },
          { id: "copper-peptides", name: "銅胜肽 (GHK-Cu)", ticker: "外用精華", country: "SP", role: "刺激膠原蛋白與糖胺聚醣合成，促進傷口癒合與皮膚重塑", marketShare: "多項 RCT" },
          { id: "avoid-sugar-skin", name: "減少精製糖攝取", ticker: "盡量減少", country: "FD", role: "糖化作用 (glycation) 使膠原蛋白交聯硬化產生 AGEs，加速皺紋與鬆弛", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "skin-barrier",
        name: "皮膚屏障修復",
        name_en: "Skin Barrier Repair",
        keyInfo: "角質層屏障受損會導致經皮水分散失 (TEWL) 增加，引發乾燥、敏感與發炎的惡性循環",
        marketType: "low_growth",
        companies: [
          { id: "ceramides", name: "神經醯胺 (Ceramides)", ticker: "每日使用", country: "SP", role: "角質層脂質主成分 (50%)，外用補充可修復皮膚屏障、減少水分散失", marketShare: "多項 RCT" },
          { id: "hyaluronic-acid", name: "玻尿酸 (HA)", ticker: "每日使用", country: "SP", role: "保濕聖品，1g 可吸附 1000g 水分，多分子量組合效果最佳（穿透+鎖水）", marketShare: "多項 RCT" },
          { id: "gentle-cleanse", name: "溫和清潔", ticker: "早晚各一次", country: "HA", role: "避免過度清潔破壞皮脂膜，pH 5.5 弱酸性潔面劑維持正常皮膚微生態", marketShare: "多項 RCT" },
          { id: "squalane", name: "角鯊烷 (Squalane)", ticker: "每日使用", country: "SP", role: "模擬人體天然皮脂成分，輕盈好吸收的封閉型保濕劑，適合所有膚質", marketShare: "觀察性研究" },
        ],
      },
      {
        id: "skin-aesthetics",
        name: "醫美與非侵入療程",
        name_en: "Medical Aesthetics & Non-invasive Treatments",
        keyInfo: "微針療程可增加膠原蛋白合成 400%（研究數據），且恢復期短、風險低",
        marketType: "high_growth",
        companies: [
          { id: "laser", name: "雷射治療", ticker: "每3-6個月", country: "MD", role: "飛梭雷射 (Fractional) 刺激膠原重塑，皮秒雷射處理色素，需專業醫師操作", marketShare: "多項 RCT" },
          { id: "microneedling", name: "微針 (Microneedling)", ticker: "每4-6週", country: "MD", role: "1.0-1.5mm 針深刺激真皮層膠原蛋白新生，搭配 PRP 效果更佳", marketShare: "多項 RCT" },
          { id: "prp-skin", name: "PRP 富血小板血漿", ticker: "每3-6個月", country: "MD", role: "自體血液濃縮生長因子，注射或搭配微針用於皮膚回春與毛髮再生", marketShare: "多項 RCT" },
          { id: "botox", name: "肉毒桿菌素 (Botox)", ticker: "每3-6個月", country: "MD", role: "放鬆動態皺紋（抬頭紋、魚尾紋），預防性使用可延緩皺紋加深", marketShare: "Meta-analysis" },
        ],
      },
    ],
  },

  // ============================================================
  // 19. hl/mental — 🧘 心理與壓力管理
  // ============================================================
  {
    id: "mental",
    slug: "mental",
    category: "hl",
    name: "心理與壓力管理",
    name_en: "Mental Health & Stress Management",
    description:
      "從慢性壓力管理、冥想與呼吸訓練到情緒韌性建立，建構身心健康的完整壓力調節與心理韌性策略。",
    icon: "🧘",
    color: "#a78bfa",
    flowSummary: "壓力辨識 → 正念冥想 → 呼吸訓練 → 社交支持 → 專業協助",
    sections: [
      {
        id: "mental-stress",
        name: "慢性壓力管理",
        name_en: "Chronic Stress Management",
        keyInfo: "慢性壓力使端粒縮短加速 10 年、免疫力下降 40%、心血管風險增加 2 倍，是現代社會最大的健康威脅之一",
        marketType: "monopoly",
        companies: [
          { id: "meditation-stress", name: "冥想練習", ticker: "10-20min/day", country: "HA", role: "MBSR 8 週課程可降低皮質醇 25%、焦慮量表分數 30%，效果持續到課程結束後", marketShare: "Meta-analysis" },
          { id: "deep-breath-stress", name: "深呼吸 (4-7-8)", ticker: "每日多次", country: "HA", role: "延長吐氣啟動副交感神經，4 秒吸氣-7 秒憋氣-8 秒吐氣，即時降低焦慮", marketShare: "多項 RCT" },
          { id: "nature-exposure", name: "自然暴露", ticker: "120min/週", country: "HA", role: "每週 2 小時以上自然環境接觸可顯著降低皮質醇與血壓（日本森林浴研究）", marketShare: "多項 RCT" },
          { id: "exercise-stress", name: "規律運動", ticker: "30min/day", country: "EX", role: "運動釋放腦內啡與內源性大麻素，等效於低劑量抗焦慮藥物", marketShare: "Meta-analysis" },
        ],
      },
      {
        id: "mental-mindfulness",
        name: "冥想與正念",
        name_en: "Meditation & Mindfulness",
        keyInfo: "正念冥想可增加前額葉皮質灰質密度、縮小杏仁核（恐懼中樞），8 週 MBSR 即有結構性腦部變化",
        marketType: "monopoly",
        companies: [
          { id: "mbsr", name: "正念減壓 (MBSR)", ticker: "8週課程", country: "HA", role: "Jon Kabat-Zinn 開發的標準化課程，數千項研究支持其改善壓力、焦慮與慢性疼痛", marketShare: "Meta-analysis" },
          { id: "vipassana", name: "內觀冥想 (Vipassana)", ticker: "每日練習", country: "HA", role: "觀察身體感受的古老技法，培養不反應的覺察力，10 日課程為入門體驗", marketShare: "觀察性研究" },
          { id: "daily-meditation", name: "每日靜坐", ticker: "10-20min/day", country: "HA", role: "持續性比時間長度重要，每日 10 分鐘比偶爾 1 小時更有效，app 輔助入門", marketShare: "多項 RCT" },
          { id: "body-scan", name: "身體掃描 (Body Scan)", ticker: "10-20min", country: "HA", role: "系統性掃描全身感受，提升身體覺察與放鬆反應，特別適合睡前練習", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "mental-breathwork",
        name: "呼吸訓練法",
        name_en: "Breathwork Techniques",
        keyInfo: "Stanford 2023 研究：每日 5 分鐘循環嘆息呼吸法 (cyclic sighing) 效果優於冥想改善情緒與焦慮",
        marketType: "oligopoly",
        companies: [
          { id: "box-breathing", name: "方框呼吸法", ticker: "4-4-4-4", country: "HA", role: "美國海軍 SEAL 使用的壓力調節法：吸 4 秒-憋 4 秒-吐 4 秒-憋 4 秒，立即鎮靜", marketShare: "多項 RCT" },
          { id: "wim-hof", name: "Wim Hof 呼吸法", ticker: "每日練習", country: "HA", role: "30 次快速過度換氣 + 憋氣，可主動影響免疫與發炎反應（Radboud 大學 RCT）", marketShare: "多項 RCT" },
          { id: "cyclic-sighing", name: "循環嘆息法", ticker: "5min/day", country: "HA", role: "雙吸一吐（short-short-long），Stanford 研究顯示每日 5 分鐘即可降低焦慮", marketShare: "多項 RCT" },
          { id: "nasal-breathing", name: "鼻呼吸", ticker: "全天候", country: "HA", role: "鼻腔產生一氧化氮、過濾空氣、增加血氧效率，改為鼻呼吸是基礎中的基礎", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "mental-resilience",
        name: "情緒韌性",
        name_en: "Emotional Resilience",
        keyInfo: "認知行為療法 (CBT) 改善焦慮與憂鬱的效果等同於藥物治療，且復發率更低",
        marketType: "oligopoly",
        companies: [
          { id: "cbt", name: "認知行為療法 (CBT)", ticker: "12-16 次", country: "MD", role: "辨識與修正認知扭曲的標準化心理治療，最多 RCT 支持的心理療法", marketShare: "Meta-analysis" },
          { id: "journaling", name: "日記書寫", ticker: "每日 10min", country: "HA", role: "表達性寫作降低反芻思考，感恩日記提升正向情緒與生活滿意度", marketShare: "多項 RCT" },
          { id: "gratitude", name: "感恩練習", ticker: "每日 3 件事", country: "HA", role: "每日記錄 3 件感恩事項可在 6 週內提升幸福感 25%，改變大腦正向偏向", marketShare: "多項 RCT" },
          { id: "cold-mental", name: "冷暴露", ticker: "2-3min 冷水淋浴", country: "HA", role: "有意識地面對不適建立壓力耐受力，釋放正腎上腺素提升警覺與情緒", marketShare: "多項 RCT" },
        ],
      },
      {
        id: "mental-supplements",
        name: "助眠與抗焦慮補充品",
        name_en: "Calming & Anti-anxiety Supplements",
        keyInfo: "L-茶胺酸 200mg 可在 30 分鐘內增加 alpha 腦波活動，產生放鬆但不嗜睡的效果",
        marketType: "high_growth",
        companies: [
          { id: "l-theanine", name: "L-茶胺酸 (L-Theanine)", ticker: "200-400mg/day", country: "SP", role: "綠茶活性胺基酸，跨越血腦屏障促進 alpha 腦波、GABA 與多巴胺合成", marketShare: "多項 RCT" },
          { id: "ashwagandha-anxiety", name: "南非醉茄 (Ashwagandha)", ticker: "300-600mg/day", country: "SP", role: "降低皮質醇 28%、焦慮量表分數 44%（KSM-66 萃取物 RCT），適應原草藥之王", marketShare: "多項 RCT" },
          { id: "gaba", name: "GABA (γ-氨基丁酸)", ticker: "100-750mg/day", country: "SP", role: "主要抑制性神經傳導物質，口服 GABA 是否穿越血腦屏障仍有爭議，但仍有鎮靜報告", marketShare: "觀察性研究" },
          { id: "cbd", name: "CBD (大麻二酚)", ticker: "25-50mg/day", country: "SP", role: "非精神活性大麻成分，調節內源性大麻素系統，改善焦慮與睡眠品質", marketShare: "多項 RCT" },
          { id: "magnesium-anxiety", name: "鎂 (Magnesium)", ticker: "400mg/day", country: "SP", role: "缺鎂與焦慮正相關，甘胺酸鎂形式同時提供鎂與甘胺酸的鎮靜效果", marketShare: "Meta-analysis" },
        ],
      },
    ],
  },
];
