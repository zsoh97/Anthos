import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Droplets,
  Flower2,
  Gift,
  Info,
  Palette,
  RotateCcw,
  Scissors,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { Flower, FLOWERS } from '../data/flowers';
import {
  ArrangementIntent,
  ArrangementRole,
  buildArrangementPlan,
  buildDynamicCompanions,
  COLOR_MOOD_META,
  ColorMood,
  evaluatePairCompatibility,
  FLORIST_PROFILE_MAP,
  FloristProfile,
  getHeroRoleCoaching,
  getRecommendedVesselId,
  getSquintTestReadout,
  LITERATURE_SOURCES,
  MARKET_FLORIST_PROFILES,
  ROLE_META,
  STYLE_WORLD_LABELS,
  VESSELS,
  VesselOption,
} from '../data/arrangements';

interface ArrangeViewProps {
  initialFlowerIds?: string[];
  onOpenFlower: (id: string) => void;
  onComposePosyFromStems?: (ids: string[]) => void;
}

type StepId = 1 | 2 | 3;

interface PlacedStem {
  index: number;
  flower: Flower;
  profile: FloristProfile;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  controlX: number;
  controlY: number;
  targetInches: number;
}

const ROLE_ORDER: ArrangementRole[] = ['branch', 'line', 'focal', 'filler'];

const ROLE_BADGE_STYLES: Record<ArrangementRole, string> = {
  branch: 'bg-[#EBE6D8] text-[#535843] border-[#D4CEBC]',
  line: 'bg-[#E9ECF2] text-[#3F4D6B] border-[#CFD6E3]',
  focal: 'bg-[#F3E5E3] text-[#7D3A3E] border-[#E2C8C5]',
  filler: 'bg-[#F2ECE0] text-[#7B6232] border-[#DFD2B8]',
};

const TRANSIT_STYLES = {
  sturdy: 'bg-[#EAEFE8] text-[#3F5C43] border-[#CDDBC9]',
  moderate: 'bg-[#F2ECE0] text-[#7B6232] border-[#DFD2B8]',
  delicate: 'bg-[#F6E8E4] text-[#8B3E31] border-[#E3C6BE]',
};

const TRANSIT_LABELS = {
  sturdy: 'Sturdy traveler',
  moderate: 'Handle gently',
  delicate: 'Delicate in transit',
};

function renderBotanicalMotif(
  motif: FloristProfile['motif'],
  x: number,
  y: number,
  color: string,
  isFocused: boolean
) {
  const scale = isFocused ? 1.12 : 1;
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      style={{ transition: 'transform 220ms ease' }}
    >
      {motif === 'peony' && (
        <>
          <circle r="19" fill={color} fillOpacity="0.16" />
          <circle r="13" fill={color} fillOpacity="0.28" stroke={color} strokeWidth="1.2" />
          <circle cx="-5" cy="-3" r="6" fill={color} fillOpacity="0.32" />
          <circle cx="5" cy="-2" r="5.5" fill={color} fillOpacity="0.28" />
          <circle cx="0" cy="4" r="6" fill={color} fillOpacity="0.36" />
          <circle r="3" fill="#FCF9F2" fillOpacity="0.85" />
        </>
      )}

      {motif === 'dome' && (
        <>
          <circle
            r="16"
            fill={color}
            fillOpacity="0.14"
            stroke={color}
            strokeWidth="1"
            strokeDasharray="2 2.5"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={deg}
                cx={Math.cos(rad) * 10}
                cy={Math.sin(rad) * 10}
                r="2.4"
                fill={color}
                fillOpacity="0.72"
              />
            );
          })}
          <circle r="3.2" fill={color} />
        </>
      )}

      {motif === 'spike' && (
        <>
          {[-26, -16, -6, 4, 14].map((dy, i) => (
            <g key={dy}>
              <ellipse
                cx={i % 2 === 0 ? -5 : 5}
                cy={dy}
                rx={4.5 - i * 0.2}
                ry={3.2}
                fill={color}
                fillOpacity={0.28 + i * 0.1}
                stroke={color}
                strokeWidth="0.9"
              />
              <ellipse
                cx={i % 2 === 0 ? 4 : -4}
                cy={dy - 3}
                rx={3.6}
                ry={2.6}
                fill={color}
                fillOpacity={0.22 + i * 0.08}
              />
            </g>
          ))}
          <circle cy="-31" r="2.2" fill={color} fillOpacity="0.65" />
        </>
      )}

      {motif === 'cloud' && (
        <>
          {[
            [-12, -4, 4.2],
            [-4, -12, 3.8],
            [7, -10, 4.4],
            [13, -1, 3.6],
            [4, 4, 4.2],
            [-7, 5, 3.4],
            [0, -3, 4.8],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="#FCF9F2"
              stroke={color}
              strokeWidth="1.2"
              fillOpacity="0.92"
            />
          ))}
          {[
            [-12, -4],
            [7, -10],
            [0, -3],
            [4, 4],
          ].map(([cx, cy], i) => (
            <circle key={`dot-${i}`} cx={cx} cy={cy} r="1.5" fill={color} />
          ))}
        </>
      )}

      {motif === 'trumpet' && (
        <>
          <path
            d="M 0 12 C -14 2 -16 -14 -4 -18 C 3 -20 15 -10 12 2 C 10 8 4 12 0 12 Z"
            fill={color}
            fillOpacity="0.22"
            stroke={color}
            strokeWidth="1.3"
          />
          <line
            x1="0"
            y1="7"
            x2="1"
            y2="-11"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="1" cy="-11" r="2.1" fill={color} />
        </>
      )}

      {motif === 'star' && (
        <>
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="0"
              cy="-9"
              rx="4.2"
              ry="9.5"
              transform={`rotate(${deg})`}
              fill={color}
              fillOpacity="0.24"
              stroke={color}
              strokeWidth="1"
            />
          ))}
          <circle r="3.5" fill="#FCF9F2" stroke={color} strokeWidth="1.2" />
        </>
      )}

      {motif === 'branch' && (
        <>
          <path
            d="M -18 14 Q -4 0 18 -14"
            fill="none"
            stroke="#5D5140"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M -4 2 Q 2 -10 12 -18"
            fill="none"
            stroke="#5D5140"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          {[
            [-11, 7, 4.2],
            [-2, -2, 5],
            [8, -9, 4.6],
            [15, -14, 3.6],
            [6, -15, 3.8],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={color}
              fillOpacity="0.34"
              stroke={color}
              strokeWidth="1"
            />
          ))}
        </>
      )}

      {motif === 'cup' && (
        <>
          {[0, 72, 144, 216, 288].map((deg) => (
            <circle
              key={deg}
              cx={Math.cos((deg * Math.PI) / 180) * 8}
              cy={Math.sin((deg * Math.PI) / 180) * 8}
              r="7.5"
              fill={color}
              fillOpacity="0.24"
              stroke={color}
              strokeWidth="1"
            />
          ))}
          <circle r="4.2" fill="#26221C" fillOpacity="0.82" />
        </>
      )}
    </g>
  );
}

