import { useRef, useMemo, Component, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Line, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS } from '../data/portfolio';

// ── WebGL Error Boundary ───────────────────────────────────────────────────────
class WebGLBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() { return { failed: true }; }

  componentDidCatch() {
    // Dismiss the loading screen even when WebGL fails
    this.props.onReady?.();
  }


  render() {
    if (this.state.failed) {
      return (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: '#020817', color: '#64748b',
          fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', textAlign: 'center',
        }}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚗</div>
            <div>3D view requires WebGL — please use a modern browser.</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Road Curve ─────────────────────────────────────────────────────────────────
export const ROAD_POINTS = [
  new THREE.Vector3(0, 0, 8),
  new THREE.Vector3(0, 0, -8),
  new THREE.Vector3(-6, 0, -28),
  new THREE.Vector3(-9, 0, -50),
  new THREE.Vector3(-5, 0, -72),
  new THREE.Vector3(2, 0, -90),
  new THREE.Vector3(9, 0, -110),
  new THREE.Vector3(9, 0, -130),
  new THREE.Vector3(3, 0, -150),
  new THREE.Vector3(-4, 0, -165),
  new THREE.Vector3(0, 0, -178),
];

export const curve = new THREE.CatmullRomCurve3(ROAD_POINTS);

// t positions of each project stop on the curve
export const PROJECT_STOPS = [
  { t: 0.30, index: 0 },
  { t: 0.60, index: 1 },
];

// ── Road Surface Geometry ──────────────────────────────────────────────────────
function createRoadGeo(c, width = 7.5, segments = 400) {
  const pts = c.getPoints(segments);
  const pos = [];
  const uvArr = [];
  const idx = [];

  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const fwd = pts[Math.min(i + 1, pts.length - 1)].clone().sub(p).normalize();
    const perp = new THREE.Vector3(-fwd.z, 0, fwd.x);

    const l = p.clone().addScaledVector(perp, width / 2);
    const r = p.clone().addScaledVector(perp, -width / 2);

    pos.push(l.x, 0.005, l.z, r.x, 0.005, r.z);
    uvArr.push(0, i / pts.length, 1, i / pts.length);

    if (i < pts.length - 1) {
      const b = i * 2;
      idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvArr, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

function getEdgePoints(c, side, width = 3.8, segments = 300) {
  return c.getPoints(segments).map((p, i, arr) => {
    const next = arr[Math.min(i + 1, arr.length - 1)];
    const fwd = next.clone().sub(p).normalize();
    const perp = new THREE.Vector3(-fwd.z, 0, fwd.x);
    const edge = p.clone().addScaledVector(perp, side * width);
    return [edge.x, 0.05, edge.z];
  });
}

function Road() {
  const geo = useMemo(() => createRoadGeo(curve), []);
  const leftEdge = useMemo(() => getEdgePoints(curve, 1), []);
  const rightEdge = useMemo(() => getEdgePoints(curve, -1), []);

  return (
    <>
      <mesh geometry={geo} receiveShadow>
        <meshStandardMaterial color="#07131f" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Glowing edge lines */}
      <Line points={leftEdge} color="#3b82f6" lineWidth={2.5} />
      <Line points={rightEdge} color="#3b82f6" lineWidth={2.5} />
    </>
  );
}

// ── Car Model ─────────────────────────────────────────────────────────────────
const BODY_COLOR = '#0e2044';
const TRIM_COLOR = '#1e3a6e';
const GLASS_COLOR = '#0a1628';

function CarModel({ scrollRef }) {
  const groupRef = useRef();
  const wheelsRef = useRef([]);

  useFrame(() => {
    const t = Math.max(0.001, Math.min(0.999, scrollRef.current));
    const pos = curve.getPointAt(t);
    const tan = curve.getTangentAt(t);

    groupRef.current.position.set(pos.x, 0.5, pos.z);
    groupRef.current.rotation.y = Math.atan2(tan.x, tan.z);

    wheelsRef.current.forEach((w) => {
      if (w) w.rotation.x -= 0.14;
    });
  });

  const wheelPos = [
    [-0.92, -0.22, 1.35],
    [0.92, -0.22, 1.35],
    [-0.92, -0.22, -1.35],
    [0.92, -0.22, -1.35],
  ];

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[2.0, 0.52, 4.2]} />
        <meshStandardMaterial color={BODY_COLOR} metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 0.52, 0.28]} castShadow>
        <boxGeometry args={[1.6, 0.5, 2.4]} />
        <meshStandardMaterial color={BODY_COLOR} metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Windshield */}
      <mesh position={[0, 0.52, 1.47]}>
        <boxGeometry args={[1.5, 0.44, 0.07]} />
        <meshStandardMaterial color={GLASS_COLOR} transparent opacity={0.75} metalness={0.95} />
      </mesh>
      {/* Rear glass */}
      <mesh position={[0, 0.52, -0.92]}>
        <boxGeometry args={[1.5, 0.44, 0.07]} />
        <meshStandardMaterial color={GLASS_COLOR} transparent opacity={0.75} metalness={0.95} />
      </mesh>
      {/* Side trim stripe left */}
      <mesh position={[-1.01, 0.06, 0]}>
        <boxGeometry args={[0.04, 0.1, 3.8]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1.5} />
      </mesh>
      {/* Side trim stripe right */}
      <mesh position={[1.01, 0.06, 0]}>
        <boxGeometry args={[0.04, 0.1, 3.8]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1.5} />
      </mesh>
      {/* Headlights L */}
      <mesh position={[-0.58, 0.08, 2.12]}>
        <boxGeometry args={[0.52, 0.14, 0.06]} />
        <meshStandardMaterial color="#93c5fd" emissive="#93c5fd" emissiveIntensity={4} />
      </mesh>
      {/* Headlights R */}
      <mesh position={[0.58, 0.08, 2.12]}>
        <boxGeometry args={[0.52, 0.14, 0.06]} />
        <meshStandardMaterial color="#93c5fd" emissive="#93c5fd" emissiveIntensity={4} />
      </mesh>
      {/* Tail lights L */}
      <mesh position={[-0.6, 0.08, -2.12]}>
        <boxGeometry args={[0.45, 0.12, 0.06]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2.5} />
      </mesh>
      {/* Tail lights R */}
      <mesh position={[0.6, 0.08, -2.12]}>
        <boxGeometry args={[0.45, 0.12, 0.06]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2.5} />
      </mesh>
      {/* Wheels */}
      {wheelPos.map((p, i) => (
        <group key={i} position={p}>
          <mesh ref={(el) => (wheelsRef.current[i] = el)} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.38, 0.38, 0.26, 14]} />
            <meshStandardMaterial color="#0a0f1a" metalness={0.3} roughness={0.8} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.27, 8]} />
            <meshStandardMaterial color="#1e3a6e" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}
      {/* Headlight beam */}
      <pointLight position={[0, 0.2, 2.8]} color="#93c5fd" intensity={5} distance={22} decay={2} />
    </group>
  );
}

