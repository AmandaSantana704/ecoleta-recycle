function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]')

     fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
     .then( res =>  res.json() )
     .then( states => {

            for( const state of states ){
                ufSelect.innerHTML += `<option value="${state.sigla}">${state.nome}</option>`

            }    
    })
  }
       
 populateUFs()

function getCities(event){
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')
    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState]
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
     
    citySelect.innerHTML = '<option value>Selecione a Cidade</option>'
    citySelect.disabled = true

    fetch(url)
    .then( res =>  res.json() )
    .then( cities => {


           for( const city of cities ){
               citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

           }
             citySelect.disabled = false      
   })

}

  document
       .querySelector('select[name=uf')
        .addEventListener('change', getCities )

    //ITEMS DE COLETA//

const itemsToCollect = document.querySelectorAll('.items-grid li')
 for(const item of itemsToCollect){
     item.addEventListener('click', handleSelectedItem)

 }
     const collectedItems = document.querySelector('input[name=items]');

   let selectedItems = []

 function handleSelectedItem(event){
     const itemLi = event.target

    itemLi.classList.toggle('selected')
     const itemId = event.target.dataset.id

    //  console.log('ITEM ID', itemId);

//verificar se existem itens selecionados, se sim
  //pegar os itens selecionados 
     const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item ==itemId
        return itemFound
    })
    // console.log(alreadySelected);
    
    //se já estiver selecionado, tirar da seleção
 if( alreadySelected >= 0){
    const filteredItems = selectedItems.filter(item =>{
        const itemIsDifferent = item != itemId  //false
        return itemIsDifferent
    })
    selectedItems = filteredItems
} else{
    selectedItems.push(itemId)

}

//   console.log('selectedItems: ', selectedItems)
  
    collectedItems.value = selectedItems

 }

 

  

