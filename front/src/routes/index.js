import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from './history';
import Private from './private';
// import Home from '../pages/Home';

const DefaultLayout = React.lazy(() => import('../components/DefaultLayout'));

const SignIn = React.lazy(() => import('../pages/SignIn'));
const SignUp = React.lazy(() => import('../pages/SignUp'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Carregando...</div>
);

export const routes = [
  { path: '/dashboard', exact: true, name: 'Inicio', component: Dashboard },
];

const Routes = () => (
  <Router history={history}>
    <Suspense fallback={loading()}>
      <Switch>
        {routes.map((route) => (
          <Private
            exact
            path={route.path}
            component={(props) => <DefaultLayout {...props} />}
          />
        ))}

        <Route path="/" component={(props) => <SignIn {...props} />} />
        <Route path="/register" component={(props) => <SignUp {...props} />} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
