// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Stel het basis endpoint in
const apiUrl = 'https://fdnd.directus.app/items'

const data_c = await fetchJson('https://fdnd.directus.app/items/person/40')
const data_k = await fetchJson('https://fdnd.directus.app/items/person/41')
const data_v = await fetchJson('https://fdnd.directus.app/items/person/15')
console.log(data_k.data.id)

// Haal alle squads uit de WHOIS API op
const squadData = await fetchJson(apiUrl + '/squad')
// console.log(squadData.data)
// Maak een nieuwe express app aan
const app = express()

const game_element = [];
// console.log(game_element)

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

app.use(express.urlencoded({extented:true}))

// Maak een GET route voor de index
app.get('/', function (request, response) {
  // Haal alle personen uit de WHOIS API op
  fetchJson(apiUrl + '/person').then((apiData) => {
    // apiData bevat gegevens van alle personen uit alle squads
    // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view
    
    // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
    response.render('index', {
      persons: apiData.data, 
      squads: squadData.data, 
      data_c: data_c.data,
      data_v: data_v.data,
      data_k: data_k.data
    })
    // response.render('index', data)

  })
})



// Maak een POST route voor de window squad
// console.log("yes1")
app.post('/', function (request, response) {
  // Er is nog geen afhandeling van POST, redirect naar GET op /

  console.log(request.body)
  
  // console.log(apiResponse)
  // fetchJson('https://fdnd.directus.app/items/person/40' ).then((apiResponse) => {

  // try {
  //   apiData.data.custom = JSON.parse(apiData.data.custom)
  // } catch (error) {
  //   apiResponse.data.custom = []
  // }


  // if (!apiResponse.data.custom.game_element) {
  //   apiResponse.data.custom.game_element = []
  // } else if(request.body.element == "fire"){
  //   console.log("fire")
  // } else if(request.body.element == "water") {
  //   console.log("water")
  // } else if(request.body.element == "earth") {
  //   console.log("earth")
  // } else if(request.body.element == "wind") {
  //   console.log("wind")
  // }else{
  //   console.log("default")
  // };

  // console.log("POST request successful");
 

  // fetch('https://fdnd.directus.app/items/person/' + request.params.id, {
  //     method: 'PATCH',
  //     body: JSON.stringify({
  //       custom: apiResponse.data.custom
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8'
  //     }
  //   }).then((patchResponse) => {
  //     // Redirect naar de persoon pagina
  //     response.redirect(303, '/detail/' + request.params.id)
  //   })
  // })
  

  response.redirect(303, '/');
});



// Maak een GET route voor een detailpagina met een request parameter id
app.get('/person/:id', function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  fetchJson(apiUrl + '/person/' + request.params.id).then((apiData) => {
    // Render person.ejs uit de views map en geef de opgehaalde data mee als variable, genaamd person
    response.render('person', {person: apiData.data, squads: squadData.data})
  })
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8002)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
