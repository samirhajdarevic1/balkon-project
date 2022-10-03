import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSveOcjene } from '../redux/ocjene/actions';
import { Link } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import Ocjena from './Ocjena';

const Ocjene = () => {
  const ocjene = useSelector((state) => state.ocjene);
  const dispatch = useDispatch();

  return (
    <div>
      {ocjene && (
        <button
          onClick={() => {
            dispatch(ucitajSveOcjene());
          }}
        >
          Sve ocjene
        </button>
      )}

      {ocjene.items.map((ocjena) => {
        return (
          <div key={ocjena.idOcjena} className={styles.nastavnici}>
            <Ocjena
              id={ocjena.idOcjena}
              ucenik={ocjena.ucenik}
              nastavnik={ocjena.nastavnik}
              datum={ocjena.datum}
              ocjena={ocjena.ocjena}
              razred={ocjena.razred}
            />
            <Link to={'/ocjene/' + ocjena.idOcjena}>Details</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Ocjene;
