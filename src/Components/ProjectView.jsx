import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Snackbar, Card } from '@mui/material';
import backgroundImage from '../Images/istockphoto-1856672915-612x612.jpg';
import { SnackbarContent } from '@mui/material';

const ProjectView = () => {
  // State variables
  const [projects, setProjects] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editableTitleIndex, setEditableTitleIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [updatedTodoIndex, setUpdatedTodoIndex] = useState(null);
  const [showAddTodoForm, setShowAddTodoForm] = useState([]);
  const [snackbarColor, setSnackbarColor] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);
  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      console.log('Projects data:', data);
      const projectsWithTodoArrays = data.map(project => {
        const todos = project[3].split(',').map(todo => ({ title: todo, completed: false }));
        return { ...project, todos };
      });
      // All project todos are initially in the pending state, and there is no data in the complete state.
      setProjects(projectsWithTodoArrays);
      setShowAddTodoForm(new Array(projectsWithTodoArrays.length).fill(false));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
// Handle checkbox change for todos
  const handleCheckboxChange = (index, todoIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[index].todos[todoIndex].completed = !updatedProjects[index].todos[todoIndex].completed;
    setProjects(updatedProjects);
  };
 // Calculate summary of todos for a project
  const calculateSummary = (project) => {
    const totalTodos = project.todos.length;
    const completedCount = project.todos.filter(todo => todo.completed).length;
    return `Summary: ${completedCount} / ${totalTodos} todos completed`;
  };
// Close snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
// Handle editing project title
  const handleEditTitle = (index) => {
    setEditableTitleIndex(index);
    setEditedTitle(projects[index][1]);
  };
// Handle changes in edited title
  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };
 // Handle saving project title
  const handleSaveTitle = async (index) => {
    try {
      const updatedProject = {
        title: editedTitle
      };
      await axios.put(`http://localhost:8080/api/projects/${projects[index][0]}`, updatedProject);
      setEditableTitleIndex(null);
      setSnackbarMessage('Project title edited successfully.');
      setSnackbarColor('green'); // Set snackbar color to green
      setOpenSnackbar(true);
      setTimeout(fetchProjects, 2000);
    } catch (error) {
      console.error('Error saving project title:', error);
    }
  };
// updating todo
  const handleUpdateTodo = (index) => {
    setUpdatedTodoIndex(index);
  };
// canceling update todo
  const handleCancelUpdateTodo = () => {
    setUpdatedTodoIndex(null);
  };
