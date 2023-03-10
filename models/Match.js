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
  
        const status = await this.validate(duration,times,teams)
        
        if(status.status){
          const Match = await matchsModel.create({duration: duration, times: times, teams: {team1: teams.team1, team2: teams.team2}})
          return Match
        }
        return status.msg
        
    }

    async validate(duration, times, teams){
      if(!duration || !times){
        return {error: true, msg: "dados invalidos"}
      }

      if(teams.team2 === '' || teams.team1 === ''){
        return {error: true, msg: "Times não selecionado"}
      }

      if(!isNaN(teams.team1) || !isNaN(teams.team2) ){
        return {error: true, msg: "Times inválido"}
      }
      
      return {status:true}
    }

  }

export default new Matchs()