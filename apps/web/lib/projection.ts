/**
 * Minimal 3D → 2D projection for the Twin scene.
 *
 * A full WebGL stack (three.js + react-three-fiber) would add roughly 600 KB
 * gzipped to the hero, which is the LCP element on the highest-traffic page.
 * The scene is a small set of axis-aligned boxes, so real rotation maths plus
 * painter's-algorithm SVG rendering gives the same result for a few kilobytes.
 */

export type Vec3 = { x: number; y: number; z: number };
export type Point2 = { x: number; y: number };

export type Box = {
  id: string;
  /** Near-bottom-left corner in world space. */
  origin: Vec3;
  /** Extent along x (width), y (height, up) and z (depth). */
  size: Vec3;
};

export type Camera = {
  /** Rotation about the vertical axis, in radians. */
  yaw: number;
  /** Rotation above the horizon, in radians. */
  pitch: number;
  scale: number;
  center: Point2;
};

/** Rotate a point around the world origin, then project orthographically. */
export function project(point: Vec3, camera: Camera): Point2 & { depth: number } {
  const cosYaw = Math.cos(camera.yaw);
  const sinYaw = Math.sin(camera.yaw);
  const cosPitch = Math.cos(camera.pitch);
  const sinPitch = Math.sin(camera.pitch);

  // Yaw about the Y axis.
  const x1 = point.x * cosYaw - point.z * sinYaw;
  const z1 = point.x * sinYaw + point.z * cosYaw;

  // Pitch about the X axis.
  const y2 = point.y * cosPitch - z1 * sinPitch;
  const z2 = point.y * sinPitch + z1 * cosPitch;

  return {
    x: camera.center.x + x1 * camera.scale,
    // Screen Y grows downward while world Y grows upward.
    y: camera.center.y - y2 * camera.scale,
    depth: z2
  };
}

type Face = { points: Point2[]; depth: number; shade: 'top' | 'left' | 'right' };

/**
 * Return the three visible faces of a box, already projected and depth-sorted
 * back-to-front so they can be painted in order.
 */
export function boxFaces(box: Box, camera: Camera): Face[] {
  const { origin: o, size: s } = box;

  const corners: Record<string, Vec3> = {
    // Bottom
    b000: { x: o.x, y: o.y, z: o.z },
    b100: { x: o.x + s.x, y: o.y, z: o.z },
    b101: { x: o.x + s.x, y: o.y, z: o.z + s.z },
    b001: { x: o.x, y: o.y, z: o.z + s.z },
    // Top
    t000: { x: o.x, y: o.y + s.y, z: o.z },
    t100: { x: o.x + s.x, y: o.y + s.y, z: o.z },
    t101: { x: o.x + s.x, y: o.y + s.y, z: o.z + s.z },
    t001: { x: o.x, y: o.y + s.y, z: o.z + s.z }
  };

  const p = Object.fromEntries(
    Object.entries(corners).map(([key, value]) => [key, project(value, camera)])
  ) as Record<string, Point2 & { depth: number }>;

  const faces: { keys: string[]; shade: Face['shade'] }[] = [
    { keys: ['t000', 't100', 't101', 't001'], shade: 'top' },
    { keys: ['b000', 'b100', 't100', 't000'], shade: 'left' },
    { keys: ['b100', 'b101', 't101', 't100'], shade: 'right' },
    { keys: ['b101', 'b001', 't001', 't101'], shade: 'left' },
    { keys: ['b001', 'b000', 't000', 't001'], shade: 'right' }
  ];

  return (
    faces
      .map((face) => {
        const points = face.keys.map((key) => p[key]);
        return {
          points: points.map(({ x, y }) => ({ x, y })),
          depth: points.reduce((sum, point) => sum + point.depth, 0) / points.length,
          shade: face.shade,
          winding: signedArea(points)
        };
      })
      // Back-face culling: after projection, faces pointing away wind the other way.
      .filter((face) => face.winding < 0)
      .sort((a, b) => a.depth - b.depth)
  );
}

/** Mean projected depth of a box, used to order boxes against each other. */
export function boxDepth(box: Box, camera: Camera): number {
  const centre: Vec3 = {
    x: box.origin.x + box.size.x / 2,
    y: box.origin.y + box.size.y / 2,
    z: box.origin.z + box.size.z / 2
  };
  return project(centre, camera).depth;
}

export function toPath(points: Point2[]): string {
  return points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' ');
}

function signedArea(points: Point2[]): number {
  let area = 0;
  for (let i = 0; i < points.length; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    area += a.x * b.y - b.x * a.y;
  }
  return area / 2;
}
