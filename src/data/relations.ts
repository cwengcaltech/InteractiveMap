export interface Relation {
  from: string;
  to: string;
  type: string;
  strength: "critical" | "major" | "minor";
  label: string;
}

export const relations: Relation[] = [
  // ============================================================
  // TSMC 晶圓代工服務
  // ============================================================
  {
    from: "tsmc",
    to: "nvidia",
    type: "foundry",
    strength: "critical",
    label: "台積電為 NVIDIA 代工先進製程 AI GPU（4nm / 3nm）",
  },
  {
    from: "tsmc",
    to: "amd",
    type: "foundry",
    strength: "critical",
    label: "台積電為 AMD 代工 CPU 與 GPU（5nm / 4nm / 3nm）",
  },
  {
    from: "tsmc",
    to: "apple",
    type: "foundry",
    strength: "critical",
    label: "台積電為 Apple 代工 A 系列與 M 系列晶片（3nm），Apple 為台積電最大客戶",
  },
  {
    from: "tsmc",
    to: "qualcomm",
    type: "foundry",
    strength: "critical",
    label: "台積電為 Qualcomm 代工 Snapdragon 系列行動處理器",
  },
  {
    from: "tsmc",
    to: "broadcom",
    type: "foundry",
    strength: "critical",
    label: "台積電為 Broadcom 代工客製化 AI 晶片與網通晶片",
  },
  {
    from: "tsmc",
    to: "mediatek",
    type: "foundry",
    strength: "critical",
    label: "台積電為聯發科代工 Dimensity 系列處理器",
  },
  {
    from: "tsmc",
    to: "marvell",
    type: "foundry",
    strength: "major",
    label: "台積電為 Marvell 代工資料中心與網通晶片",
  },

  // ============================================================
  // Samsung 晶圓代工服務
  // ============================================================
  {
    from: "samsung",
    to: "qualcomm",
    type: "foundry",
    strength: "major",
    label: "Samsung 為 Qualcomm 部分 Snapdragon 處理器提供代工",
  },

  // ============================================================
  // UMC / GlobalFoundries 代工服務
  // ============================================================
  {
    from: "umc",
    to: "mediatek",
    type: "foundry",
    strength: "major",
    label: "聯電為聯發科成熟製程產品（WiFi / IoT 晶片）代工",
  },
  {
    from: "umc",
    to: "qualcomm",
    type: "foundry",
    strength: "minor",
    label: "聯電為 Qualcomm 部分射頻前端元件代工",
  },
  {
    from: "globalfoundries",
    to: "qualcomm",
    type: "foundry",
    strength: "major",
    label: "GlobalFoundries 為 Qualcomm 代工射頻及連接晶片",
  },
  {
    from: "globalfoundries",
    to: "amd",
    type: "foundry",
    strength: "minor",
    label: "GlobalFoundries 為 AMD 代工部分成熟製程晶片（歷史合約）",
  },

  // ============================================================
  // 設備供應鏈 → 晶圓廠
  // ============================================================
  {
    from: "asml",
    to: "tsmc",
    type: "equipment",
    strength: "critical",
    label: "ASML 為台積電供應 EUV 光刻機，是先進製程不可或缺的設備",
  },
  {
    from: "asml",
    to: "samsung",
    type: "equipment",
    strength: "critical",
    label: "ASML 為 Samsung 供應 EUV 光刻機",
  },
  {
    from: "asml",
    to: "intel",
    type: "equipment",
    strength: "critical",
    label: "ASML 為 Intel 供應 EUV / High-NA EUV 光刻機",
  },
  {
    from: "applied_materials",
    to: "tsmc",
    type: "equipment",
    strength: "critical",
    label: "Applied Materials 為台積電供應沉積、蝕刻及離子佈植設備",
  },
  {
    from: "applied_materials",
    to: "samsung",
    type: "equipment",
    strength: "major",
    label: "Applied Materials 為 Samsung 供應半導體製程設備",
  },
  {
    from: "applied_materials",
    to: "intel",
    type: "equipment",
    strength: "major",
    label: "Applied Materials 為 Intel 供應半導體製程設備",
  },
  {
    from: "lam_research",
    to: "tsmc",
    type: "equipment",
    strength: "critical",
    label: "Lam Research 為台積電供應蝕刻與沉積設備",
  },
  {
    from: "lam_research",
    to: "samsung",
    type: "equipment",
    strength: "major",
    label: "Lam Research 為 Samsung 供應蝕刻設備（尤其 3D NAND）",
  },
  {
    from: "lam_research",
    to: "intel",
    type: "equipment",
    strength: "major",
    label: "Lam Research 為 Intel 供應蝕刻與沉積設備",
  },
  {
    from: "tokyo_electron",
    to: "tsmc",
    type: "equipment",
    strength: "critical",
    label: "Tokyo Electron 為台積電供應塗佈顯影與蝕刻設備",
  },
  {
    from: "tokyo_electron",
    to: "samsung",
    type: "equipment",
    strength: "major",
    label: "Tokyo Electron 為 Samsung 供應製程設備",
  },
  {
    from: "kla",
    to: "tsmc",
    type: "equipment",
    strength: "critical",
    label: "KLA 為台積電供應製程檢測與量測設備，確保良率控制",
  },
  {
    from: "kla",
    to: "samsung",
    type: "equipment",
    strength: "major",
    label: "KLA 為 Samsung 供應檢測與量測設備",
  },
  {
    from: "kla",
    to: "intel",
    type: "equipment",
    strength: "major",
    label: "KLA 為 Intel 供應檢測與量測設備",
  },

  // ============================================================
  // 材料 → 晶圓廠
  // ============================================================
  {
    from: "shin_etsu",
    to: "tsmc",
    type: "materials",
    strength: "critical",
    label: "信越化學為台積電供應矽晶圓",
  },
  {
    from: "shin_etsu",
    to: "samsung",
    type: "materials",
    strength: "major",
    label: "信越化學為 Samsung 供應矽晶圓",
  },
  {
    from: "shin_etsu",
    to: "intel",
    type: "materials",
    strength: "major",
    label: "信越化學為 Intel 供應矽晶圓",
  },
  {
    from: "sumco",
    to: "tsmc",
    type: "materials",
    strength: "major",
    label: "SUMCO 為台積電供應矽晶圓",
  },
  {
    from: "sumco",
    to: "samsung",
    type: "materials",
    strength: "major",
    label: "SUMCO 為 Samsung 供應矽晶圓",
  },

  // ============================================================
  // 記憶體 → AI 晶片/雲端客戶 (HBM)
  // ============================================================
  {
    from: "sk_hynix",
    to: "nvidia",
    type: "component",
    strength: "critical",
    label: "SK Hynix 為 NVIDIA 供應 HBM3/HBM3E 高頻寬記憶體（AI GPU 關鍵元件）",
  },
  {
    from: "micron",
    to: "nvidia",
    type: "component",
    strength: "major",
    label: "Micron 為 NVIDIA 供應 HBM3E 記憶體",
  },
  {
    from: "samsung",
    to: "nvidia",
    type: "component",
    strength: "major",
    label: "Samsung 為 NVIDIA 供應 HBM 記憶體",
  },
  {
    from: "sk_hynix",
    to: "amd",
    type: "component",
    strength: "major",
    label: "SK Hynix 為 AMD MI300 系列供應 HBM 記憶體",
  },

  // ============================================================
  // 封裝測試服務
  // ============================================================
  {
    from: "ase",
    to: "nvidia",
    type: "packaging",
    strength: "major",
    label: "日月光為 NVIDIA 提供先進封裝與測試服務",
  },
  {
    from: "ase",
    to: "qualcomm",
    type: "packaging",
    strength: "major",
    label: "日月光為 Qualcomm 提供 SiP 封裝服務",
  },
  {
    from: "ase",
    to: "mediatek",
    type: "packaging",
    strength: "major",
    label: "日月光為聯發科提供封裝測試服務",
  },
  {
    from: "ase",
    to: "broadcom",
    type: "packaging",
    strength: "major",
    label: "日月光為 Broadcom 提供封裝測試服務",
  },
  {
    from: "amkor",
    to: "apple",
    type: "packaging",
    strength: "major",
    label: "Amkor 為 Apple 提供 SiP 先進封裝服務",
  },
  {
    from: "amkor",
    to: "qualcomm",
    type: "packaging",
    strength: "major",
    label: "Amkor 為 Qualcomm 提供封裝服務",
  },

  // ============================================================
  // NVIDIA AI 晶片 → 雲端客戶
  // ============================================================
  {
    from: "nvidia",
    to: "microsoft",
    type: "chip_supply",
    strength: "critical",
    label: "NVIDIA 為 Microsoft Azure 供應 H100/B200 AI GPU",
  },
  {
    from: "nvidia",
    to: "google",
    type: "chip_supply",
    strength: "critical",
    label: "NVIDIA 為 Google Cloud 供應 AI GPU",
  },
  {
    from: "nvidia",
    to: "amazon",
    type: "chip_supply",
    strength: "critical",
    label: "NVIDIA 為 Amazon AWS 供應 AI GPU",
  },
  {
    from: "nvidia",
    to: "meta",
    type: "chip_supply",
    strength: "critical",
    label: "NVIDIA 為 Meta 供應大量 AI GPU 用於 Llama 模型訓練",
  },
  {
    from: "nvidia",
    to: "openai",
    type: "chip_supply",
    strength: "critical",
    label: "NVIDIA GPU 為 OpenAI 訓練 GPT 模型的核心算力來源",
  },
  {
    from: "nvidia",
    to: "anthropic",
    type: "chip_supply",
    strength: "critical",
    label: "NVIDIA GPU 為 Anthropic 訓練 Claude 模型的算力基礎",
  },

  // ============================================================
  // Broadcom 客製化晶片 → 雲端
  // ============================================================
  {
    from: "broadcom",
    to: "google",
    type: "chip_supply",
    strength: "critical",
    label: "Broadcom 為 Google 設計並供應 TPU AI 加速器",
  },
  {
    from: "broadcom",
    to: "meta",
    type: "chip_supply",
    strength: "major",
    label: "Broadcom 為 Meta 設計 MTIA 客製化 AI 晶片",
  },

  // ============================================================
  // EDA 工具 → IC 設計公司
  // ============================================================
  {
    from: "synopsys",
    to: "nvidia",
    type: "eda",
    strength: "critical",
    label: "Synopsys 為 NVIDIA 提供晶片設計與驗證 EDA 工具",
  },
  {
    from: "synopsys",
    to: "amd",
    type: "eda",
    strength: "major",
    label: "Synopsys 為 AMD 提供 EDA 工具與 IP",
  },
  {
    from: "synopsys",
    to: "broadcom",
    type: "eda",
    strength: "major",
    label: "Synopsys 為 Broadcom 提供 EDA 工具",
  },
  {
    from: "synopsys",
    to: "apple",
    type: "eda",
    strength: "major",
    label: "Synopsys 為 Apple 自研晶片提供 EDA 工具",
  },
  {
    from: "cadence",
    to: "nvidia",
    type: "eda",
    strength: "critical",
    label: "Cadence 為 NVIDIA 提供數位設計與驗證 EDA 工具",
  },
  {
    from: "cadence",
    to: "qualcomm",
    type: "eda",
    strength: "major",
    label: "Cadence 為 Qualcomm 提供 EDA 工具",
  },
  {
    from: "cadence",
    to: "mediatek",
    type: "eda",
    strength: "major",
    label: "Cadence 為聯發科提供 EDA 工具",
  },
  {
    from: "cadence",
    to: "samsung",
    type: "eda",
    strength: "major",
    label: "Cadence 為 Samsung 提供晶片設計與製程 EDA 工具",
  },

  // ============================================================
  // ARM IP 授權
  // ============================================================
  {
    from: "arm",
    to: "qualcomm",
    type: "ip_license",
    strength: "critical",
    label: "ARM 為 Qualcomm 授權 CPU 架構 IP（Snapdragon 核心基礎）",
  },
  {
    from: "arm",
    to: "mediatek",
    type: "ip_license",
    strength: "critical",
    label: "ARM 為聯發科授權 CPU 架構 IP",
  },
  {
    from: "arm",
    to: "apple",
    type: "ip_license",
    strength: "critical",
    label: "ARM 為 Apple 授權指令集架構（A/M 系列晶片基礎）",
  },
  {
    from: "arm",
    to: "broadcom",
    type: "ip_license",
    strength: "major",
    label: "ARM 為 Broadcom 授權 CPU 核心 IP",
  },
  {
    from: "arm",
    to: "marvell",
    type: "ip_license",
    strength: "major",
    label: "ARM 為 Marvell 授權 CPU 核心 IP",
  },
  {
    from: "arm",
    to: "nvidia",
    type: "ip_license",
    strength: "major",
    label: "ARM 為 NVIDIA Grace CPU 授權架構 IP",
  },
  {
    from: "arm",
    to: "samsung",
    type: "ip_license",
    strength: "major",
    label: "ARM 為 Samsung Exynos 處理器授權 CPU 架構",
  },

  // ============================================================
  // 雲端平台 → AI 模型公司
  // ============================================================
  {
    from: "microsoft",
    to: "openai",
    type: "cloud_infra",
    strength: "critical",
    label: "Microsoft Azure 為 OpenAI 提供獨家雲端基礎設施與算力",
  },
  {
    from: "amazon",
    to: "anthropic",
    type: "cloud_infra",
    strength: "critical",
    label: "Amazon AWS 為 Anthropic 提供雲端基礎設施（戰略投資關係）",
  },
  {
    from: "google",
    to: "anthropic",
    type: "cloud_infra",
    strength: "major",
    label: "Google Cloud 為 Anthropic 提供雲端服務（投資關係）",
  },
];
