import mongoose from "mongoose";

const playersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    team: {type: String, required: true},
    goals: {type: Number, required: false},
    assists: {type: Number, required: false},
    numberTshirt: {type: Number, required: true},
})

const playersModel = mongoose.model('Players', playersSchema)


//Service
class Players {

    async create(email,name,password){
      
    }

  }

export default new Teams()