// ── Project Marker (3D visual only — card is rendered in the UI layer) ─────────
function ProjectMarker({ stop, scrollRef }) {
  const project = PROJECTS[stop.index];
  const pillarMatRef = useRef(null);
  const lightRef = useRef(null);

  const signPos = useMemo(() => {
    const pos = curve.getPointAt(stop.t);
    const tan = curve.getTangentAt(stop.t);
    const perp = new THREE.Vector3(-tan.z, 0, tan.x);
    return pos.clone().addScaledVector(perp, -11);
  }, [stop.t]);

  useFrame(({ clock }) => {
    const dist = Math.abs(scrollRef.current - stop.t);
    const vis = Math.max(0, 1 - dist / 0.15);
    if (pillarMatRef.current) {
      pillarMatRef.current.emissiveIntensity = 0.5 + Math.sin(clock.elapsedTime * 2.5) * 0.4;
    }
    if (lightRef.current) {
      lightRef.current.intensity = vis * 5;
    }
  });

  const pColor = project.color;

  return (
    <group position={[signPos.x, 0, signPos.z]}>
      {/* Glowing pillar */}
      <mesh position={[0, 3.5, 0]}>
        <boxGeometry args={[0.28, 7, 0.28]} />
        <meshStandardMaterial
          ref={pillarMatRef}
          color={pColor}
          emissive={pColor}
          emissiveIntensity={0.8}
          metalness={0.9}
        />
      </mesh>
      {/* Sign board */}
      <mesh position={[0, 7.5, 0]}>
        <boxGeometry args={[3.8, 1.4, 0.18]} />
        <meshStandardMaterial color="#071226" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 7.5, 0.1]}>
        <boxGeometry args={[3.6, 1.2, 0.05]} />
        <meshStandardMaterial color={pColor} emissive={pColor} emissiveIntensity={0.3} metalness={0.5} />
      </mesh>
      <pointLight ref={lightRef} color={pColor} intensity={0} distance={25} decay={2} position={[0, 4, 0]} />
    </group>
  );
}

