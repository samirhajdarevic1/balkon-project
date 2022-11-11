import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useParams,
  useNavigate,
  Link,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { ucitajUcenikoveRazrede } from '../redux/odjeljenjaRazredi/actions';
import { Tab, Tabs as TabsComponent, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const UcenikoviRazredi = (props) => {
  const { idRazred, idUcenik } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { loading } = useSelector((state) => state.razredi);
  const ucenikoviRazredi = useSelector((state) => state.razredi.items);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    dispatch(ucitajUcenikoveRazrede(+idUcenik));
  }, [idUcenik]);

  useEffect(() => {
    if (idRazred === undefined && ucenikoviRazredi.length > 0) {
      navigate(pathname + '/' + ucenikoviRazredi[0].idRazred);
    }
    if (idRazred && ucenikoviRazredi.length > 0) {
      const selectedIndex = ucenikoviRazredi.findIndex((r) => {
        return r.idRazred === +idRazred;
      });
      setTabIndex(selectedIndex);
    }
  }, [idRazred, ucenikoviRazredi.length]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {ucenikoviRazredi.length > 0 && (
        <TabsComponent
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabList>
            {ucenikoviRazredi.map((razred, i) => (
              <Tab key={razred.idRazred}>
                <Link to={'/ucenici/' + idUcenik + '/' + razred.idRazred}>
                  {razred.razred}
                </Link>
              </Tab>
            ))}
          </TabList>
          {ucenikoviRazredi.map((razred, i) => (
            <TabPanel key={razred.idRazred}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h2>Razrednik je: {razred.razrednik}</h2>
                <h3>Skolska godina: {razred.skolskaGodina}</h3>
              </div>
            </TabPanel>
          ))}
        </TabsComponent>
      )}
      {ucenikoviRazredi.length === 0 && (
        <>
          <hr></hr>
          <h1>Nisu definisani razredi</h1>
        </>
      )}
      <Outlet />
    </>
  );
};

export default UcenikoviRazredi;
