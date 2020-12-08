import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Button } from 'reactstrap';
import {
  TablePagination,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Tooltip,
} from '@material-ui/core';

import AppBar from 'components/AppBar';
import AlertDialog from 'components/AlertDialog';
import TablePaginator from 'components/TablePaginator';
import { Creators as CasesActions } from 'store/ducks/cases';

import Form from './components/Form';
import FormAdd from './components/FormAdd';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';

const Cases = ({
  casesRequest,
  createCasesRequest,
  updateCasesRequest,
  paramsRequest,
  deleteCasesRequest,
  params,
  cases,
  count,
  createNotificationsRequest,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [userName, setUserName] = useState('');
  const [userBirth, setUserBirth] = useState('');

  const [userId, setUserId] = useState('');
  const [notifData, setNotiData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [permission] = useState(localStorage.getItem('@COVID_PERMISSION'));
  const classes = useStyles();

  useEffect(() => {
    casesRequest({});
    paramsRequest();
  }, [casesRequest, paramsRequest]);

  const handleChangePage = useCallback(
    (event, newPage) => {
      casesRequest({ name: filterName, page: newPage + 1, limit: rowsPerPage });
      setPage(newPage);
    },
    [casesRequest, filterName, rowsPerPage],
  );

  const handleChangeRowsPerPage = useCallback(
    ({ target }) => {
      setRowsPerPage(target.value);
      casesRequest({
        name: filterName,
        page: page + 1,
        limit: target.value,
      });
    },
    [casesRequest, filterName, page],
  );

  const handleSearch = useCallback(
    (name) => {
      setFilterName(name);
      casesRequest({ name, page: 1, limit: rowsPerPage });
    },
    [casesRequest, rowsPerPage],
  );

  const handleEdit = (user) => {
    setUserName(user.patient.profile.name);
    setUserBirth(user.patient.profile.birth_date);
    setUserId(user.patient.id);
    setIsOpenModal(true);
  };

  const handleAdd = (user) => {
    setUserName(user.patient.profile.name);
    setUserId(user.patient.id);
    setIsOpenModal2(true);
  };

  const renderAppBar = useCallback(
    () => (
      <AppBar
        title={`Notificações: ${count ? count.toLocaleString() : 'Aguarde'}`}
        handleSearch={handleSearch}
      />
    ),
    [count, handleSearch],
  );

  const renderResult = (row) => {
    let result;
    let color;

    if (row.quick_test) {
      switch (row.quick_test.result) {
        case 'Positivo':
          result = 'Positivo';
          color = '#d32f2f';
          break;
        case 'Negativo':
          result = 'Negativo';
          color = '#8bc34a';
          break;
        case 'Aguardando':
          result = 'Aguardando';
          color = '#1e88e5';
          break;
        default:
          return '';
      }
    } else if (row.swab) {
      switch (row.swab.result) {
        case 'Positivo':
          result = 'Positivo';
          color = '#d32f2f';
          break;
        case 'Negativo':
          result = 'Negativo';
          color = '#8bc34a';
          break;
        case 'Aguardando':
          result = 'Aguardando';
          color = '#1e88e5';
          break;
        default:
          return '';
      }
    }

    return (
      <span
        style={{
          color: 'white',
          background: color,
          padding: '4px 7px',
          borderRadius: 5,
          textAlign: 'center',
        }}
      >
        {result}
      </span>
    );
  };

  const renderCells = useCallback(
    () =>
      cases.map((row) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            <div style={{ display: 'flex' }}>
              {Number(permission) <= 2 && (
                <Tooltip title="Deletar" placement="top">
                  <Button
                    size="sm"
                    onClick={() => {
                      setNotiData(row);
                      setOpenAlert(true);
                    }}
                    style={{ marginRight: 8 }}
                    color="danger"
                  >
                    <i className="cil-trash" />
                  </Button>
                </Tooltip>
              )}
              <Tooltip title="Editar" placement="top">
                <Button
                  onClick={() => handleEdit(row)}
                  size="sm"
                  color="primary"
                >
                  <i className="icon-pencil" />
                </Button>
              </Tooltip>
              <Tooltip title="Adicionar" placement="top">
                <Button
                  onClick={() => handleAdd(row)}
                  style={{ marginLeft: 8 }}
                  size="sm"
                  color="success"
                >
                  <i className="icon-plus" />
                </Button>
              </Tooltip>
            </div>
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">
            {row.number || <span style={{ color: 'red' }}>Não informado</span>}
          </StyledTableCell>
          <StyledTableCell>{row.patient.profile.name}</StyledTableCell>
          <StyledTableCell>{renderResult(row)}</StyledTableCell>
          <StyledTableCell>{row.reportingUnit.name}</StyledTableCell>
          <StyledTableCell>
            {new Date(row.date).toLocaleDateString()}
          </StyledTableCell>
        </StyledTableRow>
      )),
    [cases, permission],
  );

  return (
    <div className="animated fadeIn">
      {renderAppBar()}
      <Card>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Ações</StyledTableCell>
                <StyledTableCell>Número</StyledTableCell>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell>Resultado</StyledTableCell>
                <StyledTableCell>Unid. Notificadora</StyledTableCell>
                <StyledTableCell>Data Notificação</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderCells()}</TableBody>
          </Table>

          <TablePagination
            component="span"
            count={count}
            page={page}
            labelRowsPerPage="Result. por pág."
            nextIconButtonText="Prox. pág"
            backIconButtonText="Pág. anterior"
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginator}
          />
        </TableContainer>
      </Card>

      <Form
        isOpenModal={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        casesRequest={casesRequest}
        setIsOpenModal={setIsOpenModal}
        createCasesRequest={createCasesRequest}
        updateCasesRequest={updateCasesRequest}
        userName={userName}
        userBirth={userBirth}
        userId={userId}
        params={params}
      />

      <FormAdd
        isOpenModal={isOpenModal2}
        closeModal={() => setIsOpenModal2(false)}
        casesRequest={casesRequest}
        setIsOpenModal={setIsOpenModal}
        createCasesRequest={createNotificationsRequest}
        updateCasesRequest={updateCasesRequest}
        userName={userName}
        userId={userId}
        params={params}
      />

      <AlertDialog
        data={notifData}
        open={openAlert}
        deleteNotif={(id) => deleteCasesRequest(id)}
        close={() => setOpenAlert(false)}
      />
    </div>
  );
};

Cases.defaultProps = {
  cases: [],
};

const mapStateToProps = (state) => ({
  cases: state.cases.data,
  count: state.cases.count,
  lastPage: state.cases.lastPage,
  params: state.cases.params,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...CasesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cases);
