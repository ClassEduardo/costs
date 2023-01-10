import { BsFacebook, BsInstagram, BsLinkedin} from "react-icons/bs";

import style from './Footer.module.css'

function Footer() {
   return (
      <footer className={style.footer}>
         <h3>Costs</h3>
         <ul className={style.social_list}>
            <li className="item_social_list"> <BsFacebook /> </li>
            {/*<li > <BsBug /> </li>*/}
            <li > <BsInstagram /> </li>
            <li > <BsLinkedin /> </li>
         </ul>
         <p>
            <span>Costs</span> &copy; 2022
         </p>
      </footer>
   )
}

export default Footer;