// saving updated todo
  const handleSaveUpdatedTodo = async (index) => {
    try {
      const todoId = projects[index][4]; // index 4 contain the todo id
      const todoData = {
        description: document.getElementById(`description-${index}`).value,
        status: document.getElementById(`status-${index}`).value,
        createdDate: document.getElementById(`createdDate-${index}`).value,
        updatedDate: document.getElementById(`updatedDate-${index}`).value,
        projectId: projects[index][0]
      };
      await axios.put(`http://localhost:8080/api/todos/${todoId}`, todoData);
      console.log('Todo updated:', todoData);
      setUpdatedTodoIndex(null);
      setSnackbarMessage('Todo updated successfully.');
      setSnackbarColor('green'); // Set snackbar color to green
      setOpenSnackbar(true);
      setTimeout(fetchProjects, 2000);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
 // deleting todo
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      setSnackbarMessage('Todo deleted successfully.');
      setSnackbarColor('green'); // Set snackbar color to green
      setOpenSnackbar(true);
      setTimeout(fetchProjects, 2000);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
 // adding todo
  const handleAddTodo = (index) => {
    const updatedShowAddTodoForm = [...showAddTodoForm];
    updatedShowAddTodoForm[index] = true;
    setShowAddTodoForm(updatedShowAddTodoForm);
  };
// canceling add todo
  const handleCancelAddTodo = (index) => {
    const updatedShowAddTodoForm = [...showAddTodoForm];
    updatedShowAddTodoForm[index] = false;
    setShowAddTodoForm(updatedShowAddTodoForm);
  };
 // saving new todo
  const handleSaveNewTodo = async (index) => {
    try {
      const todoData = {
        description: document.getElementById(`newDescription-${index}`).value,
        status: document.getElementById(`newStatus-${index}`).value,
        createdDate: document.getElementById(`newCreatedDate-${index}`).value,
        updatedDate: document.getElementById(`newUpdatedDate-${index}`).value,
        projectId: projects[index][0]
      };
      await axios.post('http://localhost:8080/api/todos', todoData);
      console.log('Todo saved:', todoData);
      const updatedShowAddTodoForm = [...showAddTodoForm];
      updatedShowAddTodoForm[index] = false;
      setShowAddTodoForm(updatedShowAddTodoForm);
      setSnackbarMessage('Todo saved successfully.');
      setSnackbarColor('green'); 
      setOpenSnackbar(true);
      setTimeout(fetchProjects, 2000);
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };
// Format date string
  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid Date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%' }}>
        <Navbar />
      </div>
      <h2 style={{ marginBottom: '20px', fontFamily: 'Times New Roman', fontSize: '20px' }}>All Projects</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {projects.map((project, index) => (
          <Card
            key={index}
            style={{
              marginBottom: '20px',
              width: 'fit-content',
              fontFamily: 'Times New Roman',
              fontSize: '17px',
              maxWidth: '350px',
              marginTop: '20px',
              border: '1px solid black'
            }}
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h2>
                {editableTitleIndex === index ? (
                  <>
                    <input type="text" value={editedTitle} onChange={handleTitleChange} />
                    <button onClick={() => handleSaveTitle(index)} style={{ fontFamily: 'Times New Roman', marginLeft: '15px' }}>Save</button>

                  </>
                ) : (
                  <>
                    <span>{project[1]}</span>
                    <button onClick={() => handleEditTitle(index)} style={{ fontFamily: 'Times New Roman', marginLeft: '15px' }}>Edit title</button>
                  </>
                )}
              </h2>
              {/* The backend data is structured as an array, and here it's mapped correctly based on the index */}
              <p>Project ID: {project[0]}</p>
              <p>Todo Description: {project[5]}</p>
              <p>Todo Status: {project[6]}</p>
              <p>Todo Created Date: {formatDate(project[7])}</p>
              <p>Todo Updated Date: {formatDate(project[8])}</p>
              <p>{calculateSummary(project)}</p>
              <p>Pending:</p>
              {project.todos.map((todo, todoIndex) => (
                !todo.completed && (
                  <div key={todoIndex}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleCheckboxChange(index, todoIndex)}
                    />
                    <label>{todo.title}</label>
                  </div>
                )
              ))}
              <p>Completed:</p>
              {project.todos.map((todo, todoIndex) => (
                todo.completed && (
                  <div key={todoIndex}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleCheckboxChange(index, todoIndex)}
                    />
                    <label>{todo.title}</label>
                  </div>
                )
              ))}
              <button
                style={{ marginBottom: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
                onClick={() => handleUpdateTodo(index)}
              >
                Update Todo
              </button>
              <button
                style={{ marginBottom: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => handleDeleteTodo(project[4])}
              >
                Delete Todo
              </button>
              <button
                style={{ marginBottom: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => handleAddTodo(index)}
              >
                Add Todo
              </button>
              {showAddTodoForm[index] && (
                <form onSubmit={(e) => { e.preventDefault(); handleSaveNewTodo(index); }}>
                  <label htmlFor={`newDescription-${index}`}>Description:</label>
                  <input type="text" id={`newDescription-${index}`} name={`newDescription-${index}`} />
                  <br />
                  <label htmlFor={`newStatus-${index}`}>Status:</label>
                  <select id={`newStatus-${index}`} name={`newStatus-${index}`}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <br />
                  <label htmlFor={`newCreatedDate-${index}`}>Created Date:</label>
                  <input type="date" id={`newCreatedDate-${index}`} name={`newCreatedDate-${index}`} />
                  <br />
                  <label htmlFor={`newUpdatedDate-${index}`}>Updated Date:</label>
                  <input type="date" id={`newUpdatedDate-${index}`} name={`newUpdatedDate-${index}`} />
                  <br />
                  <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>
                    Save Todo
                  </button>
                  <button type="button" onClick={() => handleCancelAddTodo(index)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>
                    Cancel
                  </button>
                </form>
              )}
              {updatedTodoIndex === index && (
                <form onSubmit={(e) => { e.preventDefault(); handleSaveUpdatedTodo(index); }}>
                  <label htmlFor={`description-${index}`}>Description:</label>
                  <input type="text" id={`description-${index}`} name={`description-${index}`} />
                  <br />
                  <label htmlFor={`status-${index}`}>Status:</label>
                  <select id={`status-${index}`} name={`status-${index}`}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <br />
                  <label htmlFor={`createdDate-${index}`}>Created Date:</label>
                  <input type="date" id={`createdDate-${index}`} name={`createdDate-${index}`} />
                  <br />
                  <label htmlFor={`updatedDate-${index}`}>Updated Date:</label>
                  <input type="date" id={`updatedDate-${index}`} name={`updatedDate-${index}`} />
                  <br />
                  <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>
                    Save Todo
                  </button>
                  <button type="button" onClick={handleCancelUpdateTodo} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>
                    Cancel
                  </button>
                </form>
                // add todo and update todo form both are same
              )}
            </div>
          </Card>
        ))}
      </div>
      <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <SnackbarContent
            sx={{ backgroundColor: snackbarColor }} 
            message={snackbarMessage}
          />
        </Snackbar>
    </div>
  );
};

export default ProjectView;
