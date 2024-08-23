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
    password: 'root',
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
    const { nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem, destaque } = req.body;
    const [query] = await connection.execute(
        'INSERT INTO trilhas (nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem, destaque) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem, destaque]
    );
    if (query.affectedRows === 0) return res.status(400).json({ mensagem: 'Erro na adição da trilha.' });
    return res.status(200).json({ mensagem: 'Trilha inserida com sucesso.' });
});

app.put('/trilhas/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem, destaque } = req.body;
    const [query] = await connection.execute(
        'UPDATE trilhas SET nome = ?, local = ?, extensao = ?, altitude = ?, duracao = ?, dificuldade = ?, monitoria = ?, caracteristicas = ?, descricao = ?, agendamento = ?, horario = ?, imagem = ?, destaque = ? WHERE idTrilhas = ?',
        [nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem, destaque, id]
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

const getAllPassaros = async () => {
    const [query] = await connection.execute('SELECT * FROM passaros');
    return query;
}

app.get('/passaros', async (req, res) => {
    const consulta = await getAllPassaros();
    return res.status(200).json(consulta);
});

app.get('/passaros/:id', async (req, res) => {
    const { id } = req.params;
    const [query] = await connection.execute('SELECT * FROM trilhas WHERE idTrilhas = ?', [id]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Pássaro não encontrado.' });
    return res.status(200).json(query);
});

app.post('/passaros', async (req, res) => {
    const { nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem, destaque } = req.body;
    const [query] = await connection.execute(
        'INSERT INTO passaros (nome, descricao, imagem) VALUES (?, ?, ?)',
        [nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem, destaque]
    );
    if (query.affectedRows === 0) return res.status(400).json({ mensagem: 'Erro ao postar o pássaro.' });
    return res.status(200).json({ mensagem: 'postagem feita!' });
});

app.put('/passaros/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem, destaque } = req.body;
    const [query] = await connection.execute(
        'UPDATE passaros SET nome = ?, descricao = ?, imagem = ?',
        [nome, local, extensao, altitude, duracao, dificuldade, monitoria, caracteristicas, descricao, agendamento, horario, imagem, destaque, id]
    );
    if (query.affectedRows === 0) return res.status(404).json({ mensagem: 'Pássaro não encontrado.' });
    return res.status(200).json({ mensagem: 'Pássaro alterado com sucesso.' });
});

app.delete('/passaros/:id', async (req, res) => {
    const { id } = req.params;
    const [query] = await connection.execute('DELETE FROM passaros WHERE id = ?', [id]);
    if (query.affectedRows === 0) return res.status(404).json({ mensagem: 'Pássaro não encontrado.' });
    return res.status(200).json({ mensagem: 'Pássaro excluído com sucesso.' });
});
