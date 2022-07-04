import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faArrowRight, faChartLine } from "@fortawesome/free-solid-svg-icons";
// Components
import { Layout, DefaultHeadMetaTags } from "@/components/Page";
import Button from "@/components/Button";
import WavePlane from "@/components/Three/WavePlane";
import AnimatedCanvasWrapper from "@/components/Three/AnimatedCanvasWrapper";
import OrbitControls from "@/components/Three/OrbitControls";
// Styles
import styles from "./Home.module.css";
import Image from "next/image";
import logo from "@/public/logo-new.svg";
import { defaultMountAnimation, mountAnimation } from "@/styles/animation";

import unit from "@/public/unit.svg";
import TrackAnimation from "./TrackAnimation";

const Box = () => {
  const box = useRef<any>();
  const randRef = useRef(Math.random());

  useFrame(() => {
    if (box.current) {
      // randonly offset x y and z
      const rand = randRef.current;
      randRef.current = rand + 0.01;
      const x = Math.sin(rand) * 2;
      const y = Math.cos(rand) * 2;
      const z = Math.sin(rand) * 2;

      box.current.rotation.set(x, y, z);

      // box.current.rotation.x += 0.005;
      // box.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={box}>
      <boxGeometry attach="geometry" args={[3, 3, 3]} />
      <meshBasicMaterial wireframe attach="material" color="#fff" />
    </mesh>
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
          <motion.section
            {...mountAnimation({ delay: 0.2, duration: 1 })}
            className={styles.heroContainer}
          >
            <AnimatedCanvasWrapper delay={1} duration={1}>
              <WavePlane />
              <OrbitControls
                position={{ x: 4 }}
                lookAt={new Vector3(0, 0, 0)}
                functionalPositions={{
                  y: (elapsedTime) => Math.sin(elapsedTime) / 2 + 6,
                  z: (elapsedTime) => Math.sin(elapsedTime / 10) * 4,
                }}
              />
            </AnimatedCanvasWrapper>
            <div className={styles.heroOverlayContainer}>
              <div className={styles.heroOverlayShadow} />
              <Image
                src={logo}
                color="#fff"
                height={75}
                width={280}
                alt="logo"
              />
              <div className={styles.heroOverlayButtons}>
                <Button
                  icon={faChartLine}
                  text="Start Tracking"
                  href="/signup"
                />
                <Button icon={faArrowRight} text="Login" href="/signin" />
              </div>
              <div className={styles.heroOverlaySubtext}>
                <a href="https://github.com/henryjeff/wo">
                  <p>Contribute on GitHub</p>
                </a>
              </div>
            </div>
          </motion.section>
          <motion.section
            {...mountAnimation({ delay: 1.2, duration: 1 })}
            className={styles.heroCards}
          >
            <HeroCard headerText="Track" subText="Easily track your Lifts">
              <AnimatedCanvasWrapper>
                <Box />
              </AnimatedCanvasWrapper>
              <Button text="Learn More" />
            </HeroCard>
            <HeroCard headerText="Analyze" subText="Get detailed Analytics">
              <AnimatedCanvasWrapper>
                <Box />
              </AnimatedCanvasWrapper>
              <Button text="Learn More" />
            </HeroCard>
            <HeroCard headerText="Progress" subText="Make meaningful progress">
              <AnimatedCanvasWrapper>
                <Box />
              </AnimatedCanvasWrapper>
              <Button text="Learn More" />
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
  children?: React.ReactNode;
};

const HeroCard: React.FC<HeroCardProps> = ({
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

export default Home;
