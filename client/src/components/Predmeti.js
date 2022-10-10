import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSvePredmete } from '../redux/predmeti/actions';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Nastavnici.module.css';
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
      {predmeti &&
        predmeti.items.map((pred) => {
          return (
            <div key={pred.idPredmet} className={styles.nastavnici}>
              <PredmetRow id={pred.idPredmet} naziv={pred.naziv} />
              <Link to={'/predmeti/' + pred.idPredmet}>Details</Link>
            </div>
          );
        })}
    </div>
  );
};

export default Predmeti;
