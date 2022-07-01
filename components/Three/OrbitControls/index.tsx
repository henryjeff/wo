import {
  useFrame,
  extend,
  useThree,
  ReactThreeFiber,
  RootState,
} from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type OrbitControlsProps = {
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  lookAt?: THREE.Vector3;
  position?: {
    x?: number;
    y?: number;
    z?: number;
  };
  functionalPositions?: {
    x?: FunctionalPosition;
    y?: FunctionalPosition;
    z?: FunctionalPosition;
  };
};

type FunctionalPosition = (
  elapsedTime: number,
  state: RootState,
  delta: number
) => number;

const Controls: React.FC<OrbitControlsProps> = ({
  enableZoom,
  enablePan,
  enableRotate,
  lookAt,
  position,
  functionalPositions,
}) => {
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    if (position) {
      position.x ? (camera.position.x = position.x) : {};
      position.y ? (camera.position.y = position.y) : {};
      position.z ? (camera.position.z = position.z) : {};
    }
    if (functionalPositions) {
      const elapsedTime = state.clock.elapsedTime;
      functionalPositions.x
        ? (camera.position.x = functionalPositions.x(elapsedTime, state, delta))
        : {};
      functionalPositions.y
        ? (camera.position.y = functionalPositions.y(elapsedTime, state, delta))
        : {};

      console.log("HELLO??", camera.position.y);
      functionalPositions.z
        ? (camera.position.z = functionalPositions.z(elapsedTime, state, delta))
        : {};
    }
    lookAt ? camera.lookAt(lookAt) : {};
  });

  return (
    <orbitControls
      enableZoom={enableZoom || true}
      enablePan={enablePan || true}
      enableRotate={enableRotate || true}
      args={[camera, gl.domElement]}
    />
  );
};

extend({ OrbitControls });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

export default Controls;
