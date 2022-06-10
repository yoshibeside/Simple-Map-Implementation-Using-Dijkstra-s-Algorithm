import NewGraph from '../components/graph/newGraph'
import {useEffect,useRef, useState, useMemo} from 'react'
import Card from '../components/ui/Card';
import classes from '../components/graph/newGraph.module.css';
import Graph from "react-graph-vis";
import { v4 as uuidv4 } from 'uuid'

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
    const [submit, setSubmit] = useState(false)
    const [state, setState] = useState({...INITIAL_STATE})
    const [update, setUpdate] = useState(0)
    const version = useMemo(uuidv4, [state, update]);
    const fileInputRef = useRef();
4
    const handleFileInput = (event) => {
		
	};

    useEffect (() => {
        console.log("mounting");
        console.log(update)
		const reader = new FileReader();
        reader.readAsText(fileInputRef.target.files[0])
		reader.onload = (event) => {
            setState({jsonfile: JSON.parse(event.target.result)}, () => {
                console.log(state.jsonfile);
            });
            console.log(state.jsonfile);
            console.log("masuk");
		};
        return () => {
            console.log("unmounting");
        }
    }, [update])

    const options = {
        layout: {
          hierarchical: false
        },
        edges: {
          color: "#000000"
        }
      };
    
    return (

      <Card>

        <div className={classes.control}>
        <label htmlFor='penyakit'>Nama Graph</label>
        <input type='text' name='graphname' required id='penyakit'  />
        </div>
        <div className={classes.control}>
        <label htmlFor='dnasequence'>Sequence DNA</label>
        <input type='file' name='graphSequence' required id='sequence' ref={fileInputRef} onChange = {() => setUpdate(update + 1)} accept=".json" />
        </div>
        <Graph key = {version} graph={state.jsonfile.graph} options={options}  style={{ height: "640px" }} />
        
      </Card>

    );
}

export default HomePage