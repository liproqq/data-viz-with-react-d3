export const Marks = ({
  data,
  xScale,
  xValue,
  yValue,
  yScale,
  colorValue,
  colorScale,
  circleRadius
}) =>
  data.map(d => <circle
    className="mark"
    cx={xScale(xValue(d))}
    cy={yScale(yValue(d))}
    fill={colorScale(colorValue(d))}
    r={circleRadius}>
    <title>{xValue(d)}</title>
  </circle>
  );
