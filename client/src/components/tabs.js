import React from 'react';
import { Tab, Tabs as TabsComponent, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Tabs = ({ razredi, predmeti }) => {
  console.log(razredi, predmeti);
  return (
    <>
      <TabsComponent>
        <TabList>
          {razredi.map((razred, i) => (
            <Tab key={i}>{razred.razred}</Tab>
          ))}
        </TabList>
        {razredi.map((razred, i) => (
          <TabPanel key={i}>
            <h2>Razrednik: {razred.razrednik}</h2>
            <TabsComponent>
              <TabList>
                {predmeti.map((predmet, i) => (
                  <Tab key={i}>{predmet.naziv}</Tab>
                ))}
              </TabList>
              {predmeti.map((predmet, i) => (
                <TabPanel key={i}>
                  <h2>Ocjena: {i}</h2>
                </TabPanel>
              ))}
            </TabsComponent>
          </TabPanel>
        ))}
      </TabsComponent>
      {/*  <TabsComponent>
        <TabList>
          {predmeti.map((predmet, i) => (
            <Tab key={i}>{predmet.naziv}</Tab>
          ))}
        </TabList>
        {razredi.map((razred, i) => (
          <TabPanel key={i}>
            <h2>Ocjena: {i}</h2>
          </TabPanel>
        ))}
      </TabsComponent> */}
    </>
  );
};

export default Tabs;
