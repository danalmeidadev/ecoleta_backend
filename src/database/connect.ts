import knex from 'knex';

const connect = knex({
    client: 'mysql',
    connection:{
        host: "localhost",
        user: 'root',
        password: '',
        database: 'ecoleta'
    },
    useNullAsDefault: true,
});

export default connect;