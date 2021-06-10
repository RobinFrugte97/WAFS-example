import { fetchData } from "./modules/fetch.js"
import { render } from "./modules/render.js"
import { search } from "./modules/search.js"
import { animate } from "./modules/background.js"
import { router } from "./modules/router.js"

// IIFE to kickstart the website
(async function init(){
    // Put results from fetch in a variable called data
    const data = await fetchData()

    // Send that data to be rendered
    render(data)

    // Initialize fire the router function on change in the url hash
    window.onhashchange = () => router(data);

    // Initialize the search feature
    search(data)

    // Flying kitties 😻
    animate()
})()