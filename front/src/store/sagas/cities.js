import { put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';

import { api } from '../../services';
import { Creators as CitiesAction } from '../ducks/cities';

export function* citiesRequest() {}
