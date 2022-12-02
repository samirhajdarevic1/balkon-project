import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSveNastavnike } from '../redux/nastavnici/actions';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import NastavnikRow from './NastavnikRow';

const Nastavnici = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nastavnici = useSelector((state) => state.nastavnici);
  console.log(nastavnici);
  useEffect(() => {
    dispatch(ucitajSveNastavnike());
  }, []);

  return (
    <>
      <button
        onClick={() => {
          navigate('/nastavnici/add-nastavnik');
        }}
        className="btn"
      >
        Add nastavnik
      </button>
      <div className="data-container" data="nastavnici-container">
        {nastavnici &&
          nastavnici.items.map((nast) => {
            return (
              <div key={nast.idNastavnik} className="card h-fit">
                <NastavnikRow
                  id={nast.idNastavnik}
                  ime={nast.ime}
                  prezime={nast.prezime}
                  photo={nast.photo}
                />
                <Link to={'/nastavnici/' + nast.idNastavnik} className="btn">
                  Details
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Nastavnici;
