import mongoose from "mongoose";

const teamsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    players: {type: Number, required: true},
    shield: {type: String, required: true},
    slogan: {type: String, required: true},
    wins: {type: Number, default: '0'},
    defeats: {type: Number, default: '0'},
    draws: {type: Number, default: '0'}
})

const teamsModel = mongoose.model('Teams', teamsSchema)


//Service
class Teams {
    
    async getTeams(){
      const Teams = await teamsModel.find()
      return Teams
    }

    async create(name,players,shield,slogan){
      try {
        const validate = await this.validate(name,players,shield,slogan)
       
        if (!validate.status){
          return {error: true, msg: validate.msg}
        }

        const Team = await teamsModel.create({name, players, shield, slogan})
        return Team

      } catch (error) {
        
      }
      
    }

    async updateTeam(id,name,players,shield,slogan){

          try {
            const validate = await this.validate(name,players,shield,slogan)
            if (!validate.status){
              return {error: true, msg: validate.msg}
            }

            const Team = await teamsModel.findByIdAndUpdate(id, {name,players,shield, slogan}, {new: true})
            return Team

          } catch (error) {
            console.log(error)
            return
          }
          
        }

    
    async deleteTeam(id){
      try {
        const teste = await teamsModel.findByIdAndDelete(id)
        return teste
      } catch (error) {
        console.log(error)
        return
      }
      
    }

    async searchTeam(id){
      try {
        const Team = await teamsModel.findById(id)
        console.log(Team)
        if(!Team){
          return {error: true, msg: 'Esse time não existe'}
        }
        return Team
      } catch (error) {
        return {error: true}
      }
    }

    async searchTeamByName(name){
      const Team = await teamsModel.findOne({name: name})
      return Team
    }

    async resultMatch(name){
        
    }

    async validate(name,players,shield,slogan){

      if(!name || !players || !shield || !slogan){
        return {status: false,  msg: "Erro na validação dos dados"}
      }

      if(isNaN(players) || players <= 0){
        return {status: false,  msg: "O número de players do seu time não pode ser uma string"}
      }

      return {status: true}

    }

  }

export default new Teams()