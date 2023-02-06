export default function getRefs(){
    return {
        input:document.querySelector(`[name=searchQuery]`),
        form: document.querySelector('#search-form'),
        btn: document.querySelector(`[type=submit]`),
        gallery: document.querySelector(`.gallery`),
        loadMoreBtn: document.querySelector(`.load-more`)
       
}
}