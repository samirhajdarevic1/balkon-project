import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ucitajRazredeIzSkolskeGodine } from '../redux/odjeljenjaRazredi/actions';
import { ucitajSveSkolskeGodine } from '../redux/skolskeGodine/actions';

const SkolskeGodine = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { idSkolskaGodina } = useParams();
  const skolskeGodine = useSelector((state) => state.skolskeGodine.items);

  useEffect(() => {
    if (skolskeGodine.length < 1) {
      dispatch(ucitajSveSkolskeGodine());
    }
  }, [skolskeGodine.length, idSkolskaGodina]);

  useEffect(() => {
    if (skolskeGodine.length > 0 && idSkolskaGodina === undefined) {
      navigate(pathname + '/' + skolskeGodine[0].idSkolskaGodina);
    }
  }, [skolskeGodine.length]);

  const submitHandler = (e) => {
    e.preventDefault();
    const idSkolskaGodina = e.target.idSkolskaGodina.value;
    navigate('/razredi/' + idSkolskaGodina);
  };

  return (
    <div className="text-center">
      <button
        className="btn btn-primary m-10 "
        onClick={() => {
          navigate('/razredi/add-razred');
        }}
      >
        Add razred
      </button>
      <form onSubmit={submitHandler}>
        <select name="idSkolskaGodina">
          {skolskeGodine.length > 0 &&
            skolskeGodine.map((sg) => {
              return (
                <option value={sg.idSkolskaGodina} key={sg.idSkolskaGodina}>
                  {sg.skolskaGodina}
                </option>
              );
            })}
        </select>
        <button className="btn btn-primary m-10">Pretraži</button>
      </form>
    </div>
  );
};

export default SkolskeGodine;
