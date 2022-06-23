import { useEffect, useRef, useState } from "react";
import styles from "./Graph.module.css";
import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts";

type GraphProps = {
  data: any[];
};

const Graph: React.FC<GraphProps> = ({ data }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    window.addEventListener("resize", getSize);
    getSize();
    return () => {
      window.removeEventListener("resize", getSize);
    };
  }, []);

  const getSize = () => {
    if (contentRef.current) {
      const content = contentRef.current;
      setDimensions({ w: content.clientWidth, h: content.clientHeight });
    }
  };

  return (
    <div ref={contentRef} className={styles.graphContainer}>
      <LineChart width={dimensions.w} height={dimensions.h} data={data}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" />
        <YAxis />
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        {/* <Line type="monotone" dataKey="date" stroke="#82ca9d" /> */}
      </LineChart>
    </div>
  );
};

export default Graph;
