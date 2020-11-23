# API - One Destiny

### 1.1.4v

API destinado para uso do aplicativo *ONE DESTINY*, este Readme será destinado para especificar quais rotas estão sendo trabalhadas e como usa-las nos aplicativos Mobile e Desktop. 

Rotas implementadas:

1. [x] Usuários Normal - Free e Premium
2. [] Usuários Admin
3. [] Noticias
4. [] Mesas

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

![](https://media.tenor.com/images/ba7c5b067adef9c879fa18888464872d/tenor.gif)
>Você consegue, dê o seu melhor!