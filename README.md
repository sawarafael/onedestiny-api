# API - One Destiny

### 1.0.1v

API destinado para uso do aplicativo *ONE DESTINY*, este Readme será destinado para especificar quais rotas estão sendo trabalhadas e como usa-las nos aplicativos Mobile e Desktop. 

Rotas implementadas:

1. - [x] Usuários Normal - Free e Premium
2. - [] Usuários Admin
3. - [] Noticias
4. - [] Mesas

**ATENÇÃO** 
Antes de inicializar esta API na sua máquina, certifique-se de criar um DATABASE correspondente, em seguida, instale todos os módulos NodeJS desta API e em seguida crie um arquivo .env onde nele deverá botar as seguintes variáveis:

DB_NAME=~~Nome do Banco que você criou~~
DB_HOST=~~localhost~~
DB_USER=~~root~~
DB_PASS=~~Senha de acesso para o banco que você criou~~

API_PORT=3000

JWT_SECRET_TOKEN_USER=~~é uma senha especial, usando essa api para teste, você pode inserir quaisquer senha legítima aqui apenas para testar se o token vai funcionar em sua sessão autenticada.~~


Feito isto, utilize os comandos para as seguintes inicializações: 

1. nodemon index.js

Caso ocorra algum erro, reportar em "Issues" deste repositório.

## Rota de Usuários Normal

### Rota de Cadastro

=> Rota para registrar os usuários dentro do Banco de Dados.

**Requisições:**  

*username:*
*email:*
*password:*

**Respostas:** 

*"Usuário Cadastrado!"* - (200)

**Erros:**

*Este Email ou Usuário já está cadastrado no Sistema!* - (400)
--> Já existe o usuário ou email dentro do Banco de Dados.

--------------------------------------------------------------

### Rota de Autenticação

=> Rota para autenticar os usuários no servidor e criar uma sessão para que possa utilizar os recursos de outras rotas. Quando o usuário acessar o login, ele receberá um **_token_** que utilizará como autorização para outras rotas como visualizar seus dados.

**Requisições:**

*username:*
*password:*

**Repostas:**

*Token serializado.* - (200)

**Erros:**

*Usuário não encontrado.* - (404)
--> O usuário não se encontra no Banco de Dados do Sistema.

*Falha Interna* - (400)
--> O Servidor não conseguiu gerar o token.

*Senha inválida* - (404)
--> A senha que foi passada não é igual a senha registrada no Banco de Dados.

--------------------------------------------------------------

### Rota de Visualização de Dados do Usuário

=> Com a autorização do token que recebeu ao se autenticar, o usuário poderá usar essa rota para averiguar seus dados e analisar como está e também ver os dados de outros usuários.

**Requisições:**

*id*: --> id do usuário que terá seus dados visualizado.

**Respostas:**

*Dados do Usuário* - (200)

**Erros:**

*Erro do Servidor ao Entregar os Dados* - (404)
--> Sistema não conseguiu encontrar o usuário e seus dados.

--------------------------------------------------------------

### Rota de Alteração de Dados do Usuário

=> Caso o usuário deseje alterar seus dados, usando a autorização do token que recebeu ao se autenticar.

**Requisições:**

*id*: --> id do usuário que deseja alterar seus dados
*avatar*: --> string de uma url de um avatar
*bio*: --> descrição do usuário

**Respostas:**

*Perfil Atualizado!* - (200)

**Erros:**

*Erro em encontrar o usuário* - (404)

--------------------------------------------------------------

### Rota de Level Up do Usuário

=> Com a autorização do token que o usuário recebeu, caso sua experiência com o aplicativo alcance seu limite, o aplicativo pode enviar uma requisição ao sistema avisando que o usuário aumentou de level.

**Requisições:**

*up*: --> requisição de que o usuário upou.
*id*: --> o usuário que upou.

**Respostas:**

Não existe nenhuma mensagem de resposta. No entanto, o código de sucesso, 200, estará indicando que a requisição foi sucedida.

**Erros:**

*Falha em encontrar o Usuário* - (400)

*Falha em Level Up!* - (404)

--------------------------------------------------------------

### Rota de Requisição de Amizade do Usuário

=> Nesta rota o usuário envia uma requisição de amizade a um outro usuário, criando um vínculo de ação e status com ele. As ações podem ser tomadas por ambos os lados, os status identificam a situação deste vínculo. 

Ações: 

Usuário de ID 2 enviou um pedido de amizade para o Usuário de ID 43;
Usuário de ID 6 mantém a amizade do Usuário de ID 196;
Usuário de ID 1 recusou o pedido de amizade de Usuário de ID 59;
Usuário de ID 7823 bloqueou a amizade de Usuário de ID 9838;

Status: 

0 - Pendente
1 - Ativo
2 - Recusado
3 - Bloqueado
4 - Removido

**Requisições:**

*id1*: --> usuário requerente.
*id2*: --> usuário requerido.
*usernamer*: --> username do usuário requerido.
*action*: --> ação de pendência. 

**Respostas:**

*Requisição de pedido de amizade realizada com sucesso!* - (200)

**Erros:**

*Erro ao encontrar o usuário requerido.* - (404)

*Erro ao encontrar o usuário requerente.* - (404)

--------------------------------------------------------------

### Rota de Atualização de Requisição de Amizade de Usuário

=> Esta rota se encarrega de exclusivamente atualizar o vínculo de amizade entre os usuários nos meio de ação e status, a requisição envia um valor chamado "resp" que atualizará diretamente o status do vínculo, no entanto, ainda é preciso especificar a ação realizada.

**Requisições**:

*resp*: --> resposta de atualização realizada.
*id1*: --> usuário requerente.
*id2*: --> usuário requerido.
*action*: --> ação realizada nesta atualização.

**Respostas**:

Caso resp = 1: *Requisição confirmarda!* - (200)
Caso resp = 2: *Requisição confirmarda!* - (200)
Caso resp = 3: *Requisição confirmarda!* - (200)
Caso resp = 4: *Requisição confirmarda!* - (200)

**Erros**:

*Status não identificado!* - (404)
--> Caso a requisição seja um valor diferente de 1, 2, 3 ou 4, ele retornará este erro.

--------------------------------------------------------------

### Rota de Visualização da Lista de Amizades de Usuário

=> É a rota encarregada de entregar a coluna de amizades que o usuário possui, assim como as outras, necessita de autorização do token gerado em seu login para poder ser acessada.

**Requisições**:

*id1*: 
*id2*:

**Respostas**: 

Lista de amigos do Usuário. - (200)

**Erros**:

*Usuário ainda não tem amigos.* - (400)
--> Caso o usuário ainda não tenha nenhum vinculo associado dentro do banco de dados e faça essa requisição, esse erro retornará.

*Erro ao tentar encontrar o ID do Usuário.* - (404)

*Usuário não encontrado.* - (400)