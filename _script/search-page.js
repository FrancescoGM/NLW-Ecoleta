const buttonSearch = document.querySelector('#page-home main a')
const model = document.querySelector('#modal')
const closeModel = document.querySelector('#modal .header a')

buttonSearch.addEventListener('click', () => {
    model.classList.remove('hide')
})

closeModel.addEventListener('click', () => {
    model.classList.add('hide')
})