import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dodajNastavnika } from '../redux/nastavnici/actions';
import formStyles from './Form.module.css';

const AddNastavnikForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [photo, setPhoto] = useState('');
  const [backdrop, setBackdrop] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(dodajNastavnika({ ime, prezime, photo })).then(() =>
      navigate('/nastavnici')
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
      <form
        onSubmit={submitHandler}
        className="form-control"
        data="nastavnik-form"
      >
        <div>
          <ul>
            <li>
              <label>Ime</label>
              <input
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                type="text"
                placeholder="Ime nastavnika"
              />
            </li>
            <li>
              <label>Prezime</label>
              <input
                value={prezime}
                onChange={(e) => setPrezime(e.target.value)}
                type="text"
                placeholder="Prezime nastavnika"
              />
            </li>
            <li>
              <label>Foto</label>
              <input
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                type="text"
                placeholder="Foto nastavnika"
              />
            </li>
          </ul>
        </div>
        <button className="btn">Finnish adding</button>
      </form>
    </>
  );
};

export default AddNastavnikForm;
