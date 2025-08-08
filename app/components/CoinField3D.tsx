"use client";
import { Canvas } from "@react-three/fiber";
import { Instances, Instance, Environment, Effects } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";

function GoldMaterial() {
  const mat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#E8B448"),
      metalness: 1,
      roughness: 0.2,
      envMapIntensity: 1.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    return m;
  }, []);
  return <primitive object={mat} attach="material" />;
}

function Coins({ count = 200 }) {
  const positions = useMemo(() => {
    const a: [number, number, number, number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      a.push([
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.3) * 12,
        (Math.random() - 0.5) * 18,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ]);
    }
    return a;
  }, [count]);

  return (
    <Instances limit={count}>
      <cylinderGeometry args={[0.6, 0.6, 0.08, 64]} />
      <GoldMaterial />
      {positions.map(([x, y, z, rx, ry, rz], i) => (
        <Instance
          key={i}
          position={[x, y, z]}
          rotation={[rx, ry, rz]}
          onUpdate={(m: THREE.Object3D) => {
            const t = performance.now() / 20000 + i;
            m.position.x += Math.sin(t) * 0.002;
            m.position.y += Math.cos(t) * 0.0015;
            m.rotation.y += 0.002;
          }}
        />
      ))}
    </Instances>
  );
}

export default function CoinField3D() {
  return (
    <div className="absolute inset-0 hidden md:block -z-10">
      <Canvas camera={{ position: [0, 0, 12], fov: 55 }}>
        <Suspense fallback={null}>
          <directionalLight position={[5, 5, 5]} intensity={1.2} color={"#F4C56A"} />
          <directionalLight position={[-5, -2, -3]} intensity={0.6} color={"#C9992D"} />
          <ambientLight intensity={0.2} />
          <Coins />
          <Environment preset="city" />
          <Effects disableGamma>
            {/* @ts-ignore */}
            <unrealBloomPass threshold={0.8} strength={0.6} radius={0.4} />
          </Effects>
        </Suspense>
      </Canvas>
    </div>
  );
}
