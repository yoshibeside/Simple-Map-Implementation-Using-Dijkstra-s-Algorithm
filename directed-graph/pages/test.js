import graphContainer from '../components/graph/displayGraph';
import Card from '../components/ui/Card';
import vis from 'vis-network';
var container = () => {
    if (typeof window === "undefined") {
        document.getElementById("mynetwork");
        console.log("angel");
    }
    console.log("angel");
}
var dot = "dinetwork {node[shape=circle]; 1 -> 1 -> 2; 2 -> 3; 2 -- 4; 2 -> 1 }";
var data = () => {
    if (typeof window === "undefined") {
        vis.parseDOTNetwork(dot);
        console.log("angel");
    }
}

var network = () => {
    if (typeof window === "undefined") {
        new vis.Network(container, data);
        console.log("angel");
    }
}


function Test() {

    const loadGraph = async () => {
        const container = document.getElementById("mynetwork");
        const dot = "dinetwork {node[shape=circle]; 1 -> 1 -> 2; 2 -> 3; 2 -- 4; 2 -> 1 }";
        console.log(dot);
            // const data = vis.parseDOTNetwork(dot);
            // return new vis.Network(container, data);

        return ;
       
    }

    return (
        <Card>
            <p>Network supports the DOT language.</p>
            <button onClick = {loadGraph}> Press mee</button>

        </Card>
        
    );
}

export default Test