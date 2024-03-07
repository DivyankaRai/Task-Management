import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Task = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8080/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCompleteChange = (id, completed) => {
    axios.patch(`http://localhost:8080/tasks/${id}`, { completed })
      .then(() => {
        const updatedTasks = tasks.map(task => {
          if (task.id === id) {
            return { ...task, completed };
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error("Error updating complete status:", error);
      });
  };

  const handleSelectComplete = (id, completed) => {
    handleCompleteChange(id, completed);
  };

  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:8080/tasks/${id}`)
      .then(() => {
        const filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
      })
      .catch(error => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <>
      <div style={{ width: '80%', margin: '50px auto', maxHeight: '300px', overflowY: 'auto' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>SR. No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task,i) => (
              <tr key={task.id}>
                <td>{i+1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <DropdownButton
                    id={`dropdown-task-${task.id}`}
                    title={task.completed ? 'Yes' : 'No'}
                    variant={task.completed ? 'success' : 'danger'}
                  >
                    <Dropdown.Item
                      onClick={() => handleSelectComplete(task.id, !task.completed)}
                      active={!task.completed}
                    >
                      No
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSelectComplete(task.id, !task.completed)}
                      active={task.completed}
                    >
                      Yes
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Task;
