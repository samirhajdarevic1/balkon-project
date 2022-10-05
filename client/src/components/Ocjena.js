import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import { ucitajOcjenu } from '../redux/ocjene/actions';
import OcjenaRow from './OcjenaRow';

const Ocjena = (props) => {
  const { idOcjena } = useParams();
  const [ocjena] = useSelector((state) =>
    state.ocjene.items.filter((ocj) => ocj.idOcjena === +idOcjena)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ucitajOcjenu(+idOcjena));
  }, []);

  if (!ocjena) {
    return <h1>Loading...</h1>;
  }

  return (
    <div key={ocjena.idOcjena} className={styles.nastavnici}>
      <OcjenaRow
        id={ocjena.idOcjena}
        ucenik={ocjena.ucenik}
        opis={ocjena.opis}
        datum={ocjena.datum}
        predmet={ocjena.predmet}
        nastavnik={ocjena.nastavnik}
        ocjena={ocjena.ocjena}
        razred={ocjena.razred}
      />
    </div>
  );
};

export default Ocjena;
