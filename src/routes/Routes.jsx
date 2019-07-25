import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import Startups from '../pages/startups/Startups';
import Results from '../pages/results/Results';
import NotFound from '../pages/notFound/NotFound';

const Routes = () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={props => (
          <Layout {...props}>
            <Home />
          </Layout>
        )}
      />
      <Route
        exact
        path="/startups"
        render={props => (
          <Layout {...props}>
            <Startups />
          </Layout>
        )}
      />
      <Route
        exact
        path="/results"
        render={props => (
          <Layout {...props}>
            <Results />
          </Layout>
        )}
      />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
export default Routes;
