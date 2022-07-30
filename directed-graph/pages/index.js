import {useEffect,useRef, useState, useMemo} from 'react'
import Card from '../components/ui/Card';
import NodeContainer from '../components/graph/nodeContainer';
import classes from '../components/graph/newGraph.module.css';

import { v4 as uuidv4 } from 'uuid'
import dynamic from 'next/dynamic'

function HomePage() {
    const namaGraph = useRef();
    const INITIAL_STATE = {
                counter: 0,
                graph: {
                  nodes: [
                    { id: 0, label: "", color: "" },
                  ],
                  edges: [
                    { from: 0, to: 0 },
                  ]
                },
                from: 0,
                goal: 0

        }
    const [update, setUpdate] = useState(0)
    const [submit, setSubmit] = useState(false)
    const [select, setSelect] = useState(0)
    const [state, setState] = useState({...INITIAL_STATE})
    const version = useMemo(uuidv4, [state, update]);
    const fileInputRef = useRef();

    const Graph = dynamic(() => import("react-graph-vis"), { ssr: false });

    // useEffect(() => {
    //   console.log("selected has been updated to " + select)
    //   console.log("state in: " + select)
    //   console.log(state)
    // }, [select])
    
    const events = {
      select: function (event) {
        var {nodes, edges } = event
        // console.log(event)
        // console.log("sebelum conditional select " + select)
        if (select == 0 || select == 2) {
          setSelect(1)
          setState(prevState => {
            return {...prevState, from: nodes[0]}
          })
        } else if (select == 1) {
          //console.log("masuk ke condition select == 1")
          setSelect(2)
          setState(prevState => {
            return {...prevState, goal: nodes[0]}
          })
        } else {
          console.log("an error occured when selecting")
        }
        //console.log(nodes)              
      }
    }

    const handleFileInput = (event) => {
            const reader = new FileReader();
            reader.readAsText(event.target.files[0])
    
            reader.onload = (event) => {
                    const temp = JSON.parse(event.target.result)
                    setState(prevState => {
                      return {...prevState, graph: temp.graph, counter: temp.counter}
                    })  
            };
            setSubmit(true)
            setUpdate(update+1)
	};

    useEffect (() => {
        if (fileInputRef) fileInputRef.current.value = null;
        return () => {
            //console.log("unmounting");
            // console.log(state)
            // console.log(update)
        }
    }, [state])

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
            
            <form className={classes.form}>
              <div className={classes.control}>
                <label htmlFor='GraphInput'>Graph</label>
                <input type='file' name='graphSequence' ref={fileInputRef} onChange = {(e)=>handleFileInput(e)} accept=".json" />
              </div>
            </form> 

          </Card>
            <br/>
            {submit && 
            <Card>
                <Graph key = {`initGraph${update}`} graph={state.graph} options={options} events={events} style={{ height: "640px" }} />
            </Card>
            }
            
            <br/>
            {submit && <NodeContainer obj = {state}/>}

      </>

    );
}

export default HomePage