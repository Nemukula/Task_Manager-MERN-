import React, { useState } from 'react'
import PropTypes from 'prop-types';
import '../App.css'


const Tasks = (props) => {
  return (
    <div className='Tasks'>
      {props.title.map((task) => 
      <div key={task.id}>
      <span >{task.text}</span><span  onClick= {() => props.onDelete(task.id)} className='cross'>X</span><br />
      <span>{task.day}</span>
      </div>
      )}
    </div>
  )
}

export default Tasks
