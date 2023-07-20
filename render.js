function renderListOfPokemon(pokeImg, i) {
    return `
    <div class="poke-card-list" id="pokeCardList${i}" onclick="setCurrentPokeIndex(${thisPokemon['id']})">
        <div class="poke-card-list-id">#${thisPokemon['id']}</div>
        <div class="poke-card-list-name">${capitalizeFirstLetter(thisPokemon['name'])}</div>
        <div class="poke-card-list-bottom-container">
            <div class="poke-card-list-types" id="poke-card-list-pokeType${thisPokemon['id']}"></div>
            <img class="poke-card-list-picture" src="${pokeImg}">
        </div>
    </div>
    `;
}

function renderBottomMargin() {
    return `
    <div class="bottom">
    </div>
    `;
}

function renderPokeCard() {
    document.getElementById('pokeCard').innerHTML = `
    <div class="card-icons">
        <img class="card-icons-img" src="img/close64.png" onclick="closePokeCard()">
        <img class="card-icons-img" id="btn-previous" src="img/left64.png" onclick="previousPokemon()">
        <img class="card-icons-img" id="btn-next" src="img/right64.png" onclick="nextPokemon()">
        <img class="card-icons-img" src="img/heart64unfilled.png" id="heartempty${currentPokeIndex}" onclick="likePokemon(${currentPokeIndex})">
        <img class="card-icons-img d-none" src="img/heart64filled.png" id="heartfull${currentPokeIndex}" onclick="dislikePokemon(${currentPokeIndex})">
    </div>
    <div id="pokedex">
        <h1 id="pokeName">Name</h1>
        <h2 id="pokeIndex"></h2>
        <div id="pokeType"></div>
    </div>
    <div id="info-container" class="info-container">
        <div id="pokeimg">
    </div>
    <div class="navbar">
        <a onclick="renderAbout()" class="navbar-link" href="#">About</a>
        <a onclick="renderBaseStats()" class="navbar-link" href="#">Base Stats</a>
        <a onclick="getEvolutionChain()" class="navbar-link" href="#">Evolution</a>
        <a onclick="renderMoves()" class="navbar-link" href="#">Moves</a>
    </div>
    <div id="pokeInfo">
    </div>
</div>
    `
}

function renderEvolution1(img1) {
    let pokeEvolution = document.getElementById('pokeInfo');
    pokeEvolution.innerHTML = `
    <div class="evolution-info-container">
        <div class="evolution-info">
            <div>
                <img class="evolution-img" src="${img1}">
            </div>
            <span>${capitalizeFirstLetter(currentPokemon['name'])}</span>
        </div>
    </div>
    `;
}

function renderEvolution2(img1, img2, lvl1, eveolutionChain) {
    let pokeEvolution = document.getElementById('pokeInfo');
    pokeEvolution.innerHTML = `
    <div class="evolution-info-container">
        <div class="evolution-info">
            <div>
                <img class="evolution-img" src="${img1}">
            </div>
            <span>${capitalizeFirstLetter(eveolutionChain['chain']['species']['name'])}</span>
        </div>
        <div class="evolution-details">
            <span class="evolution-details-span">min Lvl ${evoSpecialCheck1(lvl1)}</span>
            <img src="img/levelup30.png">
        </div>
        <div class="evolution-info">
            <div>
                <img class="evolution-img" src="${img2}">
            </div>
            <span>${capitalizeFirstLetter(eveolutionChain['chain']['evolves_to'][0]['species']['name'])}</span>
        </div>
    </div>
    `;
}

function renderEvolution3(img1, img2, img3, lvl1, lvl2, eveolutionChain) {
    let pokeEvolution = document.getElementById('pokeInfo');
    pokeEvolution.innerHTML = `
    <div class="evolution-info-container">
        <div class="evolution-info">
            <div>
                <img class="evolution-img" src="${img1}">
            </div>
            <span>${capitalizeFirstLetter(eveolutionChain['chain']['species']['name'])}</span>
        </div>
        <div class="evolution-details">
            <span class="evolution-details-span">min Lvl ${evoSpecialCheck1(lvl1)}</span>
            <img src="img/levelup30.png">
        </div>
        <div class="evolution-info">
            <div>
                <img class="evolution-img" src="${img2}">
            </div>
            <span>${capitalizeFirstLetter(eveolutionChain['chain']['evolves_to'][0]['species']['name'])}</span>
        </div>
        <div class="evolution-details">
            <span class="evolution-details-span">min Lvl ${evoSpecialCheck2(lvl2)}</span>
            <img src="img/levelup30.png">
        </div>
        <div class="evolution-info">
            <div>
                <img class="evolution-img" src="${img3}">
            </div>
            <span>${capitalizeFirstLetter(eveolutionChain['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'])}</span>
        </div>
    </div>
    `;
}

function renderMovesHtmlContainer() {
    return `
    <div class="poke-move-container" id="pokeMoveContainer"><div>
    `;
}

function renderMovesHtml(pokeMove) {
    return `
    <div class="poke-move">${pokeMove}</div>
    `;
}

function renderAboutHtml() {
    return `
    <div>
        <table>
        <tr>
            <th>Species:</th>
            <td>${species['genera'][7]['genus']}</td>
        </tr>
        <tr>
            <th>Height:</th>
            <td>${currentPokemon['height']}</td>
        </tr>
        <tr>
            <th>Weight:</th>
            <td>${currentPokemon['weight']}</td>
        </tr>
        <tr>
            <th>Abilities</th>
            <td id="abilities"></td>
        </tr>
    </table>
    <div>
    `;
}

function evoSpecialCheck1(lvl1) {
    if (lvl1 >=1 & lvl1 <=99) {
        return `${lvl1}`;
    } else {
        return `Evolution Stone`;
    };
}

function evoSpecialCheck2(lvl2) {
    if (lvl2 >=1 & lvl2 <=99) {
        return `${lvl2}`;
    } else {
        return `Evolution Stone`;
    };
}