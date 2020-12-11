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

const Dashboard = ({ dataRequest, clients }) => {
  useEffect(() => {
    dataRequest();
  }, []);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const renderCells = useCallback(
    () =>
      clients.map((row) => (
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
        </StyledTableRow>
      )),
    [clients],
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
              </TableRow>
            </TableHead>
            <TableBody>{renderCells()}</TableBody>
          </Table>

          <TablePagination
            component="span"
            count={10}
            page={1}
            labelRowsPerPage="Result. por pág."
            nextIconButtonText="Prox. pág"
            backIconButtonText="Pág. anterior"
          />
        </TableContainer>
      </Card>
      <AddForm
        isOpenModal={open}
        getData={() => {}}
        close={() => setOpen(false)}
      />
    </div>
  );
};

Dashboard.defaultProps = {
  clients: [],
};

const mapStateToProps = (state) => ({
  clients: state.dashboard.data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...DashboardActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
