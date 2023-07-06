// Stage 1: Stub out the API
// const express = require('express')

// const app = express()
// const port = process.env.PORT || 3333

// app.get('/', async (req, res) => {
//   res.send(`Hello, World!`)
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

// // Get all favorited quotes
// // Mock favorite quotes
// app.get('/quotes', async (req, res) => {
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
// app.get('/quotes/new', async (req, res) => {
//   res.send({
//     id: 1,
//     quote: "I'm Batman",
//   })
// })

// // Favorite a quote
// // Mock Quote added
// app.post('/quotes/:id/favorite', async (req, res) => {
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

// app.delete('/quotes/:id/favorite', async (req, res) => {
//   // Here is where we will remove the quote from the database
//   // For now we will just return the quote
//   let id = req.params.id
//   let quote = req.body.quote

//   res.send({
//     id,
//     quote,
//   })
// })

// // Stage 2: Connect to the database
// const express = require('express')
// const pg = require('pg')

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

// app.get('/', async (req, res) => {
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

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

// // Get all favorited quotes
// // Mock favorite quotes
// app.get('/quotes', async (req, res) => {
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
// app.get('/quotes/new', async (req, res) => {
//   res.send({
//     id: 1,
//     quote: "I'm Batman",
//   })
// })

// // Favorite a quote
// // Mock Quote added
// app.post('/quotes/:id/favorite', async (req, res) => {
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

// app.delete('/quotes/:id/favorite', async (req, res) => {
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

// Stage 4: Connect the API to the database

const express = require('express')
const pg = require('pg')

// Database Setup
const { Client } = pg // imports the Client class from pg
const client = new Client({
  connectionString:
    'postgresql://postgres:jGIUrmoBCP8nP4k2xxfx@containers-us-west-167.railway.app:6254/railway',
}) // instantiates the Client class

// Express Setup
const app = express()
const port = process.env.PORT || 3000
console.log('port', port)

// We need to add a middleware to express that will allow us to parse JSON from the request body
// This will allow us to get the quote from the request body
app.use(express.json())

app.get('/', async (req, res) => {
  await client.connect() // establishes connection to the database
  // test the database connection
  try {
    const result = await client.query('SELECT * FROM quotes')
    const results = { results: result ? result.rows : null }
    res.send(results)
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  } finally {
    await client.end()
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Get all favorited quotes
app.get('/quotes', async (req, res) => {
  try {
    await client.connect()
    let quotes = await client.query('SELECT * FROM quotes')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error ' + err)
  } finally {
    await client.end()
  }
  res.send(quotes.rows)
})

// Generate a new quote
//  Mock Quote - We will replace this with a real quote when we add OpenAI
app.get('/quotes/new', async (req, res) => {
  res.send({
    id: 1,
    quote: "I'm Batman",
  })
})

// Favorite a quote
// Mock Quote added
app.post('/quotes/favorite', async (req, res) => {
  // Here is where we will add the quote to the database
  let quote = req.body.quote

  try {
    await client.connect()
    let result = await client.query('INSERT INTO quotes (quote) VALUES ($1)', [
      quote,
    ])
    // We will use the query method to insert the quote into the database
  } catch (err) {
    console.log(err)
    res.status(500).send('Error ' + err)
  } finally {
    await client.end()
  }
  // We will use the query method to insert the quote into the database
  // For now we will just return the quote
  res.send({ quote })
})

// Remove a quote from favorites

app.delete('/quotes/:id/favorite', async (req, res) => {
  // Here is where we will remove the quote from the database
  // For now we will just return the quote
  try {
    await client.connect()
    let result = await client.query('DELETE FROM quotes WHERE id = $1', [
      req.params.id,
    ])
  } catch {
    console.log(err)
    res.status(500).send('Error ' + err)
  } finally {
    await client.end()
  }

  res.send('Removed: ', {
    id,
    quote,
  })
})
