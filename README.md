This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 資料更新

股價與財務資料由 `scripts/` 下的 pipeline 自動更新，
詳見 [`scripts/README.md`](scripts/README.md)。

- 每日 21:00：股價與技術訊號（`src/data/generated/prices.json`）
- 每月 1 號：公司財務資料（`src/data/generated/financials.json`）
- 每日快照保存於 `data/history/prices/`
- 人工修正的財務數字放在 `data/overrides/financials.json`，不會被自動更新覆蓋

排程由 `~/.local/share/interactivemap-bot` 的機器人 clone 執行並 push 到
GitHub（Vercel 隨即部署），本工作副本執行 `git pull` 即可取得最新資料。
