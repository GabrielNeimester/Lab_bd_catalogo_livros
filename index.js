const cors = require('cors')
const express = require('express');
const { MongoClient } = require('mongodb');

// URL de conexão com o MongoDB
const uri = 'mongodb://localhost:27017'; // ou sua URL de conexão remota

// Nome do banco de dados e da coleção
const dbName = 'livros';

const app = express();
const PORT = process.env.PORT || 3000;
const ip = "localhost";

// Middleware para analisar o corpo das solicitações JSON
app.use(express.json());
app.use(cors()) 

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://${ip}:${PORT}`);
});


class Livro {
    constructor(nome, autor, isbn, paginas, ano, valor) {
        this.nome = nome;
        this.autor = autor;
        this.isbn = isbn;
        this.paginas = paginas;
        this.ano = ano;
        this.valor = valor;
    }
}

app.get('/livro/:pagina', async (req, res) => {
    const pagina = req.params.pagina;
    const limite = 10

    const client = new MongoClient(uri);

    try {
        // Conectar ao servidor do MongoDB
        await client.connect();

        console.log('Conexão estabelecida com sucesso ao servidor MongoDB');

        // Selecionar o banco de dados
        const db = client.db(dbName);

        // Selecionar a coleção
        const collection = db.collection("livros");

        if (!pagina || isNaN(Number(pagina))) {
            return res.status(400).json({ error: 'o campo pagina é obrigatório' })
        }

        if (pagina<1) {
            return res.status(400).json({ error: 'formato de página inválido' })
        }



        const totalLivros = await collection.countDocuments();

        const totalPaginas = Math.ceil(totalLivros / limite);

        if (pagina > totalPaginas) {
            return res.status(400).json({ error: 'Página solicitada está fora do intervalo válido' });
        }
        const livro = await collection.find().skip((Number(pagina) - 1) * limite).limit(limite).toArray()

        const indiceInicial = ((Number(pagina) - 1)) * limite + 1
        const indiceFinal = Math.min((Number(pagina) * limite), totalLivros)

        return res.json({
            livro,
            totalLivros: totalLivros,
            pagina: pagina,
            indiceInicial: indiceInicial,
            indiceFinal: indiceFinal

        })


    } catch (error) {
        console.error('Erro ao conectar ou buscar dados:', error);
    } finally {
        // Fechar a conexão com o cliente
        await client.close();
        console.log('Conexão com o servidor MongoDB fechada');
    }

});