// ── Chase Camera ───────────────────────────────────────────────────────────────
function CameraController({ scrollRef }) {
  const { camera } = useThree();
  const camPos = useRef(new THREE.Vector3(0, 6, 14));
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const t = Math.max(0.005, Math.min(0.995, scrollRef.current));
    const pos = curve.getPointAt(t);
    const tan = curve.getTangentAt(t);

    const target = pos.clone().addScaledVector(tan, -10).add(new THREE.Vector3(0, 5.5, 0));
    const focus = pos.clone().addScaledVector(tan, 7).add(new THREE.Vector3(0, 0.5, 0));

    camPos.current.lerp(target, 0.045);
    lookAt.current.lerp(focus, 0.045);

    camera.position.copy(camPos.current);
    camera.lookAt(lookAt.current);
  });

  return null;
}

// ── Environment ────────────────────────────────────────────────────────────────
function Environment() {
  return (
    <>
      <color attach="background" args={['#020817']} />
      <fog attach="fog" args={['#020817', 35, 130]} />
      <ambientLight color="#0a1e38" intensity={3} />
      <directionalLight position={[15, 25, 10]} color="#3b82f6" intensity={1.2} castShadow />
      <pointLight position={[0, 12, -90]} color="#1e40af" intensity={2} distance={80} />
      <Stars radius={160} depth={70} count={4000} factor={5} saturation={0} fade speed={0.4} />
      {/* Ground grid */}
      <gridHelper args={[600, 80, '#0d2040', '#081424']} position={[0, -0.02, -85]} />
    </>
  );
}

// ── Scene Contents ─────────────────────────────────────────────────────────────
function SceneContents({ scrollRef }) {
  return (
    <>
      <Environment />
      <Road />
      {PROJECT_STOPS.map((stop) => (
        <ProjectMarker key={stop.index} stop={stop} scrollRef={scrollRef} />
      ))}
      <CarModel scrollRef={scrollRef} />
      <CameraController scrollRef={scrollRef} />
    </>
  );
}

// ── Canvas Export ──────────────────────────────────────────────────────────────
export default function Scene3D({ scrollRef, onReady }) {
  return (
    <WebGLBoundary onReady={onReady}>
      <Canvas
        camera={{ fov: 58, near: 0.1, far: 600, position: [0, 6, 14] }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#020817');
          // Signal that WebGL is initialised and the first frame is ready
          if (onReady) onReady();
        }}
      >
        <Suspense fallback={null}>
          <SceneContents scrollRef={scrollRef} />
          <Preload all />
        </Suspense>
      </Canvas>
    </WebGLBoundary>
  );
}
