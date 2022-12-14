import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { obrisiUcenika, ucitajSveUcenike } from '../redux/ucenici/actions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UcenikRow from './UcenikRow';
import styles from './Ucenik.module.css';

const Ucenici = () => {
  const ucenici = useSelector((state) => state.ucenici);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ucitajSveUcenike());
  }, []);
  const deleteUcenikHandler = (idUcenik) => {
    dispatch(obrisiUcenika(+idUcenik)).then(navigate('/ucenici'));
  };
  const ucenikEditHandler = (idUcenik) => {
    navigate(`/ucenici/${idUcenik}/edit`);
  };
  return (
    <>
      <button
        onClick={() => {
          navigate('/ucenici/add-ucenik');
        }}
        className="btn btn-primary mx-2"
      >
        Add ucenik
      </button>
      <div
        data="ucenici-container"
        id="ucenici-container"
        /* className={styles['ucenici-container']} */
        className="data-container"
      >
        {ucenici &&
          ucenici.items.map((ucenik) => {
            return (
              <div
                key={ucenik.idUcenik}
                className="card"
                data="ucenik-container"
              >
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
                  onDeleteUcenikHandler={deleteUcenikHandler}
                  onEditUcenikHandler={ucenikEditHandler}
                />
                <Link
                  className="btn btn-quarternary"
                  to={'/ucenici/' + ucenik.idUcenik}
                >
                  Details
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Ucenici;
