import { } from 'd3';
import './App.css';
import { Marks } from './Marks';
import { useData } from './useData';

const width = 900
const height = 500

const App = () => {
  const data = useData()

  if (!data) {
    return <pre>Loading</pre>
  }

  return (
    <svg width={width} height={height}>
      <Marks
        data={data}
      />
    </svg>
  )
};

export default App;
