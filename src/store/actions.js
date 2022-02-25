import * as types from './mutation-types';
import { collectIllust, deleteCollect, followArtist, getvipProxyServer, getUnreadRemindsCount } from '@/api/modules/user';
import { updateCollects, createCollects, collectionsDigest, deleteCollects } from '@/api/modules/collections';
import state from './state';
import Toast from '@/components/toast';

export const setUser = ({
  commit
}, user) => {
  user.avatar += `?t=${Date.now()}`;
  localStorage.setItem('user', JSON.stringify(user));
  commit(types.SET_USER, user);
};

export const clearCurrentState = ({
  commit
}) => {
  localStorage.removeItem('user');
  commit(types.SET_USER, null);
};

export const changeTab = ({
  commit
}, flag) => {
  commit(types.SHOW_TAB, flag);
};

// 收藏画作
export const handleCollectIllust = ({
  commit
}, data) => {
  return new Promise((resolve, reject) => {
    collectIllust(data)
      .then(res => {
        if (res.status === 200) {
          const status = {
            illustId: data.illustId,
            like: true
          };
          commit(types.SET_LIKE_STATUS, status);
          resolve();
        } else {
          reject();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

// 取消收藏
export const deleteCollectIllust = ({
  commit
}, data) => {
  return new Promise((resolve, reject) => {
    deleteCollect(data)
      .then(res => {
        if (res.status === 200) {
          const status = {
            illustId: data.illustId,
            like: false
          };
          commit(types.SET_LIKE_STATUS, status);
          resolve();
        } else {
          reject();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

// 关注画师
export const handleFollowArtist = ({
  commit
}, data) => {
  return new Promise((resolve, reject) => {
    followArtist(data)
      .then(res => {
        if (res.status === 200) {
          const status = {
            artistId: data.artistId,
            follow: data.follow
          };
          commit(types.SET_FOLLOW_STATUS, status);
          resolve();
        } else {
          reject();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const setDetail = ({
  commit
}, data) => {
  commit(types.SET_DETAIL, data);
};

// 更新画集简要列表
export const setCollectDigest = ({
  commit
}) => {
  collectionsDigest(state.user.id)
    .then(res => {
      const data = res.data.data || null;
      commit(types.SET_COLLECT_DIGEST, data);
    });
};

// 更新画集
export const updateCollect = ({
  dispatch, commit
}, data) => {
  return new Promise((resolve, reject) => {
    updateCollects(data)
      .then(res => {
        if (res.status === 200) {
          dispatch('setCollectDigest');
          resolve(res);
        } else {
          reject();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

// 新建画集
export const createCollect = ({
  dispatch, commit
}, data) => {
  return new Promise((resolve, reject) => {
    createCollects(data)
      .then(res => {
        if (res.status === 200) {
          dispatch('setCollectDigest');
          resolve(res);
        } else {
          reject();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

// 删除画集
export const delCollects = ({
  dispatch, commit
}, data) => {
  return new Promise((resolve, reject) => {
    deleteCollects(data)
      .then(res => {
        if (res.status === 200) {
          dispatch('setCollectDigest');
          resolve(res);
        } else {
          reject();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

// 获取加速服务器
export const vipProxyServer = ({
  commit
}) => {
  return new Promise((resolve, reject) => {
    getvipProxyServer()
      .then(res => {
        if (res.status === 200 && res.data.data) {
          const data = res.data.data;
          const url = data[Math.floor((Math.random() * data.length))];
          localStorage.setItem('serverAddress', url.serverAddress);
          commit(types.SET_SERVER_ADDRESS, url.serverAddress);
          Toast({ content: '您正在享受原图加速服务' });
          resolve();
        } else {
          Toast({ content: '原图加速服务暂时失效 请稍后刷新重试' });
          localStorage.removeItem('serverAddress');
          reject();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const unreadRemindsCount = ({
  commit
}) => {
  return new Promise((resolve, reject) => {
    getUnreadRemindsCount(state.user.id)
      .then(res => {
        if (res.status === 200) {
          commit(types.SET_UNREAD_COUNT, res.data.data);
          resolve();
        } else {
          reject();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
