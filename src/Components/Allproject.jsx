import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import backgroundImage from '../Images/istockphoto-1856672915-612x612.jpg';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to fetch projects from the server
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      console.log('Projects data:', data);
      setProjects(data); // Set projects state with fetched data
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Function to format date strings
  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid Date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Function to split projects into groups of three
  const splitProjectsIntoRows = () => {
    const rows = [];
    for (let i = 0; i < projects.length; i += 3) {
      rows.push(projects.slice(i, i + 3));
    }
    return rows;
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
        <Navbar /> {/* Navbar component */}
      </div>
      <h2 style={{ marginBottom: '20px', fontFamily: 'Times New Roman', fontSize: '15px' }}>All Projects</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {splitProjectsIntoRows().map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '30px',
              marginTop:'30px'
            }}
          >
            {row.map((project, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '20px',
                  margin: '10px',
                  width: '300px', 
                  fontFamily: 'Times New Roman',
                  fontSize: '15px',
                  textAlign: 'center',
                  backgroundColor: 'white', 
                }}
              >
                <h2>Project Title: {project[1]}</h2>
                <div style={{ fontSize: '18px',fontStyle: 'italic'  }}>
                  <p>Project ID: {project[0]}</p>
                  <p>Created Date: {formatDate(project[2])}</p>
                  <p>Project todos: {project[3]}</p>
                  <p>Todo ID: {project[4]}</p>
                  <p>Todo Description: {project[5]}</p>
                  <p>Todo Status: {project[6]}</p>
                  <p>Todo Created Date: {formatDate(project[7])}</p>
                  <p>Todo Updated Date: {formatDate(project[8])}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
