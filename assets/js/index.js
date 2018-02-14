`use strict`

/*const $form = $('#search-form');
const $searchField = $('#search-keyword');
const $responseContainer = $('#response-container');
let searchedForText;*/

const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

/*$form.submit(function(e) {
  e.preventDefault();
  $responseContainer.html('');
  searchedForText = $searchField.val();
  getNews();
});*/

form.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

function getNews() {
  /*$.ajax({
    url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=79494dd65fee4ccbbf00b1fff80bccd4`
  }).done(addNews)
  .fail(handleError);*/

  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=79494dd65fee4ccbbf00b1fff80bccd4`);
  articleRequest.onload = addNews;
  articleRequest.onerror= handleError;
  articleRequest.send();
}

function addNews() {
  /*console.log(news);
  const articles = news.response.docs;

  articles.forEach(function(article){
    const title = article.headline.main;
    const snippet = article.snippet;

    let $li = $('<li />').addClass('articleClass').text(snippet);

    $responseContainer.append($li);
  });*/

  const data = JSON.parse(this.responseText);
  const articles = data.response.docs;

  articles.forEach(function(article){
    const title = article.headline.main;
    const snippet = article.snippet;

    let li = document.createElement('li');
    li.className = 'articleClass';
    li.innerText = snippet;

    responseContainer.appendChild(li);
  })
}

function handleError() {
  console.log('Se ha presentado un error');
}