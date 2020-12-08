import React from 'react';
import { Col, FormGroup, Input, Label, Row, TabPane } from 'reactstrap';
import Select from 'react-select';

const ConsultTab = ({
  dados,
  handleChangeDados,
  handleChange,
  handleMedicine,
}) => (
  <TabPane tabId="2">
    <h5>Consulta:</h5>
    <Row>
      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data 1° consulta:</Label>

          <Input
            type="date"
            name="firsConsultDat"
            max={new Date().toISOString().slice(0, 10)}
            onChange={handleChangeDados}
            value={dados.firsConsultDat}
          />
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={4}>
        <FormGroup>
          <Label>Local 1° consulta:</Label>

          <Input
            type="select"
            name="firsConsultUnit"
            onChange={handleChangeDados}
            value={dados.firsConsultUnit}
          >
            <option value="">Selecione</option>

            {dados.consultUnits.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data 2° consulta:</Label>

          <Input
            type="date"
            name="secondConsultDat"
            onChange={handleChangeDados}
            max={new Date().toISOString().slice(0, 10)}
            value={dados.secondConsultDat}
          />
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={4}>
        <FormGroup>
          <Label>Local 2° consulta:</Label>

          <Input
            type="select"
            name="secondConsultUnit"
            onChange={handleChangeDados}
            value={dados.secondConsultUnit}
          >
            <option value="">Selecione</option>

            {dados.consultUnits.map((item) => (
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
          <Label>Data Teste Ráp:</Label>

          <Input
            type="date"
            name="fastTestDate"
            max={new Date().toISOString().slice(0, 10)}
            onChange={handleChangeDados}
            value={dados.fastTestDate}
          />
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Teste Rápido:</Label>

          <Input
            type="select"
            name="fastTest"
            onChange={handleChangeDados}
            value={dados.fastTest}
          >
            <option value="">Selecione</option>
            {dados.tests.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Resul. Teste Ráp:</Label>

          <Input
            name="fastTestResult"
            type="select"
            onChange={handleChangeDados}
            value={dados.fastTestResult}
          >
            <option value="">Selecione</option>
            <option>Aguardando</option>
            <option>Positivo</option>
            <option>Negativo</option>
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data coleta SWAB:</Label>

          <Input
            type="date"
            name="swabDate"
            max={new Date().toISOString().slice(0, 10)}
            onChange={handleChangeDados}
            value={dados.swabDate}
          />
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Resultado SWAB:</Label>

          <Input
            type="select"
            name="swabResult"
            onChange={handleChangeDados}
            value={dados.swabResult}
          >
            <option value="">Selecione</option>
            <option>Aguardando</option>
            <option>Positivo</option>
            <option>Negativo</option>
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data result. SWAB:</Label>

          <Input
            name="swabResultDate"
            type="date"
            onChange={handleChangeDados}
            max={new Date().toISOString().slice(0, 10)}
            value={dados.swabResultDate || null}
          />
        </FormGroup>
      </Col>
    </Row>

    <Row>
      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data ECG:</Label>

          <Input
            name="dateEcg"
            type="date"
            max={new Date().toISOString().slice(0, 10)}
            value={dados.dateEcg}
            onChange={handleChangeDados}
          />
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>QTC:</Label>

          <Input
            name="qtc"
            type="select"
            value={dados.qtc}
            onChange={handleChangeDados}
          >
            <option>Não</option>
            <option>Sim</option>
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data ELISA igM:</Label>

          <Input
            name="elisaDate"
            type="date"
            onChange={handleChangeDados}
            max={new Date().toISOString().slice(0, 10)}
            value={dados.elisaDate}
          />
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Resultado ELISA igM:</Label>

          <Input
            name="elisaResult"
            type="select"
            onChange={handleChangeDados}
            value={dados.elisaResult}
          >
            <option value="">Selecione</option>
            <option>Aguardando</option>
            <option>Positivo</option>
            <option>Negativo</option>
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data result. ELISA igM:</Label>

          <Input
            name="elisaResultDate"
            type="date"
            onChange={handleChangeDados}
            max={new Date().toISOString().slice(0, 10)}
            value={dados.elisaResultDate}
          />
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data ECLIA igG:</Label>

          <Input
            name="ecliaDate"
            type="date"
            onChange={handleChangeDados}
            max={new Date().toISOString().slice(0, 10)}
            value={dados.ecliaDate}
          />
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Resultado ECLIA igG:</Label>

          <Input
            name="ecliaResult"
            type="select"
            onChange={handleChangeDados}
            value={dados.ecliaResult}
          >
            <option value="">Selecione</option>
            <option>Aguardando</option>
            <option>Positivo</option>
            <option>Negativo</option>
          </Input>
        </FormGroup>
      </Col>

      <Col className="px-md-2" md={2}>
        <FormGroup>
          <Label>Data result. ECLIA igG:</Label>

          <Input
            name="ecliaResultDate"
            type="date"
            onChange={handleChangeDados}
            max={new Date().toISOString().slice(0, 10)}
            value={dados.ecliaResultDate}
          />
        </FormGroup>
      </Col>
    </Row>

    <h5>Medicação:</h5>

    <Row>
      {dados.medicines
        .filter((i) => i.is_evolution_medicine !== 1)
        .map((i) => (
          <>
            <Col key={i.id} className="px-md-2" md={2}>
              <FormGroup>
                <Label>{`${i.name}:`}</Label>

                <Input
                  type="select"
                  value={i.checked ? 'Sim' : 'Não'}
                  onChange={(e) => handleMedicine(i.id, e.target.value)}
                >
                  <option>Não</option>
                  <option>Sim</option>
                </Input>
              </FormGroup>
            </Col>

            {i.adverse_effects.length > 0 && (
              <Col key={i.id} className="px-md-2" md={6}>
                <FormGroup>
                  <Label>Efeitos adversos:</Label>

                  <Select
                    isMulti
                    placeholder="Selecione"
                    value={i.effects}
                    noOptionsMessage="Sem mais opções"
                    onChange={(e) => handleChange(i.id, e)}
                    options={i.adverse_effects.map((i) => i)}
                  />
                </FormGroup>
              </Col>
            )}
          </>
        ))}
    </Row>
  </TabPane>
);

export default ConsultTab;
