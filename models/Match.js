import mongoose from "mongoose";

const matchsSchema = new mongoose.Schema({
    duration: {type: Number, required: true},
    times: {type: Number, required: true},
    teams: {
      team1: {type: String, required: true},
      team2: {type: String, required: true},
    }, 
    winner: {type: String, default: 'null', required: true},
    defeated: {type: String, default: 'null', required: true},
    finished: {type: Boolean, default: false, required: true},
})

const matchsModel = mongoose.model('Matchs', matchsSchema)


//Service
class Matchs {

    async create(duration, times, teams, winner, defeated, finished){
      console.log(teams)
        const Match = await matchsModel.create({duration: duration, times: times, teams: {team1: teams.team1, team2: teams.team2}})
        return Match
    }

  }

export default new Matchs()