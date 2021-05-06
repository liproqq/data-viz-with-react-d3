import { scaleBand, scaleLinear, max, format } from 'd3';
import './App.css';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { useData } from './useData';

const width = 960
const height = 500
const margin = { top: 20, right: 30, bottom: 70, left: 220 };
const xAxisLabelOffset = 50;
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right

const App = () => {
  const data = useData()

  if (!data) {
    return <pre>Loading</pre>
  }

  const xValue = d => d.Population
  const yValue = d => d.Country

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(.1)

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.right})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={format(".2s")} />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          textAnchor="middle"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
        >
          Population
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