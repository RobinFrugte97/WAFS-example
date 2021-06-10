import { toggleLoader } from "./loader.js"

let breedUrl = '' 
const apiUrl = 'api.thecatapi.com/v1/breeds'
const url = `https://${apiUrl}`
let dataResponse = {}


// Function that fetches data for the overview page
export async function fetchData(breed) {
    if(breed) {
        breedUrl = `https://api.thecatapi.com/v1/images/search?limit=10&breed_id=${breed}`
    }
    // Toggle loader ON before the fetch
    toggleLoader()
    // Fetch the data from the api and turn it into json before sending it back
    breed ? dataResponse = await fetch(breedUrl) : dataResponse = await fetch(url)
    
    const jsonData = dataResponse.json()
    
    // Toggle loader OFF after the fetch
    toggleLoader()
    
    return jsonData
}