
function solver(graph, start, goal) {
    var startTime = window.performance.now()
    // Dalam graph terdapat atribut
    // counter
    // graph
        // nodes: [{id,label,color}]
        // edges: [{from, to, bobot}]

    const unvisited = {}
    let shortestDistance = new Array(graph.counter).fill(Infinity)
    let previousVertex = new Array(graph.counter).fill(Infinity)


   // Mencari nilai id tertinggi untuk inisialisasi array
    let maxId = graph.graph.nodes[0].id
    for (let maxNodes in graph.graph.nodes){
        if (graph.graph.nodes[maxNodes].id > maxId) {
            maxId = graph.graph.nodes[maxNodes].id
        }
    }
    maxId++
    // Mengisi node (idNodes dimulai dari 0,1,2,3)
    // id dapat dimulai dari 0 atau 1
    for (let idNodes in graph.graph.nodes) { 
        console.log(idNodes)
        unvisited[graph.graph.nodes[idNodes].id] = {
            idedge: [],// node yang terhubung
            bobots: new Array(maxId).fill(0),
            visited: false
        }
    }
    let tempEdges = (graph.graph.edges) 
    // Mengisi edgesnya (from: index), (to: isiidEdge) , (bobot: bobots)
    for (let edgesG in tempEdges) {// edges:0,1,2
        unvisited[tempEdges[edgesG].from].idedge.push(tempEdges[edgesG].to) // memasukkan tujuan node
        unvisited[tempEdges[edgesG].from].bobots[tempEdges[edgesG].to] = tempEdges[edgesG].bobot // masukkan bobt pada indeks id tujuannya
    }
    console.log(unvisited)

    // Algoritma Dijikstra akan dimulai

    //  STEP 1 make all shortest distance from initial to infinity and start to 0
    shortestDistance[start] = 0

//     # STEP 2 current Vertex examine where the node goes to get the smalles, add to the shortestDistance array.
    
    let amtVisit = 0
    let iteration = 0
    while (amtVisit != maxId) {
        iteration++
        // find node shortest distance and unvisited
        let shortest = Infinity
        let idxShortest = 0
        for (let i in shortestDistance) {
            if (unvisited[i].visited == false && shortestDistance[i] < shortest) {
                idxShortest = i
                shortest = shortestDistance[i]
            }
        }
        if (shortest == Infinity) {break}
        // Calculate path, then updating if smaller than the shortest distance. Change visited to true.
        for (let j in unvisited[idxShortest].idedge) {
            let visitingVertex = unvisited[idxShortest].idedge[j]
            let calculateDistance = shortestDistance[idxShortest] + unvisited[idxShortest].bobots[visitingVertex]
            if (shortestDistance[visitingVertex] > calculateDistance) {
                shortestDistance[visitingVertex] = calculateDistance
                previousVertex[visitingVertex] = idxShortest
            }
        }
        unvisited[idxShortest].visited = true
        amtVisit++
    }
    console.log("All previous Vertex")
    console.log(previousVertex)

    let picked = []
    let chosenGoal = goal
    let found = true
    picked.push(chosenGoal)

    // Finding path
    while (previousVertex[chosenGoal] != Infinity) {
        picked.push(previousVertex[chosenGoal])
        chosenGoal = previousVertex[chosenGoal]
    }
    if (picked[picked.length-1] != start ) {
        console.log("no alternative")
        found = false
    }

    console.log("Picked adalah :" + picked)
    console.log("Goal aalah: "+ goal)
    console.log("iterations adalah" + iteration)


    // Making json
    let counterObject = picked.length
    let graphsResourceNode = []
    let graphsResourceEdge = []
    for ( let nodeMade in graph.graph.nodes) {
        for (let pickedNode in picked) {
            if (graph.graph.nodes[nodeMade].id == picked[pickedNode]) {
                graphsResourceNode.push(graph.graph.nodes[nodeMade])
            }
        }
        
    }
    for (let number = 0; number < (picked.length-1) ; number++) {
        for (let checking in graph.graph.edges) {
            if (graph.graph.edges[checking].to == picked[number] && graph.graph.edges[checking].from == picked[(number+1)]) {
                graphsResourceEdge.push(graph.graph.edges[checking])
            }
        }
        
    }
    var endTime = window.performance.now()
    let timeExcecution = (endTime - startTime)
    console.log("time adalah " + timeExcecution)
    let result = {
        "counter" :counterObject,
        "graph": {
            "nodes" : graphsResourceNode,
            "edges" : graphsResourceEdge
        },
        "found" : found,
        "time" :timeExcecution,
        "iterations": iteration
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

