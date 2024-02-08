import { useState , useEffect} from 'react';
import './App.css';
import Header from './modules/Header';
import Tasks from './modules/Tasks';
import axios from 'axios';

function App() {

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5051/read');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            // values = data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
 
    fetchData();
}, []);

  const [AA, setTasks] = useState ([{
    id:'01',
    text:'Food shopping',
    day:'feb 6th at 12:00'
},
{
    id:'02',
    text:'Eating Lurch',
    day:'feb 6th at 14:00'

},
{
    id:'03',
    text:'Doing Landury',
    day:'feb 8th at 8:00'

}]
)
function handleAddTask()  {
    var input = document.getElementById('inputs');
  
    let newId = Math.max(...AA.map(task => task.id), 0) + 1;
    let day = new Date().toLocaleDateString();
    let date = new Date();
    day = day;
    let tesk = input.value;
    let BB = [...AA, {id:`${newId}`, text: tesk, day: `${day}`}];
    setTasks([...BB]);
  
    //setTasks(BB);
  }

function DeleteTask(my_input) {
  setTasks(AA.filter((el)=> el.id !== my_input))
}

function sending() {
    const dataToSend = {
      key: 'value',
      anotherKey: 'anotherValue'
    };

    axios.get('/formFront', dataToSend)
      .then(response => {
        console.log(response.data);
        response.send(dataToSend)
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
}

const tt = 'Time'

  return (
    <div className="App">
      <Header title='TASK MANAGER' onAdding={handleAddTask}/><br />
      <Tasks  title= {AA}  onDelete = {DeleteTask}/>
      <button onClick={sending}>Addding</button>
      </div>
  );
}

export default App;
