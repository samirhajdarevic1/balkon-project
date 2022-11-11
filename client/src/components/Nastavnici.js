import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSveNastavnike } from '../redux/nastavnici/actions';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import NastavnikRow from './NastavnikRow';

const Nastavnici = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nastavnici = useSelector((state) => state.nastavnici);

  useEffect(() => {
    dispatch(ucitajSveNastavnike());
  }, []);

  return (
    <>
      <button
        onClick={() => {
          navigate('/nastavnici/add-nastavnik');
        }}
      >
        Add nastavnik
      </button>
      <div
        className={styles['nastavnici-container']}
        data="nastavnici-container"
      >
        {nastavnici &&
          nastavnici.items.map((nast) => {
            return (
              <div key={nast.idNastavnik} className={styles.nastavnici}>
                <NastavnikRow
                  id={nast.idNastavnik}
                  ime={nast.ime}
                  prezime={nast.prezime}
                />
                <Link
                  to={'/nastavnici/' + nast.idNastavnik}
                  className={styles.button}
                >
                  Details
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Nastavnici;
