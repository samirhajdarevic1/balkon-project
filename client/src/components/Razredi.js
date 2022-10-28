import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import styles from './Razredi.module.css';
import { ucitajRazredeIzSkolskeGodine } from '../redux/odjeljenjaRazredi/actions';
import RazredRow from './RazredRow';

const Razredi = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { idSkolskaGodina, idRazred } = useParams();
  const razredi = useSelector((state) => state.razredi.items);

  useEffect(() => {
    if (idSkolskaGodina) {
      dispatch(ucitajRazredeIzSkolskeGodine(+idSkolskaGodina));
    }
  }, [idSkolskaGodina, razredi.length]);

  return (
    <div>
      <Outlet />
      {!idRazred && (
        <div className={styles['razredi-container']}>
          {razredi &&
            razredi.map((razredi) => {
              return (
                <div key={razredi.idOdjeljenja} className={styles.razredi}>
                  <RazredRow
                    id={razredi.idOdjeljenja}
                    idNastavnikRazrednik={razredi.idNastavnikRazrednik}
                    razred={razredi.razred}
                    oznakaOdjeljenja={razredi.oznakaOdjeljenja}
                    razrednik={razredi.razrednik}
                  />
                  <Link to={pathname + '/' + razredi.idOdjeljenja + '/ucenici'}>
                    Details
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Razredi;
