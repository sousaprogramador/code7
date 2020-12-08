import React, { useState, useEffect } from 'react';

import {
  Col,
  Button,
  FormGroup,
  Input,
  Label,
  Row,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as NotificationAction } from 'store/ducks/notification';

const FormAdd = ({
  isOpenModal,
  createNotificationsRequest,
  userName,
  userId,
  closeModal,
  params,
}) => {
  const [activeTab, setActiveTab] = useState('1');
  const [numberNotification, setNumberNotification] = useState('');
  const [firstSyptopmsDate, setfirstSyptopmsDate] = useState('');
  const [date, setDate] = useState('');
  const [reportingUnit, setReportingUnit] = useState('');
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (params) setUnits(params.reporting_units);
  }, [params]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleClose = () => {
    setActiveTab('1');
    setNumberNotification('');
    setReportingUnit('');
    setfirstSyptopmsDate('');
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      notification: {
        number: numberNotification,
        date: date || null,
        reporting_unit_id: reportingUnit || null,
        symptom_onset_date: firstSyptopmsDate || null,
        patient_id: userId,
      },
    };
    createNotificationsRequest(data);
    handleClose();
  };

  return (
    <Dialog
      maxWidth="lg"
      aria-labelledby="max-width-dialog-title"
      open={isOpenModal}
    >
      <DialogTitle>{`Paciente: ${userName}`}</DialogTitle>

      <DialogContent>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => toggleTab('1')}
            >
              Notificação
            </NavLink>
          </NavItem>
        </Nav>

        <Form onSubmit={handleSubmit}>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <h5>Notificação:</h5>

              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label>Número:*</Label>

                    <Input
                      type="text"
                      required
                      value={numberNotification}
                      onChange={(e) => setNumberNotification(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col className="px-md-2" md={3}>
                  <FormGroup>
                    <Label>Data:</Label>

                    <Input
                      type="date"
                      max={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                      required
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label>Unidade notificadora:*</Label>

                    <Input
                      type="select"
                      required
                      onChange={(e) => setReportingUnit(e.target.value)}
                      value={reportingUnit}
                    >
                      <option value="">Selecione</option>

                      {units.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>

                <Col className="px-md-2" md={3}>
                  <FormGroup>
                    <Label>Data 1° Sintomas:</Label>

                    <Input
                      type="date"
                      onChange={(e) => setfirstSyptopmsDate(e.target.value)}
                      max={new Date().toISOString().slice(0, 10)}
                      value={firstSyptopmsDate}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </TabPane>
          </TabContent>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <div>
              <Button type="submit" color="primary">
                <i className="cil-save" /> Salvar
              </Button>{' '}
              <Button type="reset" color="danger" onClick={() => handleClose()}>
                <i className="cil-x" /> Cancelar
              </Button>{' '}
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...NotificationAction }, dispatch);

export default connect(null, mapDispatchToProps)(FormAdd);
