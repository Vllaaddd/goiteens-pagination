import newsCardTPL from "./templates/news-card";

const searchForm = document.querySelector('.form-control');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const showLessBtn = document.querySelector('[data-action="show-less"]');
const btnFetch = document.querySelector('.btn-fetch');
const newsList = document.querySelector('.js-card-container');
const searchingTheme = document.querySelector('.serchingTheme')

let pageSize = 5;
btnFetch.disabled = true
loadMoreBtn.style.display = 'none';
showLessBtn.style.display = 'none';

searchForm.addEventListener('input', e => {
     
    if(searchForm.value.length == 0){
        btnFetch.disabled = true 
    }else{
        btnFetch.disabled = false
    }

})

btnFetch.addEventListener('click', e => {
    e.preventDefault();

    const query = searchForm.value || 'news'

    searchingTheme.innerHTML = `Ви шукаєте: ${query}`

    fetchSmth(query)

    loadMoreBtn.addEventListener('click', onLoadMore);

    function onLoadMore(){
        pageSize += 5;
    
        fetchSmth(query)
    }

    showLessBtn.addEventListener('click', onShowLess);

    function onShowLess(){
        if(pageSize > 5){
            pageSize -= 5;
        }else if (pageSize <= 5){
        }
    
        fetchSmth(query)
    }
    
    searchForm.value = '';
    showLessBtn.style.display = 'block';
    loadMoreBtn.style.display = 'block';
})

function fetchSmth(query){

    const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}`;
    const options = {
        headers: {
            'X-Api-Key': '0995556025d7441799e4c137e349a95b'
        }
    }

    fetch(url, options)
    .then(response => response.json())
    .then(news => {
        const markup = newsCardTPL(news);

        newsList.innerHTML = markup
    })
}