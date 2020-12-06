# API - One Destiny

### 1.2.4v

API destinado para uso do aplicativo *ONE DESTINY*, este Readme será destinado para especificar quais rotas estão sendo trabalhadas e como usa-las nos aplicativos Mobile e Desktop. 

Rotas implementadas:

1. [x] Usuários Normal - Free e Premium
2. [x] Usuários Admin
3. [x] Usuários Mod
4. [x] Noticias
5. [x] Mesas

## Atualização Recente

#### +Alterado as rotas a seguir:
 
  /users/normal/dataview/id     --> Verbo; GET parametrizado
  /users/normal/signin          --> Verbo; de GET para POST
  /users/normal/datachange/:id  --> Verbo; de PUT para PATCH parametrizado

#### +Adição de permissão HTTP - CORS para o APP-API (Permite que a API se comunica livremente com outras aplicações pela chave de autorização JWT.).
##### OBS: Próximo patch (1.3.0v) trará a seguinte atualização: 
    +Mudança das URLs de User para "IDs" criptografadas.

Utilize o comandos para as seguintes inicializações: 

1. nodemon index.js

Caso ocorra algum erro, reportar em "Issues" deste repositório.

![](https://media.tenor.com/images/ba7c5b067adef9c879fa18888464872d/tenor.gif)
>Você consegue, dê o seu melhor!


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