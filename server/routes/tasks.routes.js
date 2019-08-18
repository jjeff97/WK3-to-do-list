const express = require('express');
const pool = require('../modules/pool');

// storing express router in a variable to use on our routes
const router = express.Router();

// GETs all of the songs from our database and sends it back to the requesting client
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "tasks";';

    pool.query(queryText)
        .then((result) => {
            console.log(result)
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error: ', err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `INSERT INTO "tasks" ("description", "due_date", )
                        VALUES ($1, $2);`;
    
    pool.query(queryText, [newTask.description, newTask.dueDate,])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error posting: ', err);
            res.sendStatus(500);
        });

});

router.delete('/delete/:id', (req, res) => {
    console.log(req.params);

    const queryText = `DELETE FROM "tasks" WHERE id=$1`;

    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error deleting: ', err);
            res.sendStatus(500);
        });
})

router.put('/description/:id', (req, res) => {
    const taskObject = req.body;
    const taskId = req.params.id;

    const queryText = `UPDATE "tasks" SET "description"=$1 WHERE id=$2;`;

    pool.query(queryText, [taskObject.description, taskId])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error updating database: ', err);
            res.sendStatus(500);
        });
});
module.exports = router;
