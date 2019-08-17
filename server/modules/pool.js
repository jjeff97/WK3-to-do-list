const pg = require('pg');

// CREATING POOL :: setup pg settings to be used with pool to connect to the database
const Pool = pg.Pool;
const pool = new Pool({
    database: 'to-do-list', // the name of database, This can Change!
    host: 'localhost', // where is the database (changes when you deploy)
    port: 5432, // the port for your database, 5432 is default Postgres port
    max: 10, // how many connections (queries) at one time
    idleTimeoutMillis: 30000, // 30 second to try to connect, otherwise cancel query (value is in milliseconds)
});


pool.on('connect', () => {
    console.log('Pool is connected');
})


pool.on('error', (error) => {
    console.log('Oh NO ERROR: ', error);
});

module.exports = pool;