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
    <div className="ocjene">
      <div className="ocjene-data">
        <p>
          ID ocjene: <span>{id}</span>{' '}
        </p>
        <p>
          Datum ocjene: <span>{datum}</span>{' '}
        </p>
        <p>
          Nastavnik: <span>{nastavnik}</span>{' '}
        </p>
        <p>
          Ocjena: <span>{ocjena}</span>{' '}
        </p>
        <p>
          Opis: <span>{opis}</span>{' '}
        </p>
      </div>

      {indexOfFirstElement < 1 && (
        <div className={styles['buttons-container']}>
          <button
            className="btn btn-secondary m-2"
            onClick={() => onDeleteOcjenaHandler(id)}
          >
            Delete
          </button>
          <button
            className="btn"
            onClick={() => navigate('ocjene/' + id + '/edit')}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default OcjenaRow;
