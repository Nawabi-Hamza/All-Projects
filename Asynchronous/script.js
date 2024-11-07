'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const error = document.querySelector(".error")
///////////////////////////////////////

const renderCard = function(data,cn = ''){
    const html = `
        <article class="country ${cn}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
        </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend',html);
    countriesContainer.style.opacity = 1;
}


// const httpRequest =  function(method,url){
//     const request = new XMLHttpRequest()
//     request.open(method,url)
//     request.send()
//     return request;
// }
// const getCountryData = function(country){
//     const request = httpRequest("GET",`https://restcountries.com/v2/name/${country}`)
    
//     request.addEventListener('load',function(){
//         // console.log(this.responseText)
//         const data = JSON.parse(this.responseText)[0]
//         renderCard(data)

//         const [ neighbour ] = data.borders
//         if(!neighbour) return;
//         const request1 = httpRequest('GET',`https://restcountries.com/v2/alpha/${neighbour}`)
//         request1.addEventListener('load',function(){
//             const data1 = JSON.parse(this.responseText)
//             console.log(data1)
//             renderCard(data1,'neighbour')
//         })
        
    
//     })
// }
// getCountryData('iran')
// getCountryData('usa')
// getCountryData('france')
// getCountryData('afghanistan')

// function renderError(msg){
//     error.insertAdjacentHTML('beforeend',`<p>${msg}</p>`)
// }
// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v2/name/${country}`)
//     .then( response => {
//         console.log(response)
//         if(!response.ok) 
//             throw new Error(`Country not found ${response.status} ☄️☄️☄️`)
        
//         return response.json()
//     } )
//     .then( data => {
//         renderCard(data[0])
//         const [ neighbour ] = data[0].borders
//         if(!neighbour) return;
//         return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
//     })
//     .then( response => response.json() )
//     .then( data => renderCard(data,'neighbour'))
//     .catch( error => {
//         console.log(error)
//         renderError(`Something went wrong ☄️☄️☄️: ${error.message} try again!`)
//     })
//     .finally(()=>{
//         countriesContainer.style.opacity = 1;
//     })
// }




// function renderError(msg){
//     error.insertAdjacentHTML('beforeend',`<p>${msg}</p>`)
// }
// const getJSON = function(url,errorMsg='Country not found!'){
//     return fetch(url)
//     .then( response => {
//         if(!response.ok) 
//             throw new Error(`☄️ ${errorMsg} ${response.status} ☄️`)
//         return response.json()
//     } )
// }
// const getCountryData = function(country){
//     getJSON(`https://restcountries.com/v2/name/${country}`,'kjhkjhkjh')
//     .then( data => {
//         console.log(data)
//         // renderCard(data[0])
//         // const [ neighbour ] = data[0].borders
//         // if(!neighbour) return;
//         // // return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`,'no found')
//     })
//     // .then( data => renderCard(data,'neighbour'))
//     .catch( error => {
//         console.log(error)
//         renderError(`Something went wrong ☄️☄️☄️: ${error.message} try again!`)
//     })
//     .finally(()=>{
//         countriesContainer.style.opacity = 1;
//     })
// }




// const getCountryData = async function(country){
//     try{
//         const res = await fetch(`https://restcountries.com/v2/name/${country}`)
//         if(!res.ok) throw new Error("Country not found!")
//         const data = await res.json()
//         console.log(data[0])
//     }catch(error){
//         console.error(error)
//     }
// }



// btn.addEventListener('click',function(){
//     // error.innerHTML = ''
//     console.log('1: get country')
//     getCountryData('afghanistan')
//     console.log('2: End get country')
//     // getCountryData('afghanistandafds')
// })














const getJSON = function(url,errorMsg){
    return fetch(url)
        .then( response=>{
            if(!response.ok) throw new Error(`${errorMsg} (${response.status})`)
            return response.json()
        })
}


const capital = []
const get3CountryData = async function(c1,c2,c3){
    try{
        // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`)
        
        // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`)
        
        // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`)
        // capital.push(data1.capital,data2.capital,data3.capital)
        // console.log(capital)

        const data = await Promise.all([
            getJSON(`https://restcountries.com/v2/name/${c1}`),
            getJSON(`https://restcountries.com/v2/name/${c2}`),
            getJSON(`https://restcountries.com/v2/name/${c3}`)
        ])
        // data.flatMap( item => console.log(item) )

        data.flat().map( item => renderCard(item) )



    }catch(error){
        console.error(error)
    }
}



// btn.addEventListener('click',function(){
//     // error.innerHTML = ''
//     console.log('1: get country')
//     get3CountryData('afghanistan','usa','iran')
//     console.log('2: End get country')
//     // getCountryData('afghanistandafds')
// })


// (async function(){
//     const data = Promise.race([
//         getJSON(`https://restcountries.com/v2/name/afghanistan`),
//         getJSON(`https://restcountries.com/v2/name/usa`),
//         getJSON(`https://restcountries.com/v2/name/iran`)
//     ])
//     console.log(data[0])
// })()