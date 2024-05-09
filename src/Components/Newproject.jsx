import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, Snackbar, SnackbarContent, TextField, Typography, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './Navbar';
import backgroundImage from '../Images/istockphoto-1086026926-612x612.jpg';
import axios from 'axios';

const theme = createTheme();

const NewProjectForm = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [todos, setTodos] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState(''); 
  const [todoForms, setTodoForms] = useState([]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
//One important thing to note here is that only after the successful creation of a project can we create a todo. If we have opened the todo form along with the project creation form and click on 'Create Project', it will give an alert.
// made all fields in the project form mandatory else it give snackbar alert in red color
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !createdDate || !todos || todoForms.some(todo => !todo.description || !todo.status || !todo.createdDate || !todo.updatedDate)) {
      setSnackbarMessage('Please fill in all fields to create the project');
      setSnackbarColor('red');
      setOpenSnackbar(true);
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/projects', { title, createdDate, todos });
      const { id: projectId } = response.data; // Extract project ID from the response
      setId(projectId); // Set the project ID received from backend
      setSnackbarMessage('Project created successfully.');
      setSnackbarColor('green');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleAddTodoForm = () => {
    // Include project ID when adding a new todo
    setTodoForms([...todoForms, { projectId: id, description: '', status: '', createdDate: '', updatedDate: '' }]);
  };

  const handleSaveProject = async () => {
    try {
      setSnackbarMessage('Project and todos saved successfully.');
      setSnackbarColor('green');
      setOpenSnackbar(true);
      // Reset form fields
      setTitle('');
      setCreatedDate('');
      setTodos('');
      setTodoForms([]);
      // Refresh the page after 2 seconds
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error('Error saving project and todos:', error);
    }
  };
  
  // here made all fields in the todo form mandatory else it give snackbar alert in red color
  const handleSaveTodo = async (index) => {
    const todo = todoForms[index];
    if (!todo.description || !todo.status || !todo.createdDate || !todo.updatedDate) {
      setSnackbarMessage('Please fill in all fields for the todo.');
      setSnackbarColor('red');
      setOpenSnackbar(true);
      return;
    }
    console.log('Todo saved:', todo);
    try {
      await axios.post('http://localhost:8080/api/todos', todo);
      setSnackbarMessage('Todo saved successfully.');
      setSnackbarColor('green');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };
  // fortodo  status change
  const handleTodoChange = (index, field, value) => {
    const updatedTodoForms = [...todoForms];
    updatedTodoForms[index][field] = value;
    setTodoForms(updatedTodoForms);
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
      <Navbar />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundSize: 'cover',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:'6px'
          }}
        >
          <CssBaseline />
          <Box sx={{ textAlign: 'center', width: '100%', marginTop: '2rem' }}>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  backgroundColor: 'white',
                  p: 3,
                  borderRadius: 8,
                  border: '2px solid #ccc',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '90%',
                  mx: 'auto',
                  marginTop:'116px',
                  marginBottom:'30px'
                }}
              >
               <Typography component="h3" variant="h4" style={{ fontFamily: 'Times New Roman', fontSize: '27px' }}>
               New Project
              </Typography>
                <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="title"
                    label="Title"
                    type="text"
                    id="title"
                    autoComplete="off"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="createdDate"
                    label="Created Date"
                    type="date"
                    id="createdDate"
                    autoComplete="off"
                    value={createdDate}
                    onChange={(e) => setCreatedDate(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    rows={4}
                    name="todos"
                    label="List of to-do (Separate by commas)"
                    type="text"
                    autoComplete="off"
                    value={todos}
                    onChange={(e) => setTodos(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ margin: '1rem 0' }}
                  >
                    Create Project
                  </Button>
                </form>
                {/* todo form starts here */}
                {todoForms.map((todo, index) => (
                  <div key={index}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name={`projectId-${index}`}
                      label="Project ID"
                      type="text"
                      autoComplete="off"
                      value={todo.projectId}
                      onChange={(e) => handleTodoChange(index, 'projectId', e.target.value)}
                    />
                    {/* Project ID automatically appears in the todo form because a project must be created first before adding todos, thus the project ID collected from the backend is added here*/}
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name={`description-${index}`}
                      label="Description"
                      type="text"
                      autoComplete="off"
                      value={todo.description}
                      onChange={(e) => handleTodoChange(index, 'description', e.target.value)}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      select
                      name={`status-${index}`}
                      label="Status"
                      value={todo.status}
                      onChange={(e) => handleTodoChange(index, 'status', e.target.value)}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      {/* two options are provided based on the todo status, they can be changed later if needed. */}
                    </TextField>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name={`createdDate-${index}`}
                      label="Created Date"
                      type="date"
                      autoComplete="off"
                      value={todo.createdDate}
                      onChange={(e) => handleTodoChange(index, 'createdDate', e.target.value)}
                    />
                   {/* At the time of creation, both the Created Date and Updated Date can be set as the same value. These dates can be updated later if needed. */}
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name={`updatedDate-${index}`}
                      label="Updated Date"
                      type="date"
                      autoComplete="off"
                      value={todo.updatedDate}
                      onChange={(e) => handleTodoChange(index, 'updatedDate', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() => handleSaveTodo(index)}
                      style={{ margin: '0.5rem 0' }}
                    >
                      Save Todo
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handleAddTodoForm}
                  style={{ margin: '1rem 0' }}
                >
                  Add Todo
                </Button>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSaveProject}
                  style={{ margin: '1rem 0' }}
                >
                  Save Project
                </Button>
              </Box>
            </Container>
          </Box>
        </Box>
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
      </ThemeProvider>
    </div>
  );
};

export default NewProjectForm;
