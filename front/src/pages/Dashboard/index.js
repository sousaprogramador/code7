import React, { useEffect, useCallback, useState } from 'react';
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

import { Creators as DashboardActions } from 'store/ducks/dashboard';
import { Creators as ClientsActions } from 'store/ducks/clients';

import AlertDialog from './components/AlertDialog';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';

const Dashboard = ({
  dataRequest,
  clientsRequest,
  deleteRequest,
  financial,
  clients,
  updateRequest,
  count,
}) => {
  useEffect(() => {
    dataRequest();
    clientsRequest();
  }, []);

  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [notifData, setNotiData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const handleOpenAdd = () => {
    setOpen(true);
  };

  const handleEditUser = (client) => {
    setUserData(client);
    setTimeout(() => setUserModalOpen(true), 1000);
  };

  const refresh = useCallback(() => dataRequest(), [financial]);

  const renderCells = useCallback(
    () =>
      financial.map((row) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            <Tooltip title="Deletar" placement="top">
              <Button
                size="sm"
                onClick={() => {
                  setNotiData(row);
                  setOpenAlert(true);
                }}
                style={{ marginRight: 13 }}
                color="danger"
              >
                <i className="cil-trash" />
              </Button>
            </Tooltip>
            <Tooltip title="Editar" placement="top">
              <Button
                onClick={() => handleEditUser(row)}
                size="sm"
                color="primary"
              >
                <i className="icon-pencil" />
              </Button>
            </Tooltip>
          </StyledTableCell>
          <StyledTableCell>{row.name}</StyledTableCell>
          <StyledTableCell>{row.username || 'Não informado'}</StyledTableCell>
          <StyledTableCell>{row.email}</StyledTableCell>
          <StyledTableCell>{row.amount}</StyledTableCell>
        </StyledTableRow>
      )),
    [financial],
  );

  return (
    <div className="animated fadeIn">
      <Button
        style={{ marginBottom: 10 }}
        color="success"
        onClick={handleOpenAdd}
      >
        <i className="icon-plus" /> Adicionar
      </Button>
      <Card>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Ações</StyledTableCell>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell>Usuario</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Valor</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderCells()}</TableBody>
          </Table>

          <TablePagination
            component="span"
            count={count}
            page="1"
            labelRowsPerPage="Result. por pág."
            nextIconButtonText="Prox. pág"
            backIconButtonText="Pág. anterior"
            onChangePage={() => {}}
            rowsPerPage={() => {}}
            onChangeRowsPerPage={() => {}}
          />
        </TableContainer>
      </Card>
      <AddForm
        isOpenModal={open}
        clientsRequest={clientsRequest}
        userData={clients}
        close={() => setOpen(false)}
        getData={refresh}
      />

      <EditForm
        isOpenModal={userModalOpen}
        userData={userData}
        updateRequest={updateRequest}
        close={() => setUserModalOpen(false)}
        getData={refresh}
      />

      <AlertDialog
        data={notifData}
        open={openAlert}
        deleteNotif={(id) => deleteRequest(id)}
        close={() => setOpenAlert(false)}
      />
    </div>
  );
};

Dashboard.defaultProps = {
  financial: [],
  clients: [],
};

const mapStateToProps = (state) => ({
  financial: state.dashboard.data,
  clients: state.clients.data,
  count: 10,
  lastPage: 10,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...DashboardActions, ...ClientsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
