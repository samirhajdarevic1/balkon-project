import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSveNastavnike } from '../redux/nastavnici/actions';
import { Link } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import NastavnikRow from './NastavnikRow';

const Nastavnici = () => {
  const nastavnici = useSelector((state) => state.nastavnici);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ucitajSveNastavnike());
  }, []);

  return (
    <div>
      {nastavnici &&
        nastavnici.items.map((nast) => {
          return (
            <div key={nast.idNastavnik} className={styles.nastavnici}>
              <NastavnikRow
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
};

export default Nastavnici;
