export const ColorLegend = ({
  colorScale,
  tickSize = 10,
  tickSpacing = 30,
  tickTextOffset = 20
}) => (
  colorScale.domain().map((domainValue, i) => (
    <g transform={`translate(0,${i * tickSpacing})`} >
      <circle r={tickSize} fill={colorScale(domainValue)} />
      <text className='color-legend' x={tickTextOffset} dy='.32em' >{domainValue}</text>
    </g>
  )))
