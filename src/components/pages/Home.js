import style from './Home.module.css';
import saving from '../../img/savings.svg';
import LinkButton from '../layouts/LinkButton'

function Home() {
   return (
      <section className={style.section_home}>
         <div className={style.div_home_container}>
            <h1> Bem-vindo ao <span>Costs</span> </h1>
            <p>Crie e gerencie seus projetos agora mesmo</p>
            <div>
               <img src={ saving } alt="Costs " />
               <div>
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <LinkButton to="/newProject" text="Criar Projeto"/>
               </div>
            </div>
         </div>

         <hr className={style.hr}/>

         <div className={style.div_home_container}>
            <h1> Criação do <span>Costs</span> </h1>
            <p>Uma ferramenta útil e versátil para seu trabalho</p>
            <div>
               <img src={ saving } alt="Costs " />
               <div>
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
               </div>
            </div>
         </div>


      </section>


   )
}

export default Home;