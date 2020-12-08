import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import { Chart } from 'react-google-charts';
import ReactPlayer from 'react-player';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Bar, Pie } from 'react-chartjs-2';
import { CardBody, CardHeader, Col, Row } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { useStyles } from './styles';
import logo from '../../assets/logo-pref.png';
import House from '../../assets/housebl.svg';
import SocialDistancing from '../../assets/social_distancingbl.svg';
import WashHands from '../../assets/wash_handsbl.svg';
import smallLogo from '../../assets/small-logo.jpg';
import bottomLogo from '../../assets/bottomlogo.png';
import barText from '../../assets/barLogo.svg';
import barPic from '../../assets/bar-pic2.png';
import whats from '../../assets/whatsapp.svg';
import insta from '../../assets/instagram.svg';
import face from '../../assets/facebook.svg';

import api from '../../services/api';
import { Creators as DashboardActions } from '../../store/ducks/dashboard';
import Loader from '../../components/CircularLoading';

const whatsLink =
  'https://api.whatsapp.com/send?phone=556391053625&text=Oi%20tele%20covidhttps://api.whatsapp.com/send?phone=556391053625&text=Oi%20tele%20covid';
const instaLink = 'https://instagram.com/nossaaraguaina';
const faceLink = 'https://www.facebook.com/CapitalEconomicaDoTocantins';

//Bhayron Here!!
const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
};

