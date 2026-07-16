"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function CoilModel() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Nhẹ nhàng tự động xoay cuộn thép
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Vỏ ngoài thép */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.5, 2.5, 4, 64, 1, true]} />
        <meshStandardMaterial
          color="#dcdcdc"
          metalness={0.9}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Lõi bên trong */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 4, 64, 1, true]} />
        <meshStandardMaterial
          color="#b0b0b0"
          metalness={0.6}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Độ dày mép (vành) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 2, 0]} castShadow receiveShadow>
        <ringGeometry args={[1.5, 2.5, 64]} />
        <meshStandardMaterial
          color="#dcdcdc"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} castShadow receiveShadow>
        <ringGeometry args={[1.5, 2.5, 64]} />
        <meshStandardMaterial
          color="#dcdcdc"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

export function SteelCoilShowcase() {
  return (
    <section className="antra-section bg-[#080808] text-white overflow-hidden flex flex-col justify-center min-h-[700px] relative">
      <div className="antra-section-heading compact !w-full !max-w-5xl mx-auto relative z-10">
        <p className="antra-kicker" style={{ color: "rgba(255,255,255,0.5)" }}>TRẢI NGHIỆM 3D</p>
        <h2 className="!text-[clamp(1.5rem,3vw,2.5rem)] text-white">THÉP CUỘN <span className="text-[#9C8A73]">MẠ KẼM</span></h2>
        <p style={{ marginTop: 16, color: "rgba(255,255,255,0.7)" }}>
          Chạm và xoay để xem chi tiết chất lượng bề mặt tôn mạ kẽm. 
          Hiệu suất được tối ưu hóa mượt mà ở 60FPS.
        </p>
      </div>

      <div className="absolute inset-0 top-[20%] w-full h-[80%] z-0 cursor-grab active:cursor-grabbing">
        {/* Tối ưu hóa mạnh mẽ ở Canvas */}
        <Canvas 
          dpr={[1, 1.5]} 
          frameloop="demand" 
          camera={{ position: [5, 4, 6], fov: 45 }}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          {/* Môi trường giả lập độ bóng cực nhẹ (không dùng đèn thật tốn tài nguyên) */}
          <Environment preset="studio" />
          
          <CoilModel />
          
          {/* Bóng đổ giả, rất nhẹ */}
          <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          
          {/* Cho phép tương tác */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>
    </section>
  );
}
