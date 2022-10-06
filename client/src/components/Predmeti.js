import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSvePredmete, dodajPredmet } from '../redux/predmeti/actions';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import formStyles from './Form.module.css';
import PredmetRow from './PredmetRow';

const Predmeti = () => {
  const [predmet, setPredmet] = useState('');
  const predmeti = useSelector((state) => state.predmeti);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ucitajSvePredmete());
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(dodajPredmet({ naziv: predmet })).then(() => {
      navigate('/predmeti');
    });
  };
  return (
    <>
      <form onSubmit={submitHandler} className={formStyles['form-control']}>
        <div>
          <ul>
            <li>
              <input
                value={predmet.naziv}
                onChange={(e) => setPredmet(e.target.value)}
                type="text"
                placeholder="naziv predmeta"
                name="predmet"
              />
            </li>
          </ul>
        </div>
        <button>Add predmet</button>
      </form>
      <div>
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
    </>
  );
};

export default Predmeti;
