import axios from '../base';

// 新建画集
function addCollections(data) {
  return axios({
    url: `/collections`,
    method: 'post',
    data: {
      isPublic: 1,
      forbidComment: 0,
      pornWarning: 0,
      ...data
    }
  });
}

// 查看用户画集
function getCollections(params) {
  return axios({
    url: `/users/${params.userId}/collections`,
    method: 'get',
    params: {
      pageSize: 30,
      isPublic: 1,
      ...params
    }
  });
}

// 用户获取自己的画集摘要列表（用于快速添加）
function collectionsDigest(userId) {
  return axios({
    url: `/users/${userId}/collectionsDigest`,
    method: 'get'
  });
}

// 添加画作到画集中
function illustrations(data) {
  return axios({
    url: `/collections/${data.collectionId}/illustrations`,
    method: 'post',
    headers: { 'content-type': 'application/json' },
    data: data.data
  });
}

// 查看画集下画作列表
function getIllustrations(data) {
  return axios({
    url: `/collections/${data.collectoinId}/illustrations`,
    method: 'get',
    params: {
      page: data.page,
      pageSize: 30
    }
  });
}

// 标签补全
function getTags(params) {
  return axios({
    url: `/collections/tags`,
    method: 'get',
    params
  });
}

// 新建画集
function createCollects(data) {
  return axios({
    url: `/collections`,
    method: 'post',
    data
  });
}

// 根据id查看画集
function getCollects(collctionId) {
  return axios({
    url: `/collections/${collctionId}`,
    method: 'get'
  });
}

// 更新画集
function updateCollects(data) {
  return axios({
    url: `/collections/${data.id}`,
    method: 'put',
    data
  });
}

// 删除画集
function deleteCollects(collectionId) {
  return axios({
    url: `/collections/${collectionId}`,
    method: 'delete'
  });
}

// 批量删除画作
function delIllustration(data) {
  return axios({
    url: `/collections/${data.collectionId}/illustrations`,
    method: 'delete',
    headers: { 'content-type': 'application/json' },
    data: data.data
  });
}

export {
  addCollections,
  getCollections,
  collectionsDigest,
  illustrations,
  getIllustrations,
  getTags,
  createCollects,
  getCollects,
  updateCollects,
  deleteCollects,
  delIllustration
};
