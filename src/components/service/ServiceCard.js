import style from './ServiceCard.module.css';
import { BsFillTrashFill } from "react-icons/bs";

function ServiceCard({ name, id, cost, description, handleRemove }) {

   const remove = (e) => {
      e.preventDefault();
      handleRemove(id, cost);
   }

   return(
      <div className={style.service_card}>
            <h3>{name}</h3>
            <p>
               <span>Custo do serviço: </span> R${cost}
            </p>
            <p  className={style.description_text}>
               <span>Descrição do serviço: </span> {description}
            </p>

            <div className={style.service_card_actions}>
               <button onClick={remove}>
                  <BsFillTrashFill /> Excluir
               </button>
            </div>

         
      </div>
   )
}

export default ServiceCard;
