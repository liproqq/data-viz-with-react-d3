import { scaleSqrt, max } from 'd3';
import './App.css';
import { Marks } from './Marks';
import { useWorldAtlas } from './useWorldAtlas';
import { useCities } from './useCities';

const width = 980
const height = 500

const App = () => {
  const worldAtlas = useWorldAtlas()
  const cities = useCities()

  if (!worldAtlas || !cities) {
    return <pre>Loading</pre>
  }

  const sizeValue = d => d.pop
  const maxRadius = 10

  const sizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue)])
    .range([0, maxRadius])

  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlas}
        cities={cities}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  )
};

export default App;
