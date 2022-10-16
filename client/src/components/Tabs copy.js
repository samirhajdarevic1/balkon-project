import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { Tab, Tabs as TabsComponent, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function getParamFromUrl(paramName) {
  let url = window.location.search;
  const params = new URLSearchParams(url);
  const paramValue = params.get(`${paramName}`);
  return paramValue ? paramValue : '';
}

const Tabs = ({ razredi = [], predmeti = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idUcenik } = useParams();

  const [ucenik] = useSelector((state) =>
    state.ucenici.items.filter((ucenik) => ucenik.idUcenik === +idUcenik)
  );

  const [defaultUrl, setDefaultUrl] = useState(
    getParamFromUrl('idOdjeljenja') || `${razredi[0].id_razred}`
  );

  useEffect(() => {
    navigate({
      search: `?${createSearchParams(`idOdjeljenja=${defaultUrl}`)}`,
    });
  }, []);

  const goToPosts = (params) =>
    navigate({
      search: `?${createSearchParams(params)}`,
    });

  return (
    <>
      <TabsComponent>
        <TabList>
          {razredi.map((razred, i) => (
            <Tab
              key={razred.id_razred}
              onClick={() => (
                goToPosts({ idOdjeljenja: razred.id_razred }),
                setDefaultUrl(razred.id_razred)
              )}
            >
              {razred.razred}
            </Tab>
          ))}
        </TabList>
        {razredi.map((razred, i) => (
          <TabPanel key={i}>
            <h2>Razrednik: {razred.razrednik}</h2>
            <TabsComponent>
              <TabList>
                {razredi[0].id_razred &&
                  predmeti.map((predmet, i) => {
                    return <Tab key={predmet.id_predmet}>{predmet.naziv}</Tab>;
                  })}
              </TabList>
              {predmeti.map((predmet, i) => {
                return (
                  <TabPanel key={i}>
                    <h2>Ocjena: {i}</h2>
                  </TabPanel>
                );
              })}
            </TabsComponent>
          </TabPanel>
        ))}
      </TabsComponent>
    </>
  );
};

export default Tabs;
