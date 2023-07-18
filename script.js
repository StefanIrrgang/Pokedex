let currentPokemon;
let species;
let evolution;
let thisPokemon;
let currentPokeIndex;
let pokeIndex = 0;
let loadStop = 30;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function init() {
    pokeIndex = 0;
    loadStop = 30;
    loadListOfPokemon();
}

//////////////////////////////////////////////////////////////Get Poke List//////////////////////////////////////////////////////////////////

async function loadListOfPokemon() {
    let pokeList = document.getElementById('pokeList');
    pokeList.innerHTML = '';
    pokeIndex = 0;

    for (let i = pokeIndex; i < 151; i++) {
        pokeIndex = i + 1;
        let url = `https://pokeapi.co/api/v2/pokemon/${pokeIndex}`;
        let response = await fetch(url);
        thisPokemon = await response.json();
        let pokeImg = thisPokemon['sprites']['other']['official-artwork']['front_default'];
        pokeList.innerHTML += renderListOfPokemon(pokeImg, i);
        renderListOfPokemonTypes(i);
        colorFinderList(i);
        if (pokeIndex === loadStop) {
            break;
        }
    }
    pokeList.innerHTML += renderBottomMargin();
}

function loadMorePokemon() {
    loadStop = loadStop + 30;
    loadListOfPokemon();
}

///////////////////////////////////////////////////////////render Poke List//////////////////////////////////////////////////////////////////

function renderListOfPokemonTypes(j) {
    let pokeType = document.getElementById(`poke-card-list-pokeType${thisPokemon['id']}`);

    for (let i = 0; i < thisPokemon['types'].length; i++) {
        const type = thisPokemon['types'][i]['type']['name'];
        pokeType.innerHTML += `
            <div class="type-list" id="typeList${i}${j}">${capitalizeFirstLetter(type)}</div>
        `;
        colorFinderTypeList(capitalizeFirstLetter(type), i, j);

    }
}

////////////////////////////////////////////////////load colors ////////////////////////////////////////////////////////////////////////////////////////////////

function colorFinderList(i) {
    document.getElementById(`pokeCardList${i}`).classList.add(`background-color-${capitalizeFirstLetter(thisPokemon['types'][0]['type']['name'])}`);

}

function colorFinderTypeList(type, i, j) {
    document.getElementById(`typeList${i}${j}`).classList.add(`background-color-type-${type}`);
}



//////////////////////////////////////////////////////////////get List of clicked Pokemon//////////////////////////////////////////////////////////////////////////////

function setCurrentPokeIndex(pokeId) {
    currentPokeIndex = pokeId;
    loadPokemon();

}

async function loadPokemon() {

    let url = `https://pokeapi.co/api/v2/pokemon/${currentPokeIndex}`;
    let urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${currentPokeIndex}/`;
    let urlEvolution = `https://pokeapi.co/api/v2/evolution-chain/${currentPokeIndex}/`;
    let response = await fetch(url);
    let responseSpecies = await fetch(urlSpecies)
    let responseEvolution = await fetch(urlEvolution);
    currentPokemon = await response.json();
    species = await responseSpecies.json();
    evolution = await responseEvolution.json();

    renderPokeCard(currentPokeIndex);
    renderPokemonInfo();
    checkCurrentIndex();
}

/////////////////////////////////////////////////////////render Pokemon Card//////////////////////////////////////////////////////////////////////////////////////////////////

function renderPokemonInfo() {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('pokeName').innerHTML = capitalizeFirstLetter(currentPokemon['name']);
    document.getElementById('pokeIndex').innerHTML = `#${currentPokemon['id']}`;
    renderTypes();
    renderAbout();
    let pokeImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokeimg').innerHTML = `<img class="poke-img" src="${pokeImg}">`;
}

function renderTypes() {
    let pokeType = document.getElementById('pokeType');
    pokeType.innerHTML = '';
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        const type = capitalizeFirstLetter(currentPokemon['types'][i]['type']['name']);
        pokeType.innerHTML += `
            <div class="type" id="pokeCardType${i}">${type}</div>
        `;
        colorFinderCardType(i, type);
    }

}

function colorFinderCardType(i, type) {
    document.getElementById(`pokeCardType${i}`).classList.add(`background-color-type-${type}`);
}


//////////////////////////////////////////////////////////////About////////////////////////////////////////////////////////////////////////
function renderAbout() {
    let pokeInfos = document.getElementById('pokeInfo');

    pokeInfos.innerHTML = renderAboutHtml();
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        let pokeInfo = currentPokemon['abilities'][i]['ability']['name'];
        pokeInfo = capitalizeFirstLetter(pokeInfo)
        document.getElementById('abilities').innerHTML += `<span>${pokeInfo}<br> </span>`;
    }
}

///////////////////////////////////////////////////Chart from BaseStats//////////////////////////////////////////////////////////////////

function renderBaseStats() {
    let pokeInfos = document.getElementById('pokeInfo');

    pokeInfos.innerHTML = `
    <div class="chart">
        <canvas id="myChart"></canvas>
    </div>
    `;
    renderbarChart();
}


