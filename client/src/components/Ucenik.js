import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ucitajUcenika } from '../redux/ucenici/actions';
import Tabs from './Tabs';
import UcenikRow from './UcenikRow';

import {
  /*  BrowserRouter as Router,
  Routes,
  Switch,
  Route, */
  //useLocation,
  Outlet,
} from 'react-router-dom';
import { ucitajUcenikoveRazrede } from '../redux/odjeljenjaRazredi/actions';
import { ucitajUcenikovePredmete } from '../redux/predmeti/actions';

const Ucenik = (props) => {
  const { idUcenik } = useParams();
  const { idRazred } = useParams();
  //const { idOdjeljenja } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ucenik] = useSelector((state) =>
    state.ucenici.items.filter((ucenik) => ucenik.idUcenik === +idUcenik)
  );
  /*  useEffect(() => {
    dispatch(ucitajUcenikoveRazrede(+idUcenik))
      .then(() => {
        dispatch(ucitajUcenika(+idUcenik));
      })
      .then(() => dispatch(ucitajUcenikovePredmete(+idUcenik, +idRazred)));
  }, [idUcenik, idRazred]); */

  const ucenikoviRazredi = useSelector((state) => state.razredi);
  const ucenikoviPredmeti = useSelector((state) => state.predmeti);

  /*  useEffect(() => {
    dispatch(ucitajUcenika(+idUcenik)).then((ucenik) => {
      dispatch(ucitajUcenikoveRazrede(+ucenik.idUcenik))
        .then((razredi) => {
          navigate('/ucenici/' + idUcenik + '/' + razredi[0].idRazred);
        })
        .then((predmeti) => {
          if (ucenikoviRazredi) {
            console.log(55, ucenikoviRazredi);
            dispatch(
              ucitajUcenikovePredmete(+idUcenik, predmeti[0].idRazred)
            ).then(() =>
              navigate(
                '/ucenici/' +
                  idUcenik +
                  '/' +
                  ucenikoviRazredi[0].idRazred +
                  '/' +
                  predmeti[0].idPredmet
              )
            );
          }
        });
    });
  }, [idRazred]); */

  useEffect(() => {
    const fetchData = async () => {
      const ucenik = await dispatch(ucitajUcenika(+idUcenik));
      const razredi = await dispatch(ucitajUcenikoveRazrede(+ucenik.idUcenik));
      await navigate('/ucenici/' + idUcenik + '/' + razredi[0].idRazred);
      const predmeti = await dispatch(
        ucitajUcenikovePredmete(+idUcenik, razredi[0].idRazred)
      );
      await navigate(
        '/ucenici/' +
          idUcenik +
          '/' +
          razredi[0].idRazred +
          '/' +
          predmeti[0].idPredmet
      );
    };

    fetchData();
  }, [idUcenik, idRazred]);

  if (!ucenik) {
    return <h1>Ucenik doesn't exist</h1>;
  }
  return (
    <>
      <UcenikRow
        id={ucenik.idUcenik}
        ime={ucenik.ime}
        prezime={ucenik.prezime}
        birthday={ucenik.birthday}
      />
      <Tabs
        razredi={ucenikoviRazredi.items}
        predmeti={ucenikoviPredmeti.items}
      />
      <Outlet />
    </>
  );
};

export default Ucenik;
