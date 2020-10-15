# Projeto de sistema de gerenciamento de imagens (backend)

### 1. Autenticação
- Usuários se cadastram com name, email, nickname e password. A senha tem que possuir, no mínimo, 6 caracteres. Email e nickname são valores que precisam ser únicos. Ao se cadastrar o usuário deve receber um token de acesso, para que possa se logar. Método: post.
- Para o login, o usuário deve passar seu email e sua senha. Caso queira incrementar, permita que o usuário se logue também usando a combinação de nickname e senha. Ao fazer login o usuário deve receber um token de acesso, para que possa acessar. Método: post.

### 2. Criação de música ou imagem
- Uma imagem recebe as informações de id, subtitle, author, date, file, tags e collection. O endpoint de criação deve ser autenticado. Método: post.

### 3. Leitura de música ou imagem
- O endpoint de leitura deve ser autenticado, recebendo o token do usuário. Método: get.
- Para buscar todos os itens, basta bater no endpoint e o retorno será um array com todos os valores associados ao usuário inseridos até o momento.
- Para buscar um item específico, complemente o caminho do endpoint com um `/:id`.

### 4. Upload de arquivo
- O usuário que está usando o front-end consegue subir a imagem a partir de um arquivo local. Método: post.

### 5. Deletar item
- Endpoint de deleção de itens. Método: delete.

### 6. Criação de playlist ou coleção
- Esta funcionalidade é quebrada em duas ações diferentes: **criar a coleção** e também **adicionar** **itens à lista**. Uma coleção precisa é guardada com o método `put` em `/collection`.
- Para criar uma lista, precisaremos dos seguintes dados: id, title, subtitle, image?.
- No outro endpoint, de adicionar um item, precisaremos dos seguintes dados: id.

### 7. Deletar item de coleção
- Endpoint de deleção de itens. Método: delete.

### 8. Organização dos itens por critérios
- As listas precisam ser buscadas com o método `get` em `/image`. 