///////////////////////////////////////////////////////////////////Poke Evolution///////////////////////////////////////////////////////////////
async function getEvolutionChain() {
    let evoChainId = species['evolution_chain']['url'];
    evoChainId = evoChainId.slice(42);
    let responseEvolutionChain = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${evoChainId}`);
    let eveolutionChain = await responseEvolutionChain.json();
    getEvolutionInfos(eveolutionChain);
}


async function getEvolutionInfos(eveolutionChain) {

    let pokename1 = eveolutionChain['chain']['species']['name'];
    let responseEveloutionPokemon1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename1}`);
    let eveloutionPokemon1 = await responseEveloutionPokemon1.json();
    let evolutionImgSrc1 = eveloutionPokemon1['sprites']['other']['official-artwork']['front_default'];

    if (eveolutionChain['chain']['evolves_to'].length > 0) {
        if (eveolutionChain['chain']['evolves_to'][0]['evolves_to'].length > 0) {
            let pokename2 = eveolutionChain['chain']['evolves_to'][0]['species']['name'];
            let responseEveloutionPokemon2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename2}`);
            let eveloutionPokemon2 = await responseEveloutionPokemon2.json();
            let evolutionImgSrc2 = eveloutionPokemon2['sprites']['other']['official-artwork']['front_default'];
            let evolutionLvl1 = eveolutionChain['chain']['evolves_to'][0]['evolution_details'][0]['min_level'];
            let pokename3 = eveolutionChain['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
            let responseEeveloutionPokemon3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename3}`);
            let eveloutionPokemon3 = await responseEeveloutionPokemon3.json();
            let evolutionImgSrc3 = eveloutionPokemon3['sprites']['other']['official-artwork']['front_default'];
            let evolutionLvl2 = eveolutionChain['chain']['evolves_to'][0]['evolves_to'][0]['evolution_details'][0]['min_level'];
            renderEvolution3(evolutionImgSrc1, evolutionImgSrc2, evolutionImgSrc3, evolutionLvl1, evolutionLvl2, eveolutionChain);
        } else if (eveolutionChain['chain']['evolves_to'].length > 0 && eveolutionChain['chain']['evolves_to'][0]['evolves_to'].length == 0) {
            let pokename2 = eveolutionChain['chain']['evolves_to'][0]['species']['name'];
            let responseEveloutionPokemon2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename2}`);
            let eveloutionPokemon2 = await responseEveloutionPokemon2.json();
            let evolutionImgSrc2 = eveloutionPokemon2['sprites']['other']['official-artwork']['front_default'];
            let evolutionLvl1 = eveolutionChain['chain']['evolves_to'][0]['evolution_details'][0]['min_level'];
            renderEvolution2(evolutionImgSrc1, evolutionImgSrc2, evolutionLvl1, eveolutionChain);
        }
    } if (eveolutionChain['chain']['evolves_to'].length == 0) {
        renderEvolution1(evolutionImgSrc1);
    }
}

/////////////////////////////////////////////////////////////////Poke Moves////////////////////////////////////////////////////////////

function renderMoves() {
    let pokeMoves = document.getElementById('pokeInfo');
    pokeMoves.innerHTML = renderMovesHtmlContainer();

    let pokeMovesContainer = document.getElementById('pokeMoveContainer');
    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        const pokeMove = currentPokemon['moves'][i]['move']['name'];

        pokeMovesContainer.innerHTML += renderMovesHtml(pokeMove);
    }
}

////////////////////////////////////////////////PokeCard Top Icons/////////////////////////////////////////////////////

function closePokeCard() {
    document.getElementById('overlay').classList.add('d-none');
}



function checkCurrentIndex() { //runs in loadPokemon() function
    if (currentPokeIndex === 151) {
        document.getElementById('btn-next').classList.add('btn-disabled');
    } else if (currentPokeIndex === 1) {
        document.getElementById('btn-previous').classList.add('btn-disabled');
    } else {
        document.getElementById('btn-next').classList.remove('btn-disabled');
        document.getElementById('btn-previous').classList.remove('btn-disabled');
    }
}

function previousPokemon() {
    currentPokeIndex--;
    loadPokemon();
}

function nextPokemon() {
    currentPokeIndex++;
    loadPokemon();
}

function likePokemon(pokeId) {
    document.getElementById(`heartempty${pokeId}`).classList.add('d-none');
    document.getElementById(`heartfull${pokeId}`).classList.remove('d-none');
}

function dislikePokemon(pokeId) {
    document.getElementById(`heartempty${pokeId}`).classList.remove('d-none');
    document.getElementById(`heartfull${pokeId}`).classList.add('d-none');
}


//////////////////////////////////////////////////////search//////////////////////////////////////////////////////////////////////////////////////
async function search() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    if (search.length === 0) {
        init();
    } else if (search.length % 3 === 0) {
        let pokeList = document.getElementById('pokeList');
        pokeList.innerHTML = '';
        pokeIndex = 0;
        for (let i = pokeIndex; i < 151; i++) {
            pokeIndex = i + 1;
            let url = `https://pokeapi.co/api/v2/pokemon/${pokeIndex}`;
            let response = await fetch(url);
            thisPokemon = await response.json();
            let pokeImg = thisPokemon['sprites']['other']['official-artwork']['front_default'];
            let pokeName = thisPokemon['name'];

            if (pokeName.toLowerCase().includes(search)) {
                pokeList.innerHTML += renderListOfPokemon(pokeImg, i);
                renderListOfPokemonTypes(i);
                colorFinderList(i);
            }
        }
    }
}