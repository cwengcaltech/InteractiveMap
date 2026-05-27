"use client";

import { useEffect, useRef, useCallback } from "react";
import { companies } from "@/data/companies";
import { relations } from "@/data/relations";
import { categories } from "@/data/categories";

interface SupplyChainGraphProps {
  selectedCategories: string[];
  onSelectCompany: (id: string | null) => void;
  selectedCompany: string | null;
}

const categoryColorMap = Object.fromEntries(
  categories.map((c) => [c.id, c.color])
);

function getLatestRevenue(company: (typeof companies)[0]): number {
  const annual = company.financials.annual;
  if (annual.length === 0) return 1;
  // Normalize TWD to USD for sizing (rough conversion)
  const rev = annual[annual.length - 1].revenue;
  if (company.financials.currency === "TWD") {
    return rev / 32; // approximate TWD to USD
  }
  return rev;
}

function revenueToSize(revenueUSD: number): number {
  const minSize = 24;
  const maxSize = 72;
  const logRev = Math.log10(Math.max(revenueUSD, 0.1));
  // log10(0.1) = -1, log10(700) ~ 2.85
  const normalized = (logRev + 1) / 3.85;
  return minSize + Math.min(1, Math.max(0, normalized)) * (maxSize - minSize);
}

function strengthToWidth(strength: string): number {
  switch (strength) {
    case "critical":
      return 3;
    case "major":
      return 2;
    default:
      return 1;
  }
}

