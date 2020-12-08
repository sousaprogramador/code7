import React, { useEffect } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './App.scss';
import Routes from './routes';
import { Creators as AuthActions } from './store/ducks/auth';

const App = ({ logOut, signedIn }) => {
  useEffect(() => {
    if (signedIn) {
      setTimeout(() => logOut(), 14400000);
    }
  }, [logOut, signedIn]);

  return (
    <>
      <Routes />

      <ReduxToastr
        preventDuplicates
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        getState={(state) => state.toastr}
        timeOut={1000}
        newestOnTop={false}
        closeOnToastrClick
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...AuthActions }, dispatch);

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