/** Putnam-style Color Bar + Tonal Value Swatch Strip */
function PutnamColorBar({
  items,
  compact = false,
}: {
  items: { flower: Flower; profile: FloristProfile }[];
  compact?: boolean;
}) {
  if (items.length === 0) return null;
  const squint = getSquintTestReadout(items.map((x) => x.profile));

  return (
    <div className="rounded-xl bg-[#FCF9F2] border border-[#DFD7C6] p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#6E6659]">
          <Palette className="w-3.5 h-3.5" />
          <span>Putnam Color Bar</span>
        </span>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full border ${
            squint.passes
              ? 'bg-[#EAEFE8] text-[#3F5C43] border-[#CDDBC9]'
              : 'bg-[#FBF3E4] text-[#8A5A12] border-[#E2C894]'
          }`}
        >
          {squint.label}
        </span>
      </div>

      {/* Swatch Bar */}
      <div className="grid grid-flow-col auto-cols-fr gap-1.5">
        {items.map(({ flower, profile }) => (
          <div key={flower.id} className="min-w-0">
            <div
              className="h-6 rounded-md border border-[#CFC6B4]/80"
              style={{ backgroundColor: profile.swatchHex }}
              title={`${flower.name}: ${profile.colorFamily} (${profile.tonalValue} value)`}
            />
            {!compact && (
              <div className="mt-1 truncate text-[10.5px] font-book italic text-[#4A443A]">
                {flower.name}
              </div>
            )}
            <div className="text-[9px] uppercase tracking-[0.12em] text-[#8A8173] truncate">
              {profile.tonalValue} · {profile.isNeutral ? 'neutral' : profile.colorFamily.split(' ')[0]}
            </div>
          </div>
        ))}
      </div>

      {!compact && (
        <p className="text-[11.5px] leading-relaxed text-[#5C5549] mt-2.5 pt-2 border-t border-[#EFE9DC]">
          {squint.note}
        </p>
      )}
    </div>
  );
}

/** Visual Study: Renders EITHER a Vase Blueprint OR a Hand-Tied Gift Bouquet Spiral */
function ArrangementBlueprint({
  intent,
  vessel,
  items,
  activeFlowerId,
  onSelectFlower,
}: {
  intent: ArrangementIntent;
  vessel: VesselOption;
  items: { flower: Flower; profile: FloristProfile }[];
  activeFlowerId: string | null;
  onSelectFlower: (id: string) => void;
}) {
  const tableY = 326;
  const vesselGeometry = {
    pitcher: { rimY: 224, waterY: 266 },
    cylinder: { rimY: 196, waterY: 248 },
    compote: { rimY: 268, waterY: 288 },
    'bud-trio': { rimY: 252, waterY: 284 },
  }[vessel.id];

  const vesselHeightPx = tableY - vesselGeometry.rimY;
  const idealLineY = Math.max(
    42,
    Math.round(vesselGeometry.rimY - vesselHeightPx * 1.18)
  );

  const ordered = useMemo(() => {
    return [...items].sort(
      (a, b) =>
        ROLE_META[a.profile.role].placementOrder -
        ROLE_META[b.profile.role].placementOrder
    );
  }, [items]);

  const placed: PlacedStem[] = useMemo(() => {
    const centerX = 240;
    const n = ordered.length;
    if (n === 0) return [];

    // Hand-tied gift bouquet spiral geometry
    if (intent === 'bouquet') {
      const bindY = 236;
      const spreadMap: Record<number, number[]> = {
        1: [0],
        2: [-52, 52],
        3: [-78, 0, 78],
        4: [-98, -32, 34, 98],
      };
      return ordered.map((item, idx) => {
        const { profile, flower } = item;
        const dx = (spreadMap[n] ?? [0])[idx] ?? 0;
        const lift =
          profile.role === 'line' || profile.role === 'branch'
            ? 148
            : profile.role === 'filler'
              ? 132
              : 106;
        const x = centerX + dx;
        const y = Math.max(58, bindY - lift + Math.abs(dx) * 0.14);
        // Stems cross at 45° through the single binding point!
        const footX = centerX - dx * 0.42;
        const footY = 322;
        return {
          index: idx + 1,
          flower,
          profile,
          x,
          y,
          baseX: footX,
          baseY: footY,
          controlX: centerX,
          controlY: bindY,
          targetInches: Math.round(8 * profile.heightRatio),
        };
      });
    }

    // Vase placement geometry
    return ordered.map((item, idx) => {
      const { profile, flower } = item;
      const targetInches = Math.round(vessel.heightInches * profile.heightRatio);
      const reachFactor = Math.min(1.65, Math.max(0.55, profile.heightRatio - 0.52));
      const baseLift =
        vessel.id === 'compote'
          ? 122 * reachFactor
          : vessel.id === 'bud-trio'
            ? 104 * reachFactor
            : vesselHeightPx * reachFactor * 0.92;

      let x = centerX;
      let y = Math.max(58, vesselGeometry.rimY - baseLift);
      let baseX = centerX;
      let baseY = vesselGeometry.rimY + 10;

      if (vessel.id === 'bud-trio') {
        const vaseCenters = [148, 240, 332];
        const vaseIdx = idx % 3;
        baseX = vaseCenters[vaseIdx];
        baseY = vesselGeometry.rimY + 16;
        const heightOffset = [0, -24, 14, -8][idx] ?? 0;
        const driftX = [-12, 8, 14, -6][idx] ?? 0;
        x = baseX + driftX;
        y = Math.max(60, Math.min(vesselGeometry.rimY - 38, y + heightOffset));
      } else if (vessel.id === 'compote') {
        const offsets = [
          { dx: -78, dy: -16, bx: 214 },
          { dx: 82, dy: 8, bx: 224 },
          { dx: -10, dy: 34, bx: 220 },
          { dx: 40, dy: -10, bx: 228 },
        ];
        const slot = offsets[idx % offsets.length];
        x = centerX + slot.dx;
        y = Math.max(58, Math.min(vesselGeometry.rimY - 36, y + slot.dy));
        baseX = slot.bx;
        baseY = vesselGeometry.rimY + 26;
      } else {
        const spreadMap: Record<number, number[]> = {
          1: [0],
          2: [-58, 58],
          3: [-86, 4, 86],
          4: [-106, -36, 36, 106],
        };
        const dx = (spreadMap[n] ?? [0])[idx] ?? 0;
        const roleYOffset =
          profile.role === 'focal'
            ? 24
            : profile.role === 'filler'
              ? 6
              : profile.role === 'branch'
                ? -18
                : -12;
        x = centerX + dx;
        y = Math.max(58, Math.min(vesselGeometry.rimY - 40, y + roleYOffset));
        baseX = centerX - dx * 0.16;
        baseY = vesselGeometry.rimY + 14;
      }

      const controlX = (baseX + x) / 2 + (x < centerX ? -12 : 12);
      const controlY = (baseY + y) / 2 + 8;

      return {
        index: idx + 1,
        flower,
        profile,
        x,
        y,
        baseX,
        baseY,
        controlX,
        controlY,
        targetInches,
      };
    });
  }, [ordered, intent, vessel, vesselGeometry.rimY, vesselHeightPx]);

  return (
    <div className="relative rounded-xl bg-[#FCF9F2] border border-[#DFD7C6] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[#EFE9DC] flex flex-wrap items-center justify-between gap-2 text-[10px] tracking-[0.2em] uppercase text-[#6E6659]">
        <span>
          {intent === 'bouquet'
            ? 'Hand-Tied Spiral Study · Gift Wrap'
            : `Placement Study · ${vessel.name}`}
        </span>
        <span>
          {intent === 'bouquet'
            ? '45° Spiral · Single Binding Point'
            : `Target: ${vessel.idealHeightRule.split('(')[0].trim()}`}
        </span>
      </div>

      <svg
        viewBox="0 0 480 356"
        className="w-full h-auto block select-none"
        role="img"
        aria-label={
          intent === 'bouquet'
            ? 'Hand-tied spiral gift bouquet diagram'
            : `Botanical arrangement diagram for ${vessel.name}`
        }
      >
        <defs>
          <pattern
            id="blueprint-dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="0.7" fill="#C9C0AE" fillOpacity="0.45" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="480" height="356" fill="url(#blueprint-dots)" />

        {intent === 'bouquet' ? (
          <>
            {/* Kraft Paper Back Cone */}
            <path
              d="M 142 152 L 240 286 L 338 152 Q 240 132 142 152 Z"
              fill="#E8DEC8"
              fillOpacity="0.65"
              stroke="#B5A68C"
              strokeWidth="1.2"
            />
            {/* Binding Point Guide */}
            <line
              x1="34"
              y1="236"
              x2="188"
              y2="236"
              stroke="#C8BEA9"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x="36"
              y="231"
              fill="#8A8173"
              fontSize="8.5"
              letterSpacing="1.4"
              fontFamily="Inter, sans-serif"
            >
              TWINE BINDING POINT
            </text>
            {/* Flat Cut Base Line */}
            <line
              x1="150"
              y1="322"
              x2="330"
              y2="322"
              stroke="#CFC6B4"
              strokeWidth="1.1"
              strokeDasharray="3 3"
            />
            <text
              x="240"
              y="339"
              textAnchor="middle"
              fill="#8A8173"
              fontSize="8.5"
              letterSpacing="1.4"
              fontFamily="Inter, sans-serif"
            >
              TRIM STEMS LEVEL · DAMP WRAP FOR TRANSIT
            </text>
          </>
        ) : (
          <>
            <line
              x1="34"
              y1={idealLineY}
              x2="446"
              y2={idealLineY}
              stroke="#C8BEA9"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x="36"
              y={idealLineY - 6}
              fill="#8A8173"
              fontSize="9"
              letterSpacing="1.6"
              fontFamily="Inter, sans-serif"
            >
              1.5× PROPORTION LINE
            </text>

            <line
              x1="34"
              y1={vesselGeometry.rimY}
              x2="96"
              y2={vesselGeometry.rimY}
              stroke="#DFD7C6"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <text
              x="36"
              y={vesselGeometry.rimY - 5}
              fill="#8A8173"
              fontSize="8.5"
              letterSpacing="1.4"
              fontFamily="Inter, sans-serif"
            >
              COLLAR / RIM
            </text>

            <line
              x1="44"
              y1={tableY}
              x2="436"
              y2={tableY}
              stroke="#CFC6B4"
              strokeWidth="1.2"
            />
          </>
        )}

        {/* Stems */}
        {placed.map((stem) => {
          const isFocused = activeFlowerId === stem.flower.id;
          return (
            <g key={`stem-${stem.flower.id}`}>
              <path
                d={`M ${stem.baseX} ${stem.baseY} Q ${stem.controlX} ${stem.controlY} ${stem.x} ${stem.y}`}
                fill="none"
                stroke={isFocused ? '#26221C' : '#657154'}
                strokeWidth={isFocused ? 2.2 : 1.5}
                strokeLinecap="round"
                opacity={isFocused ? 0.95 : 0.72}
              />
              {intent === 'vase' && vessel.id !== 'bud-trio' && (
                <path
                  d={`M ${stem.baseX + 3} ${stem.baseY} Q ${stem.controlX + 10} ${stem.controlY + 4} ${stem.x + (stem.x < 240 ? -16 : 16)} ${stem.y + 18}`}
                  fill="none"
                  stroke="#7D886B"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              )}
            </g>
          );
        })}

        {/* Hand-Tied Ribbon & Front Kraft Wrap OR Vessel */}
        {intent === 'bouquet' ? (
          <g>
            {/* Front Folded Kraft Paper Collar */}
            <path
              d="M 164 198 L 240 264 L 316 198 L 274 282 L 240 296 L 206 282 Z"
              fill="#F1E9D8"
              fillOpacity="0.88"
              stroke="#B5A68C"
              strokeWidth="1.3"
            />
            {/* Linen Twine Binding Band */}
            <rect
              x="219"
              y="231"
              width="42"
              height="10"
              rx="4"
              fill="#8B7355"
              stroke="#5D4B36"
              strokeWidth="1"
            />
            <path
              d="M 240 241 Q 226 258 218 268 M 240 241 Q 254 256 262 266"
              fill="none"
              stroke="#7A6347"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        ) : (
          <>
            {vessel.id === 'pitcher' && (
              <g>
                <path
                  d="M 196 266 L 284 266 L 287 320 Q 287 326 280 326 L 200 326 Q 193 326 193 320 Z"
                  fill="#DCE4E1"
                  fillOpacity="0.45"
                />
                <path
                  d="M 271 236 C 304 236 306 284 282 292"
                  fill="none"
                  stroke="#6E6659"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 209 224 C 209 242 192 258 193 292 C 193 314 202 326 212 326 L 268 326 C 278 326 287 314 287 292 C 288 258 271 242 271 224 Z"
                  fill="#EFE9DC"
                  fillOpacity="0.72"
                  stroke="#5C5549"
                  strokeWidth="1.5"
                />
                <ellipse
                  cx="240"
                  cy="224"
                  rx="31"
                  ry="5"
                  fill="#F7F3E9"
                  stroke="#5C5549"
                  strokeWidth="1.2"
                />
                <line
                  x1="196"
                  y1={vesselGeometry.waterY}
                  x2="284"
                  y2={vesselGeometry.waterY}
                  stroke="#7B9396"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              </g>
            )}

            {vessel.id === 'cylinder' && (
              <g>
                <rect
                  x="208"
                  y={vesselGeometry.waterY}
                  width="64"
                  height={tableY - vesselGeometry.waterY}
                  rx="2"
                  fill="#DCE4E1"
                  fillOpacity="0.52"
                />
                <rect
                  x="207"
                  y={vesselGeometry.rimY}
                  width="66"
                  height={tableY - vesselGeometry.rimY}
                  rx="3"
                  fill="#FCF9F2"
                  fillOpacity="0.28"
                  stroke="#5C5549"
                  strokeWidth="1.4"
                />
                <ellipse
                  cx="240"
                  cy={vesselGeometry.rimY}
                  rx="33"
                  ry="5"
                  fill="#FCF9F2"
                  fillOpacity="0.5"
                  stroke="#5C5549"
                  strokeWidth="1.1"
                />
              </g>
            )}

            {vessel.id === 'compote' && (
              <g>
                <path
                  d="M 218 310 L 208 326 L 272 326 L 262 310 Z"
                  fill="#EFE9DC"
                  stroke="#5C5549"
                  strokeWidth="1.4"
                />
                <path
                  d="M 158 268 Q 166 312 240 312 Q 314 312 322 268 Z"
                  fill="#EFE9DC"
                  fillOpacity="0.78"
                  stroke="#5C5549"
                  strokeWidth="1.5"
                />
                <ellipse
                  cx="240"
                  cy="268"
                  rx="82"
                  ry="7"
                  fill="#DCE4E1"
                  fillOpacity="0.45"
                  stroke="#5C5549"
                  strokeWidth="1.2"
                />
                <rect
                  x="206"
                  y="293"
                  width="28"
                  height="9"
                  rx="2"
                  fill="#B89B5E"
                  stroke="#7A6539"
                  strokeWidth="1"
                />
                {[210, 215, 220, 225, 230].map((px) => (
                  <line
                    key={px}
                    x1={px}
                    y1="293"
                    x2={px}
                    y2="287"
                    stroke="#7A6539"
                    strokeWidth="1"
                  />
                ))}
                <text
                  x="206"
                  y="341"
                  fill="#8A8173"
                  fontSize="8.5"
                  letterSpacing="1.3"
                  fontFamily="Inter, sans-serif"
                >
                  OFF-CENTER KENZAN
                </text>
              </g>
            )}

            {vessel.id === 'bud-trio' && (
              <g>
                {[
                  { cx: 148, h: 74, w: 30 },
                  { cx: 240, h: 82, w: 34 },
                  { cx: 332, h: 66, w: 28 },
                ].map((v, i) => {
                  const topY = tableY - v.h;
                  return (
                    <g key={i}>
                      <path
                        d={`M ${v.cx - 8} ${topY} L ${v.cx - 8} ${topY + 18} Q ${v.cx - v.w / 2} ${topY + 30} ${v.cx - v.w / 2 + 2} ${tableY} L ${v.cx + v.w / 2 - 2} ${tableY} Q ${v.cx + v.w / 2} ${topY + 30} ${v.cx + 8} ${topY + 18} L ${v.cx + 8} ${topY} Z`}
                        fill="#EFE9DC"
                        fillOpacity="0.72"
                        stroke="#5C5549"
                        strokeWidth="1.35"
                      />
                      <line
                        x1={v.cx - v.w / 2 + 4}
                        y1={tableY - 26}
                        x2={v.cx + v.w / 2 - 4}
                        y2={tableY - 26}
                        stroke="#7B9396"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                    </g>
                  );
                })}
              </g>
            )}
          </>
        )}

        {/* Bloom Motifs & Clean Pill Captions */}
        {placed.map((stem) => {
          const isFocused = activeFlowerId === stem.flower.id;
          const label =
            intent === 'bouquet'
              ? `${stem.flower.name}`
              : `${stem.flower.name} · ${stem.targetInches}"`;
          const pillW = Math.max(64, label.length * 5.7 + 16);
          const captionY = stem.y < 100 ? stem.y - 30 : stem.y + 30;
          const clampedX = Math.max(
            pillW / 2 + 12,
            Math.min(480 - pillW / 2 - 12, stem.x)
          );

          return (
            <g
              key={`head-${stem.flower.id}`}
              onClick={() => onSelectFlower(stem.flower.id)}
              className="cursor-pointer"
            >
              {renderBotanicalMotif(
                stem.profile.motif,
                stem.x,
                stem.y,
                stem.flower.accent,
                isFocused
              )}

              <g transform={`translate(${stem.x + 16}, ${stem.y - 16})`}>
                <circle
                  r="10"
                  fill={isFocused ? '#26221C' : '#FCF9F2'}
                  stroke={isFocused ? '#26221C' : '#8B8170'}
                  strokeWidth="1.2"
                />
                <text
                  textAnchor="middle"
                  dy="3.5"
                  fontSize="10"
                  fontFamily="EB Garamond, Georgia, serif"
                  fill={isFocused ? '#F7F3E9' : '#26221C'}
                >
                  {stem.index}
                </text>
              </g>

              <g transform={`translate(${clampedX}, ${captionY})`}>
                <rect
                  x={-pillW / 2}
                  y="-10"
                  width={pillW}
                  height="16"
                  rx="8"
                  fill="#FCF9F2"
                  fillOpacity="0.93"
                  stroke={isFocused ? '#26221C' : '#E5DEC9'}
                  strokeWidth="0.8"
                />
                <text
                  textAnchor="middle"
                  dy="1.5"
                  fontSize="10"
                  fontStyle="italic"
                  fontFamily="EB Garamond, Georgia, serif"
                  fill={isFocused ? '#26221C' : '#5C5549'}
                >
                  {label}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      <div className="px-4 py-2.5 bg-[#F7F3E9]/70 border-t border-[#EFE9DC] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#6E6659]">
        <span className="font-book italic">
          Tap any numbered bloom to inspect its buying, conditioning, and{' '}
          {intent === 'bouquet' ? 'gifting' : 'placement'} note.
        </span>
        <span className="text-[10px] tracking-[0.16em] uppercase">
          {intent === 'bouquet' ? 'Spiral & Damp Wrap' : vessel.mechanics}
        </span>
      </div>
    </div>
  );
}

export function ArrangeView({
  initialFlowerIds,
  onOpenFlower,
  onComposePosyFromStems,
}: ArrangeViewProps) {
  const validInitial = (initialFlowerIds ?? []).filter((id) =>
    Boolean(FLORIST_PROFILE_MAP[id])
  );

  const [intent, setIntent] = useState<ArrangementIntent>('vase');
  const [step, setStep] = useState<StepId>(validInitial.length > 0 ? 2 : 1);
  const [heroIds, setHeroIds] = useState<string[]>(
    validInitial.length > 0 ? validInitial.slice(0, 2) : []
  );
  const [companionIds, setCompanionIds] = useState<string[]>([]);
  const [colorMood, setColorMood] = useState<ColorMood>('analogous');
  const [vesselId, setVesselId] = useState<VesselOption['id']>('pitcher');
  const [vesselManuallyPicked, setVesselManuallyPicked] = useState(false);
  const [activeFlowerId, setActiveFlowerId] = useState<string | null>(
    validInitial[0] ?? null
  );
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<ArrangementRole | 'all'>('all');
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const flowerMap = useMemo(
    () => Object.fromEntries(FLOWERS.map((f) => [f.id, f])),
    []
  );

  const flowerNames = useMemo(
    () => Object.fromEntries(FLOWERS.map((f) => [f.id, f.name])),
    []
  );

  const marketItems = useMemo(
    () =>
      MARKET_FLORIST_PROFILES.map((profile) => ({
        profile,
        flower: flowerMap[profile.flowerId],
      })).filter((x): x is { profile: FloristProfile; flower: Flower } =>
        Boolean(x.flower)
      ),
    [flowerMap]
  );

  const allSelectedIds = useMemo(
    () => [...heroIds, ...companionIds.filter((id) => !heroIds.includes(id))],
    [heroIds, companionIds]
  );

  const heroItems = useMemo(
    () =>
      heroIds
        .map((id) => ({
          flower: flowerMap[id],
          profile: FLORIST_PROFILE_MAP[id],
        }))
        .filter((x): x is { flower: Flower; profile: FloristProfile } =>
          Boolean(x.flower && x.profile)
        ),
    [heroIds, flowerMap]
  );

  const selectedItems = useMemo(
    () =>
      allSelectedIds
        .map((id) => ({
          flower: flowerMap[id],
          profile: FLORIST_PROFILE_MAP[id],
        }))
        .filter((x): x is { flower: Flower; profile: FloristProfile } =>
          Boolean(x.flower && x.profile)
        ),
    [allSelectedIds, flowerMap]
  );

  // Live 5-Point Compatibility Check whenever 2 hero blooms are selected
  const pairReport = useMemo(() => {
    if (heroItems.length !== 2) return null;
    return evaluatePairCompatibility(
      heroItems[0].profile,
      heroItems[1].profile,
      intent,
      flowerNames
    );
  }, [heroItems, intent, flowerNames]);

  const recommendedVesselId = useMemo(
    () => getRecommendedVesselId(selectedItems.map((x) => x.profile)),
    [selectedItems]
  );
  const activeVesselId = vesselManuallyPicked ? vesselId : recommendedVesselId;
  const vessel = VESSELS.find((v) => v.id === activeVesselId) ?? VESSELS[0];

  const heroCoaching = useMemo(
    () =>
      getHeroRoleCoaching(
        heroItems.map((x) => x.profile),
        flowerNames,
        intent
      ),
    [heroItems, flowerNames, intent]
  );

  const companionGroups = useMemo(
    () =>
      buildDynamicCompanions(
        heroItems.map((x) => x.profile),
        allSelectedIds,
        colorMood,
        intent,
        flowerNames
      ),
    [heroItems, allSelectedIds, colorMood, intent, flowerNames]
  );

  const plan = useMemo(
    () =>
      buildArrangementPlan(
        selectedItems.map((x) => x.profile),
        vessel,
        intent,
        flowerNames
      ),
    [selectedItems, vessel, intent, flowerNames]
  );

  const filteredStep1 = useMemo(() => {
    const q = query.trim().toLowerCase();
    return marketItems.filter(({ flower, profile }) => {
      if (roleFilter !== 'all' && profile.role !== roleFilter) return false;
      if (!q) return true;
      return [
        flower.name,
        flower.latin,
        flower.season,
        profile.colorFamily,
        profile.availability,
        STYLE_WORLD_LABELS[profile.styleWorld],
        ROLE_META[profile.role].label,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [marketItems, roleFilter, query]);

  const focusedItem =
    selectedItems.find((x) => x.flower.id === activeFlowerId) ??
    selectedItems[0] ??
    null;

  const toggleHero = (id: string) => {
    setCheckedSteps({});
    setVesselManuallyPicked(false);
    setHeroIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 2) return prev;
      setCompanionIds((c) => c.filter((x) => x !== id));
      setActiveFlowerId(id);
      return [...prev, id];
    });
  };

  const swapSecondHero = (replacementId: string) => {
    if (heroIds.length < 2) return;
    setHeroIds([heroIds[0], replacementId]);
    setCompanionIds((c) => c.filter((x) => x !== replacementId));
    setActiveFlowerId(replacementId);
  };

  const addBridgeAndContinue = (bridgeId: string) => {
    if (!heroIds.includes(bridgeId) && !companionIds.includes(bridgeId)) {
      setCompanionIds((prev) => [...prev, bridgeId]);
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const splitIntoBudVases = () => {
    setIntent('vase');
    setVesselId('bud-trio');
    setVesselManuallyPicked(true);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCompanion = (id: string) => {
    if (heroIds.includes(id)) return;
    setCheckedSteps({});
    setVesselManuallyPicked(false);
    setCompanionIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (heroIds.length + prev.length >= 4) return prev;
      setActiveFlowerId(id);
      return [...prev, id];
    });
  };

  const removeAnyStem = (id: string) => {
    setCheckedSteps({});
    setHeroIds((prev) => prev.filter((x) => x !== id));
    setCompanionIds((prev) => prev.filter((x) => x !== id));
    if (activeFlowerId === id) {
      const remaining = allSelectedIds.filter((x) => x !== id);
      setActiveFlowerId(remaining[0] ?? null);
    }
  };

  const goToStep = (next: StepId) => {
    if (next > 1 && heroIds.length === 0) return;
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetAll = () => {
    setHeroIds([]);
    setCompanionIds([]);
    setVesselManuallyPicked(false);
    setActiveFlowerId(null);
    setCheckedSteps({});
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepsNav: { id: StepId; numeral: string; title: string; subtitle: string }[] = [
    {
      id: 1,
      numeral: 'I',
      title: 'Choose Blooms You Love',
      subtitle: 'Pick 1 star (or test 2 together)',
    },
    {
      id: 2,
      numeral: 'II',
      title: 'Pair Companions',
      subtitle: 'Putnam color + Floret roles',
    },
    {
      id: 3,
      numeral: 'III',
      title: intent === 'bouquet' ? 'Tie & Wrap Bouquet' : 'Arrange in a Vase',
      subtitle:
        intent === 'bouquet'
          ? '45° spiral, wrap & care tag'
          : 'Vessel, cuts & placement',
    },
  ];

  return (
    <section className="max-w-5xl mx-auto animate-soft-in">
      {/* Header + Vase vs. Gift Bouquet Intent Switcher */}
      <div className="pb-5 mb-6 border-b border-[#DFD7C6] flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="text-[10.5px] tracking-[0.26em] uppercase text-[#6E6659]">
            Grounded in Putnam · Floret · Constance Spry · Ariella Chezar
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-[#26221C] mt-1 tracking-wide font-medium">
            The Art of Arranging
          </h1>
        </div>

        {/* Intent Toggle: Arrange at Home vs. Gift Bouquet */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            role="group"
            aria-label="Arrangement purpose"
            className="inline-flex rounded-full p-1 bg-[#EFE9DC] border border-[#DFD7C6]"
          >
            <button
              type="button"
              onClick={() => {
                setIntent('vase');
                setCheckedSteps({});
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition cursor-pointer ${
                intent === 'vase'
                  ? 'bg-[#26221C] text-[#F7F3E9] shadow-xs'
                  : 'text-[#5C5549] hover:text-[#26221C]'
              }`}
            >
              <Flower2 className="w-3.5 h-3.5" />
              <span>For a Vase</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIntent('bouquet');
                setCheckedSteps({});
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition cursor-pointer ${
                intent === 'bouquet'
                  ? 'bg-[#26221C] text-[#F7F3E9] shadow-xs'
                  : 'text-[#5C5549] hover:text-[#26221C]'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Gift Bouquet</span>
            </button>
          </div>

          {allSelectedIds.length > 0 && (
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-full border border-[#DFD7C6] bg-[#FCF9F2] text-[#6E6659] hover:text-[#26221C] transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* 3-Chapter Progression Bar */}
      <nav
        aria-label="Arrangement learning steps"
        className="grid grid-cols-3 gap-2 sm:gap-3 mb-7"
      >
        {stepsNav.map((item) => {
          const isCurrent = step === item.id;
          const isCompleted = step > item.id && heroIds.length > 0;
          const isLocked = item.id > 1 && heroIds.length === 0;
          return (
            <button
              key={item.id}
              type="button"
              disabled={isLocked}
              onClick={() => goToStep(item.id)}
              className={`text-left rounded-xl p-3 sm:p-3.5 border transition ${
                isCurrent
                  ? 'bg-[#26221C] text-[#F7F3E9] border-[#26221C] shadow-xs cursor-pointer'
                  : isLocked
                    ? 'bg-[#F7F3E9]/50 text-[#A89F91] border-[#EAE3D4] cursor-not-allowed'
                    : 'bg-[#FCF9F2] text-[#26221C] border-[#DFD7C6] hover:border-[#B9AE99] cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span
                  className={`text-[10px] tracking-[0.2em] uppercase ${
                    isCurrent
                      ? 'text-[#CFC6B4]'
                      : isLocked
                        ? 'text-[#B5AC9D]'
                        : 'text-[#8A8173]'
                  }`}
                >
                  Chapter {item.numeral}
                </span>
                {isCompleted && (
                  <span className="w-4 h-4 rounded-full bg-[#EFE9DC] text-[#26221C] flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
              <div className="font-display text-lg sm:text-xl leading-tight mt-0.5 font-medium">
                {item.title}
              </div>
              <div
                className={`hidden sm:block text-[11px] mt-0.5 ${
                  isCurrent
                    ? 'text-[#CFC6B4]'
                    : isLocked
                      ? 'text-[#B5AC9D]'
                      : 'text-[#6E6659]'
                }`}
              >
                {item.subtitle}
              </div>
            </button>
          );
        })}
      </nav>

      {/* ============================================================
          CHAPTER I: CHOOSE 1 STAR BLOOM (OR TEST 2 FOR COMPATIBILITY)
         ============================================================ */}
      {step === 1 && (
        <div className="space-y-6 animate-soft-in">
          <div className="bg-[#FCF9F2] rounded-2xl border border-[#DFD7C6] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-xl">
              <div className="text-[10px] tracking-[0.22em] uppercase text-[#8A8173]">
                Chapter I ·{' '}
                {intent === 'bouquet'
                  ? 'Hand-Tied Gift Bouquet'
                  : 'Home Vase Arrangement'}
              </div>
              <h2 className="font-display text-3xl text-[#26221C] mt-1 font-medium">
                Pick a flower you love — or pick 2 to test their chemistry
              </h2>
              <p className="font-book text-[16px] text-[#5C5549] mt-1.5 leading-relaxed">
                Start with <strong>1 star bloom</strong> for the cleanest guided
                pairing, or choose <strong>2 blooms</strong> and we’ll check
                whether they truly work together in color, scale, season, and
                vase chemistry—and tell you honestly if they don’t.
              </p>
            </div>

            {heroItems.length === 1 && (
              <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                <div className="text-xs font-book italic text-[#5C5549]">
                  Starting with <strong>{heroItems[0].flower.name}</strong> (
                  {heroItems[0].profile.colorFamily})
                </div>
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#26221C] text-[#F7F3E9] text-xs tracking-[0.14em] uppercase hover:bg-[#3A342B] transition cursor-pointer"
                >
                  <span>Choose companions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* LIVE 5-POINT COMPATIBILITY VERDICT (When 2 Blooms Are Selected) */}
          {pairReport && heroItems.length === 2 && (
            <div
              className={`rounded-2xl border p-5 sm:p-6 animate-soft-in space-y-4 ${
                pairReport.verdict === 'natural'
                  ? 'bg-[#F3F6F1] border-[#C9D8C5]'
                  : pairReport.verdict === 'trick'
                    ? 'bg-[#FBF5E8] border-[#E3CCA0]'
                    : 'bg-[#FAF0EC] border-[#E3C1B5]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <span
                    className={`inline-block text-[10px] tracking-[0.2em] uppercase px-2.5 py-0.5 rounded-full border mb-2 ${
                      pairReport.verdict === 'natural'
                        ? 'bg-[#E3EDE0] text-[#325236] border-[#BCD0B7]'
                        : pairReport.verdict === 'trick'
                          ? 'bg-[#F4E6C5] text-[#7A5110] border-[#DFC48A]'
                          : 'bg-[#F2DCD4] text-[#843627] border-[#DFB6A7]'
                    }`}
                  >
                    {pairReport.verdict === 'natural'
                      ? '5-Point Check · Natural Match'
                      : pairReport.verdict === 'trick'
                        ? '5-Point Check · Needs a Florist’s Trick'
                        : '5-Point Check · Better Apart'}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#26221C] font-medium leading-tight">
                    {pairReport.headline}
                  </h3>
                  <p className="font-book text-[15.5px] text-[#4A443A] mt-1 leading-relaxed">
                    {pairReport.summary}
                  </p>
                </div>

                {/* Swatch Pair Preview */}
                <div className="flex items-center gap-2 shrink-0">
                  {heroItems.map(({ flower, profile }) => (
                    <div
                      key={flower.id}
                      className="bg-[#FCF9F2] rounded-xl border border-[#DFD7C6] p-1.5 text-center w-20"
                    >
                      <img
                        src={flower.image}
                        alt={flower.name}
                        className="w-full h-16 object-cover rounded-lg"
                      />
                      <div
                        className="h-2 rounded-full mt-1.5 border border-[#CFC6B4]/60"
                        style={{ backgroundColor: profile.swatchHex }}
                      />
                      <div className="font-book italic text-[11px] text-[#26221C] truncate mt-0.5">
                        {flower.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Real Floristry Dimensions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {pairReport.dimensions.map((dim) => (
                  <div
                    key={dim.label}
                    className="rounded-xl bg-[#FCF9F2]/90 border border-[#DFD7C6] p-3 text-xs leading-relaxed"
                  >
                    <div className="flex items-center gap-1.5 font-medium text-[#26221C] mb-1">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          dim.status === 'good'
                            ? 'bg-[#4E7A53]'
                            : dim.status === 'caution'
                              ? 'bg-[#C48924]'
                              : 'bg-[#B34330]'
                        }`}
                      />
                      <span>{dim.label}</span>
                    </div>
                    <p className="text-[#5C5549]">{dim.detail}</p>
                  </div>
                ))}
              </div>

              {/* Real Florist Escape Hatches When Incompatible / Tricky */}
              {pairReport.verdict !== 'natural' && (
                <div className="pt-3 border-t border-[#DFD7C6]/80 space-y-3">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#6E6659]">
                    What a Florist Would Do Instead
                  </div>

                  {pairReport.swapSuggestionsForSecond.length > 0 && (
                    <div>
                      <div className="text-xs text-[#4A443A] mb-2">
                        Keep <strong>{heroItems[0].flower.name}</strong> and
                        swap <strong>{heroItems[1].flower.name}</strong> for a
                        natural partner:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pairReport.swapSuggestionsForSecond.map((swap) => (
                          <button
                            key={swap.flowerId}
                            type="button"
                            onClick={() => swapSecondHero(swap.flowerId)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FCF9F2] border border-[#DFD7C6] hover:border-[#26221C] text-left transition cursor-pointer"
                          >
                            <span className="font-book italic text-sm text-[#26221C] font-medium">
                              Swap to {flowerNames[swap.flowerId]}
                            </span>
                            <span className="text-[10.5px] text-[#6E6659]">
                              ({swap.reason})
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {pairReport.bridgeSuggestionId && (
                      <button
                        type="button"
                        onClick={() =>
                          addBridgeAndContinue(pairReport.bridgeSuggestionId!)
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#26221C] text-[#F7F3E9] text-xs hover:bg-[#3A342B] transition cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>
                          Add {flowerNames[pairReport.bridgeSuggestionId]} as a
                          neutral bridge
                        </span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={splitIntoBudVases}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FCF9F2] border border-[#26221C] text-[#26221C] text-xs hover:bg-[#EFE9DC] transition cursor-pointer"
                    >
                      <span>Split into separate Bud Vases instead</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="text-xs text-[#6E6659] hover:text-[#26221C] underline underline-offset-4 px-2 py-1 cursor-pointer"
                    >
                      Continue with this pair anyway →
                    </button>
                  </div>
                </div>
              )}

              {pairReport.verdict === 'natural' && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#26221C] text-[#F7F3E9] text-xs tracking-[0.14em] uppercase hover:bg-[#3A342B] transition cursor-pointer"
                  >
                    <span>Next: Add accompanying stems</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Search & Role Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-[#8A8173] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search peony, carnation, blue, tropical…"
                className="w-full pl-9 pr-3 py-2 rounded-full bg-[#FCF9F2] border border-[#DFD7C6] text-xs text-[#26221C] placeholder:text-[#968D7E] focus:outline-none focus:border-[#26221C]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setRoleFilter('all')}
                className={`px-3 py-1 rounded-full text-[11px] border transition cursor-pointer ${
                  roleFilter === 'all'
                    ? 'bg-[#26221C] text-[#F7F3E9] border-[#26221C]'
                    : 'bg-[#FCF9F2] text-[#6E6659] border-[#DFD7C6] hover:text-[#26221C]'
                }`}
              >
                All ({marketItems.length})
              </button>
              {ROLE_ORDER.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1 rounded-full text-[11px] border transition cursor-pointer ${
                    roleFilter === role
                      ? 'bg-[#26221C] text-[#F7F3E9] border-[#26221C]'
                      : 'bg-[#FCF9F2] text-[#6E6659] border-[#DFD7C6] hover:text-[#26221C]'
                  }`}
                >
                  {ROLE_META[role].shortLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Market Flower Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredStep1.map(({ flower, profile }) => {
              const selected = heroIds.includes(flower.id);
              const disabled = !selected && heroIds.length >= 2;
              return (
                <button
                  key={flower.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => toggleHero(flower.id)}
                  className={`group text-left rounded-2xl border overflow-hidden transition flex flex-col ${
                    selected
                      ? 'bg-[#FCF9F2] border-[#26221C] ring-1 ring-[#26221C] shadow-sm cursor-pointer'
                      : disabled
                        ? 'bg-[#FCF9F2]/50 border-[#EAE3D4] opacity-50 cursor-not-allowed'
                        : 'bg-[#FCF9F2] border-[#DFD7C6] hover:border-[#B9AE99] hover:shadow-xs cursor-pointer'
                  }`}
                >
                  <div className="relative aspect-[4/4.2] w-full bg-[#F7F3E9] overflow-hidden border-b border-[#EFE9DC]">
                    <img
                      src={flower.image}
                      alt={flower.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-300"
                    />
                    <span
                      className={`absolute top-2.5 left-2.5 text-[9px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-full border backdrop-blur-xs ${
                        ROLE_BADGE_STYLES[profile.role]
                      }`}
                    >
                      {ROLE_META[profile.role].shortLabel}
                    </span>
                    <span
                      className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full border flex items-center justify-center text-xs transition ${
                        selected
                          ? 'bg-[#26221C] border-[#26221C] text-[#F7F3E9]'
                          : 'bg-[#FCF9F2]/90 border-[#CFC6B4] text-[#6E6659]'
                      }`}
                    >
                      {selected ? <Check className="w-3.5 h-3.5" /> : '+'}
                    </span>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-[#CFC6B4] shrink-0"
                          style={{ backgroundColor: profile.swatchHex }}
                        />
                        <span className="font-display text-xl text-[#26221C] leading-snug font-medium truncate">
                          {flower.name}
                        </span>
                      </div>
                      <div className="font-book italic text-xs text-[#6E6659] mt-0.5">
                        {profile.colorFamily} · {flower.season}
                      </div>
                    </div>
                    <div className="text-[10px] text-[#8A8173] mt-2 pt-2 border-t border-[#F0EAE0] flex items-center justify-between gap-1">
                      <span className="truncate">
                        {STYLE_WORLD_LABELS[profile.styleWorld]}
                      </span>
                      {intent === 'bouquet' && (
                        <span
                          className={`px-1.5 py-0.5 rounded-full border text-[8.5px] shrink-0 ${
                            TRANSIT_STYLES[profile.transitRating]
                          }`}
                        >
                          {profile.transitRating}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Continue Bar */}
          {heroItems.length > 0 && (
            <div className="sticky bottom-20 sm:bottom-5 z-20 flex justify-center">
              <div className="bg-[#26221C] text-[#F7F3E9] rounded-full px-4 sm:px-5 py-2.5 shadow-lg flex items-center gap-4 border border-[#3F3930]">
                <span className="font-book italic text-sm">
                  {heroItems.map((x) => x.flower.name).join(' + ')}
                  {pairReport && pairReport.verdict === 'apart'
                    ? ' (clash flagged above)'
                    : ''}
                </span>
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7F3E9] text-[#26221C] text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-[#EFE9DC] transition cursor-pointer"
                >
                  <span>Next: Companions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          CHAPTER II: PAIR COMPANIONS (PUTNAM COLOR + FLORET FORMULA)
         ============================================================ */}
      {step === 2 && (
        <div className="space-y-6 animate-soft-in">
          {/* Coaching + Live Putnam Color Bar */}
          <div className="bg-[#EFE9DC] rounded-2xl border border-[#DFD7C6] p-5 sm:p-6 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex items-center gap-2.5 shrink-0">
                {heroItems.map(({ flower }) => (
                  <div
                    key={flower.id}
                    className="bg-[#FCF9F2] p-1.5 rounded-xl border border-[#DFD7C6] shadow-xs"
                  >
                    <img
                      src={flower.image}
                      alt={flower.name}
                      className="w-16 h-20 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <div className="text-[10px] tracking-[0.22em] uppercase text-[#6E6659]">
                  Chapter II · Putnam Color Theory × Floret Roles
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-[#26221C] mt-1 font-medium leading-tight">
                  {heroCoaching.headline}
                </h2>
                <p className="font-book text-[15.5px] text-[#4A443A] mt-1.5 leading-relaxed">
                  {heroCoaching.body}
                </p>
              </div>
            </div>

            {/* Choose a Putnam Color Mood -> Dynamically Re-Ranks Companions */}
            <div className="pt-4 border-t border-[#DFD7C6]">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#6E6659] mb-2.5">
                Choose Your Color Theory Approach (Watch Companion Suggestions Adapt)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(
                  ['analogous', 'monochromatic', 'complementary'] as ColorMood[]
                ).map((mood) => {
                  const active = colorMood === mood;
                  return (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => setColorMood(mood)}
                      className={`text-left rounded-xl p-3 border transition cursor-pointer ${
                        active
                          ? 'bg-[#26221C] text-[#F7F3E9] border-[#26221C]'
                          : 'bg-[#FCF9F2] text-[#26221C] border-[#DFD7C6] hover:border-[#B9AE99]'
                      }`}
                    >
                      <div className="font-book text-[15px] font-medium">
                        {COLOR_MOOD_META[mood].label}
                      </div>
                      <div
                        className={`text-[11px] mt-0.5 ${
                          active ? 'text-[#CFC6B4]' : 'text-[#6E6659]'
                        }`}
                      >
                        {COLOR_MOOD_META[mood].subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="font-book italic text-[13.5px] text-[#5C5549] mt-2.5">
                {COLOR_MOOD_META[colorMood].rule}
              </p>
            </div>

            {/* Live Putnam Color Bar & Squint Test */}
            <PutnamColorBar items={selectedItems} />
          </div>

          {/* Current Gathered Bunch Summary Bar */}
          <div className="bg-[#FCF9F2] rounded-2xl border border-[#DFD7C6] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] tracking-[0.18em] uppercase text-[#8A8173] mr-1">
                Your Bunch ({allSelectedIds.length}/4):
              </span>
              {selectedItems.map(({ flower, profile }) => {
                const isHero = heroIds.includes(flower.id);
                return (
                  <span
                    key={flower.id}
                    className={`inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full border text-xs ${
                      isHero
                        ? 'bg-[#26221C] text-[#F7F3E9] border-[#26221C]'
                        : 'bg-[#EFE9DC] text-[#26221C] border-[#DFD7C6]'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full border border-white/40"
                      style={{ backgroundColor: profile.swatchHex }}
                    />
                    <span className="font-book italic text-[13.5px]">
                      {flower.name}
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-wider ${
                        isHero ? 'text-[#CFC6B4]' : 'text-[#6E6659]'
                      }`}
                    >
                      {ROLE_META[profile.role].shortLabel}
                    </span>
                    {!isHero && (
                      <button
                        type="button"
                        onClick={() => toggleCompanion(flower.id)}
                        aria-label={`Remove ${flower.name}`}
                        className="p-0.5 rounded-full hover:bg-[#DFD7C6] cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => goToStep(3)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#26221C] text-[#F7F3E9] text-[11px] tracking-[0.14em] uppercase hover:bg-[#3A342B] transition cursor-pointer shrink-0"
            >
              <span>
                {intent === 'bouquet'
                  ? 'Tie & wrap bouquet'
                  : 'How to arrange them'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dynamically Scored & Filtered Companion Groups */}
          <div className="space-y-5">
            {companionGroups.map((group) => (
              <div
                key={group.role}
                className="bg-[#FCF9F2] rounded-2xl border border-[#DFD7C6] p-5"
              >
                <div className="pb-3 mb-4 border-b border-[#EFE9DC]">
                  <span
                    className={`inline-block text-[9.5px] tracking-[0.16em] uppercase px-2.5 py-0.5 rounded-full border mb-1.5 ${
                      ROLE_BADGE_STYLES[group.role]
                    }`}
                  >
                    {ROLE_META[group.role].label} · {ROLE_META[group.role].floretTerm}
                  </span>
                  <h3 className="font-display text-2xl text-[#26221C] font-medium">
                    {group.heading}
                  </h3>
                  <p className="font-book italic text-[14.5px] text-[#6E6659] mt-0.5">
                    {group.lesson}
                  </p>
                </div>

                {group.suggestions.length === 0 ? (
                  <p className="text-xs font-book italic text-[#8A8173]">
                    No stems in this role cleanly match your chosen style world
                    and chemistry without a clash—try one of the other roles
                    above or below.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.suggestions.map((suggestion) => {
                      const flower = flowerMap[suggestion.profile.flowerId];
                      if (!flower) return null;
                      const isAdded = companionIds.includes(flower.id);
                      const isFull = !isAdded && allSelectedIds.length >= 4;

                      return (
                        <button
                          key={flower.id}
                          type="button"
                          disabled={isFull}
                          onClick={() => toggleCompanion(flower.id)}
                          className={`text-left rounded-xl p-3 border transition flex items-start gap-3.5 ${
                            isAdded
                              ? 'bg-[#EFE9DC] border-[#26221C] cursor-pointer'
                              : isFull
                                ? 'bg-[#F7F3E9]/50 border-[#EAE3D4] opacity-55 cursor-not-allowed'
                                : 'bg-[#F7F3E9]/70 border-[#E5DEC9] hover:border-[#B9AE99] hover:bg-[#F7F3E9] cursor-pointer'
                          }`}
                        >
                          <img
                            src={flower.image}
                            alt={flower.name}
                            className="w-14 h-18 object-cover rounded-lg border border-[#DFD7C6] bg-[#FCF9F2] shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full border border-[#CFC6B4] shrink-0"
                                    style={{
                                      backgroundColor:
                                        suggestion.profile.swatchHex,
                                    }}
                                  />
                                  <span className="font-display text-xl text-[#26221C] leading-tight font-medium">
                                    {flower.name}
                                  </span>
                                </div>
                                <div className="text-[10.5px] text-[#6E6659] mt-0.5">
                                  {suggestion.colorTag} · {suggestion.seasonTag}
                                </div>
                              </div>
                              <span
                                className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 text-xs ${
                                  isAdded
                                    ? 'bg-[#26221C] border-[#26221C] text-[#F7F3E9]'
                                    : 'bg-[#FCF9F2] border-[#CFC6B4] text-[#6E6659]'
                                }`}
                              >
                                {isAdded ? (
                                  <Check className="w-3.5 h-3.5" />
                                ) : (
                                  '+'
                                )}
                              </span>
                            </div>

                            <p className="text-xs leading-relaxed text-[#4A443A] mt-1.5">
                              {suggestion.whyItPairs}
                            </p>

                            {suggestion.transitWarning && (
                              <div className="text-[10.5px] text-[#9A5B14] mt-1.5 flex items-start gap-1">
                                <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                                <span>{suggestion.transitWarning}</span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Step 2 Footer Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="inline-flex items-center gap-1.5 text-xs text-[#6E6659] hover:text-[#26221C] transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change starting bloom</span>
            </button>

            <button
              type="button"
              onClick={() => goToStep(3)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#26221C] text-[#F7F3E9] text-xs tracking-[0.14em] uppercase hover:bg-[#3A342B] transition cursor-pointer"
            >
              <span>
                Chapter III:{' '}
                {intent === 'bouquet' ? 'Tie & Wrap Bouquet' : 'Arrange at Home'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          CHAPTER III: ARRANGE IN A VASE  —OR—  HAND-TIED GIFT BOUQUET
         ============================================================ */}
      {step === 3 && (
        <div className="space-y-8 animate-soft-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="inline-flex items-center gap-1.5 text-xs text-[#6E6659] hover:text-[#26221C] transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Adjust companions</span>
            </button>

            <div className="flex flex-wrap items-center gap-1.5">
              {selectedItems.map(({ flower, profile }) => (
                <span
                  key={flower.id}
                  className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full bg-[#FCF9F2] border border-[#DFD7C6] text-xs text-[#26221C]"
                >
                  <span
                    className="w-2 h-2 rounded-full border border-[#CFC6B4]"
                    style={{ backgroundColor: profile.swatchHex }}
                  />
                  <span className="font-book italic text-[13.5px]">
                    {flower.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#8A8173]">
                    {ROLE_META[profile.role].shortLabel}
                  </span>
                  {selectedItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAnyStem(flower.id)}
                      aria-label={`Remove ${flower.name}`}
                      className="p-0.5 rounded-full hover:bg-[#EFE9DC] text-[#8A8173] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left (7 cols): Blueprint + Florist Counter / Active Bloom Card */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-[#EFE9DC] rounded-2xl p-4 sm:p-5 border border-[#DFD7C6]">
                {intent === 'vase' ? (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] tracking-[0.22em] uppercase text-[#6E6659]">
                        Choose the Vessel You Have at Home
                      </span>
                      <span className="font-book italic text-xs text-[#6E6659]">
                        {vessel.heightInches}&quot; tall · {vessel.subtitle}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      {VESSELS.map((v) => {
                        const isSelected = v.id === vessel.id;
                        const isRecommended = v.id === recommendedVesselId;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => {
                              setVesselId(v.id);
                              setVesselManuallyPicked(true);
                            }}
                            className={`px-2.5 py-2 rounded-xl border text-left transition cursor-pointer ${
                              isSelected
                                ? 'bg-[#FCF9F2] border-[#26221C] text-[#26221C] shadow-xs'
                                : 'bg-[#F7F3E9]/70 border-[#DFD7C6] text-[#6E6659] hover:text-[#26221C] hover:border-[#B9AE99]'
                            }`}
                          >
                            <div className="text-xs font-medium leading-tight">
                              {v.name}
                            </div>
                            <div className="text-[10px] text-[#8A8173] mt-0.5">
                              {isRecommended
                                ? 'Best match'
                                : `${v.heightInches}" vessel`}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] tracking-[0.22em] uppercase text-[#6E6659]">
                      Hand-Tied Gift Bouquet Architecture
                    </span>
                    <span className="font-book italic text-xs text-[#6E6659]">
                      Sized to drop cleanly into a recipient’s 7–8&quot; vase
                    </span>
                  </div>
                )}

                <ArrangementBlueprint
                  intent={intent}
                  vessel={vessel}
                  items={selectedItems}
                  activeFlowerId={focusedItem?.flower.id ?? null}
                  onSelectFlower={(id) => setActiveFlowerId(id)}
                />
              </div>

              {/* Active Bloom Field Card */}
              {focusedItem && (
                <div className="bg-[#FCF9F2] rounded-2xl border border-[#DFD7C6] p-5 animate-soft-in">
                  <div className="flex items-start gap-4">
                    <img
                      src={focusedItem.flower.image}
                      alt={focusedItem.flower.name}
                      className="w-16 h-20 object-cover rounded-lg border border-[#DFD7C6] bg-[#F7F3E9] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`text-[9.5px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-full border ${
                              ROLE_BADGE_STYLES[focusedItem.profile.role]
                            }`}
                          >
                            {ROLE_META[focusedItem.profile.role].label}
                          </span>
                          {intent === 'bouquet' && (
                            <span
                              className={`text-[9.5px] px-2 py-0.5 rounded-full border ${
                                TRANSIT_STYLES[
                                  focusedItem.profile.transitRating
                                ]
                              }`}
                            >
                              {TRANSIT_LABELS[focusedItem.profile.transitRating]}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => onOpenFlower(focusedItem.flower.id)}
                          className="inline-flex items-center gap-1 text-[11px] text-[#6E6659] hover:text-[#26221C] underline underline-offset-4 cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Read plate</span>
                        </button>
                      </div>

                      <h3 className="font-display text-2xl text-[#26221C] mt-1 font-medium leading-tight">
                        {focusedItem.flower.name}{' '}
                        <span className="font-book italic text-sm text-[#6E6659] font-normal">
                          ({focusedItem.profile.idealStems})
                        </span>
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#EFE9DC] grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-[13px] leading-relaxed">
                    <div>
                      <div className="text-[9.5px] tracking-[0.18em] uppercase text-[#8A8173] mb-1">
                        At the Florist
                      </div>
                      <p className="text-[#4A443A]">
                        {focusedItem.profile.buyingTip}
                      </p>
                    </div>
                    <div>
                      <div className="text-[9.5px] tracking-[0.18em] uppercase text-[#8A8173] mb-1">
                        {intent === 'bouquet' ? 'For Gifting' : 'At the Sink'}
                      </div>
                      <p className="text-[#4A443A]">
                        {intent === 'bouquet'
                          ? focusedItem.profile.giftNote
                          : focusedItem.profile.conditioningTip}
                      </p>
                    </div>
                    <div>
                      <div className="text-[9.5px] tracking-[0.18em] uppercase text-[#8A8173] mb-1">
                        {intent === 'bouquet' ? 'In the Spiral' : 'In the Vase'}
                      </div>
                      <p className="text-[#4A443A]">
                        {focusedItem.profile.placementNote}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Gift Bouquet Bonus: Recipient Care Tag + Bridge to Anthos Posy Card */}
              {intent === 'bouquet' && (
                <div className="bg-[#FCF9F2] rounded-2xl border border-[#DFD7C6] p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#EFE9DC]">
                    <div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#8A8173]">
                        Tuck Inside the Wrap
                      </div>
                      <h3 className="font-display text-2xl text-[#26221C] font-medium">
                        Recipient Care Note &amp; Victorian Meaning Card
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs leading-relaxed text-[#4A443A]">
                    {plan.recipientCareTag.map((line, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#A89F91]">•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  {onComposePosyFromStems && (
                    <div className="pt-3 border-t border-[#EFE9DC] flex flex-wrap items-center justify-between gap-3">
                      <p className="font-book italic text-sm text-[#6E6659]">
                        Want to include the secret Victorian meanings of these
                        blooms with your gift?
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          onComposePosyFromStems(allSelectedIds.slice(0, 3))
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#26221C] text-[#F7F3E9] text-xs hover:bg-[#3A342B] transition cursor-pointer"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Write matching Posy card →</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right (5 cols): Color Bar + Readout + Step-by-Step Guide */}
            <div className="lg:col-span-5 space-y-5">
              <PutnamColorBar items={selectedItems} />

              <div className="bg-[#FCF9F2] rounded-2xl border border-[#DFD7C6] p-5 space-y-4">
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#8A8173]">
                    Floret Balance &amp; Chemistry
                  </div>
                  <h3 className="font-display text-2xl text-[#26221C] font-medium mt-0.5">
                    {plan.balanceTitle}
                  </h3>
                  <p className="font-book text-[15px] leading-relaxed text-[#4A443A] mt-1">
                    {plan.balanceNote}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="rounded-xl bg-[#F7F3E9] border border-[#E6DEC9] p-3 flex items-start gap-2.5">
                    <Droplets className="w-4 h-4 text-[#5C767A] shrink-0 mt-0.5" />
                    <div className="text-xs leading-relaxed text-[#4A443A]">
                      <div className="text-[9.5px] tracking-[0.16em] uppercase text-[#6E6659] mb-0.5">
                        Water Habit
                      </div>
                      {plan.waterGuidance}
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#F7F3E9] border border-[#E6DEC9] p-3 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-[#6E6659] shrink-0 mt-0.5" />
                    <div className="text-xs leading-relaxed text-[#4A443A]">
                      <div className="text-[9.5px] tracking-[0.16em] uppercase text-[#6E6659] mb-0.5">
                        Market Window
                      </div>
                      {plan.seasonNote}
                    </div>
                  </div>
                </div>

                {plan.warnings.length > 0 && (
                  <div className="space-y-2">
                    {plan.warnings.map((w) => (
                      <div
                        key={w.title}
                        className={`rounded-xl p-3.5 border flex items-start gap-2.5 text-xs leading-relaxed ${
                          w.tone === 'caution'
                            ? 'bg-[#FBF3E4] border-[#E2C894] text-[#5C4418]'
                            : 'bg-[#F5F2EA] border-[#DFD7C6] text-[#4A443A]'
                        }`}
                      >
                        <AlertTriangle
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            w.tone === 'caution'
                              ? 'text-[#A66B16]'
                              : 'text-[#6E6659]'
                          }`}
                        />
                        <div>
                          <div className="font-medium mb-0.5">{w.title}</div>
                          <p>{w.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Step-by-Step Checklist */}
              <div className="bg-[#FCF9F2] rounded-2xl border border-[#DFD7C6] p-5">
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#EFE9DC]">
                  <div className="inline-flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#6E6659]" />
                    <span className="text-[10.5px] tracking-[0.2em] uppercase text-[#6E6659]">
                      {intent === 'bouquet'
                        ? 'Hand-Tied Bouquet Sequence'
                        : 'Home Vase Sequence'}
                    </span>
                  </div>
                  <span className="text-[11px] font-book italic text-[#8A8173]">
                    Tap to check off
                  </span>
                </div>

                <ol className="space-y-2.5">
                  {plan.steps.map((s, idx) => {
                    const done = Boolean(checkedSteps[idx]);
                    return (
                      <li key={s.phase}>
                        <button
                          type="button"
                          onClick={() =>
                            setCheckedSteps((prev) => ({
                              ...prev,
                              [idx]: !prev[idx],
                            }))
                          }
                          className={`w-full text-left rounded-xl p-3.5 border transition flex items-start gap-3 cursor-pointer ${
                            done
                              ? 'bg-[#F7F3E9]/60 border-[#E5DEC9] opacity-70'
                              : 'bg-[#F7F3E9] border-[#DFD7C6] hover:border-[#B9AE99]'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition ${
                              done
                                ? 'bg-[#26221C] border-[#26221C] text-[#F7F3E9]'
                                : 'bg-[#FCF9F2] border-[#B9AE99] text-transparent'
                            }`}
                          >
                            <Check className="w-3 h-3" />
                          </span>
                          <div>
                            <div className="text-[9.5px] tracking-[0.18em] uppercase text-[#8A8173]">
                              {s.phase}
                            </div>
                            <div
                              className={`font-book text-[15px] text-[#26221C] font-medium ${
                                done ? 'line-through' : ''
                              }`}
                            >
                              {s.title}
                            </div>
                            <p className="text-xs leading-relaxed text-[#5C5549] mt-1">
                              {s.detail}
                            </p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>

          {/* Quiet Literature Colophon / Further Reading */}
          <div className="pt-8 border-t border-[#DFD7C6]">
            <div className="mb-4">
              <div className="text-[10px] tracking-[0.24em] uppercase text-[#6E6659]">
                Bibliography · The Craft Behind These Rules
              </div>
              <h2 className="font-display text-3xl text-[#26221C] mt-1 font-medium">
                Sources &amp; Further Reading
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {LITERATURE_SOURCES.map((src) => (
                <div
                  key={src.title}
                  className="bg-[#FCF9F2] rounded-xl border border-[#DFD7C6] p-4"
                >
                  <div className="font-display text-xl text-[#26221C] font-medium leading-snug">
                    <em>{src.title}</em>{' '}
                    <span className="text-xs font-sans text-[#8A8173] font-normal">
                      ({src.year})
                    </span>
                  </div>
                  <div className="text-[11px] tracking-[0.12em] uppercase text-[#6E6659] mt-0.5">
                    {src.author}
                  </div>
                  <p className="text-xs leading-relaxed text-[#5C5549] mt-2">
                    {src.contribution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
