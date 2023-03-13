import mongoose from "mongoose";

const playersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    team: {type: String, required: true},
    goals: {type: Number, required: true, default: 0},
    assists: {type: Number, required: true, default: 0},
    numberTshirt: {type: Number, required: true},
})

const playersModel = mongoose.model('Players', playersSchema)


//Service
class Players {

    async create(name,team,goals,assists,numberTshirt){
      
    }

  }

export default new Teams()