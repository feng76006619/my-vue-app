import * as types from './mutation-types';

const mutations = {
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user;
    } else {
      state.user = {};
    }
  },
  [types.DEL_CACHED_VIEW](state, name) {
    const index = state.cachedViews.indexOf(name);
    if (index > -1) {
      state.cachedViews.splice(index, 1);
    }
  },
  [types.SHOW_TAB](state, flag) {
    state.showTab = flag;
  },
  [types.SET_LIKE_STATUS](state, data) {
    state.likeStatus = data;
  },
  [types.SET_FOLLOW_STATUS](state, data) {
    state.followStatus = data;
  },
  [types.SET_DETAIL](state, data) {
    state.detail = data;
  },
  [types.SHOW_SEARCH_BOX](state, flag) {
    state.showSearchBox = flag;
  },
  [types.SET_OPTION](state, option) {
    state.option = option;
  },
  [types.SET_COLLECT_STATUS](state, data) {
    state.collectStatus = data;
  },
  [types.SET_COLLECT_DIGEST](state, data) {
    state.collectDigest = data;
  },
  [types.SET_SERVER_ADDRESS](state, data) {
    state.serverAddress = data;
  },
  [types.SET_UNREAD_COUNT](state, data) {
    state.unreadcount = data;
  }
};

export default mutations;
