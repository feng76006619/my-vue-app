import Vue from 'vue';
import Router from 'vue-router';
import cookie from 'js-cookie';

Vue.use(Router);

const pages = {
  DailyRank: () => import('./views/rank/DailyRank'),
  Detail: () => import('./views/detail/Detail'),
  Artist: () => import('./views/artist/Artist'),
  Search: () => import('./views/search/Search'),
  Illusts: () => import('./views/search/children/Illusts'),
  Artists: () => import('./views/search/children/Artists'),
  Find: () => import('./views/find/Find/'),
  SpotLight: () => import('./views/find/SoptLight/'),
  Spot: () => import('./views/find/Spot/'),
  Me: () => import('./views/me/Me/'),
  Collect: () => import('./views/me/Collect/'),
  Collects: () => import('./views/me/Collects/'),
  ArtistCollect: () => import('./views/me/ArtistCollect/'),
  Links: () => import('./views/find/Links/'),
  New: () => import('./views/new/New.vue'),
  Setting: () => import('./views/me/Setting/'),
  Avatar: () => import('./views/me/Avatar'),
  Login: () => import('./views/login/Login'),
  QQauth: () => import('./views/login/qqauth'),
  Register: () => import('./views/register/Register'),
  ResetPassword: () => import('./views/reset/ResetPassword'),
  EmailCheck: () => import('./views/reset/EmailCheck'),
  Friends: () => import('./views/find/Friends/'),
  Users: () => import('./views/users/Users'),
  BookMark: () => import('./views/bookmark/BookMark'),
  History: () => import('./views/me/History/'),
  Recommend: () => import('./views/recommend/Recommend'),
  Illustration: () => import('./views/me/Collects/Illustrations'),
  Edit: () => import('./views/me/Collects/Edit'),
  HandBook: () => import('./views/me/Me/HandBook'),
  Oauth: () => import('./views/oauth/'),
  Message: () => import('./views/me/Message/'),
  MessageList: () => import('./views/me/Message/list')

  // NotFound: () => import('./views/not-found/NotFound')
};

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [{
    path: '/',
    redirect: '/dailyRank'
  },
  {
    path: '/detail/:pid',
    name: 'Detail',
    component: pages.Detail,
    props: true,
    meta: {
      title: `??????`
    }
  },
  {
    path: '/illusts/:pid',
    name: 'Illusts',
    component: pages.Detail,
    props: true,
    meta: {
      title: `??????`
    }
  },
  {
    path: '/artist/:artistId',
    name: 'Artist',
    component: pages.Artist,
    props: true,
    meta: {
      title: `??????`
    }
  },
  {
    path: '/dailyRank',
    name: 'DailyRank',
    component: pages.DailyRank,
    meta: {
      title: `Pixiv Illustration Collection`
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: pages.Search,
    meta: {
      title: `??????`
    },
    children: [
      {
        path: 'illusts',
        name: 'SearchIllusts',
        component: pages.Illusts
      },
      {
        path: 'artists',
        name: 'Artists',
        component: pages.Artists
      }
    ]
  },
  {
    path: '/find',
    name: 'Find',
    component: pages.Find,
    meta: {
      title: `??????`
    }
  },
  {
    path: '/spotlight',
    name: 'SpotLight',
    component: pages.SpotLight,
    meta: {
      title: `spotlight`
    }
  },
  {
    path: '/spot/:id',
    name: 'Spot',
    component: pages.Spot,
    props: true,
    meta: {
      title: `spot`
    }
  },
  {
    path: '/me',
    name: 'Me',
    component: pages.Me,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/collect',
    name: 'Collect',
    component: pages.Collect,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/collects',
    name: 'Collects',
    component: pages.Collects,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/artistCollect',
    name: 'ArtistCollect',
    component: pages.ArtistCollect,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/links',
    name: 'Links',
    component: pages.Links,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/new',
    name: 'New',
    component: pages.New,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: pages.Setting,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/avatar',
    name: 'Avatar',
    component: pages.Avatar,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: pages.Login,
    meta: {
      title: `??????`
    }
  },
  {
    path: '/qqauth',
    name: 'QQauth',
    component: pages.QQauth
  },
  {
    path: '/register',
    name: 'Register',
    component: pages.Register,
    meta: {
      title: `??????`
    }
  },
  {
    path: '/resetPassword',
    name: 'ResetPassword',
    component: pages.ResetPassword,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/emailCheck',
    name: 'EmailCheck',
    component: pages.EmailCheck,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/friends',
    name: 'Friends',
    component: pages.Friends,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/users/:userId',
    name: 'Users',
    component: pages.Users,
    props: true
  },
  {
    path: '/bookmark/:illustId',
    name: 'BookMark',
    component: pages.BookMark,
    props: true
  },
  {
    path: '/history',
    name: 'History',
    component: pages.History,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: pages.Recommend,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/illustration/:id',
    name: 'Illustration',
    component: pages.Illustration,
    props: true,
    meta: {
      title: `illustration`
    }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: pages.Edit,
    props: true,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/handbook',
    name: 'HandBook',
    component: pages.HandBook,
    meta: {
      title: `????????????`
    }
  },
  {
    path: '/oauth/authorize',
    name: 'Oauth',
    component: pages.Oauth
  },
  {
    path: '/message',
    name: 'Message',
    component: pages.Message,
    meta: {
      title: '????????????'
    }
  },
  {
    path: '/message/list/:type',
    name: 'MessageList',
    component: pages.MessageList,
    props: true
  }
    // {
    //   path: '*',
    //   redirect: '/dailyRank'
    // }
  ]
});

router.beforeEach((to, from, next) => {
  const isLogin = !!cookie.get('jwt');
  const needLogin = to.path === '/me' || to.path === '/new' || to.path === 'recommend';
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (!needLogin) {
    // ????????????????????????????????????
    next();
  } else {
    // ???????????????????????????jwt
    isLogin ? next() : next('/login');
  }
});

export default router;
