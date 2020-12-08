import React, { memo } from 'react';
import { Col, FormGroup, Input, Label, Row, TabPane } from 'reactstrap';

const ClinicTab = memo(
  ({
    dados,
    handleChangeDados,
    handleSymptopm,
    handleConditions,
    units,
    notifData,
    handleChange,
  }) => (
    <TabPane tabId="1">
      <h5>Notificação:</h5>

      <Row>
        <Col md={3}>
          <FormGroup>
            <Label>Número:*</Label>

            <Input
              name="number"
              type="text"
              value={notifData.number}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col className="px-md-2" md={3}>
          <FormGroup>
            <Label>Data:</Label>

            <Input
              name="date"
              type="date"
              max={new Date().toISOString().slice(0, 10)}
              onChange={handleChange}
              value={notifData.date}
            />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>Unidade notificadora:*</Label>

            <Input
              name="reporting_unit_id"
              type="select"
              onChange={handleChange}
              value={notifData.reporting_unit_id || ''}
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
              name="symptom_onset_date"
              type="date"
              onChange={handleChange}
              max={new Date().toISOString().slice(0, 10)}
              value={notifData.symptom_onset_date || ''}
            />
          </FormGroup>
        </Col>
      </Row>

      <h5>Sintomas:</h5>

      <Row>
        {dados.symptoms.map((i) => (
          <Col key={i.id} className="px-md-2" md="2" sm="12" lg="2">
            <FormGroup>
              <Label style={{ whiteSpace: 'nowrap' }}>{i.name}</Label>

              <Input
                type="select"
                value={i.checked ? 'Sim' : 'Não'}
                onChange={(e) => handleSymptopm(i.id, e.target.value)}
              >
                <option>Não</option>
                <option>Sim</option>
              </Input>
            </FormGroup>
          </Col>
        ))}
      </Row>

      <h5>Condições:</h5>

      <Row>
        {dados.conditions.map((i) => (
          <Col key={i.name} className="px-md-2" md="2" sm="12" lg="2">
            <FormGroup>
              <Label style={{ whiteSpace: 'nowrap' }}>{i.name}</Label>

              <Input
                type="select"
                value={i.checked ? 'Sim' : 'Não'}
                onChange={(e) => handleConditions(i.id, e.target.value)}
              >
                <option>Não</option>
                <option>Sim</option>
              </Input>
            </FormGroup>
          </Col>
        ))}

        <Col md={10}>
          <FormGroup>
            <Label>Outros:</Label>

            <Input
              name="note"
              value={dados.note}
              type="text"
              onChange={handleChangeDados}
            />
          </FormGroup>
        </Col>
      </Row>
    </TabPane>
  ),
);

export default ClinicTab;
