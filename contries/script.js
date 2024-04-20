

// // fetch se api ka data access kar sakte hai
// // .then ki help data ko access kar skte hai
// // .then jo hai yeh callback function


// ///////////////////////////////
// // fetch('https://restcountries.com/v3.1/all')
// // .then((res)=>res.json())
// // .then((data)=>{
// //     data.forEach((country) => {
// //         console.log(country);
// //     });
// // })


// const countriesContainer=document.querySelector(
//     '.coutries-container '
// )


// //  card bnayege js se not html se
// // anchor create ho jayega
// const countryCard=document.createElement('a');

// // isse class laag jayega
// countryCard.classList.add('country-card');

// // image tag create karna hai then add to anchor tag



// // this is not apprach to create ak do element creat karna ho toh thik hai 

// // varna ` `  ==> isse help se hi kare.

// // const cardImg=documentElement('img');
// // cardImg.src='https://flagcdn.com/us.svg'
// // countryCard.append(cardImg);


// // shortcut seee kareee card create karna 


// const cardHTML=`        

// <img src="https://flagcdn.com/us.svg" alt="flag">
        
// <div class="card-text">
//     <h3 class="card-title">USA</h3>
//         <p><b>Population: </b>9,84,94,8484</p>
//         <p><b>Region: </b>North America</p>
//         <p><b>Capital: </b>Washington dc</p>

// </div>

// `
// countryCard.innerHTML=cardHTML


// countriesContainer.append(countryCard)






const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')

let allCountriesData

fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })

filterByRegion.addEventListener('change', (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})

function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `/country.html?name=${country.name.common}`
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                'en-IN'
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `
    countriesContainer.append(countryCard)
  })
}


searchInput.addEventListener('input',  (e) => {
  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(filteredCountries)
})

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})

