import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
} from 'reactstrap';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import sygnet from '../../assets/logo.png';
import avatar from '../../assets/img/suporte.png';
import { Creators as AuthActions } from '../../store/ducks/auth';

const DefaultHeader = ({ logOut }) => {
  const [name] = useState(localStorage.getItem('@CODE7_NAME'));
  const [permission] = '1';
  const [adm, setAdm] = useState(false);
  const [perName, setPername] = useState('');

  useEffect(() => {
    switch (permission) {
      case '1':
        setAdm(true);
        setPername('Administrador');
        break;
      case '2':
        setAdm(true);
        setPername('Supervisor');
        break;
      case '3':
        setPername('Médico');
        break;
      case '4':
        setPername('Monitor');
        break;
      default:
        setPername('Usuário');
    }
  }, []);

  return (
    <>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />

      <AppNavbarBrand
        full={{ src: sygnet, width: 95, height: 30, alt: 'Code7' }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      <Nav className="ml-auto" navbar>
        <div className="d-none d-lg-block">
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <strong>{name}</strong>
            </DropdownToggle>
            <DropdownToggle nav>{perName}</DropdownToggle>
          </UncontrolledDropdown>
        </div>

        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            <img src={avatar} className="img-avatar" alt="#" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header tag="div" className="text-center">
              <strong>Conta</strong>
            </DropdownItem>

            {adm ? (
              <Link to="/members">
                <DropdownItem>
                  <i className="fa fa-user" />
                  Usuários
                </DropdownItem>
              </Link>
            ) : null}

            <DropdownItem onClick={() => logOut()}>
              <i className="fa fa-lock" />
              Sair
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </>
  );
};

DefaultHeader.defaultProps = {
  organization: [],
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...AuthActions }, dispatch);

export default connect(null, mapDispatchToProps)(DefaultHeader);
