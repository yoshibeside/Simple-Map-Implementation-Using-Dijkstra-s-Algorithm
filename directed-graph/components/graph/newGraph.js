import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './newGraph.module.css';


function newGraph(props) {
  const namaGraph = useRef();
  const graphJson = useRef();
  
  return (
    <Card>
      <form action="/AddDNA" className={classes.form} method='POST' encType='multipart/form-data'>
        <div className={classes.control}>
          <label htmlFor='penyakit'>Nama Graph</label>
          <input type='text' name='graphname' required id='penyakit' ref={namaGraph} />
        </div>
        <div className={classes.control}>
          <label htmlFor='dnasequence'>Sequence DNA</label>
          <input type='file' name='graph' required id='sequence' accept='.json' ref={graphJson} />
        </div>
        <div className={classes.actions}>
          <button type='submit'>Add Graph</button>
        </div>
      </form>
    </Card>
  );
}

export default newGraph;