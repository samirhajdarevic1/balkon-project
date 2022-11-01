import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ucitajPredmet, urediPredmet } from '../redux/predmeti/actions';
import formStyles from './Form.module.css';

const EditPredmetForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idPredmet } = useParams();
  const [predmet] = useSelector((state) =>
    state.predmeti.items.filter((pred) => pred.idPredmet === +idPredmet)
  );
  const tmpNaziv = (predmet && predmet.naziv) || '';
  const [naziv, setNaziv] = useState(tmpNaziv);
  const [backdrop, setBackdrop] = useState('');
  useEffect(() => {
    if (!predmet) {
      dispatch(ucitajPredmet(+idPredmet));
    }
  }, []);

  useEffect(() => {
    if (predmet) setNaziv(predmet.naziv);
  }, [predmet]);
  const editingHandler = (e) => {
    e.preventDefault();
    dispatch(urediPredmet({ idPredmet, naziv })).then(() =>
      navigate(`/predmeti/${idPredmet}`)
    );
  };
  const backdropHandler = () => {
    setBackdrop(true);
    navigate(-1);
  };

  return (
    <>
      {!backdrop && (
        <div
          className={formStyles.backdrop}
          onClick={() => {
            backdropHandler();
          }}
        ></div>
      )}
      <form onSubmit={editingHandler} className={formStyles['form-control']}>
        <div>
          <ul>
            <li>
              <label>Naziv predmeta</label>
              <input
                value={naziv}
                onChange={(e) => setNaziv(e.target.value)}
                type="text"
              />
            </li>
          </ul>
        </div>
        <button>Done editing</button>
      </form>
    </>
  );
};

export default EditPredmetForm;
