import { useLocation } from "react-router-dom";
import Message from "../layouts/Message";
import LinkButton from '../layouts/LinkButton' 
import Container from "../layouts/Container";
import Loading from '../layouts/Loading';
import style from "./Projects.module.css"; 
import ProjectCard from '../project/ProjectCard';
import { useState, useEffect } from "react";

function Projects() {
   const [projects, setProjects] = useState([]);
   const [removeLoading, setRemoveLoading] = useState(false);
   const [projectMsg, setProjectMsg] = useState('');

   const location = useLocation();
   let message = '';
   if (location.state ) {
      message = location.state.message;
   };

   useEffect(() => {
      setTimeout(() => {
         fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
               'Content-type': 'application/json'
            } 
         })
         .then((resp) => resp.json())
         .then((data) => {
            console.log(data);
            setProjects(data);
            setRemoveLoading(true);
         })
         .catch((err) => console.log(err))
      }, 1000);
   }, [])

   function removeProject(id) {
      fetch(`http://localhost:5000/projects/${id}`, { 
         method: "DELETE",
         headers: {
            'Content-Type': 'application/json'
         },
      }).then(resp => resp.json())
      .then(() => {
         setProjects(projects.filter((project) => project.id !== id));
         setProjectMsg('Projeto removido com sucessso!');
      })
      .catch(err => console.log(err))
   };
   
   return (
      <div className={style.project_container}>
         <div className={style.title_container}>
            <h1> Meus Projects </h1>
            <LinkButton to="/newProject" text="Criar Projeto"/>         
         </div>

         {message && <Message type="success" msg={message}/>}
         {projectMsg && <Message type="success" msg={projectMsg}/>}

         <Container customClass="start">
            {projects.length > 0 && projects.map((project) => (
               <ProjectCard 
                  name={project.name} 
                  id={project.id} 
                  budget={project.budget} 
                  category={project.category.name}
                  key={project.id} 
                  handleRemove={removeProject}
               />
            ))}
         { !removeLoading && <Loading/> }
         { removeLoading && projects.length === 0 && 
            (<p>Não há projetos cadastrados.</p>)
         } 
         </Container>
      </div>
   )
}

export default Projects;