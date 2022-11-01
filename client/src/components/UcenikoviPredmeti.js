import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useParams,
  useNavigate,
  Link,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { Tab, Tabs as TabsComponent, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ucitajUcenikovePredmete } from '../redux/predmeti/actions';

const Razred = (props) => {
  const { idRazred } = useParams();
  const { idUcenik } = useParams();
  const { idPredmet } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.predmeti);
  const ucenikoviPredmeti = useSelector((state) => state.predmeti.items);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (idRazred) {
      dispatch(ucitajUcenikovePredmete(+idUcenik, +idRazred));
    }
  }, [idUcenik, idRazred]);

  useEffect(() => {
    if (idPredmet === undefined && ucenikoviPredmeti.length > 0) {
      navigate(pathname + '/' + ucenikoviPredmeti[0].idPredmet);
    }
    if (idPredmet && ucenikoviPredmeti.length > 0) {
      const selectedIndex = ucenikoviPredmeti.findIndex((p) => {
        return p.idPredmet === +idPredmet;
      });
      setTabIndex(selectedIndex);
    }
  }, [idRazred, idPredmet, ucenikoviPredmeti.length]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (ucenikoviPredmeti.length < 1) {
    return <h1>Nisu izabrani predmeti</h1>;
  }

  return (
    <>
      <TabsComponent
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList>
          {ucenikoviPredmeti.map((predmet, i) => (
            <Tab key={predmet.idPredmet}>
              <Link
                to={
                  '/ucenici/' +
                  idUcenik +
                  '/' +
                  idRazred +
                  '/' +
                  predmet.idPredmet
                }
              >
                {predmet.predmet}
              </Link>
            </Tab>
          ))}
        </TabList>
        {ucenikoviPredmeti.map((predmet, i) => (
          <TabPanel key={predmet.idPredmet}>{/* <h2>Ocjene:</h2> */}</TabPanel>
        ))}
      </TabsComponent>
      <Outlet />
    </>
  );
};

export default Razred;
