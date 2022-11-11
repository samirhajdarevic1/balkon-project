import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSvePredmete } from '../redux/predmeti/actions';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Predmeti.module.css';
import PredmetRow from './PredmetRow';
import AddPredmetForm from './AddPredmetForm';

const Predmeti = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const predmeti = useSelector((state) => state.predmeti);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    dispatch(ucitajSvePredmete());
  }, []);

  return posting ? (
    <AddPredmetForm />
  ) : (
    <div>
      <button
        onClick={() => {
          setPosting(true);
          navigate('/predmeti/add-predmet');
        }}
      >
        Add predmet
      </button>
      <div className={styles['predmeti-container']} data="predmeti-container">
        {predmeti &&
          predmeti.items.map((pred) => {
            return (
              <div
                key={pred.idPredmet}
                className={styles.predmeti}
                data="predmeti"
              >
                <PredmetRow id={pred.idPredmet} naziv={pred.naziv} />
                <Link
                  to={'/predmeti/' + pred.idPredmet}
                  className={styles.button}
                >
                  Details
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Predmeti;
