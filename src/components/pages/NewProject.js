import { useNavigate } from 'react-router-dom';

import style from './NewProject.module.css';
import ProjectForm from '../project/ProjectForm';

function NewProject() {
   const navigate = useNavigate();

   function createPost(project) {
      // Initialize cost and services
      project.cost = 0;
      project.services = [];

      fetch('http://localhost:5000/projects', {
         method: 'POST',
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(project)
      })
      .then(resp => resp.json())
      .then(data => {
         console.log(data);
         navigate("/projects", { state: {message: "Projeto criado"} });
         // redirect
      })
      .catch(e => console.log(e));
   };

   return (
      <div className={style.newproject_container}>
         <h1>Crie seu Projeto</h1>
         <p>Crie seu projeto para depois adicionar os serviços</p> 
         <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
      </div>
   )
}

export default NewProject;