import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Layout, DefaultHeadMetaTags } from "../components";
import styles from "./Home.module.css";
import logo from "../public/logo-new.svg";
import {
  Canvas,
  useFrame,
  extend,
  useThree,
  ReactThreeFiber,
} from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useRef, useState } from "react";
import { GridHelper, Mesh, ShaderMaterial } from "three";
import colors from "../styles/colors";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { motion } from "framer-motion";
import { faArrowRight, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import vertex from "./vertex.glsl";
// @ts-ignore
import fragment from "./fragment.glsl";
import gsap from "gsap";

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
const Controls = () => {
  const { camera, gl } = useThree();

  useFrame(() => {
    camera.position.x = 4;
    camera.position.y = Math.sin(Date.now() / 5000) * 3 + 6;
    camera.position.z = Math.sin(Date.now() / 10000) * 3;
    camera.lookAt(0, 0, 0);
  });

  return (
    <orbitControls
      enableZoom={false}
      enablePan={false}
      args={[camera, gl.domElement]}
    />
  );
};

const Grid = ({ isHovering }: { isHovering: boolean }) => {
  const meshRef = useRef<Mesh>(null);

  const material = new THREE.ShaderMaterial({
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
  });
  // move the grids z every frame
  useFrame((state, delta) => {
    const time = -performance.now() / 1000;
    material.uniforms.uTime.value = time;
    material.uniforms.uCamPos.value = state.camera.position;
    material.uniforms.uPosScale.value = 1.0;
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.002;
      meshRef.current.rotation.x = Math.PI / 2;
    }
  });
  return (
    <mesh ref={meshRef} material={material}>
      <planeBufferGeometry attach="geometry" args={[50, 50, 64, 64]} />
    </mesh>
  );
};

const Box = () => {
  const box = useRef<any>();

  useFrame(() => {
    if (box.current) {
      box.current.rotation.x += 0.01;
      box.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={box}>
      <boxGeometry attach="geometry" args={[3, 3, 3]} />
      <meshBasicMaterial wireframe attach="material" color="#fff" />
    </mesh>
  );
};

type AnimatedCanvasWrapperProps = {
  children?: React.ReactNode;
};

const AnimatedCanvasWrapper: React.FC<AnimatedCanvasWrapperProps> = ({
  children,
}) => {
  return (
    <motion.div
      className={styles.canvasWrapper}
      // {...bgAnimMountProps}
    >
      <Canvas>{children}</Canvas>
    </motion.div>
  );
};

const Home: NextPage = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <Head>
        <DefaultHeadMetaTags />
      </Head>
      <Layout>
        <div className={styles.layout}>
          <section className={styles.heroContainer}>
            <AnimatedCanvasWrapper>
              <Grid isHovering={isHovering} />
              <Controls />
            </AnimatedCanvasWrapper>
            <motion.div
              {...mountAnimProps}
              className={styles.heroOverlayContainer}
            >
              <div className={styles.heroOverlayShadow} />
              <Image
                src={logo}
                color="#fff"
                height={300 / 5}
                width={1000 / 5}
                alt="logo"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              />
              <motion.div
                {...delayedMountAnimProps(0.5)}
                className={styles.heroOverlayButtons}
              >
                <Button outlined icon={faChartLine} text="Start Tracking" />
                <Button outlined icon={faArrowRight} text="Login" />
              </motion.div>
            </motion.div>
          </section>
          <motion.section
            {...delayedMountAnimProps(1)}
            className={styles.heroCards}
          >
            <HeroCard headerText="Track" subText="Easily track your Lifts">
              <AnimatedCanvasWrapper>
                <Box />
              </AnimatedCanvasWrapper>
              <Button outlined text="Learn More" />
            </HeroCard>
            <HeroCard headerText="Analyze" subText="Get detailed Analytics">
              <AnimatedCanvasWrapper>
                <Box />
              </AnimatedCanvasWrapper>
              <Button outlined text="Learn More" />
            </HeroCard>
            <HeroCard headerText="Progress" subText="Make meaningful progress">
              <AnimatedCanvasWrapper>
                <Box />
              </AnimatedCanvasWrapper>
              <Button outlined text="Learn More" />
            </HeroCard>
          </motion.section>
        </div>
      </Layout>
    </>
  );
};

type HeroCardProps = {
  headerText: string;
  subText: string;
  icon?: FontAwesomeIconProps["icon"];
  children?: React.ReactNode;
};

const HeroCard: React.FC<HeroCardProps> = ({
  icon,
  headerText,
  subText,
  children,
}) => {
  return (
    <div className={styles.heroCardContainer}>
      <div className={styles.heroCardHeader}>
        <div className={styles.heroCardHeaderText}>
          <h1 style={{ fontSize: "2.5em" }}>{headerText}</h1>
          <h4>{subText}</h4>
        </div>
      </div>
      <div className={styles.heroCardContent}>{children}</div>
    </div>
  );
};

const mountAnimProps = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { ease: "easeOut", duration: 0.5, delay: 0.1 },
};

const delayedMountAnimProps = (delay: number) => ({
  ...mountAnimProps,
  transition: { ...mountAnimProps.transition, delay },
});

const bgAnimMountProps = {
  initial: { opacity: 0 },
  animate: { opacity: 0.5 },
  transition: { duration: 2, delay: 0.5 },
};

export default Home;
