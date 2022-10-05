import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import UcenikRow from './UcenikRow';
import { ucitajUcenika } from '../redux/ucenici/actions';

const Ucenik = (props) => {
  const { idUcenik } = useParams();
  const [ucenik] = useSelector((state) =>
    state.ucenici.items.filter((ucenik) => ucenik.idUcenik === +idUcenik)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ucitajUcenika(+idUcenik));
  }, []);

  if (!ucenik) {
    return <h1>Loading...</h1>;
  }

  return (
    <div key={ucenik.idUcenik} className={styles.nastavnici}>
      <UcenikRow
        id={ucenik.idUcenik}
        ime={ucenik.ime}
        prezime={ucenik.prezime}
        birthday={ucenik.birthday}
      />
    </div>
  );
};

export default Ucenik;
