import { useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { scaleLinear, extent, format, scaleOrdinal } from 'd3';
import './App.css';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { useData } from './useData';
import { ColorLegend } from './ColorLegend'

const width = 960
const height = 500
const margin = { top: 20, right: 30, bottom: 70, left: 100 };
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right

const attributes = [
  { value: 'sepal_length', label: 'Sepal Length' },
  { value: 'sepal_width', label: 'Sepal Width' },
  { value: 'petal_length', label: 'Petal Length' },
  { value: 'petal_width', label: 'Petal Width' },
  { value: 'species', label: 'Species' }
];

const getLabel = value => attributes.find(att => att.value === value).label

const App = () => {
  const initialXAttribute = 'sepal_length'
  const initialYAttribute = 'sepal_width'
  const data = useData()
  const [hoveredValue, setHoveredValue] = useState(null)
  const [xAttribute, setXAttribute] = useState(initialXAttribute)
  const [yAttribute, setYAttribute] = useState(initialYAttribute)

  if (!data) {
    return <pre>Loading</pre>
  }



  const xValue = d => d[xAttribute]
  const xAxisLabel = getLabel(xAttribute)
  const xAxisLabelOffset = 50;

  const yValue = d => d[yAttribute]
  const yAxisLabel = getLabel(yAttribute)
  const yAxisLabelOffset = 50;

  const colorValue = d => d.species
  const circleRadius = 10

  const filteredData = data.filter(d => hoveredValue === colorValue(d))

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"])

  return (
    <>
      <Dropdown
        options={attributes}
        value={yAttribute}
        onChange={({ value }) => setYAttribute(value)}
        labelText="Y:"
      />
      <Dropdown
        options={attributes}
        value={xAttribute}
        onChange={({ value }) => setXAttribute(value)}
        labelText="X:"
      />
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.right})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={format("")} />
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
          <g opacity={hoveredValue ? 0.2 : 1}>
            <Marks
              data={data}
              xValue={xValue}
              xScale={xScale}
              yValue={yValue}
              yScale={yScale}
              colorScale={colorScale}
              colorValue={colorValue}
              circleRadius={circleRadius}
            />
          </g>
          <Marks
            data={filteredData}
            xValue={xValue}
            xScale={xScale}
            yValue={yValue}
            yScale={yScale}
            colorScale={colorScale}
            colorValue={colorValue}
            circleRadius={circleRadius}
          />
          <ColorLegend
            colorScale={colorScale}
            tickSize={circleRadius}
            tickSpacing={30}
            tickTextOffset={20}
            onHover={setHoveredValue}
          />
        </g>
      </svg>
    </>
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