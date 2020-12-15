import React, { useEffect, useState, memo } from 'react';
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

import { Creators as ClientsActions } from 'store/ducks/clients';
import { Creators as DashboardActions } from 'store/ducks/dashboard';

const EditForm = memo(({ isOpenModal, updateRequest, userData, close }) => {
  // eslint-disable-next-line camelcase
  const [id, setId] = useState({});
  const [client_id, setClient_id] = useState({});
  const [name, setName] = useState({});
  const [date, setDate] = useState({});
  const [motive, setMotive] = useState({});
  const [amount, setAmount] = useState({});

  useEffect(() => {
    if (userData) {
      // eslint-disable-next-line no-underscore-dangle
      setId(userData._id);
      setClient_id(userData.client_id);
      setName(userData.name);
      setDate(userData.date);
      setMotive(userData.motive);
      setAmount(userData.amount);
    }
  }, [userData]);

  const handleClose = () => {
    setClient_id({});
    setName({});
    setDate({});
    setMotive({});
    setAmount({});
    close();
  };

  const handleCreateCase = (e) => {
    e.preventDefault();
    const saveData = {
      _id: id,
      client_id,
      date,
      motive,
      amount,
    };
    updateRequest(saveData);
    handleClose();
  };

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
                        type="text"
                        value={name}
                        readOnly
                      />
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
                        value={motive || ''}
                        onChange={(e) => setMotive(e.target.value)}
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
                        required
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
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
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount || ''}
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
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...ClientsActions, ...DashboardActions }, dispatch);

export default connect(null, mapDispatchToProps)(EditForm);
