import { PixelSparkShape } from "@/components/pixel-mark";

export default function HeroWordmark() {
  return (
    <svg
      viewBox="0 0 610 178"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="block h-auto w-full overflow-visible"
    >
      <g fill="currentColor">
        {/* Rounded, slightly oversized lowercase forms, drawn for this wordmark. */}
        <path d="M12 151V51Q12 43 20 43H47Q55 43 55 51V57C65 46 79 40 96 40C129 40 147 60 147 92V151Q147 159 139 159H111Q103 159 103 151V99C103 84 96 76 83 76C66 76 55 87 55 103V151Q55 159 47 159H20Q12 159 12 151Z" />
        <path d="M166 151V51Q166 43 174 43H202Q210 43 210 51V151Q210 159 202 159H174Q166 159 166 151Z" />
        <rect x="165" y="0" width="46" height="29" rx="12" transform="rotate(-7 188 14.5)" />
        <path
          fillRule="evenodd"
          d="M227 101C227 65 250 40 283 40C299 40 310 45 319 55V9Q319 1 327 1H355Q363 1 363 9V151Q363 159 355 159H329Q321 159 321 151V145C312 157 298 163 281 163C248 163 227 138 227 101ZM270 102C270 120 279 130 294 130C310 130 320 119 320 102C320 85 310 74 295 74C280 74 270 85 270 102Z"
        />
        <path
          fillRule="evenodd"
          d="M379 102C379 66 401 40 434 40C451 40 464 46 474 57V51Q474 43 482 43H508Q516 43 516 51V151Q516 159 508 159H482Q474 159 474 151V145C464 157 451 163 433 163C400 163 379 138 379 102ZM422 102C422 119 432 130 447 130C463 130 473 119 473 102C473 85 463 74 448 74C432 74 422 85 422 102Z"
        />
      </g>
      <g fill="#B8D5DF" transform="translate(546 8)"><PixelSparkShape /></g>
    </svg>
  );
}
