const pg = require('pg');
const jsonfile = require('jsonfile');

const file = 'players.json';
const configs = {
  user: 'liangxin',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432
};

const client = new pg.Client(configs);

client.connect(err => {
  if (err) {
    console.log(err.message);
  }

  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log(err);
    }

    const queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    obj.players.forEach(player => {
      const values = Object.values(player);
      client.query(queryString, values, (err, res) => {
        if (err) {
          console.log('query error', err.message);
        } else {
          console.log(res.rows[0]);
        }
      });
    });
  });
});
