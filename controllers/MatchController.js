import Teams from "../models/Teams.js";
import Match from "../models/Match.js";
/* eslint-disable class-methods-use-this */
class MatchController {
  async index(req, res) {
    res.send('APP EXPRESS! - Guia do programador');
  }

  async createMatch(req,res){
    const { name, duration, times } = req.body
    const names = ['Barcelona']
    names.push(name)
    const teams = {
      team1: names[0],
      team2: names[1]
    }
   
    const match = await Match.create(duration, times, teams)
    // res.json(match)

        // names.forEach(t => {
        //   const teams = {
        //     team1: t,
        //     team2: t
        //   }
        // });

      


    res.json(match)
    // const teams = await Teams.searchTeamByName(name)
    // res.json(teams)
  }
}

export default new MatchController();
