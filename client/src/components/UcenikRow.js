import React from 'react';
import styles from './Ucenik.module.css';

const UcenikRow = ({ id, ime, prezime, birthday }) => {
  return (
    <div className={styles.ucenik}>
      <h1>
        {id} {ime} {prezime}
      </h1>
      <hr />
      <p>Birthday: {birthday}</p>
    </div>
  );
};

export default UcenikRow;
