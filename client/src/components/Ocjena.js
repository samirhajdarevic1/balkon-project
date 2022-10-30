import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Ocjene.module.css';
import { ucitajOcjenu, obrisiOcjenu } from '../redux/ocjene/actions';
import OcjenaRow from './OcjenaRow';

const Ocjena = (props) => {
  const { idOcjena } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ocjena] = useSelector((state) =>
    state.ocjene.items.filter((ocj) => ocj.idOcjena === +idOcjena)
  );
  const { loading } = useSelector((state) => state.ocjene);

  useEffect(() => {
    if (!ocjena) {
      dispatch(ucitajOcjenu(+idOcjena));
    }
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!ocjena) {
    return <h1>Ocjena doesn't exist</h1>;
  }

  return (
    <div key={ocjena.idOcjena} className={styles.ocjene}>
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
      {idOcjena && (
        <>
          <button
            onClick={() => {
              dispatch(obrisiOcjenu(+idOcjena)).then(navigate('/ocjene'));
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              navigate(`/ocjene/${idOcjena}/edit`);
            }}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Ocjena;
