"use client";

interface FlowBarProps {
  flow: string;
  color: string;
}

export default function FlowBar({ flow, color }: FlowBarProps) {
  const steps = flow.split("→").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="flex items-center gap-1 flex-wrap py-3">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-1">
          <span
            className="px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
            style={{
              backgroundColor: `${color}20`,
              color: color,
              border: `1px solid ${color}40`,
            }}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M7 4l6 6-6 6"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
