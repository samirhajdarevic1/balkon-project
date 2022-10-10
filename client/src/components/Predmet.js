import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajPredmet, obrisiPredmet } from '../redux/predmeti/actions';
import { useParams, useNavigate } from 'react-router-dom';
import PredmetRow from './PredmetRow';
import styles from './Nastavnici.module.css';
import EditPredmetForm from './EditPredmetForm';

const Predmet = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { idPredmet } = useParams();
  const [editing, setEditing] = useState(false);
  const [predmet] = useSelector((state) =>
    state.predmeti.items.filter((pred) => pred.idPredmet === +idPredmet)
  );
  const { loading } = useSelector((state) => state.predmeti);
  const tmpNaziv = (predmet && predmet.naziv) || '';
  const [naziv, setNaziv] = useState(tmpNaziv);

  useEffect(() => {
    if (!predmet) {
      dispatch(ucitajPredmet(+idPredmet));
    }
  }, []);

  useEffect(() => {
    if (predmet) setNaziv(predmet.naziv);
  }, [predmet]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!predmet) {
    return <h1>Predmet doesn't exist</h1>;
  }
  return !editing ? (
    <div key={predmet.idPredmet} className={styles.nastavnici}>
      <PredmetRow id={predmet.idPredmet} naziv={naziv} />
      {idPredmet && (
        <>
          <button
            onClick={() => {
              dispatch(obrisiPredmet(+idPredmet)).then(() =>
                navigate('/predmeti')
              );
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setEditing(true);
              navigate(`/predmeti/${idPredmet}/edit`);
            }}
          >
            Edittttt
          </button>
        </>
      )}
    </div>
  ) : (
    <EditPredmetForm />
  );
};

export default Predmet;
