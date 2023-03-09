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

    
    async create(name,players,shield,slogan){
      try {
        const validate = await this.validate(name,players,shield,slogan)
       
        if (!validate.status){
        
          return {msg: "Erro na validação"}
        }
        const Team = await teamsModel.create({name, players, shield, slogan})
        return Team
      } catch (error) {
        
      }
      
    }

    async validate(name,players,shield,slogan){

      if(!name || !players || !shield || !slogan){
        return {status: false,  msg: "Erro na validação dos dados"}
      }

    }

  }

export default new Teams()