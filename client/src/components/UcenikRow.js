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
}) => {
  return (
    <div className={styles.ucenik}>
      <h1>
        {id} {ime} {prezime}
      </h1>
      <div className={styles.data}>
        <p>Datum rođenja: {birthday}</p>
        <p>Otac: {imeOca}</p>
        <p>Majka: {imeMajke}</p>
        <p>Maticni broj: {maticniBroj}</p>
        <p>Adresa: {adresa}</p>
      </div>
      <div className={styles.image}>
        <img src={image} alt="User"></img>
      </div>
    </div>
  );
};

export default UcenikRow;
