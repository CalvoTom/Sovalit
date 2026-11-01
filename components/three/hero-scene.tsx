"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";

const ELECTRIK = "#0079e0";
const ACIER = "#5a6078";

/** Le « C » de la marque : anneau épais ouvert à droite, extrudé et biseauté. */
function useBrandCGeometry() {
  return useMemo(() => {
    const R = 1.5;
    const r = 0.78;
    const gap = 0.62;
    const shape = new THREE.Shape();
    shape.absarc(0, 0, R, gap, Math.PI * 2 - gap, false);
    shape.lineTo(Math.cos(-gap) * r, Math.sin(-gap) * r);
    shape.absarc(0, 0, r, Math.PI * 2 - gap, gap, true);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.22,
      bevelSize: 0.2,
      bevelSegments: 10,
      curveSegments: 96,
    });
    geo.center();
    return geo;
  }, []);
}

function BlueMaterial() {
  return <meshPhysicalMaterial color={ELECTRIK} roughness={0.22} clearcoat={1} clearcoatRoughness={0.12} />;
}
function WhiteMaterial() {
  return <meshPhysicalMaterial color="#ffffff" roughness={0.3} clearcoat={0.8} clearcoatRoughness={0.2} />;
}

function Composition() {
  const group = useRef<THREE.Group>(null);
  const brandC = useRef<THREE.Mesh>(null);
  const cGeometry = useBrandCGeometry();
  const { viewport, size } = useThree();
  const pointer = useRef(new THREE.Vector2());

  // À droite du texte sur desktop, sous le texte sur mobile
  const desktop = size.width > 860;
  const scale = desktop ? Math.min(0.85, viewport.width / 18) : Math.min(0.72, viewport.width / 9);
  const baseX = desktop ? viewport.width * 0.27 : 0;
  const baseY = desktop ? 0.1 : -viewport.height * 0.33;

  useFrame((state, delta) => {
    if (!group.current || !brandC.current) return;
    pointer.current.lerp(state.pointer, Math.min(1, delta * 3));
    const p = pointer.current;
    const s = Math.min(window.scrollY / window.innerHeight, 1.2);
    const t = state.clock.elapsedTime;

    group.current.position.set(baseX + p.x * 0.25, baseY + s * 2.2 * scale, 0);
    group.current.rotation.set(-p.y * 0.12, p.x * 0.2, s * 0.15);
    brandC.current.rotation.y = -0.45 + Math.sin(t * 0.4) * 0.25 + p.x * 0.35 + s * 1.2;
  });

  return (
    <group ref={group} scale={scale}>
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
        <mesh ref={brandC} geometry={cGeometry} scale={1.35} rotation={[0.2, -0.45, 0.15]}>
          <BlueMaterial />
        </mesh>
      </Float>
      <Float speed={1.8} floatIntensity={1.2}>
        <mesh position={[2.2, 1.9, 0.8]}>
          <sphereGeometry args={[0.62, 64, 64]} />
          <WhiteMaterial />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={1.4} floatIntensity={1}>
        <RoundedBox args={[1, 1, 1]} radius={0.22} smoothness={6} position={[-2.3, -1.9, 0.6]} rotation={[0.5, 0.6, 0.2]}>
          <meshPhysicalMaterial color={ACIER} roughness={0.35} clearcoat={0.6} clearcoatRoughness={0.3} />
        </RoundedBox>
      </Float>
      <Float speed={2.2} rotationIntensity={2} floatIntensity={1.3}>
        <mesh position={[2.5, -1.7, 1.2]} rotation={[1, 0.3, 0]}>
          <torusGeometry args={[0.42, 0.17, 32, 96]} />
          <BlueMaterial />
        </mesh>
      </Float>
      <Float speed={1.9} rotationIntensity={1.2} floatIntensity={1.1}>
        <mesh position={[-2.2, 1.9, -0.4]} rotation={[0, 0, 0.9]}>
          <capsuleGeometry args={[0.22, 0.7, 12, 32]} />
          <WhiteMaterial />
        </mesh>
      </Float>
      <Float speed={2.4} floatIntensity={0.9}>
        <mesh position={[0.6, -2.4, 1.6]}>
          <sphereGeometry args={[0.42, 64, 64]} />
          <meshPhysicalMaterial color="#cfe6ff" roughness={0.05} transmission={1} thickness={1.2} ior={1.4} />
        </mesh>
      </Float>
      <Float speed={2.8} floatIntensity={1.6}>
        <mesh position={[-0.6, 2.5, 1.2]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <BlueMaterial />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  // Coupe le rendu quand le hero n'est plus à l'écran (batterie, perfs)
  useEffect(() => {
    if (!wrapper.current) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(wrapper.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      aria-hidden
      className={`absolute inset-0 z-[1] transition-opacity duration-[1400ms] ease-out-expo ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 14], fov: 35 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 0.95 }}
        onCreated={() => requestAnimationFrame(() => setReady(true))}
      >
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[-4, 6, 8]}
          intensity={2.2}
        />
        <directionalLight position={[6, -2, -4]} intensity={1.2} color="#9fd0ff" />

        {/* Studio d'éclairage généré localement (aucun fichier HDR à télécharger) */}
        <Environment resolution={256} environmentIntensity={0.8}>
          <Lightformer form="rect" intensity={3} position={[0, 5, 4]} scale={[10, 3, 1]} />
          <Lightformer form="rect" intensity={1.5} position={[-6, 0, 3]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
          <Lightformer form="rect" intensity={1.2} position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} color="#cfe6ff" />
          <Lightformer form="ring" intensity={2} position={[2, 2, 6]} scale={2} />
        </Environment>

        <Composition />
      </Canvas>
    </div>
  );
}
