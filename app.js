const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
let db = null
const dppath = path.join(__dirname, 'cricketMatchDetails.db')
const app = express()
app.use(express.json())

const initAndStartServer = async () => {
  try {
    db = await open({filename: dppath, driver: sqlite3.Database})
    app.listen(3000, () => {
      console.log('server is running at http://localhost300')
    })
  } catch (e) {
    console.log(`DB ERROR ${e.message}`)
    process.exit(1)
  }
}
initAndStartServer()
//creating players resoonse obj
// Define function to convert database object to response object
const dbObjtoPlayerResObj = dbobj => {
  return {
    playerId: dbobj.player_id,
    playerName: dbobj.player_name,
  }
}

// Endpoint to get all players details
app.get('/playerssqli/', async (request, response) => {
  const getPlayersQuery = `
  SELECT
  *
  FROM
  player_details;
  `

  const players = await db.all(getPlayersQuery)
  response.send(players.map(dbObjtoPlayerResObj))
})
