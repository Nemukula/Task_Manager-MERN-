import { useState , useEffect} from 'react';
import './App.css';
import Header from './modules/Header';
import Tasks from './modules/Tasks';
import axios from 'axios';

var global_data = [];

function App() {

  //////Fecting data from backend,  node.js <- Mongodb
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5051/read');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            global_data = data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

/////Initial state to be used when app is opened
const [AA, setTasks] = useState (global_data);


///////////ADDING NEW TASK FUNCTION///////////////////////
function handleAddTask()  {
    var input = document.getElementById('inputs');
    let newId = Math.max(...AA.map(task => task.id), 0) + 1;
    let day = new Date().toLocaleDateString();
    let tesk = input.value;
    let BB = [...AA, {id:`${newId}`, text: tesk, day: `${day}`}];
    setTasks([...BB]);
  }

  //////////////DELETING TASK FUNCTION///////////////////////
function DeleteTask(my_input) {
  setTasks(AA.filter((el)=> el.id !== my_input))
}

////////////////SENDING DATA FROM REACT TO BACKEND(node.js -> mongodb)
function sending(event) {
    const dataToSend = {
      key: 'value',
      anotherKey: 'anotherValue'
    };

    event.preventDefault();
    axios.post('http://localhost:5051/fromFront', {dataToSend})
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
      <Tasks  title= {global_data}  onDelete = {DeleteTask}/>
      <button onClick={sending}>Save</button>
      </div>
  );
}

export default App;
