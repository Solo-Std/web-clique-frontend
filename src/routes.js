import React from 'react'
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout'

function Loading() {
  return <div>Loading...</div>;
}

const Feeds = Loadable({
  loader: () => import('./views/Dashboard/Views/Feeds'),
  loading: Loading,
});

const Post = Loadable({
  loader: () => import('./views/Dashboard/Views/Post'),
  loading: Loading,
});

const Clique = Loadable({
  loader: () => import('./views/Dashboard/Views/Clique'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('./views/Dashboard/Views/Profile/Profile'),
  loading: Loading,
});

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/feeds', name: 'Feeds', component: Feeds },
  { path: '/post/:id', name: 'Post', component: Post },
  { path: '/clique/:id', name: 'Clique', component: Clique },
  { path: '/user/:id', name: 'Profile', component: Profile }
];

export default routes;
