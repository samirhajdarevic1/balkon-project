/* import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ucitajUcenika } from '../redux/ucenici/actions';
import Tabs from './Tabs';
import UcenikRow from './UcenikRow';

import { Outlet } from 'react-router-dom';
import { ucitajUcenikoveRazrede } from '../redux/odjeljenjaRazredi/actions';
import { ucitajUcenikovePredmete } from '../redux/predmeti/actions';
import { ucitajOcjeneIzPredmeta } from '../redux/ocjene/actions';

const Ucenik = (props) => {
  const { idUcenik } = useParams();
  const { idRazred } = useParams();
  const { idPredmet } = useParams();
  console.log(33, idUcenik, idRazred, idPredmet);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [idRaz, setIdRaz] = useState('');
  const [idPred, setIdPred] = useState('');
  const [idUcen, setIdUcen] = useState(false);
  console.log(32, idUcen);

  const [ucenik] = useSelector((state) =>
    state.ucenici.items.filter((ucenik) => ucenik.idUcenik === +idUcenik)
  );

  const ucenikoviRazredi = useSelector((state) => state.razredi);
  const ucenikoviPredmeti = useSelector((state) => state.predmeti);
  const ucenikoveOcjene = useSelector((state) => state.ocjene);

  useEffect(() => {
    const fetchUcenikData = async () => {
      console.log(1);
      const ucenik = await dispatch(ucitajUcenika(+idUcenik));
      const razredi = await dispatch(ucitajUcenikoveRazrede(+idUcenik));
      await navigate('/ucenici/' + idUcenik + '/' + razredi[0].idRazred);
    };
    fetchUcenikData();
  }, [idUcenik]);

  useEffect(() => {
    if (idRazred && idUcenik) {
      const fetchData = async () => {
        console.log(3);
        console.log(idUcenik, idRaz);
        const predmeti = await dispatch(
          ucitajUcenikovePredmete(+idUcenik, +idRazred)
        );
        setIdPred(predmeti[0].idPredmet);
        await navigate(
          '/ucenici/' +
            idUcenik +
            '/' +
            predmeti[0].idRazred +
            '/' +
            predmeti[0].idPredmet
        );
      };
      fetchData();
    }
  }, [idRazred]);

  useEffect(() => {
    if (idPred) {
      const fetchData = async () => {
        console.log(4);
        const ocjene = await dispatch(
          ucitajOcjeneIzPredmeta(+idUcenik, +idRazred, +idPredmet)
        );
      };
      fetchData();
    }
  }, [idRazred, idPredmet]);

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
        ocjene={ucenikoveOcjene.items}
      />
      <Outlet />
    </>
  );
};

export default Ucenik;
 */
