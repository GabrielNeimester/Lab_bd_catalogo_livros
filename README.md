Para executar o projeto:

1º passo: necessário subir os dados do arquivo "livros.csv" ao mongoDb
Comando para subir a base de dados livros.csv:

mongoimport --db livros --collection livros --type csv --columnsHaveTypes --file livros.csv --columnsHaveTypes --fields "nome.string(),autor.string(),ISBN.string(),paginas.int32(),ano.int32(),valor.double()"

2º passo: no terminal do vs code executar o comando "npm install" para baixar os pacotes do projeto

3º passo: executar o comando "node index.js" para iniciar o servidor

4º passo: entrar dentro da pasta "frontend" e abrir o arquivo "index.js" com o navegador ou a extensão "live server" do vs code

O projeto já deve estar rodando, Fim!
