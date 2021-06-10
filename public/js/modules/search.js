import { render } from "./render.js"

/*
- Function that adds the eventlistener to the searchbar
- A function will fire everytime a key is pressed inside the searchbar
- Send the api data and the userinput to a function that will match the two
- Send the filtered data to the render function
*/
export function search(data){
    const searchBar = document.getElementById("searchBar")
    
    searchBar.addEventListener("input", async (event) => {
        event.preventDefault
        let userInput = searchBar.value
        
        let filtered = await filterData(data, userInput)
        
        render(filtered)
    })
}

// Function that matches the user input to every entry of the data. Returns a list that matches the userinput 
function filterData(data, input) {
    return data.filter(breed => {
        if (breed.name.toLowerCase().match(input.toLowerCase())) {
            return true
        }
    })
}