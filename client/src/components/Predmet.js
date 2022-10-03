import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajPredmet } from '../redux/predmeti/actions';
import { useParams } from 'react-router-dom';
import PredmetRow from './PredmetRow';

const Predmet = (props) => {
  const { idPredmet } = useParams();
  const [predmet] = useSelector((state) =>
    state.predmeti.items.filter((pred) => pred.idPredmet === +idPredmet)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ucitajPredmet(+idPredmet));
  }, []);

  console.log(predmet);
  console.log(idPredmet);
  if (!predmet) {
    return <h1>Loading...</h1>;
  }

  return <PredmetRow id={predmet.idPredmet} naziv={predmet.naziv} />;
};

export default Predmet;
