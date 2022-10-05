import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSveOcjene } from '../redux/ocjene/actions';
import { Link } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import OcjenaRow from './OcjenaRow';

const Ocjene = () => {
  const ocjene = useSelector((state) => state.ocjene);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ucitajSveOcjene());
  }, []);

  return (
    <div>
      {ocjene.items.map((ocjena) => {
        return (
          <div key={ocjena.idOcjena} className={styles.nastavnici}>
            <OcjenaRow
              id={ocjena.idOcjena}
              ucenik={ocjena.ucenik}
              nastavnik={ocjena.nastavnik}
              datum={ocjena.datum}
              ocjena={ocjena.ocjena}
              opis={ocjena.opis}
            />
            <Link to={'/ocjene/' + ocjena.idOcjena}>Details</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Ocjene;
