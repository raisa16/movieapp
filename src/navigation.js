let page = 1;
let infiniteScroll;
let maxPage;
searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value
})

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends='
})

arrowBtn.addEventListener('click', () => {
    history.back;
    location.hash = '#home='
})
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll)

function navigator() {
    console.log({ location})

    if(infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, {passive: false});
        infiniteScroll = undefined;
    }
    
  window.scrollTo(0, 0);
    if(location.hash.startsWith('#trends')){
        trendsPage()
    } else if(location.hash.startsWith('#search=')){
        searchPage()
    } else if(location.hash.startsWith('#movie=')){
        moviePage()
    } else if(location.hash.startsWith('#category=')){
        categoriesPage()
    } else {
        homePage();
    }

    if(infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, {passive: false});
    }   
    location.hash;
}

function homePage() {
    console.log('HOME!!!!')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

getTrendingMoviesPreview()
getCategoriesPreview()

}
function trendsPage() {
    console.log('TRENDS!!!');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = "Tendencias";
    
    getTrendingMovies()

    infiniteScroll = getPaginatedTrendingMovies;
}
function searchPage() {
    console.log('Search!!!')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [, query] = location.hash.split('=');

    getMoviesBySearch(query);
    infiniteScroll = getPaginatedMoviesBySearch(query);
}
function moviePage() {
    console.log('Movie!!!')
    
    headerSection.classList.add('header-container--long')
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    
    const [, movieId] = location.hash.split('=');

    getMovieById(movieId);
}
function categoriesPage() {
    console.log('Categories!!!')
     
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    const [, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    
    headerCategoryTitle.innerHTML = categoryName;
    getMoviesByCategory(categoryId);
    infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}