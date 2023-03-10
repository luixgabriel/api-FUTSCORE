import mongoose from "mongoose";

const matchsSchema = new mongoose.Schema({
    duration: {type: Number, required: true},
    times: {type: Number, required: true},
    teams: {
      team1: {type: String, required: true},
      team2: {type: String, required: true},
    }, 
    winner: {type: String, required: true},
    defeated: {type: String, required: true},
    finished: {type: Boolean, required: false},
})

const matchsModel = mongoose.model('Matchs', matchsSchema)


//Service
class Matchs {

    async create(email,name,password){
      
    }

  }

export default new Matchs()