import { Link } from 'react-router-dom';
import style from './ProjectCard.module.css';

import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

function ProjectCard({ id, name, budget, category, handleRemove }) {

   function remove(e) {
      e.preventDefault();
      handleRemove(id);
   }

   return(
      <div className={style.project_card}>
         <h4>Projeto {name} </h4>
         <p>
            <span>Orçamento</span> R$:{budget}
         </p>
         <p className={style.category_text}>
            <span className={`${style[category.toLowerCase()]}`}> </span> {category}
         </p>
         <p>
            <span>Id do projeto: </span>{id}
         </p>

         <div className={style.project_card_actions}>
            <Link to={`/project/edit/${id}`}>
               <BsPencilSquare /> Editar
            </Link>
            <button onClick={remove}>
               <BsFillTrashFill /> Excluir
            </button>
         </div>

      </div>
   )
}

export default ProjectCard;