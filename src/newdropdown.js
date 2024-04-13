import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userTasks.css';

const UserTasks = ({ userId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!userId) return;

    // Fetch tasks for the selected user
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, [userId]);

  const handleMarkDone = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const completedTasks = tasks.filter(task => task.completed);
  const uncompletedTasks = tasks.filter(task => !task.completed);
  const totalTasks = tasks.length;

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        <h3>Uncompleted Tasks</h3>
        <ul style={{listStyle: 'none'}}>
          {uncompletedTasks.map(task => (
            <li key={task.id} className='task-item'>
            {task.title}
              <button className="mark-done-button" onClick={() => handleMarkDone(task.id)}>Mark done</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Completed Tasks</h3>
        <ul style={{listStyle: 'none'}}>
          {completedTasks.map(task => (
            <li key={task.id} className='task-item'>{task.title}</li>
          ))}
        </ul>
      </div>
      <p style={{display:'flex', marginLeft:'40px'}}>Done {completedTasks.length}/{totalTasks} tasks</p>
    </div>
  );
};

const Dropdown = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    // Fetch user data from the API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div>
      <select value={selectedUser} onChange={handleChange}>
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      {selectedUser && <UserTasks userId={selectedUser} />}
    </div>
  );
};

export default Dropdown;
