const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true,
};

const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

// GET /api/cohorts
server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET /api/cohorts/:id
server.get('/api/cohorts/:id', async (req, res) => {
  try {
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST /api/cohorts
server.post('/api/cohorts', async (req, res) => {
    try {
      const cohort = await db('cohorts')
        .insert(req.body);
      res.status(201).json({message: "Your cohort has been successfully added!"})
    } catch (error) {
      res.status(500).json({error: 'Failed to add a new cohort to the database :('})
    }
  }
);
  
  // PUT /api/cohorts/:id
  server.put('/api/cohorts/:id', async (req, res) => {
    try {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .update(req.body)
        .first()
      res.status(200).json({message: "Your cohort has been successfully updated!"});
    } catch (error) {
      res.status(500).json({error: 'Failed to update the cohort informations.'})
    }
  }
);
  
  // DELETE /api/cohorts/:id
  server.delete('/api/cohorts/:id', async (req, res) => {
    try {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .delete();
      res.status(202).json({message: 'The cohort has been successfully deleted'})
    } catch (error) {
      res.status(500).json({error: 'Failed to delete the specified cohort'})
    }
  }
);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\nServer is running on PORT ${port}\n`));