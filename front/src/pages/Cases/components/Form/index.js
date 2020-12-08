/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Col,
  Button,
  Input,
  Row,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from 'reactstrap';
import {
  Dialog,
  Typography,
  DialogContent,
  Box,
  Grid,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import classnames from 'classnames';

import api from 'services/api';
import { dateConvert } from 'helpers/dateConvert';
import { data } from 'helpers/userData';
import { dataObject, consultData, validate } from './utils/functionsHelpers';

import ClinicTab from './components/ClinicTab';
import ConsultTab from './components/ConsultTab';
import HospitalizationTab from './components/HospitalizationTab';

const ModalForm = ({
  isOpenModal,
  createCasesRequest,
  casesRequest,
  updateCasesRequest,
  userName,
  userBirth,  
  userId,
  closeModal,
  params,
}) => {
  const [activeTab, setActiveTab] = useState('1');
  const [dados, setDados] = useState(data);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [medData, setMedData] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectNotification, setSelectNotification] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [notifData, setNotifData] = useState({});
  const formatedData = new Date(userBirth).toLocaleDateString();


  useEffect(() => {
    async function getData() {
      const response = await api.get(`/notifications/${userId}`);
      const resData = response.data;

      if (resData) {
        setSelectNotification(resData.reverse()[0].id);
        setNotifications(resData);
      }
    }

    if (isOpenModal && userId) getData();
  }, [isOpenModal, userId]);

  useEffect(() => {
    async function getData() {
      const response = await api.get('/symptoms?limit=15');
      const resData = response.data.data;

      setSymptoms(resData);
      setDados((d) => ({ ...d, symptoms: resData }));
    }

    getData();
  }, [isOpenModal]);

  const handleSetData = () => {
    const medDat = [];

    setDados({
      ...data,
      conditions: params.conditions,
      medicines: params.medicines,
      closeCrit: params.evolution_criterion_closes,
      finalClasses: params.evolution_final_classes,
      tests: params.tests,
      consultUnits: params.consultation_units,
      hospUnits: params.hospitalization_units,
      evolutionResults: params.evolution_results,
      symptoms,
    });
    params.medicines.map((item) => medDat.push({ id: item.id }));
    setMedData(medDat);
  };

  useEffect(() => {
    if (params) handleSetData();
  }, [params]);

  useEffect(() => {
    async function getData() {
      if (isOpenModal && selectNotification) {
        const response = await api.get(`/cases/${selectNotification}`);
        const info = response?.data[0]?.patient ?? null;
        const userSymptoms = response?.data[0]?.symptoms;
        const consult = response?.data[0];
        const consultInfo = consultData(consult);

        const compare = (array, value) => {
          const result = array.filter((item) => item.id === value);
          return result.length > 0;
        };
        const compareMedicines = (array, value) => {
          const result = array.filter((item) => item.medicine_id === value);
          return result[0];
        };

        setNotifData({
          reporting_unit_id: consult.reporting_unit_id,
          number: consult.number,
          date: consult.date ? consult.date.slice(0, 10) : '',
          id: consult.id,
          symptom_onset_date: consult.symptom_onset_date
            ? consult.symptom_onset_date.slice(0, 10)
            : '',
        });

        //! Corrigir para atualizar os symptoms ao carregar o cases
        if (info) {
          if (userSymptoms) {
            const symps = dados.symptoms.map((i) => ({ ...i }));

            dados.symptoms.map((symptom) => {
              if (compare(userSymptoms, symptom.id)) {
                symps[symptom.id - 1].checked = true;
              } else {
                symps[symptom.id - 1].checked = false;
              }
            });
            setDados((d) => ({ ...d, symptoms: symps }));
          }
          if (info.condition) {
            const cond = dados.conditions.map((i) => ({ ...i }));

            dados.conditions.map((condition) => {
              if (compare(info.condition, condition.id)) {
                cond[condition.id - 1].checked = true;
              } else {
                cond[condition.id - 1].checked = false;
              }
            });
            setDados((d) => ({ ...d, conditions: cond }));
          }

          if (consult.medicine_patient) {
            const meds = dados.medicines.map((i) => ({ ...i }));
            const medsDat = medData.map((i) => ({ ...i }));

            dados.medicines.map((medicine) => {
              const res = compareMedicines(
                consult.medicine_patient,
                medicine.id,
              );
              if (res) {
                meds[medicine.id - 1].checked = true;
                meds[medicine.id - 1].start_date = res.start_date;
                meds[medicine.id - 1].end_date = res.end_date;
                meds[medicine.id - 1].effects = res.medicines_patient_effects;
                meds[medicine.id - 1].medicine_patient_id = res.id;
                medsDat[medicine.id - 1].checked = true;
                medsDat[medicine.id - 1].start_date = res.start_date;
                medsDat[medicine.id - 1].end_date = res.end_date;
                medsDat[medicine.id - 1].medicine_patient_id = res.id;
                medsDat[medicine.id - 1].effects =
                  res.medicines_patient_effects;
              }
            });
            setDados((d) => ({ ...d, medicines: meds }));
            setMedData(medsDat);
          }

          setDados((d) => ({ ...d, ...consultInfo }));
        }
      }
    }

    getData();
  }, [selectNotification, isOpenModal]);

  const toggleTab = (tab) => activeTab !== tab && setActiveTab(tab);

  const handleChange = (id, value) => {
    const meds = medData.map((i) => ({ ...i }));
    const med = dados.medicines.map((i) => ({ ...i }));

    meds[id - 1].effects = value;
    med[id - 1].effects = value;
    setMedData(meds);
    setDados((d) => ({ ...d, medicines: med }));
  };

  const handleSymptopm = (id, value) => {
    const symps = dados.symptoms.map((i) => ({ ...i }));

    symps[id - 1].checked = value === 'Sim';
    setDados((d) => ({ ...d, symptoms: symps }));
  };

  const handleConditions = (id, value) => {
    const conds = dados.conditions.map((i) => ({ ...i }));

    conds[id - 1].checked = value === 'Sim';
    setDados((d) => ({ ...d, conditions: conds }));
  };

  const handleMedicine = (id, value) => {
    const meds = medData.map((i) => ({ ...i }));
    const med = dados.medicines.map((i) => ({ ...i }));

    meds[id - 1].checked = value === 'Sim';
    med[id - 1].checked = value === 'Sim';
    setMedData(meds);
    setDados((d) => ({ ...d, medicines: med }));
  };

  const handleStartDate = (id, value) => {
    const meds = medData.map((i) => ({ ...i }));
    const med = dados.medicines.map((i) => ({ ...i }));

    meds[id - 1].start_date = dateConvert(value);
    med[id - 1].start_date = dateConvert(value);
    setMedData(meds);
    setDados((d) => ({ ...d, medicines: med }));
  };

  const handleEndDate = (id, value) => {
    const meds = medData.map((i) => ({ ...i }));
    const med = dados.medicines.map((i) => ({ ...i }));

    meds[id - 1].end_date = dateConvert(value);
    med[id - 1].end_date = dateConvert(value);
    setMedData(meds);
    setDados((d) => ({ ...d, medicines: med }));
  };

  const handleClose = () => {
    setActiveTab('1');
    closeModal();
    handleSetData();
  };

  const handleValidate = (tab, msg) => {
    setActiveTab(tab);
    setMessage(msg);
    setOpen(true);
  };

  const handleSave = () => {
    const userData = dataObject(userId, dados, medData);

    if (selectNotification) {
      userData.notification_id = selectNotification;
      updateCasesRequest(userData);

      api.put(`notifications/${notifData.id}`, notifData);

      setTimeout(() => casesRequest({}), 600);
    } else {
      userData.have_case = true;
      createCasesRequest(userData);
    }
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validate(dados, handleValidate, handleSave);
  };

  const handleChangeDados = useCallback(({ target }) => {
    setDados((d) => ({ ...d, [target.name]: target.value }));
  }, []);

  const handleChangeNotfication = ({ target }) =>
    setNotifData((u) => ({ ...u, [target.name]: target.value }));

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Dialog maxWidth="lg" open={isOpenModal}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          {message}
        </Alert>
      </Snackbar>

      <DialogContent>
        <Grid>
          <Row>
            <Col xs={6}>
              <Typography variant="h6" noWrap>
                {`Paciente: ${userName}  ${formatedData}`}
                
                
              </Typography>
            </Col>

            <Col xs={6}>
              <Box display="flex">
                <Typography style={{ marginRight: 10 }} variant="h6">
                  Notificação:
                </Typography>

                <Input
                  type="select"
                  onChange={(e) => setSelectNotification(e.target.value)}
                  value={selectNotification}
                  style={{ borderColor: 'black', color: 'black', fontSize: 14 }}
                >
                  {notifications.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.number || 'Não informado'}
                    </option>
                  ))}
                </Input>
              </Box>
            </Col>
          </Row>
        </Grid>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => toggleTab('1')}
            >
              Dados Clínicos e Epimiologicos
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => toggleTab('2')}
            >
              Consulta, Diagnóstico e Medicação
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => toggleTab('3')}
            >
              Internação, Exames e Evolução
            </NavLink>
          </NavItem>
        </Nav>

        <Form onSubmit={handleSubmit}>
          <TabContent activeTab={activeTab}>
            <ClinicTab
              dados={dados}
              units={params?.reporting_units ?? []}
              notifData={notifData}
              handleChange={handleChangeNotfication}
              handleChangeDados={handleChangeDados}
              handleConditions={handleConditions}
              handleSymptopm={handleSymptopm}
            />

            <ConsultTab
              handleChangeDados={handleChangeDados}
              dados={dados}
              handleMedicine={handleMedicine}
              handleChange={handleChange}
            />

            <HospitalizationTab
              dados={dados}
              handleChangeDados={handleChangeDados}
              handleStartDate={handleStartDate}
              handleEndDate={handleEndDate}
              dateConvert={dateConvert}
              handleMedicine={handleMedicine}
            />
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

export default ModalForm;
