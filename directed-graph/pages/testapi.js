import {useState} from 'react'

function graphPage() {

    const [graf, setGraf] = useState([])

    const fetchGraph = async () => {
        fetch('/api/graphs').then((response) => {
            console.log(response);
            response.json().then((data) => {
                console.log(data);
                setGraf(data)
            });
        });
    }

    function testIfExist(input) {
        try {
            return input[0].graph.nodes[0].id;
        } catch (error) {
            console.log("keluar");
            return;
        }
      }


    const submitGraph = async () => {
        const response = await fetch('/api/graphs', {
            method: 'POST',
            body: JSON.stringify
        })

    }

    return (
        <>
        <input type='file' name='graph' required id='sequence'  onChange = {(e)=>handleFileInput(e)} accept=".json" />
        <button onClick={fetchGraph}>Load Graf keterangan</button>

        <ul> {graf.counter} </ul>
        <ul> {testIfExist(graf)} </ul>


        </>
    )
}

export default graphPage