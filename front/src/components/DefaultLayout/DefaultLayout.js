import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from './nav';
// routes config
import { routes } from '../../routes';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const DefaultLayout = (props) => {
  const [permission] = useState(localStorage.getItem('@COVID_PERMISSION'));
  const [navs, setNavs] = useState(null);

  useEffect(() => {
    if (permission !== '1' && permission !== '2') {
      setNavs({ items: navigation.items.filter((i) => i.url !== '/report') });
    } else {
      setNavs(navigation);
    }
  }, [permission]);

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Carregando...</div>
  );

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={(e) => this.signOut(e)} />
        </Suspense>
      </AppHeader>

      <div className="app-body">
        <AppSidebar fixed display="xl">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            {navs && (
              <AppSidebarNav navConfig={navs} {...props} router={router} />
            )}
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>

        <main className="main">
          <Container fluid style={{ padding: 10 }}>
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route) =>
                  route.component ? (
                    <Route
                      key={route.name}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(p) => <route.component {...p} />}
                    />
                  ) : null,
                )}
              </Switch>
            </Suspense>
          </Container>
        </main>

        <AppAside fixed>
          <Suspense fallback={loading()} />
        </AppAside>
      </div>

      <AppFooter>
        <Suspense fallback={loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
};

export default DefaultLayout;
