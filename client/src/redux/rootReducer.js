import { combineReducers } from 'redux';
import authUserReducer from './authUser/reducers';
import nastavniciReducer from './nastavnici/reducers';
import ocjeneReducer from './ocjene/reducers';
import razrediReducer from './odjeljenjaRazredi/reducers';
import predmetiReducer from './predmeti/reducers';
import razrediUSkolskojGodiniReducer from './razrediSkolskaGodina/reducers';
import skolskeGodineReducer from './skolskeGodine/reducers';
import uceniciReducer from './ucenici/reducers';
import ucenikRazredReducer from './ucenikRazred/reducers';
import usersReducer from './users/reducers';
import zakljucneOcjeneReducer from './zakljucnaOcjena/reducers';

const rootReducer = combineReducers({
  nastavnici: nastavniciReducer,
  predmeti: predmetiReducer,
  ucenici: uceniciReducer,
  ocjene: ocjeneReducer,
  razredi: razrediReducer,
  zakljucneOcjene: zakljucneOcjeneReducer,
  skolskeGodine: skolskeGodineReducer,
  ucenikRazred: ucenikRazredReducer,
  razrediUSkolskojGodini: razrediUSkolskojGodiniReducer,
  user: usersReducer,
  authUser: authUserReducer,
});

export default rootReducer;
