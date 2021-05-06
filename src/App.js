import { useState, useEffect } from 'react';
import { csv, scaleBand, scaleLinear, max } from 'd3';
import './App.css';

const csvUrl = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv'
const width = 960
const height = 500
const margin = { top: 20, right: 20, bottom: 20, left: 200 };
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right


const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.Population = parseFloat(d['2020'])
      return d
    }
    csv(csvUrl, row).then(data =>
      setData(data.slice(0, 15)))
  }, [])

  if (!data) {
    return <pre>Loading</pre>
  }

  const yScale = scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, innerHeight])

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)])
    .range([0, innerWidth])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.right})`}>
        {xScale.ticks().map(tickValue => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y2={innerHeight} stroke="black" />
            <text dy=".71em"
              style={{ textAnchor: 'middle' }}
              y={innerHeight + 6}>
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map(tickValue => (
          <text
            key={tickValue}
            style={{ textAnchor: 'end' }}
            x={-8}
            dy=".32em"
            y={yScale(tickValue) + yScale.bandwidth() / 2}
          >
            {tickValue}
          </text>
        ))}
        {data.map(d => <rect
          key={d.Country}
          x={0}
          y={yScale(d.Country)}
          width={xScale(d.Population)}
          height={yScale.bandwidth()} />
        )}
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