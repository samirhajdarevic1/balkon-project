import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { ucitajRazredeIzSkolskeGodine } from '../redux/razrediSkolskaGodina/actions';
import styles from './Razredi.module.css';
import RazredRow from './RazredRow';

const Razredi = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { idSkolskaGodina, idRazred } = useParams();
  const razredi = useSelector((state) => state.razrediUSkolskojGodini.items);
  console.log(razredi);

  useEffect(() => {
    if (idSkolskaGodina && idRazred === undefined) {
      dispatch(ucitajRazredeIzSkolskeGodine(+idSkolskaGodina));
    }
  }, [idSkolskaGodina]);

  return (
    <>
      <Outlet />
      {!idRazred && (
        <div className={styles['razredi-container']}>
          {razredi &&
            razredi.map((razredi) => {
              console.log(razredi);
              return (
                <div key={razredi.idOdjeljenja} className={styles.razredi}>
                  <RazredRow
                    id={razredi.idOdjeljenja}
                    idNastavnikRazrednik={razredi.idNastavnikRazrednik}
                    razred={razredi.razred}
                    oznakaOdjeljenja={razredi.oznakaOdjeljenja}
                    razrednik={razredi.razrednik}
                    key={razredi.idOdjeljenja}
                  />
                  <Link
                    to={pathname + '/' + razredi.idOdjeljenja + '/ucenici'}
                    className={styles.button}
                  >
                    Details
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Razredi;
