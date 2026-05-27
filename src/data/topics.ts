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
  category: "hw" | "sw";
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
];
