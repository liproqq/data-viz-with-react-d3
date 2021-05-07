export const ColorLegend = ({
  colorScale,
  tickSize = 10,
  tickSpacing = 30,
  tickTextOffset = 20,
  onHover

}) => (
  colorScale.domain().map((domainValue, i) => (
    <g
      transform={`translate(0,${i * tickSpacing})`}
      onMouseEnter={() => { onHover(domainValue) }}
      onMouseLeave={() => { onHover(null) }}
    >
      <circle r={tickSize} fill={colorScale(domainValue)} />
      <text className='color-legend' x={tickTextOffset} dy='.32em' >{domainValue}</text>
    </g>
  )))
