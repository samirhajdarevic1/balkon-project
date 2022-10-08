import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ucitajSveNastavnike,
  dodajNastavnika,
} from '../redux/nastavnici/actions';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import formStyles from './Form.module.css';
import NastavnikRow from './NastavnikRow';

const Nastavnici = () => {
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nastavnici = useSelector((state) => state.nastavnici);

  useEffect(() => {
    dispatch(ucitajSveNastavnike());
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(dodajNastavnika({ ime, prezime })).then(() => {
      navigate('/nastavnici');
    });
  };
  return (
    <>
      <form onSubmit={submitHandler} className={formStyles['form-control']}>
        <div>
          <ul>
            <li>
              <input
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                type="text"
                placeholder="ime"
                name="ime"
              />
            </li>
            <li>
              <input
                value={prezime}
                onChange={(e) => setPrezime(e.target.value)}
                type="text"
                placeholder="prezime"
                name="prezime"
              />
            </li>
          </ul>
        </div>
        <button>Add nastavnik</button>
      </form>
      <div>
        {nastavnici &&
          nastavnici.items.map((nast) => {
            return (
              <div key={nast.idNastavnik} className={styles.nastavnici}>
                <NastavnikRow
                  id={nast.idNastavnik}
                  ime={nast.ime}
                  prezime={nast.prezime}
                />
                <Link to={'/nastavnici/' + nast.idNastavnik}>Details</Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Nastavnici;
