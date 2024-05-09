import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import backgroundImage from '../Images/istockphoto-1086026926-612x612.jpg';

const ExportGit = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      console.log('Projects data:', data);
      // project[3] contain list of todo items
      const projectsWithTodoArrays = data.map(project => {
        const todos = project[3].split(',').map(todo => ({ title: todo, completed: false }));
        return [project[0], project[1], project[2], todos];
      });
      setProjects(projectsWithTodoArrays);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleCheckboxChange = (index, todoIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[index][3][todoIndex].completed = !updatedProjects[index][3][todoIndex].completed;
    setProjects(updatedProjects);
  };

  const calculateSummary = (project) => {
    const totalTodos = project[3].length;
    const completedCount = project[3].filter(todo => todo.completed).length;
    return `Summary: ${completedCount} / ${totalTodos} todos completed`;
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
      <div style={{ textAlign: 'center',  width: '100%' }}>
        <Navbar />
      </div>
      <h2 style={{ marginBottom: '20px' }}>All Projects</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          fontFamily:'Times New Roman',
          fontSize: '18px'
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '20px',
              margin: '10px',
              maxWidth: '300px',
              marginBottom: '40px', 
              position: 'relative',
              height:'300px',
              backgroundColor: 'white', 
            }}
          >
            <h3>{project[1]}</h3>
            <p>{calculateSummary(project)}</p>
            <p>Pending:</p>
            {project[3].map((todo, todoIndex) => (
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
            {project[3].map((todo, todoIndex) => (
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
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: 'Times New Roman',
                fontSize: '15px',
              }}
              // onClick event handler should be added here
            >
              Export as Gist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExportGit;
