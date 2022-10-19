import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import UcenikRow from './UcenikRow';
import { ucitajUcenika, obrisiUcenika } from '../redux/ucenici/actions';

const UcenikTest = (props) => {
  const { idUcenik } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.ucenici);
  const [ucenik] = useSelector((state) =>
    state.ucenici.items.filter((ucenik) => ucenik.idUcenik === +idUcenik)
  );
  useEffect(() => {
    if (!ucenik) {
      dispatch(ucitajUcenika(+idUcenik));
    }
  }, [dispatch, idUcenik, ucenik]);

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
          birthday={String(ucenik.birthday).split('T')[0]}
          image={ucenik.image}
          imeOca={ucenik.imeOca}
          imeMajke={ucenik.imeMajke}
          maticniBroj={ucenik.maticniBroj}
          adresa={ucenik.adresa}
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
      <Outlet />
    </>
  );
};

export default UcenikTest;
