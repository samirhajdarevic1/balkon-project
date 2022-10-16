import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Tab, Tabs as TabsComponent, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Tabs = ({ razredi, predmeti }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idUcenik } = useParams();
  const { idPredmet } = useParams();
  console.log(idPredmet);

  /*  const { idRazred } = useParams();

   const [ucenik] = useSelector((state) =>
    state.ucenici.items.filter((ucenik) => ucenik.idUcenik === +idUcenik)
  ); */

  /*   useEffect(() => {
    if (razredi) {
      navigate('/ucenici/' + idUcenik + '/' + razredi[0].idRazred);
    }
  }, []); 

  /*Hi. Unfortunately there is no way to declare your 
  TabPanels in a separate component; the Tabs component 
  can't detect them through the component boundary.*/
  return (
    <>
      {razredi && (
        <TabsComponent>
          <TabList>
            {razredi.map((razred, i) => (
              <Tab key={razred.idRazred} active={'true'}>
                <Link
                  to={
                    '/ucenici/' +
                    idUcenik +
                    '/' +
                    razred.idRazred +
                    '/' +
                    idPredmet
                  }
                >
                  {razred.razred}
                </Link>
              </Tab>
            ))}
          </TabList>
          {razredi.map((razred, i) => (
            <TabPanel key={razred.idRazred}>
              Selektovani razrednik je: {razred.razrednik}
            </TabPanel>
          ))}
        </TabsComponent>
      )}
      <TabsComponent>
        <TabList>
          {predmeti.map((predmet, i) => (
            <Tab key={predmet.idPredmet} active={'true'}>
              <Link
                to={
                  '/ucenici/' +
                  idUcenik +
                  '/' +
                  predmet.idRazred +
                  '/' +
                  predmet.idPredmet
                }
              >
                {predmet.predmet}
              </Link>
            </Tab>
          ))}
        </TabList>
        {predmeti.map((predmet, i) => (
          <TabPanel key={predmet.idPredmet}>
            Selektovani predmet je: {predmet.predmet}
          </TabPanel>
        ))}
      </TabsComponent>
    </>
  );
};

export default Tabs;
