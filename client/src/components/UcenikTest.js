import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useParams,
  useNavigate,
  useSearchParams,
  Outlet,
} from 'react-router-dom';
import styles from './Nastavnici.module.css';
import UcenikRow from './UcenikRow';
import { ucitajUcenika, obrisiUcenika } from '../redux/ucenici/actions';
import Razred from './Razred';

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
      <Outlet />
    </>
  );
};

export default UcenikTest;
