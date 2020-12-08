/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
  Col,
  Button,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Form,
} from 'reactstrap';

import { Dialog, DialogContent } from '@material-ui/core';
import InputMask from 'react-input-mask';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { States } from 'helpers/dataHelp';
import { dateConvert, calcAge } from 'helpers/dateConvert';
import { Creators as CasesActions } from 'store/ducks/cases';
import { Creators as PatientActions } from 'store/ducks/patient';

const UserForm = ({
  isOpenModal,
  userData,
  close,
  patientRequest,
  updatePatientRequest,
}) => {
  const [zip_code, setCep] = useState('');
  const [cpf, setCpf] = useState('');
  const [notification, setNotification] = useState('');
  const [cns, setCns] = useState('');
  const [dontHave, setdDontHave] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [mothers_name, setMotherName] = useState('');
  const [pregnant, setPregnant] = useState('');
  const [sex, setSex] = useState('');
  const [birth_date, setBirthDate] = useState('');
  const [street, setStreet] = useState('');
  const [zone, setZone] = useState('');
  const [complement, setComp] = useState('');
  const [contactants, setContactants] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [is_traveler, setIsTraveler] = useState(false);
  const [contact_travelers, setContactTravelers] = useState(false);
  const [is_health_professional, setHalfProf] = useState(false);
  const [schooling, setSchooling] = useState('');
  const [whatsapp, setWhatsPhone] = useState('');

  function handleAge(date) {
    setBirthDate(date);
    setAge(calcAge(date));
  }

  useEffect(() => {
    if (userData) {
      setCep(userData.patient.profile.address.zip_code);
      setCpf(userData.patient.profile.cpf);
      setNotification(userData.patient.profile.notification);
      setCns(userData.cns);
      setdDontHave(!userData.patient.profile.cpf);
      setName(userData.patient.profile.name);
      setMotherName(userData.patient.profile.mothers_name);
      setPregnant(userData.pregnant);
      setSex(userData.patient.profile.sex);
      handleAge(dateConvert(userData.patient.profile.birth_date));
      setStreet(userData.patient.profile.address.street);
      setZone(userData.patient.profile.address.zone);
      setComp(userData.patient.profile.address.complement);
      setContactants(userData.contactants);
      setNumber(userData.patient.profile.address.number);
      setCity(userData.patient.profile.address.city);
      setDistrict(userData.patient.profile.address.neighborhood);
      setState(userData.patient.profile.address.state);
      setPhone(userData.patient.profile.phone);
      setHalfProf(userData.is_health_professional !== 0);
      setSchooling(userData.patient.profile.schooling);
      setWhatsPhone(userData.patient.profile.whatsapp);
      setIsTraveler(userData.is_traveler !== 0 ? 'Sim' : 'Não');
      setContactTravelers(userData.contact_travelers !== 0 ? 'Sim' : 'Não');
    }
  }, [userData]);

  const handleUpdateCase = (e) => {
    e.preventDefault();
    const data = {
      id: userData.id,
      patient: {
        cns,
        pregnant,
        is_health_professional,
        contactants,
        is_traveler: is_traveler === 'Sim',
        contact_travelers: contact_travelers === 'Sim',
      },
      profile: {
        notification,
        cpf,
        name,
        mothers_name,
        sex,
        birth_date,
        phone,
        schooling,
        whatsapp,
      },
      address: {
        zip_code,
        street,
        neighborhood,
        number,
        complement,
        city,
        state,
        zone,
      },
    };

    updatePatientRequest(data);
    setTimeout(() => patientRequest({}), 1000);
    close();
  };

  return (
    <Dialog open={isOpenModal} maxWidth="lg">
      <DialogContent>
        <Form onSubmit={(e) => handleUpdateCase(e)}>
          <h5>Informações Pessoais:</h5>
          <Row form>
            <Col md={2}>
              <FormGroup>
                <Label>CPF:*</Label>

                <InputMask
                  mask="999.999.999-99"
                  required={!dontHave}
                  value={cpf}
                  maskChar={null}
                  onChange={(e) => setCpf(e.target.value)}
                >
                  {(inputProps) => <Input {...inputProps} type="tel" />}
                </InputMask>
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label>Cartão Nacional de Saúde:*</Label>

                <Input
                  type="text"
                  required={!dontHave}
                  value={cns}
                  onChange={(e) => setCns(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col className="px-md-2" md={2}>
              <FormGroup>
                <Label>Não Possui</Label>

                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>
                      <Input
                        onChange={(e) => setdDontHave(e.target.checked)}
                        addon
                        type="checkbox"
                        checked={dontHave}
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label>Profissional da Saúde ?</Label>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>
                      <Input
                        onChange={(e) => setHalfProf(e.target.checked)}
                        addon
                        type="checkbox"
                        checked={is_health_professional}
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={5}>
              <FormGroup>
                <Label>Nome Completo:*</Label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col md={1}>
              <FormGroup>
                <Label>Idade:</Label>
                <Input type="text" value={age} disabled />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label>Data Nascimento:*</Label>

                <Input
                  type="date"
                  max="2999-12-31"
                  required
                  onChange={(e) => handleAge(e.target.value)}
                  value={birth_date}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label>Telefone:*</Label>

                <InputMask
                  mask="(99) 99999-9999"
                  required
                  value={phone}
                  maskChar={null}
                  onChange={(e) => setPhone(e.target.value)}
                >
                  {(inputProps) => <Input {...inputProps} type="tel" />}
                </InputMask>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label>WhatsApp:</Label>

                <InputMask
                  mask="(99) 99999-9999"
                  value={whatsapp}
                  maskChar={null}
                  onChange={(e) => setWhatsPhone(e.target.value)}
                >
                  {(inputProps) => <Input {...inputProps} type="tel" />}
                </InputMask>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>Nome da Mãe:</Label>

                <Input
                  type="text"
                  value={mothers_name}
                  onChange={(e) => setMotherName(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label>Escolaridade:</Label>

                <Input
                  type="select"
                  onChange={(e) => setSchooling(e.target.value)}
                  value={schooling}
                >
                  <option value="">Selecione</option>
                  <option>Sem</option>
                  <option>Fundamental - 1</option>
                  <option>Fundamental - 2</option>
                  <option>Ensino Medio</option>
                  <option>Superior</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label>Sexo:*</Label>

                <Input
                  type="select"
                  required
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label>Gestante:*</Label>

                <Input
                  type="select"
                  required
                  onChange={(e) => setPregnant(e.target.value)}
                  value={pregnant}
                >
                  <option value="">Selecione</option>
                  <option>1º Trimestre</option>
                  <option>2º Trimestre</option>
                  <option>3º Trimestre</option>
                  <option>Não se aplica</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={11}>
              <FormGroup>
                <Label>Contactantes:</Label>

                <Input
                  type="text"
                  value={contactants}
                  onChange={(e) => setContactants(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <h5>Endereço:</h5>
          <Row form>
            <Col md={2}>
              <FormGroup>
                <Label>CEP:</Label>

                <InputMask
                  mask="99999-999"
                  value={zip_code}
                  maskChar={null}
                  onChange={(e) => setCep(e.target.value)}
                >
                  {(inputProps) => <Input {...inputProps} type="tel" />}
                </InputMask>
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label>Rua*</Label>
                <Input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label>Bairro*</Label>

                <Input
                  type="text"
                  required
                  value={neighborhood}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col md={1}>
              <FormGroup>
                <Label>Número*</Label>

                <Input
                  type="text"
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label>Complemento</Label>

                <Input
                  type="text"
                  value={complement}
                  onChange={(e) => setComp(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label>Cidade:*</Label>

                <Input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label>Estado:*</Label>

                <Input
                  type="select"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">Selecione</option>

                  {States.map((stat) => (
                    <option key={stat.uf} value={stat.uf}>
                      {stat.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label>Zona:*</Label>

                <Input
                  type="select"
                  required
                  onChange={(e) => setZone(e.target.value)}
                  value={zone}
                >
                  <option value="">Selecione</option>
                  <option>Urbana</option>
                  <option>Rural</option>
                  <option>Periurbana</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label>Hist. de viagens:</Label>

                <Input
                  type="select"
                  onChange={(e) => setIsTraveler(e.target.value)}
                  value={is_traveler}
                >
                  <option value="">Selecione</option>
                  <option>Sim</option>
                  <option>Não</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label>Contato viajantes:</Label>

                <Input
                  type="select"
                  onChange={(e) => setContactTravelers(e.target.value)}
                  value={contact_travelers}
                >
                  <option value="">Selecione</option>
                  <option>Sim</option>
                  <option>Não</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit" color="primary">
            <i className="cil-save" /> Salvar
          </Button>{' '}
          <Button onClick={() => close()} type="reset" color="danger">
            <i className="cil-x" /> Cancelar
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...CasesActions, ...PatientActions }, dispatch);

export default connect(null, mapDispatchToProps)(UserForm);
