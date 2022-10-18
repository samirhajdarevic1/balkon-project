import React from 'react';
import styles from './Nastavnici.module.css';
const OcjenaRow = ({ id, opis, datum, predmet, nastavnik, ocjena, razred }) => {
  return (
    <div className={styles.nastavnici}>
      <p>ID ocjene: {id}</p>
      <p>Datum ocjene: {datum}</p>
      <p>Nastavnik: {nastavnik}</p>
      <p>Predmet: {predmet}</p>
      <p>Ocjena: {ocjena}</p>
      <p>Opis: {opis}</p>
      <p>Razred: {razred}</p>
    </div>
  );
};

export default OcjenaRow;
