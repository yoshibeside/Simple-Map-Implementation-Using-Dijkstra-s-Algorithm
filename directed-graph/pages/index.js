import {useEffect,useRef, useState, useMemo} from 'react'
import Card from '../components/ui/Card';
import NodeContainer from '../components/graph/nodeContainer';
import classes from '../components/graph/newGraph.module.css';

import { v4 as uuidv4 } from 'uuid'
import dynamic from 'next/dynamic'

function HomePage() {
    const namaGraph = useRef();
    const INITIAL_STATE = {
        jsonfile:
            {
                counter: 0,
                graph: {
                  nodes: [
                    { id: 0, label: "", color: "" },
                  ],
                  edges: [
                    { from: 0, to: 0 },
                  ]
                }
            }
        }
    const [update, setUpdate] = useState(0)
    const [submit, setSubmit] = useState(false)
    const [state, setState] = useState({...INITIAL_STATE})
    const version = useMemo(uuidv4, [state, update]);
    const fileInputRef = useRef();

    const Graph = dynamic(() => import("react-graph-vis"), { ssr: false });

    const handleFileInput = (event) => {

            const reader = new FileReader();
            reader.readAsText(event.target.files[0])
    
            reader.onload = (event) => {
                    setState({jsonfile: JSON.parse(event.target.result)}, () => {
                    console.log(state.jsonfile);
                    });  
                    console.log(state.jsonfile);
                    console.log("masuk");
            };
            setSubmit(true)
            setUpdate(update+1)


	};

    useEffect (() => {
        console.log("mounting");
        console.log(update)
        if (fileInputRef) fileInputRef.current.value = null;
        return () => {
            console.log("unmounting");
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
            <label htmlFor='penyakit'>Nama Graph</label>
            <input type='text' name='graphname' required id='penyakit'  />
            </div>
            <div className={classes.control}>
            <label htmlFor='dnasequence'>Graph</label>
            <input type='file' name='graphSequence' ref={fileInputRef} onChange = {(e)=>handleFileInput(e)} accept=".json" />
            </div>
            </form> 

          </Card>
            <br/>
            {submit && 
            <Card>
                <Graph key = {version} graph={state.jsonfile.graph} options={options}  style={{ height: "640px" }} />
            </Card>
            }
            
            <br/>
            {submit && <NodeContainer obj = {state.jsonfile}/>}

        
      </>

    );
}

export default HomePage