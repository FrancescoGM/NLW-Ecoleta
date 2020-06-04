document.querySelector('select[name="uf"]').addEventListener('change', getCities)

function getFetch(url, object) {
    fetch(url)
        .then((response) => response.json())
        .then((values) => {
            values.forEach((value => {
                object.innerHTML += `<option value="${value.id}">${value.nome}</option>`
            }))
        })
}

function populateUFs() {
    const stateSelect = document.querySelector('select[name="uf"]')
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    getFetch(url, stateSelect)
}

populateUFs()

function getCities(event) {
    const citiesSelect = document.querySelector('select[name="city"]')
    const stateInput = document.querySelector('input[name="state"]')
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`

    stateInput.value = event.target.options[event.target.selectedIndex].text

    citiesSelect.innerHTML = ""
    if (document.querySelector('select[name="uf"]').value != "") {
        citiesSelect.disabled = false
        getFetch(url, citiesSelect)
    } else {
        citiesSelect.disabled = true
    }
}