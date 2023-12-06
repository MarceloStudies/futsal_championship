# Futsal Championship

Este é um projeto Node.js para gerenciar campeonatos de futsal. Ele fornece uma API REST para criar, ler, atualizar e excluir jogadores, times e partidas.



## Rodando localmente

### Utilizando Docker:
Clone o projeto
```bash
  git clone https://github.com/MarceloStudies/futsal_championship.git
```

```bash
  cd futsal_championship
```

Inicie o container 
```bash
  docker-compose up --build
```

É provavel que o container do mysql inicie primeiro que o do node, caso tenha algum problema reinincie o container node.



### Sem Docker: 
Clone o projeto
```bash
  git clone https://github.com/MarceloStudies/futsal_championship.git
```

Entre no diretório do projeto

```bash
  cd futsal_championship
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```

Execute o arquivo database.sql
```sql
  CREATE DATABASE futsal_championship;
```
```bash
  mysql -u root -p futsal_championship < database.sql
```



## Variáveis de Ambiente

Para rodar esse projeto, caso nao tenha utilizado o docker para rodar o projeto, acesse  `./config/db.js` e mude as variaveis de conexão de acordo com o desejado.

Por ser um projeto com fins educativos e avaliativos optei por nao utilizar .env, a chave para o middleware é "teste" esta localizada em 
`/config/middleware.js` linha 4 

## Relacionamento das entidades do banco:

![App Screenshot](https://i.ibb.co/FV1PWb6/Screen-Shot-2023-12-05-at-23-42-42.png)




## Documentação da API

- ```/api/teams```
- ```/api/players```
- ```/api/matches```
- ```/api/users```

Todas essas rotas possuem o GET e o DELETE identico, mudando apenas o nome da rota

#### Retornar todos os items 

```http
  GET /api/nome_da_routa
```

#### Retornar um item especifico 

```http
  GET /api/nome_da_routa/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do item que você quer |


#### Deletar um item especifico 

```http
  DELETE /api/nome_da_routa/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do item que você quer |

### Routas para as equipes: 



#### Adicionar uma equipe 

```http
  POST /api/teams
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome da equipe |


#### Atualizar uma equipe 

```http
  PUT /api/teams/${id}
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |
| `name` | `string` | **Obrigatório**. Nome da equipe |




### Routas para os jogadores: 


#### Adicionar um jogador 

```http
  POST /api/players
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome do Jogador |
| `shirtNumber` | `integer` | **Obrigatório**. Numero da camisa do Jogador |
| `team_id` | `integer` | **Obrigatório**. ID da equipe  |


#### Atualizar um jogador 

```http
  PUT /api/players/${id}
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id`      | `integer` | **Obrigatório**. O ID do item que você quer |
| `name` | `string` |  Nome do Jogador |
| `shirtNumber` | `integer` |  Numero da camisa do Jogador |
| `team_id` | `integer` | ID da equipe  |


```http
  DELETE /api/players/team/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID da equipe que você quer |


### Routas para as partidas: 


#### Adicionar uma partida 

```http
  POST /api/matches
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `date` | `date` | **Obrigatório**. Data da partida (yyyy-mm-dd) |
| `startTime` | `timestamp` | **Obrigatório**. Horario de inicio |
| `endTime` | `timestamp` | **Obrigatório**. Horario de fim  |
| `team1_id` | `integer` | **Obrigatório**. ID da equipe 1  |
| `team2_id` | `integer` | **Obrigatório**. ID da equipe 2   |
| `score1` | `integer` | **Obrigatório**. Placar da equipe 1  |
| `score2` | `integer` | **Obrigatório**. Placar da equipe 2  |



#### Atualizar uma partida 

```http
  PUT /api/teams/${id}
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id`      | `integer` | **Obrigatório**. O ID do item que você quer |
| `date` | `date` |  Data da partida (yyyy-mm-dd) |
| `startTime` | `timestamp` |  Horario de inicio |
| `endTime` | `timestamp` |  Horario de fim  |
| `team1_id` | `integer` |  ID da equipe 1  |
| `team2_id` | `integer` |  ID da equipe 2   |
| `score1` | `integer` |  Placar da equipe 1  |
| `score2` | `integer` |  Placar da equipe 2  |

#### Retornar a classificação dos times 

```http
GET api/classifications
```


### Routas para os usuarios:

#### Adicionar um usuario

```http
  POST /api/users/register
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome do usuario |
| `email` | `string` | **Obrigatório**. Email do usuario |
| `password` | `string` | **Obrigatório**. Senha do usuario |


#### Logar um usuario

```http
  POST /api/users/login
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Email do usuario |
| `password` | `string` | **Obrigatório**. Senha do usuario |
## Uso/Exemplos de bodys

#### Equipe:
```json
{
	"name": "Santos"
}
```

#### Jogador:
```json
{
	"name": "Pedro",
	"shirtNumber": "140",
	"team_id": 2
}
```

#### Partida:
```json
{
  "date": "2023-12-11",
  "startTime": "18:00:00",
  "endTime": "20:00:00",
  "team1_id": 2,
  "team2_id": 3,
  "score1": 2,
  "score2": 4
}
```


#### Usuario:
```json
{
	"name": "Marcelo",
	"email": "marcelo@dev.com",
	"password": "123"
}

```
## Demonstração

[Demonstração do Funcionamento] (https://youtu.be/iVmcoWTO51Y)

