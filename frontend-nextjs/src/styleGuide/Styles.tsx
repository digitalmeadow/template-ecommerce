import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { StylePart } from "./entry";
import TokenValue from "./TokenValue";

// Every token and global class in styles/, labelled: the Styles tab, one part per frame.
// Keep in sync with styles/ when a token, class or Tailwind theme key is added or removed.

const headings = [1, 2, 3, 4, 5, 6] as const;
const textSizes = ["large", "medium", "regular", "small", "tiny"] as const;
const fontTokens = [
  "--font-body",
  "--font-heading",
  "--font-weight-regular",
  "--font-weight-bold",
  "--line-height-display",
  "--line-height-tight",
  "--line-height-body",
  "--letter-spacing-display",
  "--letter-spacing-large",
];
const sizes = [
  "0",
  "0-5",
  "1",
  "2",
  "2-5",
  "3",
  "4",
  "5",
  "6",
  "8",
  "10",
  "12",
  "14",
  "15",
  "16",
  "20",
  "24",
  "28",
  "30",
  "32",
  "40",
];
const maxWidths = ["64", "80", "100", "120", "140", "160", "192", "256", "320"];
const layoutTokens = [
  "section-space-sm",
  "section-space-md",
  "section-space-lg",
  "margin",
  "gutter",
  "marker-size",
  "border-width-1",
  "border-width-2",
  "link-underline-thickness-rest",
  "link-underline-thickness-active",
];
const radii = ["none", "sm", "md", "lg", "full"];
const schemes = ["light", "dark"] as const;
const coreColors = [
  "cream",
  "brown",
  "ink",
  "linen",
  "yellow",
  "orange",
  "green",
  "blue",
  "purple",
];
const schemeColors = ["background", "foreground", "accent", "on-accent", "focus", "error"];
const roleColors = [
  "background",
  "text",
  "text-muted",
  "text-subtle",
  "rule",
  "surface",
  "surface-strong",
  "accent",
  "on-accent",
  "inverse-background",
  "inverse-text",
  "focus",
  "error",
];
const contrasts = ["64", "40", "16", "8", "4"];
const alphas = ["5", "10", "15", "20", "30", "40", "50", "60", "80", "90", "92", "95"];
const highlights = ["yellow", "orange", "green", "blue", "purple"] as const;
const textColors = [
  "text-text",
  "text-text-muted",
  "text-text-subtle",
  "text-accent",
  "text-error",
  "text-inverse-text bg-inverse-background",
];
const backgroundColors = [
  "bg-background",
  "bg-surface",
  "bg-surface-strong",
  "bg-accent",
  "bg-inverse-background",
];
const positions = [
  ["top-left", "items-start justify-start"],
  ["top-center", "items-start justify-center"],
  ["top-right", "items-start justify-end"],
  ["center-left", "items-center justify-start"],
  ["center-center", "items-center justify-center"],
  ["center-right", "items-center justify-end"],
  ["bottom-left", "items-end justify-start"],
  ["bottom-center", "items-end justify-center"],
  ["bottom-right", "items-end justify-end"],
] as const;
const ratios = [
  "aspect-square",
  "aspect-4/5",
  "aspect-2/3",
  "aspect-3/2",
  "aspect-4/3",
  "aspect-video",
];
const motionTokens = [
  "--ease-out",
  "--ease-in-out",
  "--duration-default",
  "--duration-media",
  "--duration-reveal",
  "--transition-default",
  "--transition-media",
  "--transition-reveal",
  "--stagger",
  "--parallax-scale",
  "--parallax-travel",
  "--parallax-travel-wrapper",
];
const stateTokens = ["--focus-ring-width", "--focus-ring-offset", "--opacity-disabled"];

const LABEL = "g-text-tiny text-text-muted";
const CELL = "min-h-10 bg-surface p-2.5 g-text-tiny leading-body";
const SWATCH = "h-16 outline outline-1 outline-rule";

