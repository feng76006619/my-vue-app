const state = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  showTab: true,
  likeStatus: null, // 点赞画作状态
  followStatus: null, // 画师关注状态
  detail: null,
  showSearchBox: false,
  option: {},
  collectStatus: null, // 画集弹窗状态信息 show,id
  collectDigest: [], // 简要画集列表
  serverAddress: localStorage.getItem('serverAddress') || null,
  unreadcount: 0
};

export default state;
