import { render } from "./render.js"
import { fetchData } from "./fetch.js"

const detailSection = document.getElementById("kittyDetail")

// Function that handles changes to the url hash
export async function router(data) {

    if(window.location.hash) {
        // If the url contains a hash, use that hash to make a new call to the api
        let breedData = await fetchData(location.hash.substring(1))

        // Render the data from the api call
        render(breedData, true)
        detailSection.classList.add("visible")
    } else {
        render(data)
        detailSection.classList.remove("visible")
    }

}