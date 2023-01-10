import styles from './SubmitButton.module.css';

function SubmitButton({ text }) {
   return(
      <div className={styles.div_btn_submit}>
         <button className={styles.btn}>{ text }</button>
      </div>
   )
}

export default SubmitButton;