function Subtitle({ children }: { children: ReactNode }) {
  return <h3 className="mt-10 g-text-small leading-body font-bold">{children}</h3>;
}

function Note({ children }: { children: ReactNode }) {
  return <p className="max-w-160 g-text-tiny leading-body text-text-muted">{children}</p>;
}

function Rows({ children }: { children: ReactNode }) {
  return <div className="grid">{children}</div>;
}

function Row({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,3fr)] items-center gap-[var(--gutter)] border-b border-rule py-2.5 mobile:grid-cols-1">
      <code className={LABEL}>{label}</code>
      {children}
    </div>
  );
}

function Swatches({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(var(--size-32),1fr))] gap-[var(--gutter)]">
      {children}
    </div>
  );
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className={SWATCH} style={{ backgroundColor: color }} />
      <code className={LABEL}>{label}</code>
    </div>
  );
}

function TokenRows({ tokens }: { tokens: string[] }) {
  return (
    <Rows>
      {tokens.map((token) => (
        <Row key={token} label={token}>
          <TokenValue token={token} className={LABEL} />
        </Row>
      ))}
    </Rows>
  );
}

function Typography() {
  return (
    <>
      <Subtitle>Heading tags and classes</Subtitle>
      <Note>
        Tags set the default look; <code>g-heading-N</code> when the look differs from the tag.
        Sizes are <code>--font-size-h1</code>…<code>--font-size-h6</code>, smaller below the
        breakpoint.
      </Note>
      <Rows>
        {headings.map((level) => (
          <Row key={level} label={`h${level} · .g-heading-${level} · --font-size-h${level}`}>
            <p className={`g-heading-${level}`}>Heading {level}</p>
          </Row>
        ))}
      </Rows>

      <Subtitle>Text styles</Subtitle>
      <Rows>
        {textSizes.map((size) => (
          <Row key={size} label={`.g-text-${size} · --font-size-${size}`}>
            <p className={`g-text-${size}`}>The quick brown fox</p>
          </Row>
        ))}
      </Rows>

      <Subtitle>Font tokens</Subtitle>
      <Note>
        Tailwind: <code>font-body</code>, <code>font-heading</code>, <code>font-regular</code>,{" "}
        <code>font-bold</code>, <code>leading-display|tight|body</code>,{" "}
        <code>tracking-display|large</code>.
      </Note>
      <TokenRows tokens={fontTokens} />

      <Subtitle>Weights and styles</Subtitle>
      <Rows>
        <Row label=".font-regular">
          <p className="font-regular">Regular</p>
        </Row>
        <Row label=".font-bold · strong">
          <p className="font-bold">Bold</p>
        </Row>
        <Row label=".italic">
          <p className="italic">Italic</p>
        </Row>
        <Row label=".uppercase">
          <p className="uppercase">Uppercase</p>
        </Row>
        <Row label=".text-balance">
          <p className="max-w-100 text-balance">
            Balanced lines wrap evenly instead of leaving one word behind
          </p>
        </Row>
        <Row label=".whitespace-nowrap">
          <p className="whitespace-nowrap">Never wraps</p>
        </Row>
      </Rows>

      <Subtitle>Links</Subtitle>
      <Note>
        <code>g-text-link</code> thickens into a highlighter stroke on hover or when active (
        <code>data-active</code>, <code>aria-current</code>); <code>g-text-link-hover</code> shows
        nothing at rest. Colour with <code>g-underline-*</code> (default yellow).
      </Note>
      <Rows>
        {highlights.map((color) => (
          <Row key={color} label={`.g-text-link.g-underline-${color}`}>
            <p className="flex gap-5">
              <a className={`g-text-link g-underline-${color}`} href="#typography">
                Rest
              </a>
              <a className={`g-text-link g-underline-${color}`} href="#typography" data-active>
                Active
              </a>
            </p>
          </Row>
        ))}
        <Row label=".g-text-link-hover">
          <p className="flex gap-5">
            <a className="g-text-link-hover" href="#typography">
              Rest
            </a>
            <a className="g-text-link-hover" href="#typography" data-active>
              Active
            </a>
          </p>
        </Row>
      </Rows>

      <Subtitle>Alignment</Subtitle>
      <Note>
        Prefix <code>mobile:</code> for mobile only: <code>mobile:text-center</code>.
      </Note>
      <Rows>
        {(["left", "center", "right"] as const).map((align) => (
          <Row key={align} label={`.text-${align}`}>
            <p className={cn("bg-surface", `text-${align}`)}>Aligned {align}</p>
          </Row>
        ))}
      </Rows>
    </>
  );
}

