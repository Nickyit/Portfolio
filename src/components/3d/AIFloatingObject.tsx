import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const NODE_COUNT = 40;
const MAX_DISTANCE = 3.5;

export const AIFloatingObject = () => {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const { mouse } = useThree();

  // Create initial nodes
  const { positions, velocities, colors, sizes, linePositions, lineColors } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities = [];
    const colors = new Float32Array(NODE_COUNT * 3);
    const sizes = new Float32Array(NODE_COUNT);

    const MAX_LINES = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
    const linePositions = new Float32Array(MAX_LINES * 6);
    const lineColors = new Float32Array(MAX_LINES * 8);

    const color1 = new THREE.Color('#42A5F5'); // Electric Blue
    const color2 = new THREE.Color('#8A2BE2'); // Neon Purple
    const color3 = new THREE.Color('#FF4FD8'); // Magenta

    for (let i = 0; i < NODE_COUNT; i++) {
      // Position (Expanded to full screen)
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 15;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Velocity (slow organic drift)
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015
      ));

      // Color gradient based on x
      const t = (x + 6) / 12;
      const c = new THREE.Color();
      if (t < 0.5) {
        c.lerpColors(color1, color2, t * 2);
      } else {
        c.lerpColors(color2, color3, (t - 0.5) * 2);
      }
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      // Size
      sizes[i] = Math.random() * 0.5 + 0.3;
    }
    return { positions, velocities, colors, sizes, linePositions, lineColors };
  }, []);

  // Set up InstancedMesh and Geometry
  useEffect(() => {
    if (nodesRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < NODE_COUNT; i++) {
        dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        const s = sizes[i] * 0.15;
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(i, dummy.matrix);
        nodesRef.current.setColorAt(i, new THREE.Color(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]));
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
      if (nodesRef.current.instanceColor) {
        nodesRef.current.instanceColor.needsUpdate = true;
      }
    }
    
    if (linesRef.current) {
      const geom = linesRef.current.geometry;
      geom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      geom.setAttribute('color', new THREE.BufferAttribute(lineColors, 4));
    }
  }, [positions, sizes, colors, linePositions, lineColors]);

  useFrame((state) => {
    // Optimization: Skip expensive math and geometry updates if the Hero section is off-screen
    if (window.scrollY > window.innerHeight + 200) {
      return;
    }

    const time = state.clock.elapsedTime;
    
    // Smooth Parallax & Overall Rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05 + (mouse.x * 0.15);
      groupRef.current.rotation.x = -(mouse.y * 0.15);
    }

    // Node floating & dynamic connections
    if (nodesRef.current && linesRef.current) {
      const dummy = new THREE.Object3D();
      let lineCount = 0;

      for (let i = 0; i < NODE_COUNT; i++) {
        // Apply velocity
        positions[i * 3] += velocities[i].x;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z;

        let px = positions[i * 3];
        let py = positions[i * 3 + 1];
        let pz = positions[i * 3 + 2];
        
        // Bounce off bounds softly
        if (Math.abs(px) > 13) velocities[i].x *= -1;
        if (Math.abs(py) > 11) velocities[i].y *= -1;
        if (Math.abs(pz) > 8) velocities[i].z *= -1;

        // Subtle mouse repel effect
        const dx = px - (mouse.x * 10);
        const dy = py - (mouse.y * 10);
        const mouseDist = Math.sqrt(dx*dx + dy*dy);
        if (mouseDist < 3) {
          px += (dx / mouseDist) * 0.02;
          py += (dy / mouseDist) * 0.02;
        }

        dummy.position.set(px, py, pz);
        const s = sizes[i] * 0.15;
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(i, dummy.matrix);

        // Connections based on distance
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const ddx = px - positions[j * 3];
          const ddy = py - positions[j * 3 + 1];
          const ddz = pz - positions[j * 3 + 2];
          const dist = Math.sqrt(ddx*ddx + ddy*ddy + ddz*ddz);
          
          if (dist < MAX_DISTANCE) {
            const lpIdx = lineCount * 6;
            linePositions[lpIdx] = px;
            linePositions[lpIdx+1] = py;
            linePositions[lpIdx+2] = pz;
            linePositions[lpIdx+3] = positions[j * 3];
            linePositions[lpIdx+4] = positions[j * 3 + 1];
            linePositions[lpIdx+5] = positions[j * 3 + 2];

            const lcIdx = lineCount * 8;
            const alpha = 1.0 - (dist / MAX_DISTANCE);
            
            lineColors[lcIdx] = colors[i * 3];
            lineColors[lcIdx+1] = colors[i * 3 + 1];
            lineColors[lcIdx+2] = colors[i * 3 + 2];
            lineColors[lcIdx+3] = alpha * 0.8;
            lineColors[lcIdx+4] = colors[j * 3];
            lineColors[lcIdx+5] = colors[j * 3 + 1];
            lineColors[lcIdx+6] = colors[j * 3 + 2];
            lineColors[lcIdx+7] = alpha * 0.8;
            
            lineCount++;
          }
        }
      }
      
      nodesRef.current.instanceMatrix.needsUpdate = true;
      
      const geom = linesRef.current.geometry;
      geom.setDrawRange(0, lineCount * 2);
      
      if (geom.attributes.position && geom.attributes.color) {
        geom.attributes.position.needsUpdate = true;
        geom.attributes.color.needsUpdate = true;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#42A5F5" />
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#FF4FD8" />
      
      <Stars radius={50} depth={50} count={3500} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={80} scale={20} size={2} speed={0.3} opacity={0.4} color="#ffffff" />

      <EffectComposer>
        <Bloom luminanceThreshold={0.15} mipmapBlur intensity={1.5} />
      </EffectComposer>

      <group ref={groupRef}>
        {/* Dynamic Lines */}
        <lineSegments ref={linesRef}>
          <bufferGeometry />
          <lineBasicMaterial 
            vertexColors 
            transparent 
            opacity={0.7} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false} 
          />
        </lineSegments>

        {/* Nodes */}
        <instancedMesh ref={nodesRef} args={[undefined, undefined, NODE_COUNT]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshPhysicalMaterial 
            roughness={0.1}
            metalness={0.8}
            clearcoat={1}
            toneMapped={false}
          />
        </instancedMesh>
      </group>
    </>
  );
};
