import { useEffect, useRef, useState } from "react";
import styles from "./Graph.module.css";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Legend,
  ReferenceLine,
} from "recharts";
import moment from "moment";
import colors from "../../styles/colors";

type GraphProps = {
  data: any[];
  dataKeys: string[];
};

const Graph: React.FC<GraphProps> = ({ data, dataKeys }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const currentTooltipRef = useRef<MetaWorkout>();
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    window.addEventListener("resize", getSize);
    getSize();
    return () => {
      window.removeEventListener("resize", getSize);
    };
  }, []);

  function formatXAxis(tickItem: any) {
    return moment(tickItem).format("M/YY");
  }

  const getSize = () => {
    if (contentRef.current) {
      const content = contentRef.current;
      setDimensions({ w: content.clientWidth, h: content.clientHeight });
    }
  };

  function CustomTooltip({
    payload,
    label,
    active,
  }: {
    payload: any;
    label: string;
    active: boolean;
  }) {
    if (payload && active && payload.length > 0) {
      const workout: MetaWorkout = payload[0].payload;
      currentTooltipRef.current = workout;
      return (
        <div className={styles.tooltipContainer}>
          <h4>Date:</h4>
          <h3>{moment(label).format("MM/DD/YY")}</h3>
          {dataKeys.map((key, index) => {
            return (
              <div className={styles.tooltipDataRow} key={index}>
                <h4>{key}:</h4>
                {/* @ts-ignore */}
                <h3>{Number(workout[key]).toFixed(1)}</h3>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  }

  function djb2(str: string) {
    var hash = 5381;
    for (var i = 0; i < str.length; i++) {
      hash = (hash << 5) + hash + str.charCodeAt(i); /* hash * 33 + c */
    }
    return hash;
  }

  const hashStringToColor = (str: string) => {
    var hash = djb2(str);
    let r = (hash & 0xff0000) >> 16;
    let g = (hash & 0x00ff00) >> 8;
    let b = hash & 0x0000ff;
    return (
      "#" +
      ("0" + r.toString(16)).substr(-2) +
      ("0" + g.toString(16)).substr(-2) +
      ("0" + b.toString(16)).substr(-2)
    );
  };

  return (
    <div ref={contentRef} className={styles.graphContainer}>
      <LineChart
        width={dimensions.w}
        height={dimensions.h}
        data={data}
        margin={{ bottom: 16, left: 8, right: 16 }}
      >
        <CartesianGrid stroke={colors.fg} strokeDasharray="3 3" />
        <XAxis
          stroke={colors.fg}
          reversed
          dataKey="date"
          tickFormatter={formatXAxis}
          tick={{ fill: colors.textPrimary }}
          dy={16}
          dx={-12}
          angle={-45}
        />
        <YAxis
          stroke={colors.fg}
          tickCount={8}
          dx={-8}
          tick={{ fill: colors.textPrimary }}
          color={colors.textPrimary}
        />
        <Legend verticalAlign="top" height={48} />
        <Tooltip
          animationDuration={500}
          // @ts-ignore
          content={<CustomTooltip />}
        />
        {/* {refDates.map((date, index) => {
          // console.log(date);
          // console.log(formatXAxis(date));
          return <ReferenceLine key={date} x={date} stroke={"#fff"} />;
        })} */}
        {dataKeys.map((key, i) => {
          return (
            <Line
              key={`${i}`}
              type="natural"
              dot={false}
              dataKey={key}
              stroke={hashStringToColor(key + "___________")}
              strokeWidth={2}
              animationDuration={500}
              animationEasing="ease-out"
            />
          );
        })}
      </LineChart>
    </div>
  );
};

const refDates = [new Date(2021, 0, 1).toISOString()];

export default Graph;
