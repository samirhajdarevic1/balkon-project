import { combineReducers } from 'redux';
import nastavniciReducer from './nastavnici/reducers';
import ocjeneReducer from './ocjene/reducers';
import razrediReducer from './odjeljenjaRazredi/reducers';
import predmetiReducer from './predmeti/reducers';
import skolskeGodineReducer from './skolskeGodine/reducers';
import uceniciReducer from './ucenici/reducers';
import zakljucneOcjeneReducer from './zakljucnaOcjena/reducers';

const rootReducer = combineReducers({
  nastavnici: nastavniciReducer,
  predmeti: predmetiReducer,
  ucenici: uceniciReducer,
  ocjene: ocjeneReducer,
  razredi: razrediReducer,
  zakljucneOcjene: zakljucneOcjeneReducer,
  skolskeGodine: skolskeGodineReducer,
});

export default rootReducer;
