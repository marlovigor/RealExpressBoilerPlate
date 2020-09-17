const cartServices = {
    getNotes(knex) {
        return knex.select('*').from('cart')
    },
    insertItem(knex, newItem) {
        return knex
            .insert(newItem)
            .into('cart')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

   
    
    getById(knex, userid,) {
        // return knex.from('cart').select('*').where('userid', userid).first()
        return knex.from('cart')
        .join('items','cart.itemid' ,'=', 'items.id')
        .select('*')
        .where('userid',userid,)
        
    },
// for post your just posting item id and user id to the cart

    // getById(knex, userid) {
    //     return knex.from('cart')
    //     .join('items','cart.itemid' ,'=', 'items.id')
    //     .select('*')
    //     .where('userid',userid)
        
    // },

    
   

    deleteCartitem(knex, itemid) {
        // console.log(id)
        return knex('cart')
            .where('itemid', itemid)
            .delete()
    },
    // updateArticle(knex, id, newNoteFields) {
    //     return knex('notes')
    //       .where({ id })
    //       .update(newNoteFields)
    //   },

    
    // // updateArticle(knex, id, newArticleFields) {
    // //        return knex('Noteful-Database')
    // //          .where({ id })
    // //          .update(newArticleFields)
    // //      },
}

module.exports = cartServices