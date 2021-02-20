<template>
  <div id="scatter-div"></div>
</template>

<script>
import Scatter from '../../general/scatter';

const data = [
  { x: 1, y: 4.181 },
  { x: 2, y: 4.665 },
  { x: 3, y: 5.296 },
  { x: 4, y: 5.365 },
  { x: 5, y: 5.448 },
  { x: 6, y: 5.744 },
  { x: 7, y: 5.653 },
  { x: 8, y: 5.844 },
  { x: 9, y: 6.362 },
  { x: 10, y: 6.38 },
  { x: 11, y: 6.311 },
  { x: 12, y: 6.457 },
  { x: 13, y: 6.479 },
  { x: 14, y: 6.59 },
  { x: 15, y: 6.74 },
  { x: 16, y: 6.58 },
  { x: 17, y: 6.852 },
  { x: 18, y: 6.531 },
  { x: 19, y: 6.682 },
  { x: 20, y: 7.013 },
  { x: 21, y: 6.82 },
  { x: 22, y: 6.647 },
  { x: 23, y: 6.951 },
  { x: 24, y: 7.121 },
  { x: 25, y: 7.143 },
  { x: 26, y: 6.914 },
  { x: 27, y: 6.941 },
  { x: 28, y: 7.226 },
  { x: 29, y: 6.898 },
  { x: 30, y: 7.392 },
  { x: 31, y: 6.938 }
];

const data1 = [
  {
    'H/A': 'A',
    Team: 'Torino',
    'xG conceded': 0.62,
    'Shot conceded': 10,
    Result: '3'
  },
  {
    'H/A': 'H',
    Team: 'Atalanta',
    'xG conceded': 2.35,
    'Shot conceded': 23,
    Result: '1'
  },
  {
    'H/A': 'A',
    Team: 'Milan',
    'xG conceded': 1.89,
    'Shot conceded': 26,
    Result: '0'
  },
  {
    'H/A': 'H',
    Team: 'Chievo',
    'xG conceded': 1.4,
    'Shot conceded': 13,
    Result: '1'
  },
  {
    'H/A': 'A',
    Team: 'Bologna',
    'xG conceded': 1.02,
    'Shot conceded': 11,
    Result: 0
  },
  {
    'H/A': 'H',
    Team: 'Frosinone',
    'xG conceded': 0.56,
    'Shot conceded': 11,
    Result: '3'
  },
  {
    'H/A': 'H',
    Team: 'Lazio',
    'xG conceded': 1.01,
    'Shot conceded': 16,
    Result: '3'
  },
  {
    'H/A': 'A',
    Team: 'Empoli',
    'xG conceded': 1.56,
    'Shot conceded': 20,
    Result: '3'
  },
  {
    'H/A': 'H',
    Team: 'Spal',
    'xG conceded': 1.8,
    'Shot conceded': 6,
    Result: '0'
  },
  {
    'H/A': 'A',
    Team: 'Napoli',
    'xG conceded': 2.49,
    'Shot conceded': 26,
    Result: '1'
  },
  {
    'H/A': 'A',
    Team: 'Fiorentina',
    'xG conceded': 1.3,
    'Shot conceded': 14,
    Result: '1'
  },
  {
    'H/A': 'H',
    Team: 'Sampdoria',
    'xG conceded': 1.2,
    'Shot conceded': 8,
    Result: '3'
  },
  {
    'H/A': 'A',
    Team: 'Udinese',
    'xG conceded': 1.22,
    'Shot conceded': 9,
    Result: '0'
  },
  {
    'H/A': 'H',
    Team: 'Inter',
    'xG conceded': 2.68,
    'Shot conceded': 17,
    Result: '1'
  },
  {
    'H/A': 'A',
    Team: 'Cagliari',
    'xG conceded': 2.1,
    'Shot conceded': 16,
    Result: '1'
  },
  {
    'H/A': 'H',
    Team: 'Genoa',
    'xG conceded': 1.84,
    'Shot conceded': 15,
    Result: '3'
  },
  {
    'H/A': 'A',
    Team: 'Juventus',
    'xG conceded': 2.12,
    'Shot conceded': 20,
    Result: '0'
  },
  {
    'H/A': 'H',
    Team: 'Sassuolo',
    'xG conceded': 0.72,
    'Shot conceded': 10,
    Result: '3'
  },
  {
    'H/A': 'A',
    Team: 'Parma',
    'xG conceded': 0.58,
    'Shot conceded': 6,
    Result: '3'
  },
  {
    'H/A': 'H',
    Team: 'Torino',
    'xG conceded': 1.87,
    'Shot conceded': 10,
    Result: '3'
  },
  {
    'H/A': 'A',
    Team: 'Atalanta',
    'xG conceded': 2.68,
    'Shot conceded': 23,
    Result: '1'
  },
  {
    'H/A': 'H',
    Team: 'Milan',
    'xG conceded': 0.85,
    'Shot conceded': 8,
    Result: '1'
  },
  {
    'H/A': 'A',
    Team: 'Chievo',
    'xG conceded': 0.84,
    'Shot conceded': 16,
    Result: '3'
  },
  {
    'H/A': 'H',
    Team: 'Bologna',
    'xG conceded': 2.69,
    'Shot conceded': 20,
    Result: '3'
  },
  {
    'H/A': 'A',
    Team: 'Frosinone',
    'xG conceded': 1.51,
    'Shot conceded': 11,
    Result: '3'
  },
  {
    'H/A': 'A',
    Team: 'Lazio',
    'xG conceded': 1.77,
    'Shot conceded': 13,
    Result: '0'
  },
  {
    'H/A': 'H',
    Team: 'Empoli',
    'xG conceded': 0.14,
    'Shot conceded': 5,
    Result: '3'
  },
  {
    'H/A': 'A',
    Team: 'Real Madrid',
    'xG conceded': 3.58,
    'Shot conceded': 30,
    Result: '0'
  },
  {
    'H/A': 'H',
    Team: 'Viktoria Plzen',
    'xG conceded': 0.33,
    'Shot conceded': 7,
    Result: 3
  },
  {
    'H/A': 'H',
    Team: 'CSKA Moscow',
    'xG conceded': 0.73,
    'Shot conceded': 13,
    Result: '3'
  },
  {
    'H/A': 'A',
    Team: 'CSKA Moscow',
    'xG conceded': 1.1,
    'Shot conceded': 14,
    Result: '3'
  },
  {
    'H/A': 'H',
    Team: 'Real Madrid',
    'xG conceded': 1.87,
    'Shot conceded': 12,
    Result: '0'
  },
  {
    'H/A': 'A',
    Team: 'Viktoria Plzen',
    'xG conceded': 1.85,
    'Shot conceded': 13,
    Result: '0'
  },
  {
    'H/A': 'A',
    Team: 'Porto',
    'xG conceded': 3.71,
    'Shot conceded': 31,
    Result: '0'
  },
  {
    'H/A': 'H',
    Team: 'Porto',
    'xG conceded': 0.56,
    'Shot conceded': 7,
    Result: '3'
  }
];

export default {
  mounted() {
    const scatter = new Scatter({
      container: '#scatter-div',
      data: data1,
      xField: 'Shot conceded',
      yField: 'xG conceded',
      colorField: 'Result',
      point: {
        shape: 'star',
        style: {
          fill: 'green'
        }
      },
      label: {},
      width: 800,
      height: 600
    });
    scatter.render();
  }
};
</script>