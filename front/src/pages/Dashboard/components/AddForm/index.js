import React, { useEffect, useCallback, useState, memo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dialog, DialogContent, Container, Box } from '@material-ui/core';

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
} from 'reactstrap';

import { Creators as DashboardActions } from 'store/ducks/dashboard';

const Register = memo(
  ({ isOpenModal, clientRequest, createRequest, userData, close }) => {
    useEffect(() => {
      clientRequest();
    }, []);

    const [data, setData] = useState({});

    const handleClose = () => {
      setData({});
      close();
    };

    const handleCreateCase = (e) => {
      e.preventDefault();
      const saveData = {
        client_id: data.client_id,
        date: data.date,
        motive: data.motive,
        amount: data.amount,
      };
      createRequest(saveData);
      handleClose();
    };

    const handleChange = ({ target }) =>
      setData((u) => ({ ...u, [target.name]: target.value }));

    return (
      <Dialog open={isOpenModal} maxWidth="lg">
        <DialogContent>
          <Card body>
            <Container>
              <Box display="flex" justifyContent="center">
                <Form onSubmit={(e) => handleCreateCase(e)}>
                  <h5>Informações Pessoais:</h5>

                  <Row form>
                    <Col className="px-md-2" md={12}>
                      <FormGroup>
                        <Label>Nome Completo:*</Label>

                        <Input
                          name="client_id"
                          type="select"
                          onChange={handleChange}
                          value={data.client_id}
                        >
                          <option value="">Selecione</option>
                          {userData
                            ? userData.map((row) => (
                              <option value={row.id}>{row.name}</option>
                            ))
                            : ''}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col className="px-md-2" md={24}>
                      <FormGroup>
                        <Label>Motivo:*</Label>

                        <Input
                          name="motive"
                          type="textarea"
                          value={data.motive || ''}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col className="px-md-2" md={24}>
                      <FormGroup>
                        <Label>Data:*</Label>

                        <Input
                          name="date"
                          type="date"
                          max={new Date().toISOString().slice(0, 10)}
                          required
                          onChange={handleChange}
                          value={data.date || ''}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col className="px-md-2" md={24}>
                      <FormGroup>
                        <Label>valor:*</Label>

                        <Input
                          name="amount"
                          type="number"
                          required
                          onChange={handleChange}
                          value={data.amount || ''}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div>
                    <Button type="submit" color="primary">
                      <i className="cil-save" /> Cadastrar
                    </Button>{' '}
                    <Button type="reset" color="danger" onClick={handleClose}>
                      <i className="cil-x" /> Cancelar
                    </Button>
                  </div>
                </Form>
              </Box>
            </Container>
          </Card>
        </DialogContent>
      </Dialog>
    );
  },
);

const mapStateToProps = (state) => ({
  userData: state.dashboard.client,
  loading: null,
  params: null,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...DashboardActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
