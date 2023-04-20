import mongoose from "mongoose";
import Team from '../models/Teams.js'

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

    async createPlayer(name,team,numberTshirt){
      let tshirtDuplicate = false;

      if(team.players <= team.selectedNumbers.length ){
        return {msg: 'O time já está com todos os jogadores selecionados'};
      }

      team.selectedNumbers.forEach(element => {
        if(element === numberTshirt){
          tshirtDuplicate = true;
          return tshirtDuplicate;
        }
      });

      if(tshirtDuplicate){
        return {msg: 'Já possui um jogador com esse numero de camisa no time'};
      }

      await Team.updateTeam(team.id, '','','','', numberTshirt);

      const Player = await playersModel.create({name: name, team: team.name, numberTshirt: numberTshirt});
      return Player

    }

    async updatePlayer(player, name, team, tshirt, oldShirt, oldTeam){
      const updatePlayer = {}
      if(name){
        updatePlayer.name = name
        console.log(updatePlayer)
      }
      if(team.name === oldTeam){
          const tshirtsTeam = team.selectedNumbers;
          tshirtsTeam.splice(tshirtsTeam.indexOf(oldShirt), 1);
          tshirtsTeam.push(tshirt);
          await Team.updateTshirt(team.id, tshirtsTeam);
    
          const attPlayer = await playersModel.findByIdAndUpdate(player.id, {name: name, team: team.name, numberTshirt: tshirt}, {new: true});
          return attPlayer;
      }


      const oldT = await Team.searchTeamByName(oldTeam);

      const OldShirts = oldT.selectedNumbers;

      OldShirts.splice(OldShirts.indexOf(oldShirt), 1);

      await Team.updateTshirt(oldT.id, OldShirts);

      const newShirts = team.selectedNumbers;
      newShirts.push(tshirt);

      await Team.updateTshirt(team.id, newShirts);

      const attPlayer = await playersModel.findByIdAndUpdate(player.id, {name: name, team: team.name, numberTshirt: tshirt}, {new: true})
      return attPlayer;

    }

    async deletePlayer(id){
      try {
        const Player = await playersModel.findById(id)
          if(!Player){
            return {msg: 'Jogador não existe na base de dados'};
          }
        const tshirt = Player.numberTshirt;
          if(!tshirt){
            return {msg: 'Jogador não existe na base de dados'};
          }
        const TeamBD = await Team.searchTeamByName(Player.team);
        let arr = TeamBD.selectedNumbers;
        arr.splice(arr.indexOf(tshirt), 1);
        await Team.removeTshirt(TeamBD.id, arr);
        await playersModel.findByIdAndDelete(id);
        
          return {msg: 'Jogador deletado com sucesso'};
      } catch (error) {
        console.log(error);
          return {msg: 'Erro desconhecido, tente novamente.'}
      }
     
     
    }

    async serchPlayerById(id){
      try {
        const Player = await playersModel.findById(id)
        return Player;
      } catch (error) {
        console.log(error)
        return {msg: 'Esse jogador não existe na base de dados'}
      }
    }

    async serchPlayerByName(name){
      try {
        const Player = await playersModel.findOne({name: name});
        return Player;
      } catch (error) {
        console.log(error)
        return {msg: 'Esse jogador não existe na base de dados'}
      }
    }
    

    async playerEvents(playerGoal, playerAssist){
      
      try {
        const PlayerGoal = await playersModel.findById(playerGoal.id)
        await playersModel.updateOne({name: PlayerGoal.name}, {goals: PlayerGoal.goals + 1})

        if(playerAssist){
          const playerAssistbd = await playersModel.findById(playerAssist.id)
          await playersModel.updateOne({name: playerAssistbd.name}, {assists: playerAssistbd.assists + 1})
        }

      } catch (error) {
        console.log(error)
        return {msg: 'Erro desconhecido'}
      }
    }

    async getplayers(){
      try {
        const Players = await playersModel.find();
        return Players;
      } catch (error) {
        console.log(error);
        return {msg: 'Erro desconhecido'};
      }
      
    }

  }

export default new Players()