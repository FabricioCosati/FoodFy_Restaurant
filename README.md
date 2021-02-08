# Restaurante FoodFy

Um projeto de prática sobre uma rede de restaurantes online

## 1° Etapa

Nesta primeira etapa, construímos o corpo do projeto, os arquivos de HTML e CSS, além de termos um arquivo `data.js` que contém as informações **estáticas** das receitas: 

### JSON

``` json
{
    "image": "burger",
    "title": "Triplo bacon burger",
    "chef": "Jorge Relato"
}
```
 Então com uma template engine chamada de **Nunjucks**, podemos pegar os dados deste arquivo no front-end e organiza-los: 
 
### Nunjucks

 ```html 
 {% for recipe in recipes %}
    <div class="card">
        <img id="{{recipe.image}}" src="assets/{{recipe.image}}.png" alt="{{recipe.title}}">
        <h4>{{recipe.title}}</h4>
        <p>por {{recipe.chef}}</p>
    </div>
{% endfor %}
```

Nesta etapa támbem definimos as rotas e baixamos as dependências necessárias para o decorrer do projeto.

***

## 2° Etapa

Na segunda etapa, construimos as rotas para a área de administração do sistema, onde o usuário poderá cadastrar, visualizar, editar e deletar uma nova receita

### Rotas

``` javascript
router.get("/admin/recipes", recipes.index)
router.get("/admin/create", recipes.create)
router.get("/admin/:id", recipes.show)
router.get("/admin/recipes/:id/edit", recipes.edit) 

router.post("/admin/recipes", recipes.post)
router.put("/admin/recipes", recipes.put) 
router.delete("/admin/recipes", recipes.delete)
```

Agora na parte de `data.json` adicionamos novos campos, além de manter os dados antigos, acrescentamos o `id`,`recipe_url`, `ingedients[]`, `preparation[]` e `details` os campos de ingredientes e modo de preparo vão conter um array com todos os itens que o usuário colocar

## JSON

``` json
{
    "id": 1,
    "title": "Triplo bacon burger",
    "chef": "Jorge Relato",
    "recipe_url": "burger",
    "ingredients": [
        "3 kg de carne moída (escolha uma carne magra e macia)",
        "300 g de bacon moído",
        "1 ovo"
    ],
    "preparation": [
        "3 kg de carne moída (escolha uma carne magra e macia)",
        "300 g de bacon moído",
        "1 ovo"
    ],
    "details": "Detalhes adicionas da receita"
}
```

Um arquivo `recipes.js` foi criado para conter todos os métodos necessários para a criação de uma nova receita, onde este é responsável por fazer a validação e inserir estes dados no `data.json`.

Também mudamos a estilização do `header` da parte de administração.