import Card from '../ui/Card';
import classes from './newGraph.module.css';
import {useState} from 'react'
import * as Solver from '../../const/dijikstraAlgorithm'
import dynamic from 'next/dynamic'


function nodeContainer(props) {
    const Graph = dynamic(() => import("react-graph-vis"), { ssr: false });
    const [submitted,setSubmitted] = useState(false)
    const [graphResource, setGraphResource] = useState ({start: 0, goal: 0})
    const [result, setResult] = useState(0)
    const handleChangeStart = (event) => {
        setGraphResource(prevValue => {
          return { ...prevValue, start: parseInt(event.target.value)}
        })
    }
    const handleChangeGoal = (event) => {
      setGraphResource(prevValue => {
        return { ...prevValue, goal: parseInt(event.target.value)}
      })
  }
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(props)
      let hasil = Solver.solver(props.obj,graphResource.start, graphResource.goal)
      setResult(hasil)
      setSubmitted(true)
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
              <input type='text' name='startNode' required id='start' onChange= {(e)=>handleChangeStart(e)}/>
            </div>
            <div className={classes.control}>
            <label htmlFor='goal'>Goal Node</label>
              <input type='text' name='goalNode' required id='goal' onChange = {(e)=>handleChangeGoal(e)}/>
            </div>
            <div className={classes.actions}>
              <button type='submit'>Search</button>
            </div>
          </form>
        </Card>
        <br></br>
        {submitted && 
        <Card>
          <Graph  graph={result.graph} options={options} style={{ height: "640px" }} />
        </Card>
        }
      </>
      
    );
  }
  
  export default nodeContainer;