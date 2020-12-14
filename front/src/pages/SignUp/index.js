import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Label,
} from 'reactstrap';

import { Creators as AuthActions } from '../../store/ducks/auth';
import Logo from '../../assets/logo.png';

const SignUp = ({ signInRequest }) => {
  useEffect(() => {
    document.title = 'Code7';
  }, []);

  const [state, setState] = useState({ name: '', email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    signInRequest({ ...state });
  }

  function handleInput(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="5">
            <CardGroup>
              <Card className="p-4">
                <div align="center">
                  <img
                    src={Logo}
                    alt="Logo Code7"
                    className="center"
                    width={140}
                    height={140}
                  />
                </div>
                <CardBody>
                  <Form onSubmit={(e) => handleSubmit(e)}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input
                        name="name"
                        type="text"
                        required
                        placeholder="Nome"
                        onChange={(e) => handleInput(e)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        onChange={(e) => handleInput(e)}
                      />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        required
                        autoComplete="current-password"
                        onChange={(e) => handleInput(e)}
                      />
                    </InputGroup>

                    <Button
                      size="lg"
                      block
                      color="primary"
                      className="px-4"
                      type="submit"
                    >
                      ENTRAR
                    </Button>
                  </Form>
                  <Label />
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...AuthActions }, dispatch);
export default connect(null, mapDispatchToProps)(SignUp);
