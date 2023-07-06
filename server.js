// // Stage 1: Stub out the API
// const express = require('express')
// const router = express.Router()

// const app = express()
// const port = process.env.PORT || 3333

// router.get('/', async (req, res) => {
//   res.send(`Hello, World!`)
// })

// app.use('/', router)

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

// // Get all favorited quotes
// // Mock favorite quotes
// router.get('/quotes', async (req, res) => {
//   res.send([
//     {
//       id: 1,
//       quote: "I'm Batman",
//     },
//     {
//       id: 2,
//       quote: "I'm the Joker",
//     },
//   ])
// })

// // Generate a new quote
// //  Mock Quote
// router.get('/quotes/new', async (req, res) => {
//   res.send({
//     id: 1,
//     quote: "I'm Batman",
//   })
// })

// // Favorite a quote
// // Mock Quote added
// router.post('/quotes/:id/favorite', async (req, res) => {
//   // Here is where we will add the quote to the database
//   // For now we will just return the quote
//   res.send({
//     id: req.params.id,
//     quote: req.body.quote,
//   })
// })

// // Remove a quote from favorites
// router.delete('/quotes/:id/favorite', async (req, res) => {
//   // Here is where we will remove the quote from the database
//   // For now we will just return the quote
//   res.send({
//     id: req.params.id,
//     quote: req.body.quote,
//   })
// })

// Stage 2: Setup the database
// const express = require('express')
// const pg = require('pg')
// const router = express.Router()

// // Database Setup
// const { Client } = pg // imports the Client class from pg
// const client = new Client({
//   connectionString:
//     'postgresql://postgres:jGIUrmoBCP8nP4k2xxfx@containers-us-west-167.railway.app:6254/railway',
// }) // instantiates the Client class

// // Express Setup
// const app = express()
// const port = process.env.EXPRESS_PORT || 3000
// console.log('port', port)

// // We need to add a middleware to express that will allow us to parse JSON from the request body
// // This will allow us to get the quote from the request body
// app.use(express.json())

// router.get('/', async (req, res) => {
//   await client.connect() // establishes connection to the database
//   // test the database connection
//   try {
//     const result = await client.query('SELECT * FROM quotes')
//     const results = { results: result ? result.rows : null }
//     res.send(results)
//   } catch (err) {
//     console.error(err)
//     res.send('Error ' + err)
//   } finally {
//     await client.end()
//   }
// })

// app.use('/', router)

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

// // Get all favorited quotes
// // Mock favorite quotes
// router.get('/quotes', async (req, res) => {
//   res.send([
//     {
//       id: 1,
//       quote: "I'm Batman",
//     },
//     {
//       id: 2,
//       quote: "I'm the Joker",
//     },
//   ])
// })

// // Generate a new quote
// // //  Mock Quote
// router.get('/quotes/new', async (req, res) => {
//   res.send({
//     id: 1,
//     quote: "I'm Batman",
//   })
// })

// // Favorite a quote
// // Mock Quote added
// router.post('/quotes/:id/favorite', async (req, res) => {
//   // Here is where we will add the quote to the database
//   // For now we will just return the quote
//   let id = req.params.id
//   let quote = req.body.quote

//   res.send({
//     id,
//     quote,
//   })
// })

// // Remove a quote from favorites
// router.delete('/quotes/:id/favorite', async (req, res) => {
//   // Here is where we will remove the quote from the database
//   // For now we will just return the quote
//   let id = req.params.id
//   let quote = req.body.quote

//   res.send({
//     id,
//     quote,
//   })
// })

// Stage 3: Setup the database

// Run the following queries on the railway interface

// Create a new table
// CREATE TABLE quotes (
//   id SERIAL PRIMARY KEY,
//   quote TEXT NOT NULL
// );

// Insert a new quote
// INSERT INTO quotes (quote) VALUES ('I am Batman');

// // Stage 4: Connect the API to the database
// const express = require('express')
// const pg = require('pg')
// const router = express.Router()

// // Database Setup
// const { Pool } = pg // imports the Pool class from pg
// const pool = new Pool({
//   connectionString:
//     'postgresql://postgres:jGIUrmoBCP8nP4k2xxfx@containers-us-west-167.railway.app:6254/railway',
// }) // instantiates the Pool class

// // Express Setup
// const app = express()
// const port = process.env.PORT || 3000
// console.log('port', port)

// // We need to add a middleware to express that will allow us to parse JSON from the request body
// // This will allow us to get the quote from the request body
// app.use(express.json())

