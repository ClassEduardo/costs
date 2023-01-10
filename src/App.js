import { BrowserRouter  as Router, Routes, Route} from 'react-router-dom';

import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import EditProject from './components/pages/EditProject'

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'


function App() {
   return (
      <div className="App">
         <Router>

            <Navbar />

            <Container customClass="min_height">
               <Routes>
                  <Route exact path="/" element={ <Home /> } /> 
                  <Route path="/company" element={ <Company /> } /> 
                  <Route path="/contact" element={ <Contact /> } /> 
                  <Route path="/newProject" element={ <NewProject /> } /> 
                  <Route path="/projects" element={ <Projects /> } /> 
                  <Route path="/project/edit/:id" element={ <EditProject /> } /> 
               </Routes>
            </Container>
            <Footer />     
            
         </Router>
      </div>
   );
}

export default App;
