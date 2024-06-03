const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = 9000;

app.listen(PORT, () => {
    console.log("Ok");
});

const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'aluno',
    database: 'Juqueriquere'
});

const getAllTrilhas = async () => {
    const [query] = await connection.execute('SELECT * FROM trilhas');
    return query;
}

app.get('/trilhas', async (req, res) => {
    const consulta = await getAllTrilhas();
    return res.status(200).json(consulta);
});

app.get('/trilhas/:id', async (req, res) => {
    const { id } = req.params;
    const [query] = await connection.execute('SELECT * FROM trilhas WHERE idTrilhas = ?', [id]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Trilha não encontrada.' });
    return res.status(200).json(query);
});

app.post('/trilhas', async (req, res) => {
    const { nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem } = req.body;
    const [query] = await connection.execute(
        'INSERT INTO trilhas (nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem]
    );
    if (query.length === 0) return res.status(400).json({ mensagem: 'Erro na adição da trilha.' });
    return res.status(200).json({ mensagem: 'Trilha inserida com sucesso.' });
});

app.put('/trilhas/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem } = req.body;
    const [query] = await connection.execute(
        'UPDATE trilhas SET nome = ?, local = ?, extensao = ?, altitude = ?, duracao = ?, dificuldade = ?, monitoria = ?, caracteristicas = ?, descricao = ?, agendamento = ?, horario = ?, imagem = ? WHERE idTrilhas = ?',
        [nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem, id]
    );
    if (query.affectedRows === 0) return res.status(404).json({ mensagem: 'Trilha não encontrada.' });
    return res.status(200).json({ mensagem: 'Trilha alterada com sucesso.' });
});

app.delete('/trilhas/:id', async (req, res) => {
    const { id } = req.params;
    const [query] = await connection.execute('DELETE FROM trilhas WHERE idTrilhas = ?', [id]);
    if (query.affectedRows === 0) return res.status(404).json({ mensagem: 'Trilha não encontrada.' });
    return res.status(200).json({ mensagem: 'Trilha excluída com sucesso.' });
});
