import Card from '../ui/Card';
import classes from './newGraph.module.css';
import {useEffect, useState, useMemo} from 'react'
import * as Solver from '../../const/dijikstraAlgorithm'
import dynamic from 'next/dynamic'


function nodeContainer(props) {
    const Graph = dynamic(() => import("react-graph-vis"), { ssr: false });
    const [submitted,setSubmitted] = useState(false)
    const [result, setResult] = useState(0)
    const [update, setUpdate] = useState(0)

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(props)
      let hasil = Solver.solver(props.obj, props.obj.from, props.obj.goal)
      setResult(hasil)
      setSubmitted(true)
      setUpdate(update+1)
      console.log(hasil)
    }

    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000"
      }
    };

    return (
      <>
        <Card>
          <form className={classes.form} onSubmit = {(e)=>handleSubmit(e)}>
            <div className={classes.control}>
            <label htmlFor='start'>Start Node</label>
              <input type='text' name='startNode' id='start' value={props.obj.from} readOnly/>
            </div>
            <div className={classes.control}>
            <label htmlFor='goal'>Goal Node</label>
              <input type='text' name='goalNode' required id='goal' value = {props.obj.goal} readOnly/>
            </div>
            <div className={classes.actions}>
              <button type='submit'>Search</button>
            </div>
          </form>
        </Card>
        <br></br>
        {submitted && 
        <Card>
          { result.found &&           
            <Graph  key = {`graphResult${update}`} graph={result.graph} options={options} style={{ height: "600px" }} />
          }
          { result.found &&
          <div className = {classes.actions} >
              <a
              href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(result))}`}
              download="filename.json"
              >
              {`Download Json`}
              </a>
            </div>
          }
          { !result.found && 
          <div className={classes.paragraf}>
            <p >No path leading to that vertex</p>
          </div>
          }
          <div className = {classes.paragraf2}> 
            <p>Iterations: {result.iterations}</p>
            <p>Execution time: {result.time} ms</p>
          </div>
        </Card>
        }
      </>
      
    );
  }
  
  export default nodeContainer;