import { breedOverview } from "../templates/breedOverview.js"
import { breedDetail } from "../templates/breedDetail.js"
import { images } from "../templates/breedImages.js"

/* 
- Function that selects which type of template is needed
- If the given type is overview, compile the overview template with the data
- If the given type is detail, compile the detail template with the data and a child template
*/
export function selectTemplate(data, type) {
    if (type === "overview") {
        return compileTemplate(breedOverview, data)
    } else if (type === "detail") {
        return compileTemplate(breedDetail, data, images)
    }
}

/* 
- Function that compiles the given data into the given template
- A For-loop that loops through all entries of data. The keys and values are made easily accessible by putting them into indentically named a variable 
- If a value is an object, it is assumed that a child template is needed 
    - Send the value object and the child template to be compiled
    - Place the compiled child template inside the main template. `-variable-` A dash on either side of a variable inside a template signifies a child template
- Checks to see if any key of the data objects matches the variables in the template. If so, the value is injected into the template
- Return the compiled template to the render function 
*/
function compileTemplate(template, data, child) {
    for (const [key, value] of Object.entries(data)) {
        if (typeof(value) === 'object') {
            let childComponent = compileChild(value, child)
            template = template.replaceAll(`-${key}-`, childComponent)
        }

        template = template.replaceAll(`{${key}}`, value)
    }
    return template
}

/*
- Function that compiles the given value array into the given child template
- For each entry of the value array, inject the value into a child template and add them all up (currently hardcoded to only replace `src` variables)
- Return the compiled child template to the main template
*/
function compileChild(valueObject, childComponent) {
    let component = ''
    for (const [key, value] of Object.entries(valueObject)) {
        if(Array.isArray(value)) {
            value.forEach(value => {
                component += childComponent.replaceAll(`{${key}}`, value)
            })
        }
        component = component.replaceAll(`{${key}}`, value)
    }
    return component
}