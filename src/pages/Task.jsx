import React from 'react'
import TaskForm from '../components/TaskForm'
import { useState } from 'react';
import TaskList from '../components/TaskList';
function Task() {
    
  

  
  return (
<>
 <div className="container mt-5">
      <h2 className="text-center mb-4">📝 Your Tasks</h2>
      <TaskForm  />
      <TaskList/>
    </div>
</>  )
}

export default Task