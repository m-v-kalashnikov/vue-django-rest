import shops from '../api/shops';
import { LOADING_START, SET_DATA, LOADING_SUCCESS, LOADING_FAILURE } from './types';

const initialState = {
  loading: false,
  error: false,
  data: null,
  errorMsg: '',
};

const getters = {
  data: state => state.data,
};

const actions = {
  getAllShops({ commit }) {
    commit(LOADING_START);
    return shops.allShops()
      .then(({ data }) => commit(SET_DATA, data))
      .then(() => {
        commit(LOADING_SUCCESS);
      })
      .catch(() => {
        commit(LOADING_FAILURE);
      });
  },
  addNewShop({ commit }, data) {
    commit(LOADING_START);
    return new Promise((resolve) => {
      shops.addNewShop(data)
        .then(() => {
          commit(LOADING_SUCCESS);
          return resolve(true);
        })
        .catch((err) => {
          console.log(err.response.data.detail);
          commit(LOADING_FAILURE, err.response.data.detail);

          return resolve(false);
        });
    });
  },
  updateShop({ commit }, { id, data }) {
    commit(LOADING_START);
    return new Promise((resolve) => {
      shops.updateShop(id, data)
        .then(() => {
          commit(LOADING_SUCCESS);
          return resolve(true);
        })
        .catch((err) => {
          console.log(err.response.data.detail);
          commit(LOADING_FAILURE, err.response.data.detail);
          return resolve(false);
        });
    });
  },
  removeShop({ commit }, id) {
    commit(LOADING_START);
    return new Promise((resolve) => {
      shops.removeShop(id)
        .then(() => {
          commit(LOADING_SUCCESS);
          return resolve(true);
        })
        .catch((err) => {
          console.log(err.response.data.detail);
          commit(LOADING_FAILURE, err.response.data.detail);
          return resolve(false);
        });
    });
  },
};

const mutations = {
  [LOADING_START](state) {
    state.loading = true;
    state.error = false;
    state.errorMsg = '';
  },
  [LOADING_FAILURE](state, errorMsg = '') {
    state.loading = false;
    state.error = true;
    state.errorMsg = errorMsg;
  },
  [LOADING_SUCCESS](state) {
    state.loading = false;
    state.error = false;
  },
  [SET_DATA](state, data) {
    state.data = data;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
