import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';


Vue.use(Vuex);

const store =  () => new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});

// console.dir(store);

export default store;