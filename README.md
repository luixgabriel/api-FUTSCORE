# API FUTSCORE - Api para gerenciamento de campeonatos da minha aplicação FUTSCORE.

<p align="center">
  <img src="https://github.com/luixgabriel/apiINTERSALA/assets/70019908/45fc26d8-66aa-4fd9-b7ba-bf298ef90747)" width="100%" height="100%"/>
</p>

> Este é um projeto de uma API Rest desenvolvida utilizando o node JS com express e o banco de dados MongoDB.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter as seguintes dependências instaladas:

- `Node.js` (versão 12 ou superior)
- `NPM` (gerenciador de pacotes do Node.js)
- `MongoDB` (instância local ou remota)

## Como executar o projeto

Siga as etapas abaixo para executar o projeto em sua máquina local:

Execute os seguintes comandos a partir da pasta raiz do projeto:

### Clone este repositório

```bash
git clone https://github.com/luixgabriel/apiINTERSALA.git
```

### Acesse o diretório do projeto:
```bash
cd API INTERSALA
```

### Instale as dependências

```bash
npm install
```

### Defina as variáveis de ambiente
- Edite o arquivo `.env` e configure as variáveis de ambiente necessárias, que são a url do banco de dados e o servidor que api está rodando, se estiver local não precisa colocar como env.
  
### Execute o Projeto

```bash
npm run dev
```
## Endpoints

#### Teams

- `GET /`: Lista todos os times cadastrados no banco de dados.
- `GET /show/:id`: Lista um time específico pelo id dele no banco de dados.
- `POST /create`: Realiza um cadastro de um time no banco de dados.
- `PUT /update/:id`: Realiza a atualização no cadastro de um time específico pelo id no banco de dados.
- `DELETE /delete/:id`: Deleta um time específico pelo id no banco de dados.

#### Players

- `GET /player/showPLayers`: Lista todos os jogadores cadastrados no banco de dados.
- `GET /player/selectedPlayer/:id`: Lista um jogador específico pelo id dele no banco de dados.
- `POST /player`: Realiza um cadastro de um jogador no banco de dados.
- `PUT /player/updatePlayer/:id`: Realiza a atualização no cadastro de um jogador específico pelo id no banco de dados.
- `DELETE /player/deletePlayer/:id`: Deleta um jogador específico pelo id no banco de dados.

#### Match

- `GET /match/matches`: Lista todas as partidas cadastradas no banco de dados.
- `GET /match/searchmatch/:id`: Lista uma partida específica pelo id dela no banco de dados.
- `POST /match`: Realiza um cadastro de uma partida no banco de dados.
- `PUT /match/current/:id`: Lista a partida em andamento específica pelo id e atualiza os eventos dela.
- `DELETE /match/deleteMatch/:id`: Deleta uma partida específica pelo id no banco de dados.

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte maneira:

```
📂 config
 ┗ 📜 multer.js
📂 controllers
 ┗ 📜 MatchController.js
 ┗ 📜 PlayerController.js
 ┗ 📜 TeamsController.js
📂 models
 ┗ 📜 Match.js
 ┗ 📜 Players.js
 ┗ 📜 Teams.js
📂 routes
 ┗ 📜 matchRoutes.js
 ┗ 📜 playerRoutes.js
 ┗ 📜 teamRoutes.js
📂 upload
📜 index.js

```
