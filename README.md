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

<img src="https://user-images.githubusercontent.com/62184681/111214562-d5a48780-85b0-11eb-9e7e-e2856e35e0a7.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214361-a1c96200-85b0-11eb-985f-c7345a7f17e9.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214364-a1c96200-85b0-11eb-842b-e7595d7ceb44.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214365-a261f880-85b0-11eb-995e-3f93c9b80c8c.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214367-a261f880-85b0-11eb-9072-a364d5ea346d.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214368-a2fa8f00-85b0-11eb-86de-5e57b9aa8b25.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214371-a3932580-85b0-11eb-9219-5deff98e4fe3.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214379-a4c45280-85b0-11eb-85fb-d9e4bd3176ab.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214380-a4c45280-85b0-11eb-9d69-40c02b200b26.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214382-a55ce900-85b0-11eb-8087-bcb5f41cc2ef.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214383-a5f57f80-85b0-11eb-92e0-7189260959ec.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214388-a726ac80-85b0-11eb-83a5-7a7709adcb4a.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214392-a7bf4300-85b0-11eb-933d-0cf53bdb4da5.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214393-a857d980-85b0-11eb-986f-ea454e24608f.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214394-a857d980-85b0-11eb-8ca7-bddf6f532da0.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214423-aee65100-85b0-11eb-9158-f999b53cb64f.png"/>
<img src="https://user-images.githubusercontent.com/62184681/111214429-b0b01480-85b0-11eb-9f5e-9a7d8cf81b0b.png"/>


