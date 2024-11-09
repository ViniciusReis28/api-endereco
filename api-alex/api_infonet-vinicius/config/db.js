
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: `postgresql://api-endereco_owner:0jME1CDyWaxL@ep-tiny-flower-a5j7vq5c-pooler.us-east-2.aws.neon.tech/api-endereco?sslmode=require`,
});

module.exports = pool;

const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Conexão ao banco de dados bem-sucedida!');
        client.release();
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
};

testConnection();