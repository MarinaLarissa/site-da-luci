/**
 * TibiaWheel — SVG circular Wheel of Destiny visualization
 *
 * 4 quadrants × 5 circles × variable slices per circle = 36 slices total.
 * Each slice renders as a filled arc segment. Fill level is proportional
 * to (currentPoints / maxPoints). A completed slice gets a glow border.
 *
 * Interaction: clicking a slice calls onSliceClick(sliceId).
 * The parent is responsible for point allocation logic.
 *
 * Overlay per quadrant (outer ring area):
 *   • Domain label
 *   • Quadrant total points
 *   • Revelation stage dots (● unlocked / ○ locked)
 */
import {
  WHEEL_SLICES,
  QUADRANT_CONFIG,
  CIRCLE_RADII,
  getSliceAngles,
  calcQuadrantTotal,
  getRevelationPerkId,
  REVELATION_PERKS,
} from '../../data/wheelNodes';

// ─── Constants ────────────────────────────────────────────────────────────────

const CX = 250;
const CY = 250;

// ─── Geometry helpers ─────────────────────────────────────────────────────────

/** Convert clockwise-from-top angle (deg) to SVG x,y at radius r */
function polar(r, angleDeg) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

/** SVG arc path for a donut ring segment */
function arcPath(innerR, outerR, startAngle, endAngle) {
  if (Math.abs(endAngle - startAngle) < 0.01) return '';
  const span = endAngle - startAngle;
  const largeArc = span > 180 ? 1 : 0;

  const os = polar(outerR, startAngle);
  const oe = polar(outerR, endAngle);
  const ie = polar(innerR, endAngle);
  const is_ = polar(innerR, startAngle);

  return [
    `M ${os.x.toFixed(2)} ${os.y.toFixed(2)}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${oe.x.toFixed(2)} ${oe.y.toFixed(2)}`,
    `L ${ie.x.toFixed(2)} ${ie.y.toFixed(2)}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${is_.x.toFixed(2)} ${is_.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

// ─── Component ────────────────────────────────────────────────────────────────

const TibiaWheel = ({
  vocation,
  slicePoints = {},
  availablePoints = 0,
  onSliceClick,
  selectedSliceId,
}) => {
  return (
    <svg
      viewBox="0 0 500 500"
      style={{ width: '100%', maxWidth: 500, display: 'block' }}
      aria-label="Wheel of Destiny"
    >
      <defs>
        {/* Glow filter for completed / selected slices */}
        <filter id="glow-strong" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Radial gradients for quadrant backgrounds */}
        {Object.entries(QUADRANT_CONFIG).map(([q, cfg]) => (
          <radialGradient key={`rg-${q}`} id={`grad-${q}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={cfg.colors.mid} stopOpacity="0.55" />
            <stop offset="100%" stopColor={cfg.colors.bg}  stopOpacity="0.90" />
          </radialGradient>
        ))}

        {/* Slice fill gradient: inner dark → outer bright */}
        {Object.entries(QUADRANT_CONFIG).map(([q, cfg]) => (
          <linearGradient key={`fill-${q}`} id={`fill-${q}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor={cfg.colors.mid}    stopOpacity="1" />
            <stop offset="100%" stopColor={cfg.colors.bright} stopOpacity="1" />
          </linearGradient>
        ))}
      </defs>

      {/* ── Base circle ── */}
      <circle cx={CX} cy={CY} r={248} fill="#070707" />

      {/* ── Quadrant background fills (full depth of all circles) ── */}
      {Object.entries(QUADRANT_CONFIG).map(([q, cfg]) => {
        const s = cfg.startAngle + 3;
        const e = cfg.endAngle - 3;
        return (
          <path
            key={`qbg-${q}`}
            d={arcPath(52, 241, s, e)}
            fill={`url(#grad-${q})`}
          />
        );
      })}

      {/* ── Slice arcs ── */}
      {WHEEL_SLICES.map((slice) => {
        const { quadrant, circle, slicePosition, maxPoints, id } = slice;
        const cfg    = QUADRANT_CONFIG[quadrant];
        const radii  = CIRCLE_RADII[circle];
        const angles = getSliceAngles(quadrant, circle, slicePosition);

        const current      = slicePoints[id] || 0;
        const fillRatio    = current / maxPoints;
        const isMaxed      = current >= maxPoints;
        const isSelected   = id === selectedSliceId;
        const isUnlockable = slice.requires.length === 0 ||
          slice.requires.some((reqId) => (slicePoints[reqId] || 0) >= (
            WHEEL_SLICES.find((s) => s.id === reqId)?.maxPoints ?? Infinity
          ));

        const { startAngle, endAngle } = angles;
        const span = endAngle - startAngle;

        // Background arc (always full span, very dark)
        const bgPath = arcPath(radii.innerR, radii.outerR, startAngle, endAngle);

        // Fill arc (proportional to fill ratio, from start angle)
        const fillEndAngle = startAngle + span * fillRatio;
        const fillPath = fillRatio > 0
          ? arcPath(radii.innerR, radii.outerR, startAngle, fillEndAngle)
          : null;

        // Border arc (slightly larger, for selected/maxed highlight)
        const borderPath = arcPath(radii.innerR - 1, radii.outerR + 1, startAngle - 0.3, endAngle + 0.3);

        // Opacity: dim locked slices that have no points
        const dimmed = !isUnlockable && current === 0;
        const opacity = dimmed ? 0.25 : 1;

        return (
          <g
            key={id}
            style={{ cursor: 'pointer', opacity }}
            onClick={() => onSliceClick && onSliceClick(id)}
          >
            {/* Dark background */}
            <path d={bgPath} fill="#111111" stroke="#1a1a1a" strokeWidth={0.5} />

            {/* Colored fill (progress) */}
            {fillPath && (
              <path
                d={fillPath}
                fill={`url(#fill-${quadrant})`}
                filter={isMaxed ? 'url(#glow-soft)' : undefined}
              />
            )}

            {/* Completed glow border */}
            {isMaxed && (
              <path
                d={borderPath}
                fill="none"
                stroke={cfg.colors.glow}
                strokeWidth={1.5}
                filter="url(#glow-soft)"
                opacity={0.8}
              />
            )}

            {/* Selected highlight */}
            {isSelected && (
              <path
                d={borderPath}
                fill="none"
                stroke="#f0c030"
                strokeWidth={2}
                filter="url(#glow-strong)"
              />
            )}

            {/* Subtle domain-tinted border */}
            <path
              d={arcPath(radii.innerR, radii.outerR, startAngle, endAngle)}
              fill="none"
              stroke={cfg.colors.bright}
              strokeWidth={0.4}
              opacity={0.5}
            />
          </g>
        );
      })}

      {/* ── Ring separator circles (at circle boundaries) ── */}
      {[52, 88, 127, 165, 203, 241].map((r) => (
        <circle
          key={`sep-${r}`}
          cx={CX} cy={CY} r={r}
          fill="none"
          stroke="#1e1e1e"
          strokeWidth={1.5}
        />
      ))}

      {/* ── Domain separator radial lines ── */}
      {[90, 180, 270, 0].map((angle) => {
        const inner = polar(52, angle);
        const outer = polar(242, angle);
        return (
          <line
            key={`div-${angle}`}
            x1={inner.x} y1={inner.y}
            x2={outer.x} y2={outer.y}
            stroke="#111111"
            strokeWidth={3}
          />
        );
      })}

      {/* ── Center medallion ── */}
      <circle cx={CX} cy={CY} r={52}  fill="#0a0a0a" stroke="#8B6914" strokeWidth={2} />
      <circle cx={CX} cy={CY} r={40}  fill="#1a0e05" stroke="#c8a020" strokeWidth={1} />
      <circle cx={CX} cy={CY} r={26}  fill="#2a1800" />
      <text
        x={CX} y={CY + 2}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={22} fill="#c8a020"
        style={{ userSelect: 'none' }}
      >✦</text>

      {/* ── Outer decorative ring ── */}
      <circle cx={CX} cy={CY} r={247} fill="none" stroke="#8B6914" strokeWidth={4} />
      <circle cx={CX} cy={CY} r={244} fill="none" stroke="#c8a020" strokeWidth={1} />
      <circle cx={CX} cy={CY} r={243} fill="none" stroke="#4a3800" strokeWidth={1} />

      {/* ── Cardinal gems ── */}
      {[0, 90, 180, 270].map((angle) => {
        const { x, y } = polar(244, angle);
        return (
          <g key={`gem-${angle}`}>
            <circle cx={x} cy={y} r={8} fill="#1a0e05" stroke="#c8a020" strokeWidth={1.5} />
            <circle cx={x} cy={y} r={4} fill="#8B6914" />
          </g>
        );
      })}

      {/* ── Corner ornaments ── */}
      {[45, 135, 225, 315].map((angle) => {
        const { x, y } = polar(244, angle);
        return (
          <g key={`orn-${angle}`} transform={`translate(${x},${y}) rotate(${angle})`}>
            <polygon points="0,-6 4,0 0,6 -4,0" fill="#c8a020" opacity={0.8} />
          </g>
        );
      })}

      {/* ── Quadrant overlays: label + total pts + revelation stage dots ── */}
      {Object.entries(QUADRANT_CONFIG).map(([q, cfg]) => {
        const midAngle = (cfg.startAngle + cfg.endAngle) / 2;
        const qTotal   = calcQuadrantTotal(slicePoints, q);

        // Count unlocked revelation stages
        const revPerkId = getRevelationPerkId(vocation, q);
        const revPerk   = revPerkId != null ? REVELATION_PERKS[revPerkId] : null;
        const stagesUnlocked = revPerk
          ? revPerk.tiers.filter((t) => qTotal >= t.points).length
          : 0;

        // Label at inner position, total below, dots at outer position
        const lblPos = polar(217, midAngle);
        const totPos = polar(225, midAngle);

        // Three dots spread slightly around the mid angle
        const DOT_SPREAD = 4.5;
        const dotPositions = [
          polar(233, midAngle - DOT_SPREAD),
          polar(233, midAngle),
          polar(233, midAngle + DOT_SPREAD),
        ];

        return (
          <g key={`lbl-${q}`} style={{ pointerEvents: 'none', userSelect: 'none' }}>
            {/* Domain label */}
            <text
              x={lblPos.x} y={lblPos.y}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={7} fill={cfg.colors.bright}
              fontWeight={700}
              letterSpacing={1}
            >
              {cfg.label.toUpperCase()}
            </text>

            {/* Quadrant total points */}
            <text
              x={totPos.x} y={totPos.y}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={6} fill={qTotal > 0 ? '#e8c030' : '#3a3a3a'}
            >
              {qTotal}
            </text>

            {/* Revelation stage dots: ● unlocked, ○ locked */}
            {dotPositions.map(({ x, y }, i) => {
              const unlocked = i < stagesUnlocked;
              return (
                <circle
                  key={i}
                  cx={x} cy={y} r={2}
                  fill={unlocked ? cfg.colors.glow : 'none'}
                  stroke={unlocked ? cfg.colors.glow : '#2a2a2a'}
                  strokeWidth={0.8}
                  opacity={unlocked ? 0.95 : 0.4}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

export default TibiaWheel;
