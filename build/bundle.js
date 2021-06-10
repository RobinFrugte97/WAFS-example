
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function () {
    'use strict';

    const loader = document.getElementById("loader");

    function toggleLoader() {
        loader.classList.toggle("visible");
    }

    let breedUrl = ''; 
    const apiUrl = 'api.thecatapi.com/v1/breeds';
    const url = `https://${apiUrl}`;
    let dataResponse = {};


    // Function that fetches data for the overview page
    async function fetchData(breed) {
        if(breed) {
            breedUrl = `https://api.thecatapi.com/v1/images/search?limit=10&breed_id=${breed}`;
        }
        // Toggle loader ON before the fetch
        toggleLoader();
        // Fetch the data from the api and turn it into json before sending it back
        breed ? dataResponse = await fetch(breedUrl) : dataResponse = await fetch(url);
        
        const jsonData = dataResponse.json();
        
        // Toggle loader OFF after the fetch
        toggleLoader();
        
        return jsonData
    }

    const breedOverview = 
`<a href='./#{id}'>
    <li>
        <h3>{name}</h3>
        <img src='{src}' alt='Picture of {name}' />
    </li>
</a>`;

    const breedDetail = 
`<section>
    <h2 id='detailName'>{name}</h2>
    <div id='detailImageContainer'>
        -images-
    </div>
    <a href="./#">Back</a>
</section>`;

    const images = 
`<img class='detailImg' src='{src}' alt='{name}'>`;

    /* 
    - Function that selects which type of template is needed
    - If the given type is overview, compile the overview template with the data
    - If the given type is detail, compile the detail template with the data and a child template
    */
    function selectTemplate(data, type) {
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
                let childComponent = compileChild(value, child);
                template = template.replaceAll(`-${key}-`, childComponent);
            }

            template = template.replaceAll(`{${key}}`, value);
        }
        return template
    }

    /*
    - Function that compiles the given value array into the given child template
    - For each entry of the value array, inject the value into a child template and add them all up (currently hardcoded to only replace `src` variables)
    - Return the compiled child template to the main template
    */
    function compileChild(valueObject, childComponent) {
        let component = '';
        for (const [key, value] of Object.entries(valueObject)) {
            if(Array.isArray(value)) {
                value.forEach(value => {
                    component += childComponent.replaceAll(`{${key}}`, value);
                });
            }
            component = component.replaceAll(`{${key}}`, value);
        }
        return component
    }

    function selectOverviewData(data) {
        return { 'name': data.name, 'src': data.image.url, 'id': data.id }
    }
    function selectBreedData(data) {
        let usedData = { 'name': data[0].breeds[0].name, 'images': { 'src': [], 'name': data[0].breeds[0].name} };
        data.forEach(data => usedData.images.src.push(data.url));
        return usedData
    }

    // Function that checks whether to render the overview of the detailpage
    function render(data, detail) {
        detail ? renderDetail(data) : renderOverview(data);
    }

    // Function that renders the overview page
    function renderOverview(data) {
        const breedList = document.getElementById("kittyBreeds");

        breedList.innerHTML = '';

        data.forEach(data => {
            if (!data.image || !data.image.url) { return }
            
            /* A variable that contains the html of the overview page. A selection of the data 
                is sent to the templating function. More about that in templating.js */
            let breedListItem = selectTemplate(selectOverviewData(data), "overview");

            breedList.insertAdjacentHTML('beforeend', breedListItem);
        });
    }

    // Function that renders the detail page
    function renderDetail(data) {
        const breedDetail = document.getElementById("kittyDetail");
        
        breedDetail.innerHTML = '';
        /* A variable that contains the html of the detail pages. A selection of the data
        is sent to the templating function. More about that in templating.js */
        let breedDetailcontent = selectTemplate(selectBreedData(data), "detail");
        
        breedDetail.insertAdjacentHTML('beforeend', breedDetailcontent);
    }

    /*
    - Function that adds the eventlistener to the searchbar
    - A function will fire everytime a key is pressed inside the searchbar
    - Send the api data and the userinput to a function that will match the two
    - Send the filtered data to the render function
    */
    function search(data){
        const searchBar = document.getElementById("searchBar");
        
        searchBar.addEventListener("input", async (event) => {
            event.preventDefault;
            let userInput = searchBar.value;
            
            let filtered = await filterData(data, userInput);
            
            render(filtered);
        });
    }

    // Function that matches the user input to every entry of the data. Returns a list that matches the userinput 
    function filterData(data, input) {
        return data.filter(breed => {
            if (breed.name.toLowerCase().match(input.toLowerCase())) {
                return true
            }
        })
    }

    // https://codepen.io/robertheiser/pen/NXrqXa

    var container = document.getElementById('animate');
    var emoji = ['🐱', '😼', '😹', '🙀', '😿', '😻', '😺', '😸', '😽'];
    var circles = [];

    for (var i = 0; i < 20; i++) {
        addCircle(i * 150, [10 + 0, 300], emoji[Math.floor(Math.random() * emoji.length)]);
        addCircle(i * 150, [10 + 0, -300], emoji[Math.floor(Math.random() * emoji.length)]);
        addCircle(i * 150, [10 - 200, -300], emoji[Math.floor(Math.random() * emoji.length)]);
        addCircle(i * 150, [10 + 200, 300], emoji[Math.floor(Math.random() * emoji.length)]);
        addCircle(i * 150, [10 - 400, -300], emoji[Math.floor(Math.random() * emoji.length)]);
        addCircle(i * 150, [10 + 400, 300], emoji[Math.floor(Math.random() * emoji.length)]);
        addCircle(i * 150, [10 - 600, -300], emoji[Math.floor(Math.random() * emoji.length)]);
        addCircle(i * 150, [10 + 600, 300], emoji[Math.floor(Math.random() * emoji.length)]);
    }



    function addCircle(delay, range, color) {
        setTimeout(function () {
            var c = new Circle(range[0] + Math.random() * range[1], 80 + Math.random() * 4, color, {
                x: -0.15 + Math.random() * 0.3,
                y: 1 + Math.random() * 1
            }, range);
            circles.push(c);
        }, delay);
    }

    function Circle(x, y, c, v, range) {
        var _this = this;
        this.x = x;
        this.y = y;
        this.color = c;
        this.v = v;
        this.range = range;
        this.element = document.createElement('span');
        /*this.element.style.display = 'block';*/
        this.element.style.opacity = 0;
        this.element.style.position = 'absolute';
        this.element.style.fontSize = '100px';
        this.element.style.color = 'hsl(' + (Math.random() * 360 | 0) + ',80%,50%)';
        this.element.innerHTML = c;
        container.appendChild(this.element);

        this.update = function () {
            if (_this.y > 1200) {
                _this.y = 80 + Math.random() * 4;
                _this.x = _this.range[0] + Math.random() * _this.range[1];
            }
            _this.y += _this.v.y/4;
            _this.x += _this.v.x/4;
            this.element.style.opacity = .3;
            this.element.style.transform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
        };
    }

    function animate() {
        for (var i in circles) {
            circles[i].update();
        }
        requestAnimationFrame(animate);
    }

    animate();

    const detailSection = document.getElementById("kittyDetail");

    // Function that handles changes to the url hash
    async function router(data) {

        if(window.location.hash) {
            // If the url contains a hash, use that hash to make a new call to the api
            let breedData = await fetchData(location.hash.substring(1));

            // Render the data from the api call
            render(breedData, true);
            detailSection.classList.add("visible");
        } else {
            render(data);
            detailSection.classList.remove("visible");
        }

    }

    // IIFE to kickstart the website
    (async function init(){
        // Put results from fetch in a variable called data
        const data = await fetchData();

        // Send that data to be rendered
        render(data);

        // Initialize fire the router function on change in the url hash
        window.onhashchange = () => router(data);

        // Initialize the search feature
        search(data);

        // Flying kitties 😻
        animate();
    })();

}());
//# sourceMappingURL=bundle.js.map
