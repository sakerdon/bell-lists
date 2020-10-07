import Vue from 'vue';
import Vuex from 'vuex';
import { LogStateInterface } from './modules/history';

Vue.use(Vuex);

export interface RootState {
  history: LogStateInterface;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({});
