# Restaurante FoodFy

Um projeto de prática sobre uma rede de restaurantes online

## Sobre o projeto

FoodFy é uma aplicação onde poderá ser catalogado receitas passo a passo, desde os ingredientes, até o modo de preparo e informações adicionais, mas ela tem que ser atribuida a um chef previamente cadastrado no sistema. 

Apenas usuários que estejam cadastrados no sistema poderão visualizar as partes de administração, mas usuários comuns que apenas visitam o site poderão visualizar e buscar por receitas, além de ver a listagem dos chefs de cozinha.

Usuários que não são **administradores** do sistema, poderão apenas cadastrar receitas por um chef, editar e deletar estas receitas, não podendo editar ou deletar receitas de outros usuários e não podendo cadastrar chefs no sistema.

Já os que possuem esta permissão e apenas estes, poderão cadastrar outros usuários no sistema, editar e deletar, além de lhes conceder a permissão de administrador, podendo revogar esta permissão, caso seja necessário. Os administradores poderão também editar e deletar os chefs e as receitas de qualquer usuário.

## O que usamos?

Usamos diversas ferramentas para construir este aplicativo, como `HTML5` e `CSS3` para a construção das páginas e o usamos uma template engine `Nunjucks` para nos ajudar nesta construção.

Usamos `javascript` com `node.js` para construir as funcionalidades do aplicativo tanto na parte do backend, quanto na parte do frontend e usamos o `express.js` para a construção do nosso servidor.

Para a sessão de usuário, na parte de cadastro e recuperação de senha, utilizamos o `nodemailer` para enviar um email para o usuário e também utilizamos o "mailtrap.io" para testarmos.

Para finalizar, utilizamos o `Postgres` como banco de dados.

## Imagens do sistema
