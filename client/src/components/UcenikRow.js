import React from 'react';
import styles from './Ucenik.module.css';

const UcenikRow = ({
  id,
  ime,
  prezime,
  birthday,
  image,
  imeOca,
  imeMajke,
  maticniBroj,
  adresa,
  onEditUcenikHandler,
  onDeleteUcenikHandler,
}) => {
  return (
    <>
      <h1>
        {id} {ime} {prezime}
      </h1>
      <div className={styles.data} data="ucenik-data">
        <p>Datum rođenja: {birthday}</p>
        <p>Otac: {imeOca}</p>
        <p>Majka: {imeMajke}</p>
        <p>Maticni broj: {maticniBroj}</p>
        <p>Adresa: {adresa}</p>
      </div>
      <div className={styles.image}>
        <img src={image} alt="User"></img>
      </div>
      <div className={styles['buttons-container']}>
        <button
          onClick={() => {
            onDeleteUcenikHandler(id);
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            onEditUcenikHandler(id);
          }}
        >
          Edit
        </button>
      </div>
    </>
  );
};

export default UcenikRow;
