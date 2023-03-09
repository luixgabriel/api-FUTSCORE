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

  constructor(errors){
    this.errors = []
  }

    async create(email,name,password){
        try{
            var hash = await bcrypt.hash(password, 12)
            await knex.insert({name,email,password: hash,role:0}).table('users')
        }catch{
            return {msg: "erro"}
        }
    }

  }

export default new Teams()