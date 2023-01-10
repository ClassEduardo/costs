import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'; 

import { v4 as uuidv4 } from 'uuid';

import Loading from '../layouts/Loading';
import Container from '../layouts/Container';
import Message from '../layouts/Message';
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

import style from './EditProject.module.css'

function EditProject() {
   const { id } = useParams();

   const [project, setProject] = useState([]);
   const [services, setServices] = useState([]);
   const [showProjectForm, setShowProjectForm] = useState(false);
   const [showServiceForm, setShowServiceForm] = useState(false);
   const [message, setMessage] = useState();
   const [typeMessage, setTypeMessage] = useState();

   useEffect(() => {
      setTimeout(() => {
         fetch(`http://localhost:5000/projects/${id}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json'
         }
      }).then((resp) => resp.json())
      .then((data) => {
         setProject(data);
         setServices(data.services);
      }) 
      .catch(err => console.log(err));
      }, 1000);
   }, [id]);



   function editPost(project) {
      setMessage('')
      // budget validation
      if (project.budget < project.cost) {
         setMessage('O orçamento não pode ser menor que o custo do projeto!');
         setTypeMessage('error');
         return false;
      }
  
      fetch(`http://localhost:5000/projects/${project.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(project),
      })
         .then((resp) => resp.json())
         .then((data) => {
            setProject(data);
            setShowProjectForm(!showProjectForm);
            setMessage('Projeto atualizado com sucesso!');
            setTypeMessage('success');
         })
    }

   function createService(project) {
      setMessage('')
      // last service
      const lastService = project.services[project.services.length - 1];
      lastService.id = uuidv4();

      const lastServiceCost = lastService.cost;
      const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

      // Maximum value validation
      if(newCost > parseFloat(project.budget)) {
         setMessage('Orçamento ultrapassado, verifique o valor do serviço');
         setTypeMessage('error');
         project.services.pop();
         return false;
      }

      // add service cost to total cost
      project.cost = newCost;
      // update service projetc
      fetch(`http://localhost:5000/projects/${project.id}`, {
         method: 'PATCH',
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(project)
      }).then((resp) => resp.json())
      .then((data) => {
         setServices(data.services)
         setShowServiceForm(!showServiceForm);
         setMessage('Serviço adicionado!');
         setTypeMessage('success')
         console.log(data);
      })
      .catch(err => console.log(err))
   }

   function removeService(id, cost) {
      const serviceUpdated = project.services.filter(
         (service) => service.id !== id
      );

      const projectUpdate = project;

      projectUpdate.services = serviceUpdated;
      projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost);


      fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(projectUpdate)
      }).then((resp) => resp.json())
      .then(() => {
         setProject(projectUpdate);
         setServices(serviceUpdated);
         setMessage('Serviço removido com sucesso');
      })
   }

   function toggleProjectForm() {
      setShowProjectForm(!showProjectForm);
   };

   function toggleServiceForm() {
      setShowServiceForm(!showServiceForm);
   }

   return  (<>
      {project.name ? (
         <div className={style.project_details}>
            <Container customClass='column'>
               {Message && (<Message type={typeMessage} msg={message}/>)}

               {/* Detalhes e formu de atualização do projeto */}
               <div className={style.details_container}>
                  <h1>Projeto: {project.name}</h1>

                  <button className={style.btn} onClick={toggleProjectForm}>
                     {!showProjectForm ? 'Editar Projeto' : 'Salvar Projeto'}
                  </button>
                  
                  {!showProjectForm ? (
                     <div className={style.project_info}>
                        <p>
                           <span>Categoria: </span> {project.category.name}
                        </p>
                        <p>
                           <span>Total de Orçamento: </span> R${project.budget}
                        </p>
                        <p>
                           <span>Total Utilizado: </span> R${project.cost}
                        </p>
                     </div>
                  ) : (
                     <div className={style.project_info}>
                        <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/> 
                     </div>
                  )}
               </div>

               {/* Detalhes e form dos serviços */}
               <div className={style.service_form_container}> 
                  <h2>Adicione um serviço:</h2>

                  <button className={style.btn} onClick={toggleServiceForm}>
                     {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                  </button>

                  <div className={style.project_info}>
                     {showServiceForm && (
                        <ServiceForm 
                        handleSubmit={createService} 
                        btnText='Criar serviço' 
                        projectData={project} />
                     )}
                  </div>
               </div>
 
               <h2>Serviços</h2>
               <Container customClass="start">
                  {services.length > 0 && services.map((service) => (
                     <ServiceCard 
                        name={service.name}
                        id={service.id}
                        cost={service.cost}
                        description={service.description}
                        key={service.id}
                        handleRemove={removeService}
                     />
                  ))}
               </Container>

            </Container>
         </div> 
      ) : (
         <Loading />
      )}
   </>)
}
 
export default EditProject;