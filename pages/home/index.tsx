import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
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

const Box = () => {
  const box = useRef<any>();

  useFrame(() => {
    if (box.current) {
      box.current.rotation.x += 0.001;
      box.current.rotation.y += 0.005;
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
          <section className={styles.heroContainer}>
            <AnimatedCanvasWrapper delay={1} duration={3} acceptPointerEvents>
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
            <motion.div
              {...mountAnimProps(0)}
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
                {...mountAnimProps(0.5)}
                className={styles.heroOverlayButtons}
              >
                <Button icon={faChartLine} text="Start Tracking" />
                <Button icon={faArrowRight} text="Login" />
              </motion.div>
            </motion.div>
          </section>
          <motion.section {...mountAnimProps(1)} className={styles.heroCards}>
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

const mountAnimProps = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { ease: "easeOut", duration: 0.5, delay },
});

export default Home;
