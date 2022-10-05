import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ucitajNastavnika,
  obrisiNastavnika,
} from '../redux/nastavnici/actions';
import { useParams, useNavigate } from 'react-router-dom';
import NastavnikRow from './NastavnikRow';
import styles from './Nastavnici.module.css';

const Nastavnik = (props) => {
  const { idNastavnik } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nastavnik] = useSelector((state) =>
    state.nastavnici.items.filter((nas) => nas.idNastavnik === +idNastavnik)
  );
  const { loading } = useSelector((state) => state.nastavnici);

  useEffect(() => {
    if (!nastavnik) {
      dispatch(ucitajNastavnika(+idNastavnik));
    }
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!nastavnik) {
    return <h1>Nastavnik doesn't exist</h1>;
  }
  return (
    <div key={nastavnik.idNastavnik} className={styles.nastavnici}>
      <NastavnikRow
        id={nastavnik.idNastavnik}
        ime={nastavnik.ime}
        prezime={nastavnik.prezime}
      />
      {idNastavnik && (
        <button
          onClick={() => {
            dispatch(obrisiNastavnika(+idNastavnik)).then(
              navigate('/nastavnici')
            );
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Nastavnik;
