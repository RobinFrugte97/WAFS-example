import { selectTemplate } from "./templating.js"
import { selectBreedData, selectOverviewData } from "./dataSelect.js"

// Function that checks whether to render the overview of the detailpage
export function render(data, detail) {
    detail ? renderDetail(data) : renderOverview(data)
}

// Function that renders the overview page
function renderOverview(data) {
    const breedList = document.getElementById("kittyBreeds")

    breedList.innerHTML = ''

    data.forEach(data => {
        if (!data.image || !data.image.url) { return }
        
        /* A variable that contains the html of the overview page. A selection of the data 
            is sent to the templating function. More about that in templating.js */
        let breedListItem = selectTemplate(selectOverviewData(data), "overview")

        breedList.insertAdjacentHTML('beforeend', breedListItem)
    })
}

// Function that renders the detail page
function renderDetail(data) {
    const breedDetail = document.getElementById("kittyDetail")
    
    breedDetail.innerHTML = ''
    /* A variable that contains the html of the detail pages. A selection of the data
    is sent to the templating function. More about that in templating.js */
    let breedDetailcontent = selectTemplate(selectBreedData(data), "detail")
    
    breedDetail.insertAdjacentHTML('beforeend', breedDetailcontent)
}