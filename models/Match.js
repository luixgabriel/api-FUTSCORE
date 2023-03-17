import mongoose from "mongoose";
import Teams from "../models/Teams.js";
import Players from '../models/Players.js';



const matchsSchema = new mongoose.Schema({
    duration: {type: Number, required: true},
    times: {type: Number, required: true},
    teams: {
      team1: {type: String, required: true},
      team2: {type: String, required: true},
    },
    scoreboard: {
      team1Goals: {type: Number, required: true, default: 0},
      team2Goals: {type: Number, required: true, default: 0},
      totals: {type: String, required: true, default: 0 }
    },  
    winner: {type: String, default: 'null', required: true},
    defeated: {type: String, default: 'null', required: true},
    draw: {type: Boolean, default: false, required: true},
    finished: {type: Boolean, default: false, required: true},
})

const matchsModel = mongoose.model('Matchs', matchsSchema)


//Service
class Matchs {

    async create(duration, times, team1, team2){
  
        const status = await this.validate(duration,times,team1,team2);
        console.log(status);
        
        if(status.status){
          try {
            const Match = await matchsModel.create({duration: duration, times: times, teams: {team1: team1, team2: team2}})
            return Match;

          } catch (error) {
            console.log(error)
            return {msg: 'Erro desconhecido, tente novamente.'}
          }
        }
        return status;
        
    }

    async matchEvents(match, team, goals, assists){

      try {
        if(team.name === match.teams.team1){
          const currentScore = String(match.scoreboard.team1Goals + 1) + 'x' + String(match.scoreboard.team2Goals);
          const Match = await matchsModel.findByIdAndUpdate(match.id, {scoreboard: {team1Goals: match.scoreboard.team1Goals + 1, team2Goals: match.scoreboard.team2Goals, totals: currentScore} }, {new: true});
          await Players.playerEvents(goals, assists);
          return Match;
        }
        else{
          const currentScore = String(match.scoreboard.team1Goals) + 'x' + String(match.scoreboard.team2Goals + 1);
          const Match = await matchsModel.findByIdAndUpdate(match.id, {scoreboard: {team1Goals: match.scoreboard.team1Goals, team2Goals: match.scoreboard.team2Goals + 1, totals: currentScore} }, {new: true});
          await Players.playerEvents(goals, assists);
          return Match;
        }
      } catch (error) {
        console.log(error)
        return {msg: 'Erro desconhecido, tente novamente.'};
      }
      
    }

    async matchResult(id,winner,defeated,draw){
      let error = false;
      try {
        const Result = await this.searchMatch(id);

          if(winner !== Result.teams.team1 && winner !== Result.teams.team2){
            error = true;
          }
     
          if(defeated !== Result.teams.team1 && defeated !== Result.teams.team2){
            error = true;
          }

          if(error){
            return {msg: 'Os times selecionados não coincidem com os da partida'};
          }

          if(draw){
            const result = await matchsModel.findByIdAndUpdate(id, {draw: true, finished: true}, {new: true});
            Teams.updateStats(Result.id);
            return result;
          }
            Teams.updateStats(Result.id);
            const ResultMatch = await matchsModel.findByIdAndUpdate(id, {winner: winner, defeated: defeated, finished: true}, {new: true});
            return ResultMatch;

      } catch (error) {
        console.log(error);
        return {msg: "Erro desconhecido, tente novamente."};
      }
      
    }

    async searchMatch(id){
      try {
        const Match = await matchsModel.findById(id);
        return Match;
      } catch (error) {
        console.log(error);
        return {msg: "Erro desconhecido, tente novamente."};
      }
    }


    async validate(duration, times, team1, team2){
     
      if(!duration || !times){
        return {msg: "dados invalidos"};
      }

      if(team1 === '' || team2 === ''){
        return {msg: "Os times não foram selecionados."}
      }

      if(!isNaN(team1) || !isNaN(team2) ){
        return {msg: "Time inválido"};
      }
      
      return {status:true};
    }

  }

export default new Matchs()