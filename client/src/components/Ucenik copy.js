import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import UcenikRow from './UcenikRow';
import { ucitajUcenika, obrisiUcenika } from '../redux/ucenici/actions';
import Tabs from './Tabs';

const Ucenik = (props) => {
  const { idUcenik } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ucenik] = useSelector((state) =>
    state.ucenici.items.filter((ucenik) => ucenik.idUcenik === +idUcenik)
  );
  /* const [razredID, setRazredID] = useState(ucenik.razredi[0].id_razred); */
  const { loading } = useSelector((state) => state.ucenici);
  const [searchParams] = useSearchParams();
  const razredId = searchParams.get('idOdjeljenja');

  useEffect(() => {
    if (!ucenik) {
      dispatch(ucitajUcenika(+idUcenik, razredId));
    }
  }, [dispatch, idUcenik, ucenik, razredId]);

  console.log('eee', razredId);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!ucenik) {
    return <h1>Ucenik doesn't exist</h1>;
  }

  return (
    <>
      <div key={ucenik.idUcenik} className={styles.nastavnici}>
        <UcenikRow
          id={ucenik.idUcenik}
          ime={ucenik.ime}
          prezime={ucenik.prezime}
          birthday={ucenik.birthday}
        />
        {idUcenik && (
          <>
            <button
              onClick={() => {
                dispatch(obrisiUcenika(+idUcenik)).then(navigate('/ucenici'));
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                navigate(`/ucenici/${idUcenik}/edit`);
              }}
            >
              Edit
            </button>
          </>
        )}
      </div>
      <Tabs razredi={ucenik.razredi} predmeti={ucenik.predmeti} />
    </>
  );
};

export default Ucenik;