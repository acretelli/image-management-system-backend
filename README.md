# Projeto de sistema de gerenciamento de imagens (backend) - em produção

## 1. Usuários

### 1. 1 Autenticação
- Usuários se cadastram com name, email, nickname e password. A senha tem que possuir, no mínimo, 6 caracteres. Email e nickname são valores que precisam ser únicos. Ao se cadastrar o usuário deve receber um token de acesso, para que possa se logar. Método: post.
- Para o login, o usuário deve passar seu email e sua senha. Caso queira incrementar, permita que o usuário se logue também usando a combinação de nickname e senha. Ao fazer login o usuário deve receber um token de acesso, para que possa acessar. Método: post.

### 1.2 Busca de usuários
- Os usuários precisam ser buscados com o método `get` em `/user`. Os usuários não precisam escrever **exatamente** o nome. O retorno deve exibe as seguintes informações sobre o usuário: Nome e apelido.
- Para criar uma lista, precisaremos dos seguintes dados: name.

### 1.3 Perfil de usuários
- O perfil de usuário é buscado com o método `get` em `/user/:id`. O perfil do usuário logado com o método `get` em `/user/profile`.
- Ao buscar o perfil do usuário, o retorno da busca é um array com suas coleções de imagens.

### 1.4 Seguir e ser seguido
- Para seguir um usuário, basta enviar seu `id` no body de um método `put`.
- Para deixar de seguir, o mesmo procedimento, mas com um método `delete`.
- Há uma validação para checar se o usuário já se segue aquele perfil.

### 1.5 Feed
- O feed tem o método `get` em `/user/feed`. O conteúdo é buscado a partir da relação de usuários que o usuário logado segue.

## 2. Imagens

### 2.1 Criação de música ou imagem
- Uma imagem recebe as informações de id, subtitle, author, date, file e tags. O endpoint de criação deve ser autenticado. Método: post.

### 2.2 Leitura de música ou imagem
- O endpoint de leitura deve ser autenticado, recebendo o token do usuário. Método: get.
- Para buscar todos os itens, basta bater no endpoint e o retorno será um array com todos os valores associados ao usuário inseridos até o momento.
- Para buscar um item específico, complemente o caminho do endpoint com um `/:id`.

### 2.3 Upload de arquivo
- O usuário que está usando o front-end consegue subir a imagem a partir de um arquivo local. Método: post.

### 2.4 Deletar item
- Endpoint de deleção de itens. Método: delete.

### 2.5 Organização dos itens por critérios
- As listas precisam ser buscadas com o método `get` em `/image`.

## 3. Coleções

### 3.1. Criação de playlist ou coleção
- Esta funcionalidade é quebrada em duas ações diferentes: **criar a coleção** e também **adicionar** **itens à lista**. Uma coleção precisa é guardada com o método `put` em `/collection`.
- Para criar uma lista, precisaremos dos seguintes dados: id, title, subtitle, image?.
- No outro endpoint, de adicionar um item, precisaremos dos seguintes dados: id.

### 3.2 Deletar item de coleção
- Endpoint de deleção de itens. Método: delete.
