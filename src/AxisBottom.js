export const AxisBottom = ({ xScale, innerHeight }) => xScale.ticks().map(tickValue => (
  <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
    <line y2={innerHeight} stroke="black" />
    <text dy=".71em"
      style={{ textAnchor: 'middle' }}
      y={innerHeight + 6}>
      {tickValue}
    </text>
  </g>
));
