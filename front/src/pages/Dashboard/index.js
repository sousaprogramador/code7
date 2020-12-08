import React, { useState, useEffect, memo } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Bar, Pie } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Typography } from '@material-ui/core';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import CardContent from '@material-ui/core/CardContent';

import { Creators as DashboardActions } from 'store/ducks/dashboard';
import Loading from 'components/CircularLoading';

import { useStyles } from './styles';

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
};

const Dashboard = ({ dataRequest }) => {
  const [agesLabels, setAgeLabels] = useState([]);
  const [agesData, setAgeData] = useState([]);
  const [sexCount, setSexCount] = useState([]);
  const [infected, setInfected] = useState(0);
  const [recoverd, setRecovered] = useState(0);
  const [death, setDeath] = useState(0);
  const [notif, setNotif] = useState(0);
  const [suspect, setSuspect] = useState(0);
  const [discarted, setDiscarted] = useState(0);
  const data = useSelector((state) => state.dashboard.data);
  const loading = useSelector((state) => state.dashboard.loading);
  const styles = useStyles();

  useEffect(() => {
    dataRequest();
  }, []);

  useEffect(() => {
    if (!loading && data && data.total_infectados_idade) {
      const ranges = [];
      const total = [];

      data.total_infectados_idade.map((item) => {
        if (item.name !== null) {
          ranges.push(item.name);
          total.push(item.total);
        }
      });

      setAgeLabels(ranges);
      setAgeData(total);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && data && data.infectados) {
      setSexCount([data.infectados.masculino, data.infectados.feminino]);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && data && data.infectados) {
      setInfected(
        data.infectados.total > 0 ? data.infectados.total.toLocaleString() : 0,
      );
      setRecovered(
        data.total_curados > 0 ? data.total_curados.toLocaleString() : 0,
      );
      setDeath(data.obitos.total > 0 ? data.obitos.total.toLocaleString() : 0);
      setNotif(
        data.total_notificacao > 0
          ? data.total_notificacao.toLocaleString()
          : 0,
      );
      setSuspect(
        data.total_suspeitos > 0 ? data.total_suspeitos.toLocaleString() : 0,
      );
      setDiscarted(
        data.total_descartados > 0
          ? data.total_descartados.toLocaleString()
          : 0,
      );
    }
  }, [data]);

  return loading ? (
    <Loading />
  ) : (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" lg="4">
          <Card className={styles.card}>
            <CardBody className={styles.cardConfirm}>
              <Typography
                style={{ color: '#ff6f00', fontWeight: '700' }}
                gutterBottom
                variant="h5"
                component="h2"
              >
                Confirmados
              </Typography>

              <Typography
                style={{ fontWeight: 'bold', color: '#616161' }}
                component="h2"
                variant="h2"
              >
                {infected || '0'}
              </Typography>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="4">
          <Card className={styles.card}>
            <CardBody className={styles.cardRecovered}>
              <Typography
                style={{ color: '#00A785', fontWeight: '700' }}
                gutterBottom
                variant="h5"
                component="h2"
              >
                Recuperados
              </Typography>

              <Typography
                style={{ fontWeight: 'bold', color: '#616161' }}
                component="h2"
                variant="h2"
              >
                {recoverd || '0'}
              </Typography>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="4">
          <Card className={styles.card}>
            <CardBody className={styles.cardDead}>
              <Typography
                style={{ color: '#512da8', fontWeight: '700' }}
                gutterBottom
                variant="h5"
                component="h2"
              >
                Óbitos
              </Typography>

              <Typography
                style={{ fontWeight: 'bold', color: '#616161' }}
                component="h2"
                variant="h2"
              >
                {death || '0'}
              </Typography>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="4">
          <Card className={styles.card}>
            <CardBody className={styles.cardNotif}>
              <Typography
                style={{ color: '#33691e', fontWeight: '700' }}
                gutterBottom
                variant="h5"
                component="h2"
              >
                Notificações
              </Typography>

              <Typography
                style={{ fontWeight: 'bold', color: '#616161' }}
                component="h2"
                variant="h2"
              >
                {notif || '0'}
              </Typography>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="4">
          <Card className={styles.card}>
            <CardBody className={styles.cardSuspect}>
              <Typography
                style={{ color: '#ffab00', fontWeight: '700' }}
                gutterBottom
                variant="h5"
                component="h2"
              >
                Suspeitos
              </Typography>

              <Typography
                style={{ fontWeight: 'bold', color: '#616161' }}
                component="h2"
                variant="h2"
              >
                {suspect || '0'}
              </Typography>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="4">
          <Card className={styles.card}>
            <CardBody className={styles.cardDiscarted}>
              <Typography
                style={{ color: '#0d47a1', fontWeight: '700' }}
                gutterBottom
                variant="h5"
                component="h2"
              >
                Descartado
              </Typography>

              <Typography
                style={{ fontWeight: 'bold', color: '#616161' }}
                component="h2"
                variant="h2"
              >
                {discarted || '0'}
              </Typography>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs="12" sm="6" lg="6">
          <Card>
            <CardHeader>
              Casos por Idades
              <div className="card-header-actions" />
            </CardHeader>
            <CardContent>
              <CardBody>
                <div className="chart-wrapper">
                  {!loading && (
                    <Bar
                      data={{
                        labels: agesLabels,
                        datasets: [
                          {
                            label: 'Idades',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(0,167,133,0.65)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: agesData,
                          },
                        ],
                      }}
                      options={options}
                    />
                  )}
                </div>
              </CardBody>
            </CardContent>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="6">
          <Card>
            <CardHeader>Casos por Sexo</CardHeader>
            <CardContent>
              <CardBody>
                <div className="chart-wrapper">
                  <Pie
                    data={{
                      labels: ['Masculino', 'Feminino'],
                      datasets: [
                        {
                          data: sexCount,
                          backgroundColor: ['#e83e8c', '#63c2de'],
                          hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                        },
                      ],
                    }}
                  />
                </div>
              </CardBody>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...DashboardActions }, dispatch);

export default connect(null, mapDispatchToProps)(Dashboard);
