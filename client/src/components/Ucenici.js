import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSveUcenike } from '../redux/ucenici/actions';
import { Link } from 'react-router-dom';
import Ucenik from './Ucenik';
import styles from './Nastavnici.module.css';

const Ucenici = () => {
  const ucenici = useSelector((state) => state.ucenici);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ucitajSveUcenike());
  }, []);

  return (
    <div>
      {ucenici.items.map((ucenik) => {
        return (
          <div key={ucenik.idUcenik} className={styles.nastavnici}>
            <Ucenik
              id={ucenik.idUcenik}
              ime={ucenik.ime}
              prezime={ucenik.prezime}
              birthday={ucenik.birthday}
            />
            <Link to={'/ucenici/' + ucenik.idUcenik}>Details</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Ucenici;
