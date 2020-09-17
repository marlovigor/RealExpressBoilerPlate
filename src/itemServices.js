const itemServices = {
    getAllItems(knex) {
        return knex.select('*').from('items')
    },
    // insertArticle(knex, newArticle) {
    //     return knex
    //         .insert(newArticle)
    //         .into('folders')
    //         .returning('*')
    //         .then(rows => {
    //             return rows[0]
    //         })
    // },
    getById(knex, id) {
        return knex.from('items')
        .select('*')
        .where('id', id).
        first()
    },

    // deleteArticle(knex, id) {
    //     return knex('folders')
    //         .where({ id })
    //         .delete()
    // },

    updateArticle(knex, id, numberofitems) {
           return knex('items')
             .where({ id })
             .update(numberofitems)
         },
}

module.exports = itemServices