function Colours() {
  return (
    <>
      <Note>
        Core (raw) → scheme (swapped per <code>data-color-scheme</code>) → roles. Components use
        roles only, as Tailwind colours: <code>text-text-muted</code>, <code>bg-surface</code>,{" "}
        <code>border-rule</code>, <code>bg-alpha-20</code>.
      </Note>

      <Subtitle>Core</Subtitle>
      <Swatches>
        {coreColors.map((color) => (
          <Swatch key={color} color={`var(--core-${color})`} label={`--core-${color}`} />
        ))}
      </Swatches>

      <Subtitle>Schemes</Subtitle>
      <Note>
        Theme a section with <code>data-color-scheme</code>; every role follows it, and so do native
        controls.
      </Note>
      <div className="g-grid-cols-2">
        {schemes.map((scheme) => (
          <div
            key={scheme}
            className="flex flex-col gap-5 bg-background p-5 text-text outline outline-1 outline-rule"
            data-color-scheme={scheme}
          >
            <code>data-color-scheme=&quot;{scheme}&quot;</code>
            <Swatches>
              {schemeColors.map((color) => (
                <Swatch key={color} color={`var(--scheme-${color})`} label={`--scheme-${color}`} />
              ))}
            </Swatches>
            <span className="g-text-large">Aa</span>
            <span className="text-text-muted">Muted text</span>
            <div className="g-form-field">
              <label className="g-form-choice">
                <input type="checkbox" defaultChecked /> Checkbox
              </label>
              <label className="g-form-choice">
                <input type="radio" name={`scheme-${scheme}`} defaultChecked /> Radio
              </label>
              <select aria-label="Dropdown">
                <option>Dropdown</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <Subtitle>Roles</Subtitle>
      <Swatches>
        {roleColors.map((color) => (
          <Swatch key={color} color={`var(--color-${color})`} label={`--color-${color}`} />
        ))}
      </Swatches>

      <Subtitle>Highlights</Subtitle>
      <Note>The same in every scheme: link underlines (g-underline-*) and accents.</Note>
      <Swatches>
        {highlights.map((color) => (
          <Swatch
            key={color}
            color={`var(--color-highlight-${color})`}
            label={`--color-highlight-${color}`}
          />
        ))}
      </Swatches>

      <Subtitle>Contrast and alpha</Subtitle>
      <Note>
        Foreground mixed into the background (<code>--contrast-N</code>) or into transparent (
        <code>--alpha-N</code>, Tailwind <code>*-alpha-N</code>), N percent. Roles are built from
        these.
      </Note>
      <Swatches>
        {contrasts.map((amount) => (
          <Swatch key={amount} color={`var(--contrast-${amount})`} label={`--contrast-${amount}`} />
        ))}
      </Swatches>
      <Swatches>
        {alphas.map((amount) => (
          <Swatch key={amount} color={`var(--alpha-${amount})`} label={`--alpha-${amount}`} />
        ))}
      </Swatches>

      <Subtitle>Text colours</Subtitle>
      <Rows>
        {textColors.map((className) => (
          <Row key={className} label={`.${className.replace(" ", " .")}`}>
            <p className={cn(className, className.includes("bg-") && "p-2.5")}>
              The quick brown fox
            </p>
          </Row>
        ))}
      </Rows>

      <Subtitle>Background colours</Subtitle>
      <div className="g-grid-cols-4">
        {backgroundColors.map((className) => (
          <div key={className} className="flex flex-col gap-2.5">
            <div className={cn(SWATCH, className)} />
            <code className={LABEL}>.{className}</code>
          </div>
        ))}
      </div>
    </>
  );
}

function Elements() {
  return (
    <>
      <Subtitle>Buttons</Subtitle>
      <Rows>
        <Row label=".g-button">
          <div>
            <button className="g-button" type="button">
              Primary
            </button>
          </div>
        </Row>
        <Row label=".g-button-secondary">
          <div>
            <button className="g-button-secondary" type="button">
              Secondary
            </button>
          </div>
        </Row>
        <Row label=".g-button-icon">
          <div>
            <button className="g-button-icon" type="button" aria-label="Next">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </Row>
        <Row label=":disabled · --opacity-disabled">
          <div className="flex items-center gap-5">
            <button className="g-button" type="button" disabled>
              Primary
            </button>
            <button className="g-button-secondary" type="button" disabled>
              Secondary
            </button>
          </div>
        </Row>
      </Rows>

      <Subtitle>Decoration</Subtitle>
      <Rows>
        <Row label=".g-marker[data-active]">
          <p>
            <span className="g-marker" data-active>
              Current item
            </span>
          </p>
        </Row>
        <Row label=".g-checker">
          <div className="g-checker aspect-video max-w-80" />
        </Row>
        <Row label=".g-rule · .g-rule-bottom">
          <div className="flex flex-col gap-2.5">
            <p className="g-rule pt-2.5">Rule above</p>
            <p className="g-rule-bottom pb-2.5">Rule below</p>
          </div>
        </Row>
        <Row label=".g-sr-only">
          <p>
            Hidden, still read by screen readers: <span className="g-sr-only">hidden text</span>
          </p>
        </Row>
        <Row label=":focus-visible · --color-focus">
          <div>
            <button className="g-button-secondary" type="button">
              Tab to me
            </button>
          </div>
        </Row>
      </Rows>

      <Subtitle>Forms</Subtitle>
      <div className="g-grid-cols-2">
        <label className="g-form-field">
          <code className={LABEL}>.g-form-field</code>
          <input type="text" placeholder="Placeholder" />
        </label>
        <div className="g-form-field">
          <code className={LABEL}>.g-form-choice</code>
          <label className="g-form-choice">
            <input type="checkbox" /> I agree to the terms
          </label>
          <p className="g-form-error g-text-small">.g-form-error: Enter your email</p>
        </div>
        <label className="g-form-field">
          <code className={LABEL}>[aria-invalid=&quot;true&quot;]</code>
          <input type="text" defaultValue="Invalid" aria-invalid="true" />
        </label>
        <div className="g-form-field">
          <code className={LABEL}>.g-form-choice:has(:disabled)</code>
          <label className="g-form-choice">
            <input type="checkbox" defaultChecked disabled /> Disabled
          </label>
        </div>
      </div>
    </>
  );
}

function Structure() {
  return (
    <>
      <Note>
        <code>section.g-section-md</code> &gt; <code>.g-page-margin</code> (<code>--margin</code>)
        &gt; <code>.g-container-sm|md|full</code>.
      </Note>
      <Rows>
        {["sm", "md", "lg"].map((size) => (
          <Row key={size} label={`.g-section-${size} · --section-space-${size}`}>
            <div
              className={cn(
                "bg-surface outline outline-1 outline-text-subtle outline-dashed",
                `g-section-${size}`,
              )}
            />
          </Row>
        ))}
        {["sm", "md", "full"].map((size) => (
          <Row key={size} label={`.g-container-${size} · --container-${size}`}>
            <div
              className={cn(
                "bg-surface p-2.5 outline outline-1 outline-text-subtle outline-dashed",
                `g-container-${size}`,
              )}
            />
          </Row>
        ))}
      </Rows>
    </>
  );
}

function Grid() {
  return (
    <>
      <Note>
        <code>.g-grid</code>: <code>--column-count</code> columns (16, 4 on mobile) with{" "}
        <code>--gutter</code> between. <code>g-col-N</code> spans N, <code>g-offset-N</code> skips
        N. On mobile every column is full width unless it has <code>g-col-sm-N</code> /{" "}
        <code>g-offset-sm-N</code> (<code>g-offset-sm-0</code> resets). Span N columns in CSS:{" "}
        <code>calc(N * var(--column) + (N - 1) * var(--gutter))</code>.
      </Note>
      <div className="flex flex-col gap-2.5">
        <div className="g-grid gap-2.5">
          {Array.from({ length: 16 }, (_, index) => (
            <div key={index} className={cn(CELL, "g-col-1 g-col-sm-1")} />
          ))}
        </div>
        <div className="g-grid">
          <div className={cn(CELL, "g-col-8 g-col-sm-4")}>
            <code>g-col-8 g-col-sm-4</code>
          </div>
          <div className={cn(CELL, "g-col-8 g-col-sm-4")}>
            <code>g-col-8 g-col-sm-4</code>
          </div>
        </div>
        <div className="g-grid">
          <div className={cn(CELL, "g-col-6 g-offset-2 g-col-sm-3 g-offset-sm-1")}>
            <code>g-col-6 g-offset-2 g-col-sm-3 g-offset-sm-1</code>
          </div>
        </div>
        <div className="g-grid">
          <div className={cn(CELL, "g-col-4 g-order-sm-last")}>
            <code>g-col-4 g-order-sm-last</code>
          </div>
          <div className={cn(CELL, "g-col-4 g-order-sm-first")}>
            <code>g-col-4 g-order-sm-first</code>
          </div>
          <div className={cn(CELL, "g-col-8 g-col-sm-2")}>
            <code>g-col-8 g-col-sm-2</code>
          </div>
        </div>
      </div>

      <Subtitle>Subgrid</Subtitle>
      <Note>
        A spanned element whose children (dark) sit on the page grid&apos;s own columns (light).
      </Note>
      <div className="g-grid">
        {Array.from({ length: 16 }, (_, index) => (
          // Parent columns behind the subgrid, on the same row; the mobile grid has 4.
          <div
            key={index}
            className="row-start-1 min-h-16 bg-surface mobile:nth-[n+5]:hidden"
            style={{ gridColumn: index + 1 }}
          />
        ))}
        <div className="g-col-12 g-offset-2 g-subgrid row-start-1 items-center py-2.5">
          <div className={cn(CELL, "g-col-4 bg-alpha-20")}>
            <code>g-col-12 g-offset-2 g-subgrid › g-col-4</code>
          </div>
          <div className={cn(CELL, "g-col-6 g-offset-6 bg-alpha-20")}>
            <code>g-col-6 g-offset-6</code>
          </div>
        </div>
      </div>

      <Subtitle>Equal columns</Subtitle>
      <Note>Independent of the page grid; one column on mobile.</Note>
      <div className="flex flex-col gap-2.5">
        {[2, 3, 4].map((count) => (
          <div key={count} className={`g-grid-cols-${count}`}>
            {Array.from({ length: count }, (_, index) => (
              <div key={index} className={CELL}>
                <code>g-grid-cols-{count}</code>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Flex() {
  return (
    <>
      <Note>
        Tailwind flex: <code>flex</code> (row) or <code>flex flex-col</code> (column), placed with{" "}
        <code>items-*</code> and <code>justify-*</code>. Also <code>justify-between</code>,{" "}
        <code>flex-wrap</code>, <code>flex-1</code>, <code>flex-none</code>,{" "}
        <code>self-start|center|end|stretch</code>.
      </Note>
      <div className="g-grid-cols-3">
        {positions.map(([position, className]) => (
          <div key={position} className={cn("flex h-32 bg-surface", className)}>
            <code className="bg-surface-strong p-2.5 g-text-tiny leading-body">
              flex {className}
            </code>
          </div>
        ))}
      </div>
    </>
  );
}

function Sizes() {
  return (
    <>
      <Note>
        <code>--size-N</code> = N × 0.25rem, which is Tailwind&apos;s spacing scale:{" "}
        <code>p-4</code>, <code>gap-2.5</code>, <code>mt-auto</code>. Layout tokens go in arbitrary
        values: <code>px-[var(--margin)]</code>, <code>gap-[var(--gutter)]</code>.
      </Note>
      <Rows>
        {sizes.map((size) => (
          <Row key={size} label={`--size-${size}`}>
            <div className="h-2.5 bg-accent" style={{ width: `var(--size-${size})` }} />
          </Row>
        ))}
      </Rows>

      <Subtitle>Layout</Subtitle>
      <Rows>
        {layoutTokens.map((token) => (
          <Row key={token} label={`--${token}`}>
            <div className="h-2.5 bg-accent" style={{ width: `var(--${token})` }} />
          </Row>
        ))}
      </Rows>

      <Subtitle>Max widths</Subtitle>
      <Note>
        Also <code>max-w-full</code> and, mobile only, <code>mobile:max-w-full</code>.
      </Note>
      <Rows>
        {maxWidths.map((width) => (
          <Row key={width} label={`.max-w-${width} · --max-w-${width}`}>
            <div className="h-2.5 bg-accent" style={{ maxWidth: `var(--max-w-${width})` }} />
          </Row>
        ))}
      </Rows>

      <Subtitle>Radius</Subtitle>
      <Note>
        Unused by this design (square corners); set per brand. Tailwind:{" "}
        <code>rounded-none|sm|md|lg|full</code>.
      </Note>
      <Swatches>
        {radii.map((radius) => (
          <div key={radius} className="flex flex-col gap-2.5">
            <div
              className={cn(SWATCH, "bg-surface-strong")}
              style={{ borderRadius: `var(--radius-${radius})` }}
            />
            <code className={LABEL}>--radius-{radius}</code>
          </div>
        ))}
      </Swatches>
    </>
  );
}

function Utilities() {
  return (
    <>
      <Rows>
        <Row label="Display">
          <p>
            Tailwind <code>hidden|block|flex|inline-flex|grid</code>, mobile:{" "}
            <code>mobile:hidden|block|flex|grid</code>
          </p>
        </Row>
        <Row label="Overflow">
          <p>
            <code>overflow-hidden|clip|auto</code>
          </p>
        </Row>
        <Row label="Stacking">
          <p>
            <code>z-1|2</code>, <code>pointer-events-none|auto</code>
          </p>
        </Row>
        <Row label="Motion">
          <p>
            <code>data-animate-reveal</code>: fades in once in view (reduced motion: always shown)
          </p>
        </Row>
      </Rows>

      <Subtitle>Aspect ratios and placeholder</Subtitle>
      <div className="g-grid-cols-4">
        {ratios.map((ratio) => (
          <div key={ratio} className="flex flex-col gap-2.5">
            <div className={cn("g-checker", ratio)} />
            <code className={LABEL}>.{ratio}</code>
          </div>
        ))}
      </div>

      <Subtitle>Motion and state tokens</Subtitle>
      <Note>
        Motion values are mirrored in lib/animations.ts. Tailwind: <code>ease-out</code>,{" "}
        <code>ease-in-out</code>, <code>duration-[var(--duration-default)]</code>.
      </Note>
      <TokenRows tokens={[...motionTokens, ...stateTokens]} />
    </>
  );
}

const PARTS: Record<StylePart, () => ReactNode> = {
  Typography,
  Colours,
  Elements,
  Structure,
  Grid,
  Flex,
  Sizes,
  Utilities,
};

interface Props {
  part: StylePart;
}

export default function Styles({ part }: Props) {
  const Part = PARTS[part];
  return (
    <div className="styles g-page-margin">
      <section id={part.toLowerCase()} className="grid gap-5 pt-10 pb-20">
        <Part />
      </section>
    </div>
  );
}
