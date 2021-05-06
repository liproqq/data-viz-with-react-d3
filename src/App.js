import { scaleLinear, scaleTime, extent, format, timeFormat } from 'd3';
import './App.css';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { useData } from './useData';

const width = 960
const height = 500
const margin = { top: 20, right: 30, bottom: 70, left: 100 };
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right

const App = () => {
  const data = useData()

  if (!data) {
    return <pre>Loading</pre>
  }

  const xValue = d => d.timestamp
  const xAxisLabel = 'Time'
  const xAxisLabelOffset = 50;

  const yValue = d => d.temperature
  const yAxisLabel = 'Temperature'
  const yAxisLabelOffset = 50;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice()

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.right})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={timeFormat("%a")} />
        <AxisLeft
          innerWidth={innerWidth}
          yScale={yScale}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
        >
          {xAxisLabel}
        </text>
        <text
          className="axis-label"
          textAnchor="middle"
          transform={
            `translate(
            ${-yAxisLabelOffset},
            ${innerHeight / 2}) 
            rotate(-90)`
          }
        >
          {yAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  )
};

export default App;

// data.map((d, i) => (<path
//   fill={d['RGB hex value']}
//   d={pieArc({
//     startAngle: i / data.length * 2 * Math.PI,
//     endAngle: (i + 1) / data.length * 2 * Math.PI
//   })
// />
// ))}