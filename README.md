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