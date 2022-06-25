import { PropsWithChildren } from "react";

export type ProgressBarProps = PropsWithChildren<{
  value?: number;
  minValue?: number;
  maxValue?: number;

  orientation?: "horizontal" | "vertical";
  width?: string | number;
  height?: string | number;

  showPercent?: boolean;
  visible?: boolean;

  className?: string;
}>;

export default function ProgressBar({
  value = NaN,
  minValue = 0.0,
  maxValue = 1.0,

  orientation = "horizontal",
  width = orientation === "horizontal" ? "100%" : "1ex",
  height = orientation === "vertical" ? "100%" : "1ex",

  showPercent = false,
  visible = !isNaN(value),

  className,

  children,
}: ProgressBarProps) {
  const pct = (value - minValue) / (maxValue - minValue);
  const endX = orientation === "horizontal" ? pct : 1;
  const endY = orientation === "vertical" ? pct : 1;

  return (
    <div
      className={`progress-bar ${className ?? ""}`}
      style={{ minWidth: width, minHeight: height }}
    >
      <div className="children">
        {visible && showPercent && <span>{Math.floor(100 * pct)}%</span>}
        {children}
      </div>
      {visible && pct > 0.001 && (
        <div
          className="primary"
          style={{ width: `${endX * 100}%`, height: `${endY * 100}%` }}
        ></div>
      )}
      {visible && <div className="secondary"></div>}
    </div>
  );
}
