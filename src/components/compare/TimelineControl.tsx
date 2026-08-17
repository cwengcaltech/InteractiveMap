"use client";

import { useEffect, useRef } from "react";

interface Props {
  years: number[];
  value: number;
  onChange: (year: number) => void;
  playing: boolean;
  onPlayingChange: (playing: boolean) => void;
}

const FRAME_MS = 1600;

export default function TimelineControl({
  years,
  value,
  onChange,
  playing,
  onPlayingChange,
}: Props) {
  // 用 ref 讓計時器讀到最新年份，避免每次換年都重建計時器造成節奏抖動。
  // 同步必須放在 effect 裡，render 期間寫 ref 會讓 React 讀到過期的值。
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (!playing || years.length < 2) return;
    const timer = setInterval(() => {
      const i = years.indexOf(valueRef.current);
      if (i === years.length - 1) {
        onPlayingChange(false); // 播到最後一年就停，不循環
        return;
      }
      onChange(years[i + 1]);
    }, FRAME_MS);
    return () => clearInterval(timer);
  }, [playing, years, onChange, onPlayingChange]);

  if (years.length < 2) return null;

  const atEnd = value === years[years.length - 1];

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => {
          if (atEnd && !playing) onChange(years[0]); // 播完後再按等於重播
          onPlayingChange(!playing);
        }}
        className="shrink-0 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs transition-colors"
        aria-label={playing ? "暫停" : "播放"}
      >
        {playing ? "❚❚" : "▶"}
      </button>
      <div className="flex items-center gap-1.5">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => {
              onPlayingChange(false);
              onChange(year);
            }}
            className={`px-2 py-0.5 rounded-md text-xs transition-colors ${
              year === value
                ? "bg-[#4f6df5] text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}
