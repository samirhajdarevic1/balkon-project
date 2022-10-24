import React, { useState } from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {
  const [error, setError] = useState('');

  const removeModal = () => {
    setError(null);
  };
  return (
    <>
      {error && <div className={styles.backdrop} onClick={removeModal}></div>}
      <footer>
        <button className={styles.button} onClick={removeModal}>
          Okay
        </button>
      </footer>
    </>
  );
};

export default Modal;
