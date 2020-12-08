import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  Container,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

import api from '../../../services/api';

const FormModal = ({ isOpenModal, close, userData, createInviteRequest }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [permissions, setPermissions] = useState('');
  const [userTypes, setUserTypes] = useState([]);

  useEffect(() => {
    if (userData) {
      setName(userData.profile.name);
      setEmail(userData.email);
      setPermissions(userData.roles[0].id);
    } else {
      setName('');
      setEmail('');
      setPermissions('');
    }
  }, [userData]);

  useEffect(() => {
    async function getRoles() {
      const { data } = await api.get('/roles');
      setUserTypes(data);
    }

    getRoles();
  }, []);

  function handleInviteSend(e) {
    e.preventDefault();
    const data = {
      email,
      password,
      profile: {
        name,
      },
      permission_id: permissions,
    };

    createInviteRequest(data);
    close();
  }

  return (
    <Modal isOpen={isOpenModal} className="app flex-row align-items-center">
      <ModalHeader>Cadastrar Usuário</ModalHeader>

      <ModalBody className="justify-content-center">
        <Container>
          <Form onSubmit={(e) => handleInviteSend(e)}>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="name">Nome:</Label>
                  <Input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>

              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="name">Tipo de Acesso:</Label>

                  <Input
                    type="select"
                    value={permissions}
                    onChange={(e) => setPermissions(e.target.value)}
                    required
                  >
                    <option value="">Selecione</option>

                    {userTypes.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="email">Email:</Label>

                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>

              <Col xs="12">
                <FormGroup>
                  <Label>Senha:</Label>

                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>

              <div>
                <Button type="submit" color="primary">
                  <i className="cil-save" /> Salvar
                </Button>{' '}
                <Button type="reset" color="danger" onClick={() => close()}>
                  <i className="cil-x" /> Cancelar
                </Button>
              </div>
            </Row>
          </Form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default FormModal;
