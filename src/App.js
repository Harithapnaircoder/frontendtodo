import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SignIn from './Components/Signin'; 
import SignUp from './Components/Signup'; 
import Viewproject from './Components/ProjectView';
import Newproject from './Components/Newproject';
import Allproject from './Components/Allproject';
import ExportGit from './Components/Exportgit';
import Footer from './Components/Footer'; 

function App() {
  return ( 
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          <Route path="/projectview" element={<Viewproject />} />
          <Route path="/newproject" element={<Newproject />} />
          <Route path="/allproject" element={<Allproject />} />   
          <Route path="/exportgit" element={<ExportGit />} />   
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
