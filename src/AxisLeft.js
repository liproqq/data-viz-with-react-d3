export const AxisLeft = ({ yScale, innerWidth }) => yScale.ticks().map(tickValue => (
  <g className="tick" transform={`translate(0, ${yScale(tickValue)})`}>
    <line x2={innerWidth} stroke="#C0C0BB" />

    <text
      key={tickValue}
      style={{ textAnchor: 'end' }}
      x={-8}
      dy=".32em"
    >
      {tickValue}
    </text>
  </g>
));
