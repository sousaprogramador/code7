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
import Loader from '../../components/CircularLoading';

const whatsLink =
  'https://api.whatsapp.com/send?phone=556391053625&text=Oi%20tele%20covidhttps://api.whatsapp.com/send?phone=556391053625&text=Oi%20tele%20covid';
const instaLink = 'https://instagram.com/nossaaraguaina';
const faceLink = 'https://www.facebook.com/CapitalEconomicaDoTocantins';

export default function Album() {
  const [graphData, setGraphData] = useState(null);
  const [bySex, setBySex] = useState([]);
  const [byAge, setByAge] = useState([]);
  const [loading, setLoading] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const { data } = await api.get('/home/graphics');
      setGraphData(data);

      if (data && data.total_range_infected) {
        const ages = [['Idades', 'Casos']];
        data.total_range_infected.map((item) => {
          if (item.range_string !== null) {
            const dt = [item.range_string, item.total];
            ages.push(dt);
          }
        });
        setByAge(ages);
      }

      if (data && data.infected_cases) {
        const sexs = [['Idades', 'Casos']];
        data.infected_cases.map((item) => {
          if (item.sex !== null && item.sex !== 'Ignorado') {
            const dt = [item.sex, item.total];
            sexs.push(dt);
          }
        });
        setBySex(sexs);
      }
      setLoading(false);
    }
    getData();
  }, []);

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
          bgcolor="#788DFF"
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
                        style={{ color: '#788DFF', fontWeight: '700' }}
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
                        {graphData ? graphData.total_recovered : '0'}
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
                        {graphData ? graphData.total_infected_cases : '0'}
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
                        {graphData ? graphData.total_deaths : '0'}
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

                      <Chart
                        width="100%"
                        height="300px"
                        chartType="Bar"
                        loader={<Loader />}
                        data={byAge}
                        options={{
                          legend: { position: 'none' },
                        }}
                      />
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

                      <Chart
                        width="100%"
                        height="300px"
                        chartType="PieChart"
                        loader={<Loader />}
                        data={bySex}
                        options={{
                          legend: 'none',
                          pieSliceText: 'label',
                          chartArea: {
                            width: 300,
                            height: 300,
                          },
                        }}
                      />
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
                      Lave frequentemente as mãos.
                    </Typography>

                    <Divider />

                    <img className={styles.care} alt="House" src={WashHands} />
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
                      Prefira ficar em casa.
                    </Typography>

                    <Divider />

                    <img className={styles.care} alt="House" src={House} />
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
}
