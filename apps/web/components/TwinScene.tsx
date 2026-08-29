'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { boxDepth, boxFaces, project, toPath, type Camera } from '../lib/projection';
import { STATUS_RISK, zones, type Zone } from '../lib/twin-data';
import type { Dictionary } from '../lib/i18n/dictionaries';
import { localePath, type Locale } from '../lib/i18n/config';

const VIEW = { width: 640, height: 440 };
const BASE_YAW = -0.62;
const PITCH = 0.46;
const SCALE = 84;

export function TwinScene({ locale, t }: { locale: Locale; t: Dictionary }) {
  const tw = t.demos.twin;
  const [selected, setSelected] = useState<Zone>(zones[1]);
  const [yaw, setYaw] = useState(BASE_YAW);
  const [dragging, setDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragOrigin = useRef<{ pointerX: number; yaw: number } | null>(null);

  // Idle drift makes the scene read as a model rather than an illustration.
  // Motion-sensitive visitors get a static view.
  useEffect(() => {
    if (!autoRotate || dragging) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const delta = now - previous;
      previous = now;
      setYaw((value) => value + delta * 0.00006);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoRotate, dragging]);

  const camera: Camera = useMemo(
    () => ({
      yaw,
      pitch: PITCH,
      scale: SCALE,
      center: { x: VIEW.width / 2, y: VIEW.height / 2 + 118 }
    }),
    [yaw]
  );

  const ordered = useMemo(
    () => [...zones].sort((a, b) => boxDepth(a, camera) - boxDepth(b, camera)),
    [camera]
  );

  const groundLines = useMemo(() => buildGround(camera), [camera]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      dragOrigin.current = { pointerX: event.clientX, yaw };
      setDragging(true);
      setAutoRotate(false);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [yaw]
  );

  const onPointerMove = useCallback((event: React.PointerEvent<SVGSVGElement>) => {
    const origin = dragOrigin.current;
    if (!origin) return;
    setYaw(origin.yaw + (event.clientX - origin.pointerX) * 0.006);
  }, []);

  const endDrag = useCallback((event: React.PointerEvent<SVGSVGElement>) => {
    dragOrigin.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const nudge = useCallback((direction: -1 | 1) => {
    setAutoRotate(false);
    setYaw((value) => value + direction * 0.18);
  }, []);

  return (
    <div className="twin-card">
      <div className="twin-topbar">
        <span>{tw.topbar}</span>
        <span className="live-dot">
          <i aria-hidden="true" /> {tw.live}
        </span>
      </div>

      <div className="twin-grid">
        <div className="twin-canvas">
          <svg
            ref={svgRef}
            className={`twin-svg${dragging ? ' is-dragging' : ''}`}
            viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
            role="group"
            aria-label={tw.sceneLabel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') nudge(-1);
              if (event.key === 'ArrowRight') nudge(1);
            }}
            tabIndex={0}
          >
            <defs>
              <linearGradient id="twin-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d1b26" />
                <stop offset="100%" stopColor="#070b10" />
              </linearGradient>
            </defs>

            <rect width={VIEW.width} height={VIEW.height} fill="url(#twin-sky)" />

            <g className="twin-ground" aria-hidden="true">
              {groundLines.map((line, index) => (
                <line key={index} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
              ))}
            </g>

            {ordered.map((zone) => {
              const isSelected = zone.id === selected.id;
              const label = project(labelAnchor(zone), camera);
              return (
                <g
                  key={zone.id}
                  className={`twin-zone status-${zone.status}${isSelected ? ' is-selected' : ''}`}
                  onClick={() => setSelected(zone)}
                >
                  {boxFaces(zone, camera).map((face, index) => (
                    <polygon
                      key={index}
                      className={`face face-${face.shade}`}
                      points={toPath(face.points)}
                    />
                  ))}
                  {/* Rounded like the polygon points: raw floats serialise to a
                      different digit count on server and client, which React
                      reports as a hydration mismatch. */}
                  <text
                    className="zone-label"
                    x={label.x.toFixed(2)}
                    y={label.y.toFixed(2)}
                    textAnchor="middle"
                  >
                    {zone.id}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="twin-controls">
            <button type="button" onClick={() => nudge(-1)} aria-label={tw.rotateLeft}>
              ‹
            </button>
            <button
              type="button"
              onClick={() => setAutoRotate((value) => !value)}
              aria-pressed={autoRotate}
            >
              {autoRotate ? tw.pause : tw.rotate}
            </button>
            <button type="button" onClick={() => nudge(1)} aria-label={tw.rotateRight}>
              ›
            </button>
          </div>

          <p className="twin-hint">{tw.hint}</p>
        </div>

        <div className="twin-panel">
          <span className="eyebrow">{tw.selectedEntity}</span>
          <h3>{tw.zones[selected.id].name}</h3>

          <div className="metric">
            <span>{tw.status}</span>
            <strong className={selected.status === 'delayed' ? 'danger' : ''}>
              {tw.statusLabels[selected.status]}
            </strong>
          </div>
          <div className="metric">
            <span>{tw.progress}</span>
            <strong>{selected.progress}%</strong>
          </div>
          <div className="metric">
            <span>{tw.variance}</span>
            <strong className={selected.delayDays > 0 ? 'danger' : ''}>
              {selected.delayDays > 0 ? `+${selected.delayDays}d` : '0d'}
            </strong>
          </div>
          <div className="metric">
            <span>{tw.risk}</span>
            <strong>{tw.riskLabels[STATUS_RISK[selected.status]]}</strong>
          </div>

          <div className="progress">
            <i style={{ width: `${selected.progress}%` }} />
          </div>

          <p className="twin-activity">{tw.zones[selected.id].activity}</p>

          <div className="twin-evidence">
            <span>{tw.evidence}</span>
            {selected.evidence.map((item) => (
              <i key={item}>{item}</i>
            ))}
          </div>

          {/* Zone selection also lives here so the model is fully keyboard-operable. */}
          <div className="zone-switch" role="group" aria-label={tw.selectZone}>
            {zones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                className={zone.id === selected.id ? 'is-active' : ''}
                aria-pressed={zone.id === selected.id}
                onClick={() => setSelected(zone)}
              >
                {zone.id}
              </button>
            ))}
          </div>

          <Link className="ghost-button" href={localePath(locale, '/products/construction-twin')}>
            {tw.askTwin}
          </Link>
        </div>
      </div>
    </div>
  );
}

function labelAnchor(zone: Zone) {
  return {
    x: zone.origin.x + zone.size.x / 2,
    y: zone.origin.y + zone.size.y + 0.18,
    z: zone.origin.z + zone.size.z / 2
  };
}

function buildGround(camera: Camera) {
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const extent = 4;
  const step = 0.8;

  for (let value = -extent; value <= extent + 0.001; value += step) {
    const alongZ = [
      project({ x: value, y: 0, z: -extent }, camera),
      project({ x: value, y: 0, z: extent }, camera)
    ];
    const alongX = [
      project({ x: -extent, y: 0, z: value }, camera),
      project({ x: extent, y: 0, z: value }, camera)
    ];
    lines.push({ x1: alongZ[0].x, y1: alongZ[0].y, x2: alongZ[1].x, y2: alongZ[1].y });
    lines.push({ x1: alongX[0].x, y1: alongX[0].y, x2: alongX[1].x, y2: alongX[1].y });
  }

  return lines;
}