const Home = ({ dataRequest }) => {
  const [agesLabels, setAgeLabels] = useState([]);
  const [agesData, setAgeData] = useState([]);
  const [sexCount, setSexCount] = useState([]);
  const [infected, setInfected] = useState(0);
  const [recoverd, setRecovered] = useState(0);
  const [death, setDeath] = useState(0);
  const data = useSelector((state) => state.dashboard.data);
  const loading = useSelector((state) => state.dashboard.loading);
  const styles = useStyles();

  useEffect(() => {
    dataRequest();
  }, []);

  useEffect(() => {
    if (!loading && data && data.total_range_infected) {
      const ranges = [];
      const total = [];

      data.total_range_infected.map((item) => {
        if (item.range_string !== null) {
          ranges.push(item.range_string);
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

  return (
    <>
      <CssBaseline />
      <AppBar className={styles.bar} position="fixed">
        <Toolbar>
          <div className={styles.tolbar}>
            <Hidden mdUp>
              <img className={styles.logo} alt="logo" src={smallLogo} />
            </Hidden>

            <Hidden smDown>
              <img className={styles.logo} alt="logo" src={logo} />
            </Hidden>

            <div className={styles.buttonDiv}>
              <Link to="/maintenance" className={styles.barButton} href="/">
                Área do Paciente
              </Link>

              <Link className={styles.barButton} to="/dashboard">
                Acesso Restrito
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <main className={styles.container}>
        <Box
          style={{ paddingLeft: 10 }}
          display="flex"
          flexDirection="row"
          bgcolor="#016aac"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width="50%">
            <img className={styles.barPicText} alt="text" src={barText} />
          </Box>
          <img className={styles.barResponsive} alt="pic" src={barPic} />
        </Box>

        <Box bgcolor="white">
          <h4 className={styles.title}>Boletim Epidemiológico</h4>
        </Box>

        {loading ? (
          <Loader />
        ) : (
          <>
            <Container className={styles.cardGrid} maxWidth="lg">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={styles.card}>
                    <CardContent className={styles.cardRecovered}>
                      <Typography
                        style={{ color: '#016aac', fontWeight: '700' }}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        Casos Recuperados
                      </Typography>

                      <Typography
                        style={{ fontWeight: 'bold', color: '#616161' }}
                        component="h2"
                        variant="h2"
                      >
                        {recoverd || '0'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card className={styles.card}>
                    <CardContent className={styles.cardConfirm}>
                      <Typography
                        style={{ color: '#ffca28', fontWeight: '700' }}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        Casos Confirmados
                      </Typography>

                      <Typography
                        style={{ fontWeight: 'bold', color: '#616161' }}
                        variant="h2"
                      >
                        {infected || '0'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card className={styles.card}>
                    <CardContent className={styles.cardDead}>
                      <Typography
                        style={{ color: '#512da8', fontWeight: '700' }}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        Óbitos Confirmados
                      </Typography>

                      <Typography
                        style={{ fontWeight: 'bold', color: '#616161' }}
                        variant="h2"
                      >
                        {death || '0'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>

            <Container className={styles.cardGrid} maxWidth="lg">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6}>
                  <Card className={styles.card}>
                    <CardContent className={styles.cardContent}>
                      <Typography
                        style={{ color: '#767676', fontWeight: '700' }}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        Casos por Idade
                      </Typography>
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
                                    pointHoverBorderColor:
                                      'rgba(220,220,220,1)',
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
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Card className={styles.card}>
                    <CardContent className={styles.cardContent}>
                      <Typography
                        style={{ color: '#767676', fontWeight: '700' }}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        Casos por Sexo
                      </Typography>
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
                </Grid>
              </Grid>
            </Container>
          </>
        )}

        <Container maxWidth="lg">
          <iframe
            title="Map"
            className={styles.iframe}
            src="https://www.arcgis.com/apps/MapJournal/index.html?appid=4ea1f4da28224c9eb54640a4bf354446"
          />
        </Container>

        <div className={styles.videoFO}>
          <div className={styles.videoMask}>
            <Box>
              <h4 className={styles.titleVideos}>Vídeos</h4>

              <Container className={styles.cardGridVideos} maxWidth="lg">
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Card width="100%" height="25vw">
                      <ReactPlayer
                        width="100%"
                        url="https://www.youtube.com/watch?v=sTPTBHs4oKs"
                      />
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Card width="100%" height="25vw">
                      <ReactPlayer
                        width="100%"
                        url="https://www.youtube.com/watch?v=0rCj0Cqha1M"
                      />
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </div>
        </div>

        <h4 className={styles.title2}>Perguntas Frequentes</h4>

        <Container className={styles.cardGridVideos} maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={styles.cardTips}>
                <CardContent className={styles.cardContent}>
                  <Typography
                    style={{ color: '#616161', fontWeight: 'bold' }}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    Qual é o tempo de incubação do novo coronavírus?
                  </Typography>

                  <Divider />

                  <Typography
                    style={{ fontWeight: '14', color: '#616161' }}
                    component="h6"
                    variant="h6"
                  >
                    O &quot;período de incubação&quot; se refere ao tempo entre
                    a infecção do ser humano pelo vírus e o início dos sintomas
                    da doença. De acordo com a Organização Mundial da Saúde
                    (OMS), no caso da Covid-19 esse intervalo varia de 1 a 14
                    dias, geralmente ficando em torno de 5 dias.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card className={styles.cardTips}>
                <CardContent className={styles.cardContent}>
                  <Typography
                    style={{ color: '#616161', fontWeight: 'bold' }}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    Qual é a recomendação para quem suspeite que pode estar com
                    o coronavírus?
                  </Typography>

                  <Divider />

                  <Typography
                    style={{ fontWeight: '14', color: '#616161' }}
                    variant="h6"
                  >
                    Em 80% dos casos, os sintomas de coronavírus são leves,
                    semelhantes a uma gripe. Nestes casos, o essencial, segundo
                    a Organização Mundial da Saúde, é evitar sair de casa. O
                    Ministério da Saúde recomenda ficar em repouso e tomar
                    bastante água.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card className={styles.cardTips}>
                <CardContent className={styles.cardContent}>
                  <Typography
                    style={{ color: '#616161', fontWeight: 'bold' }}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    Quais são as pessoas consideradas como grupo de risco?
                  </Typography>

                  <Divider />

                  <Typography
                    style={{ fontWeight: '14', color: '#616161' }}
                    variant="h6"
                  >
                    Pessoas com anemia falciforme, problemas respiratórios,
                    fumantes de longa data, hipertensos, diabéticos, pessoas com
                    doenças crônicas e idosos devem ter um cuidado ainda maior.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <div className={styles.footer}>
          <div className={styles.footerMask}>
            <Box>
              <h4 className={styles.titleVideos}>Contato e Informações</h4>

              <Container className={styles.cardGridVideos} maxWidth="lg">
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6} md={4}>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className={styles.cardIc}
                      href={whatsLink}
                    >
                      <img className={styles.icons} alt="House" src={whats} />

                      <Typography
                        style={{
                          color: '#767676',
                          fontWeight: 'bold',
                          marginLeft: 10,
                        }}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        Tele Covid
                        <br />
                        (63) 99105-3625
                      </Typography>
                    </a>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className={styles.cardIc}
                      href={instaLink}
                    >
                      <img className={styles.icons} alt="House" src={insta} />
                      <Typography
                        style={{
                          color: '#767676',
                          fontWeight: 'bold',
                          marginLeft: 10,
                        }}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        Instagram
                        <br />
                        @nossaaraguaina
                      </Typography>
                    </a>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className={styles.cardIc}
                      href={faceLink}
                    >
                      <img className={styles.icons} alt="House" src={face} />

                      <Typography
                        style={{
                          color: '#767676',
                          fontWeight: 'bold',
                          marginLeft: 10,
                        }}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        Facebook
                        <br />
                        capitaleconomica
                      </Typography>
                    </a>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </div>
        </div>

        <Container>
          <h4 className={styles.title2}>Cuidados</h4>

          <Container className={styles.cardGridVideos} maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={styles.card}>
                  <CardContent className={styles.cardContent}>
                    <Typography
                      className={styles.cardContent}
                      style={{ color: '#767676', fontWeight: 'bold' }}
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Prefira ficar em casa.
                    </Typography>

                    <Divider />

                    <img className={styles.care} alt="House" src={House} />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card className={styles.card}>
                  <CardContent className={styles.cardContent}>
                    <Typography
                      className={styles.cardContent}
                      style={{ color: '#767676', fontWeight: 'bold' }}
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Use máscara em público.
                    </Typography>

                    <Divider />

                    <img
                      className={styles.care}
                      alt="House"
                      src={SocialDistancing}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={styles.card}>
                  <CardContent className={styles.cardContent}>
                    <Typography
                      className={styles.cardContent}
                      style={{ color: '#767676', fontWeight: 'bold' }}
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Lave frequentemente as mãos.
                    </Typography>

                    <Divider />

                    <img className={styles.care} alt="House" src={WashHands} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerMask}>
          <img src={bottomLogo} alt="bottom-logo" />
        </div>
      </footer>
    </>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...DashboardActions }, dispatch);

export default connect(null, mapDispatchToProps)(Home);
