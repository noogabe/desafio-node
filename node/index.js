const express = require('express');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql');
const db = mysql.createConnection(config);


app.get('/', async (req, res) => {
    try {
        await insertPeople();
        const selectQuery = `SELECT name FROM people`;
        await db.query(selectQuery, (err, results) => {
            if (err) throw err;
            const people = results.map(result => result.name).join(', ');
            const message = 'Full Cycle Rocks!';
            res.status(200).send(`<h1>${message}</h1><p>Pessoas: ${people}</p>`);
        });
    } catch (err){
        console.error('Erro:', err);
        res.status(500).send('Erro interno no servidor.');
    }
})

app.listen(port, async () => {
    console.log('Aplicação Express rodando na porta ' + port)
    await createTable();
})

async function createTable() {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS people (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            )
        `;
        await db.query(createTableQuery);
        console.log('Tabela "people" criada ou já existe.');
    } catch (err) {
        console.error('Erro ao criar tabela "people":', err);
    }
}

async function insertPeople() {
    try {
        const insertQuery = `INSERT INTO people(name) values('Gabriele Almeida')`;
        await db.query(insertQuery);
        console.log('Registro inserido com sucesso.');
    } catch (err) {
        console.error('Erro ao inserir registro:', err);
    }
}

process.on('exit', () => {
    console.log('Encerrando a aplicação...');
    db.end((err) => {
        if (err) {
            console.error('Erro ao encerrar a conexão com o banco de dados:', err);
        } else {
            console.log('Conexão com o banco de dados encerrada.');
        }
    });
});