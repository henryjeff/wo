import unit from "@/public/unit.svg";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const TrackAnimation: React.FC<{}> = ({}) => {
  const unitControls = useAnimation();
  const weekControls = useAnimation();

  const sequence = async () => {
    await unitControls.start("tracked");
    await unitControls.start("end");
    await weekControls.start("end");
    // return await itemControls.start({ opacity: 1 });
  };

  useEffect(() => {
    sequence();
  }, []);

  const Unit = ({ index }: { index: number }) => {
    return (
      <motion.div
        initial={"untracked"}
        animate={unitControls}
        variants={{
          tracked: {
            opacity: 1,
            x: 0,
          },
          untracked: {
            opacity: 0,
            x: 10,
          },
          end: {
            opacity: 0,
            y: -10,
            transition: {
              delay: index * 0.05,
            },
          },
        }}
        transition={{ delay: index }}
      >
        <Image src={unit} alt="Unit" />
      </motion.div>
    );
  };

  return (
    <motion.div animate={weekControls} style={{ flexDirection: "column" }}>
      <p>Week 1</p>
      <div style={{ columnGap: "0.5em" }}>
        {[...Array(5)].map((_, index) => (
          <Unit key={index} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default TrackAnimation;
