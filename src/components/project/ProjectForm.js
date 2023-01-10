// Modules and files
   import { useState, useEffect } from 'react';

   import styles from './ProjectForm.module.css';
   import Input from '../form/Input';
   import Select from '../form/Select';
   import SubmitButton from '../form/SubmitButton';
 

// Componente form p/ criação do projeto
   function ProjectForm({ handleSubmit, btnText, projectData }) {

      // Categorias dos prjetos
      const [categories, setCategories] = useState([]);
      const [project, setProject] = useState( projectData || {} );


      useEffect(() => {
         // Request das categories via fetch
         fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: { 
               'Content-type': 'application/json'
            }
         }) // Recebendo as categories e transformando em JSON
            .then((resp) => resp.json())
            .then((data) => {
               // Settando as categories do JSON nas categories do form
               setCategories(data);
            }) 
            .catch(e => console.log(e));
      }, []);

      const submit = (e) => {
         e.preventDefault();
         handleSubmit(project);
      }

      function handleChange(e) {
         setProject({ ...project, [e.target.name]: e.target.value });
      }

      function handleCategory(e) {
         setProject({ ...project, category : {
            id: e.target.value, 
            name: e.target.options[e.target.selectedIndex].text,
         } 
         });
         
      }

      // Componentes do form 
      return (
         <form onSubmit={ submit } className={styles.form}>
            <Input  
               type="text" 
               text="Nome do projeto:" 
               name="name" 
               placeholder="Insira o nome do projeto" 
               handleOnChange={handleChange} 
               value={project.name ? project.name : ''}
               />

            <Input  
               type="number" 
               text="Orçamento do projeto:" 
               name="budget"  
               placeholder="Insira o orçamento do projeto" 
               handleOnChange={handleChange}
               value={project.budget ? project.budget : ''}
            />

            <Select 
               name="category_id" 
               text="Selecione a categoria"
               options={categories} 
               handleOnChange={handleCategory}
               value={project.category ? project.category.id : ''}

            />
            <SubmitButton text={ btnText }/>
         </form>
      )
   }

// Exportação do componente form
   export default ProjectForm;
