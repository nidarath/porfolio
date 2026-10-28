import { readFile, mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const components = new Map();
const fontWorkspace = await mkdtemp(resolve(tmpdir(), "nida-social-fonts-"));
const fontConfig = resolve(fontWorkspace, "fonts.conf");
await writeFile(fontConfig, `<?xml version="1.0"?>
<fontconfig>
  <dir>${resolve(root, "public/fonts").replaceAll("&", "&amp;")}</dir>
  <cachedir>${fontWorkspace.replaceAll("&", "&amp;")}</cachedir>
</fontconfig>`);
// Use only the bundled fonts and a writable temporary cache on any developer OS.
process.env.FONTCONFIG_FILE = fontConfig;
const { default: sharp } = await import("sharp");

// Reuse the site's actual SVG wordmark rather than maintaining a second logo.
async function loadComponent(name) {
  if (components.has(name)) return components.get(name);
  const source = await readFile(resolve(root, `${name}.tsx`), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  });
  const imports = new Map();
  for (const [, dependency] of source.matchAll(/from "(@\/[^"]+)"/g)) {
    imports.set(dependency, await loadComponent(dependency.slice(2)));
  }
  const exports = {};
  new Function("require", "exports", outputText)(name => imports.get(name) ?? require(name), exports);
  components.set(name, exports);
  return exports;
}

async function lettering(text, font, size, color, fontFile) {
  const escaped = text.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
  return sharp({ text: {
    text: `<span foreground="${color}">${escaped}</span>`,
    font: `${font} ${size}`,
    fontfile: resolve(root, "public/fonts", fontFile),
    rgba: true,
    dpi: 72,
  } }).png().toBuffer();
}

const { default: HeroWordmark } = await loadComponent("components/hero-wordmark");
const wordmark = renderToStaticMarkup(createElement(HeroWordmark))
  .replace("<svg", '<svg x="72" y="172" width="594" height="174"')
  .replaceAll("currentColor", "#2C4248");
const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F8F9F5"/>
  <rect x="24" y="24" width="1152" height="582" rx="40" fill="#FFFFFF" stroke="#DDE7E8" stroke-width="1.5"/>
  <ellipse cx="929" cy="315" rx="190" ry="246" fill="#F0F6F7"/>
  ${wordmark}
</svg>`);
const cat = await sharp(resolve(root, "public/matcha-cat-fallback.png"))
  .trim().resize({ height: 500 }).png().toBuffer();
const catSize = await sharp(cat).metadata();
const output = resolve(root, "public/social/portfolio-card.png");
await mkdir(dirname(output), { recursive: true });
await sharp(background).composite([
  { input: await lettering("hello, i'm", "Inter", 22, "#84979E", "inter-variable.ttf"), left: 84, top: 126 },
  { input: await lettering("fullstack developer", "Inter Medium", 40, "#40565E", "inter-variable.ttf"), left: 84, top: 383 },
  { input: await lettering("fun projects, thoughtful code", "Inter", 23, "#7B888D", "inter-variable.ttf"), left: 84, top: 443 },
  { input: await lettering("& a little iced matcha.", "Inter", 23, "#7B888D", "inter-variable.ttf"), left: 84, top: 477 },
  { input: await lettering("nida-porfolio.vercel.app", "Inter", 17, "#6B7F86", "inter-variable.ttf"), left: 84, top: 551 },
  { input: cat, left: Math.round(929 - catSize.width / 2), top: 64 },
]).flatten({ background: "#F8F9F5" }).removeAlpha().png().toFile(output);
console.log(`Created ${output} (1200 × 630, opaque PNG).`);
