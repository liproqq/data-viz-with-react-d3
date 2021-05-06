export const AxisBottom = ({ xScale, innerHeight, tickFormat }) => xScale.ticks().map(tickValue => (
  <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
    <line y2={innerHeight} stroke="#C0C0BB" />
    <text dy=".71em"
      style={{ textAnchor: 'middle' }}
      y={innerHeight + 6}>
      {tickFormat(tickValue)}
    </text>
  </g>
));
