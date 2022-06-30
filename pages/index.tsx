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
import { Ref, useRef } from "react";
import { GridHelper } from "three";
import colors from "../styles/colors";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { motion } from "framer-motion";
import {
  faArrowRight,
  faChartLine,
  faComputer,
  faListNumeric,
  faSign,
  faSignal,
  faSignIn,
  faUser,
  faUserAlt,
  faUserAstronaut,
  faUserCircle,
  faUserCog,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

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
    camera.position.x = 3;
    camera.position.y = 3;
    camera.position.z = Math.sin(Date.now() / 5000) * 3;
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

const Grid = () => {
  const gridRef = useRef<GridHelper>(null);

  // move the grids z every frame
  useFrame((state, delta) => {
    const time = -performance.now() / 2000;
    if (gridRef.current) {
      // gridRef.current.rotation.y += 0.001;
      gridRef.current.position.z = -time % 1;
    }
  });
  return (
    <gridHelper
      ref={gridRef}
      args={[100, 100, colors.textSecondary, colors.textSecondary]}
    />
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
    <motion.div className={styles.canvasWrapper} {...bgAnimMountProps}>
      <Canvas>{children}</Canvas>
    </motion.div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <DefaultHeadMetaTags />
      </Head>
      <Layout>
        <div className={styles.layout}>
          <section className={styles.heroContainer}>
            <AnimatedCanvasWrapper>
              <fog attach="fog" args={[colors.bg, 5, 10]} />
              <Grid />
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
