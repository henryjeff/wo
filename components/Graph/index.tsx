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
import moment from "moment";
import colors from "../../styles/colors";

type GraphProps = {
  data: MetaWorkout[];
  dataKeys: string[];
};

const Graph: React.FC<GraphProps> = ({ data, dataKeys }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    window.addEventListener("resize", getSize);
    getSize();
    return () => {
      window.removeEventListener("resize", getSize);
    };
  }, []);
  function formatXAxis(tickItem: any) {
    // If using moment.js
    return moment(tickItem).format("MM/YY");
  }

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
        <XAxis reversed dataKey="date" tickFormatter={formatXAxis} />
        <YAxis />
        {/* <Tooltip /> */}
        <Legend />
        {dataKeys.map((key, i) => {
          return (
            <Line
              key={`${i}`}
              type="monotone"
              dot={false}
              dataKey={key}
              stroke={colors.positive}
            />
          );
        })}
        {/* <Line type="monotone" dataKey="value" stroke="#8884d8" /> */}
        {/* <Line type="monotone" dataKey="date" stroke="#82ca9d" /> */}
      </LineChart>
    </div>
  );
};

export default Graph;
