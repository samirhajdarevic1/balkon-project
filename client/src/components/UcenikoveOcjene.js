import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Tabs as TabsComponent } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {
  obrisiOcjenu,
  ucitajOcjeneIzPredmeta,
  urediOcjenu,
} from '../redux/ocjene/actions';
import OcjenaRow from './OcjenaRow';
import styles from './Nastavnici.module.css';

const UcenikoveOcjene = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idRazred } = useParams();
  const { idUcenik } = useParams();
  const { idPredmet } = useParams();
  const { pathname } = useLocation();
  const { loading } = useSelector((state) => state.ocjene);
  const [dodajOcjenu, setDodajOcjenu] = useState(false);
  const ucenikoveOcjene = useSelector((state) => state.ocjene.items);

  useEffect(() => {
    dispatch(ucitajOcjeneIzPredmeta(+idUcenik, +idRazred, +idPredmet));
  }, [idPredmet]);

  useEffect(() => {
    if (dodajOcjenu) {
      navigate(pathname + '/add-ocjenu');
    }
  }, [dodajOcjenu]);

  const editOcjenaHandler = (id, datum, nastavnik, predmet, ocjena, opis) => {
    const ocjenaForEdit = { id, datum, nastavnik, predmet, ocjena, opis };
    dispatch(urediOcjenu(ocjenaForEdit));
  };

  const deleteOcjenaHandler = (idOcjena) => {
    dispatch(obrisiOcjenu(idOcjena));
    navigate(-1);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (ucenikoveOcjene.length < 1) {
    return (
      <>
        <h1>Nema ocjena još</h1>
        <button
          onClick={() => {
            setDodajOcjenu(true);
          }}
        >
          Dodaj ocjenu
        </button>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setDodajOcjenu(true);
        }}
      >
        Dodaj ocjenu
      </button>
      <TabsComponent className={styles['ocjene-container']}>
        {ucenikoveOcjene.map((ocjena, i) => (
          <div key={ocjena.idOcjena}>
            <OcjenaRow
              id={ocjena.idOcjena}
              datum={String(ocjena.datum).split('T')[0]}
              predmet={ocjena.predmet}
              nastavnik={ocjena.nastavnik}
              ocjena={ocjena.ocjena}
              razred={ocjena.razred}
              opis={ocjena.opis}
              onEditOcjenaHandler={editOcjenaHandler}
              onDeleteOcjenaHandler={deleteOcjenaHandler}
            />
          </div>
        ))}
      </TabsComponent>
      <Outlet />
    </>
  );
};

export default UcenikoveOcjene;
