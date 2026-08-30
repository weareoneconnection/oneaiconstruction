/**
 * The OneAI Construction mark system.
 *
 * Three marks, one construction. White is the built thing; cyan is what the
 * platform adds. Nothing in any of them is decorative — every line is either
 * structure or intelligence.
 *
 * - `oneai` is a king-post truss: the triangle and its tie beam make the A,
 *   the member running through it makes the 1.
 * - `os` is that structure in section — the layers the platform is built
 *   from, with the intelligence layer reaching past the rest.
 * - `twin` is the same volume in axonometric, drawn twice. The outline is the
 *   approved baseline, the solid is what was measured, and the displacement
 *   between them is the variance.
 *
 * The marks stand without a container. `boxed` returns the app-icon lockup and
 * is for favicons and launcher tiles only — never in running layout.
 */

export type MarkName = 'oneai' | 'os' | 'twin';

const LABELS: Record<MarkName, string> = {
  oneai: 'OneAI Construction',
  os: 'Construction OS',
  twin: 'Construction Twin'
};

/** Optical stroke weight, shared so the three sit at the same visual density. */
const STROKE = 3.2;

function Glyph({ name }: { name: MarkName }) {
  if (name === 'oneai') {
    return (
      <>
        <path
          d="M32 13 L53 51 L11 51 Z"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.9"
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
        <line
          x1="21"
          y1="35"
          x2="43"
          y2="35"
          stroke="currentColor"
          strokeOpacity="0.9"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        <line
          x1="32"
          y1="13"
          x2="32"
          y2="51"
          stroke="var(--cyan)"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
      </>
    );
  }

  if (name === 'os') {
    return (
      <>
        <rect
          x="12"
          y="16"
          width="28"
          height="4.6"
          rx="2.3"
          fill="currentColor"
          fillOpacity="0.34"
        />
        <rect x="12" y="26" width="40" height="4.6" rx="2.3" fill="var(--cyan)" />
        <rect
          x="12"
          y="36"
          width="28"
          height="4.6"
          rx="2.3"
          fill="currentColor"
          fillOpacity="0.34"
        />
        <rect
          x="12"
          y="46"
          width="28"
          height="4.6"
          rx="2.3"
          fill="currentColor"
          fillOpacity="0.34"
        />
      </>
    );
  }

  return (
    <>
      <path
        d="M29 13 L48 23.5 L29 34 L10 23.5 Z"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.36"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M35 30 L54 40.5 L35 51 L16 40.5 Z"
        fill="var(--cyan)"
        fillOpacity="0.16"
        stroke="var(--cyan)"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </>
  );
}

export function BrandMark({
  name = 'oneai',
  size = 38,
  boxed = false,
  title
}: {
  name?: MarkName;
  size?: number;
  /** App icons and favicons only. */
  boxed?: boolean;
  /** Omit inside a link that already names itself — the mark is then decorative. */
  title?: string;
}) {
  return (
    <svg
      className="brand-glyph"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {boxed && (
        <rect
          x="1"
          y="1"
          width="62"
          height="62"
          rx="16"
          fill="var(--cyan-wash)"
          stroke="var(--cyan-edge)"
          strokeWidth="1"
        />
      )}
      <Glyph name={name} />
    </svg>
  );
}

export { LABELS as MARK_LABELS };
