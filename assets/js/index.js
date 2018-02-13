`use strict`

const $form = $('#search-form');
const $searchField = $('#search-keyword');
const $responseContainer = $('#response-container');
let searchedForText;

$form.submit(function(e) {
  e.preventDefault();
  $responseContainer.html('');
  searchedForText = $searchField.val();
  getNews();
});

function getNews() {
  /*const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=79494dd65fee4ccbbf00b1fff80bccd4`);
  articleRequest.onload = addNews;
  articleRequest.onerror= handleError;
  articleRequest.send();*/
  $.ajax({
    url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=79494dd65fee4ccbbf00b1fff80bccd4`
  }).done(addNews)
  .fail(handleError);
}

function addNews(news) {
  console.log(news);
  const articles = news.response.docs[0];

  articles.forEach(function(article){
    const title = article.headline.main;
    const snippet = article.snippet;

    let $li = $('<li />').addClass('articleClass').text(snippet);

    $responseContainer.append($li);
  });

  /*const title = article.headline.main;
  const snippet = article.snippet;

  let $li = $('<li />').addClass('articleClass').text(snippet);

  $responseContainer.append($li);*/

  /*const data = JSON.parse(this.responseText);
  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;

  let li = document.createElement('li');
  li.className = 'articleClass';
  li.innerText = snippet;

  responseContainer.appendChild(li);*/
}

function handleError() {
  console.log('Se ha presentado un error');
}