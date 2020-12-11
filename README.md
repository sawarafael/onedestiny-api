# API - One Destiny

### 2.0.0v — **ARRv**

API destinado para uso do aplicativo *ONE DESTINY*, este Readme será destinado para especificar quais rotas estão sendo trabalhadas e como usa-las nos aplicativos Mobile e Desktop. 

Rotas implementadas:

1. [x] Usuários Normal - Free e Premium
2. [x] Usuários Admin
3. [x] Usuários Mod
4. [x] Noticias e Tags
5. [x] Mesas
6. [x] Reporte de Absusos

## Atualização Recente

##### +Atualização na API — A Railgun Request.

###### Motivação

Foi percebido que as consultas dentro das rotas eram imprecisas, necessitando de que uma outra consulta fosse realizada para que enfim pudesse chegar no resultado desejado.

query1
  resultado1
    query2 com resultado1
      resultado2 + resultado1

Esse estilo em cascata aumentava o processamento da memória RAM em conjunto de também não entregar exatamente o que o Front End realmente precisa. Railgun é a ideia de que a requisição é capaz de atirar todas as informações que o front precisa num pedido só, evitando o que acontecia no modelo antigo, onde o front-end pedia por várias requisições e tais requisições realizavam diversas consultas em cascata.

###### O que mudou?

As rotas já existentes tiveram um mapeamento atualizadas de uma forma que suas consultas fossem feitas de uma vez só, evitando ao máximo uma consulta em cascata, assim podendo entregar os dados que o Front-End precisa tudo de uma vez só, sem que ele precise requisitar mais ainda da API.

Algumas rotas e models foram eliminadas por culpa da redundância, mas muito outras foram criadas para se tornarem tabelas-base ou tabelas-modelo, assim como os nomes das rotas foram encurtadas para fácil entendimento(porém, em futura atualização, por motivo de segurança, é necessário criptografar estes nomes).

###### Prós

1. Entrega todos os dados que o front-end precisa em uma requisição só. 
2. Nome das rotas foram atualizadas e mais fáceis de entender de seu propósito.
3. Adição de algumas rotas adicionais e complementares ao que fora pedido nas regras de negócio como: 

a) Visualização e Seleção de Insígnias/Medalhas para os Usuários.

b) Postagem de um Usuário, visualização deste, permissão de um Usuário comentar nesta postagem e também de visualizar todo este conteúdo de postagens e comentários dentro do perfil do usuário.

c) Criação de Tickets de Reportar um Usuário por um Abuso/Infração dentro do Sistema. Permissão para que ADMs e Moderadores possam visualizar tais Tickets e responderem aos respectivos casos.

d) Filtro de Seleção de Mesas para o Usuário(Por jogando, por Tags e por Amigos).

e) Criação e visualização detalhada de fichas.

4. O poder de escalonamento da API foi aumentado potencialmente para 16x4(A cada segundo ele espera que 16 novos registros sejam completados em cada 4 tabelas).

###### Contras

1. É preciso ter um conhecimento avançado e mais aprofundado em MySql, pois as consultas agora estão totalmente precisas e detalhadas de se acompanhar. (Proficiência em JOIN, AS, ON, IN, BETWEEN e GROUP BY com identificação quadricular).

2. Ainda precisa de alteração, como a criptografia das rotas, mas também é necessário a adição de uma lógica de filtro para as permissões(Apenas Usuário[Permissão mínima] e Administradores[Permissão máxima] foram trabalhados nesta nova versão).

___________________________________________________

Siga estas etapas para botar a API em funcionamento(considerando que o db de teste já foi criado):  

1. ***npm install***
2. Crie um arquivo ***.env*** ao lado de package.json e insira as seguintes variáveis:

DB_NAME=*nome do db de teste*

DB_HOST=localhost

DB_USER=root

DB_PASS=*senha para acessar este db*

API_PORT=3000

JWT_SECRET_TOKEN_MOD=*uma senha de acesso para o moderador.*

JWT_SECRET_TOKEN_PREMIUM=*uma senha de acesso para o premium.*

JWT_SECRET_TOKEN_USER=*uma senha de acesso para o usuário.*

JWT_SECRET_TOKEN_ADMIN=*uma senha de acesso para o administrador.*

3. Na última linha de ***index.js*** insira:

~~~javascript
conn
    .sync({
        logging: console.log,
        force: true
    }).catch((err) => {
        console.log(err)
    })
~~~

4. Após inserir este código, execute a API no terminel ou CMD pelo comando ***nodemon index.js*** e verifique se nele existiu uma série de criações de tabela SEM ERRO ALGUM(Se houver algum erro durante este processo, por favor, envie uma mensagem!) — Após todas computar todas as criações de todas as tabelas, finalize a conexão da API com *ctr+c*.

5. Remova o código que foi inserido no *index.js*

___________________________________________________



**Caso ocorra algum erro, reportar em "Issues" deste repositório!**



**==> Versionamento.**

(x.y.z) || X = Total / Y = Maior / Z = Menor

Quando todos os arquivos e todos módulos deste programa é atualizado em prol manter o sistema ainda funcionado é categorizado na variável de versão X.

Quando alguns arquivos ou módulos são atualizados e possuem grande significância na produção é categorizado na variável de versão y.

Quando um arquivo ou um módulo é atualizado e consegue manter a significância da produção é categorizado na variável de versão z.

**Exemplos: (1.0.0v)**

"Eu retirei a redudância de uma função e agora ele retorna um valor exato." - 1.0.1v

"Precisei analisar as classes e verificar corretamente qual saída iria para a outra classe naquela outra função, assim feito, atualizei o valor de retorno na saída tal, porém, precisei corrigir todas as outras classes deste único pacote também." - 1.1.0v

"Eu encontrei um problema no retorno que afeta todas as funções de todas as classes e de todos os pacotes, alterando todos os valores distribuídos entre eles, precisarei atualizar não só esse retorno debbugando, mas também de todas essas classes, pacotes e valores." - 2.0.0v

**Pequenas Regras a Seguir:**

1. Z é infinito, só é resetado de volta ao 0 quando Y acrescentar um novo valor.
2. Y possui as casas de [0 - 15], quando chega a valor de 15, reseta e adiciona um valor ao X.
3. X é infinito, mas não afeta Y e Z; porém é afetado por Y.

Exemplos rápidos:

12.5.128v  |  2.6.0v
1.14.13v   |  1.14.1v
1.5.1880v  |  1348.9.12v