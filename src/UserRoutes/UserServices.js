const UserService = {
    getByname(knex, name) {
        return knex.from('users').select('*').where('name', name).first()
    },
}

module.exports = UserService