import React from 'react';
import { Col, FormGroup, Input, Label, Row, TabPane } from 'reactstrap';

const HospitalizationTab = ({
  dados,
  handleChangeDados,
  handleEndDate,
  handleStartDate,
  dateConvert,
  handleMedicine,
}) => (
  <TabPane tabId="3">
    <Row>
      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data 1° Internação:</Label>

          <Input
            name="firstInternDate"
            type="date"
            onChange={handleChangeDados}
            max={new Date().toISOString().slice(0, 10)}
            value={dados.firstInternDate}
          />
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={4}>
        <FormGroup>
          <Label>Unidade 1° Internação:</Label>

          <Input
            name="firstInternUnit"
            type="select"
            onChange={handleChangeDados}
            value={dados.firstInternUnit}
          >
            <option value="">Selecione</option>

            {dados.hospUnits.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data 2° Internação:</Label>

          <Input
            name="secondInternDate"
            type="date"
            onChange={handleChangeDados}
            max={new Date().toISOString().slice(0, 10)}
            value={dados.secondInternDate}
          />
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={4}>
        <FormGroup>
          <Label>Unidade 2° Internação:</Label>

          <Input
            name="secondInternUnit"
            type="select"
            onChange={handleChangeDados}
            value={dados.secondInternUnit}
          >
            <option value="">Selecione</option>

            {dados.hospUnits.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>
    </Row>

    <Row>
      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data Entrada UTI:</Label>

          <Input
            name="utiDateEnter"
            type="date"
            max={new Date().toISOString().slice(0, 10)}
            onChange={handleChangeDados}
            value={dados.utiDateEnter}
          />
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data Saida UTI:</Label>

          <Input
            name="utiDateExit"
            type="date"
            onChange={handleChangeDados}
            value={dados.utiDateExit}
          />
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Suporte Ventilatório:</Label>

          <Input
            name="ventSupport"
            type="select"
            onChange={handleChangeDados}
            value={dados.ventSupport}
          >
            <option value="">Selecione</option>
            <option>Sim</option>
            <option>Não</option>
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Raio-X Torax:</Label>

          <Input
            name="xRay"
            type="select"
            onChange={handleChangeDados}
            value={dados.xRay}
          >
            <option value="">Selecione</option>
            <option>Normal</option>
            <option>Infiltrado intersticial</option>
            <option>Consolidação</option>
            <option>Misto</option>
            <option>Não realizado</option>
            <option>Outro</option>
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data Raio-X:</Label>

          <Input
            name="xRayDate"
            type="date"
            onChange={handleChangeDados}
            value={dados.xRayDate}
          />
        </FormGroup>
      </Col>
    </Row>

    <Row>
      <Col className="px-md-2" md={3}>
        <FormGroup>
          <Label>Evolução caso:</Label>

          <Input
            name="caseEvolution"
            type="select"
            onChange={handleChangeDados}
            value={dados.caseEvolution}
          >
            <option value="">Selecione</option>

            {dados.evolutionResults.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={3}>
        <FormGroup>
          <Label>Class. final:</Label>

          <Input
            name="finalClass"
            type="select"
            onChange={handleChangeDados}
            value={dados.finalClass}
          >
            <option value="">Selecione</option>

            {dados.finalClasses.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={3}>
        <FormGroup>
          <Label>Critério Encerramento:</Label>

          <Input
            name="criterionClosing"
            type="select"
            onChange={handleChangeDados}
            value={dados.criterionClosing}
          >
            <option value="">Selecione</option>

            {dados.closeCrit.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={3}>
        <FormGroup>
          <Label>Data Encerramento:</Label>

          <Input
            type="date"
            name="closingDate"
            max={new Date().toISOString().slice(0, 10)}
            onChange={handleChangeDados}
            value={dados.closingDate}
          />
        </FormGroup>
      </Col>
    </Row>

    <Row>
      {dados.medicines
        .filter((item) => item.is_evolution_medicine !== 0)
        .map((item) => (
          <>
            <Col key={item.id} className="px-md-2" md={2}>
              <FormGroup>
                <Label>{`${item.name}:`}</Label>

                <Input
                  type="select"
                  value={item.checked ? 'Sim' : 'Não'}
                  onChange={(e) => handleMedicine(item.id, e.target.value)}
                >
                  <option>Não</option>
                  <option>Sim</option>
                </Input>
              </FormGroup>
            </Col>

            <Col className="px-md-2" md={2}>
              <FormGroup>
                <Label>Data Inicio:</Label>

                <Input
                  type="date"
                  required={item.checked}
                  value={item.start_date ? dateConvert(item.start_date) : null}
                  onChange={(e) => handleStartDate(item.id, e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col className="px-md-2" md={2}>
              <FormGroup>
                <Label>Data Términio:</Label>

                <Input
                  type="date"
                  required={item.checked}
                  value={item.end_date ? dateConvert(item.end_date) : null}
                  onChange={(e) => handleEndDate(item.id, e.target.value)}
                />
              </FormGroup>
            </Col>
          </>
        ))}
    </Row>
  </TabPane>
);

export default HospitalizationTab;
