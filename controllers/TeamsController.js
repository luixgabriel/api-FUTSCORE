/* eslint-disable class-methods-use-this */
class TeamsController {
  async index(req, res) {
    res.json({players: []});
  }
}

export default new TeamsController();