export default function SupplyChainGraph({
  selectedCategories,
  onSelectCompany,
  selectedCompany,
}: SupplyChainGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<InstanceType<
    typeof import("@antv/g6").Graph
  > | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelectCompany);
  onSelectRef.current = onSelectCompany;

  const buildGraphData = useCallback(() => {
    const filteredCompanies = companies.filter((c) =>
      selectedCategories.includes(c.category)
    );
    const filteredIds = new Set(filteredCompanies.map((c) => c.id));

    const nodes = filteredCompanies.map((c) => {
      const revenueUSD = getLatestRevenue(c);
      const size = revenueToSize(revenueUSD);
      const color = categoryColorMap[c.category] || "#6c8cff";
      const latest = c.financials.annual[c.financials.annual.length - 1];

      return {
        id: c.id,
        data: {
          name: c.name_en,
          nameCn: c.name,
          category: c.category,
          revenueUSD,
          grossMargin: latest?.gross_margin ?? 0,
          growthRate: latest?.growth_rate ?? 0,
          color,
          nodeSize: size,
        },
      };
    });

    const edges = relations
      .filter((r) => filteredIds.has(r.from) && filteredIds.has(r.to))
      .map((r, idx) => ({
        id: `e-${r.from}-${r.to}-${idx}`,
        source: r.from,
        target: r.to,
        data: {
          relType: r.type,
          strength: r.strength,
          label: r.label,
        },
      }));

    return { nodes, edges };
  }, [selectedCategories]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;

    let destroyed = false;

    const initGraph = async () => {
      const { Graph } = await import("@antv/g6");

      if (destroyed || !containerRef.current) return;

      // Destroy previous instance
      if (graphRef.current && !graphRef.current.destroyed) {
        graphRef.current.destroy();
        graphRef.current = null;
      }

      const graphData = buildGraphData();
      const selected = selectedCompany;

      const graph = new Graph({
        container: containerRef.current,
        autoResize: true,
        background: "#0f1117",
        data: graphData,
        layout: {
          type: "d3-force",
          preventOverlap: true,
          nodeSize: (node: Record<string, unknown>) => {
            const data = node.data as Record<string, unknown> | undefined;
            return ((data?.nodeSize as number) ?? 40) + 15;
          },
          nodeStrength: -600,
          edgeStrength: 0.08,
          collideStrength: 0.9,
          alphaDecay: 0.028,
          alphaMin: 0.001,
        },
        node: {
          type: "circle",
          style: (nodeData) => {
            const d = nodeData.data as Record<string, unknown> | undefined;
            const size = (d?.nodeSize as number) ?? 40;
            const color = (d?.color as string) ?? "#6c8cff";
            const isSelected = nodeData.id === selected;
            const name = (d?.name as string) ?? "";
            const displayName =
              name.length > 18 ? name.slice(0, 16) + ".." : name;

            return {
              size,
              fill: color,
              fillOpacity: 0.85,
              stroke: isSelected ? "#ffffff" : color,
              lineWidth: isSelected ? 3 : 0.5,
              labelText: displayName,
              labelFill: "#e4e6ef",
              labelFontSize: Math.max(9, Math.min(13, size / 5.5)),
              labelPlacement: "center" as const,
              cursor: "pointer",
              shadowColor: isSelected ? color : "transparent",
              shadowBlur: isSelected ? 24 : 0,
            };
          },
          state: {
            highlight: {
              stroke: "#ffffff",
              lineWidth: 2,
              fillOpacity: 1,
              shadowBlur: 16,
            },
            dim: {
              fillOpacity: 0.2,
              labelFill: "rgba(228, 230, 239, 0.3)",
            },
          },
        },
        edge: {
          type: "line",
          style: (edgeData) => {
            const d = edgeData.data as Record<string, unknown> | undefined;
            const strength = (d?.strength as string) ?? "minor";
            const lw = strengthToWidth(strength);
            const isCritical = strength === "critical";
            return {
              lineWidth: lw,
              stroke: isCritical
                ? "rgba(108, 140, 255, 0.45)"
                : "rgba(142, 154, 175, 0.2)",
              endArrow: true,
              endArrowSize: lw * 2.5,
              endArrowFill: isCritical
                ? "rgba(108, 140, 255, 0.45)"
                : "rgba(142, 154, 175, 0.2)",
            };
          },
          state: {
            highlight: {
              stroke: "rgba(108, 140, 255, 0.85)",
              lineWidth: 3,
            },
            dim: {
              stroke: "rgba(142, 154, 175, 0.06)",
              lineWidth: 0.5,
            },
          },
        },
        behaviors: ["drag-canvas", "zoom-canvas", "drag-element"],
        animation: false,
      });

      graphRef.current = graph;

      // Tooltip on hover
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      graph.on("node:pointerenter", (evt: any) => {
        const target = evt.target as Record<string, unknown> | undefined;
        const nodeId = (target?.id ?? evt.targetId ?? "") as string;
        if (!nodeId || !tooltipRef.current) return;
        const company = companies.find((c) => c.id === nodeId);
        if (!company) return;

        const latest =
          company.financials.annual[company.financials.annual.length - 1];
        if (!latest) return;

        const isTWD = company.financials.currency === "TWD";
        const revenueStr = isTWD
          ? `NT$${latest.revenue.toLocaleString()}B`
          : `$${latest.revenue.toFixed(1)}B`;
        const growthPct = (latest.growth_rate * 100).toFixed(1);
        const marginPct = (latest.gross_margin * 100).toFixed(1);

        tooltipRef.current.innerHTML = `
          <div style="font-weight:600;font-size:14px;margin-bottom:6px;color:#fff">${company.name} (${company.name_en})</div>
          <div style="font-size:11px;color:#8b8fa3;margin-bottom:6px">${company.ticker} | ${company.country}</div>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:2px 12px;font-size:12px;">
            <span style="color:#8b8fa3">營收 (${latest.year})</span><span>${revenueStr}</span>
            <span style="color:#8b8fa3">成長率</span><span style="color:${latest.growth_rate >= 0 ? "#4ecdc4" : "#e74c3c"}">${growthPct}%</span>
            <span style="color:#8b8fa3">毛利率</span><span>${marginPct}%</span>
          </div>
        `;
        tooltipRef.current.style.display = "block";
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      graph.on("node:pointermove", (evt: any) => {
        if (!tooltipRef.current) return;
        const client = evt.client as { x: number; y: number } | undefined;
        if (client) {
          tooltipRef.current.style.left = `${client.x + 16}px`;
          tooltipRef.current.style.top = `${client.y - 10}px`;
        }
      });

      graph.on("node:pointerleave", () => {
        if (tooltipRef.current) {
          tooltipRef.current.style.display = "none";
        }
      });

      // Node click
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      graph.on("node:click", (evt: any) => {
        const target = evt.target as Record<string, unknown> | undefined;
        const nodeId = (target?.id ?? evt.targetId ?? "") as string;
        if (nodeId) {
          onSelectRef.current(nodeId);
        }
      });

      // Canvas click to deselect
      graph.on("canvas:click", () => {
        onSelectRef.current(null);
      });

      await graph.render();

      // Fit view after render
      await graph.fitView();
    };

    initGraph();

    return () => {
      destroyed = true;
      if (graphRef.current && !graphRef.current.destroyed) {
        graphRef.current.destroy();
        graphRef.current = null;
      }
    };
  }, [buildGraphData, selectedCompany]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      <div
        ref={tooltipRef}
        className="fixed z-50 pointer-events-none"
        style={{
          display: "none",
          background: "rgba(26, 29, 39, 0.95)",
          border: "1px solid rgba(108, 140, 255, 0.3)",
          borderRadius: "8px",
          padding: "10px 14px",
          color: "#e4e6ef",
          backdropFilter: "blur(8px)",
          maxWidth: "300px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );
}
