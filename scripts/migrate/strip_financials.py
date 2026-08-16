"""一次性遷移：從 companies.ts 移除 financials 區塊，產生 companyProfiles.ts。

以大括號配對切除 `financials: { ... },` 整段，保留所有手寫內容與註解。
"""
import pathlib
import re

SRC = pathlib.Path("src/data/companies.ts")
DST = pathlib.Path("src/data/companyProfiles.ts")

text = SRC.read_text(encoding="utf-8")

# 1. 移除 interface 中的 financials 型別區塊
iface_start = text.index("export interface Company {")
iface_end = text.index("\n}", iface_start) + 2
iface = text[iface_start:iface_end]
fin_start = iface.index("  financials: {")
fin_end = iface.index("\n  };", fin_start) + len("\n  };\n")
new_iface = (iface[:fin_start] + iface[fin_end:]).replace(
    "export interface Company {", "export interface CompanyProfile {"
)
text = text[:iface_start] + new_iface + text[iface_end:]

# 2. 移除每家公司的 financials 物件
out = []
i = 0
removed = 0
marker = "    financials: {"
while True:
    j = text.find(marker, i)
    if j == -1:
        out.append(text[i:])
        break
    out.append(text[i:j])
    depth = 0
    k = text.index("{", j)
    while True:
        if text[k] == "{":
            depth += 1
        elif text[k] == "}":
            depth -= 1
            if depth == 0:
                break
        k += 1
    k += 1
    if text[k] == ",":
        k += 1
    if text[k] == "\n":
        k += 1
    i = k
    removed += 1

text = "".join(out)

# 3. 改名匯出
text = text.replace(
    "export const companies: Company[] = [",
    "export const companyProfiles: CompanyProfile[] = [",
)
text = re.sub(r"\n{3,}", "\n\n", text)

DST.write_text(text, encoding="utf-8")
print(f"removed {removed} financials blocks -> {DST}")
