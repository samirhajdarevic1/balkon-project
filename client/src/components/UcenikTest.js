import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import styles from './Ucenik.module.css';
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
  const ucenikEditHandler = () => {
    navigate(`/ucenici/${idUcenik}/edit`);
  };
  const deleteUcenikHandler = () => {
    dispatch(obrisiUcenika(+idUcenik)).then(navigate('/ucenici'));
  };
  return (
    <>
      <div
        key={ucenik.idUcenik}
        className="ucenik-container"
        data="ucenik-container"
      >
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
          onEditUcenikHandler={ucenikEditHandler}
          onDeleteUcenikHandler={deleteUcenikHandler}
        />
      </div>
      <Outlet />
    </>
  );
};

export default UcenikTest;
