import { combineReducers } from 'redux';
import nastavniciReducer from './nastavnici/reducers';
import ocjeneReducer from './ocjene/reducers';
import predmetiReducer from './predmeti/reducers';
import uceniciReducer from './ucenici/reducers';

const rootReducer = combineReducers({
  nastavnici: nastavniciReducer,
  predmeti: predmetiReducer,
  ucenici: uceniciReducer,
  ocjene: ocjeneReducer,
});

export default rootReducer;
