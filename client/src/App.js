import Nastavnici from './components/Nastavnici';
import { Routes, Route, Outlet, Link, Navigate } from 'react-router-dom';

import Nastavnik from './components/Nastavnik';
import Predmeti from './components/Predmeti';
import Predmet from './components/Predmet';
import Ucenici from './components/Ucenici';
/* import Ocjene from './components/Ocjene'; */
import Ocjena from './components/Ocjena';
import AddPredmetForm from './components/AddPredmetForm';
import EditPredmetForm from './components/EditPredmetForm';
import AddNastavnikForm from './components/AddNastavnikForm';
import EditNastavnikForm from './components/EditNastavnikForm';
import AddUcenikForm from './components/AddUcenikForm';
import EditUcenikForm from './components/EditUcenikForm';
import EditOcjenuForm from './components/EditOcjenuForm';
import AddOcjenuForm from './components/AddOcjenuForm';
import UcenikoviRazredi from './components/UcenikoviRazredi';
import Razredi from './components/Razredi';
import AddRazredForm from './components/AddRazredForm';
import UcenikTest from './components/UcenikTest';
import UcenikoviPredmeti from './components/UcenikoviPredmeti';
import UcenikoveOcjene from './components/UcenikoveOcjene';
import UceniciIzRazreda from './components/UceniciIzRazreda';
import SkolskeGodine from './components/SkolskeGodine';
import AddUcenikURazredForm from './components/AddUcenikURazredForm';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterUser from './components/RegisterUser';
import { useState } from 'react';
import Layout from './components/Layout';

function App() {
  const userAccessToken = localStorage.getItem('token');
  const userRefreshToken = localStorage.getItem('refereshToken');

  const [usrAccessToken, setUserAccesToken] = useState(userAccessToken);

  return (
    <div className="wraper">
      {usrAccessToken ? (
        <Routes>
          <Route path="/" element={<Layout />}>
            {/*   <Route path="login" element={<LoginForm />} />
            <Route path="createUser" element={<RegisterUser />} /> */}
            <Route index path="home" element={<Home />} />
            <Route path="nastavnici" element={<Nastavnici />} />
            <Route
              path="nastavnici/add-nastavnik"
              element={<AddNastavnikForm />}
            />
            <Route
              path="/nastavnici/:idNastavnik/edit"
              element={<EditNastavnikForm />}
            />
            <Route path="ucenici" element={<Ucenici />} />

            <Route path="ucenici/:idUcenik" element={<UcenikTest />}>
              <Route index element={<UcenikoviRazredi />} />
              <Route path=":idRazred" element={<UcenikoviRazredi />}>
                <Route index element={<UcenikoviPredmeti />} />
                <Route path=":idPredmet" element={<UcenikoviPredmeti />}>
                  <Route index element={<UcenikoveOcjene />} />
                  <Route path="add-ocjenu" element={<AddOcjenuForm />} />
                  <Route
                    path="ocjene/:idOcjena/edit"
                    element={<EditOcjenuForm />}
                  />
                </Route>
              </Route>
            </Route>
            <Route path="ucenici/:idUcenik/edit" element={<EditUcenikForm />} />
            <Route path="ucenici/add-ucenik" element={<AddUcenikForm />} />
            <Route path="nastavnici/:idNastavnik" element={<Nastavnik />} />
            <Route path="predmeti/:idPredmet" element={<Predmet />} />
            <Route path="predmeti/add-predmet" element={<AddPredmetForm />} />
            <Route
              path="predmeti/:idPredmet/edit"
              element={<EditPredmetForm />}
            ></Route>
            <Route path="predmeti" element={<Predmeti />} />
            {/* <Route path="ocjene" element={<Ocjene />} /> */}
            <Route path="ocjene/:idOcjena" element={<Ocjena />} />
            <Route path="ocjene/:idOcjena/edit" element={<EditOcjenuForm />} />
            <Route path="ocjene/add-ocjenu" element={<AddOcjenuForm />} />
            <Route path="razredi" element={<Razredi />}>
              <Route index element={<SkolskeGodine />} />
              <Route path=":idSkolskaGodina" element={<SkolskeGodine />} />
              <Route
                path=":idSkolskaGodina/:idRazred/ucenici"
                element={<UceniciIzRazreda />}
              />
              <Route
                path=":idSkolskaGodina/:idRazred/ucenici/add-ucenik"
                element={<AddUcenikURazredForm />}
              />
            </Route>
            <Route path="razredi/add-razred" element={<AddRazredForm />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route index path="login" element={<LoginForm />} />
          <Route path="createUser" element={<RegisterUser />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
