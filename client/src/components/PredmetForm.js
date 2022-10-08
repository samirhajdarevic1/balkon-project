import React, { useEffect, useState } from 'react';
import formStyles from './Form.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { dodajPredmet } from '../redux/predmeti/actions';
import PredmetRow from './PredmetRow';

const PredmetForm = (props) => {
  console.log(props);
  const [posting, setPosting] = useState(props.posting);
  const [editing, setEditing] = useState(props.editing);
  console.log(editing);
  console.log(posting);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [naziv, setNaziv] = useState(props.naziv);
  const [predmet, setPredmet] = useState('');
  console.log(naziv);

  const submitHandler = (e) => {
    //e.preventDefault();
    dispatch(dodajPredmet({ naziv: predmet })).then(() =>
      navigate('/predmeti')
    );
  };

  return (
    <div>
      {editing && (
        <form>
          <input
            value={naziv}
            onChange={(e) => {
              setNaziv(e.target.value);
              console.log();
            }}
          />
          <button>Done editing</button>
        </form>
      )}
      {posting ? (
        <form onSubmit={submitHandler} className={formStyles['form-control']}>
          <div>
            <ul>
              <li>
                <input
                  value={predmet}
                  onChange={(e) => setPredmet(e.target.value)}
                  type="text"
                  placeholder="naziv predmeta"
                  name="predmet"
                />
              </li>
            </ul>
          </div>
          <button>Add predmet</button>
        </form>
      ) : (
        <p>Nothing here</p>
      )}
    </div>
  );
  /*  props.editing ? (
    <form>
      <input
        value={naziv}
        onChange={(e) => {
          setNaziv(e.target.value);
          console.log();
        }}
      />
      <button>Done editing</button>
    </form>
  ) : (
    <form onSubmit={submitHandler} className={formStyles['form-control']}>
      <div>
        <ul>
          <li>
            <input
              value={predmet}
              onChange={(e) => setPredmet(e.target.value)}
              type="text"
              placeholder="naziv predmeta"
              name="predmet"
            />
          </li>
        </ul>
      </div>
      <button>Add predmet</button>
    </form>
  ); */
};

export default PredmetForm;
