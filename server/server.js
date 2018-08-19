const express = require('express')
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const app = express()
mongoose.connect('mongodb://nino-t:subang2015@ds227332.mlab.com:27332/learn_react_graphql')
mongoose.connection.once('open', () => {
  console.log('Database has ben connected')
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Server is running in port 4000')
})