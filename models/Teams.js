import mongoose from "mongoose";

const teamsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    players: {type: Number, required: true},
    shield: {type: String, required: true},
    slogan: {type: String, required: true},
})

const teamsModel = mongoose.model('Teams', teamsSchema)


//Service
class Teams {

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