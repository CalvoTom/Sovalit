"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Cloud, Clouds, Environment, Float, Lightformer } from "@react-three/drei";

const ELECTRIK = "#0079e0";

/** Le « C » du logo Sovalit : anneau épais ouvert à droite, extrudé et biseauté. */
function useBrandC() {
  return useMemo(() => {
    const R = 1.5;
    const r = 0.8;
    const gap = 0.6;
    const shape = new THREE.Shape();
    shape.absarc(0, 0, R, gap, Math.PI * 2 - gap, false);
    shape.lineTo(Math.cos(-gap) * r, Math.sin(-gap) * r);
    shape.absarc(0, 0, r, Math.PI * 2 - gap, gap, true);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.6,
      bevelEnabled: true,
      bevelThickness: 0.24,
      bevelSize: 0.22,
      bevelSegments: 12,
      curveSegments: 128,
    });
    geo.center();
    return geo;
  }, []);
}

function Scene() {
  const rig = useRef<THREE.Group>(null);
  const brand = useRef<THREE.Mesh>(null);
  const geometry = useBrandC();
  const { viewport, size } = useThree();
  const pointer = useRef(new THREE.Vector2());

  const desktop = size.width >= 768;
  const scale = desktop ? Math.min(0.9, viewport.width / 15.5) : Math.min(0.95, viewport.width / 4.6);
  const x = desktop ? viewport.width * 0.13 : 0;
  const y = desktop ? -viewport.height * 0.1 : 0.2;

  useFrame((state, delta) => {
    if (!rig.current || !brand.current) return;
    pointer.current.lerp(state.pointer, Math.min(1, delta * 2.5));
    const p = pointer.current;
    rig.current.rotation.set(-p.y * 0.08, p.x * 0.12, 0);
    brand.current.rotation.y = -0.5 + Math.sin(state.clock.elapsedTime * 0.35) * 0.18 + p.x * 0.3;
  });

  return (
    <>
      <group ref={rig} position={[x, y, 0]} scale={scale}>
        <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh ref={brand} geometry={geometry} rotation={[0.18, -0.5, 0.12]}>
            <meshPhysicalMaterial color={ELECTRIK} roughness={0.18} clearcoat={1} clearcoatRoughness={0.08} />
          </mesh>
        </Float>
        <Float speed={1.6} floatIntensity={1.2}>
          <mesh position={[2.3, 1.6, 0.6]}>
            <sphereGeometry args={[0.38, 64, 64]} />
            <meshPhysicalMaterial color="#ffffff" roughness={0.25} clearcoat={1} />
          </mesh>
        </Float>
        <Float speed={2} floatIntensity={1.4}>
          <mesh position={[-2.1, -1.5, 1]}>
            <sphereGeometry args={[0.22, 48, 48]} />
            <meshPhysicalMaterial color={ELECTRIK} roughness={0.2} clearcoat={1} />
          </mesh>
        </Float>
      </group>

      {/* Mer de nuages au premier plan et en arrière-plan */}
      <Clouds material={THREE.MeshLambertMaterial} texture="/textures/cloud.png" limit={300}>
        <Cloud seed={2} segments={26} bounds={[16, 0.8, 2]} volume={7} color="#ffffff" position={[0, -3.3, 2.5]} fade={40} speed={0.12} opacity={0.95} />
        <Cloud seed={5} segments={14} bounds={[6, 1, 2]} volume={4} color="#f3f8ff" position={[-6.5, -1.6, -3]} fade={40} speed={0.1} opacity={0.8} />
        <Cloud seed={9} segments={12} bounds={[5, 1, 2]} volume={4} color="#f3f8ff" position={[7, -0.8, -5]} fade={40} speed={0.1} opacity={0.75} />
      </Clouds>
    </>
  );
}

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  // Coupe le rendu quand le hero n'est plus visible
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
      className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out-expo ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 13], fov: 35 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }}
        onCreated={() => requestAnimationFrame(() => setReady(true))}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[-4, 6, 8]} intensity={2} />
        <directionalLight position={[6, -2, -4]} intensity={1} color="#bfe0ff" />
        <Environment resolution={256} environmentIntensity={0.85}>
          <Lightformer form="rect" intensity={3} position={[0, 5, 4]} scale={[10, 3, 1]} />
          <Lightformer form="rect" intensity={1.5} position={[-6, 0, 3]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
          <Lightformer form="rect" intensity={1.2} position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} color="#cfe6ff" />
          <Lightformer form="ring" intensity={2} position={[2, 2, 6]} scale={2} />
        </Environment>
        <Scene />
      </Canvas>
    </div>
  );
}
