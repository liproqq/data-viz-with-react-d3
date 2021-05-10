import { line, curveNatural } from "d3-shape";

export const Marks = ({ data, xScale, yScale, xValue, yValue }) =>
  <g className="mark">
    {/* <path
      fill="none"
      stroke="black"
      d={line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(curveNatural)(data)}
    /> */}
    {
      data.map(d =>
      (<circle
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={2} />)
      )
    }
  </g>;
