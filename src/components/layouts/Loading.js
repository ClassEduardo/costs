import loading from '../../img/loading.svg'

import style from './Loading.module.css';

function Loading() {
   return(
      <div className={style.loading_container}>
         <img src={loading} alt="Loadig" className={style.loader}/>
      </div>
   )
};

export default Loading;
