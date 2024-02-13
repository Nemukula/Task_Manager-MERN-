import { useState , useEffect} from 'react';
import './App.css';
import Header from './modules/Header';
import Tasks from './modules/Tasks';
import axios from 'axios';

coms

function App() {
  //////Fecting data from backend,  node.js <- Mongodb
  useEffect((data_main) => {
    const fetchData = async (data_main) => {
        try {
            const response = await fetch('http://localhost:5051/read');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            for (const i of data) {
              global_data.push(i); 
            }
            setTasks(data)
            console.log(global_data, 'global_data1');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    fetchData();
}, []);
console.log(global_data, 'global_data4');

const [state, setTasks] = useState (global_data);
/////Initial state to be used when app is opened

///////////ADDING NEW TASK FUNCTION///////////////////////
function handleAddTask()  {
    var input = document.getElementById('inputs');
    let newId = Math.max(...state.map(task => task.id), 0) + 1;
    let day = new Date().toLocaleDateString();
    let tesk = input.value;
    let BB = [...state, {id:`${newId}`, text: tesk, day: `${day}`}];
    setTasks([...BB]);
}
  //////////////DELETING TASK FUNCTION///////////////////////
function DeleteTask(my_input) {
  setTasks(state.filter((el)=> el.id !== my_input));
}

////////////////SENDING DATA FROM REACT TO BACKEND(node.js -> mongodb)
function sending(event) {

    event.preventDefault();
    axios.post('http://localhost:5051/fromFront', {state})//Sending data from current tasks/state (setted state)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
}

  return (
    <div className="App">
      <Header title='TASK MANAGER' onAdding={handleAddTask}/><br />
      <Tasks  title= {state}  onDelete = {DeleteTask}/>
      <button onClick={sending}>Save</button>
      </div>
  );
}
export default App;
