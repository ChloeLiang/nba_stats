const pg = require('pg');

const configs = {
  user: 'liangxin',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432
};

const client = new pg.Client(configs);
const queries = [
  `SELECT * FROM players WHERE team = 'NYK'`,
  `SELECT * FROM players WHERE team = 'IND' AND age < 26`,
  `SELECT * FROM players ORDER BY points`,
  `SELECT * FROM players WHERE team = 'NYK' AND points > 1000`,
  `SELECT * FROM players WHERE team = 'CHI' AND points < 300`,
  `SELECT team from players WHERE points < 2`,
  `SELECT AVG(age) FROM players`
];

client.connect(err => {
  if (err) {
    console.log(err.message);
  }

  queries.forEach(queryString => {
    client.query(queryString, (err, res) => {
      if (err) {
        console.log('query err:', err.message);
      } else {
        console.log(queryString);
        console.log('============');
        console.log(res.rows);
      }
    });
  });

});
