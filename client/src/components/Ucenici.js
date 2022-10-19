import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSveUcenike } from '../redux/ucenici/actions';
import { Link, useNavigate } from 'react-router-dom';
import UcenikRow from './UcenikRow';

const Ucenici = () => {
  const ucenici = useSelector((state) => state.ucenici);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ucitajSveUcenike());
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          navigate('/ucenici/add-ucenik');
        }}
      >
        Add ucenik
      </button>
      {ucenici &&
        ucenici.items.map((ucenik) => {
          return (
            <div key={ucenik.idUcenik}>
              <UcenikRow
                id={ucenik.idUcenik}
                ime={ucenik.ime}
                prezime={ucenik.prezime}
                birthday={String(ucenik.birthday).split('T')[0]}
                image={ucenik.image}
                imeOca={ucenik.imeOca}
                imeMajke={ucenik.imeMajke}
                maticniBroj={ucenik.maticniBroj}
                adresa={ucenik.adresa}
              />
              <Link to={'/ucenici/' + ucenik.idUcenik}>Details</Link>
            </div>
          );
        })}
    </div>
  );
};

export default Ucenici;
