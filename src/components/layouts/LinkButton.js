import { Link } from "react-router-dom";
import style from './LinkButton.module.css';

function LinkButton({ to, text }) {
   return(
      <div>
         <Link className={style.btn} to={ to }>
            { text }
         </Link>
      </div>      
   )
}

export default LinkButton;
