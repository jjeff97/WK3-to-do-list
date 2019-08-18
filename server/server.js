const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;


const tasksRouter = require('./routes/tasks.routes');
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/tasks', tasksRouter);

app.listen(port, () => {
  console.log('listening on port', port);
});





