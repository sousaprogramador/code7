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
import { StyledTableCell, StyledTableRow, useStyles } from './styles';
import AddForm from './components/AddForm';

const Dashboard = ({ dataRequest, clientRequest, client, financial }) => {
  useEffect(() => {
    dataRequest();
    clientRequest();
  }, []);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const renderCells = useCallback(
    () =>
      financial.map((row) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            <Tooltip title="Deletar" placement="top">
              <Button
                size="sm"
                onClick={() => {}}
                style={{ marginRight: 13 }}
                color="danger"
              >
                <i className="cil-trash" />
              </Button>
            </Tooltip>
            <Tooltip title="Editar" placement="top">
              <Button onClick={() => {}} size="sm" color="primary">
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

  const handleOpenAdd = () => {
    setOpen(true);
  };

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
            count="10"
            page="1"
            labelRowsPerPage="Result. por pág."
            nextIconButtonText="Prox. pág"
            backIconButtonText="Pág. anterior"
          />
        </TableContainer>
      </Card>
      <AddForm
        isOpenModal={open}
        getData={() => {}}
        useData={client}
        clientRequest={clientRequest}
        close={() => setOpen(false)}
      />
    </div>
  );
};

Dashboard.defaultProps = {
  client: [],
  financial: [],
};

const mapStateToProps = (state) => ({
  financial: state.dashboard.data,
  client: state.dashboard.client,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...DashboardActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
