import { Link } from "react-router-dom";

import Container from "./Container";

import style from './Navbar.module.css';

import logo from '../../img/costs_logo.png';

function Navbar() {
   return(
      <nav className={ style.navbar }>
         <Container>

               <Link to="/"> 
                  <img src={ logo } alt="Logo_Costs" />
               </Link>

            <ul className={ style.list }>
               <li className={ style.item_list }>
                  <Link to="/"> Home </Link>
               </li>

               <li className={ style.item_list }>
                  <Link to="/company"> Company </Link>
               </li>

               <li className={ style.item_list }>
                  <Link to="/contact"> Contact </Link>
               </li>
               <li className={ style.item_list }>
                  <Link to="/projects"> Projects </Link>
               </li>

               <li className={ style.item_list }>
                  <Link to="/newProject"> New Projects </Link>
               </li>
            </ul>
         </Container>
      </nav>
   )
};

export default Navbar;