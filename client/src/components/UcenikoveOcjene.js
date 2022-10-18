import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Tab, Tabs as TabsComponent, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ucitajOcjeneIzPredmeta } from '../redux/ocjene/actions';
import OcjenaRow from './OcjenaRow';

const UcenikoveOcjene = (props) => {
  const { idRazred } = useParams();
  const { idUcenik } = useParams();
  const { idPredmet } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ocjene);
  const ucenikoveOcjene = useSelector((state) => state.ocjene.items);

  useEffect(() => {
    dispatch(ucitajOcjeneIzPredmeta(+idUcenik, +idRazred, +idPredmet));
  }, [idPredmet]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (ucenikoveOcjene.length < 1) {
    return <h1>Nema ocjena još</h1>;
  }

  return (
    <>
      <TabsComponent>
        {ucenikoveOcjene.map((ocjena, i) => (
          <div key={ocjena.idOcjena}>
            <OcjenaRow
              id={ocjena.idOcjena}
              datum={ocjena.datum}
              predmet={ocjena.predmet}
              nastavnik={ocjena.nastavnik}
              ocjena={ocjena.ocjena}
              razred={ocjena.razred}
            />
          </div>
        ))}
      </TabsComponent>
    </>
  );
};

export default UcenikoveOcjene;
