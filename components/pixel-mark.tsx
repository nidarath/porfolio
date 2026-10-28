const patterns = {
  spark: ["000010000", "010010010", "001010100", "000111000", "111111111", "000111000", "001010100", "010010010", "000010000"],
  leaf: ["000000110", "000011110", "001111110", "011111100", "011111000", "011110000", "001100000", "010000000", "100000000"],
  game: ["000100000", "001110000", "011111000", "111111100", "011111000", "001110000", "000100000", "000000000", "101010101"],
  binary: ["01110000100", "11011001100", "11011000100", "11011000100", "11011000100", "11011000100", "01110001110"],
};

export function PixelSparkShape() {
  return <path d={patterns.spark.flatMap((row, y) => [...row].flatMap((pixel, x) => pixel === "1" ? [`M${x * 6} ${y * 6}h6v6h-6z`] : [])).join("")} />;
}

export default function PixelMark({ className = "h-6 w-6", variant = "spark" }: { className?: string; variant?: keyof typeof patterns }) {
  const pattern = patterns[variant];
  const width = pattern[0].length * 6;
  const height = pattern.length * 6;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d={pattern.flatMap((row, y) => [...row].flatMap((pixel, x) => pixel === "1" ? [`M${x * 6} ${y * 6}h6v6h-6z`] : [])).join("")} />
    </svg>
  );
}
