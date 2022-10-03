import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSvePredmete } from '../redux/predmeti/actions';
import { Link } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import PredmetRow from './PredmetRow';

const Predmeti = () => {
  const predmeti = useSelector((state) => state.predmeti);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ucitajSvePredmete());
  }, []);

  return (
    <div>
      {predmeti &&
        predmeti.items.map((pred) => {
          return (
            <div key={pred.idPredmet} className={styles.nastavnici}>
              <PredmetRow id={pred.idPredmet} naziv={pred.naziv} />
              <Link to={'/predmeti/' + pred.idPredmet}>Details</Link>
            </div>
          );
        })}
    </div>
  );
};

export default Predmeti;
