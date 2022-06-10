function solver(graph, start, goal) {
    console.log(graph)
    console.log("masuk")
    // Dalam graph terdapat atribut
    // counter
    // graph
        // nodes: [{id,label,color}]
        // edges: [{from, to, bobot}]

    const visited = {}
    const unvisited = {}
    let shortestDistance = new Array(graph.counter).fill(Infinity)
    let previousVertex = new Array(graph.counter).fill(Infinity)


   // Mencari nilai id tertinggi untuk inisialisasi array
    let maxId = graph.graph.nodes[0].id
    for (let maxNodes in graph.nodes){
        if (maxNodes.id > maxId) {
            maxId = maxNodes.id
        }
    }

    // Mengisi node
    for (let idNodes in graph.graph.nodes) { // angka doang
        console.log(idNodes)
        unvisited[graph.graph.nodes[idNodes].id] = {
            idedge: [],
            bobots: new Array(maxId).fill(0),
        }
    }
    let tempEdges = (graph.graph.edges)
    // Mengisi edgesnya (from: index), (to: isiidEdge) , (bobot: bobots)
    for (let edgesG in graph.graph.edges) {
        console.log(edgesG)
        unvisited[tempEdges[edgesG].from].idedge.push(tempEdges[edgesG].to)
        unvisited[tempEdges[edgesG].from].bobots[tempEdges[edgesG].to] = tempEdges[edgesG].bobot
    }

    // Algoritma Dijistra akan dimulai

    //  STEP 1 make all shortest distance from initial to infinity and start to 0
    shortestDistance[start] = 0

//     # STEP 2 current Vertex examine where the node goes to get the smalles, add to the shortestDistance array.
    
    let chosen = start
    console.log(unvisited[chosen].idedge)
    while (Object.keys(unvisited).length != 0) {
        for (let selectedEdges in unvisited[chosen].idedge) {
            let selected = unvisited[chosen].idedge[selectedEdges]
            console.log("visited: " + visited)
            console.log("selected: " + selected)
            console.log( " banding: " + shortestDistance[selected])
            console.log("hasil jarak: " + (unvisited[chosen].bobots[selected] + shortestDistance[chosen]))
            if (selected in visited){
                console.log("masuk1")
            }
            else if (shortestDistance[selected] > unvisited[chosen].bobots[selected] + shortestDistance[chosen]){
                shortestDistance[selected] = unvisited[chosen].bobots[selected] + shortestDistance[chosen]
                previousVertex[selected] = chosen
                console.log("masuk2")
            }
            console.log("=================================")
        }
        // STEP 3 after updating the shortest distance, then add to the visited nodes and delete from the uncisited nodes
        visited[chosen] = unvisited[chosen]
        delete unvisited[chosen]
        console.log(unvisited)


        // STEP 4 Now pick which cariable that's chosen shortest distance got it from the shortestDistance, maksudnya set the initial
        for (let checkingUnvisited in unvisited) {
            console.log("sisa unvisited" + checkingUnvisited)
            let minId = Infinity
            if (shortestDistance[checkingUnvisited] < minId) {
                minId = shortestDistance[checkingUnvisited]
                chosen = checkingUnvisited
            }
        }
        console.log("chosen: " + chosen)
        for (let z = 0; z < graph.counter; z++) {
            console.log("shortest distance of each vertex is: " + shortestDistance[z] + " vertex " + z)
        }
    }
    console.log(previousVertex)

    let picked = []
    let chosenGoal = goal
    picked.push[goal]
    while (previousVertex[chosenGoal] != Infinity) {
        console.log(previousVertex[chosenGoal])
        picked.push(previousVertex[chosenGoal])
        chosenGoal = previousVertex[chosenGoal]
    if (previousVertex[(picked.length-1)] != start ) {
        console.log("no alternative")
    }
    else {
        picked.push(start)
    }
    }

    let counterObject = picked.length
    let graphsResourceNode = []
    let graphsResourceEdge = []
    for ( let nodeMade in graph.graph.nodes) {
        if (graph.graph.nodes[nodeMade].id in picked) {
            graphsResourceNode.push(graph.graph.nodes[nodeMade])
        }
    }
    for (let number = 0; number < (picked.length-1) ; number++) {
        for (let checking in graph.graph.edges) {
            if (graph.graph.edges[checking].from == picked[number] && graph.graph.edges[checking].to == picked[(number+1)]) {
                graphsResourceEdge.push(graph.graph.edges[checking])
            }
        }
        
    }


    let result = {
        "counter" :counterObject,
        "graph": {
            "nodes" : graphsResourceNode,
            "edges" : graphsResourceEdge
        }
    }
    console.log(result)
    return result
}

export {solver};

// graphic = {
//     "counter": 5,
//     "graph": {
//       "nodes": [
//         { "id": 0, "label": "Node 1", "color": "#e04141" },
//         { "id": 1, "label": "Node 2", "color": "#e09c41" },
//         { "id": 2, "label": "Node 3", "color": "#e0df41" },
//         { "id": 3, "label": "Node 4", "color": "#7be041" },
//         { "id": 4, "label": "Node 5", "color": "#41e0c9" }
//       ],
//       "edges": [
//         { "from": 0, "to": 1  ,"bobot": 6},
//         { "from": 0, "to": 3  ,"bobot": 1},
//         { "from": 1, "to": 0  ,"bobot": 6},
//         { "from": 1, "to": 3  ,"bobot": 2},
//         { "from": 1, "to": 4  ,"bobot": 2},
//         { "from": 1, "to": 2  ,"bobot": 5},
//         { "from": 2, "to": 1  ,"bobot": 5},
//         { "from": 2, "to": 4  ,"bobot": 5},
//         { "from": 3, "to": 0  ,"bobot": 1},
//         { "from": 3, "to": 1  ,"bobot": 2},
//         { "from": 3, "to": 4  ,"bobot": 1},
//         { "from": 4, "to": 3  ,"bobot": 1},
//         { "from": 4, "to": 1  ,"bobot": 2},
//         { "from": 4, "to": 2  ,"bobot": 5}
//       ]
//     }
//   }

//   solver(graphic, 0, 4);