// router.get('/', async (req, res) => {
//   // test the database connection
//   try {
//     const client = await pool.connect()
//     const result = await client.query('SELECT * FROM quotes')
//     const results = { results: result ? result.rows : null }
//     res.send(results)
//     client.release()
//   } catch (err) {
//     console.error(err)
//     res.send('Error ' + err)
//   }
// })

// // Get all favorited quotes
// router.get('/quotes', async (req, res) => {
//   try {
//     const client = await pool.connect()
//     let quotes = await client.query('SELECT * FROM quotes')
//     client.release()
//     res.send(quotes.rows)
//   } catch (err) {
//     console.log(err)
//     res.status(500).send('Error ' + err)
//   }
// })

// // Generate a new quote
// //  Mock Quote - We will replace this with a real quote when we add OpenAI
// router.get('/quotes/new', async (req, res) => {
//   res.send({
//     id: 1,
//     quote: "I'm Batman",
//   })
// })

// // Favorite a quote
// // Mock Quote added
// router.post('/quotes/favorite', async (req, res) => {
//   // Here is where we will add the quote to the database
//   let quote = req.body.quote

//   try {
//     const client = await pool.connect()
//     let result = await client.query('INSERT INTO quotes (quote) VALUES ($1)', [
//       quote,
//     ])
//     client.release()
//     res.send({ quote })
//   } catch (err) {
//     console.log(err)
//     res.status(500).send('Error ' + err)
//   }
// })

// // Remove a quote from favorites
// router.delete('/quotes/:id/favorite', async (req, res) => {
//   // Here is where we will remove the quote from the database
//   try {
//     const client = await pool.connect()
//     let result = await client.query('DELETE FROM quotes WHERE id = $1', [
//       req.params.id,
//     ])
//     client.release()
//     res.send('Removed: ', {
//       id: req.params.id,
//     })
//   } catch (err) {
//     console.log(err)
//     res.status(500).send('Error ' + err)
//   }
// })

// app.use('/', router)

// app.listen(port, '0.0.0.0', () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

// Stage 5: Add OpenAI
const express = require('express')
const pg = require('pg')
const router = express.Router()
const cors = require('cors')

// Get environment variables
require('dotenv').config()

// Database Setup
const { Pool } = pg // imports the Pool class from pg
const pool = new Pool({
  connectionString:
    'postgresql://postgres:jGIUrmoBCP8nP4k2xxfx@containers-us-west-167.railway.app:6254/railway',
}) // instantiates the Pool class

// Express Setup
const app = express()
const port = process.env.PORT || 3000
// Middleware
app.use(express.json())
app.use(cors())

// OpenAI Setup
const { OpenAIApi, Configuration } = require('openai')
// openai.apiKey = process.env.OPEN_AI_API_KEY
const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
})
const client = new OpenAIApi(config)

router.get('/', async (req, res) => {
  // test the database connection
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM quotes')
    const results = { results: result ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})

// Get all favorited quotes
router.get('/quotes', async (req, res) => {
  try {
    const client = await pool.connect()
    let quotes = await client.query('SELECT * FROM quotes')
    client.release()
    res.send(quotes.rows)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error ' + err)
  }
})

// Generate a new quote
//  Mock Quote - We will replace this with a real quote when we add OpenAI
router.get('/quotes/new/:topic', async (req, res) => {
  let topic = req.params.topic
  let prompt = `Create an original quote about ${topic}.`
  // OpenAI Completion
  let models
  try {
    // const gptResponse = await openai.Completion.create({
    //   engine: 'davinci',
    //   prompt: prompt,
    //   maxTokens: 64,
    // })
    // console.log(gptResponse)
    // const quote = gptResponse.data.choices[0].text.trim()
    models = await client.listEngines().then(response => response.data.data)
    quote = await client
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      })
      .then((response, err) => {
        if (err) {
          console.log(err)
        }
        return response.data.choices[0].message.content
      })
    res.send(quote)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error ' + err)
  }
})

// Favorite a quote
// Mock Quote added
router.post('/quotes/favorite', async (req, res) => {
  // Here is where we will add the quote to the database
  let quote = req.body.quote

  try {
    const client = await pool.connect()
    let result = await client.query('INSERT INTO quotes (quote) VALUES ($1)', [
      quote,
    ])
    client.release()
    res.send({ quote })
  } catch (err) {
    console.log(err)
    res.status(500).send('Error ' + err)
  }
})

// Remove a quote from favorites
router.delete('/quotes/:id/favorite', async (req, res) => {
  // Here is where we will remove the quote from the database
  try {
    const client = await pool.connect()
    let result = await client.query('DELETE FROM quotes WHERE id = $1', [
      req.params.id,
    ])
    client.release()
    res.send('Removed: ', {
      id: req.params.id,
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Error ' + err)
  }
})

app.use('/', router)

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
