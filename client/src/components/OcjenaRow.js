import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Ocjene.module.css';
const OcjenaRow = ({
  id,
  opis,
  datum,
  nastavnik,
  ocjena,
  onDeleteOcjenaHandler,
  indexOfFirstElement,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.ocjene}>
        <div className={styles['ocjene-data']}>
          <p>ID ocjene: {id}</p>
          <p>Datum ocjene: {datum}</p>
          <p>Nastavnik: {nastavnik}</p>
          <p>Ocjena: {ocjena}</p>
          <p>Opis: {opis}</p>
        </div>

        {indexOfFirstElement < 1 && (
          <div className={styles['buttons-container']}>
            <button onClick={() => onDeleteOcjenaHandler(id)}>Delete</button>
            <button onClick={() => navigate('ocjene/' + id + '/edit')}>
              Edit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default OcjenaRow;
