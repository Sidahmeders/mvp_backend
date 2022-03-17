class makeFetchCliques {
  //initialize constructor with models
  constructor({ Clique, CliquesMember, buildCliquesResponse, sequelize }) {
    this.Clique = Clique
    this.CliquesMember = CliquesMember
    this.buildCliquesResponse = buildCliquesResponse
    this.sequelize = sequelize
  }

  SearchCliques() {
    async function init(req, res) {
      try {
        //getting term from req.params
        let { term } = req.query
        //initializing a array
        let cliques = []
        // if there is no term then everything should be fetched
        if (!term) {
          cliques = await this.Clique.findAll()
        }
        //else term will be sanitized and fetch the cliques based on match in title
        else {
          term = term.toLowerCase()
          cliques = await this.Clique.findAll({
            where: {
              asset_name: this.sequelize.where(
                this.sequelize.fn('LOWER', this.sequelize.col('title')),
                'LIKE',
                '%' + term + '%'
              ),
            },
          })
        }

        //if there is a user then we will add another property 'userStatus' which will show if user is already member of this clique or he requested to join and it is pending or he did not do any actions with this clique meaning idle
        //build the response
        const userId = res.locals.user?.id
        const response = await this.buildCliquesResponse(cliques, userId)
        //return the data
        return res.status(200).json({ data: { cliques: response } })
      } catch (err) {
        res.status(400).json({ errorMsg: err.message })
      }
    }
    return init.bind(this)
  }
  //this function will be used to fetch cliques where user is a member
  fetch_cliques_user_is_member() {
    async function init(req, res) {
      try {
        //getting user id from res.locals
        const userId = res.locals.user?.id
        //finding all cliques where user is a member
        const cliques = await this.CliquesMember.findAll({
          where: {
            user_id: userId,
          },
        })
        //get cliques from cliques member
        const cliquesIds = cliques.map((clique) => clique.clique_id)
        //find all cliques which is there in cliqueIds
        const cliquesData = await this.Clique.findAll({
          where: {
            id: {
              [this.sequelize.Op.in]: cliquesIds,
            },
          },
        })
        //check if user is mod of any of the cliques in cliquesData
        cliquesData.map((clique) => {
          const isMod = clique.moderator_id === userId
          //if isMod remove this clique from cliquesData
          if (isMod) {
            cliquesData.splice(cliquesData.indexOf(clique), 1)
          }
          return isMod
        })
        //build the response
        const response = await this.buildCliquesResponse(cliquesData, userId)
        //return the data
        return res.status(200).json({ data: { cliques: response } })
      } catch (err) {
        res.status(400).json({ errorMsg: err.message })
      }
    }
    return init.bind(this)
  }
  //this function will be used to fetch cliques where user is a moderator
  fetch_cliques_user_is_mod() {
    async function init(req, res) {
      try {
        //getting user id from res.locals
        const userId = res.locals.user?.id
        //finding all cliques where user is a moderator
        const cliques = await this.Clique.findAll({
          where: {
            moderator_id: userId,
          },
        })
        //build the response
        const response = await this.buildCliquesResponse(cliques, userId)
        //return the data
        return res.status(200).json({ data: { cliques: response } })
      } catch (err) {
        res.status(400).json({ errorMsg: err.message })
      }
    }
    return init.bind(this)
  }
}
export default makeFetchCliques
