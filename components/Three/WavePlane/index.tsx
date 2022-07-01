import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Mesh } from "three";

import * as THREE from "three";
// @ts-ignore
import vertex from "./shaders/vertex.glsl";
// @ts-ignore
import fragment from "./shaders/fragment.glsl";

type WavePlaneProps = {
  waveScale?: number;
  speedScale?: number;
};

const WavePlane: React.FC<WavePlaneProps> = ({ waveScale, speedScale }) => {
  const meshRef = useRef<Mesh>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          uTime: {
            value: 0.0,
          },
          uCamPos: {
            value: new THREE.Vector3(0, 0, 0),
          },
          uPosScale: {
            value: 0.0,
          },
        },
        wireframe: true,
      }),
    []
  );

  useFrame((state) => {
    const time = (performance.now() / 5000) * (1.0 || speedScale);

    material.uniforms.uTime.value = time;
    material.uniforms.uCamPos.value = state.camera.position;
    material.uniforms.uPosScale.value = 1.0 || waveScale;

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 2;
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      <planeBufferGeometry attach="geometry" args={[64, 64, 64, 64]} />
    </mesh>
  );
};

export default WavePlane;
