import mongoose from "mongoose";
import Match from "../models/Match.js";

const teamsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    players: {type: Number, required: true},
    shield: {type: String, required: true, default: 'logo.jpg'},
    slogan: {type: String, required: true},
    wins: {type: Number, default: '0'},
    defeats: {type: Number, default: '0'},
    draws: {type: Number, default: '0'},
    selectedNumbers: {type: Array, required: false}
})

const teamsModel = mongoose.model('Teams', teamsSchema)


//Service
class Teams {
     constructor(tshirtNumbers){
        this.tshirtNumbers = [];
     }

    async getTeams(){
      try {
        const Teams = await teamsModel.find();
        return Teams;
      } catch (error) {
        console.log(error)
        return {msg: 'Erro desconhecido, tente novamente.'};
      }
    }

    async create(name,players,shield,slogan){

      try {
        const validate = await this.validate(name,players,shield,slogan);
        if (!validate.status){
          return {msg: validate.msg}
        }

        const Team = await teamsModel.create({name, players, shield, slogan})
        return Team;

      } catch (error) {
        console.log(error)
        return {msg: 'Erro desconhecido, tente novamente.'}
      }
      
    }

    async updateTeam(id,name,players,shield,slogan,selectedNumber){

          if(selectedNumber){
            const Team = await this.searchTeam(id);
            this.tshirtNumbers = Team.selectedNumbers;
            this.tshirtNumbers.push(selectedNumber);
        
            const TeamAtt = await teamsModel.findByIdAndUpdate(id, {selectedNumbers: this.tshirtNumbers}, {new: true})
            this.tshirtNumbers = [];
            return TeamAtt
          }
          try {
            const teamExists = await this.searchTeamByName(name);
            
            if(teamExists){
              return {msg: 'Esse time já existe na base de dados, Digite outro nome.'}
            }

            const Team = await teamsModel.findByIdAndUpdate(id, {name,players,shield, slogan}, {new: true})
            return Team;

          } catch (error) {
            console.log(error)
            return {msg: 'Erro desconhecido, tente novamente.'}
          }
          
        }
    
    async updateTshirt(id, tshirts){
      await teamsModel.findByIdAndUpdate(id, {selectedNumbers: tshirts},{new: true});
    } 

    async removeTshirt(id, tshirts){
      await teamsModel.findByIdAndUpdate(id, {selectedNumbers: tshirts});
    } 


    async deleteTeam(id){
      try {
        await teamsModel.findByIdAndDelete(id)
        return 
      } catch (error) {
        console.log(error);
        return {msg: 'Erro desconhecido, tente novamente.'}
      }
      
    }

    async searchTeam(id){
      try {
        const Team = await teamsModel.findById(id);
        if(!Team){
          return {msg: 'Esse time não existe na base de dados.'}
        }
        return Team;
      } catch (error) {
        console.log(error);
        return {msg: 'Erro desconhecido, tente novamente.'};
      }
    }

    async searchTeamByName(name){
      try {
        const Team = await teamsModel.findOne({name: name})
        if(!Team){
          return Team;
        }
        return Team;
      } catch (error) {
        console.log(error);
        return {msg: 'Erro desconhecido, tente novamente.'};
      }
      
    }

    async updateStats(id){
       
      try {
        const match = await Match.searchMatch(id);
       
        if(match.draw){
         const t1 = await this.searchTeamByName(match.teams.team1);
         const t2 = await this.searchTeamByName(match.teams.team2);
 
           await teamsModel.findByIdAndUpdate(t1.id, {draws: t1.draws + 1});
           await teamsModel.findByIdAndUpdate(t2.id, {draws: t2.draws + 1});
 
         return
        }
        const winnerTeam = await this.searchTeamByName(match.winner);
        const defeatedTeam = await this.searchTeamByName(match.defeated);
     
        await teamsModel.findByIdAndUpdate(winnerTeam.id, {wins: winnerTeam.wins + 1});
        await teamsModel.findByIdAndUpdate(defeatedTeam.id, {defeats: defeatedTeam.defeats + 1});

      }catch (error) {
        console.log(error);
        return {msg: 'Erro desconhecido, tente novamente.'};
      }
     
       
    }

    async validate(name,players,shield,slogan){
      const teamExists = await this.searchTeamByName(name);

      if(teamExists){
        return {msg: 'Esse time já existe na base de dados, Digite outro nome.'}
      }
  
      if(!name || !players || !shield || !slogan){
        return {status: false,  msg: "Erro na validação dos dados."}
      }

      if(isNaN(players) || players <= 0){
        return {status: false,  msg: "Erro na numeração de jogadores do seu time."}
      }

        return {status: true}
    }

  }

export default new Teams();