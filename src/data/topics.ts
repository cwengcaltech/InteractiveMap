export type MarketType = "monopoly" | "oligopoly" | "high_growth" | "low_growth" | "emerging";

export interface SectionCompany {
  id: string;
  name: string;
  ticker?: string;
  country: string;
  role: string;
  marketShare?: string;
  howTo?: string;
  frequency?: string;
  notes?: string;
}

export interface TopicSection {
  id: string;
  name: string;
  name_en: string;
  keyInfo: string;
  marketType: MarketType;
  companies: SectionCompany[];
  relationships?: string[];
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
        relationships: [
          "Google、Amazon、Microsoft、Meta 皆自研 XPU 以降低對 NVIDIA GPU 依賴",
          "五大 Hyperscaler 的 XPU 均委託 Broadcom 或 Marvell 設計",
          "所有 Hyperscaler XPU 皆依賴台積電先進製程代工",
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
        relationships: [
          "Broadcom 與 Marvell 在客製 ASIC 設計市場直接競爭，合計市佔超過 80%",
          "Broadcom 為 Google TPU 與 Meta MTIA 設計夥伴，Marvell 服務 AWS 與 Microsoft",
          "聯發科與 NVIDIA 合作開發 ARM 架構資料中心晶片，切入 ASIC 設計市場",
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
        relationships: [
          "世芯與創意均為台積電先進製程 ASIC 設計服務商，彼此直接競爭",
          "創意電子為台積電轉投資公司，取得先進製程 PDK 具先發優勢",
          "台系 ASIC 設計公司受惠於 Broadcom/Marvell 產能溢出效應",
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
        relationships: [
          "台積電壟斷 XPU 先進製程代工，Samsung 與 Intel 極力爭取訂單",
          "Samsung 與 Intel 均採用 GAA 架構追趕台積電，但良率仍有差距",
          "台積電為 NVIDIA、AMD、Apple 等主要 Fabless 唯一代工選擇",
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
        relationships: [
          "台積電 CoWoS 壟斷 AI 晶片 2.5D 封裝，日月光承接溢出產能",
          "SK Hynix 供應 HBM 晶粒至台積電 CoWoS 進行整合封裝",
          "SK Hynix、Samsung、Micron 三家 HBM 供應商爭奪 NVIDIA 訂單",
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
        relationships: [
          "Google TPU 與 AWS Trainium 為自研 XPU 規模最大的兩家",
          "四大 Hyperscaler 的 XPU 均與自家 GPU 部署形成互補策略",
          "Azure Maia 搭配自研 Cobalt ARM CPU，降低對 Intel Xeon 依賴",
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
        relationships: [
          "Broadcom 與 Marvell 的 XPU 成長正侵蝕 NVIDIA GPU 市場份額",
          "NVIDIA 面臨 XPU 替代壓力，但 CUDA 軟體生態系仍為最大護城河",
          "XPU 預計 2026 年佔 AI 加速器 TAM 15-20%，GPU 仍佔主導",
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
        relationships: [
          "Arm 壟斷 XPU 搭載的 CPU 核心 IP，SiFive 與晶心以 RISC-V 挑戰",
          "SiFive 與晶心科技在 RISC-V CPU IP 市場直接競爭",
          "幾乎所有 Hyperscaler XPU 均採用 Arm Neoverse CSS 架構",
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
        relationships: [
          "Synopsys 與 Cadence 形成 EDA 雙寡佔，合計市佔超過 85%",
          "Siemens EDA (前 Mentor) 在光罩驗證 Calibre 工具仍具壟斷地位",
          "所有 ASIC 設計公司均高度依賴 Synopsys 與 Cadence 的 EDA 工具鏈",
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
        relationships: [
          "Synopsys 與 Cadence 在 SerDes IP 市場同樣形成雙寡佔格局",
          "Alphawave 以 224G SerDes IP 專精化策略挑戰 Synopsys/Cadence",
          "Arm AMBA CHI 互連 IP 為 chiplet 間通訊的基礎標準",
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
        relationships: [
          "Synopsys 透過收購 Kilopass 壟斷嵌入式 NVM IP 與安全 IP 市場",
          "Rambus 專注記憶體控制器與安全 IP，與 Synopsys 形成互補競爭",
          "ASIC 設計複雜度提升推動嵌入式記憶體與安全 IP 授權需求激增",
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
        relationships: [
          "Astera Labs 與 Credo 在 PCIe/CXL Retimer 市場直接競爭",
          "Broadcom 與 Marvell 同時供應網路 ASIC 與光模組 DSP 晶片",
          "AI 叢集 800G/1.6T 互連需求帶動四家公司營收同步高速成長",
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
        relationships: [
          "SK Hynix 技術領先，Samsung 良率追趕，Micron 為後進挑戰者",
          "三家 HBM 廠商均爭取 NVIDIA 認證與供應份額",
          "SK Hynix 與 Samsung 在 HBM3E/HBM4 世代轉換中激烈競爭",
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
        relationships: [
          "Samsung、SK Hynix、Micron 三家寡佔全球 DRAM 市場近 100%",
          "三家 DRAM 廠同時是 HBM 唯一供應商，DRAM 產能正加速轉向 HBM",
          "Micron 為美國唯一 DRAM 廠商，具地緣政治戰略重要性",
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
        relationships: [
          "Lam Research 與 Applied Materials 在 TSV 蝕刻/沉積設備直接競爭",
          "BESI 壟斷 HBM 熱壓接合設備，SK Hynix 與 Samsung 均為其客戶",
          "EV Group 與 Tokyo Electron 在晶圓接合設備市場競爭",
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
        relationships: [
          "SK Hynix 與 Samsung 自有封裝產線，日月光承接溢出測試訂單",
          "Advantest 壟斷 HBM 測試設備，三大記憶體廠均為其客戶",
          "HBM 封裝良率為成本關鍵，推動 Advantest 測試設備需求激增",
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
        relationships: [
          "NVIDIA 消耗全球約 60% HBM 產能，為三大記憶體廠最重要客戶",
          "AMD MI 系列為第二大 HBM 客戶，與 NVIDIA 競爭 HBM 產能配額",
          "Broadcom XPU 整合 HBM 需求快速成長，間接推動 HBM 產能吃緊",
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
        relationships: [
          "信越化學與 SUMCO 合計壟斷超過 55% 矽晶圓市場",
          "味之素壟斷 ABF 絕緣膜供應，台積電 CoWoS 封裝高度依賴",
          "Resonac 供應 HBM 接合材料 (NCF/DAF) 給 SK Hynix 與 Samsung",
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
        relationships: [
          "SK Hynix 計畫 HBM 產能年增 150%，引領市場供給擴張",
          "Samsung 加速轉產 DRAM 至 HBM，縮小與 SK Hynix 的差距",
          "三家廠商 2025 年 HBM 合計營收預估達 $350 億，年增超過 100%",
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
        relationships: [
          "台積電、Samsung、Intel 三家在 2nm GAA 節點展開技術競賽",
          "Samsung 率先量產 GAA 3nm，但良率落後台積電 FinFET N3E",
          "Intel 18A 以 RibbonFET GAA 架構試圖追趕台積電 N2 節點",
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
        relationships: [
          "ASML 壟斷 EUV 光刻機，台積電、Samsung、Intel 均為其客戶",
          "Zeiss 與 TRUMPF 為 ASML EUV 核心零組件唯一供應商",
          "ASML 收購 Cymer 掌握 DUV 光源技術，垂直整合光刻供應鏈",
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
        relationships: [
          "台積電壟斷先進製程代工，Apple/NVIDIA/AMD 高度依賴",
          "Samsung 以 GAA 3nm 爭取 Qualcomm/Google 部分訂單",
          "Intel Foundry 爭取 Microsoft 為首批外部客戶以證明製程能力",
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
        relationships: [
          "Lam Research 與 Applied Materials 在蝕刻/沉積設備市場雙寡佔",
          "Tokyo Electron 壟斷塗佈顯影設備，同時在蝕刻/ALD 競爭",
          "ASM International 專精 ALD 設備，GAA 製程使其需求大幅提升",
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
        relationships: [
          "KLA 壟斷半導體製程檢測設備，市佔率超過 55%",
          "Applied Materials 同時供應蝕刻/沉積與電子束檢測設備",
          "Hitachi High-Tech 的 CD-SEM 與 KLA 的光學檢測形成互補",
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
        relationships: [
          "Synopsys 與 Cadence 雙寡佔先進製程 EDA 市場，合計超過 90%",
          "2nm 設計成本超過 $5 億，推升 EDA 工具授權費與 IP 需求",
          "Siemens EDA 以 Calibre 光罩驗證工具維持特定領域競爭力",
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
        relationships: [
          "Hoya 壟斷 EUV 光罩空白基板，Photronics 與 DNP 依賴其供應",
          "Photronics 與大日本印刷 (DNP) 在光罩製造市場直接競爭",
          "日本廠商壟斷光罩供應鏈上游，具地緣政治戰略意義",
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
        relationships: [
          "信越化學與 SUMCO 合計供應全球超過 55% 的 300mm 矽晶圓",
          "SK Siltron 為 SK 集團旗下，與 SK Hynix 形成垂直整合優勢",
          "五大矽晶圓廠壟斷全球供應，新進者進入門檻極高",
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
        relationships: [
          "NVIDIA 壟斷 AI GPU 市場超過 85%，AMD 為唯一有效挑戰者",
          "AMD MI300X 以 HBM 容量優勢切入推論市場挑戰 NVIDIA",
          "Intel Gaudi 以性價比定位試圖打入 AI 加速器市場",
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
        relationships: [
          "NVIDIA CUDA 生態系是最深護城河，AMD ROCm 持續追趕中",
          "NVIDIA Blackwell 雙晶粒設計推動封裝技術極限",
          "AMD 與 Intel 均試圖打破 NVIDIA CUDA 軟體鎖定效應",
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
        relationships: [
          "台積電為 NVIDIA 與 AMD AI GPU 唯一代工夥伴",
          "NVIDIA/AMD 高度依賴台積電，代工集中度風險受市場關注",
          "Samsung 僅承接 NVIDIA 部分網通晶片，尚未進入核心 GPU 代工",
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
        relationships: [
          "SK Hynix 為 NVIDIA/AMD HBM 主要供應商，供貨優先權最高",
          "Samsung HBM 仍在 NVIDIA 良率驗證階段，市佔有提升空間",
          "HBM 記憶體成本佔 GPU 總成本 40%+，議價權影響 GPU 毛利",
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
        relationships: [
          "台積電 CoWoS 壟斷 AI GPU 封裝，日月光與 Amkor 承接溢出訂單",
          "B200 GPU 採用 CoWoS-L 封裝面積達 5,000mm2，僅台積電可量產",
          "日月光負責 GPU 後端封裝測試，與台積電形成上下游互補",
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
        relationships: [
          "Ibiden 與 Shinko 為日本 ABF 載板雙龍頭，合計市佔超過 50%",
          "欣興與南亞電路板為台灣 ABF 載板代表，承接 AMD/Intel 訂單",
          "ABF 載板供不應求，日系與台系廠商均大規模擴產中",
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
        relationships: [
          "鴻海與廣達為 NVIDIA GB200 兩大組裝夥伴，合計市佔超過 65%",
          "台灣 ODM 廠合計生產全球超過 90% AI 伺服器",
          "Supermicro 為唯一自有品牌直銷 OEM，與台系 ODM 差異化競爭",
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
        relationships: [
          "Microsoft 為 NVIDIA GPU 最大買家，同時投資 OpenAI 鎖定 AI 算力",
          "Google 與 Amazon 同時採購 GPU 並自研 XPU，雙軌策略降低依賴",
          "四大 Hyperscaler 合計佔 NVIDIA 資料中心 GPU 採購量超過 50%",
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
        relationships: [
          "NVIDIA 定義 AI 伺服器平台標準，AMD 與 Intel 追隨其規格",
          "AMD 以 EPYC CPU + MI300X GPU 整合平台挑戰 NVIDIA 生態系",
          "NVIDIA、AMD、Intel 三家平台在 AI 伺服器市場直接競爭",
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
        relationships: [
          "NVIDIA 壟斷通用 AI 加速模組市場，市佔超過 85%",
          "Google TPU 與 AWS Trainium 僅供自家雲端使用，不對外銷售",
          "AMD MI300X 為 NVIDIA 外唯一可大規模部署的第三方 AI 加速器",
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
        relationships: [
          "鴻海與廣達合計組裝超過 65% AI 伺服器，為 NVIDIA 核心夥伴",
          "緯創與英業達分別服務 Meta/微軟與 HP/Dell 等不同客戶群",
          "Supermicro 以自有品牌直銷模式與台灣 ODM 差異化競爭",
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
        relationships: [
          "NVIDIA (Mellanox) 壟斷 InfiniBand AI 叢集互連，市佔超過 80%",
          "Arista 與 Cisco 在資料中心 Ethernet 交換器市場直接競爭",
          "Broadcom 供應網路交換晶片給 Arista，同時也是 Cisco 的競爭者",
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
        relationships: [
          "台達電與光寶科技在 AI 伺服器電源供應器市場直接競爭",
          "Vertiv 與 Eaton 在資料中心 UPS 與配電系統市場雙寡佔",
          "台達電為 NVIDIA AI 伺服器電源主要供應商，市佔率領先",
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
        relationships: [
          "雙鴻科技為 NVIDIA 認證散熱供應商，與 Cooler Master 競爭模組訂單",
          "Vertiv 與 Schneider 在資料中心液冷與精密空調市場直接競爭",
          "液冷技術需求激增，台系與美歐廠商同步擴產搶佔市場",
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
        relationships: [
          "AWS、Azure、GCP 三大雲端平台合計佔全球雲端市場超過 65%",
          "Meta 為唯一非公有雲模式的大規模 AI 資料中心營運商",
          "Oracle Cloud 以 GPU 超級叢集快速擴張，搶攻 AI 新創客戶",
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
        relationships: [
          "OpenAI、Anthropic、Google DeepMind 形成閉源模型三強鼎立",
          "Meta Llama 開源策略對 OpenAI/Anthropic 閉源模式形成競爭壓力",
          "OpenAI 獲 Microsoft 投資，Anthropic 獲 Google/Amazon 投資",
          "Mistral 以開源+商用雙軌策略挑戰美國 AI 模型公司主導地位",
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
        relationships: [
          "AWS、Azure、GCP 三大雲端平台寡佔 AI 基礎設施市場超過 65%",
          "Azure 透過 OpenAI 獨家合作取得企業 AI 平台差異化優勢",
          "Oracle Cloud 以 GPU 價格優勢快速擴張，搶攻 AI 新創市場",
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
        relationships: [
          "Meta PyTorch 壟斷 AI 訓練框架市場，Google JAX 為主要挑戰者",
          "NVIDIA NeMo 框架深度綁定 CUDA 生態系，強化 GPU 鎖定效應",
          "Hugging Face 為開源模型中立平台，支援 PyTorch 與 JAX 框架",
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
        relationships: [
          "NVIDIA TensorRT-LLM 為 GPU 推論優化標準，vLLM 為開源替代方案",
          "Together AI 與 Fireworks AI 在雲端推論 API 市場直接競爭",
          "vLLM 開源引擎降低推論成本，對 NVIDIA 閉源方案形成壓力",
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
        relationships: [
          "Microsoft Copilot 依賴 OpenAI 模型，Salesforce 則自建 AI 模型",
          "Salesforce 與 ServiceNow 在企業 AI 自動化平台市場直接競爭",
          "Databricks 以開源數據平台切入企業 AI，與雲端巨頭差異化競爭",
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
        relationships: [
          "NVIDIA CUDA 生態系壟斷 AI 軟體堆疊，AMD ROCm 為主要挑戰者",
          "OpenAI Triton 語言旨在降低開發者對 CUDA 的直接依賴",
          "AMD 與 Intel 均推開源軟體堆疊試圖打破 NVIDIA CUDA 鎖定",
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
        relationships: [
          "NVIDIA 與 Broadcom 為台積電 CoWoS 產能兩大爭奪者",
          "台積電開發 CoWoS-L 技術以滿足 NVIDIA Blackwell 超大封裝需求",
          "NVIDIA、AMD、Broadcom 均高度依賴台積電 CoWoS 封裝技術",
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
        relationships: [
          "台積電壟斷矽中介層量產，聯電爭取溢出產能訂單",
          "Samsung 以 I-Cube/H-Cube 自有平台試圖打破台積電壟斷",
          "聯電以成熟製程中介層切入，與台積電形成產能互補",
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
        relationships: [
          "台積電 CoWoS 產能壟斷率達 90%，日月光與 Amkor 承接溢出訂單",
          "日月光以 Fan-out 先進封裝技術爭取 CoWoS 替代方案訂單",
          "CoWoS 產能為 AI 晶片供應鏈最大瓶頸，三家廠商均全力擴產",
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
        relationships: [
          "日月光為全球最大 OSAT 廠，矽品 (SPIL) 為其旗下子公司",
          "日月光與 Amkor 在全球先進封裝委外市場直接競爭",
          "長電科技為中國 OSAT 龍頭，技術追趕日月光與 Amkor",
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
        relationships: [
          "SK Hynix 供應 HBM 晶粒，台積電負責 CoWoS 封裝整合",
          "SK Hynix 與 Samsung 在 HBM 堆疊封裝技術上激烈競爭",
          "台積電為 HBM 與邏輯晶片的最終整合者，掌握封裝話語權",
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
        relationships: [
          "BESI 壟斷 TCB 熱壓接合設備，ASMPT 為第二大供應商",
          "Kulicke & Soffa 從傳統打線接合轉型先進封裝 TCB 設備",
          "EV Group 專精晶圓級接合設備，與 BESI 在不同製程環節互補",
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
        relationships: [
          "味之素壟斷 ABF 絕緣膜材料，Ibiden/Shinko/欣興均依賴其供應",
          "Ibiden 與 Shinko 為日系 ABF 載板雙龍頭，合計市佔超過 50%",
          "欣興電子為台灣最大 ABF 載板廠，積極擴產追趕日系廠商",
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
        relationships: [
          "Advantest 與 Teradyne 雙寡佔半導體測試設備市場，合計超過 85%",
          "致茂電子專精系統級測試 (SLT)，與 Advantest ATE 形成互補",
          "CoWoS 封裝測試時間與成本激增，推動四家測試設備廠營收成長",
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
        relationships: [
          "NVIDIA 獨佔約 60% CoWoS 產能，與 Broadcom 合計超過 75%",
          "Google TPU 與 Amazon Trainium 透過 Broadcom 間接使用 CoWoS",
          "AMD MI 系列與 NVIDIA GPU 競爭 CoWoS 產能配額",
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
        relationships: [
          "Broadcom 以 Tomahawk 交換晶片+CPO 平台整合方案領先業界",
          "NVIDIA 與 Broadcom 在 AI 叢集光互連技術路線上競爭",
          "Intel 為矽光子技術先驅，Cisco 透過收購 Acacia 進入市場",
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
        relationships: [
          "GlobalFoundries 與台積電在矽光子代工平台直接競爭",
          "Intel 擁有自有矽光子晶圓廠，不依賴外部代工",
          "Tower Semiconductor 以特殊製程服務中小型矽光子客戶",
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
        relationships: [
          "Coherent 與 Lumentum 為 III-V 族雷射雙龍頭，合計市佔超過 60%",
          "Lumentum 收購 NeoPhotonics 強化高速光學元件佈局",
          "III-V 族雷射光源為矽光子晶片不可或缺的外部元件",
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
        relationships: [
          "中際旭創為 800G 光模組出貨量冠軍，Coherent 為美系龍頭",
          "Broadcom 與 Marvell 供應光模組 DSP 晶片給所有模組廠商",
          "中系光模組廠 (中際旭創/易飛揚) 以價格優勢搶佔全球市場",
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
        relationships: [
          "Corning 壟斷光纖供應，Amphenol 與 TE 在連接器市場競爭",
          "Amphenol 與 TE Connectivity 在高速光學連接器市場直接競爭",
          "AI 資料中心光纖佈線需求爆發帶動四家廠商營收同步成長",
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
        relationships: [
          "台積電 COUPE 平台與 Intel EMIB/Foveros 在 CPO 封裝技術競爭",
          "Broadcom 設計 CPO 晶片，台積電負責光電共封裝製造",
          "日月光積極開發光電整合 SiP 封裝，爭取 CPO 封裝訂單",
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
        relationships: [
          "Synopsys 收購 Ansys (含 Lumerical) 主導光子 EDA 市場",
          "Synopsys 與 Cadence 從電子 EDA 延伸至光子 EDA 雙寡佔",
          "Luceda 以開源光子 IC 設計框架在特定領域與巨頭差異化競爭",
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
        relationships: [
          "四大 Hyperscaler 均評估 CPO 技術以因應 AI 叢集頻寬需求",
          "Microsoft 與 Google 為 CPO 技術最積極的評估與導入者",
          "Hyperscaler CPO 大規模導入預估 2027-2028 年，目前為驗證階段",
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
        relationships: [
          "NVIDIA 壟斷 AI 加速器設計市場，AMD 為唯一有效挑戰者",
          "Google 與 Amazon 自研 AI 加速器，降低對 NVIDIA 設計依賴",
          "所有 AI 加速器設計均高度依賴台積電先進製程與 EDA 工具",
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
        relationships: [
          "Qualcomm 與聯發科在行動 SoC 市場直接競爭，合計市佔超過 70%",
          "Apple 自研晶片僅供自家產品，但佔台積電先進製程最大產能",
          "四家行動 SoC 設計公司均依賴 Arm CPU 架構 IP 授權",
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
        relationships: [
          "Broadcom 壟斷網路交換晶片市場，Arista 為其最大客戶之一",
          "Cisco 自研 Silicon One 晶片以降低對 Broadcom 的依賴",
          "Marvell 以 DPU 與客製化網路晶片挑戰 Broadcom 主導地位",
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
        relationships: [
          "Synopsys 與 Cadence 雙寡佔 EDA 市場，合計市佔超過 85%",
          "全球所有 IC 設計公司均高度依賴 Synopsys 與 Cadence 工具鏈",
          "Siemens EDA 以 Calibre 光罩驗證工具維持特定細分市場地位",
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
        relationships: [
          "Arm 壟斷行動與伺服器 CPU IP 授權，SiFive/晶心以 RISC-V 挑戰",
          "SiFive 與晶心科技在 RISC-V CPU IP 市場直接競爭",
          "Imagination 在 GPU IP 市場獨立於 Arm 生態系，提供替代方案",
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
        relationships: [
          "Synopsys 與 Cadence 在 SerDes/PCIe IP 市場延續 EDA 雙寡佔格局",
          "Alphawave 以 224G SerDes IP 專精策略挑戰 Synopsys/Cadence",
          "Rambus 專注記憶體控制器 IP，與 Synopsys 在 DDR/HBM IP 競爭",
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
        relationships: [
          "力旺電子壟斷嵌入式 OTP/MTP NVM IP，全球市佔超過 70%",
          "Synopsys 以 SRAM/ROM IP 與力旺在不同嵌入式記憶體類型互補",
          "Rambus 專注安全記憶體控制器 IP，與 Synopsys 在安全 IP 競爭",
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
        relationships: [
          "AMD (Xilinx) 與 Intel (Altera) 雙寡佔 FPGA 市場，合計超過 85%",
          "Intel 分拆 Altera 獨立運營，與 AMD Xilinx 在 FPGA 直接競爭",
          "Lattice 以低功耗 FPGA 差異化定位，避開與 AMD/Intel 正面競爭",
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
        relationships: [
          "Synopsys 與 Cadence 在驗證/模擬工具市場同樣雙寡佔，合計超過 85%",
          "Synopsys ZeBu 與 Cadence Palladium 在硬體模擬器市場激烈競爭",
          "Siemens Veloce 為第三大硬體模擬器，在特定客戶群維持份額",
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
        relationships: [
          "TI 與 ADI 為全球類比 IC 雙龍頭，合計市佔超過 34%",
          "NXP、Infineon、Renesas 三家在車用半導體市場激烈競爭",
          "類比 IC 市場分散且產品長壽，與數位晶片快速迭代截然不同",
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
          { id: "omega3-dha", name: "Omega-3 DHA", ticker: "1-2g/day", country: "SP", role: "維持神經細胞膜流動性與突觸可塑性，降低神經發炎", marketShare: "Meta-analysis", howTo: "選擇 DHA 含量較高的高純度魚油（DHA ≥ 500mg/粒），隨含脂肪餐服用以提升吸收。IFOS 或 USP 認證確保重金屬與氧化值合格。", frequency: "每日 1-2g 總 EPA+DHA，分早晚兩次隨餐", notes: "服用抗凝血藥（warfarin、阿斯匹靈）者應諮詢醫師。素食者可選藻油 DHA。打嗝有魚腥味可改用腸溶劑型或冷藏保存。" },
          { id: "curcumin", name: "薑黃素 (Curcumin)", ticker: "500mg/day", country: "SP", role: "抗氧化與抗神經發炎，促進 BDNF 分泌，需搭配黑胡椒素增吸收", marketShare: "多項 RCT", howTo: "選擇含 piperine（黑胡椒素）或 Meriva/Longvida/BCM-95 高生物利用度配方，隨含脂肪餐服用以提升吸收 20 倍。", frequency: "每日 500-1000mg 標準化薑黃素，隨餐", notes: "服用抗凝血藥、膽結石、缺鐵者慎用，可能干擾鐵吸收。高劑量可能造成腸胃不適，從低劑量開始。" },
          { id: "aerobic-neuro", name: "有氧運動", ticker: "150min/週", country: "EX", role: "增加腦源性神經營養因子 BDNF，促進海馬迴神經新生", marketShare: "Meta-analysis", howTo: "選擇快走、慢跑、騎車或游泳，維持心率 60-75% 最大心率（220-年齡）。可用心率錶監測，對話測試：能說完整句子但無法唱歌。", frequency: "每週 150-300 分鐘，可拆成 5 次 30 分鐘", notes: "心血管疾病或膝關節問題者先諮詢醫師。從每次 15 分鐘開始逐步增加。配合阻力訓練效果更佳。" },
          { id: "blueberries", name: "藍莓 / 莓果類", ticker: "1杯/day", country: "FD", role: "花青素穿越血腦屏障，改善記憶與認知功能", marketShare: "多項 RCT", howTo: "新鮮或冷凍藍莓、草莓、黑莓、覆盆莓皆可，冷凍不損失花青素。可加入優格、燕麥或冰沙食用。", frequency: "每日 1 杯（約 150g），或每週 5-7 份莓果類", notes: "糖尿病患者注意整體碳水化合物攝取。有機莓果可降低農藥殘留（莓果為高農藥殘留作物之一）。" },
          { id: "lion-mane", name: "猴頭菇 (Lion's Mane)", ticker: "500-1000mg/day", country: "SP", role: "刺激神經生長因子 NGF 合成，支持神經再生", marketShare: "觀察性研究", howTo: "選擇雙萃取（水萃+醇萃）的子實體萃取物，避免僅菌絲體米基產品。空腹或隨餐均可，效果通常 4-8 週後顯現。", frequency: "每日 500-3000mg 萃取物，可分 2 次", notes: "蘑菇過敏者避免。可能與抗凝血藥交互作用。少數人初期會有腸胃不適或皮膚癢，停用即恢復。" },
        ],
      },
      {
        id: "brain-cognitive-training",
        name: "認知訓練與神經可塑性",
        name_en: "Cognitive Training & Neuroplasticity",
        keyInfo: "持續性冥想練習可增加前額葉皮質灰質密度，8 週 MBSR 即可觀察到大腦結構變化",
        marketType: "oligopoly",
        companies: [
          { id: "meditation", name: "冥想練習", ticker: "10-20min/day", country: "HA", role: "強化前額葉皮質功能，提升注意力與工作記憶容量", marketShare: "多項 RCT", howTo: "找安靜空間舒適坐姿，閉眼專注呼吸或使用 app（Calm、Headspace、Insight Timer、潮汐）。從專注呼吸 5 分鐘開始逐步延長。", frequency: "每日 10-20 分鐘，固定時間（晨起或睡前）", notes: "有嚴重創傷或精神疾病史者建議在專業引導下進行。初期難以集中為正常現象，重點在持續性而非單次長度。" },
          { id: "new-skill", name: "學習新技能", ticker: "持續性", country: "HA", role: "建立新突觸連結，增強認知儲備 (cognitive reserve)", marketShare: "觀察性研究", howTo: "選擇有挑戰性的新領域：學語言（Duolingo）、樂器、舞蹈、繪畫、編程。每週至少 3 次刻意練習並追求漸進進步。", frequency: "每週 3-5 次，每次 30-60 分鐘", notes: "選擇真正陌生的領域才有效果（如已會鋼琴改學繪畫）。受挫感是大腦正在重塑的信號，不應放棄。" },
          { id: "dual-nback", name: "Dual N-back 訓練", ticker: "20min/day", country: "HA", role: "唯一有證據支持可遷移的工作記憶訓練方法", marketShare: "多項 RCT", howTo: "使用 Brain Workshop（免費）或 IQ Boost 等 app，從 N=2 開始逐步挑戰更高 N 值。需同時記憶視覺位置與聽覺序列。", frequency: "每日 20 分鐘，至少持續 19 天才見效", notes: "練習過程感到困難是正常的（應達 80% 錯誤率才有挑戰性）。研究效果有爭議，僅在持續訓練期間有效。" },
          { id: "social-engagement", name: "社交互動", ticker: "規律性", country: "HA", role: "多元社交活動活化大腦多區域網路，降低認知衰退風險", marketShare: "觀察性研究", howTo: "參加讀書會、志工服務、興趣社團、定期家庭聚會。優先選擇面對面而非線上互動。", frequency: "每週至少 3 次有意義的社交互動", notes: "質比量重要：深度對話勝過淺層應酬。社交焦慮者可從小團體或一對一開始。獨居長者風險最高，需主動安排。" },
        ],
      },
      {
        id: "brain-blood-flow",
        name: "腦部血流與供氧",
        name_en: "Brain Blood Flow & Oxygenation",
        keyInfo: "大腦僅佔體重 2% 但消耗 20% 心輸出量，腦血流量每下降 10% 認知功能顯著下降",
        marketType: "oligopoly",
        companies: [
          { id: "aerobic-brain", name: "有氧運動", ticker: "30min/day", country: "EX", role: "提升腦部血流量 15-20%，增加一氧化氮合成促進血管擴張", marketShare: "Meta-analysis", howTo: "選擇中等強度持續運動（快走、慢跑、騎車、游泳），維持心率 60-75% 最大心率。室外運動同時獲得陽光與自然暴露效益。", frequency: "每日 30 分鐘以上，或每週累計 150 分鐘", notes: "心血管疾病者先評估運動能力。避免飯後立即運動。室外霧霾日改室內運動。" },
          { id: "beetroot", name: "甜菜根汁", ticker: "250ml/day", country: "FD", role: "豐富硝酸鹽轉化為一氧化氮，改善腦部微循環", marketShare: "多項 RCT", howTo: "可選新鮮榨汁或市售濃縮汁（Beet It 等品牌），運動或腦力工作前 2-3 小時飲用效果最佳。也可選擇甜菜根粉沖泡。", frequency: "每日 250-500ml，或硝酸鹽 6-12 mmol", notes: "服用低血壓藥物者需注意疊加降壓效果。腎結石（草酸鈣型）患者限制攝取。尿液與糞便可能變紅是正常現象。" },
          { id: "ginkgo", name: "銀杏萃取物", ticker: "120-240mg/day", country: "SP", role: "改善末梢與腦部微循環，標準化萃取物 EGb 761 證據較佳", marketShare: "多項 RCT", howTo: "選擇標準化 EGb 761 萃取物（含 24% 黃酮苷、6% 萜類），分兩次隨餐服用。需連續服用 4-6 週才見效。", frequency: "每日 120-240mg，分早晚兩次", notes: "服用抗凝血藥（warfarin、aspirin）或手術前 2 週須停用，可能增加出血風險。癲癇患者慎用。" },
          { id: "deep-breathing", name: "深呼吸訓練", ticker: "5min/多次/day", country: "HA", role: "優化血氧濃度與自律神經平衡，間接改善腦部供氧", marketShare: "觀察性研究", howTo: "練習腹式呼吸：吸氣 4 秒讓腹部鼓起，吐氣 6 秒收縮腹部。或使用方框呼吸（4-4-4-4）。手放腹部感受起伏。", frequency: "每日多次，每次 5 分鐘；壓力時即刻使用", notes: "過度換氣會造成頭暈，發現不適時恢復正常呼吸即可。氣喘急性發作期間應使用救援吸入器而非呼吸練習。" },
        ],
      },
      {
        id: "brain-nutrients",
        name: "關鍵營養素",
        name_en: "Key Brain Nutrients",
        keyInfo: "維生素 B12 缺乏與認知衰退顯著相關，全球約 20% 老年人 B12 不足",
        marketType: "monopoly",
        companies: [
          { id: "vitb12", name: "維生素 B12", ticker: "500-1000mcg/day", country: "SP", role: "維持髓鞘完整性與甲基化反應，缺乏導致不可逆神經損傷", marketShare: "Meta-analysis", howTo: "優先選擇甲鈷胺 (methylcobalamin) 或氰鈷胺舌下錠/口含錠，吸收率較佳。素食者、50 歲以上、服 metformin 或 PPI 者需特別補充。", frequency: "每日 500-1000mcg，或每週 2000mcg 高劑量", notes: "幾乎無毒性風險（水溶性可排出）。MTHFR 基因變異者建議選甲鈷胺。檢測血清 B12 應 > 400 pg/mL，全血同半胱胺酸更準確。" },
          { id: "folate", name: "葉酸 (Methylfolate)", ticker: "400-800mcg/day", country: "SP", role: "與 B12 協同降低同半胱胺酸，保護腦血管健康", marketShare: "Meta-analysis", howTo: "選擇 L-甲基葉酸 (5-MTHF) 形式，繞過 MTHFR 酶轉化障礙。可從深綠蔬菜（菠菜、蘆筍、扁豆）獲取天然葉酸。", frequency: "每日 400-800mcg（孕婦需 600-1000mcg）", notes: "必須與 B12 一起補充，否則可能掩蓋 B12 缺乏症狀。癌症患者使用前諮詢醫師（葉酸可能促進腫瘤生長）。" },
          { id: "vitd-brain", name: "維生素 D", ticker: "2000-4000IU/day", country: "SP", role: "大腦廣泛分布維生素 D 受體，缺乏與失智風險增加 50% 相關", marketShare: "Meta-analysis", howTo: "選擇 D3 (cholecalciferol) 形式，與含脂餐一起服用提升吸收。理想配合 K2 (MK-7) 防止鈣異位沉積。先檢測 25(OH)D 血清濃度。", frequency: "每日 2000-4000 IU，血清目標 40-60 ng/mL", notes: "不可長期高劑量（>10000IU/day）未檢測，可能導致高鈣血症。檢測項目為 25(OH)D。深膚色與少日曬者需求較高。" },
          { id: "magnesium-brain", name: "鎂 (Mg-Threonate)", ticker: "2000mg/day", country: "SP", role: "L-Threonate 形式可穿越血腦屏障，提升突觸密度與記憶力", marketShare: "多項 RCT", howTo: "選擇 Magtein 專利配方的 Magnesium L-Threonate（每日 1.5-2g 提供約 144mg 元素鎂），分兩次服用，晚間劑量可助眠。", frequency: "每日 1.5-2g L-Threonate，或晚餐+睡前各一次", notes: "腎功能不全者慎用。可能與抗生素（喹諾酮類、四環素類）交互作用，間隔 2-4 小時。腹瀉者改用甘胺酸鎂。" },
          { id: "choline", name: "膽鹼 (Choline)", ticker: "500mg/day", country: "SP", role: "乙醯膽鹼前驅物，影響記憶形成與肝臟健康", marketShare: "觀察性研究", howTo: "食物來源最佳：蛋黃（一顆含 147mg）、牛肝、黃豆、花椰菜。補充劑可選 Alpha-GPC 或 CDP-Choline（Citicoline）認知效果較佳。", frequency: "男性 550mg、女性 425mg/day（孕婦 450mg）", notes: "高劑量可能造成魚腥體味、低血壓、腸胃不適。三甲胺氧化物 (TMAO) 升高可能與心血管風險相關，需均衡攝取。" },
        ],
      },
      {
        id: "brain-biomarkers",
        name: "腦部健康生物標記",
        name_en: "Brain Health Biomarkers",
        keyInfo: "血液 BDNF 濃度與認知功能正相關，可作為運動與介入效果的追蹤指標",
        marketType: "oligopoly",
        companies: [
          { id: "bdnf", name: "BDNF (腦源性神經營養因子)", ticker: "血液檢測", country: "BM", role: "反映神經可塑性與認知儲備量，運動後顯著上升", marketShare: "多項 RCT", howTo: "至研究型或自費健診中心檢驗血清 BDNF。理想範圍隨檢驗方法異，一般 >20 ng/mL 為佳。運動前後可比較變化。", frequency: "每 6-12 個月，運動介入後可重測", notes: "BDNF 受 24 小時內運動、睡眠、發炎狀態強烈影響，採檢前需穩定狀態。台灣目前以自費為主，並非常規檢項。" },
          { id: "homocysteine", name: "同半胱胺酸", ticker: "<10 μmol/L", country: "BM", role: "升高與腦萎縮及失智風險相關，B 群維生素可有效降低", marketShare: "Meta-analysis", howTo: "空腹抽血檢測，可至診所健檢套餐或自費加項。理想 <8 μmol/L，>10 提示風險，>15 需積極介入。", frequency: "每年 1 次（高風險者每 6 個月）", notes: "升高者補充 B12、葉酸、B6 通常 3 個月內顯著下降。MTHFR 基因變異者需甲基化形式 B 群。應同時檢測 B12 排除缺乏。" },
          { id: "brain-mri", name: "腦部 MRI", ticker: "每1-2年", country: "MD", role: "追蹤海馬迴體積、白質病變與腦萎縮程度", marketShare: "Meta-analysis", howTo: "至神經內科或自費健診中心預約。標準 1.5T 或 3T MRI 即可。可加做 MR angiography 評估腦血管狀況。", frequency: "高風險者每 1-2 年，一般人每 3-5 年", notes: "台灣自費約 1.5-3 萬。有金屬植入物（心臟節律器、人工耳蝸）者不可做。幽閉恐懼症者可使用開放式 MRI。" },
          { id: "cognitive-test", name: "認知功能測試 (MoCA)", ticker: "每年", country: "MD", role: "蒙特利爾認知評估量表，篩檢輕度認知障礙", marketShare: "Meta-analysis", howTo: "至神經內科、精神科或記憶門診受測。或使用 MoCA 官方 app 自我練習版（僅供參考非診斷）。完整測試約 10-15 分鐘。", frequency: "60 歲後每年 1 次", notes: "正常 >26 分，<26 提示輕度認知障礙需進一步檢查。教育程度 ≤12 年加 1 分。憂鬱、睡眠不足、焦慮會影響成績。" },
        ],
      },
      {
        id: "brain-gut-axis",
        name: "前沿研究：腸腦軸",
        name_en: "Gut-Brain Axis Research",
        keyInfo: "腸道微生物可透過迷走神經與代謝物影響大腦功能，90% 血清素由腸道合成",
        marketType: "emerging",
        companies: [
          { id: "probiotics-brain", name: "精神益生菌 (Psychobiotics)", ticker: "特定菌株", country: "SP", role: "特定乳酸桿菌與雙歧桿菌株可改善焦慮與認知功能", marketShare: "觀察性研究", howTo: "選擇有臨床證據的菌株：Lactobacillus helveticus R0052 + Bifidobacterium longum R0175 組合或 B. longum 1714。空腹或睡前服用。", frequency: "每日 10-50 億 CFU，連續 4-8 週", notes: "免疫抑制患者、重症 ICU 患者慎用。冷藏保存以維持菌數活性。效果具菌株特異性，並非所有益生菌都有腦部效益。" },
          { id: "fermented-brain", name: "發酵食品", ticker: "每日攝取", country: "FD", role: "優格、味噌、泡菜等增加腸道菌相多樣性，間接改善腦功能", marketShare: "觀察性研究", howTo: "每日攝取多元發酵食品：無糖優格 1 杯、味噌湯 1 碗、泡菜或酸菜 50g、康普茶 200ml、克菲爾乳。需含活菌（避免高溫滅菌產品）。", frequency: "每日 1-6 份不同來源發酵食品", notes: "高鈉者注意泡菜、味噌的鈉含量。組織胺不耐者可能誘發症狀。康普茶糖分需控制。" },
          { id: "vagus-nerve", name: "迷走神經刺激", ticker: "研究階段", country: "RS", role: "非侵入性迷走神經刺激 (tVNS) 可改善記憶與情緒調節", marketShare: "觀察性研究", howTo: "可透過唱歌、漱口、冷水洗臉、深呼吸等天然方式刺激。商用設備（如 Nurosym、Pulsetto）刺激耳屏迷走神經分支。", frequency: "每日 15-30 分鐘（設備使用者），或日常多次自然刺激", notes: "心律不整、心臟節律器使用者諮詢醫師後使用設備。設備價格不菲（500-1000 美元），效果證據仍在累積中。" },
          { id: "fiber-brain", name: "膳食纖維", ticker: "25-35g/day", country: "FD", role: "短鏈脂肪酸 (SCFAs) 的前驅物質，支持腸腦軸訊號傳遞", marketShare: "多項 RCT", howTo: "多元纖維來源：燕麥、奇亞籽、亞麻籽、豆類、全穀、根莖類、莓果類。逐步增加避免脹氣。每週嘗試 30 種以上植物。", frequency: "男性 35g/day、女性 25g/day", notes: "急性腸躁症（IBS）發作期可能需要短期低 FODMAP。突然增加纖維會脹氣，需配合多飲水（每 10g 纖維+250ml 水）。" },
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
          { id: "ldl-risk", name: "LDL 膽固醇", ticker: "<100mg/dL", country: "BM", role: "動脈粥狀硬化的核心驅動因子，每降低 1 mmol/L 心血管事件降 22%", marketShare: "Meta-analysis", howTo: "標準血脂面板檢測，空腹 9-12 小時。一般目標 <100 mg/dL；有心血管疾病或糖尿病 <70 mg/dL；極高風險 <55 mg/dL。", frequency: "每年 1 次（治療中每 3-6 個月）", notes: "急性疾病或感染期 LDL 會暫時下降，應穩定後檢測。ApoB 比 LDL-C 更準確，建議加做。粒子數比濃度更重要。" },
          { id: "bp-risk", name: "血壓控制", ticker: "<120/80mmHg", country: "BM", role: "高血壓為中風與心衰竭最大風險因子，SPRINT 研究證實積極控制獲益大", marketShare: "Meta-analysis", howTo: "在家用上臂式血壓計（OMRON、Microlife 認證機種），測量前靜坐 5 分鐘，連測 3 次取平均。早晚各測一次。", frequency: "每日早晚測量，記錄 7 天平均值", notes: "白袍高血壓現象普遍，居家血壓更準。手腕式準確度較差。咖啡因、運動後 30 分鐘內血壓會升高應避免測量。" },
          { id: "smoking-risk", name: "戒菸", ticker: "完全戒除", country: "HA", role: "吸菸使心血管疾病風險增加 2-4 倍，戒菸 1 年後風險降一半", marketShare: "Meta-analysis", howTo: "可使用尼古丁替代療法（貼片+口含錠）、處方藥（Varenicline/Champix）或戒菸專線（0800-636363）。設定戒菸日，移除誘因。", frequency: "完全戒除，不可少量偶吸", notes: "電子菸非安全替代品，仍有心血管風險。戒斷症狀 2-4 週最強，3 個月明顯改善。二手菸風險同樣存在，需避免暴露。" },
          { id: "diabetes-risk", name: "血糖管理", ticker: "HbA1c<7%", country: "BM", role: "糖尿病使心血管風險增加 2-4 倍，良好血糖控制顯著降低風險", marketShare: "Meta-analysis", howTo: "至檢驗所或診所抽血檢查 HbA1c，反映過去 3 個月平均血糖。目標：健康者 <5.7%；糖尿病患者 <7%（年長者可放寬至 <8%）。", frequency: "健康者每年 1 次；糖尿病患者每 3-6 個月", notes: "貧血、血紅蛋白變異、慢性腎病者結果可能不準確。空腹血糖+胰島素+HbA1c 整合解讀更佳。" },
          { id: "waist-risk", name: "腰圍 / 內臟脂肪", ticker: "男<90cm/女<80cm", country: "BM", role: "內臟脂肪分泌促炎因子，腹型肥胖為獨立心血管風險因子", marketShare: "Meta-analysis", howTo: "站立放鬆，皮尺繞過肚臍水平線（肋骨下緣與骨盆上緣中點），於正常吐氣末測量。腰臀比（男 <0.9、女 <0.85）也是重要指標。", frequency: "每月 1 次自我追蹤", notes: "亞洲人標準較西方人嚴格（男 <90cm、女 <80cm）。生理期女性可能因水腫偏高。最準確為 DEXA 或 MRI 量內臟脂肪。" },
        ],
      },
      {
        id: "heart-diet",
        name: "心臟保護飲食",
        name_en: "Heart-Healthy Diet",
        keyInfo: "地中海飲食可降低主要心血管事件 30%（PREDIMED 研究，N=7,447）",
        marketType: "monopoly",
        companies: [
          { id: "mediterranean", name: "地中海飲食", ticker: "每日實踐", country: "FD", role: "大量蔬果、橄欖油、堅果、魚類，降低心血管事件與全因死亡率", marketShare: "Meta-analysis", howTo: "以蔬菜、全穀、豆類、堅果、特級初榨橄欖油為基底；每週吃魚 2-3 次；少量紅酒可選；限制紅肉與加工食品。每餐 1/2 蔬果、1/4 全穀、1/4 蛋白質。", frequency: "作為長期飲食模式，非短期計畫", notes: "橄欖油選冷壓初榨並避免高溫烹調（>180°C）。乳糜瀉患者需注意全穀選擇。可少量飲酒但非必須，不飲酒者不需開始。" },
          { id: "dash-diet", name: "DASH 飲食", ticker: "每日實踐", country: "FD", role: "強調蔬果、低脂乳品、全穀物，可降低收縮壓 8-14 mmHg", marketShare: "Meta-analysis", howTo: "每日蔬菜 4-5 份、水果 4-5 份、低脂乳品 2-3 份、全穀 6-8 份、堅果豆類每週 4-5 次。鈉 <2300mg/day（理想 <1500mg）。", frequency: "每日實踐，4 週內可見血壓改善", notes: "腎功能不全者注意鉀攝取（柳橙、香蕉、菠菜）。乳品不耐受者可用無糖植物奶替代。需閱讀加工食品鈉含量標示。" },
          { id: "omega3-fish", name: "富含 Omega-3 魚類", ticker: "2-3份/週", country: "FD", role: "鮭魚、鯖魚等富含 EPA/DHA，降低三酸甘油酯與心律不整風險", marketShare: "Meta-analysis", howTo: "選擇 SMASH 類小型魚（鮭魚 Salmon、鯖魚 Mackerel、鯷魚 Anchovies、沙丁魚 Sardines、鯡魚 Herring）汞含量低。烘烤或清蒸保留 Omega-3。", frequency: "每週 2-3 份，每份約 100-150g", notes: "孕婦、幼兒避免大型掠食魚（鮪魚、旗魚、鯊魚）汞含量高。痛風急性期限制沙丁魚（高普林）。野生捕撈優於養殖。" },
          { id: "nuts-heart", name: "堅果", ticker: "30g/day", country: "FD", role: "每日一把堅果降低心血管死亡率 29%（PREDIMED 研究子分析）", marketShare: "Meta-analysis", howTo: "多元種類：杏仁、核桃、開心果、巴西堅果（含硒）、夏威夷豆。生堅果或低溫烘焙最佳，避免油炸與調味重的產品。", frequency: "每日 30g（約一把，掌心一捧）", notes: "堅果熱量密度高（170-200 大卡/30g），減重者需計算總熱量。堅果過敏者避免。巴西堅果硒含量高，每日 1-2 顆即足。" },
          { id: "fiber-heart", name: "膳食纖維", ticker: "25-35g/day", country: "FD", role: "可溶性纖維降低 LDL 膽固醇，每增加 7g/day 冠心病風險降 9%", marketShare: "Meta-analysis", howTo: "可溶性纖維來源：燕麥（β-葡聚醣）、奇亞籽、亞麻籽、車前子、蘋果、豆類。每日早餐 1 碗燕麥 + 奇亞籽 1 湯匙是好開始。", frequency: "男性 35g/day、女性 25g/day", notes: "突然增加會脹氣腹瀉，每週逐步增加 5g。需配合多飲水。腸阻塞、嚴重 IBS 急性期需限制。" },
        ],
      },
      {
        id: "heart-exercise",
        name: "有氧運動處方",
        name_en: "Aerobic Exercise Prescription",
        keyInfo: "Zone 2 有氧訓練 150 分鐘/週可降低全因死亡率 30%，VO2max 每提升 1 MET 死亡率降 12%",
        marketType: "monopoly",
        companies: [
          { id: "zone2", name: "Zone 2 有氧訓練", ticker: "150-300min/週", country: "EX", role: "維持可對話強度的持續有氧，提升粒線體功能與脂肪氧化能力", marketShare: "Meta-analysis", howTo: "心率維持 60-70% 最大心率（簡式 180-年齡），可用心率錶監測。對話測試：能說完整句子但不能唱歌。快走、慢跑、騎車、划船機皆可。", frequency: "每週 150-300 分鐘，可拆成 3-5 次", notes: "初學者從每次 20 分鐘開始逐步增加。避免進入無氧區間（會喘到無法說話）。高血壓未控制者先諮詢醫師。" },
          { id: "vo2max", name: "VO2max 訓練", ticker: "HIIT 1-2次/週", country: "EX", role: "最大攝氧量是最強的全因死亡預測因子，高 VO2max 組死亡風險降 5 倍", marketShare: "Meta-analysis", howTo: "Norwegian 4x4 模式：暖身 10 分鐘 → 4 分鐘 85-95% 最大心率 + 3 分鐘緩和 × 4 組 → 緩和 5 分鐘。或 30/30 短間歇。", frequency: "每週 1-2 次，需與 Zone 2 訓練分開日子", notes: "心血管疾病、未控制高血壓、近期心臟事件者禁止。需充分暖身降低受傷風險。連續日訓練無法完全恢復。" },
          { id: "walking", name: "每日步行", ticker: "8000-10000步/day", country: "EX", role: "每日 8000 步較 4000 步全因死亡率降低 51%（JAMA 2020）", marketShare: "Meta-analysis", howTo: "用手機或穿戴裝置追蹤步數。可分散：午餐後散步 15 分鐘 + 通勤多走一站 + 晚餐後散步。配速 100 步/分鐘以上效益更佳。", frequency: "每日 8000-10000 步", notes: "步數最低有效閾值約 4400 步，邊際效益遞減至 7500 步。膝關節炎者選擇平坦路面。室外注意空氣品質。" },
          { id: "swimming", name: "游泳", ticker: "2-3次/週", country: "EX", role: "低關節負擔的全身有氧運動，改善血壓與血管彈性", marketShare: "多項 RCT", howTo: "選擇自由式、蛙式或仰式輪替，避免單一姿勢造成肩部不平衡。從每次 20 分鐘開始，逐步延長至 45-60 分鐘。", frequency: "每週 2-3 次，每次 30-45 分鐘", notes: "氯化游泳池對氣喘者可能刺激。耳朵感染史需戴耳塞。心臟病、癲癇者應有人陪同。游泳後注意保暖避免感冒。" },
        ],
      },
      {
        id: "heart-supplements",
        name: "關鍵補充品",
        name_en: "Key Heart Supplements",
        keyInfo: "CoQ10 200-300mg/day 可改善心衰竭患者預後（Q-SYMBIO 研究），Omega-3 4g/day 降低三酸甘油酯 25-30%",
        marketType: "oligopoly",
        companies: [
          { id: "coq10", name: "輔酶 Q10 (CoQ10)", ticker: "200-300mg/day", country: "SP", role: "粒線體能量產生關鍵輔因子，改善心肌功能與降低氧化壓力", marketShare: "多項 RCT", howTo: "選擇 Ubiquinol（還原型）吸收率較佳，特別是 40 歲以上。隨含脂餐服用提升吸收。服用 statin 者尤其建議補充。", frequency: "每日 200-300mg，分 2 次隨餐", notes: "服用 warfarin 者需告知醫師（可能影響抗凝效果）。輕微副作用包括失眠、腸胃不適，避免睡前服用。" },
          { id: "omega3-heart", name: "Omega-3 (EPA/DHA)", ticker: "2-4g/day", country: "SP", role: "高劑量 EPA 可降低心血管事件 25%（REDUCE-IT 研究）", marketShare: "Meta-analysis", howTo: "降三酸甘油酯需高劑量 EPA 為主（如 Vascepa 純 EPA 4g/day）。一般保健可選 EPA/DHA 混合配方 2-3g/day。隨餐服用減少打嗝。", frequency: "每日 2-4g 總 EPA+DHA，分早晚兩次", notes: "高劑量可能增加心房顫動風險（STRENGTH/REDUCE-IT 觀察）。服用抗凝血藥者諮詢醫師。選 IFOS 認證避免重金屬。" },
          { id: "magnesium-heart", name: "鎂 (Magnesium)", ticker: "400mg/day", country: "SP", role: "維持正常心律與血管彈性，缺乏與心律不整及高血壓相關", marketShare: "Meta-analysis", howTo: "選擇甘胺酸鎂、檸檬酸鎂或蘇糖酸鎂吸收率佳。避免氧化鎂（吸收率僅 4%）。睡前服用兼具放鬆助眠效果。", frequency: "每日 400-600mg 元素鎂，睡前或分次", notes: "腎功能不全（eGFR<30）者慎用避免高鎂血症。可能與抗生素（喹諾酮類）、雙磷酸鹽藥物交互作用，間隔 2-4 小時。" },
          { id: "k2d3", name: "維生素 K2 + D3", ticker: "K2:100mcg+D3:2000IU", country: "SP", role: "D3 促進鈣吸收，K2 引導鈣進入骨骼而非沉積於血管壁", marketShare: "多項 RCT", howTo: "選擇 K2 MK-7 形式（半衰期最長）100-200mcg + D3 2000-4000IU 組合產品。隨含脂餐服用以提升脂溶性吸收。", frequency: "每日 1 次隨午餐或晚餐", notes: "服用 warfarin 者禁用（K 拮抗 warfarin）。先檢測 25(OH)D 再決定 D3 劑量。MK-4 形式半衰期短需多次給藥。" },
        ],
      },
      {
        id: "heart-lipid",
        name: "血脂管理",
        name_en: "Lipid Management",
        keyInfo: "ApoB 是比 LDL-C 更準確的心血管風險預測因子，反映致動脈粥狀硬化脂蛋白顆粒總數",
        marketType: "monopoly",
        companies: [
          { id: "statin", name: "他汀類藥物 (Statins)", ticker: "醫師處方", country: "MD", role: "降低 LDL-C 30-50%，心血管事件風險降低 25-35%，最強證據基礎", marketShare: "Meta-analysis", howTo: "由醫師依風險分層處方。常見：Atorvastatin 20-80mg、Rosuvastatin 5-40mg、Simvastatin 10-40mg。睡前或晚間服用（膽固醇合成高峰在夜間）。", frequency: "每日 1 次，長期使用", notes: "肌肉痠痛為常見副作用（5-10%），可換藥或加 CoQ10。需定期監測肝功能、CK 值。與葡萄柚汁有交互作用。糖尿病風險微幅增加但獲益遠大於風險。" },
          { id: "pcsk9", name: "PCSK9 抑制劑", ticker: "醫師處方", country: "MD", role: "可額外降低 LDL-C 50-60%，適用於 statin 不耐受或極高風險患者", marketShare: "多項 RCT", howTo: "醫師處方注射劑：Repatha (Evolocumab) 或 Praluent (Alirocumab)，每 2-4 週皮下注射一次。可自行注射或由護理人員施打。", frequency: "每 2 週或每月 1 次皮下注射", notes: "藥價昂貴（台灣健保有嚴格給付條件，自費月費約 1-2 萬）。常見副作用為注射部位反應。冷藏保存。" },
          { id: "apob-track", name: "ApoB 追蹤", ticker: "<90mg/dL", country: "BM", role: "整合 LDL、VLDL、Lp(a) 顆粒數的單一指標，優於傳統血脂面板", marketShare: "Meta-analysis", howTo: "至診所或健診中心加做 ApoB 項目（健保不給付，自費約 200-500 元）。一般 <90 mg/dL；糖尿病或心血管疾病 <80 mg/dL；極高風險 <65 mg/dL。", frequency: "每年 1 次，治療中每 3-6 個月", notes: "不需空腹（穩定性優於 LDL-C）。比 LDL-C 更能反映致動脈粥狀硬化粒子總數，特別是高三酸甘油酯者。" },
          { id: "plant-sterol", name: "植物固醇", ticker: "2g/day", country: "SP", role: "競爭性抑制膽固醇腸道吸收，可額外降低 LDL 5-15%", marketShare: "Meta-analysis", howTo: "選擇強化植物固醇的人造奶油（如 Benecol）、優格或補充劑。隨主餐服用發揮競爭性抑制作用。可與 statin 併用增強效果。", frequency: "每日 2-3g，分 2-3 次隨餐", notes: "罕見植物固醇血症（sitosterolemia）患者禁用。可能降低脂溶性維生素 (A/D/E/K) 與 β-胡蘿蔔素吸收，建議搭配多元蔬果。" },
        ],
      },
      {
        id: "heart-bp",
        name: "血壓控制",
        name_en: "Blood Pressure Control",
        keyInfo: "DASH 飲食搭配減鈉可在 4 週內降低收縮壓 11 mmHg，效果接近一線降壓藥",
        marketType: "monopoly",
        companies: [
          { id: "sodium-reduction", name: "減鈉攝取", ticker: "<2300mg/day", country: "FD", role: "每減少 1g 鈉攝取可降低收縮壓 2.5 mmHg，鈉敏感型個體效果更大", marketShare: "Meta-analysis", howTo: "閱讀食品標示鈉含量，避免醃漬、加工、罐頭食品。外食選清淡料理，要求少鹽。烹飪用蒜、薑、檸檬、香草替代鹽。", frequency: "每日鈉 <2300mg（理想 <1500mg），約 1 茶匙鹽", notes: "極低鈉飲食（<1500mg）對某些人可能反而升高死亡率（J 曲線爭議）。運動員、低血壓者不需嚴格限鈉。閱讀「鈉」非「鹽」標示（鹽 ≈ 鈉×2.5）。" },
          { id: "potassium", name: "增加鉀攝取", ticker: "3500-4700mg/day", country: "FD", role: "鉀鈉比例比單純減鈉更重要，香蕉、菠菜、酪梨為佳", marketShare: "Meta-analysis", howTo: "高鉀食物：酪梨（975mg）、菠菜煮熟（840mg/杯）、地瓜（540mg）、香蕉（420mg）、白豆、椰子水、橘子。可用低鈉鹽（含氯化鉀）替代鹽。", frequency: "每日 3500-4700mg", notes: "腎功能不全（eGFR<60）者需限制鉀攝取，諮詢醫師。服用 ACEI/ARB、保鉀利尿劑者注意高鉀血症。鉀補充劑需處方。" },
          { id: "dash-bp", name: "DASH 飲食模式", ticker: "每日實踐", country: "FD", role: "蔬果、全穀物、低脂乳品組合，系統性降壓效果最佳", marketShare: "Meta-analysis", howTo: "每日：蔬菜 4-5 份、水果 4-5 份、全穀 6-8 份、低脂乳品 2-3 份、瘦肉 ≤6oz、堅果豆類 4-5 份/週。限制甜食與紅肉。", frequency: "每日實踐，2-4 週可見降壓效果", notes: "效果可達 11mmHg 收縮壓下降（接近單一降壓藥）。糖尿病者注意水果份量。乳品不耐者改無糖植物奶。" },
          { id: "aerobic-bp", name: "有氧運動降壓", ticker: "30min/day", country: "EX", role: "規律有氧運動平均降低血壓 5-8 mmHg，效果持續性佳", marketShare: "Meta-analysis", howTo: "快走、慢跑、騎車、游泳等中等強度運動。等長運動（握力、棒式）每週 3 次也有顯著降壓效果，可作為補充。", frequency: "每週 5 天，每日 30-60 分鐘", notes: "未控制重度高血壓（>180/110）者應先控制再運動。心血管疾病者運動前評估。避免閉氣用力舉重（可能急性升壓）。" },
        ],
      },
      {
        id: "heart-biomarkers",
        name: "心血管生物標記",
        name_en: "Cardiovascular Biomarkers",
        keyInfo: "冠狀動脈鈣化分數 (CAC) 為無症狀個體最強的心血管事件預測因子，CAC=0 的 10 年事件率 <2%",
        marketType: "oligopoly",
        companies: [
          { id: "apob-marker", name: "ApoB", ticker: "<90mg/dL", country: "BM", role: "反映所有致動脈粥狀硬化脂蛋白顆粒數，優於 LDL-C 作為治療目標", marketShare: "Meta-analysis", howTo: "至檢驗所自費加做 ApoB（不需空腹，台灣約 200-500 元）。目標：一般 <90，糖尿病 <80，極高風險 <65 mg/dL。", frequency: "每年 1 次，治療中每 3-6 個月", notes: "ApoB 與 LDL-C 不一致時以 ApoB 為治療目標。高 TG 者尤其建議加做。健保多不給付需自費。" },
          { id: "lpa", name: "Lp(a) 脂蛋白(a)", ticker: "一生測一次", country: "BM", role: "遺傳性心血管風險因子，升高者需更積極控制其他風險因子", marketShare: "Meta-analysis", howTo: "至診所或健診中心自費檢測（台灣約 500-1000 元）。理想 <30 mg/dL，>50 為高風險。基因決定，一生測一次即可。", frequency: "一生 1-2 次（孩童或成年早期）", notes: "目前無有效藥物可降 Lp(a)（pelacarsen 第三期試驗中）。升高者需積極控制其他風險因子。家族成員也應檢測。" },
          { id: "hscrp", name: "hs-CRP 高敏感 C 反應蛋白", ticker: "<1mg/L", country: "BM", role: "反映全身性血管發炎程度，與心血管事件風險獨立相關", marketShare: "Meta-analysis", howTo: "標準血液檢查，至診所或健診中心。<1 低風險、1-3 中風險、>3 高風險。近期感染或受傷會干擾，需穩定 2 週後檢測。", frequency: "每 6-12 個月", notes: "急性感染、近期手術、自體免疫疾病活動期會大幅升高，無法反映慢性發炎。可同時檢測 IL-6 更全面。" },
          { id: "cac-score", name: "冠狀動脈鈣化分數 (CAC)", ticker: "每3-5年", country: "MD", role: "低劑量 CT 量化冠狀動脈鈣化程度，最佳的亞臨床動脈硬化偵測方法", marketShare: "Meta-analysis", howTo: "至放射科或健診中心做心臟低劑量 CT（非顯影劑），約 5-10 分鐘。CAC=0 為最佳（10 年事件率<2%），>100 中度風險，>400 高度風險。", frequency: "40 歲後每 3-5 年（依基線分數）", notes: "輻射劑量約 1mSv（與一年自然背景相當）。台灣自費約 3000-6000 元。CAC=0 不代表無風險（仍可能有軟斑塊）。" },
        ],
      },
      {
        id: "heart-emerging",
        name: "新興療法",
        name_en: "Emerging Heart Therapies",
        keyInfo: "GLP-1 受體促效劑不僅降血糖減重，SELECT 研究證實可降低心血管事件 20%",
        marketType: "emerging",
        companies: [
          { id: "glp1", name: "GLP-1 受體促效劑", ticker: "醫師處方", country: "MD", role: "semaglutide (Ozempic/Wegovy) 降低體重 15%+ 並減少心血管事件", marketShare: "多項 RCT", howTo: "醫師處方注射劑：Ozempic (糖尿病) 或 Wegovy (減重) 每週一次皮下注射。從低劑量 0.25mg 起逐步增量至 2.4mg。Tirzepatide 雙重作用更強。", frequency: "每週 1 次皮下注射", notes: "常見副作用：噁心、便秘、嘔吐（4-12 週適應期）。罕見胰臟炎、膽結石。停藥後容易復胖。台灣自費月費 1-2 萬元。需評估甲狀腺髓樣癌家族史。" },
          { id: "sglt2", name: "SGLT2 抑制劑", ticker: "醫師處方", country: "MD", role: "除降血糖外，顯著降低心衰竭住院率與腎臟惡化風險", marketShare: "多項 RCT", howTo: "醫師處方口服藥：Empagliflozin (Jardiance) 10-25mg、Dapagliflozin (Forxiga) 10mg，每日 1 次晨間服用。心衰竭患者即使無糖尿病也可使用。", frequency: "每日 1 次口服", notes: "增加泌尿生殖道感染風險（需多飲水、注意衛生）。罕見糖尿病酮酸中毒（即使血糖正常）。脫水、低血壓者慎用。健保有給付條件。" },
          { id: "colchicine-cv", name: "低劑量秋水仙素", ticker: "0.5mg/day", country: "MD", role: "抗炎治療新範式，LoDoCo2 研究顯示降低心血管事件 31%", marketShare: "多項 RCT", howTo: "醫師處方 Colchicine 0.5mg 每日 1 次，長期使用。原本用於痛風急性期，低劑量長期可抑制血管慢性發炎。", frequency: "每日 1 次，0.5mg", notes: "腎功能不全（eGFR<30）禁用。與 statin、clarithromycin、cyclosporine 有交互作用增加肌肉毒性。常見腹瀉副作用。" },
          { id: "inclisiran", name: "Inclisiran (siRNA)", ticker: "每6個月注射", country: "MD", role: "長效 PCSK9 siRNA 療法，每年僅需兩次注射即可降低 LDL 50%", marketShare: "多項 RCT", howTo: "醫師處方 Leqvio 皮下注射，第 0、3 個月，之後每 6 個月一次。由醫療人員施打於診所。", frequency: "起始劑量後每 6 個月 1 次", notes: "藥價昂貴（單次注射約美金 3000-6000）。便利性極佳適合依從性差患者。常見副作用為注射部位反應。台灣 2024 年起逐步上市。" },
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
          { id: "fiber-gut", name: "多元膳食纖維", ticker: "30g+/day", country: "FD", role: "不同纖維餵養不同菌種，每週攝取 30 種以上植物性食物可最大化菌相多樣性", marketShare: "Meta-analysis", howTo: "建立植物食物清單追蹤每週多樣性。多元來源：豆類（鷹嘴豆、扁豆）、全穀（燕麥、藜麥）、根莖類、莓果、堅果種子、海藻、香料。", frequency: "每日 30g+ 纖維，每週 30 種以上植物", notes: "突然大量增加會造成脹氣腹瀉，需每週逐步增加 5g。腸阻塞、嚴重 IBS 急性期需暫時低 FODMAP。" },
          { id: "fermented-gut", name: "發酵食品", ticker: "每日多種", country: "FD", role: "優格、泡菜、味噌、康普茶等，Stanford 研究顯示每日 6 份發酵食品可顯著增加菌相多樣性", marketShare: "多項 RCT", howTo: "每日攝取 3-6 份不同種類發酵食品：無糖優格、克菲爾、味噌湯、納豆、泡菜、酸菜、康普茶。需含活菌（避免高溫滅菌、巴氏殺菌產品）。", frequency: "每日 3-6 份不同來源", notes: "需含活菌才有效，超市常溫泡菜多已滅菌。組織胺不耐者可能誘發症狀。康普茶含微量酒精與咖啡因。高血壓者注意鈉含量。" },
          { id: "polyphenol-gut", name: "多酚類食物", ticker: "多元攝取", country: "FD", role: "綠茶、莓果、黑巧克力中的多酚為腸道益菌的燃料，促進有益代謝物生成", marketShare: "多項 RCT", howTo: "每日多元攝取：綠茶 2-3 杯、莓果 1 杯、85% 以上黑巧克力 1-2 方塊、咖啡、特級初榨橄欖油、紅酒（適量）、洋蔥、蘋果。", frequency: "每日多元攝取，目標 >650mg 多酚", notes: "鞣酸可能影響鐵吸收，餐間飲茶較佳。咖啡因敏感者選擇低咖啡因綠茶。黑巧克力含飽和脂肪，每日 20-30g 為限。" },
          { id: "avoid-processed", name: "避免超加工食品", ticker: "盡量減少", country: "FD", role: "人工添加劑與乳化劑可破壞腸道黏膜屏障，降低菌相多樣性", marketShare: "觀察性研究", howTo: "辨識 NOVA 4 類超加工食品：包裝零食、含糖飲料、加工肉品、即食食品。閱讀成分表，>5 種陌生成分或含乳化劑（卡拉膠、polysorbate 80）需警惕。", frequency: "持續性避免，超加工食品 <10% 總熱量", notes: "100% 避免不實際，目標逐步減少。家中常備新鮮食材取代加工食品。讀標籤辨識「真食物」原則。" },
        ],
      },
      {
        id: "gut-probiotics",
        name: "益生菌與益生元",
        name_en: "Probiotics & Prebiotics",
        keyInfo: "益生菌效果具菌株特異性，不同菌株適應不同症狀，需選擇有臨床證據支持的特定菌株",
        marketType: "high_growth",
        companies: [
          { id: "lactobacillus", name: "乳酸桿菌屬", ticker: "10-50B CFU/day", country: "SP", role: "L. rhamnosus GG 用於腹瀉、L. reuteri 用於嬰兒腸絞痛，菌株選擇最關鍵", marketShare: "多項 RCT", howTo: "選擇有臨床證據的特定菌株：L. rhamnosus GG（腹瀉）、L. reuteri DSM 17938（嬰兒）、L. plantarum 299v（IBS）。空腹或餐前服用提高存活率。", frequency: "每日 10-500 億 CFU，連續 4-8 週", notes: "免疫嚴重缺陷、ICU 重症、中心靜脈導管使用者慎用（罕見菌血症風險）。冷藏保存維持活性。抗生素治療期間間隔 2 小時服用。" },
          { id: "bifidobacterium", name: "雙歧桿菌屬", ticker: "10-50B CFU/day", country: "SP", role: "B. longum 與 B. infantis 改善腸躁症症狀，調節免疫功能", marketShare: "多項 RCT", howTo: "選擇 B. longum 35624（Align 品牌，IBS 證據強）或 B. infantis EVC001（嬰兒）。耐酸性較差需腸溶膠囊或餐前服用。", frequency: "每日 10-500 億 CFU，至少 4 週評估效果", notes: "效果具菌株特異性。雙歧桿菌量在抗生素、年齡增長下會大幅減少需特別補充。需冷藏（除穩定化配方外）。" },
          { id: "prebiotic-fiber", name: "益生元纖維", ticker: "5-10g/day", country: "SP", role: "菊糖 (Inulin)、FOS、GOS 等選擇性餵養腸道益菌，促進短鏈脂肪酸產生", marketShare: "多項 RCT", howTo: "從低劑量 2-3g 開始逐漸增加。可加入飲料、優格、燕麥中。食物來源：菊苣、洋蔥、大蒜、蘆筍、未熟香蕉、菊芋。", frequency: "每日 5-10g，分多次", notes: "突然高劑量會嚴重脹氣與腸絞痛（FODMAP 成分）。IBS、SIBO 患者可能誘發症狀。需配合充足水分。" },
          { id: "spore-probiotic", name: "芽孢桿菌", ticker: "依產品建議", country: "SP", role: "Bacillus coagulans/subtilis 耐胃酸能力強，常溫保存穩定性佳", marketShare: "多項 RCT", howTo: "選擇 B. coagulans GBI-30 6086 (GanedenBC30) 或 B. subtilis DE111 等有研究支持菌株。常溫穩定，旅行方便攜帶。", frequency: "依產品標示，通常每日 10-40 億 CFU", notes: "免疫缺陷者諮詢醫師。芽孢結構耐胃酸與抗生素，可與抗生素同時使用。長期使用安全性數據累積中。" },
          { id: "saccharomyces", name: "布拉酵母菌", ticker: "250-500mg/day", country: "SP", role: "Saccharomyces boulardii 預防抗生素相關腹瀉，旅行者腹瀉預防", marketShare: "Meta-analysis", howTo: "Florastor 或 Bioflora 品牌，抗生素治療開始時同時服用，可預防 50% 抗生素相關腹瀉。旅行前 5 天開始預防性服用。", frequency: "每日 250-500mg，分 1-2 次", notes: "屬於酵母菌不受抗生素影響，可與抗生素同時服用。中央靜脈導管、嚴重免疫缺陷者避免（罕見真菌血症報告）。" },
        ],
      },
      {
        id: "gut-digestion",
        name: "消化功能優化",
        name_en: "Digestive Optimization",
        keyInfo: "胃酸 pH 值需低於 3 才能有效消化蛋白質並殺死病原菌，年齡增長胃酸分泌自然下降",
        marketType: "low_growth",
        companies: [
          { id: "hcl-pepsin", name: "甜菜鹼鹽酸 (Betaine HCl)", ticker: "隨餐服用", country: "SP", role: "補充胃酸不足，改善蛋白質消化與礦物質吸收，需排除胃潰瘍", marketShare: "觀察性研究", howTo: "蛋白質含量較高的餐點中段服用，從 1 顆 (650mg) 開始逐次增加直到出現輕微熱感再減 1 顆，即為個人最佳劑量。", frequency: "每餐 1-3 顆（650mg/顆），有肉類餐點", notes: "胃潰瘍、胃食道逆流、服用 NSAIDs 或類固醇者禁用。胃食道有灼熱感應立即停用。長期 PPI 使用者諮詢醫師。" },
          { id: "digestive-enzyme", name: "消化酵素", ticker: "隨餐服用", country: "SP", role: "蛋白酶、脂肪酶、澱粉酶補充，改善餐後脹氣與消化不適", marketShare: "多項 RCT", howTo: "選擇含多種酵素的廣譜配方（包含蛋白酶、脂肪酶、澱粉酶、纖維素酶）。餐前 5-10 分鐘或餐中服用。胰臟功能不全者需處方型（Creon）。", frequency: "每餐 1-2 粒，依餐點豐盛程度", notes: "急性胰臟炎期禁用。長期依賴可能抑制自身酵素分泌（爭議）。應同時找出消化不良的根本原因。" },
          { id: "meal-timing", name: "進食節奏管理", ticker: "細嚼慢嚥", country: "HA", role: "每口咀嚼 20-30 次，餐間隔 4 小時以上允許消化間期清潔波 (MMC) 運作", marketShare: "觀察性研究", howTo: "用餐專心不分心（不滑手機）、每口放下餐具、咀嚼至食物呈泥狀。餐間避免零食讓 MMC 運作清掃腸道。", frequency: "每餐 20 分鐘以上，餐間隔 3-5 小時", notes: "牙齒問題者需先就醫處理。糖尿病低血糖風險者諮詢醫師後調整餐間。配合 16:8 限時進食效果加成。" },
          { id: "apple-cider", name: "蘋果醋", ticker: "1-2湯匙/餐前", country: "FD", role: "稀釋後餐前飲用可刺激胃酸分泌，改善消化與血糖反應", marketShare: "觀察性研究", howTo: "選擇含「醋母」（with the mother）的有機未過濾蘋果醋。1-2 湯匙加 250ml 水，餐前 10-15 分鐘飲用。飲後漱口保護牙齒琺瑯質。", frequency: "每日 1-2 次餐前，每次 1-2 湯匙", notes: "胃潰瘍、胃食道逆流者避免。直接飲用未稀釋可灼傷食道。長期可能腐蝕牙齒琺瑯質。鉀低者慎用（大量可降鉀）。" },
        ],
      },
      {
        id: "gut-leaky",
        name: "腸漏症與慢性發炎",
        name_en: "Leaky Gut & Chronic Inflammation",
        keyInfo: "腸道通透性增加 (腸漏) 與自體免疫疾病、過敏、慢性疲勞等多種慢性病相關",
        marketType: "emerging",
        companies: [
          { id: "l-glutamine", name: "L-麩醯胺酸", ticker: "5-10g/day", country: "SP", role: "腸道上皮細胞的主要能量來源，支持腸黏膜屏障修復", marketShare: "多項 RCT", howTo: "選擇純 L-Glutamine 粉劑（無添加），空腹溶於水中飲用。早晨起床或睡前各 5g。可加入冰沙或蛋白飲。", frequency: "每日 5-15g，分 1-3 次空腹", notes: "肝腎功能不全、雷氏症候群、躁鬱症患者慎用。轉換為麩胺酸可能對部分人造成興奮性神經傳導物質失衡。" },
          { id: "zinc-carnosine", name: "鋅肌肽 (Zinc Carnosine)", ticker: "75mg 2次/day", country: "SP", role: "穩定黏膜層、促進胃腸道傷口癒合，對胃炎與腸漏有修復作用", marketShare: "多項 RCT", howTo: "選擇 PepZin GI 專利配方，餐間空腹服用最佳。日本廣泛使用於胃黏膜保護。配合幽門桿菌治療效果加成。", frequency: "每日 2 次，每次 37.5mg（共 75mg）", notes: "長期高劑量鋅可能抑制銅吸收，建議週期使用 8-12 週。腎功能不全者諮詢醫師。空腹服用可能噁心，可改餐間。" },
          { id: "bone-broth", name: "骨頭湯", ticker: "1-2杯/day", country: "FD", role: "富含膠原蛋白、甘胺酸與礦物質，傳統醫學用於腸道修復", marketShare: "觀察性研究", howTo: "用牛骨、雞骨、魚骨加蘋果醋熬煮 12-24 小時，加蔬菜與香料調味。市售可選有機認證、無 BPA 包裝。", frequency: "每日 1-2 杯（250-500ml）", notes: "痛風急性期慎用（普林含量中等）。家用熬煮注意骨頭來源避免重金屬累積。鈉含量需控制。" },
          { id: "colostrum", name: "牛初乳 (Colostrum)", ticker: "依產品建議", country: "SP", role: "含免疫球蛋白與生長因子，支持腸黏膜屏障與免疫功能", marketShare: "多項 RCT", howTo: "選擇凍乾、低溫處理保留活性成分的牛初乳粉。空腹溶於冷水（避免熱水破壞活性）服用。可選添加 IgG ≥ 20-30% 產品。", frequency: "每日 1-3g 空腹", notes: "對牛奶蛋白過敏者禁用。乳糖不耐者可能不適。腎功能不全者諮詢醫師（高蛋白負擔）。" },
        ],
      },
      {
        id: "gut-biomarkers",
        name: "腸道檢測指標",
        name_en: "Gut Health Biomarkers",
        keyInfo: "糞便微生物組定序可揭示菌相組成與失衡，但結果解讀仍需結合臨床症狀",
        marketType: "oligopoly",
        companies: [
          { id: "stool-test", name: "綜合糞便分析 (CDSA)", ticker: "每年", country: "MD", role: "評估消化功能、發炎指標、寄生蟲與菌群失衡", marketShare: "多項 RCT", howTo: "至功能醫學診所自費檢測（如 GI-MAP、Diagnostic Solutions）。家中採檢後寄送實驗室。包含菌群、發炎、消化、寄生蟲多項指標。", frequency: "症狀者每年 1 次，無症狀每 2-3 年", notes: "台灣自費 1-2 萬元。檢測前 2 週停用益生菌、抗生素、消化酵素以免干擾結果。腹瀉發作期間不適合採檢。" },
          { id: "microbiome-seq", name: "微生物組定序", ticker: "每6-12個月", country: "MD", role: "16S rRNA 或宏基因組定序分析腸道菌相組成與多樣性", marketShare: "觀察性研究", howTo: "可選 Viome、ZOE、Onegevity 等消費級檢測，或自費醫學實驗室。家中採檢糞便寄送，4-6 週收到報告。", frequency: "每 6-12 個月追蹤介入效果", notes: "臨床解讀仍在發展中，結果與個人化建議信度不一。短鏈脂肪酸與多樣性指標較有意義。同一公司不同時間檢測較有比較價值。" },
          { id: "zonulin", name: "Zonulin (連蛋白)", ticker: "血液/糞便", country: "BM", role: "反映腸道通透性的生物標記，升高提示腸漏症可能", marketShare: "觀察性研究", howTo: "至功能醫學診所自費抽血或糞便檢測。血清 zonulin <48 ng/mL 為正常，>60 提示通透性增加。", frequency: "每年或介入後 3-6 個月複測", notes: "現行 ELISA 試劑特異性受質疑（可能交叉反應）。台灣自費約 1500-3000 元。糖尿病、自體免疫疾病、乳糜瀉者可能升高。" },
          { id: "calprotectin", name: "糞便鈣衛蛋白", ticker: "<50 μg/g", country: "BM", role: "腸道發炎的敏感指標，用於區分功能性與器質性腸道疾病", marketShare: "Meta-analysis", howTo: "至醫院消化內科檢測（健保有給付條件），或自費約 1000-2000 元。家中採檢糞便寄送。<50 正常、50-200 灰色帶、>200 顯著發炎。", frequency: "症狀者每 6-12 個月，IBD 治療中每 3 個月", notes: "近期服用 NSAIDs、PPI 可能升高。腸躁症（IBS）正常，發炎性腸病（IBD）顯著升高，是區分兩者的關鍵指標。" },
        ],
      },
      {
        id: "gut-anti-inflammatory",
        name: "抗發炎飲食",
        name_en: "Anti-inflammatory Diet",
        keyInfo: "慢性低度發炎是多數慢性病的共同病理基礎，飲食是調控發炎最有力的日常工具",
        marketType: "monopoly",
        companies: [
          { id: "mediterranean-gut", name: "地中海飲食模式", ticker: "每日實踐", country: "FD", role: "整體飲食模式比單一食物更重要，地中海飲食可顯著降低全身發炎指標", marketShare: "Meta-analysis", howTo: "每餐 1/2 蔬菜、1/4 全穀或豆類、1/4 蛋白質（每週魚 2-3 次、紅肉 ≤1 次）。烹飪用特級初榨橄欖油（每日 2-4 湯匙）。", frequency: "長期飲食模式，每日實踐", notes: "橄欖油選冷壓初榨並避免高溫烹調（>180°C）。低 GI 全穀對糖尿病者較友善。乳糜瀉者注意全穀選擇。" },
          { id: "omega3-anti", name: "Omega-3 脂肪酸", ticker: "2g/day", country: "SP", role: "EPA 與 DHA 競爭性抑制促炎花生四烯酸代謝路徑", marketShare: "Meta-analysis", howTo: "選擇高純度魚油（EPA+DHA 含量 >60%），IFOS 認證確保純度。隨含脂餐服用提升吸收。可同時食用富含 Omega-3 的鮭魚、亞麻籽。", frequency: "每日 2-3g 總 EPA+DHA，分早晚兩次", notes: "服用抗凝血藥諮詢醫師。素食者改用藻油 DHA。打嗝魚腥味可冷藏或選腸溶劑型。氧化的魚油反而促發炎，注意保存期限。" },
          { id: "turmeric-gut", name: "薑黃 (Turmeric)", ticker: "入菜或補充", country: "FD", role: "薑黃素抑制 NF-κB 發炎通路，每日入菜搭配黑胡椒與脂肪提升吸收", marketShare: "多項 RCT", howTo: "烹調時加 1 茶匙薑黃粉配少量黑胡椒（piperine 增吸收 20 倍）與油脂。或選 Meriva/Longvida 高生物利用度補充劑 500-1000mg。", frequency: "每日入菜或補充劑 500-1000mg", notes: "膽結石、抗凝血藥使用者慎用。可能增加鐵螯合降低鐵吸收。腸胃敏感者高劑量可能不適。" },
          { id: "eliminate-processed", name: "排除超加工食品", ticker: "盡量避免", country: "FD", role: "精製糖、氫化油、人工添加劑促進全身性發炎，減少攝取是抗炎基礎", marketShare: "Meta-analysis", howTo: "辨識並避免：含糖飲料、加工肉品（培根、香腸、火腿）、即食食品、人造奶油、含氫化油的烘焙食品。閱讀標籤避免 >5 種陌生成分產品。", frequency: "持續性實踐，超加工食品 <10% 總熱量", notes: "全面戒斷不切實際，目標 80/20 原則。家中常備新鮮食材取代加工。社交場合適度放寬。" },
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
          { id: "resistance-training", name: "阻力訓練", ticker: "2-4次/週", country: "EX", role: "漸進式超負荷是維持與增加肌肉量的最強介入，每週 2-4 次全身或分部位訓練", marketShare: "Meta-analysis", howTo: "每次訓練包含上肢推（伏地挺身/臥推）、上肢拉（划船/引體）、下肢（深蹲/硬舉）、核心動作。每動作 3-4 組×8-12 次，組間休息 60-90 秒。", frequency: "每週 2-4 次，每次 45-60 分鐘", notes: "初學者強烈建議聘請教練學習正確姿勢避免受傷。心血管疾病、未控制高血壓者先評估。漸進式增加負荷而非追求極限。" },
          { id: "progressive-overload", name: "漸進式超負荷", ticker: "持續增加", country: "EX", role: "逐步增加重量、次數或組數，持續挑戰肌肉以刺激適應與生長", marketShare: "Meta-analysis", howTo: "記錄每次訓練重量、次數、組數。每週嘗試在某一指標微幅進步（+2.5kg 或+1 次）。使用 app（Strong、Hevy）追蹤進度。", frequency: "每次訓練都應嘗試微幅進步", notes: "進步遇瓶頸（plateau）是正常的，可調整動作、組數、休息時間。避免在受傷或睡眠不足時硬增重量。" },
          { id: "compound-lifts", name: "多關節複合動作", ticker: "每次訓練", country: "EX", role: "深蹲、硬舉、臥推、划船等同時訓練多肌群，效率最高且功能性最強", marketShare: "Meta-analysis", howTo: "「五大動作」: 深蹲、硬舉、臥推、肩推、划船。每週至少各做 1 次。可先用較輕重量學習正確姿勢，錄影自我檢視。", frequency: "每週每個主要動作 1-2 次", notes: "硬舉與深蹲是傷害風險較高的動作，初學者務必先學姿勢。下背疼痛者改用六角槓硬舉。膝關節問題改用箱式深蹲。" },
          { id: "daily-movement", name: "日常活動量", ticker: "NEAT 最大化", country: "EX", role: "走樓梯、站立辦公等非運動性活動產熱 (NEAT)，累積效果不容忽視", marketShare: "觀察性研究", howTo: "選擇站立或坐站交替工作桌、走樓梯不搭電梯、通勤多走一段、講電話時站立。設置每小時起身動一動的提醒。", frequency: "每日活動量目標 8000-10000 步", notes: "坐站交替桌每 30 分鐘輪替最佳。長時間站立反而傷害腰背，需交替坐姿。" },
        ],
      },
      {
        id: "muscle-protein",
        name: "蛋白質需求",
        name_en: "Protein Requirements",
        keyInfo: "最佳肌肉蛋白合成需每日 1.6-2.2g/kg 蛋白質，每餐達到 2.5g 白胺酸閾值",
        marketType: "monopoly",
        companies: [
          { id: "protein-intake", name: "每日蛋白質攝取", ticker: "1.6-2.2g/kg/day", country: "FD", role: "分散於 3-4 餐攝取，每餐 30-40g 蛋白質以最大化肌肉蛋白合成", marketShare: "Meta-analysis", howTo: "60kg 成人每日約 100-130g 蛋白質，每餐 30-40g。蛋白質來源：雞胸（100g=31g）、魚（100g=25g）、蛋（1 顆=6g）、希臘優格（100g=10g）、豆腐。", frequency: "每餐 30-40g，分 3-4 餐", notes: "腎功能不全（CKD 3 期以上）需限蛋白，諮詢醫師。痛風急性期注意普林來源。素食者需注意完整胺基酸組合（豆+穀）。" },
          { id: "leucine", name: "白胺酸 (Leucine)", ticker: "2.5-3g/餐", country: "FD", role: "mTOR 路徑的關鍵啟動因子，每餐需達到白胺酸閾值才能有效刺激肌肉合成", marketShare: "Meta-analysis", howTo: "每餐達 2.5-3g 白胺酸：30g 乳清蛋白、150g 雞胸、3 顆蛋、200g 希臘優格。植物來源較低需加量或補充 BCAA/HMB。", frequency: "每餐達 2.5-3g 白胺酸閾值", notes: "單獨補充 BCAA 無顯著額外效益（完整蛋白質已足夠）。HMB（白胺酸代謝物）對年長者抗肌肉流失更有效。" },
          { id: "whey-protein", name: "乳清蛋白", ticker: "25-40g/次", country: "SP", role: "吸收快速、白胺酸含量高，訓練後補充的黃金標準", marketShare: "Meta-analysis", howTo: "選擇分離型（WPI 90% 蛋白）或濃縮型（WPC 80% 蛋白）。訓練後 30 分鐘內或正餐間補充。可加冷水或植物奶搖勻。", frequency: "每日 1-2 份，訓練後或正餐間", notes: "乳糖不耐者選分離型（乳糖<1%）或植物蛋白（豌豆、米、大豆）。腎病患者注意總蛋白攝取。檢查重金屬第三方認證（如 Clean Label Project）。" },
          { id: "creatine", name: "肌酸 (Creatine)", ticker: "3-5g/day", country: "SP", role: "研究最透徹的運動補充品，增加肌力 5-10%、肌肉量、且有認知益處", marketShare: "Meta-analysis", howTo: "選擇 Creapure 認證的肌酸一水合物（最有研究、最便宜）。每日 3-5g 溶於水或飲料中，隨時可服用（不需循環）。", frequency: "每日 3-5g，可長期使用", notes: "可能造成體重短期增加 1-2kg（細胞內水分）為正常。腎功能正常者長期安全。某些人有輕微脹氣，可分次服用。不需要負荷期。" },
        ],
      },
      {
        id: "muscle-bone",
        name: "骨質疏鬆預防",
        name_en: "Osteoporosis Prevention",
        keyInfo: "50 歲以上女性 1/3、男性 1/5 將發生骨質疏鬆性骨折，負重運動可增加骨密度 1-3%/年",
        marketType: "monopoly",
        companies: [
          { id: "weight-bearing", name: "負重運動", ticker: "2-3次/週", country: "EX", role: "骨骼需要機械負荷刺激才能維持密度，跑步、跳躍、重訓均有效", marketShare: "Meta-analysis", howTo: "綜合運動：跳躍訓練（跳箱、跳繩、原地跳）每週 2 次 × 50-100 次；重訓（深蹲、硬舉、肩推）每週 2-3 次。游泳、單車衝擊力不足，需補充其他負重。", frequency: "每週 2-3 次負重運動", notes: "已有骨質疏鬆者避免高衝擊跳躍與身體前彎動作（增加椎體骨折風險），改作太極、低衝擊重訓。" },
          { id: "calcium", name: "鈣質", ticker: "1000-1200mg/day", country: "SP", role: "骨骼結構的基本建材，優先從食物攝取（乳品、深綠蔬菜、小魚乾）", marketShare: "Meta-analysis", howTo: "優先食物來源：乳製品（牛奶 250ml=300mg）、無糖優格、起司、小魚乾、芝麻、深綠蔬菜、豆腐。補充劑選擇檸檬酸鈣（隨時可服）或碳酸鈣（隨餐）。", frequency: "每日 1000-1200mg（含食物總量）", notes: "單次劑量 >500mg 吸收率下降需分次服用。補充劑可能增加心血管事件風險（爭議），食物來源較安全。腎結石病史者諮詢醫師。" },
          { id: "vitd-bone", name: "維生素 D3", ticker: "2000-4000IU/day", country: "SP", role: "促進腸道鈣吸收率從 10% 提升至 30%，血清濃度目標 40-60 ng/mL", marketShare: "Meta-analysis", howTo: "選擇 D3（cholecalciferol）形式，與含脂餐服用提升吸收。先檢測 25(OH)D 血清濃度決定劑量。亦可透過每日 15-30 分鐘日曬產生。", frequency: "每日 2000-4000 IU，目標 25(OH)D 40-60 ng/mL", notes: "不可長期未檢測使用 >10000IU/day（可能高鈣血症）。建議搭配 K2 防止鈣異位沉積。年長者、深膚色、肥胖者需求較高。" },
          { id: "vitk2-bone", name: "維生素 K2 (MK-7)", ticker: "100-200mcg/day", country: "SP", role: "活化骨鈣素引導鈣進入骨骼，搭配 D3 使用效果更佳", marketShare: "多項 RCT", howTo: "選擇 MK-7 形式（半衰期最長），隨含脂餐服用。可選擇 MK-7 + D3 + Ca 三合一複方。食物來源：納豆（含量最高）、起司、蛋黃。", frequency: "每日 100-200mcg，可長期", notes: "服用 warfarin（香豆素類抗凝血藥）者禁用（K 拮抗 warfarin 作用）。MK-4 半衰期短不建議單獨使用。" },
        ],
      },
      {
        id: "muscle-joint",
        name: "關節保養",
        name_en: "Joint Health",
        keyInfo: "膠原蛋白補充品 10g/day 可改善關節疼痛與活動功能（24 週 RCT），搭配維生素 C 促進合成",
        marketType: "oligopoly",
        companies: [
          { id: "collagen-joint", name: "膠原蛋白肽", ticker: "10-15g/day", country: "SP", role: "II 型膠原蛋白保護軟骨，I/III 型支持肌腱韌帶，運動前 60 分鐘搭配 C 攝取效果最佳", marketShare: "多項 RCT", howTo: "選擇水解膠原蛋白肽（分子量 2-5 kDa），運動前 60 分鐘配合 50mg 維生素 C 服用。可加入咖啡、果汁、優格。", frequency: "每日 10-15g，運動前 60 分鐘", notes: "對牛、魚過敏者注意來源。腎功能不全者諮詢醫師（高蛋白）。便宜純度低產品可能含重金屬，選擇有第三方認證品牌。" },
          { id: "glucosamine", name: "葡萄糖胺", ticker: "1500mg/day", country: "SP", role: "關節軟骨基質的組成成分，長期使用可減緩關節空間狹窄進程", marketShare: "多項 RCT", howTo: "選擇葡萄糖胺硫酸鹽（非鹽酸鹽）形式，每日 1500mg 分 2-3 次隨餐服用。常與軟骨素（chondroitin）合用效果更佳。連續服用 3-6 個月評估效果。", frequency: "每日 1500mg，分 2-3 次", notes: "貝類過敏者選非貝類來源。可能影響血糖控制，糖尿病患者注意。與 warfarin 可能交互作用增加 INR。" },
          { id: "mobility-work", name: "關節活動度訓練", ticker: "每日 10-15min", country: "EX", role: "控制性關節全範圍活動訓練 (CARs)，維持關節活動範圍與滑液分泌", marketShare: "觀察性研究", howTo: "練習 CARs（Controlled Articular Rotations）：每個關節（肩、髖、脊椎）緩慢全範圍旋轉 2-3 圈。可參考 FRC（Functional Range Conditioning）系統。", frequency: "每日 10-15 分鐘，可作為晨間例行", notes: "已有關節傷害者先諮詢物理治療師。緩慢控制動作不彈震。" },
          { id: "omega3-joint", name: "Omega-3", ticker: "2-3g/day", country: "SP", role: "EPA/DHA 降低關節發炎因子 (IL-6, TNF-α)，改善類風濕性關節炎症狀", marketShare: "Meta-analysis", howTo: "選擇高濃度魚油（EPA+DHA >60%），隨含脂餐服用。類風濕性關節炎需高劑量 2-4g/day 連續 12 週才見效。", frequency: "每日 2-3g EPA+DHA，分早晚兩次", notes: "服用抗凝血藥諮詢醫師。手術前 2 週停用。素食者選藻油 DHA。氧化魚油反而促發炎，注意保存與品牌。" },
        ],
      },
      {
        id: "muscle-flexibility",
        name: "柔軟度與活動度",
        name_en: "Flexibility & Mobility",
        keyInfo: "隨年齡增長，肌筋膜組織硬化使活動範圍每十年減少 10%，規律伸展可延緩退化",
        marketType: "low_growth",
        companies: [
          { id: "stretching", name: "靜態伸展", ticker: "每日 10-15min", country: "EX", role: "訓練後或睡前進行，每個肌群保持 30-60 秒，改善柔軟度與恢復", marketShare: "Meta-analysis", howTo: "肌肉溫熱時伸展效果最佳（運動後或熱水澡後）。每個動作維持 30-60 秒，達到緊繃感但無疼痛。深呼吸幫助放鬆。", frequency: "每日 10-15 分鐘，重點區域可每日多次", notes: "運動前避免長時間靜態伸展（可能短暫降低肌力 5-15%），改用動態暖身。急性受傷部位禁伸展。" },
          { id: "yoga", name: "瑜伽", ticker: "2-3次/週", country: "EX", role: "整合柔軟度、力量與平衡訓練，改善身體覺察與壓力管理", marketShare: "多項 RCT", howTo: "初學者選哈達瑜伽（Hatha）或陰瑜伽（Yin），進階可嘗試流瑜伽（Vinyasa）或阿斯坦加（Ashtanga）。可使用 Down Dog、Glo、YouTube 影片入門。", frequency: "每週 2-3 次，每次 30-60 分鐘", notes: "未受訓教練的高溫瑜伽（Bikram）對心血管壓力大需謹慎。孕婦、椎間盤突出、骨質疏鬆者選擇專門課程。" },
          { id: "foam-rolling", name: "泡棉滾筒 / 筋膜放鬆", ticker: "訓練前後", country: "EX", role: "自我筋膜放鬆可短期增加關節活動度 10-20%，降低訓練後延遲性肌肉痠痛", marketShare: "多項 RCT", howTo: "選擇中等密度滾筒（高密度太刺激、低密度效果不足）。每個區域慢速滾動 30-60 秒，遇緊繃點停留 15-30 秒。配合深呼吸放鬆。", frequency: "訓練前後或每日 5-10 分鐘", notes: "急性受傷、開放性傷口、深靜脈血栓、骨質疏鬆者禁用。直接滾過下背、頸椎、膝蓋骨可能造成傷害。" },
        ],
      },
      {
        id: "muscle-recovery",
        name: "運動恢復",
        name_en: "Exercise Recovery",
        keyInfo: "運動後 24-72 小時內肌肉蛋白合成持續升高，充足睡眠與營養是恢復的核心",
        marketType: "oligopoly",
        companies: [
          { id: "sleep-recovery", name: "充足睡眠", ticker: "7-9小時/夜", country: "HA", role: "生長激素 70% 在深層睡眠期間分泌，睡眠不足使肌肉恢復速度降低 60%", marketShare: "Meta-analysis", howTo: "固定就寢與起床時間，營造暗冷靜環境（18-19°C、全暗、安靜）。訓練日睡眠需求增加 30-60 分鐘。使用 Oura、WHOOP 等追蹤。", frequency: "每夜 7-9 小時，固定時間", notes: "睡眠呼吸中止症會嚴重影響恢復，鼾聲大、白天嗜睡者應做睡眠檢查（PSG）。咖啡因午後避免。" },
          { id: "creatine-recovery", name: "肌酸 (Creatine)", ticker: "3-5g/day", country: "SP", role: "加速 ATP 再合成，減少訓練後肌肉損傷指標 (CK)，長期每日補充最有效", marketShare: "Meta-analysis", howTo: "Creapure 認證的肌酸一水合物每日 3-5g 溶於水或飲料。隨時可服用不需循環。長期使用效果最佳。", frequency: "每日 3-5g，長期", notes: "可能短期增加體重 1-2kg（細胞內水）為正常。腎功能正常者長期安全。配合阻力訓練效果最大。" },
          { id: "magnesium-recovery", name: "鎂 (Magnesium)", ticker: "400-600mg/day", country: "SP", role: "參與 300+ 種酶反應，缺乏導致肌肉痙攣、恢復變慢，睡前服用甘胺酸鎂效果佳", marketShare: "多項 RCT", howTo: "選擇甘胺酸鎂（吸收佳+助眠）或檸檬酸鎂。睡前 30 分鐘 200-400mg，運動員可分次補充。避免氧化鎂（吸收率僅 4%）。", frequency: "每日 400-600mg 元素鎂，睡前服用", notes: "腎功能不全慎用。可能與抗生素、雙磷酸鹽藥物交互作用，需間隔 2-4 小時。腹瀉者降低劑量或改甘胺酸形式。" },
          { id: "cold-exposure", name: "冷暴露 / 冰浴", ticker: "11min/週 累計", country: "HA", role: "降低訓練後發炎指標，但避免在肌肥大訓練後立即冷療（可能抑制 mTOR）", marketShare: "多項 RCT", howTo: "10-15°C 冷水浸泡 2-4 分鐘，每週累計 11 分鐘（Andrew Huberman 建議）。可從冷水淋浴開始耐受訓練。", frequency: "每週 2-4 次，累計 11 分鐘", notes: "肌肥大訓練後 4-6 小時內避免冷療（抑制肌肉合成）。心血管疾病、雷諾氏症、孕婦先諮詢醫師。從短時間開始。" },
        ],
      },
      {
        id: "muscle-metrics",
        name: "關鍵指標追蹤",
        name_en: "Key Musculoskeletal Metrics",
        keyInfo: "握力是全因死亡率的獨立預測因子，握力每下降 5kg 死亡風險增加 17%（Lancet 2015, N=140,000）",
        marketType: "oligopoly",
        companies: [
          { id: "dexa", name: "DEXA 骨密度掃描", ticker: "每1-2年", country: "MD", role: "同時測量骨密度與身體組成（肌肉量/脂肪量），肌少症與骨質疏鬆診斷金標準", marketShare: "Meta-analysis", howTo: "至醫院骨科、家醫科或自費健診中心預約。T-score: >-1 正常、-1 至 -2.5 骨質減少、< -2.5 骨質疏鬆。可同時加做身體組成分析。", frequency: "停經後女性、65 歲以上男性每 1-2 年；高風險者每年", notes: "輻射量極低（<0.01 mSv）。台灣健保有給付條件，自費約 1000-3000 元。檢測前移除金屬物品。" },
          { id: "grip-strength", name: "握力測試", ticker: "定期追蹤", country: "BM", role: "全身肌力的代理指標，男性 <26kg、女性 <18kg 提示肌少症風險", marketShare: "Meta-analysis", howTo: "購買居家用握力器（CAMRY、Jamar 等品牌，約 500-2000 元）。慣用手測 3 次取最大值。家醫科或老人健檢可量測。", frequency: "每年 1 次，運動介入者每 3 個月", notes: "肩肘關節疼痛者結果不準確。台灣健康標準：男 ≥28kg、女 ≥18kg。可加做小腿圍（男 ≥34cm、女 ≥33cm）。" },
          { id: "walking-speed", name: "步行速度", ticker: ">1.0 m/s", country: "BM", role: "4 公尺步行速度 <0.8 m/s 為肌少症診斷標準之一，與跌倒和死亡風險相關", marketShare: "Meta-analysis", howTo: "在平坦路面標記 4 公尺起終點，正常速度走完並計時。或測量 6 分鐘步行距離（>500m 為佳）。", frequency: "每年 1 次或每次健檢", notes: "需穿平底鞋。下肢疼痛或關節炎發作期間結果不準。失能者改用其他評估方式（如坐站測試）。" },
          { id: "sit-stand", name: "坐站測試", ticker: "5次<12秒", country: "BM", role: "評估下肢肌力與功能，5 次坐站時間 >15 秒提示功能性衰退", marketShare: "多項 RCT", howTo: "標準直背椅（座高約 46cm），雙手抱胸或交叉於胸前，無扶手協助。從坐姿快速站起再坐下，連續 5 次計時。", frequency: "每年 1 次", notes: "<60 歲標準 <10 秒，>60 歲標準 <12 秒。膝關節疼痛或近期手術者勿勉強。可結合 SPPB 短期身體表現量表。" },
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
          { id: "morning-light", name: "晨間陽光暴露", ticker: "起床後30min內", country: "HA", role: "10-30 分鐘戶外陽光刺激視交叉上核 (SCN)，校準中央生理時鐘", marketShare: "Meta-analysis", howTo: "起床後 30-60 分鐘內外出 10-30 分鐘（陰天 20 分鐘、晴天 10 分鐘）。可結合早晨散步或戶外早餐。不需直視太陽，戶外亮度即足。", frequency: "每日早晨 10-30 分鐘", notes: "隔窗陽光效果差（玻璃濾掉大部分紫外線）。冬季或日照不足地區可用 10000 lux 光照盒。墨鏡會降低效果。" },
          { id: "consistent-schedule", name: "固定作息時間", ticker: "±30min", country: "HA", role: "即使週末也保持一致的睡覺與起床時間，社交時差每增加 1 小時死亡風險增 11%", marketShare: "Meta-analysis", howTo: "設定固定起床鬧鐘，連週末也只放寬 30-60 分鐘。睡前 1 小時開始放鬆例行（reading/stretching/meditation）。", frequency: "每日±30 分鐘範圍內", notes: "輪班工作者難以遵守，可使用淺色眼罩、耳塞、白噪音輔助。時差調整以光線控制最有效。" },
          { id: "blue-light-block", name: "夜間藍光阻隔", ticker: "睡前2-3小時", country: "HA", role: "藍光 (450-490nm) 抑制褪黑激素分泌達 50%，使用藍光眼鏡或夜間模式", marketShare: "多項 RCT", howTo: "睡前 2-3 小時開啟手機、電腦的夜間模式（warm/night shift）。或配戴紅色濾光眼鏡（Ra Optics、Swanwick 等品牌）。", frequency: "每日睡前 2-3 小時", notes: "便宜「藍光眼鏡」多數效果有限，需檢查阻擋 450-490nm 比例。室內燈光也含藍光，最好同時調暗或換暖色 LED。" },
          { id: "evening-dim", name: "傍晚光線調暗", ticker: "日落後", country: "HA", role: "日落後切換為暖光照明，模擬自然光週期，幫助身體準備入睡", marketShare: "觀察性研究", howTo: "家中安裝可調光智能燈（Hue、IKEA Trådfri）。日落後切換為 2700K 以下暖白光，亮度降至最低。睡前最後一小時使用紅光或燭光。", frequency: "日落後到就寢", notes: "頂燈光線過強，多用桌燈或地燈降低直視亮度。冰箱、家電 LED 指示燈累積也會影響，可貼遮光貼紙。" },
        ],
      },
      {
        id: "sleep-hygiene",
        name: "睡眠衛生實踐",
        name_en: "Sleep Hygiene Practices",
        keyInfo: "臥室溫度 18-19°C 為深層睡眠最佳溫度，核心體溫下降 1-1.5°C 是入睡的必要條件",
        marketType: "monopoly",
        companies: [
          { id: "dark-room", name: "全暗臥室", ticker: "每夜", country: "HA", role: "即使微弱光線也會抑制褪黑激素分泌，使用遮光窗簾確保完全黑暗", marketShare: "Meta-analysis", howTo: "安裝遮光窗簾（blackout curtains）、移除所有 LED 指示燈、戴遮光眼罩。檢查標準：完全黑暗看不見自己的手。", frequency: "每夜全程", notes: "夜起需要照明可用紅光或低色溫地燈（避免白光開啟）。城市光害嚴重區域眼罩+遮光簾雙重保險。" },
          { id: "cool-temp", name: "涼爽室溫", ticker: "18-19°C", country: "HA", role: "核心體溫下降觸發入睡機制，較涼環境促進深層睡眠比例", marketShare: "多項 RCT", howTo: "臥室溫度設定 18-20°C。夏季冷氣定時 6-8 小時、冬季減少厚被。可使用 ChiliPad、Eight Sleep 等智能床墊調溫。", frequency: "每夜", notes: "個人最適溫度有差異，年長者可能偏好稍暖（20-21°C）。睡前 1-2 小時溫水浴促進散熱有助入睡。" },
          { id: "no-screen", name: "睡前無螢幕時間", ticker: "睡前1小時", country: "HA", role: "螢幕藍光與刺激性內容雙重干擾入睡，改為閱讀或冥想", marketShare: "多項 RCT", howTo: "睡前 1 小時把手機放在臥室外或開啟「勿擾模式」。改為紙本閱讀、紙質日記、深呼吸、伸展。避免新聞、社群媒體。", frequency: "每日睡前 1-2 小時", notes: "若必須使用，啟動黑白螢幕模式、夜間模式、降低亮度。電子閱讀器選 Kindle（電子墨水無背光）較佳。" },
          { id: "caffeine-cutoff", name: "咖啡因截止時間", ticker: "午後2點前", country: "HA", role: "咖啡因半衰期 5-7 小時，下午攝取可減少深層睡眠 20%（睡眠研究期刊）", marketShare: "多項 RCT", howTo: "最後一杯咖啡 / 茶 / 含咖啡因飲料於起床後 8-10 小時內飲用（多數人約下午 2 點前）。下午改喝無咖啡因飲料或花草茶。", frequency: "每日下午 2 點前", notes: "個體差異大（慢代謝者需更早停止）。巧克力、能量飲料、止痛藥（含咖啡因）也計入。咖啡因敏感者建議下午完全避免。" },
          { id: "alcohol-avoid", name: "避免睡前飲酒", ticker: "睡前3小時", country: "HA", role: "酒精雖助入睡但嚴重破壞 REM 睡眠與睡眠連續性，即使少量也有影響", marketShare: "Meta-analysis", howTo: "完全避免或睡前 3-4 小時前完成飲酒。改用無酒精飲料替代社交場合需求（mocktails、康普茶、氣泡水）。", frequency: "睡前 3 小時內完全避免", notes: "睡眠監測（Oura、WHOOP）可清楚看到飲酒後 HRV 與 REM 下降。即使少量（1 杯）也影響睡眠質。" },
        ],
      },
      {
        id: "sleep-deep",
        name: "深層睡眠優化",
        name_en: "Deep Sleep Optimization",
        keyInfo: "深層睡眠 (N3) 佔總睡眠 15-25%，是記憶鞏固、生長激素分泌與代謝廢物清除的關鍵階段",
        marketType: "oligopoly",
        companies: [
          { id: "exercise-timing", name: "運動時機優化", ticker: "睡前4-6小時", country: "EX", role: "規律運動增加深層睡眠 75%，但睡前 2 小時內高強度運動可能干擾入睡", marketShare: "Meta-analysis", howTo: "高強度運動安排在早上或下午（睡前 4-6 小時前完成）。晚間可做輕度伸展、瑜伽、散步。", frequency: "每週 4-5 次運動", notes: "個體差異大，有些人晚間運動不影響睡眠。可用睡眠追蹤裝置觀察自己的反應。" },
          { id: "mag-glycinate", name: "甘胺酸鎂", ticker: "200-400mg/睡前", country: "SP", role: "甘胺酸鎂形式吸收率高且具鎮靜作用，同時補充鎂與甘胺酸", marketShare: "多項 RCT", howTo: "選擇純甘胺酸鎂（Magnesium Glycinate/Bisglycinate）形式，睡前 30-60 分鐘服用 200-400mg 元素鎂。可加入 L-茶胺酸或甘胺酸增效。", frequency: "每日睡前 200-400mg 元素鎂", notes: "腎功能不全慎用。可能與抗生素（喹諾酮類）交互作用需間隔 2-4 小時。腹瀉者降低劑量。" },
          { id: "ashwagandha-sleep", name: "南非醉茄 (Ashwagandha)", ticker: "300-600mg/day", country: "SP", role: "降低皮質醇 28%（RCT），改善睡眠品質與入睡時間，KSM-66 萃取物證據最佳", marketShare: "多項 RCT", howTo: "選擇 KSM-66 或 Sensoril 標準化萃取物，每日 300-600mg 分早晚或睡前 1 小時服用。連續服用 4-8 週評估效果。", frequency: "每日 300-600mg，分 1-2 次", notes: "甲狀腺亢進、自體免疫疾病、孕婦、哺乳期避免。可能與鎮靜劑、甲狀腺藥物交互作用。長期使用建議週期 8-12 週後停 2-4 週。" },
          { id: "sauna-sleep", name: "桑拿浴", ticker: "睡前1-2小時", country: "HA", role: "升高核心體溫後的散熱效應加速入睡，芬蘭研究顯示規律桑拿改善深層睡眠", marketShare: "多項 RCT", howTo: "傳統桑拿 80-90°C 15-20 分鐘，或紅外線桑拿 60°C 30-45 分鐘。睡前 1-2 小時進行，結束後溫水沖洗放鬆。", frequency: "每週 2-4 次，每次 15-20 分鐘", notes: "心血管疾病、未控制高血壓、孕婦先諮詢醫師。每次補充 500-750ml 水+電解質。從短時間開始耐受訓練。" },
        ],
      },
      {
        id: "sleep-rem",
        name: "REM 睡眠與夢境",
        name_en: "REM Sleep & Dreams",
        keyInfo: "REM 睡眠佔總睡眠 20-25%，負責情緒處理與創造性問題解決，後半夜 REM 比例最高",
        marketType: "emerging",
        companies: [
          { id: "alcohol-rem", name: "避免酒精", ticker: "完全避免或限量", country: "HA", role: "即使一杯酒也可減少 REM 睡眠 20-30%，是 REM 最大的日常破壞因子", marketShare: "Meta-analysis", howTo: "完全戒除或每週 ≤7 個 standard drinks（女）/14（男）。社交場合改用 mocktails、氣泡水、無酒精啤酒。", frequency: "完全避免或限量飲用", notes: "用睡眠裝置可清楚看到飲酒後 HRV 與 REM 下降。即使中午小酌也可能影響當晚睡眠。" },
          { id: "sleep-duration", name: "充足睡眠時長", ticker: "7-9小時", country: "HA", role: "REM 在後半夜比例增加，睡眠不足 7 小時將大幅犧牲 REM 時間", marketShare: "Meta-analysis", howTo: "倒推就寢時間：需起床時間 - 8 小時 - 30 分鐘入睡時間 = 上床時間。確保有 8 小時躺床時間以獲得 7.5 小時睡眠。", frequency: "每夜 7-9 小時", notes: "晚睡早起會優先犧牲後半夜的 REM 期。週末補眠效果有限，平日累積睡眠債難以彌補。" },
          { id: "antidepressant-rem", name: "藥物影響監測", ticker: "諮詢醫師", country: "RS", role: "多數抗憂鬱藥物 (SSRIs) 會抑制 REM 睡眠，需與醫師討論替代方案", marketShare: "多項 RCT", howTo: "服藥期間追蹤睡眠品質（裝置或日記）。與醫師討論藥物選擇，bupropion、agomelatine 對 REM 影響較小。", frequency: "與精神科醫師定期評估（每 3-6 個月）", notes: "切勿自行停藥（突然停 SSRI 會反彈性 REM 增加與惡夢）。減藥需在醫師指導下緩慢進行。" },
          { id: "stress-rem", name: "睡前壓力管理", ticker: "每晚", country: "HA", role: "高皮質醇打斷 REM 循環，睡前冥想或日記寫作可降低心理反芻", marketShare: "觀察性研究", howTo: "睡前 30 分鐘進行：感恩日記（3 件當日好事）、寫下隔日待辦清單清空思緒、5-10 分鐘冥想或呼吸練習。", frequency: "每晚睡前 15-30 分鐘", notes: "床上反覆思考無法入睡時，起身到另一空間做安靜活動 20 分鐘再回床，避免大腦將床與失眠連結。" },
        ],
      },
      {
        id: "sleep-supplements",
        name: "助眠補充品",
        name_en: "Sleep Supplements",
        keyInfo: "褪黑激素 0.3-1mg 低劑量即有效，高劑量反而可能導致隔日嗜睡與受體下調",
        marketType: "high_growth",
        companies: [
          { id: "melatonin", name: "褪黑激素 (Melatonin)", ticker: "0.3-1mg/睡前", country: "SP", role: "校準晝夜節律的定時信號，低劑量效果最佳，適合時差或輪班工作者", marketShare: "Meta-analysis", howTo: "睡前 30-60 分鐘服用低劑量 0.3-1mg（市售產品多偏高 3-10mg 不必要）。延緩型釋放（time-release）較適合睡眠中段醒來者。", frequency: "睡前 30-60 分鐘，低劑量為主", notes: "台灣為處方藥需醫師開立。長期使用安全性數據累積中。高劑量可能造成隔日嗜睡、頭痛、惡夢。孕婦、自體免疫疾病者避免。" },
          { id: "l-theanine-sleep", name: "L-茶胺酸", ticker: "200-400mg/睡前", country: "SP", role: "促進 alpha 腦波、降低焦慮，不引起嗜睡但改善入睡品質", marketShare: "多項 RCT", howTo: "選擇 Suntheanine 專利純度 L-isomer，睡前 30-60 分鐘服用 200-400mg。也可日間焦慮時服用 100-200mg 不影響清醒。", frequency: "睡前 200-400mg，或焦慮時", notes: "幾乎無副作用與依賴性。服用降血壓藥者可能加成降壓效果。可長期使用。" },
          { id: "glycine-sleep", name: "甘胺酸 (Glycine)", ticker: "3g/睡前", country: "SP", role: "降低核心體溫促進入睡，改善隔日精神狀態而非延長睡眠時間", marketShare: "多項 RCT", howTo: "睡前 30-60 分鐘服用 3g 純甘胺酸粉劑（甜味、可加水飲用）。日本研究顯示改善隔日清醒度。", frequency: "睡前 3g", notes: "服用 clozapine（精神藥物）者避免使用。雷氏症候群、肝病嚴重者慎用。整體安全性高，副作用罕見。" },
          { id: "apigenin", name: "芹菜素 (Apigenin)", ticker: "50mg/睡前", country: "SP", role: "洋甘菊活性成分，溫和 GABA 受體調節，輕度鎮靜助眠", marketShare: "觀察性研究", howTo: "睡前 30-60 分鐘服用 50mg 純化 apigenin 補充劑（Andrew Huberman 推薦）。也可飲用洋甘菊茶（含量較低但溫和）。", frequency: "睡前 50mg", notes: "可能與抗凝血藥、鎮靜劑交互作用。激素敏感性癌症（乳癌）者避免（弱植物雌激素活性）。" },
        ],
      },
      {
        id: "sleep-tracking",
        name: "睡眠監測技術",
        name_en: "Sleep Tracking Technology",
        keyInfo: "消費級穿戴裝置偵測睡眠階段準確度約 70-80%，追蹤趨勢比絕對數值更有意義",
        marketType: "high_growth",
        companies: [
          { id: "oura", name: "Oura Ring", ticker: "戒指型", country: "MD", role: "睡眠追蹤準確度業界領先，監測心率變異性、體溫與血氧", marketShare: "觀察性研究", howTo: "選擇適合手指尺寸（Gen 4 約 12000-18000 台幣），需訂閱 app（$5.99/月）獲完整數據。戴於食指或中指。", frequency: "全天候配戴，4-6 週建立基線", notes: "電池續航 4-7 天。淋浴、運動可戴但長期接觸化學品（消毒劑）會損傷塗層。睡眠分期準確度約 70-80%。" },
          { id: "apple-watch-sleep", name: "Apple Watch", ticker: "手錶型", country: "MD", role: "整合睡眠呼吸暫停偵測、血氧與心率追蹤，生態系最完整", marketShare: "觀察性研究", howTo: "Apple Watch Series 9 以上或 Ultra 系列支援完整睡眠追蹤。睡覺時配戴並啟用「專注模式 > 睡眠」。可加裝織布或皮錶帶較舒適。", frequency: "每夜配戴", notes: "需每日充電（建議晨間沖澡時充）。手錶體積較大可能影響側睡舒適。需要 iPhone 配對使用。" },
          { id: "whoop", name: "WHOOP", ticker: "手環型", country: "MD", role: "專注恢復與睡眠指標，提供每日睡眠需求預測與恢復評分", marketShare: "觀察性研究", howTo: "訂閱制硬體（裝置免費，年費約 7000-9000 台幣）。無螢幕專注數據。穿戴電池 4-5 天，配戴電池夾可不取下充電。", frequency: "全天候配戴", notes: "需要訂閱才能使用。HRV 與睡眠評估準確度受好評，但無法顯示時間需配合手機 app。" },
          { id: "psg", name: "多導睡眠檢測 (PSG)", ticker: "醫師建議時", country: "MD", role: "睡眠醫學金標準，診斷睡眠呼吸中止症、猝睡症等睡眠障礙", marketShare: "Meta-analysis", howTo: "至醫院睡眠中心（如台大、長庚、榮總）預約。需在醫院過夜進行 8-10 小時監測，貼附多項感測器。", frequency: "懷疑睡眠障礙時 1 次，治療追蹤每年", notes: "健保有給付條件（需先看睡眠門診評估）。自費約 1-2 萬。打鼾大、白天嗜睡、停止呼吸者必做。家用簡易版（HSAT）也可篩檢。" },
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
          { id: "mediterranean-longevity", name: "地中海飲食", ticker: "每日實踐", country: "FD", role: "全球證據最充分的健康飲食模式，降低全因死亡率 25%，心血管事件 30%", marketShare: "Meta-analysis", howTo: "每餐 1/2 蔬果、1/4 全穀豆類、1/4 蛋白質（魚 2-3 次/週、紅肉 ≤1 次/週）。每日特級初榨橄欖油 2-4 湯匙、堅果一把、適量乳製品。", frequency: "每日實踐，長期生活模式", notes: "橄欖油需冷壓初榨並避免高溫烹調。乳糜瀉者需注意全穀選擇。可少量飲酒但非必須。" },
          { id: "blue-zone", name: "藍色地帶飲食", ticker: "生活模式", country: "FD", role: "沖繩、薩丁尼亞、伊卡利亞等長壽區域共同飲食特徵：全食物、少肉、多豆類", marketShare: "觀察性研究", howTo: "「Power 9」原則：植物為主（95%）、每日豆類 1 杯、堅果一把、適量飲酒（紅酒）、八分飽、家人優先、社群歸屬感、有目的感。", frequency: "整體生活模式，每日實踐", notes: "飲食只是長壽密碼之一，社交、運動、目的感同等重要。並非禁肉，是少肉（每月 5 次以下）。" },
          { id: "okinawan", name: "沖繩飲食", ticker: "每日實踐", country: "FD", role: "「腹八分」八分飽原則，紫薯、豆腐、苦瓜、海藻為主食，低熱量高營養密度", marketShare: "觀察性研究", howTo: "主食以紫薯（含花青素）取代白米、每日豆腐或味噌、海藻 (昆布、紫菜)、苦瓜、薑黃、綠茶。用小碗減少份量。", frequency: "每日實踐，腹八分飽", notes: "現代沖繩年輕世代飲食已西化，平均壽命下降。傳統飲食才有長壽效益。腎臟病者注意豆類普林與鉀。" },
          { id: "plant-rich", name: "植物為主飲食", ticker: "每日實踐", country: "FD", role: "每日至少 5 份蔬果，最佳為 8-10 份，蔬果攝取量與全因死亡率呈負相關", marketShare: "Meta-analysis", howTo: "每餐至少 1/2 盤蔬菜（生熟搭配）。每日水果 2-3 份（含 1 份莓果）。每週嘗試 30 種以上不同植物。深色蔬菜佔一半以上。", frequency: "每日 8-10 份蔬果", notes: "蔬果非汁化才有完整纖維。糖尿病者注意水果總糖份。腎臟病注意高鉀蔬果。有機優選減少農藥。" },
        ],
      },
      {
        id: "nutrition-fasting",
        name: "間歇性斷食",
        name_en: "Intermittent Fasting",
        keyInfo: "16:8 限時進食可改善胰島素敏感度 30%，斷食 24-48 小時可啟動自噬作用 (autophagy)",
        marketType: "oligopoly",
        companies: [
          { id: "trf-168", name: "16:8 限時進食", ticker: "每日 8h 進食窗", country: "HA", role: "最易執行的斷食模式，將進食限於早上 8 點至下午 4 點效果最佳", marketShare: "多項 RCT", howTo: "從 12:12 開始適應，逐週延長至 14:10、16:8。常見模式：第一餐 11AM、最後一餐 7PM。斷食期間僅水、黑咖啡、無糖茶。", frequency: "每日 16 小時斷食、8 小時進食窗", notes: "需睡眠充足配合。糖尿病服藥者諮詢醫師避免低血糖。進食障礙史者不建議。女性可能對極端斷食較敏感。" },
          { id: "early-trf", name: "早期限時進食 (eTRF)", ticker: "早間進食窗", country: "HA", role: "進食窗口提前到白天，與晝夜節律同步，血糖與血壓改善更顯著", marketShare: "多項 RCT", howTo: "進食窗口提前至 7AM-3PM 或 8AM-4PM。第一餐豐盛、晚餐輕量或省略。社交場合可彈性調整為 10AM-6PM。", frequency: "進食窗 6-10 小時，早間優先", notes: "社交挑戰較大（晚餐文化）。需提早晚餐時間。胃酸逆流者特別受益（避免睡前進食）。" },
          { id: "autophagy", name: "自噬作用啟動", ticker: "24-48h 斷食", country: "RS", role: "細胞清除受損蛋白質與胞器的回收機制，2016 年諾貝爾獎肯定其重要性", marketShare: "觀察性研究", howTo: "可選 24 小時 (OMAD - One Meal A Day) 或 36-72 小時長斷食，每月 1-2 次。期間補充電解質（鈉 1-2g、鉀 1g、鎂 400mg）。", frequency: "每月 1-2 次 24-72 小時斷食", notes: "首次斷食先從 16-18 小時開始適應。糖尿病、低血壓、未控制甲狀腺問題、進食障礙史者禁止。停止條件：頭暈、心悸、虛弱。" },
          { id: "fasting-caution", name: "斷食注意事項", ticker: "個人化評估", country: "RS", role: "糖尿病患者、孕婦、進食障礙史者需醫師指導，過度斷食可能流失肌肉量", marketShare: "多項 RCT", howTo: "斷食前評估：BMI <18.5、進食障礙史、孕婦、第一型糖尿病、服用降血糖藥者禁止。需確保斷食期間補水與電解質。", frequency: "個別化評估後決定頻率", notes: "破壞健康關係的「斷食成癮」是警訊。應同時搭配阻力訓練保護肌肉量。月經紊亂為過度斷食的警示信號（女性）。" },
        ],
      },
      {
        id: "nutrition-blood-sugar",
        name: "血糖管理",
        name_en: "Blood Sugar Management",
        keyInfo: "餐後血糖波動幅度比空腹血糖更能預測代謝健康，理想餐後波動 <30 mg/dL",
        marketType: "monopoly",
        companies: [
          { id: "cgm", name: "連續血糖監測 (CGM)", ticker: "14天/次", country: "MD", role: "即時追蹤血糖波動，了解個人對不同食物的血糖反應，Levels/Dexcom 常見品牌", marketShare: "多項 RCT", howTo: "貼於上臂後方，可持續監測 14 天。配合 Abbott Libre 3、Dexcom G7 或 Levels（含應用程式分析）。記錄飲食對應血糖反應。", frequency: "每 6-12 個月 14 天測一次（健康者）", notes: "台灣自費約 2000-3000 元/感測器。糖尿病患者已可健保給付。短期使用時注意採檢點輕微出血或皮膚過敏。" },
          { id: "fiber-first", name: "纖維優先進食順序", ticker: "每餐", country: "HA", role: "先吃蔬菜纖維 → 蛋白質脂肪 → 最後碳水，可降低餐後血糖波動 30-40%", marketShare: "多項 RCT", howTo: "每餐先吃完蔬菜（沙拉、湯品、配菜），再吃蛋白質與脂肪，最後吃米飯、麵條、麵包等碳水。", frequency: "每餐", notes: "外食時可請店家先上沙拉或湯。日式料理（先付小菜、再主菜、最後白飯）自然符合此原則。" },
          { id: "gi-awareness", name: "升糖指數 (GI) 管理", ticker: "每日選擇", country: "FD", role: "優先選擇低 GI 碳水化合物（全穀、豆類），搭配蛋白質與脂肪減緩血糖上升", marketShare: "Meta-analysis", howTo: "白米換糙米、藜麥；白麵包換全麥；馬鈴薯換地瓜。GI 表可參考 Sydney University 官方資料庫。配合蛋白質與脂肪降低 GI。", frequency: "每日選擇", notes: "GL（升糖負荷）比 GI 更實用（考量份量）。GI 受烹調、成熟度影響（青香蕉 GI 低、熟香蕉 GI 高）。" },
          { id: "post-meal-walk", name: "餐後散步", ticker: "15-30min", country: "EX", role: "餐後步行可降低血糖峰值 30-50%，是最簡單有效的血糖管理策略", marketShare: "多項 RCT", howTo: "正餐後 15-30 分鐘內開始散步，慢速 15-30 分鐘即可，不需高強度。最有效的是晚餐後（血糖反應最大餐）。", frequency: "每餐後 15-30 分鐘散步", notes: "餐後立即激烈運動可能造成胃部不適。可改為輕度家務（洗碗、整理）也有類似效果。下雨天可室內踏步。" },
        ],
      },
      {
        id: "nutrition-micronutrients",
        name: "關鍵微量營養素",
        name_en: "Key Micronutrients",
        keyInfo: "全球約 10 億人維生素 D 不足，50% 人口鎂攝取低於建議量，微量營養素缺乏是隱性流行病",
        marketType: "monopoly",
        companies: [
          { id: "vitd-nutrition", name: "維生素 D3", ticker: "2000-4000IU/day", country: "SP", role: "免疫調節、骨骼健康、基因表達，血清目標 40-60 ng/mL，需定期檢測", marketShare: "Meta-analysis", howTo: "選擇 D3 形式（cholecalciferol），與含脂餐服用提升吸收。先檢測 25(OH)D 決定劑量。亦可透過每日 15-30 分鐘陽光暴露獲取。", frequency: "每日 2000-4000 IU，目標血清 40-60 ng/mL", notes: "不可長期高劑量（>10000IU/day）未檢測。建議搭配 K2 防止鈣異位沉積。台灣自費檢測約 600-1000 元。" },
          { id: "magnesium-nutrition", name: "鎂 (Magnesium)", ticker: "400-600mg/day", country: "SP", role: "參與 600+ 酶反應，甘胺酸鎂/蘇糖酸鎂吸收率最佳，是最常見的缺乏礦物質", marketShare: "Meta-analysis", howTo: "甘胺酸鎂助眠、檸檬酸鎂緩便祕、L-蘇糖酸鎂入腦、蘋果酸鎂提升能量。睡前服用 200-400mg 元素鎂助眠。", frequency: "每日 400-600mg 元素鎂，分次服用", notes: "腎功能不全（eGFR<30）慎用。可能與抗生素（喹諾酮類、四環素）、雙磷酸鹽藥物交互作用需間隔 2-4 小時。氧化鎂吸收率僅 4%。" },
          { id: "zinc-nutrition", name: "鋅 (Zinc)", ticker: "15-30mg/day", country: "SP", role: "免疫功能、傷口癒合、睾酮合成必需，過量會抑制銅吸收，需平衡攝取", marketShare: "Meta-analysis", howTo: "選擇 zinc picolinate、citrate 或 glycinate 形式（吸收較佳）。長期補充建議搭配 1-2mg 銅避免失衡。空腹吸收最佳但可能噁心。", frequency: "每日 15-30mg 元素鋅", notes: "高劑量（>40mg/day）長期會誘發銅缺乏（神經病變、貧血）。空腹胃不適者可隨餐服用。會降低抗生素、利尿劑吸收，需間隔 2 小時。" },
          { id: "b-vitamins", name: "B 群維生素", ticker: "複合B群/day", country: "SP", role: "能量代謝、神經功能與甲基化反應必需，素食者尤須注意 B12 補充", marketShare: "Meta-analysis", howTo: "選擇含活性形式的 B 群：甲鈷胺 (B12)、5-MTHF (folate)、P5P (B6)、R5P (B2)，特別適合 MTHFR 基因變異者。隨早餐服用避免影響睡眠。", frequency: "每日 1 次隨早餐", notes: "尿液變黃為 B2 排出正常現象。長期高劑量 B6 (>200mg/day) 可能造成神經病變。MTHFR 變異者需活性形式。" },
          { id: "iron-nutrition", name: "鐵 (Iron)", ticker: "需檢測後補充", country: "SP", role: "缺鐵性貧血影響全球 25% 人口，但過量鐵促氧化壓力，補充前需檢測 ferritin", marketShare: "Meta-analysis", howTo: "補充前先檢測 ferritin（鐵蛋白）與 TIBC。缺乏者選擇 ferrous bisglycinate 或 heme iron（吸收佳腸胃舒適）。空腹+維他命 C 增吸收。", frequency: "依檢測結果，通常隔日 1 次 25-65mg", notes: "ferritin 正常者不補充（過量促氧化壓力與心血管風險）。隔日補充吸收效率優於每日。茶、咖啡、鈣會抑制吸收，需間隔 1-2 小時。" },
        ],
      },
      {
        id: "nutrition-antioxidant",
        name: "抗氧化與抗糖化",
        name_en: "Antioxidants & Anti-glycation",
        keyInfo: "多酚類化合物每日攝取 >650mg 可降低全因死亡率 30%，比單一抗氧化劑補充更有效",
        marketType: "oligopoly",
        companies: [
          { id: "polyphenols", name: "多酚類食物", ticker: "多元攝取", country: "FD", role: "綠茶兒茶素、莓果花青素、可可黃烷醇等，透過食物攝取比補充劑更佳", marketShare: "Meta-analysis", howTo: "每日多元攝取：綠茶 2-3 杯、莓果 1 杯、85% 黑巧克力 20g、特級初榨橄欖油、紅酒（適量）、洋蔥、蘋果、咖啡。", frequency: "每日多元攝取 >650mg 多酚", notes: "鞣酸影響鐵吸收，貧血者餐間飲茶。黑巧克力選 ≥70% 可可且糖含量低。烹煮過熟會破壞多酚（番茄例外，番茄紅素需加熱釋出）。" },
          { id: "berberine", name: "小檗鹼 (Berberine)", ticker: "500mg 2-3次/day", country: "SP", role: "啟動 AMPK 通路，降血糖效果媲美 metformin，同時改善血脂", marketShare: "多項 RCT", howTo: "選擇 Dihydroberberine（DHB）吸收率較佳，或一般 berberine HCl。隨餐服用 500mg，每日 2-3 次。連續 8-12 週評估效果。", frequency: "每日 1000-1500mg，分 2-3 次隨餐", notes: "孕婦、哺乳期、嬰幼兒禁用。可能與多種藥物（statin、降血糖藥、抗凝血藥、環孢素）有交互作用。腸胃副作用（便秘、腹瀉）常見，從低劑量開始。" },
          { id: "ala", name: "α-硫辛酸 (ALA)", ticker: "300-600mg/day", country: "SP", role: "水溶與脂溶雙性抗氧化劑，再生維生素 C/E，改善胰島素敏感度", marketShare: "多項 RCT", howTo: "選擇 R-ALA（生物活性形式，效力為消旋體的 2 倍）空腹服用吸收最佳。糖尿病周邊神經病變者可用更高劑量 600-1800mg。", frequency: "每日 300-600mg 空腹", notes: "可能造成低血糖（糖尿病患者監測）。長期高劑量可能引起生物素缺乏。手術前 2 週停用。罕見胰島素自體免疫綜合症。" },
          { id: "sulforaphane", name: "蘿蔔硫素 (Sulforaphane)", ticker: "綠花椰菜芽", country: "FD", role: "活化 Nrf2 通路，是最強效的天然解毒與抗氧化激活劑", marketShare: "多項 RCT", howTo: "食用 3-7 天大的綠花椰菜芽（Broccoli sprouts，含量是成熟綠花椰菜 20-50 倍），可自家發芽。或選 BroccoMax、Avmacol 補充劑。", frequency: "每日 1-2 湯匙花椰菜芽，或 10-100mg 補充劑", notes: "高溫烹調破壞活性酶（myrosinase），生食或加芥末籽提供酶。甲狀腺低下者注意過量十字花科。" },
        ],
      },
      {
        id: "nutrition-hydration",
        name: "水分與電解質",
        name_en: "Hydration & Electrolytes",
        keyInfo: "體重 2% 脫水即降低認知功能 25% 與運動表現 10-20%，多數人處於慢性輕度脫水",
        marketType: "low_growth",
        companies: [
          { id: "water-intake", name: "每日水分攝取", ticker: "體重kg×30-40ml", country: "FD", role: "口渴已是脫水信號，主動規律飲水，尿液顏色淺黃為理想指標", marketShare: "Meta-analysis", howTo: "60kg 成人每日 1800-2400ml。晨起一杯溫水、用餐前後各 1 杯、運動前後補充。可使用 1L 水瓶追蹤。", frequency: "全天分散飲用，每 1-2 小時 1 杯", notes: "心衰竭、慢性腎病者需限水（醫師評估）。一次大量飲水（>1L/h）可能造成低鈉血症。咖啡、茶等含水液體也計入。" },
          { id: "sodium-electrolyte", name: "鈉 (Sodium)", ticker: "運動後補充", country: "FD", role: "汗液中流失最多的電解質，長時間運動或低碳飲食需額外補充", marketShare: "多項 RCT", howTo: "運動 >1 小時或大量出汗時，每小時補充 500-1000mg 鈉。可選 LMNT、Liquid IV 等電解質粉，或自製（1/4 茶匙鹽 +檸檬汁 +水）。", frequency: "運動或大量出汗時，每小時 500-1000mg", notes: "高血壓、心衰竭者需控制總鈉量。一般久坐人群通常鈉攝取已過量。低碳/酮飲食者需主動補充避免「酮流感」。" },
          { id: "potassium-balance", name: "鉀 (Potassium)", ticker: "3500-4700mg/day", country: "FD", role: "調節細胞內液平衡與肌肉收縮，多數人攝取不足，香蕉與深綠蔬菜為佳", marketShare: "Meta-analysis", howTo: "高鉀食物：酪梨（975mg/顆）、菠菜煮熟（840mg/杯）、地瓜（540mg/個）、香蕉（420mg）、白豆、椰子水。可使用低鈉鹽（含氯化鉀）替代部分鹽。", frequency: "每日 3500-4700mg", notes: "腎功能不全（eGFR<60）需限鉀。服用 ACEI、ARB、保鉀利尿劑者注意高鉀血症。鉀補充劑需處方。" },
          { id: "mag-electrolyte", name: "鎂 (Magnesium)", ticker: "400mg/day", country: "SP", role: "汗液中鎂流失常被忽略，運動員尤其需要額外補充", marketShare: "多項 RCT", howTo: "甘胺酸鎂吸收佳助眠、檸檬酸鎂緩便祕、蘋果酸鎂提升能量。運動員可選添加電解質產品（含鈉、鉀、鎂）。", frequency: "每日 400mg 元素鎂", notes: "腎功能不全慎用。氧化鎂吸收率僅 4%。可能與抗生素（喹諾酮類）交互作用，需間隔 2-4 小時。" },
        ],
      },
      {
        id: "nutrition-metabolic-markers",
        name: "代謝健康指標",
        name_en: "Metabolic Health Biomarkers",
        keyInfo: "僅 12% 美國成人代謝完全健康（5 項指標均正常），定期追蹤代謝指標是預防的基礎",
        marketType: "monopoly",
        companies: [
          { id: "hba1c", name: "糖化血色素 (HbA1c)", ticker: "<5.5%", country: "BM", role: "反映過去 2-3 個月平均血糖，5.7-6.4% 為糖尿病前期，需積極介入", marketShare: "Meta-analysis", howTo: "至檢驗所或診所抽血檢查，不需空腹。理想 <5.5%，糖尿病前期 5.7-6.4%，糖尿病 ≥6.5%。健保多有給付。", frequency: "每 6-12 個月 1 次（高風險者每 3 個月）", notes: "貧血、血紅蛋白變異、慢性腎病者結果可能不準確。可加做空腹胰島素、HOMA-IR 更完整評估。" },
          { id: "fasting-insulin", name: "空腹胰島素", ticker: "<8 μIU/mL", country: "BM", role: "比空腹血糖更早反映胰島素阻抗，是代謝健康的領先指標", marketShare: "多項 RCT", howTo: "空腹 12 小時後抽血，自費約 200-400 元。理想 <6，<8 為佳，>10 提示胰島素阻抗，>15 顯著阻抗。", frequency: "每年 1 次（代謝症候群者每 6 個月）", notes: "急性壓力、疾病、藥物會影響結果。可同時計算 HOMA-IR = (空腹胰島素 × 空腹血糖)/405，>2.0 提示胰島素阻抗。" },
          { id: "triglycerides", name: "三酸甘油酯", ticker: "<100mg/dL", country: "BM", role: "TG/HDL 比值 >2.0 強烈提示胰島素阻抗，是簡便的代謝風險篩檢指標", marketShare: "Meta-analysis", howTo: "空腹 9-12 小時抽血，標準血脂面板包含。理想 <100，正常 <150，邊緣 150-199，過高 >200 mg/dL。", frequency: "每年 1 次", notes: "前一日飲酒、含糖食物會大幅影響結果。降低三酸甘油酯：減少精製碳水、酒精、增加 Omega-3、運動。" },
          { id: "waist-circ", name: "腰圍", ticker: "男<90cm/女<80cm", country: "BM", role: "內臟脂肪的最簡便代理指標，比 BMI 更能預測代謝疾病風險", marketShare: "Meta-analysis", howTo: "站立放鬆狀態，皮尺繞過肚臍水平（肋骨下緣與骨盆上緣中點），於正常吐氣末測量。亞洲人標準：男<90cm、女<80cm。", frequency: "每月 1 次自我追蹤", notes: "腰臀比（男<0.9、女<0.85）也是重要指標。最準確為 DEXA 或 MRI 量內臟脂肪。生理期女性可能因水腫偏高。" },
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
          { id: "testosterone-track", name: "睾酮 (Total/Free T)", ticker: "每6-12個月", country: "BM", role: "Total T 目標 >500 ng/dL，Free T 更能反映生物活性，上午檢測最準確", marketShare: "Meta-analysis", howTo: "上午 7-10 點空腹抽血（睾酮日夜變化大）。同時測 Total T、Free T、SHBG、Estradiol、LH/FSH 完整評估。", frequency: "每 6-12 個月", notes: "急性疾病、睡眠不足、過度訓練會暫時降低。檢驗結果與症狀不符時需重測。台灣自費完整男性荷爾蒙面板約 1500-3000 元。" },
          { id: "shbg", name: "SHBG 性荷爾蒙結合球蛋白", ticker: "血液檢測", country: "BM", role: "SHBG 過高會降低游離睾酮，過低提示胰島素阻抗，需整體評估", marketShare: "多項 RCT", howTo: "與 Total T 同時抽血檢測。正常範圍因實驗室而異，一般男性 18-55 nmol/L。低 SHBG 改善胰島素阻抗，高 SHBG 評估甲狀腺與肝功能。", frequency: "與睾酮同時檢測", notes: "口服雌激素、甲狀腺亢進使升高；胰島素阻抗、肥胖、低甲狀腺使降低。是評估代謝健康的隱形指標。" },
          { id: "sleep-testosterone", name: "充足睡眠", ticker: "7-9小時/夜", country: "HA", role: "睾酮 70% 在睡眠中產生，睡眠品質是自然維持睾酮的最重要因子", marketShare: "Meta-analysis", howTo: "固定就寢時間、暗冷靜環境（18-19°C）、避免睡前螢幕。確保深度睡眠（睡眠呼吸中止會嚴重影響睾酮）。", frequency: "每夜 7-9 小時", notes: "鼾聲大、白天嗜睡者建議做睡眠檢測（OSA 治療可顯著提升睾酮）。輪班工作對睾酮影響極大。" },
          { id: "zinc-testosterone", name: "鋅 (Zinc)", ticker: "30mg/day", country: "SP", role: "鋅是睾酮合成與精子生成的必需礦物質，缺乏可使睾酮降低 50%", marketShare: "多項 RCT", howTo: "選擇 zinc picolinate 或 bisglycinate 形式吸收佳。每日 15-30mg 隨餐服用避免噁心。長期需配 1-2mg 銅避免失衡。", frequency: "每日 15-30mg 元素鋅，隨餐", notes: "高劑量（>40mg/day）長期會抑制銅吸收。空腹可能噁心。會影響抗生素吸收需間隔 2 小時。食物來源：牡蠣、紅肉、南瓜籽。" },
          { id: "resistance-testosterone", name: "阻力訓練", ticker: "3-4次/週", country: "EX", role: "重訓急性提升睾酮 15-30%，長期訓練改善睾酮基線水平", marketShare: "Meta-analysis", howTo: "複合動作（深蹲、硬舉、臥推）效果最佳。每週 3-4 次 60 分鐘內完成。中重量、多組數（4-6 組×6-10 次）。", frequency: "每週 3-4 次重訓", notes: "過度訓練（每週>5 次高強度）反而降低睾酮。需配合充足蛋白質（1.6g/kg）與睡眠（7+ 小時）。" },
        ],
      },
      {
        id: "hormones-female",
        name: "女性荷爾蒙健康",
        name_en: "Female Hormone Health",
        keyInfo: "女性更年期平均 51 歲，雌激素下降導致骨質流失加速 (每年 2-3%)、心血管風險上升與認知變化",
        marketType: "oligopoly",
        companies: [
          { id: "estrogen-track", name: "雌激素 / 黃體素監測", ticker: "定期檢測", country: "BM", role: "追蹤 E2、孕酮、FSH/LH 比值，了解月經週期與更年期進程", marketShare: "多項 RCT", howTo: "經期規律者於月經第 2-5 天測 FSH、LH、E2；於黃體期（排卵後 5-7 天）測孕酮。更年期評估加做 AMH。", frequency: "症狀者每 6 個月；更年期過渡每年", notes: "口服避孕藥會影響結果（需停藥評估）。激素變動大，數值需配合症狀解讀。可考慮 DUTCH 荷爾蒙尿液檢測獲取代謝物資訊。" },
          { id: "hrt", name: "荷爾蒙替代療法 (HRT)", ticker: "醫師處方", country: "MD", role: "更年期 10 年內開始 HRT 可降低全因死亡率 30%，需個人化風險評估", marketShare: "Meta-analysis", howTo: "婦產科或內分泌科醫師處方。常見：經皮雌激素貼片或凝膠 + 口服黃體素（保留子宮者）。生物相同性（bioidentical）荷爾蒙是趨勢。", frequency: "依醫師指示每日使用，定期追蹤", notes: "乳癌、深靜脈血栓、未控制高血壓、中風史者禁用。應在更年期開始 10 年內或 60 歲前啟動效益最大。需定期評估持續時間（5-10 年）。" },
          { id: "phytoestrogen", name: "植物雌激素", ticker: "食物來源", country: "FD", role: "大豆異黃酮、亞麻籽木酚素等，輕度更年期症狀的天然替代方案", marketShare: "多項 RCT", howTo: "每日攝取 30-50mg 大豆異黃酮（豆腐 100g 約含 25mg）或亞麻籽 1-2 湯匙。發酵大豆（味噌、納豆、天貝）吸收率更佳。", frequency: "每日 1-2 份豆製品", notes: "甲狀腺低下者注意豆類可能影響甲狀腺素吸收（間隔 4 小時）。激素敏感性乳癌患者諮詢醫師（食物量通常安全，補充劑需謹慎）。" },
          { id: "vitex", name: "聖潔莓 (Vitex)", ticker: "40mg/day", country: "SP", role: "調節黃體素，改善經前症候群 (PMS) 與月經不規則", marketShare: "多項 RCT", howTo: "選擇標準化萃取物（含 0.6% agnusides），每日 40-400mg 晨間服用。連續 3 個月經週期評估效果。", frequency: "每日晨間 40-400mg，連續 3 個月", notes: "孕婦、哺乳期、IVF 治療中禁用。可能與口服避孕藥、多巴胺受體拮抗劑交互作用。少數人出現噁心、頭痛、皮膚癢。" },
        ],
      },
      {
        id: "hormones-thyroid",
        name: "甲狀腺功能",
        name_en: "Thyroid Function",
        keyInfo: "亞臨床甲狀腺低下影響 5-10% 人口，常被忽略但顯著影響代謝、體重與情緒",
        marketType: "oligopoly",
        companies: [
          { id: "tsh-track", name: "TSH / T3 / T4 面板", ticker: "每年檢測", country: "BM", role: "TSH 最佳範圍 1.0-2.5 mIU/L（而非實驗室正常上限 4.5），需同時檢測 Free T3/T4", marketShare: "Meta-analysis", howTo: "晨間空腹抽血。完整面板：TSH、Free T4、Free T3、reverse T3、TPO Ab、TG Ab。台灣自費完整面板約 1500-3000 元。", frequency: "每年 1 次（症狀者或高風險每 6 個月）", notes: "藥物（biotin 補充劑、levothyroxine）會干擾結果，前 3 天停用 biotin。鋰、胺碘酮、interferon 等藥物影響甲狀腺。" },
          { id: "iodine", name: "碘 (Iodine)", ticker: "150-300mcg/day", country: "SP", role: "甲狀腺素合成的必需原料，海藻、碘鹽為主要來源，過量或不足皆有害", marketShare: "Meta-analysis", howTo: "食物來源：碘鹽、海帶、紫菜、海帶芽、海魚、乳製品、蛋。台灣鹽多已加碘。可檢測尿碘確認狀態。", frequency: "每日 150mcg（孕婦 220mcg、哺乳 290mcg）", notes: "過量（>1100mcg/day）反而引發甲狀腺問題。橋本氏患者需謹慎補充。海藻來源差異大，可能含汞。檢測 24 小時尿碘為金標準。" },
          { id: "selenium-thyroid", name: "硒 (Selenium)", ticker: "200mcg/day", country: "SP", role: "T4 轉化為活性 T3 的必需輔因子，降低甲狀腺抗體 (TPO)，巴西堅果為佳", marketShare: "多項 RCT", howTo: "每日吃 1-2 顆巴西堅果（每顆約 70-90mcg 硒）即足。補充劑選 selenomethionine 形式 200mcg/day。", frequency: "每日 100-200mcg", notes: "硒過量（>400mcg/day）會中毒（落髮、指甲變脆、神經病變）。巴西堅果含量差異極大（54-1200mcg/顆），不可過量食用。" },
          { id: "thyroid-antibodies", name: "甲狀腺抗體監測", ticker: "TPO / TG Ab", country: "BM", role: "甲狀腺過氧化酶抗體升高提示橋本氏甲狀腺炎，需長期追蹤", marketShare: "Meta-analysis", howTo: "與 TSH 同時抽血檢測 TPO Ab 與 TG Ab。台灣自費約 500-1000 元/項。陽性者需追蹤甲狀腺功能變化。", frequency: "首次完整評估，陽性者每 6-12 個月追蹤", notes: "陽性不等於發病，但 50% 在 5-10 年內出現甲狀腺低下。可透過低麩質飲食、控制壓力、補充硒/D3 降低抗體。" },
        ],
      },
      {
        id: "hormones-cortisol",
        name: "皮質醇與壓力",
        name_en: "Cortisol & Stress Management",
        keyInfo: "慢性高皮質醇加速內臟脂肪堆積、肌肉流失、免疫抑制與海馬迴萎縮，是加速老化的核心荷爾蒙",
        marketType: "monopoly",
        companies: [
          { id: "stress-management", name: "壓力管理技術", ticker: "每日實踐", country: "HA", role: "冥想、正念、自然暴露等，規律練習可降低皮質醇 25-30%（多項 RCT）", marketShare: "Meta-analysis", howTo: "選擇一項規律練習：冥想（10-20 分鐘/day）、深呼吸（4-7-8 法）、自然散步（120 分鐘/週）、寫日記、瑜伽。組合多項效果更佳。", frequency: "每日 10-30 分鐘", notes: "壓力管理需持續性練習，偶爾為之效果有限。慢性高壓力源（工作、關係）需根本性介入。" },
          { id: "ashwagandha-cortisol", name: "南非醉茄 (Ashwagandha)", ticker: "300-600mg/day", country: "SP", role: "最強證據的適應原草藥，KSM-66 萃取物可降低皮質醇 28% 並改善壓力症狀", marketShare: "多項 RCT", howTo: "選擇 KSM-66 或 Sensoril 標準化萃取物。每日 300-600mg 分早晚或睡前服用。連續 4-8 週評估效果。", frequency: "每日 300-600mg，分 1-2 次", notes: "甲狀腺亢進、自體免疫疾病、孕婦、哺乳期避免。與鎮靜劑、甲狀腺藥物可能交互作用。建議週期使用 8-12 週後停 2-4 週。" },
          { id: "rhodiola", name: "紅景天 (Rhodiola)", ticker: "200-400mg/day", country: "SP", role: "調節 HPA 軸壓力反應，減少疲勞感與倦怠 (burnout)，SHR-5 萃取物研究最多", marketShare: "多項 RCT", howTo: "選擇 SHR-5 標準化萃取物（含 3% rosavin、1% salidroside）。晨間或下午服用 200-400mg（避免睡前可能影響睡眠）。", frequency: "每日 200-600mg，晨間或下午", notes: "躁鬱症患者避免（可能誘發躁狂）。可能與抗憂鬱藥、降血壓藥交互作用。連續使用 6-8 週後建議休息 1-2 週。" },
          { id: "cortisol-rhythm", name: "皮質醇日節律追蹤", ticker: "唾液 4 點檢測", country: "BM", role: "正常應早高晚低，曲線平坦化提示 HPA 軸失調，需評估壓力源與恢復策略", marketShare: "多項 RCT", howTo: "功能醫學唾液 4 點檢測：起床時、上午、下午、睡前各採一次。在家採集寄送實驗室。台灣自費約 3000-5000 元。", frequency: "症狀者每 6-12 個月", notes: "前一日避免咖啡、酒精、激烈運動。月經週期、輪班工作會影響結果。也可選 DUTCH 24 小時尿液檢測獲取代謝物資訊。" },
        ],
      },
      {
        id: "hormones-insulin",
        name: "胰島素敏感度",
        name_en: "Insulin Sensitivity",
        keyInfo: "胰島素阻抗是第二型糖尿病、心血管疾病與某些癌症的共同根源，通常先於診斷 10-15 年出現",
        marketType: "monopoly",
        companies: [
          { id: "exercise-insulin", name: "規律運動", ticker: "每日 30min+", country: "EX", role: "單次運動即可改善胰島素敏感度 24-48 小時，阻力與有氧訓練均有效", marketShare: "Meta-analysis", howTo: "結合有氧（150 分鐘/週中等強度）+ 阻力訓練（2-3 次/週）。餐後散步 15 分鐘最直接改善血糖。HIIT 提升胰島素敏感度最快。", frequency: "每日 30+ 分鐘，每週累計 150-300 分鐘", notes: "已服降血糖藥者運動可能造成低血糖，需備糖塊監測。久坐後再運動需漸進，避免心血管事件。" },
          { id: "berberine-insulin", name: "小檗鹼 (Berberine)", ticker: "500mg 2-3次/day", country: "SP", role: "啟動 AMPK 通路改善胰島素敏感度，Meta-analysis 顯示效果媲美 metformin", marketShare: "Meta-analysis", howTo: "選擇 Dihydroberberine（DHB）吸收率高或 berberine HCl。每日 1000-1500mg 分 2-3 次隨餐服用。連續 8-12 週評估。", frequency: "每日 1000-1500mg，分 2-3 次隨餐", notes: "孕婦、哺乳期、嬰幼兒禁用。與多種藥物（statin、降血糖藥、抗凝血藥）交互作用。腸胃不適常見，從低劑量開始。" },
          { id: "chromium", name: "鉻 (Chromium)", ticker: "200-1000mcg/day", country: "SP", role: "增強胰島素受體訊號傳遞，改善血糖控制，吡啶甲酸鉻吸收率最佳", marketShare: "Meta-analysis", howTo: "選擇 chromium picolinate（吡啶甲酸鉻）形式，每日 200-1000mcg 隨餐服用。糖尿病前期可用較高劑量 500-1000mcg。", frequency: "每日 200-1000mcg 隨餐", notes: "腎功能不全者慎用。與制酸劑、levothyroxine 交互作用。長期高劑量可能腎肝負擔。一般飲食已含足量（蔬菜、堅果、肉類）。" },
          { id: "trf-insulin", name: "限時進食 (TRF)", ticker: "8-10h 進食窗", country: "HA", role: "延長斷食期間允許胰島素水平回到基線，改善胰島素敏感度 20-30%", marketShare: "多項 RCT", howTo: "從 12:12 開始，逐步延長至 14:10、16:8。最佳模式：早期限時進食（eTRF，7AM-3PM 或 8AM-4PM）。", frequency: "每日 16-18 小時斷食、6-8 小時進食", notes: "糖尿病服藥者諮詢醫師避免低血糖。進食障礙史者不建議。女性可能對極端斷食較敏感（月經紊亂為警示）。" },
        ],
      },
      {
        id: "hormones-gh",
        name: "生長激素與 IGF-1",
        name_en: "Growth Hormone & IGF-1",
        keyInfo: "生長激素 95% 在深層睡眠分泌，40 歲後每十年下降 14%，維持 GH 需優化睡眠與運動",
        marketType: "emerging",
        companies: [
          { id: "sleep-gh", name: "深層睡眠最佳化", ticker: "7-9小時/夜", country: "HA", role: "GH 脈衝分泌集中在入睡後第一個深睡期，睡眠品質直接決定 GH 分泌量", marketShare: "Meta-analysis", howTo: "確保深度睡眠：睡前不喝酒、低溫環境（18-19°C）、避免睡前 2-3 小時進食、睡前 4-6 小時前完成運動。", frequency: "每夜 7-9 小時，含 1.5-2 小時深睡", notes: "睡眠呼吸中止症會嚴重抑制深睡期 GH 分泌，需評估治療。Oura、WHOOP 可追蹤深睡比例。" },
          { id: "fasting-gh", name: "間歇性斷食", ticker: "16-24h 斷食", country: "HA", role: "斷食 24 小時可使 GH 分泌增加 2000%（研究數據），但長期需平衡營養", marketShare: "多項 RCT", howTo: "嘗試 16:8 或每週 1-2 次 24 小時斷食。斷食期間飲用大量水、無糖茶、黑咖啡。配合電解質補充避免不適。", frequency: "每日 16:8 或每週 1-2 次 24 小時斷食", notes: "糖尿病、低血壓、進食障礙史、孕婦禁止。需配合阻力訓練保護肌肉量。長期極端斷食可能引發荷爾蒙紊亂（特別是女性）。" },
          { id: "hiit-gh", name: "高強度間歇訓練 (HIIT)", ticker: "2-3次/週", country: "EX", role: "高強度運動可急性刺激 GH 分泌增加 450%，效果持續數小時", marketShare: "多項 RCT", howTo: "Norwegian 4x4：4 分鐘 90% 最大心率 + 3 分鐘緩和 × 4 組。或 Tabata：20 秒衝刺 + 10 秒休息 × 8 組。", frequency: "每週 2-3 次，每次 20-30 分鐘", notes: "心血管疾病、未控制高血壓者禁止。必須充分暖身降低受傷風險。日訓練間需至少 48 小時恢復。" },
          { id: "sauna-gh", name: "桑拿浴", ticker: "3-4次/週", country: "HA", role: "20 分鐘桑拿可使 GH 分泌增加 2-3 倍，熱休克蛋白同時激活細胞保護機制", marketShare: "多項 RCT", howTo: "傳統桑拿 80-90°C 15-20 分鐘，或紅外線桑拿 60°C 30-45 分鐘。可分多次出汗+冷卻循環。芬蘭研究每週 4-7 次效果最佳。", frequency: "每週 3-4 次，每次 15-30 分鐘", notes: "心血管疾病、未控制高血壓、孕婦先諮詢醫師。每次補充 500-750ml 水+電解質。從短時間開始耐受訓練。" },
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
          { id: "genomic-instability", name: "基因體不穩定", country: "RS", role: "DNA 損傷累積是老化的根本驅動力，抗氧化防禦與 DNA 修復機制隨年齡衰退", marketShare: "Meta-analysis", howTo: "保護 DNA：避免吸菸、過量酒精、紫外線、空氣污染。攝取抗氧化食物（莓果、十字花科、彩色蔬果）。NAD+ 前驅物支持 DNA 修復酶。", frequency: "終生持續性實踐", notes: "DNA 損傷不可完全逆轉但可減緩累積。預防性檢測（如全基因組定序）可了解遺傳易感性。" },
          { id: "epigenetic", name: "表觀遺傳改變", country: "RS", role: "DNA 甲基化模式隨年齡改變，是生物年齡時鐘的基礎，可透過生活型態部分逆轉", marketShare: "多項 RCT", howTo: "綜合介入：地中海飲食、規律運動、優質睡眠、冥想、限糖。攝取甲基供體（葉酸、B12、甜菜鹼、膽鹼）支持甲基化。", frequency: "終生實踐，每年檢測表觀遺傳年齡", notes: "Bryan Johnson、Dean Ornish 研究顯示綜合介入 5 年可逆轉 1-3 歲。MTHFR 基因變異者需活性形式 B 群。" },
          { id: "cellular-senescence", name: "細胞衰老", country: "RS", role: "衰老細胞分泌 SASP 促炎因子，加速鄰近組織老化，senolytics 可選擇性清除", marketShare: "觀察性研究", howTo: "間歇性使用 senolytics：天然如槲皮素+漆黃素，藥物如 Dasatinib+Quercetin（需醫師處方）。配合運動、自噬作用啟動更有效。", frequency: "間歇性療程，每月 1-2 次「擊跑」(hit-and-run)", notes: "人體長期安全性數據累積中，建議在長壽醫學專家指導下使用。並非每月持續使用，間歇性給藥更有效且安全。" },
          { id: "mitochondrial", name: "粒線體功能障礙", country: "RS", role: "細胞能量工廠效率隨年齡下降，NAD+ 補充與運動可部分恢復粒線體功能", marketShare: "多項 RCT", howTo: "Zone 2 有氧訓練（最強粒線體生成劑）+ HIIT（粒線體適應度）。補充 CoQ10、PQQ、Urolithin A、NMN 支持粒線體健康。", frequency: "每週 Zone 2 訓練 150-300 分鐘 + HIIT 1-2 次", notes: "PQQ 與 Urolithin A（Mitopure）有 RCT 支持粒線體功能改善。CoQ10 在 statin 使用者尤其重要。" },
          { id: "proteostasis", name: "蛋白質穩態喪失", country: "RS", role: "錯誤折疊蛋白質累積導致阿茲海默症等神經退化疾病，自噬作用是主要清除機制", marketShare: "觀察性研究", howTo: "啟動自噬：間歇性斷食（>16 小時）、長期運動、亞精胺（小麥胚芽 1-5mg）、rapamycin（醫師處方）。避免持續性 mTOR 活化。", frequency: "每日 16:8 斷食或每週 24 小時長斷食", notes: "持續性高蛋白質攝取會抑制自噬，可考慮週期性低蛋白日。Mimicking diet（如 ProLon 5 日方案）為實驗性策略。" },
        ],
      },
      {
        id: "longevity-nad",
        name: "NAD+ 代謝通路",
        name_en: "NAD+ Metabolism Pathway",
        keyInfo: "NAD+ 水平從 40 歲後每 20 年下降 50%，NAD+ 是 500+ 酶反應的輔因子，與 Sirtuins 長壽基因活性直接相關",
        marketType: "high_growth",
        companies: [
          { id: "nmn", name: "NMN (煙醯胺單核苷酸)", ticker: "500-1000mg/day", country: "SP", role: "NAD+ 的直接前驅物，動物研究顯著逆轉老化指標，人體 RCT 陸續發表中", marketShare: "多項 RCT", howTo: "選擇高純度（>99%）NMN，舌下含片或脂質體配方吸收較佳。空腹晨起服用 500-1000mg。可配合 TMG（甲基供體）500-1000mg。", frequency: "每日晨間 500-1000mg 空腹", notes: "FDA 2022 年將 NMN 歸類為新藥而非膳食補充劑，購買管道需注意品質。長期人體安全性數據仍在累積。價格不便宜（月費約 1500-3000 元）。" },
          { id: "nr", name: "NR (煙醯胺核糖)", ticker: "300-600mg/day", country: "SP", role: "另一條 NAD+ 合成路徑前驅物，Niagen 品牌有較多人體安全性數據", marketShare: "多項 RCT", howTo: "選擇 ChromaDex 的 Niagen 認證 NR 產品（人體研究最多）。每日 300-600mg 隨餐或空腹皆可。比 NMN 有更多人體安全性數據。", frequency: "每日 300-600mg", notes: "FDA 已認可為 GRAS（一般認為安全）。少數人有紅疹、噁心。可能與化療藥物交互作用，癌症患者諮詢醫師。" },
          { id: "niacin", name: "菸鹼酸 (Niacin / B3)", ticker: "50-500mg/day", country: "SP", role: "最經濟的 NAD+ 前驅物，高劑量有潮紅副作用但同時改善血脂", marketShare: "Meta-analysis", howTo: "提升 NAD+ 用小劑量（50-100mg）的 nicotinamide；改善血脂用高劑量（500-2000mg）niacin。隨餐服用減少潮紅反應。", frequency: "保健 50-100mg、降血脂 500-2000mg/day", notes: "高劑量造成皮膚潮紅、發熱（無害但不適），先吃阿斯匹靈 30 分鐘前可預防。長期高劑量可能肝毒性，需定期監測肝功能。" },
          { id: "nad-protocol", name: "NAD+ 補充策略", country: "RS", role: "結合 NMN + TMG (三甲基甘胺酸) + 白藜蘆醇的協同方案，長期安全性仍在研究中", marketShare: "觀察性研究", howTo: "經典 David Sinclair 方案：NMN 1g + TMG 500-1000mg（提供甲基防止甲基化耗竭）+ 反式白藜蘆醇 500mg（與優格混合提升吸收）。", frequency: "每日晨間空腹", notes: "高劑量 NAD+ 補充可能消耗甲基供體，必須搭配 TMG 或甜菜鹼。癌症、自體免疫疾病患者諮詢醫師（理論上可能促進某些癌細胞）。" },
        ],
      },
      {
        id: "longevity-telomere",
        name: "端粒與端粒酶",
        name_en: "Telomeres & Telomerase",
        keyInfo: "端粒長度是細胞老化的生物時鐘，每次細胞分裂縮短 50-200 bp，壓力與不良生活型態加速縮短",
        marketType: "oligopoly",
        companies: [
          { id: "lifestyle-telomere", name: "生活型態介入", ticker: "綜合實踐", country: "HA", role: "Dean Ornish 研究：綜合生活型態改變（飲食+運動+冥想）5 年可延長端粒 10%", marketShare: "多項 RCT", howTo: "Ornish 方案：植物為主飲食、每日 30 分鐘運動、每日 60 分鐘壓力管理（瑜伽、冥想、深呼吸）、社交支持。Omega-3 補充。", frequency: "每日綜合實踐，長期堅持", notes: "需多面向同時介入才有效（單一介入效果有限）。社交支持是常被忽略但關鍵的因素。" },
          { id: "ta65", name: "TA-65 (環黃芪醇)", ticker: "依產品建議", country: "SP", role: "黃芪萃取物，宣稱可活化端粒酶，人體研究規模小但顯示端粒延長趨勢", marketShare: "觀察性研究", howTo: "TA-65MD 品牌專利配方，每日 250-1000 單位空腹服用。價格昂貴（月費約 200-600 美元）。需連續服用 3-6 個月評估。", frequency: "每日 250-1000 單位空腹", notes: "理論上活化端粒酶可能增加癌症風險（有爭議）。研究獨立性受質疑。價格高昂效果仍不確定，需謹慎評估。" },
          { id: "astragalus", name: "黃芪 (Astragalus)", ticker: "500-1000mg/day", country: "SP", role: "傳統中醫補氣藥材，含環黃芪醇等可能活化端粒酶的成分", marketShare: "觀察性研究", howTo: "選擇標準化萃取物（含 0.4% 環黃芪醇）500-1000mg 每日。或熬煮乾燥黃芪片 9-30g 製成中藥湯。", frequency: "每日 500-1000mg 萃取物或 9-30g 中藥材", notes: "自體免疫疾病患者避免（黃芪會增強免疫）。可能與免疫抑制劑、利尿劑交互作用。孕婦慎用。" },
          { id: "telomere-test", name: "端粒長度檢測", ticker: "每1-2年", country: "MD", role: "qPCR 或 Flow-FISH 方法測量白血球端粒長度，追蹤生活型態介入效果", marketShare: "觀察性研究", howTo: "可選 Life Length、TeloYears、SpectraCell 等檢測公司。家中採血或唾液寄送實驗室。台灣自費約 5000-15000 元。", frequency: "每 1-2 年評估介入效果", notes: "不同實驗室方法不同，比較需用同一家。短期變動可能反映檢測誤差而非真實變化。生物年齡時鐘（DNA 甲基化）目前更主流。" },
        ],
      },
      {
        id: "longevity-mtor-ampk",
        name: "mTOR 與 AMPK 信號通路",
        name_en: "mTOR & AMPK Signaling Pathways",
        keyInfo: "mTOR 過度活化加速老化，AMPK 活化促進長壽；熱量限制與運動是最天然的 AMPK 激活劑",
        marketType: "emerging",
        companies: [
          { id: "rapamycin", name: "雷帕黴素 (Rapamycin)", ticker: "低劑量/間歇", country: "MD", role: "mTOR 抑制劑，動物研究延壽 10-25%，低劑量人體試驗探索中，需醫師處方", marketShare: "多項 RCT", howTo: "處方藥（Sirolimus / Rapamune），需與長壽醫學專家合作。常見抗老劑量 5-8mg 每週一次（脈衝給藥），抑制 mTORC1 而保留 mTORC2。", frequency: "每週 1 次脈衝給藥，週期性檢查", notes: "免疫抑制劑，可能影響傷口癒合與感染風險。需監測血脂、血糖、口腔潰瘍。台灣需自費。手術前 2-4 週停用。" },
          { id: "metformin-longevity", name: "二甲雙胍 (Metformin)", ticker: "500-1000mg/day", country: "MD", role: "AMPK 活化劑，TAME 臨床試驗測試抗老效果，糖尿病患者使用者癌症風險較低", marketShare: "多項 RCT", howTo: "處方藥，醫師評估後處方。常見劑量 500-1000mg 每日 1-2 次隨餐。長壽用途偏好較低劑量 500mg。", frequency: "每日 500-1000mg 隨餐", notes: "可能降低運動的肌肥大適應（與運動隔開時間服用）。長期使用需補充 B12（metformin 降低 B12 吸收）。腎功能不全慎用。" },
          { id: "caloric-restriction", name: "熱量限制 (CR)", ticker: "減少 10-20%", country: "HA", role: "非人類靈長類研究延壽 30%，CALERIE 人體試驗顯示改善多項老化生物標記", marketShare: "多項 RCT", howTo: "每日熱量比 TDEE 少 10-20%。重點是營養密度而非單純減量。配合間歇性斷食或 FMD（fasting-mimicking diet）。", frequency: "持續性實踐", notes: "BMI <22 或進食障礙史者不建議。需確保蛋白質充足（防止肌肉流失）。CR mimetics（NMN、雷帕黴素、白藜蘆醇）為替代方案。" },
          { id: "spermidine-mtor", name: "亞精胺 (Spermidine)", ticker: "1-5mg/day", country: "SP", role: "誘導自噬作用的天然多胺，小麥胚芽含量最高，觀察性研究與心血管保護相關", marketShare: "觀察性研究", howTo: "食物來源：小麥胚芽（25mg/100g 最高）、納豆、藍紋起司、菇類。補充劑可選 spermidineLIFE 等品牌每日 1-5mg。", frequency: "每日 1-5mg", notes: "癌症患者諮詢醫師（理論上可能促進腫瘤生長）。腎功能不全者慎用。對乳製品過敏者選非乳製品來源。" },
        ],
      },
      {
        id: "longevity-stem-cells",
        name: "幹細胞與再生醫學",
        name_en: "Stem Cells & Regenerative Medicine",
        keyInfo: "造血幹細胞功能隨年齡衰退，50 歲後幹細胞池明顯縮小，再生醫學致力於恢復組織修復能力",
        marketType: "emerging",
        companies: [
          { id: "prp", name: "富血小板血漿 (PRP)", ticker: "醫師處方", country: "MD", role: "濃縮自體血小板生長因子，用於關節修復、皮膚再生與落髮治療", marketShare: "多項 RCT", howTo: "醫療診所抽取自體血液，離心分離出富含血小板的血漿，注射至目標部位（關節、頭皮、皮膚）。療程約 3-5 次，間隔 4-6 週。", frequency: "依適應症 3-5 次療程，每年維護 1-2 次", notes: "台灣自費約每次 8000-25000 元。可能注射部位疼痛、瘀青、感染風險。血液疾病、嚴重貧血者不適合。" },
          { id: "exosomes", name: "外泌體 (Exosomes)", ticker: "研究階段", country: "RS", role: "幹細胞分泌的奈米囊泡，攜帶修復訊號蛋白與 RNA，為新興再生醫學載體", marketShare: "觀察性研究", howTo: "目前在台灣與多數國家為研究或自費實驗性療程。注射、靜脈、外用皆有開發。需在合格醫療機構進行。", frequency: "依方案不定，多為週期性療程", notes: "FDA 尚未核准外泌體治療為標準療法，主流醫學界對效力與安全性仍有爭議。價格昂貴（單次數萬至十萬元）。" },
          { id: "stem-cell-therapy", name: "幹細胞療法", ticker: "醫師處方", country: "MD", role: "間質幹細胞 (MSC) 用於關節炎、心臟修復等，FDA 僅核准少數適應症", marketShare: "觀察性研究", howTo: "FDA 核准適應症（造血幹細胞移植）需專科醫師評估。實驗性療法（關節注射、靜脈注射）需在合格機構臨床試驗或自費療程。", frequency: "依適應症與療程", notes: "台灣 2018 年特管法開放部分自體幹細胞治療。海外「幹細胞旅遊」風險高（未經認證、感染、腫瘤）。費用昂貴（10-30 萬以上）。" },
          { id: "yamanaka-factors", name: "山中因子 (細胞重編程)", ticker: "前沿研究", country: "RS", role: "部分重編程可逆轉表觀遺傳老化時鐘，Altos Labs 等公司投入數十億美元研發", marketShare: "觀察性研究", howTo: "目前仍在臨床前期研究（動物實驗、體外實驗），人體應用尚未上市。可關注 Altos Labs、Retro Biosciences 等公司進展。", frequency: "未來技術，目前無臨床應用", notes: "完全重編程可能致癌（去分化變幹細胞）。部分重編程（OSK 因子）為較安全方向。可能在 2030 年代才有人體應用。" },
        ],
      },
      {
        id: "longevity-senolytics",
        name: "Senolytics 清除衰老細胞",
        name_en: "Senolytics — Clearing Senescent Cells",
        keyInfo: "衰老細胞僅佔組織 <5% 但分泌大量 SASP 促炎因子，動物研究中清除衰老細胞可延壽 25%",
        marketType: "emerging",
        companies: [
          { id: "fisetin", name: "漆黃素 (Fisetin)", ticker: "100-500mg/day", country: "SP", role: "草莓中天然存在的黃酮類，Mayo Clinic 研究顯示為最有效的天然 senolytic 候選物", marketShare: "觀察性研究", howTo: "間歇性高劑量「擊跑」協議：每月 2 天連續服用 20mg/kg（約 1000-1500mg/day）。隨含脂餐服用提升吸收。", frequency: "每月 2 天高劑量「擊跑」，或每日低劑量 100mg", notes: "理論上免疫抑制劑、抗凝血藥者慎用。人體 senolytic 效果證據仍有限。生物利用度低，選用脂質體配方較佳。" },
          { id: "quercetin-dasatinib", name: "槲皮素 + Dasatinib", ticker: "間歇性療程", country: "MD", role: "第一個被研究的 senolytic 組合，間歇性給藥 (hit-and-run) 可清除衰老細胞", marketShare: "多項 RCT", howTo: "Dasatinib（白血病藥物，需處方）100mg + Quercetin 1000mg，連續 2 天，每月 1 次。需在長壽醫學專家指導下使用。", frequency: "每月 2 天連續服用「擊跑」", notes: "Dasatinib 有副作用（疲倦、胃腸不適、心血管影響），需嚴格監測。長期人體安全性數據累積中。價格高昂。" },
          { id: "quercetin-alone", name: "槲皮素 (Quercetin)", ticker: "500-1000mg/day", country: "SP", role: "廣泛存在的植物黃酮，抗炎抗氧化，作為單獨 senolytic 的效果較溫和", marketShare: "多項 RCT", howTo: "選擇 Quercetin Phytosome 或含 bromelain 配方提升吸收。每日 500-1000mg 隨餐服用。也可從食物獲取（洋蔥、蘋果、莓果）。", frequency: "每日 500-1000mg 隨餐", notes: "可能與抗生素（喹諾酮類）、cyclosporine、warfarin 交互作用。腎功能不全者慎用高劑量。空腹生物利用度低。" },
        ],
      },
      {
        id: "longevity-bio-age",
        name: "生物年齡檢測",
        name_en: "Biological Age Testing",
        keyInfo: "DNA 甲基化時鐘可精確估算生物年齡 (±2 年)，生物年齡比實際年齡更能預測疾病與死亡風險",
        marketType: "high_growth",
        companies: [
          { id: "dna-methylation", name: "DNA 甲基化時鐘", ticker: "每6-12個月", country: "MD", role: "Horvath/Hannum 時鐘測量表觀遺傳年齡，生活型態改變可逆轉生物年齡 1-3 歲", marketShare: "多項 RCT", howTo: "選擇 TruDiagnostic、myDNAge、Elysium Index 等消費級檢測公司。家中採血（指尖採血或唾液）寄送，4-6 週收到報告。", frequency: "每 6-12 個月評估介入效果", notes: "台灣自費約 7000-15000 元。同一公司、同一時間採檢比較性最佳。短期變動可能反映檢測噪音，需長期趨勢觀察。" },
          { id: "grimage", name: "GrimAge 時鐘", ticker: "血液檢測", country: "MD", role: "結合 DNA 甲基化與血漿蛋白預測壽命，是目前預測死亡率最準確的生物時鐘", marketShare: "多項 RCT", howTo: "目前主要透過 TruDiagnostic 或學術研究取得。提供 GrimAge 2.0 版本最新。需採血樣本送至認證實驗室。", frequency: "每年 1 次", notes: "預測死亡率比 Horvath/Hannum 更準確。臨床應用仍在累積。比實際年齡老化越多者，心血管、癌症風險越高。" },
          { id: "truage", name: "TruAge 檢測", ticker: "每年", country: "MD", role: "消費級 DNA 甲基化檢測服務，DunedinPACE 速率指標追蹤老化速度", marketShare: "觀察性研究", howTo: "TruDiagnostic 公司提供，網路訂購採檢套組，家中採血寄送。DunedinPACE 反映「老化速度」，1.0 為平均，<1 較慢老化。", frequency: "每 6-12 個月追蹤", notes: "台灣可訂購但需自行寄送，費用約 USD 200-500。DunedinPACE 對短期介入較敏感（適合追蹤生活型態變化效果）。" },
          { id: "phenoage", name: "PhenoAge (表型年齡)", ticker: "血液生化指標", country: "BM", role: "基於 9 項常規血液指標計算，無需昂貴基因檢測即可估算生物年齡", marketShare: "Meta-analysis", howTo: "需 9 項常規血液檢驗：白蛋白、肌酐、葡萄糖、CRP、淋巴球%、平均紅血球體積、紅血球分布寬度、鹼性磷酸酶、白血球。使用線上計算機計算。", frequency: "每年 1 次", notes: "PhenoAge 計算機可免費使用（Google 搜尋 'PhenoAge calculator'）。優勢是用常規檢項即可估算，缺點是受急性疾病影響大。" },
        ],
      },
      {
        id: "longevity-exercise",
        name: "運動作為長壽藥",
        name_en: "Exercise as Longevity Medicine",
        keyInfo: "規律運動是唯一同時改善全部十二項老化標誌的介入方式，低 VO2max 的死亡風險是吸菸的 2 倍",
        marketType: "monopoly",
        companies: [
          { id: "vo2max-longevity", name: "VO2max 最大攝氧量", ticker: "HIIT 2-3次/週", country: "EX", role: "最強的全因死亡預測因子，從低轉中 VO2max 組死亡風險降 50%，值得終生訓練", marketShare: "Meta-analysis", howTo: "Norwegian 4x4：4 分鐘 90% 最大心率 + 3 分鐘緩和 × 4 組。或 Tabata 短間歇。可在自費健身房或運動醫學門診測量 VO2max。", frequency: "每週 1-2 次 HIIT 訓練", notes: "心血管疾病、未控制高血壓者禁止。需充分暖身。可用 Garmin、Apple Watch 估算 VO2max（誤差±10%）。" },
          { id: "strength-longevity", name: "肌力訓練", ticker: "2-3次/週", country: "EX", role: "肌肉量與肌力是獨立於有氧之外的長壽預測因子，維持功能性獨立不可或缺", marketShare: "Meta-analysis", howTo: "複合動作為主：深蹲、硬舉、臥推、肩推、划船。每動作 3-4 組×6-10 次。每週 2-3 次全身或上下分部訓練。", frequency: "每週 2-3 次，每次 45-60 分鐘", notes: "初學者強烈建議聘教練學習正確姿勢。年長者特別需要重訓防止肌少症。骨質疏鬆者避免特定動作（深度前彎）。" },
          { id: "zone2-longevity", name: "Zone 2 有氧", ticker: "150-200min/週", country: "EX", role: "提升粒線體密度與脂肪氧化能力，是長壽運動處方的基礎量", marketShare: "Meta-analysis", howTo: "心率維持 60-70% 最大心率，對話測試：能說完整句子但無法唱歌。快走、慢跑、騎車、划船機皆可。可拆成 3-5 次完成。", frequency: "每週 150-200 分鐘", notes: "Peter Attia 建議的長壽運動四支柱之一。心率錶輔助監測。初學者從每次 20 分鐘開始增加。" },
          { id: "flexibility-balance", name: "柔軟度與平衡", ticker: "2-3次/週", country: "EX", role: "跌倒是 65 歲以上意外死亡首因，平衡訓練可降低跌倒風險 23%", marketShare: "Meta-analysis", howTo: "瑜伽、太極、平衡訓練（單腳站立、半足尖站立）。每日練習 10-15 分鐘。可加入不穩定平面（BOSU 球）增加挑戰。", frequency: "每週 2-3 次或每日短時練習", notes: "嚴重平衡障礙者需在保護下進行（扶椅、靠牆）。視力與內耳問題會影響平衡訓練，需先評估。" },
        ],
      },
      {
        id: "longevity-social",
        name: "社交連結與目的感",
        name_en: "Social Connection & Purpose",
        keyInfo: "社會孤立使死亡風險增加 26%，效果相當於每天吸 15 支菸；擁有生活目的感可延壽 7 年",
        marketType: "monopoly",
        companies: [
          { id: "blue-zone-social", name: "藍色地帶社交模式", ticker: "持續經營", country: "HA", role: "所有藍色地帶長壽人群的共同特徵：緊密社交圈、多代同堂、社區歸屬感", marketShare: "觀察性研究", howTo: "建立 3-5 人核心社交圈（沖繩 moai 概念）：每月固定聚會、互相支持。多與家人聯繫、創造跨代互動機會。", frequency: "每週多次深度互動，月度聚會", notes: "社交質比量重要：深度勝過廣度。獨居老人風險最高，需主動建立支持系統。可從興趣社團入門。" },
          { id: "ikigai", name: "生活目的感 (Ikigai)", ticker: "自我探索", country: "HA", role: "沖繩 ikigai（生活意義）概念，擁有明確人生目的者心血管死亡率降低 60%", marketShare: "觀察性研究", howTo: "Ikigai 四圈交集：你愛做的、你擅長的、世界需要的、可獲報酬的。寫下自我反思日記，逐步釐清個人使命。", frequency: "終生探索與調整", notes: "退休是 ikigai 易失落時刻，需提前規劃。可透過志工服務、傳承知識、創作找到新目的。" },
          { id: "community", name: "社區參與", ticker: "規律參與", country: "HA", role: "志工服務、宗教團體、興趣社群等，持續的社會連結是長壽的保護因子", marketShare: "Meta-analysis", howTo: "每週參加 1-2 個社區活動：志工團體、宗教聚會、運動社團、讀書會、興趣班。優先選擇實體互動。", frequency: "每週 1-2 次規律參與", notes: "退休者特別需要主動安排社區活動。可透過社區大學、線上找到實體聚會。社交焦慮者可從小團體開始。" },
          { id: "close-relationships", name: "親密關係", ticker: "主動維護", country: "HA", role: "Harvard 長達 85 年研究結論：良好人際關係是健康與幸福最強預測因子", marketShare: "觀察性研究", howTo: "每週與重要他人有「品質時間」：無干擾的深度對話、共同活動。每月與遠方好友通話。每年規劃家庭旅行或重聚。", frequency: "每日家人、每週密友、每月遠友", notes: "婚姻品質比婚姻狀態重要（不快樂婚姻反而傷害健康）。長期衝突關係需處理或脫離。" },
        ],
      },
      {
        id: "longevity-stack",
        name: "長壽補充品整合方案",
        name_en: "Longevity Supplement Stack",
        keyInfo: "Bryan Johnson 的 Blueprint 方案涵蓋 100+ 補充品，但證據品質參差，核心 5-10 項有較強支持",
        marketType: "high_growth",
        companies: [
          { id: "nmn-stack", name: "NMN (NAD+ 前驅物)", ticker: "500-1000mg/day", country: "SP", role: "核心長壽補充品，恢復 NAD+ 水平支持 Sirtuin 長壽基因與 DNA 修復", marketShare: "多項 RCT", howTo: "選擇高純度 NMN（>99%）舌下或脂質體配方，空腹晨間服用 500-1000mg。配 TMG 500mg 提供甲基防止甲基化耗竭。", frequency: "每日晨間空腹 500-1000mg", notes: "美國 FDA 2022 起列為新藥而非膳食補充劑。長期人體安全性數據累積中。價格不便宜（月費 1500-3000 元）。" },
          { id: "resveratrol", name: "白藜蘆醇 (Resveratrol)", ticker: "250-500mg/day", country: "SP", role: "Sirtuin 1 活化劑，與 NMN 協同作用，但人體大型 RCT 結果不一致", marketShare: "觀察性研究", howTo: "選擇 trans-resveratrol（活性形式）。與含脂餐（如優格、橄欖油）服用以提升吸收。可與 NMN 同時晨間服用。", frequency: "每日 250-500mg 隨含脂餐", notes: "人體研究效果不一致，可能是低生物利用度問題。可能與抗凝血藥、CYP3A4 代謝藥物交互作用。可從紅酒、葡萄皮獲取少量。" },
          { id: "spermidine", name: "亞精胺 (Spermidine)", ticker: "1-5mg/day", country: "SP", role: "誘導自噬作用，小麥胚芽來源，流行病學數據與降低心血管死亡率相關", marketShare: "觀察性研究", howTo: "食物來源：小麥胚芽（25mg/100g）、納豆、藍紋起司、菇類。補充劑可選 spermidineLIFE 每日 1-5mg。", frequency: "每日 1-5mg", notes: "癌症患者諮詢醫師（理論上可能促進腫瘤生長）。腎功能不全慎用。對乳製品過敏選非乳製品來源。" },
          { id: "coq10-longevity", name: "輔酶 Q10", ticker: "200mg/day", country: "SP", role: "粒線體電子傳遞鏈關鍵輔因子，隨年齡內源性合成減少，補充支持能量代謝", marketShare: "多項 RCT", howTo: "選擇 Ubiquinol（還原型）吸收率較佳，特別是 40 歲以上。隨含脂餐服用提升吸收。服用 statin 者尤其建議補充。", frequency: "每日 100-300mg 隨餐", notes: "服用 warfarin 者需告知醫師（可能影響抗凝效果）。少數副作用包括失眠、腸胃不適，避免睡前服用。" },
          { id: "omega3-longevity", name: "Omega-3 (EPA/DHA)", ticker: "2g/day", country: "SP", role: "全方位抗炎與心腦保護，Omega-3 Index >8% 與端粒長度保留正相關", marketShare: "Meta-analysis", howTo: "選擇高濃度（>60% EPA+DHA）IFOS 認證魚油，隨含脂餐服用。可加做 Omega-3 Index 檢測（目標 >8%）。", frequency: "每日 2-3g EPA+DHA，分早晚兩次", notes: "服用抗凝血藥諮詢醫師。手術前 2 週停用。素食者選藻油 DHA。Omega-3 Index 自費檢測約 1500-3000 元。" },
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
          { id: "sunscreen", name: "廣譜防曬乳", ticker: "SPF 30-50/每日", country: "SP", role: "UVA+UVB 全波段保護，每 2 小時補擦，陰天室內也需要（UVA 穿透玻璃）", marketShare: "Meta-analysis", howTo: "每日使用 SPF 30-50 廣譜防曬。臉部使用約 2 指長度（FTU），全身約 30ml。出門前 15-20 分鐘塗抹。長時間戶外每 2 小時補擦。", frequency: "每日早晨+戶外活動每 2 小時補擦", notes: "化學性防曬（如 avobenzone）需提前塗抹發揮效果。混搭使用可能降低 SPF 效力。游泳或大量出汗後立即補擦。" },
          { id: "uva-uvb", name: "UVA / UVB 防護", ticker: "PA+++以上", country: "HA", role: "UVB 造成曬傷，UVA 穿透更深造成膠原蛋白分解與色素沉著，兩者都需防護", marketShare: "Meta-analysis", howTo: "選擇標示「Broad Spectrum」(美) 或「PA+++」以上（亞洲）的廣譜防曬。歐洲標示 UVA 圓圈內顯示。注意 UVA 穿透玻璃，室內近窗也需防護。", frequency: "全年每日（陰天 UVA 仍有 80%）", notes: "PA 系統：+ 為 UVAPF 2-4、++ 為 4-8、+++ 為 8-16、++++ 為 >16。SPF 標示僅反映 UVB 防護。日間波峰時段（10AM-3PM）UV 最強。" },
          { id: "physical-sunscreen", name: "物理性防曬 (鋅/鈦)", ticker: "每日使用", country: "SP", role: "氧化鋅與二氧化鈦反射紫外線，較溫和不刺激敏感肌，無內分泌干擾疑慮", marketShare: "多項 RCT", howTo: "選擇 zinc oxide ≥10% 或 titanium dioxide 為主成分的礦物防曬。Tinted（帶色調）配方可避免泛白問題。敏感肌、孕婦、兒童優先選擇。", frequency: "每日使用，戶外每 2 小時補擦", notes: "純物理防曬可能厚重泛白，新一代 micronized 配方較輕薄。塗抹需充分鋪平避免空隙。不需出門前等待時間。" },
          { id: "sun-avoidance", name: "物理性遮蔽", ticker: "帽子/太陽眼鏡", country: "HA", role: "寬簾帽、UPF 衣物與太陽眼鏡是最可靠的防曬手段，不受補擦頻率影響", marketShare: "Meta-analysis", howTo: "寬簾帽（帽簷 7.5cm+）、UPF 50+ 衣物、太陽眼鏡（100% UV 阻隔）、長袖防曬衣物。10AM-3PM 紫外線最強時段避免直曬。", frequency: "戶外活動全程", notes: "深色與密織衣物 UPF 較高。一般 T-shirt 僅 UPF 5-7。泳衣或太陽眼鏡需檢查標示。維生素 D 合成需短時間日曬（早晚 10-15 分鐘即足）。" },
        ],
      },
      {
        id: "skin-topical",
        name: "外用抗老成分",
        name_en: "Topical Anti-aging Ingredients",
        keyInfo: "維 A 酸 (Retinoid) 是唯一有大量 RCT 支持能逆轉光老化的外用成分，使用 12 週以上見效",
        marketType: "monopoly",
        companies: [
          { id: "retinol", name: "維 A 酸 / 視黃醇 (Retinol)", ticker: "每晚使用", country: "SP", role: "促進細胞更新、膠原蛋白合成與色素均勻化，從低濃度開始建立耐受性", marketShare: "Meta-analysis", howTo: "從低濃度（retinol 0.025-0.05%）開始，每週 2-3 次睡前使用，逐漸增加至每晚。乾性皮膚可採用「三明治法」：保濕霜→retinol→保濕霜。處方型 tretinoin 效果更強。", frequency: "從每週 2-3 次，逐漸增加到每晚", notes: "孕婦、哺乳期禁用。初期可能脫皮、發紅、刺激（適應期 4-6 週）。日間嚴格防曬（retinol 增加光敏性）。避免與 AHA/BHA、維 C 同時使用。" },
          { id: "vitamin-c-topical", name: "維生素 C 精華", ticker: "每日早晨", country: "SP", role: "L-ascorbic acid 15-20% 中和自由基、抑制黑色素合成、促進膠原蛋白生成", marketShare: "多項 RCT", howTo: "選擇 L-ascorbic acid 15-20% 配方，pH <3.5，含 E + Ferulic acid 穩定（如 SkinCeuticals C E Ferulic）。清潔後乾性肌膚塗抹，再保濕與防曬。", frequency: "每日早晨 2-3 滴", notes: "氧化變黃即失效，需冷藏保存避光。敏感肌可從 5-10% 低濃度開始。避免與 retinol、niacinamide 同時使用（可分早晚）。" },
          { id: "niacinamide", name: "菸鹼醯胺 (Niacinamide)", ticker: "5%/每日", country: "SP", role: "維生素 B3 衍生物，改善毛孔粗大、色素不均與皮膚屏障功能，溫和適合所有膚質", marketShare: "多項 RCT", howTo: "選擇 5% 配方早晚使用，敏感肌可從 2-3% 開始。可單獨使用或與透明質酸混合。與大部分活性成分相容（除高濃度維 C 外）。", frequency: "每日早晚", notes: "10% 以上高濃度可能造成潮紅與刺激，5% 即足夠。容易使用且副作用少。可改善多種皮膚問題（毛孔、色素、油脂、屏障）。" },
          { id: "peptides", name: "胜肽 (Peptides)", ticker: "每日使用", country: "SP", role: "銅胜肽、基質金屬蛋白酶抑制胜肽等，訊號傳遞刺激膠原蛋白與彈性蛋白合成", marketShare: "多項 RCT", howTo: "選擇含 Matrixyl 3000、銅胜肽（GHK-Cu）、Argireline 等的精華。早晚使用，可與保濕霜混合或夾在保濕步驟之間。", frequency: "每日早晚", notes: "GHK-Cu 銅胜肽呈藍綠色為正常。與維 C 同時使用會降低銅胜肽效力，分早晚使用。效果緩慢（3-6 個月見效），需持續使用。" },
        ],
      },
      {
        id: "skin-collagen",
        name: "膠原蛋白維護",
        name_en: "Collagen Maintenance",
        keyInfo: "25 歲後膠原蛋白每年流失 1-1.5%，口服膠原蛋白肽 5-10g/day 可改善皮膚彈性與皺紋深度",
        marketType: "oligopoly",
        companies: [
          { id: "collagen-oral", name: "口服膠原蛋白肽", ticker: "5-10g/day", country: "SP", role: "水解膠原蛋白肽 (2.5-10kDa) 可到達真皮層，Meta-analysis 顯示改善皮膚彈性與水分", marketShare: "Meta-analysis", howTo: "選擇水解膠原蛋白肽（分子量 2-5 kDa）。配合 50-100mg 維生素 C 提升合成。可加入咖啡、果汁、優格、湯品中。連續服用至少 8-12 週見效。", frequency: "每日 5-15g，可分多次", notes: "對牛、魚過敏者注意來源。腎功能不全諮詢醫師（高蛋白）。選擇有第三方認證品牌（避免重金屬）。海洋膠原蛋白吸收較佳。" },
          { id: "vitc-collagen", name: "維生素 C (內服)", ticker: "500-1000mg/day", country: "SP", role: "膠原蛋白合成的必需輔因子，缺乏會導致壞血病（膠原蛋白崩解）", marketShare: "Meta-analysis", howTo: "選擇 Liposomal Vitamin C（脂質體吸收率更佳）或一般 ascorbic acid。每日 500-1000mg 分次服用（吸收上限約 200-400mg/次）。食物來源：芭樂、奇異果、彩椒、莓果。", frequency: "每日 500-1000mg 分 2-3 次", notes: "腎結石（草酸鈣型）患者注意。高劑量可能造成腸胃不適、腹瀉。可能與某些化療藥物交互作用，癌症患者諮詢醫師。" },
          { id: "copper-peptides", name: "銅胜肽 (GHK-Cu)", ticker: "外用精華", country: "SP", role: "刺激膠原蛋白與糖胺聚醣合成，促進傷口癒合與皮膚重塑", marketShare: "多項 RCT", howTo: "選擇穩定的 GHK-Cu 配方（NIOD CAIS、The Ordinary 銅胜肽）。清潔後乾性肌膚塗抹，再保濕。可與保濕成分混合使用。", frequency: "每日 1-2 次", notes: "藍綠色為銅離子正常顏色。避免與高劑量維 C（>10%）同時使用會降低銅胜肽活性，可分早晚。罕見刺激或過敏，先做局部測試。" },
          { id: "avoid-sugar-skin", name: "減少精製糖攝取", ticker: "盡量減少", country: "FD", role: "糖化作用 (glycation) 使膠原蛋白交聯硬化產生 AGEs，加速皺紋與鬆弛", marketShare: "觀察性研究", howTo: "減少精製糖、含糖飲料、高 GI 碳水化合物。閱讀食品標籤避免高果糖玉米糖漿、蔗糖、人造甜味劑。優選天然甜味（莓果、椰棗）。", frequency: "持續性實踐", notes: "AGEs 不僅內生於糖化過程，也來自高溫烹調（燒烤、煎炸）。烹調方式選擇水煮、蒸、燉效益更佳。糖化血色素 (HbA1c) 可間接追蹤。" },
        ],
      },
      {
        id: "skin-barrier",
        name: "皮膚屏障修復",
        name_en: "Skin Barrier Repair",
        keyInfo: "角質層屏障受損會導致經皮水分散失 (TEWL) 增加，引發乾燥、敏感與發炎的惡性循環",
        marketType: "low_growth",
        companies: [
          { id: "ceramides", name: "神經醯胺 (Ceramides)", ticker: "每日使用", country: "SP", role: "角質層脂質主成分 (50%)，外用補充可修復皮膚屏障、減少水分散失", marketShare: "多項 RCT", howTo: "選擇含「Ceramide 1, 3, 6-II + 膽固醇 + 脂肪酸」3:1:1 黃金比例的乳霜（CeraVe、Dr.Jart+ Ceramidin）。清潔後濕潤肌膚塗抹效果最佳。", frequency: "每日早晚使用", notes: "敏感肌、異位性皮膚炎、酒糟肌特別受益。可長期使用無耐受性問題。與所有活性成分相容。" },
          { id: "hyaluronic-acid", name: "玻尿酸 (HA)", ticker: "每日使用", country: "SP", role: "保濕聖品，1g 可吸附 1000g 水分，多分子量組合效果最佳（穿透+鎖水）", marketShare: "多項 RCT", howTo: "選擇含多分子量 HA（小分子穿透 + 大分子鎖水）的精華。濕潤肌膚使用後加蓋封閉劑（乳液、霜）鎖水。乾燥環境需更厚封閉劑。", frequency: "每日早晚", notes: "乾燥環境（飛機、冬季）單獨使用 HA 反而從皮膚吸水致更乾。需配合保濕霜使用。對玻尿酸過敏罕見但可能。" },
          { id: "gentle-cleanse", name: "溫和清潔", ticker: "早晚各一次", country: "HA", role: "避免過度清潔破壞皮脂膜，pH 5.5 弱酸性潔面劑維持正常皮膚微生態", marketShare: "多項 RCT", howTo: "選擇 pH 5-6.5 的潔面劑（避免肥皂的 pH 9-10）。溫水洗臉 30-60 秒，輕柔按摩不搓揉。早晨可僅用水或微膠粒水。", frequency: "早晚各 1 次", notes: "過度清潔（多次、強力產品）破壞皮脂膜導致敏感與發炎。雙重清潔僅適用於有妝、高度防曬日。乾燥肌膚晨間可省略清潔劑。" },
          { id: "squalane", name: "角鯊烷 (Squalane)", ticker: "每日使用", country: "SP", role: "模擬人體天然皮脂成分，輕盈好吸收的封閉型保濕劑，適合所有膚質", marketShare: "觀察性研究", howTo: "選擇 100% 純角鯊烷（從橄欖、甘蔗或米糠萃取）。保濕後最後一步塗抹封閉。少量即可（2-3 滴覆蓋臉部）。也可加入粉底減少乾燥。", frequency: "每日早晚最後一步", notes: "鯊魚來源的角鯊烷已少見（環保問題），選植物來源。氧化穩定性好可長期保存。痘痘肌也可使用（不致粉刺）。" },
        ],
      },
      {
        id: "skin-aesthetics",
        name: "醫美與非侵入療程",
        name_en: "Medical Aesthetics & Non-invasive Treatments",
        keyInfo: "微針療程可增加膠原蛋白合成 400%（研究數據），且恢復期短、風險低",
        marketType: "high_growth",
        companies: [
          { id: "laser", name: "雷射治療", ticker: "每3-6個月", country: "MD", role: "飛梭雷射 (Fractional) 刺激膠原重塑，皮秒雷射處理色素，需專業醫師操作", marketShare: "多項 RCT", howTo: "至專業皮膚科或醫美診所諮詢。常見：飛梭雷射（CO2/Er:YAG）刺激膠原、皮秒雷射處理色素、Fraxel 非剝離型風險較低。一般 3-5 次療程。", frequency: "依機型每 3-6 個月 1 次", notes: "深膚色者反黑風險較高需謹慎。術後嚴格防曬 1-3 個月。台灣自費單次 5000-30000 元。需 7-14 天恢復期。" },
          { id: "microneedling", name: "微針 (Microneedling)", ticker: "每4-6週", country: "MD", role: "1.0-1.5mm 針深刺激真皮層膠原蛋白新生，搭配 PRP 效果更佳", marketShare: "多項 RCT", howTo: "醫療診所進行，可選擇 SkinPen、Dermapen 或 Morpheus8（射頻微針）。一般 3-6 次療程，間隔 4-6 週。家用微針 ≤0.3mm 安全但效果有限。", frequency: "每 4-6 週 1 次，3-6 次為一療程", notes: "皮膚感染、活動性痘痘、孕婦不適合。家用 dermaroller 消毒不當可能感染。術後 24-48 小時敏感，加強保濕與防曬。" },
          { id: "prp-skin", name: "PRP 富血小板血漿", ticker: "每3-6個月", country: "MD", role: "自體血液濃縮生長因子，注射或搭配微針用於皮膚回春與毛髮再生", marketShare: "多項 RCT", howTo: "抽取自體血液離心後，將富含血小板血漿注射入皮膚或搭配微針推入。一般 3-5 次療程，間隔 4-6 週。", frequency: "3-5 次療程，每 4-6 週 1 次", notes: "台灣自費單次 8000-25000 元。可能瘀青、紅腫 3-5 天。血液疾病、感染部位不適合。最新 PRF（富血小板纖維蛋白）效果更持久。" },
          { id: "botox", name: "肉毒桿菌素 (Botox)", ticker: "每3-6個月", country: "MD", role: "放鬆動態皺紋（抬頭紋、魚尾紋），預防性使用可延緩皺紋加深", marketShare: "Meta-analysis", howTo: "至合格醫美診所諮詢，由醫師注射。常見部位：眉間、抬頭紋、魚尾紋、咀嚼肌、頸部。效果 2-3 個月後達高峰，3-6 個月後逐漸消退。", frequency: "每 3-6 個月 1 次", notes: "孕婦、哺乳期、神經肌肉疾病者禁用。劑量過多可能造成「冰凍臉」、眉毛下垂。選擇有皮膚科或整形外科認證醫師。注射後 24 小時內避免按壓。" },
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
          { id: "meditation-stress", name: "冥想練習", ticker: "10-20min/day", country: "HA", role: "MBSR 8 週課程可降低皮質醇 25%、焦慮量表分數 30%，效果持續到課程結束後", marketShare: "Meta-analysis", howTo: "從每日 5 分鐘開始逐步延長至 10-20 分鐘。可使用 app（Calm、Headspace、Insight Timer、潮汐）引導。固定時間（晨起或睡前）建立習慣。", frequency: "每日 10-20 分鐘", notes: "嚴重創傷或精神疾病史者建議在專業引導下進行。初期難以集中為正常現象，重點在持續性。不需「完美」靜止，只需觀察念頭。" },
          { id: "deep-breath-stress", name: "深呼吸 (4-7-8)", ticker: "每日多次", country: "HA", role: "延長吐氣啟動副交感神經，4 秒吸氣-7 秒憋氣-8 秒吐氣，即時降低焦慮", marketShare: "多項 RCT", howTo: "Andrew Weil 4-7-8 法：用鼻吸氣 4 秒 → 閉氣 7 秒 → 用嘴緩慢吐氣 8 秒（發出嘶聲）。重複 4 個循環。坐姿或躺姿皆可。", frequency: "每日 2-4 次，壓力或失眠時可用", notes: "初練可能輕微頭暈為正常，逐漸適應。氣喘急性發作期使用救援吸入器而非呼吸練習。也可嘗試方框呼吸（4-4-4-4）。" },
          { id: "nature-exposure", name: "自然暴露", ticker: "120min/週", country: "HA", role: "每週 2 小時以上自然環境接觸可顯著降低皮質醇與血壓（日本森林浴研究）", marketShare: "多項 RCT", howTo: "每週累計 120 分鐘在公園、森林、海邊、山區。可分次（每日 20 分鐘）或集中（週末 2 小時）。日本「森林浴」概念：用五感體驗自然。", frequency: "每週 120 分鐘以上", notes: "都市公園也有效，不必到偏遠自然。手機放下、不戴耳機，專注五感體驗。森林浴有正式療程培訓。" },
          { id: "exercise-stress", name: "規律運動", ticker: "30min/day", country: "EX", role: "運動釋放腦內啡與內源性大麻素，等效於低劑量抗焦慮藥物", marketShare: "Meta-analysis", howTo: "中等強度有氧運動效果最佳：快走、慢跑、騎車、游泳。每次至少 20-30 分鐘達到「runner's high」效果。配合阻力訓練效果加成。", frequency: "每日 30 分鐘或每週 150 分鐘", notes: "過度運動（每週>10 小時高強度）反而升高皮質醇。憂鬱症患者可從每日 10 分鐘步行開始，建立成就感。" },
        ],
      },
      {
        id: "mental-mindfulness",
        name: "冥想與正念",
        name_en: "Meditation & Mindfulness",
        keyInfo: "正念冥想可增加前額葉皮質灰質密度、縮小杏仁核（恐懼中樞），8 週 MBSR 即有結構性腦部變化",
        marketType: "monopoly",
        companies: [
          { id: "mbsr", name: "正念減壓 (MBSR)", ticker: "8週課程", country: "HA", role: "Jon Kabat-Zinn 開發的標準化課程，數千項研究支持其改善壓力、焦慮與慢性疼痛", marketShare: "Meta-analysis", howTo: "8 週標準化團體課程，每週 2.5 小時 + 全日靜修 + 每日 45 分鐘家庭作業。台灣可在華人正念減壓中心、各大醫院身心科找到課程。", frequency: "8 週完整課程 + 終生實踐", notes: "需投入大量時間，建議認真考慮後參加。對慢性疼痛、焦慮、憂鬱效果最強。線上 MBSR 課程也已驗證有效。" },
          { id: "vipassana", name: "內觀冥想 (Vipassana)", ticker: "每日練習", country: "HA", role: "觀察身體感受的古老技法，培養不反應的覺察力，10 日課程為入門體驗", marketShare: "觀察性研究", howTo: "可參加 10 日靜默課程（dhamma.org 全球免費課程，台灣有中部與北部中心）。在家可從每日 30 分鐘觀察呼吸與身體感受開始。", frequency: "首次 10 日課程，之後每日 1-2 小時", notes: "10 日課程強度極高（每日 10 小時靜坐 + 完全靜默），嚴重精神疾病史者不建議參加。每年回訪短期課程強化練習。" },
          { id: "daily-meditation", name: "每日靜坐", ticker: "10-20min/day", country: "HA", role: "持續性比時間長度重要，每日 10 分鐘比偶爾 1 小時更有效，app 輔助入門", marketShare: "多項 RCT", howTo: "選擇 app（Calm、Headspace、Insight Timer、潮汐）或計時器。固定時間（晨起或睡前）建立習慣。從 5 分鐘開始逐步延長。", frequency: "每日 10-20 分鐘", notes: "不需「成功靜止」念頭，而是觀察念頭。錯過一天無妨繼續即可。坐姿不必盤腿，舒適最重要。" },
          { id: "body-scan", name: "身體掃描 (Body Scan)", ticker: "10-20min", country: "HA", role: "系統性掃描全身感受，提升身體覺察與放鬆反應，特別適合睡前練習", marketShare: "多項 RCT", howTo: "躺姿閉眼，從腳趾開始逐步掃描全身感受到頭頂，每個部位停留 10-30 秒觀察感覺（緊繃、溫度、放鬆等）。可使用引導音檔。", frequency: "每日 1 次，特別建議睡前", notes: "睡前練習可能直接入睡是正常現象。慢性疼痛者可能會增加疼痛覺察，需在治療師引導下進行。" },
        ],
      },
      {
        id: "mental-breathwork",
        name: "呼吸訓練法",
        name_en: "Breathwork Techniques",
        keyInfo: "Stanford 2023 研究：每日 5 分鐘循環嘆息呼吸法 (cyclic sighing) 效果優於冥想改善情緒與焦慮",
        marketType: "oligopoly",
        companies: [
          { id: "box-breathing", name: "方框呼吸法", ticker: "4-4-4-4", country: "HA", role: "美國海軍 SEAL 使用的壓力調節法：吸 4 秒-憋 4 秒-吐 4 秒-憋 4 秒，立即鎮靜", marketShare: "多項 RCT", howTo: "舒適坐姿，閉眼或注視點。鼻吸 4 秒 → 閉氣 4 秒 → 嘴吐 4 秒 → 閉氣 4 秒。重複 4-8 個循環。可隨身應用於壓力場合。", frequency: "壓力時即刻使用，每日 1-2 次預防", notes: "閉氣可能造成不適，可從 3-3-3-3 開始適應。氣喘、嚴重心血管疾病者諮詢醫師。可使用 app 引導（Calm、Breathe）。" },
          { id: "wim-hof", name: "Wim Hof 呼吸法", ticker: "每日練習", country: "HA", role: "30 次快速過度換氣 + 憋氣，可主動影響免疫與發炎反應（Radboud 大學 RCT）", marketShare: "多項 RCT", howTo: "深快呼吸 30 次（不需強迫）→ 吐盡氣後憋氣至自然吸氣衝動 → 大吸後憋 15 秒。重複 3-4 輪。使用 Wim Hof Method app 引導。", frequency: "每日 1 次，晨間空腹進行", notes: "禁忌：心血管疾病、未控制癲癇、孕婦、嚴重精神疾病。絕對禁止在水中或開車時練習（可能昏厥）。安全環境下練習。" },
          { id: "cyclic-sighing", name: "循環嘆息法", ticker: "5min/day", country: "HA", role: "雙吸一吐（short-short-long），Stanford 研究顯示每日 5 分鐘即可降低焦慮", marketShare: "多項 RCT", howTo: "鼻深吸 → 再短吸（補滿肺部）→ 嘴緩慢延長吐氣（盡量長）。重複循環 5 分鐘。Stanford Andrew Huberman 研究最有效的呼吸法。", frequency: "每日 5 分鐘", notes: "比冥想效果更好但時間更短，適合忙碌者入門。可在會議前、壓力情境前快速使用。手機鬧鐘提醒每日固定時間練習。" },
          { id: "nasal-breathing", name: "鼻呼吸", ticker: "全天候", country: "HA", role: "鼻腔產生一氧化氮、過濾空氣、增加血氧效率，改為鼻呼吸是基礎中的基礎", marketShare: "多項 RCT", howTo: "日常注意嘴閉合，全程鼻呼吸。睡眠時可使用 mouth tape 訓練（如 SomniFix）防止張嘴。運動時也盡量鼻呼吸（漸進訓練）。", frequency: "全天候，包括睡眠", notes: "鼻塞、鼻中隔彎曲、阻塞性睡眠呼吸中止症者需先處理結構問題。Mouth tape 不適合呼吸道阻塞、嚴重鼻炎者。" },
        ],
      },
      {
        id: "mental-resilience",
        name: "情緒韌性",
        name_en: "Emotional Resilience",
        keyInfo: "認知行為療法 (CBT) 改善焦慮與憂鬱的效果等同於藥物治療，且復發率更低",
        marketType: "oligopoly",
        companies: [
          { id: "cbt", name: "認知行為療法 (CBT)", ticker: "12-16 次", country: "MD", role: "辨識與修正認知扭曲的標準化心理治療，最多 RCT 支持的心理療法", marketShare: "Meta-analysis", howTo: "預約精神科或臨床心理師（具 CBT 訓練）。一般 12-16 次療程，每週 1 次 50 分鐘。家庭作業（紀錄思考、行為實驗）是關鍵。", frequency: "每週 1 次 × 12-16 週", notes: "台灣心理諮商自費約 2000-4000 元/次。健保精神科可能限時。線上 CBT app（Woebot、MindShift）為入門選項。失調期建議專業協助。" },
          { id: "journaling", name: "日記書寫", ticker: "每日 10min", country: "HA", role: "表達性寫作降低反芻思考，感恩日記提升正向情緒與生活滿意度", marketShare: "多項 RCT", howTo: "選擇實體日記本（手寫效果優於打字）。每日 10-15 分鐘自由書寫情緒、想法、事件。可使用結構化提示：今日 3 件好事、最大挑戰、感恩對象、明日意圖。", frequency: "每日 10-15 分鐘，固定時間", notes: "表達性寫作初期可能感覺糟糕（重新體驗壓力），長期效益顯著。隱私是關鍵，需安全保存或燒毀。" },
          { id: "gratitude", name: "感恩練習", ticker: "每日 3 件事", country: "HA", role: "每日記錄 3 件感恩事項可在 6 週內提升幸福感 25%，改變大腦正向偏向", marketShare: "多項 RCT", howTo: "每日睡前寫下 3 件具體感恩事項（不可重複、具體越好）。每週寫一封感恩信給某人（不需寄出）。可用 Day One、5-Minute Journal app。", frequency: "每日 3 件，連續 6 週見效", notes: "需具體（「感謝陽光」<「感謝今天午餐遇到老朋友」）。重複空泛內容會降低效果。憂鬱症急性期可能感受不到，需先治療。" },
          { id: "cold-mental", name: "冷暴露", ticker: "2-3min 冷水淋浴", country: "HA", role: "有意識地面對不適建立壓力耐受力，釋放正腎上腺素提升警覺與情緒", marketShare: "多項 RCT", howTo: "從溫水淋浴最後 30 秒冷水開始，逐步延長至 2-3 分鐘冷水。或冰浴 10-15°C 浸泡 2-4 分鐘。重點是「有意識地呼吸」面對不適。", frequency: "每週 3-4 次，累計 11 分鐘", notes: "心血管疾病、未控制高血壓、雷諾氏症、孕婦先諮詢醫師。從短時間開始耐受。冷水後不要立即進入熱水（血管反應劇烈）。" },
        ],
      },
      {
        id: "mental-supplements",
        name: "助眠與抗焦慮補充品",
        name_en: "Calming & Anti-anxiety Supplements",
        keyInfo: "L-茶胺酸 200mg 可在 30 分鐘內增加 alpha 腦波活動，產生放鬆但不嗜睡的效果",
        marketType: "high_growth",
        companies: [
          { id: "l-theanine", name: "L-茶胺酸 (L-Theanine)", ticker: "200-400mg/day", country: "SP", role: "綠茶活性胺基酸，跨越血腦屏障促進 alpha 腦波、GABA 與多巴胺合成", marketShare: "多項 RCT", howTo: "選擇 Suntheanine 專利純度 L-isomer，焦慮時或睡前服用 200-400mg。可配合咖啡因（100mg L-theanine + 50mg 咖啡因比例）平衡專注與放鬆。", frequency: "焦慮或睡前 200-400mg", notes: "幾乎無副作用與依賴性。服用降血壓藥者可能加成降壓效果。可長期使用。" },
          { id: "ashwagandha-anxiety", name: "南非醉茄 (Ashwagandha)", ticker: "300-600mg/day", country: "SP", role: "降低皮質醇 28%、焦慮量表分數 44%（KSM-66 萃取物 RCT），適應原草藥之王", marketShare: "多項 RCT", howTo: "選擇 KSM-66 或 Sensoril 標準化萃取物。每日 300-600mg 分早晚或睡前服用。連續服用 4-8 週評估效果。", frequency: "每日 300-600mg，分 1-2 次", notes: "甲狀腺亢進、自體免疫疾病、孕婦、哺乳期避免。可能與鎮靜劑、甲狀腺藥物交互作用。建議週期使用 8-12 週後停 2-4 週。" },
          { id: "gaba", name: "GABA (γ-氨基丁酸)", ticker: "100-750mg/day", country: "SP", role: "主要抑制性神經傳導物質，口服 GABA 是否穿越血腦屏障仍有爭議，但仍有鎮靜報告", marketShare: "觀察性研究", howTo: "選擇 PharmaGABA（自然發酵製成）較有研究支持。空腹服用 100-200mg，焦慮或睡前使用。可配 L-theanine 或 magnesium 效果加成。", frequency: "焦慮或睡前 100-750mg", notes: "高劑量可能呼吸短促、刺痛感（無害但不適）。理論上效果可能因人而異（血腦屏障穿透性爭議）。罕見頭痛、嗜睡。" },
          { id: "cbd", name: "CBD (大麻二酚)", ticker: "25-50mg/day", country: "SP", role: "非精神活性大麻成分，調節內源性大麻素系統，改善焦慮與睡眠品質", marketShare: "多項 RCT", howTo: "選擇全光譜（含微量 THC <0.3%）或廣譜 CBD 油，舌下含 60-90 秒提升吸收。從低劑量 10-25mg 開始逐步增加。焦慮 25-75mg、睡眠 25-50mg 睡前。", frequency: "每日 1-2 次，焦慮或睡前", notes: "台灣 CBD 為禁藥需自行從合法國家攜帶（規範複雜需確認）。可能與多種藥物（warfarin、抗癲癇藥、肝代謝藥）交互作用。" },
          { id: "magnesium-anxiety", name: "鎂 (Magnesium)", ticker: "400mg/day", country: "SP", role: "缺鎂與焦慮正相關，甘胺酸鎂形式同時提供鎂與甘胺酸的鎮靜效果", marketShare: "Meta-analysis", howTo: "選擇甘胺酸鎂（吸收佳+助眠），睡前 30-60 分鐘服用 200-400mg 元素鎂。焦慮急性發作可加 L-茶胺酸或南非醉茄協同。", frequency: "每日 400mg 元素鎂，睡前", notes: "腎功能不全慎用。氧化鎂吸收率僅 4%。可能與抗生素（喹諾酮類、四環素）、雙磷酸鹽藥物交互作用，需間隔 2-4 小時。" },
        ],
      },
    ],
  },
  // ============================================================
  // hw/ai_power — AI 能源與電力供應鏈
  // ============================================================
  {
    id: "ai_power",
    slug: "ai_power",
    category: "hw",
    name: "AI 能源與電力供應鏈",
    name_en: "AI Power & Energy Supply Chain",
    description:
      "涵蓋資料中心電力來源、輸配電、UPS、液冷、儲能與綠電認證的完整供應鏈，AI 算力擴張驅動全球電力結構重塑。",
    icon: "⚡",
    color: "#facc15",
    flowSummary: "電力生成 → 輸配電 → 資料中心 UPS → 冷卻系統 → 算力負載",
    sections: [
      {
        id: "aipower-demand-overview",
        name: "AI 電力需求總覽",
        name_en: "AI Power Demand Overview",
        keyInfo: "2025 全球資料中心耗電將達 460 TWh，2030 預估突破 1000 TWh，主要由 AI 推升",
        marketType: "high_growth",
        companies: [
          { id: "microsoft", name: "Microsoft", ticker: "MSFT", country: "US", role: "全球最大 AI 資料中心電力買家，累計 PPA 超過 30GW" },
          { id: "google", name: "Google", ticker: "GOOGL", country: "US", role: "PPA 累計 22GW，2030 達成 24/7 carbon-free 目標" },
          { id: "amazon", name: "Amazon", ticker: "AMZN", country: "US", role: "AWS 全球 PPA 超過 28GW，全球最大企業綠電買家" },
          { id: "meta", name: "Meta", ticker: "META", country: "US", role: "PPA 累計 12GW，自建大型超級資料中心電力需求暴增" },
        ],
        relationships: [
          "Hyperscaler 四大公司 (MSFT/GOOGL/AMZN/META) 合計 PPA 規模超過 90GW，佔全球企業 PPA 一半以上",
          "AI 訓練負載推升單一園區用電從 100MW 級跳升至 1GW 級",
          "電力短缺成為 AI 資料中心擴張最大瓶頸，超越晶片供給",
        ],
      },
      {
        id: "aipower-nuclear-smr",
        name: "核能 SMR 小型模組化反應爐",
        name_en: "Nuclear SMR",
        keyInfo: "Microsoft 與 Constellation 簽署 20 年核電 PPA，Three Mile Island 重啟",
        marketType: "emerging",
        companies: [
          { id: "constellation", name: "Constellation Energy", ticker: "CEG", country: "US", role: "美國最大核電業者，與 MSFT 簽 PPA 重啟 Three Mile Island" },
          { id: "vistra", name: "Vistra", ticker: "VST", country: "US", role: "持有 Comanche Peak、Perry 核電廠，AI 資料中心電力供應商" },
          { id: "nuscale", name: "NuScale Power", ticker: "SMR", country: "US", role: "模組化小型反應爐 (SMR) 領導者，首家獲 NRC 認證" },
          { id: "oklo", name: "Oklo", ticker: "OKLO", country: "US", role: "Sam Altman 投資的 SMR 新創，Aurora 微型反應爐" },
          { id: "bwxt", name: "BWX Technologies", ticker: "BWXT", country: "US", role: "核燃料與反應爐製造，美國海軍核反應爐獨家供應" },
          { id: "cameco", name: "Cameco", ticker: "CCJ", country: "CA", role: "全球最大鈾礦商之一，受惠核電復興" },
        ],
        relationships: [
          "Constellation 與 Vistra 為既有核電廠商，受惠 AI PPA 帶來的長期穩定收益",
          "NuScale 與 Oklo 代表新世代 SMR 技術，目標 2028-2030 商業化部署",
          "BWXT 與 Cameco 分別供應核反應爐與核燃料，為核電復興的上游受惠者",
        ],
      },
      {
        id: "aipower-gas-turbine",
        name: "天然氣發電與燃氣輪機",
        name_en: "Natural Gas & Gas Turbines",
        keyInfo: "天然氣發電佔美國新增電力裝置 60%，AI 資料中心電源首選",
        marketType: "oligopoly",
        companies: [
          { id: "ge_vernova", name: "GE Vernova", ticker: "GEV", country: "US", role: "燃氣輪機全球龍頭，市佔超過 50%" },
          { id: "siemens_energy", name: "Siemens Energy", ticker: "ENR.DE", country: "DE", role: "大型燃氣與蒸汽輪機，HL 級燃氣輪機領導" },
          { id: "mhi", name: "Mitsubishi Heavy Industries", ticker: "7011.T", country: "JP", role: "日本燃氣輪機龍頭，JAC 級高效燃氣輪機" },
          { id: "caterpillar", name: "Caterpillar", ticker: "CAT", country: "US", role: "緊急發電機與柴油發電，資料中心備用電源" },
        ],
        relationships: [
          "GE Vernova、Siemens Energy、MHI 三家壟斷大型燃氣輪機市場 (>90%)",
          "燃氣輪機交期已延長至 5-7 年，成為資料中心擴張新瓶頸",
          "Caterpillar 為資料中心備用發電市場主力，市佔超過 40%",
        ],
      },
      {
        id: "aipower-renewable-ppa",
        name: "再生能源 PPA",
        name_en: "Renewable PPA",
        keyInfo: "Hyperscaler 簽 PPA 累計達 100GW+，太陽能與風電為主",
        marketType: "high_growth",
        companies: [
          { id: "nextera", name: "NextEra Energy", ticker: "NEE", country: "US", role: "美國最大再生能源業者，風電與太陽能領導" },
          { id: "brookfield_renew", name: "Brookfield Renewable", ticker: "BEPC", country: "US", role: "全球水電與再生能源，與 MSFT 簽 10.5GW 大單" },
          { id: "iberdrola", name: "Iberdrola", ticker: "IBE.MC", country: "ES", role: "歐洲再生能源領導，全球風電龍頭之一" },
          { id: "first_solar", name: "First Solar", ticker: "FSLR", country: "US", role: "美國太陽能模組龍頭，CdTe 薄膜技術獨家" },
        ],
        relationships: [
          "NextEra 為美國 PPA 市場份額最大供應商，主要客戶為 Hyperscaler",
          "Brookfield 與 Microsoft 簽署的 10.5GW PPA 為史上最大企業綠電交易",
          "First Solar 為 Hyperscaler 太陽能採購首選，美國本地產能優勢明顯",
        ],
      },
      {
        id: "aipower-grid-infra",
        name: "電網與輸配電基礎設施",
        name_en: "Grid & T&D Infrastructure",
        keyInfo: "美國電網投資需 2 兆美元現代化才能支撐 AI 負載",
        marketType: "oligopoly",
        companies: [
          { id: "quanta", name: "Quanta Services", ticker: "PWR", country: "US", role: "電力工程與輸電建設龍頭，最大電網承包商" },
          { id: "myrg", name: "MYR Group", ticker: "MYRG", country: "US", role: "輸配電基礎設施工程，受惠電網現代化" },
          { id: "hubbell", name: "Hubbell", ticker: "HUBB", country: "US", role: "電力產品與電網組件，配電變壓器與絕緣子" },
          { id: "eaton", name: "Eaton", ticker: "ETN", country: "US", role: "電網組件與配電設備，資料中心配電解決方案" },
        ],
        relationships: [
          "Quanta Services 與 MYR Group 為美國電網工程承包雙雄，受惠 IRA 與電網投資潮",
          "Hubbell 與 Eaton 提供電網設備硬體，變壓器交期已延長至 2-3 年",
          "電網瓶頸使新資料中心併網等待時間從 1 年延長至 5-7 年",
        ],
      },
      {
        id: "aipower-ups",
        name: "資料中心 UPS 不斷電系統",
        name_en: "Data Center UPS",
        keyInfo: "Vertiv 在 AI 資料中心 UPS 市佔 30%，鋰電 UPS 加速取代鉛酸",
        marketType: "oligopoly",
        companies: [
          { id: "vertiv", name: "Vertiv", ticker: "VRT", country: "US", role: "資料中心關鍵基礎設施龍頭，UPS 市佔約 30%", marketShare: "~30%" },
          { id: "schneider", name: "Schneider Electric", ticker: "SU.PA", country: "FR", role: "APC 品牌 UPS，資料中心整體解決方案", marketShare: "~25%" },
          { id: "eaton", name: "Eaton", ticker: "ETN", country: "US", role: "工業級 UPS 與電力管理系統", marketShare: "~15%" },
          { id: "abb", name: "ABB", ticker: "ABBNY", country: "CH", role: "電力管理與工業級 UPS" },
        ],
        relationships: [
          "Vertiv、Schneider、Eaton 三家合計掌握 AI 資料中心 UPS 約 70% 市場",
          "鋰電 UPS 成為新趨勢，能量密度為鉛酸 3 倍且壽命長 2-3 倍",
          "AI 機櫃功率密度推升 UPS 容量需求，3-5MW 模組化 UPS 為主流",
        ],
      },
      {
        id: "aipower-liquid-cooling",
        name: "液冷與浸沒式散熱",
        name_en: "Liquid & Immersion Cooling",
        keyInfo: "GB200 NVL72 機櫃 132kW，必須採用液冷，2025 液冷市場規模 $20B",
        marketType: "high_growth",
        companies: [
          { id: "vertiv", name: "Vertiv", ticker: "VRT", country: "US", role: "CDU 冷卻分配單元領導，與 NVIDIA 深度合作" },
          { id: "kaori", name: "高力熱處理", ticker: "8996.TW", country: "TW", role: "台廠液冷散熱領導，板式熱交換器主力" },
          { id: "auras", name: "雙鴻", ticker: "3324.TW", country: "TW", role: "散熱模組龍頭，CDU 與冷板供應商" },
          { id: "asia_vital", name: "奇鋐", ticker: "3017.TW", country: "TW", role: "散熱解決方案，AI 伺服器冷板與 VC 散熱" },
          { id: "modine", name: "Modine Manufacturing", ticker: "MOD", country: "US", role: "工業冷卻與資料中心 CRAH 系統" },
          { id: "munters", name: "Munters", ticker: "MTRS.ST", country: "SE", role: "精密空調與資料中心氣流管理" },
        ],
        relationships: [
          "Vertiv 為 NVIDIA GB200 機櫃 CDU 主要供應商，市佔超過 30%",
          "台廠 (高力/雙鴻/奇鋐) 在冷板與散熱模組環節領先全球",
          "液冷取代風冷已成 AI 資料中心標配，2025-2030 CAGR 預估 40%+",
        ],
      },
      {
        id: "aipower-power-conversion",
        name: "配電與電源轉換",
        name_en: "Power Distribution & Conversion",
        keyInfo: "AI 機櫃從 12VDC 轉向 48VDC 甚至 800VDC，效率提升 5-10%",
        marketType: "oligopoly",
        companies: [
          { id: "mps", name: "Monolithic Power Systems", ticker: "MPWR", country: "US", role: "DC-DC 電源管理 IC 龍頭，NVIDIA GPU 電源主力" },
          { id: "vicor", name: "Vicor", ticker: "VICR", country: "US", role: "高密度電源模組，48V 直接供電技術領導" },
          { id: "eaton", name: "Eaton", ticker: "ETN", country: "US", role: "配電盤與母線，資料中心配電解決方案" },
          { id: "delta", name: "台達電", ticker: "2308.TW", country: "TW", role: "工業電源與資料中心電源，全球伺服器電源龍頭" },
        ],
        relationships: [
          "MPS 為 NVIDIA Blackwell GPU 電源管理 IC 主力供應商",
          "Vicor 與台達電在 48V 高效電源轉換領域競爭，效率達 96%+",
          "800VDC 配電架構為 NVIDIA 下世代機櫃方向，將大幅減少銅線用量",
        ],
      },
      {
        id: "aipower-bess",
        name: "儲能系統 BESS",
        name_en: "Battery Energy Storage",
        keyInfo: "資料中心 BESS 部署將從 2024 5GWh 增至 2030 50GWh+",
        marketType: "high_growth",
        companies: [
          { id: "fluence", name: "Fluence Energy", ticker: "FLNC", country: "US", role: "大型儲能系統整合龍頭，AES 與西門子合資" },
          { id: "tesla", name: "Tesla", ticker: "TSLA", country: "US", role: "Megapack 大型儲能，2024 部署超過 30GWh" },
          { id: "stem", name: "Stem", ticker: "STEM", country: "US", role: "AI 智慧儲能優化平台，Athena 軟體" },
          { id: "catl", name: "CATL", ticker: "300750.SZ", country: "CN", role: "全球最大電池廠，儲能電芯市佔超過 40%" },
        ],
        relationships: [
          "Tesla Megapack 與 Fluence 為大型 BESS 系統整合雙雄",
          "CATL 為全球儲能電芯主導供應商，下游客戶包括 Tesla、Fluence",
          "AI 資料中心採用 BESS 平衡再生能源間歇性，並提供瞬時備用電力",
        ],
      },
      {
        id: "aipower-pue-greentech",
        name: "PUE 效率與綠電認證",
        name_en: "PUE & Green Power Certification",
        keyInfo: "Hyperscaler 平均 PUE 1.15，目標 1.10，每降 0.01 可省 1-2 億美元/年",
        marketType: "low_growth",
        companies: [
          { id: "microsoft", name: "Microsoft Azure", ticker: "MSFT", country: "US", role: "100% 再生能源承諾，2030 carbon negative 目標" },
          { id: "google", name: "Google Cloud", ticker: "GOOGL", country: "US", role: "24/7 carbon-free 能源目標，2030 達成全時段綠電" },
          { id: "equinix", name: "Equinix", ticker: "EQIX", country: "US", role: "資料中心 REIT 龍頭，再生能源使用率超過 96%" },
        ],
        relationships: [
          "Microsoft 與 Google 引領 24/7 carbon-free 能源標準，推動 PPA 結構創新",
          "Equinix 為全球最大資料中心 REIT，綠電比例領先業界",
          "PUE 與綠電比例已成 Hyperscaler ESG 核心 KPI，影響 PPA 採購決策",
        ],
      },
    ],
  },
  // ============================================================
  // hw/space_ai — 太空 AI 伺服器與軌道運算
  // ============================================================
  {
    id: "space_ai",
    slug: "space_ai",
    category: "hw",
    name: "太空 AI 伺服器與軌道運算",
    name_en: "Space-based AI Computing",
    description:
      "涵蓋商業火箭發射、衛星星座、軌道資料中心、太空通訊與抗輻射晶片的太空 AI 供應鏈，為終極無碳算力解方。",
    icon: "🛰️",
    color: "#7c3aed",
    flowSummary: "火箭發射 → 軌道部署 → 太陽能供電 → 軌道運算 → 雷射通訊回傳",
    sections: [
      {
        id: "spaceai-concept-market",
        name: "太空運算概念與市場",
        name_en: "Space Computing Concept",
        keyInfo: "Starcloud 計畫 2030 部署 5GW 軌道資料中心，運算能源無碳化終極解方",
        marketType: "emerging",
        companies: [
          { id: "starcloud", name: "Starcloud", ticker: "Private", country: "US", role: "軌道資料中心新創，2025 已發射首批測試衛星" },
          { id: "lonestar", name: "Lonestar Data Holdings", ticker: "Private", country: "US", role: "月球資料中心概念，2024 完成首次月面資料儲存測試" },
          { id: "axiom_space", name: "Axiom Space", ticker: "Private", country: "US", role: "商業太空站營運商，ISS 接班計畫主導者" },
          { id: "sierra_space", name: "Sierra Space", ticker: "Private", country: "US", role: "Dream Chaser 太空飛機與 Orbital Reef 太空站" },
        ],
        relationships: [
          "Starcloud 與 Lonestar 代表軌道與月面資料中心兩種路線",
          "Axiom 與 Sierra Space 競逐 ISS 退役後的商業太空站市場",
          "軌道資料中心核心邏輯：免費太陽能 + 無冷卻成本 + 無碳排放",
        ],
      },
      {
        id: "spaceai-launch-services",
        name: "商業火箭發射服務",
        name_en: "Commercial Launch Services",
        keyInfo: "SpaceX Starship 載荷 100+ 噸，將大幅降低軌道資料中心部署成本",
        marketType: "oligopoly",
        companies: [
          { id: "spacex", name: "SpaceX", ticker: "Private", country: "US", role: "Falcon 9/Starship，全球發射主導，市佔超過 85%", marketShare: "~85%" },
          { id: "rocket_lab", name: "Rocket Lab", ticker: "RKLB", country: "US", role: "小型衛星發射 Electron + Neutron 中型火箭" },
          { id: "blue_origin", name: "Blue Origin", ticker: "Private", country: "US", role: "New Glenn 重型火箭，Bezos 個人投資" },
          { id: "astra", name: "Astra Space", ticker: "ASTR", country: "US", role: "小型衛星發射服務" },
        ],
        relationships: [
          "SpaceX 在全球發射市場壟斷地位，2024 完成 134 次發射創紀錄",
          "Rocket Lab 與 Blue Origin 為次要競爭者，主打不同酬載級距",
          "Starship 商業化將使每公斤入軌成本降至 $100 以下 (vs. Falcon 9 $2700)",
        ],
      },
      {
        id: "spaceai-satellite-constellation",
        name: "商業衛星星座",
        name_en: "Satellite Constellations",
        keyInfo: "全球低軌衛星 2030 將達 5 萬顆，Starlink 佔 60%+",
        marketType: "oligopoly",
        companies: [
          { id: "starlink", name: "SpaceX Starlink", ticker: "Private", country: "US", role: "7000+ 顆衛星，全球頻寬服務", marketShare: "~60%" },
          { id: "amazon", name: "Amazon Project Kuiper", ticker: "AMZN", country: "US", role: "3236 顆衛星規劃，2024 開始部署" },
          { id: "oneweb", name: "Eutelsat OneWeb", ticker: "ETL.PA", country: "FR", role: "648 顆衛星完成部署，企業與政府用戶" },
          { id: "iridium", name: "Iridium Communications", ticker: "IRDM", country: "US", role: "66 顆衛星全球覆蓋，L 頻段通訊服務" },
        ],
        relationships: [
          "Starlink 為全球低軌衛星壟斷者，營收 2024 突破 $100 億",
          "Amazon Kuiper 為 Starlink 主要挑戰者，預計 2026 商業化",
          "OneWeb 與 Iridium 在企業與 IoT 市場與 Starlink 競爭",
        ],
      },
      {
        id: "spaceai-optical-comms",
        name: "太空通訊與光通訊",
        name_en: "Space & Optical Communications",
        keyInfo: "雷射星際鏈路頻寬 10-100Gbps，取代傳統 RF 通訊",
        marketType: "high_growth",
        companies: [
          { id: "asts", name: "AST SpaceMobile", ticker: "ASTS", country: "US", role: "衛星直連手機，BlueBird 衛星陣列" },
          { id: "mynaric", name: "Mynaric", ticker: "MYNA.DE", country: "DE", role: "雷射通訊終端領導，CONDOR Mk3 OISL 終端" },
          { id: "iridium", name: "Iridium", ticker: "IRDM", country: "US", role: "衛星通訊基礎設施，全球 L 頻段服務" },
        ],
        relationships: [
          "Mynaric 為 SDA Transport Layer 主要雷射通訊終端供應商",
          "AST SpaceMobile 開創衛星直連 4G/5G 手機新市場",
          "光學星際鏈路 (OISL) 為 2030 後低軌星座標配技術",
        ],
      },
      {
        id: "spaceai-radhard-chip",
        name: "抗輻射晶片與運算",
        name_en: "Rad-hard Chips",
        keyInfo: "Rad-hard 晶片需通過 100krad+ 輻射測試，價格為一般晶片 50-100 倍",
        marketType: "oligopoly",
        companies: [
          { id: "bae_systems", name: "BAE Systems", ticker: "BAESY", country: "UK", role: "RAD750 處理器，火星車與深空任務首選" },
          { id: "mchp", name: "Microchip Technology", ticker: "MCHP", country: "US", role: "太空級 FPGA 與 MCU，RTG4 FPGA 領導" },
          { id: "ti", name: "Texas Instruments", ticker: "TXN", country: "US", role: "太空級 Analog 與電源 IC" },
          { id: "cobham", name: "Cobham", ticker: "Private", country: "UK", role: "太空電子元件與抗輻射 ASIC" },
          { id: "macronix", name: "旺宏", ticker: "2337.TW", country: "TW", role: "ROM 與太空級記憶體，NASA 火星車供應商" },
        ],
        relationships: [
          "BAE Systems RAD750 為 NASA 深空任務主力處理器超過 20 年",
          "Microchip 與 TI 為太空級 IC 大宗供應商，產品線涵蓋廣",
          "旺宏為亞洲唯一獲 NASA 認證的太空級 ROM 供應商",
        ],
      },
      {
        id: "spaceai-solar-power",
        name: "衛星電源與太陽能",
        name_en: "Satellite Power & Solar",
        keyInfo: "太空級 GaAs 太陽能板效率 32%+，遠高於地面矽晶 22%",
        marketType: "oligopoly",
        companies: [
          { id: "maxar", name: "Maxar Technologies", ticker: "Private", country: "US", role: "太空電源與平台，1300/SSL 系列衛星平台" },
          { id: "northrop", name: "Northrop Grumman", ticker: "NOC", country: "US", role: "衛星電源系統與大型衛星平台製造" },
          { id: "rocket_lab", name: "Rocket Lab (SolAero)", ticker: "RKLB", country: "US", role: "SolAero 太空太陽能板，市佔超過 50%" },
          { id: "sierra_space", name: "Sierra Space", ticker: "Private", country: "US", role: "軌道電源系統與太空站模組" },
        ],
        relationships: [
          "Rocket Lab 透過收購 SolAero 進入太空太陽能板市場，市佔過半",
          "Maxar 與 Northrop 為傳統衛星平台與電源整合龍頭",
          "三接面 GaAs 太陽能板為太空主流技術，效率約 32-34%",
        ],
      },
      {
        id: "spaceai-edge-compute",
        name: "太空 AI 邊緣運算",
        name_en: "Space-based Edge AI",
        keyInfo: "NVIDIA Jetson Orin 在 ISS 部署，HPE Spaceborne Computer-2 商業化",
        marketType: "emerging",
        companies: [
          { id: "nvidia", name: "NVIDIA", ticker: "NVDA", country: "US", role: "Jetson Orin 邊緣 AI 平台，已在 ISS 與商業衛星部署" },
          { id: "hpe", name: "Hewlett Packard Enterprise", ticker: "HPE", country: "US", role: "Spaceborne Computer-2 商業化軌道伺服器" },
          { id: "amazon", name: "AWS Snowcone", ticker: "AMZN", country: "US", role: "太空級邊緣運算，AWS Snowcone 已在 ISS 測試" },
          { id: "intel", name: "Intel", ticker: "INTC", country: "US", role: "衛星端 FPGA 與 Movidius VPU" },
        ],
        relationships: [
          "NVIDIA Jetson 為衛星端 AI 推論主流硬體，已在多項商業任務部署",
          "HPE Spaceborne 開創軌道商業運算服務，COTS 元件直接上太空",
          "AWS 與 Azure 拓展軌道雲端服務，與 Hyperscaler 地面服務整合",
        ],
      },
      {
        id: "spaceai-defense-gov",
        name: "國防與政府太空",
        name_en: "Defense & Government Space",
        keyInfo: "美國太空軍 2025 預算 $30B，AI 為核心任務",
        marketType: "oligopoly",
        companies: [
          { id: "lockheed", name: "Lockheed Martin", ticker: "LMT", country: "US", role: "軍用衛星與飛彈防禦系統" },
          { id: "northrop", name: "Northrop Grumman", ticker: "NOC", country: "US", role: "機密太空計畫與大型偵察衛星" },
          { id: "l3harris", name: "L3Harris", ticker: "LHX", country: "US", role: "太空通訊與感測，SDA Tracking Layer 主力" },
          { id: "booz_allen", name: "Booz Allen Hamilton", ticker: "BAH", country: "US", role: "太空 AI 顧問與系統整合" },
          { id: "palantir", name: "Palantir", ticker: "PLTR", country: "US", role: "太空資料分析平台，與太空軍合作 MAVEN" },
        ],
        relationships: [
          "Lockheed、Northrop 為傳統軍用太空系統雙雄，承接機密大型衛星",
          "L3Harris 在中小型衛星與感測器領域擴張，SDA 主要承包商",
          "Palantir 與 Booz Allen 主導太空 AI 軟體與決策支援系統",
        ],
      },
      {
        id: "spaceai-insurance-commercial",
        name: "太空保險與商業應用",
        name_en: "Space Insurance & Commercial Apps",
        keyInfo: "全球太空經濟 2024 $570B，2030 預估突破 $1T",
        marketType: "emerging",
        companies: [
          { id: "planet_labs", name: "Planet Labs", ticker: "PL", country: "US", role: "對地觀測影像，200+ 顆衛星每日全球覆蓋" },
          { id: "blacksky", name: "BlackSky", ticker: "BKSY", country: "US", role: "即時對地觀測，低軌高重訪率衛星" },
          { id: "spire", name: "Spire Global", ticker: "SPIR", country: "US", role: "氣象與信號智能，AIS/ADS-B 衛星追蹤" },
          { id: "iridium", name: "Iridium", ticker: "IRDM", country: "US", role: "全球連接服務，IoT 與政府用戶" },
        ],
        relationships: [
          "Planet、BlackSky、Spire 三家為商業對地觀測 (EO) 主要競爭者",
          "AI 影像分析為對地觀測商業化關鍵，與 Palantir 等軟體公司合作緊密",
          "太空經濟商業應用從上游 (發射) 轉向下游 (數據服務) 為長期趨勢",
        ],
      },
    ],
  },
];
