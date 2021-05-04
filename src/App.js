import { useState, useEffect } from 'react';
import { csv } from 'd3';
import './App.css';
import { message } from './message';

const csvUrl = 'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then(setData)
    console.log("loading data")
  }, [])

  return <div>Data is: {data ? message(data) : 'loading'}</div>
};

export default App;
