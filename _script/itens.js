function handleSelectedItem(event) {
    event.target.classList.toggle("selected")

    const itemId = event.target.dataset.id
    const selected = selectedItems.findIndex(item => item == itemId)

    if (selected != -1) {
        selectedItems = selectedItems.filter(item => item != itemId)
    } else {
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}

let selectedItems = []
const itemsToCollect = document.querySelectorAll('.items-grid li')
const collectedItems = document.querySelector('input[name=items]')
itemsToCollect.forEach((item) => item.addEventListener('click', handleSelectedItem))