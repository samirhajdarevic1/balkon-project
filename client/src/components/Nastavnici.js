import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSveNastavnike } from '../redux/nastavnici/actions';
import styles from './Nastavnici.module.css';
import { Link } from 'react-router-dom';
import Nastavnik from './Nastavnik';

function Nastavnici() {
  const nastavnici = useSelector((state) => state.nastavnici);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ucitajSveNastavnike());
  }, []);

  return (
    <div>
      {nastavnici.items.map((nast) => {
        return (
          <div key={nast.idNastavnik} className={styles.nastavnici}>
            <Nastavnik
              id={nast.idNastavnik}
              ime={nast.ime}
              prezime={nast.prezime}
            />
            <Link to={'/nastavnici/' + nast.idNastavnik}>Details</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Nastavnici;
