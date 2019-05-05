import Vue from 'vue'
import Vuex from 'vuex'
import session from './session'

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        session
    },
    strict: process.env.NODE_ENV !== 'production',
});

export default store