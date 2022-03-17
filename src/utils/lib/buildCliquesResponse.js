import cliquesMember from '../../database/models/cliques-member.js'
import clique_request from '../../database/models/clique_request.js'
import user from '../../database/models/user.js'

export default async function buildCliquesResponse(cliques, userId) {
  //add member count to each clique in cliques array
  for (let i = 0; i < cliques.length; i++) {
    let clique = cliques[i].dataValues
    let members = await cliquesMember.findAll({
      where: {
        clique_id: clique.id,
      },
    })
    clique.member_count = members.length
    //get user with id of mod id
    let { firstName, lastName } = await user.findOne({ where: { id: clique.moderator_id } })
    clique.mod_name = `${firstName} ${lastName}`
  }
  if (userId) {
    //updatedCliques
    // map through cliques
    const updatedCliques = cliques.map(async ({ dataValues }) => {
      //assign clique with dataValues property of sequalize result
      const clique = dataValues
      //if userId is null return userStatus as idle
      if (!userId) {
        return { ...clique, userStatus: 'idle' }
      }
      //get number of members in clique
      //if member
      const isMember = await cliquesMember.findOne({
        where: { clique_id: clique.id, user_id: userId },
      })
      if (isMember && !isMember.isDeleted) {
        return { ...clique, userStatus: 'member' }
      }
      //if there is a request matching the user and clique and it is pending
      else {
        const isRequested = await clique_request.findOne({
          where: {
            clique_id: clique.id,
            requestBy: userId,
            status: 'pending',
          },
        })
        if (isRequested) {
          return { ...clique, userStatus: 'requested' }
        }
        // if user has not interacted with this clique
        else return { ...clique, userStatus: 'idle' }
      }
    })
    //we will recieve a promise in updatedCliques because of a async map so we have to do Promise.all [ps: ignore the semantics pls]
    const promise = await Promise.all(updatedCliques)
    return promise
  } else return cliques
}
