import React from 'react';
import styles from './Nastavnici.module.css';

const PredmetRow = ({ id, naziv }) => {
  return (
    <div>
      {/*  <p>
        {id} {naziv}
      </p> */}
      <div className={styles.nastavnici}>
        <p>
          {id} {naziv}
        </p>
      </div>
    </div>
  );
};

export default PredmetRow;
