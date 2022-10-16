import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import { ucitajSveRazrede } from '../redux/odjeljenjaRazredi/actions';
import RazredRow from './RazredRow';

const Razredi = () => {
  const razredi = useSelector((state) => state.razredi);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ucitajSveRazrede());
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          navigate('/razredi/add-razred');
        }}
      >
        Add razred
      </button>
      {razredi &&
        razredi.items.map((ucenikoviRazredi) => {
          console.log(ucenikoviRazredi);
          return (
            <div
              key={ucenikoviRazredi.idOdjeljenja}
              className={styles.nastavnici}
            >
              <RazredRow
                id={ucenikoviRazredi.idOdjeljenja}
                idNastavnikRazrednik={ucenikoviRazredi.idNastavnikRazrednik}
                idSkolskaGodina={ucenikoviRazredi.idSkolskaGodina}
                razred={ucenikoviRazredi.razred}
                oznakaOdjeljenja={ucenikoviRazredi.oznakaOdjeljenja}
              />
              <Link to={'/razredi/' + ucenikoviRazredi.idOdjeljenja}>
                Details
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Razredi;
