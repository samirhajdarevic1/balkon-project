import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajPredmet, obrisiPredmet } from '../redux/predmeti/actions';
import { useParams, useNavigate } from 'react-router-dom';
import PredmetRow from './PredmetRow';
import styles from './Nastavnici.module.css';

const Predmet = (props) => {
  const { idPredmet } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [predmet] = useSelector((state) =>
    state.predmeti.items.filter((pred) => pred.idPredmet === +idPredmet)
  );

  const { loading } = useSelector((state) => state.predmeti);
  useEffect(() => {
    if (!predmet) {
      dispatch(ucitajPredmet(+idPredmet));
    }
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!predmet) {
    return <h1>Predmet doesn't exist</h1>;
  }

  return (
    <div key={predmet.idPredmet} className={styles.nastavnici}>
      <PredmetRow id={predmet.idPredmet} naziv={predmet.naziv} />
      {idPredmet && (
        <button
          onClick={() => {
            dispatch(obrisiPredmet(+idPredmet)).then(() =>
              navigate('/predmeti')
            );
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Predmet;
