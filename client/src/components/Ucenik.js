import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import UcenikRow from './UcenikRow';
import { ucitajUcenika, obrisiUcenika } from '../redux/ucenici/actions';

const Ucenik = (props) => {
  const { idUcenik } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ucenik] = useSelector((state) =>
    state.ucenici.items.filter((ucenik) => ucenik.idUcenik === +idUcenik)
  );
  const { loading } = useSelector((state) => state.ucenici);

  useEffect(() => {
    if (!ucenik) {
      dispatch(ucitajUcenika(+idUcenik));
    }
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!ucenik) {
    return <h1>Ucenik doesn't exist</h1>;
  }

  return (
    <div key={ucenik.idUcenik} className={styles.nastavnici}>
      <UcenikRow
        id={ucenik.idUcenik}
        ime={ucenik.ime}
        prezime={ucenik.prezime}
        birthday={ucenik.birthday}
      />
      {idUcenik && (
        <button
          onClick={() => {
            dispatch(obrisiUcenika(+idUcenik)).then(navigate('/ucenici'));
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Ucenik;
