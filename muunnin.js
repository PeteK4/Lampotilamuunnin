// Alustus
let tulosRuutu = document.getElementById("tulosruutu");
let muunnos = document.getElementById("lampotila").value;

// Aseta tapahtumien seuranta
tyyppi.addEventListener("change", muutosTyyppi); 
arvo.addEventListener("click", muunnaLampotila);
desimaalit.addEventListener("change", muutaDesimaalit);
lampotila.addEventListener('keydown', function(event){
    if (event.keyCode == 13) {muunnaLampotila();}});

// Pääohjelma
function muunnaLampotila(){
    var arvo = document.getElementById("lampotila").value;
    let tyyppi = document.getElementById("tyyppi").value;
    let desit = document.querySelector('input[name = "desit"]:checked').value;

    // Tarkista, että syöttökenttään on kirjoitettu jotain ja arvot ovat lukuarvoja
    if (arvo == "" || isNaN(arvo)) {
        let txt = document.getElementById("tulosruutu");
        txt.style.color = "#ffeeaa";
        txt.style.fontSize = "2.25em";
        tulosRuutu.innerHTML = "Syöte on virheellinen.<br>Anna lukuarvo.<br>Piste toimii desimaalierotimena."
        return;
        }

    var arvo = parseFloat(arvo) // Muunna syöttökentän merkkijono liukuluvuksi
    let alkuarvo = arvo // Ota muistiin syöttöjentän arvo

    // Muunna Celsius > Fahrenheit
    if (tyyppi == "CelsiusFahrenheit") {
        // Tarkista ettei mennä alle absoluuttisen nollapisteen
        if (arvo < -273.15) {
            tulosRuutu.innerHTML = `${alitus()} -273.15 &degC`;
        return;
        }
        // Muunnoskaava ja hyppy tulostus funktioon (muuntotyyppi, muunnettu lämpötila, desimaalien määrä)
        muunnos = (arvo * 9 / 5) + 32;
        tulosta(tyyppi, alkuarvo, muunnos, desit);

    // Muunna Celsius > Kelvin */
    } else if (tyyppi == "CelsiusKelvin") {
        // Tarkista ettei mennä alle absoluuttisen nollapisteen
        if (arvo < -273.15) {
            tulosRuutu.innerHTML = `${alitus()} -273.15 &degC`;
        return;
        }
        // Muunnoskaava ja hyppy tulosta funktioon
        muunnos = arvo + 273.15;
        tulosta(tyyppi, alkuarvo, muunnos, desit);

    // Muunna Fahrenheit > Celsius
    } else if (tyyppi == "FahrenheitCelsius") {
        // Tarkista ettei mennä alle absoluuttisen nollapisteen 
        if (arvo < -459.67) {
            tulosRuutu.innerHTML = `${alitus()} -459.67 &degF`;
        return;
        }
        // Muunnoskaava ja hyppy tulosta funktioon
        muunnos = (arvo - 32) * 5 / 9;
        tulosta(tyyppi, alkuarvo, muunnos, desit);

    // Muunna Fahrenheit > Kelvin
    } else if (tyyppi == "FahrenheitKelvin") {
        if (arvo < -459.67) {
            tulosRuutu.innerHTML = `${alitus()} -459.67 &degF`;
        return;
        }
        // Muunnoskaava ja hyppy tulosta funktioon
        muunnos = ((arvo - 32) / 1.8) + 273.15
        tulosta(tyyppi, alkuarvo, muunnos, desit);

    // Muunna Kelvin > Celsius
    } else if (tyyppi == "KelvinCelsius") {
         // Tarkista, ettei mennä alle absoluuttisen nollapisteen
        if (arvo < 0) {
            tulosRuutu.innerHTML = `${alitus()} 0 K`;
        return;
        }
        // Muunnoskaava ja hyppy tulosta funktioon
        muunnos = arvo - 273.15;
        tulosta(tyyppi, alkuarvo, muunnos, desit);

    /* Muunna Kelvin > Fahrenheit */
    } else if (tyyppi == "KelvinFahrenheit") {
         // Tarkista ettei mennä alle absoluuttisen nollapisteen
        if (arvo < 0) {
            tulosRuutu.innerHTML = `${alitus()} 0 K`;
        return;
        }
        // Muunnoskaava ja hyppy tulosta funktioon
        muunnos = (arvo -273.15) * 1.8 + 32;
        tulosta(tyyppi, alkuarvo, muunnos, desit);
    }
}

// Virheilmoitus liian alhaisesta lämpötilasta
function alitus(){
    let txt = document.getElementById("tulosruutu");
    txt.style.color = "#ffeeaa";
    txt.style.fontSize = "2.3em";
    return teksti = 'Lämpötila ei voi alittaa<br>absoluuttista nollapistettä<br>';
  }

// Muutostyypin valinta dropdown valikosta ja tulostus
function muutosTyyppi(event) {
    event.preventDefault();
    if (muunnos == "") {
        tulosRuutu.innerHTML = ""
    return;
    }
    muunnaLampotila();
}

// Desimaalien määrän muutos radio button osiosta ja tulostus
function muutaDesimaalit(event) {
    event.preventDefault();
    let tyyppi = document.getElementById("tyyppi").value;
    let desit= document.querySelector('input[name = "desit"]:checked').value;
    let alkuarvo = document.getElementById("lampotila").value;
    tulosta(tyyppi, alkuarvo, muunnos, desit);
}

// Tulostus
function tulosta(tyyppi, alkuarvo, muunnos, desit) {
    // Aseta desimaalien määrä
    let alkuarvo_fix = Number(alkuarvo).toFixed(desit); 
    let muunnos_fix = Number(muunnos).toFixed(desit);
    // Muunna fontti tulostusta varten
    let txt = document.getElementById("tulosruutu");
    txt.style.color = "#fff";
    txt.style.fontSize = "3em";
    
    if (muunnos == "") {
            tulosRuutu.innerHTML = ""
        return;
    }

    // Tulostus muuntotyypin mukaan
    if (tyyppi == "CelsiusFahrenheit") {
        tulosRuutu.innerHTML = `${alkuarvo_fix} &degC<br>=<br>${muunnos_fix} &degF`;
    
    } else if (tyyppi == "CelsiusKelvin") {
        tulosRuutu.innerHTML = `${alkuarvo_fix} &degC<br>=<br>${muunnos_fix} K`;
    
    } else if (tyyppi == "FahrenheitCelsius") {
        tulosRuutu.innerHTML = `${alkuarvo_fix} &degF<br>=<br>${muunnos_fix} &degC`;
    
    } else if (tyyppi == "FahrenheitKelvin") {
        tulosRuutu.innerHTML = `${alkuarvo_fix} &degF<br>=<br>${muunnos_fix} K`;

    } else if (tyyppi == "KelvinCelsius") {
        tulosRuutu.innerHTML = `${alkuarvo_fix} K<br>=<br>${muunnos_fix} &degC`;

    } else if (tyyppi == "KelvinFahrenheit") {
        // Kierretään pyöristysongelma ylöspäin -459.7 °F, koska lämpötila ei voi olla alle -459.67 °F (pyöristys alaspäin -459.67 = -459.6)
        if (muunnos_fix < -459.67 && desit == 1) {
            muunnos_fix = -459.6;
        } if (muunnos_fix < -459.67 &&desit == 2) {
            muunnos_fix = -459.67;
        }
        if (muunnos_fix < -459.67 && desit == 3) {
            muunnos_fix = "-459.670";
        }
        tulosRuutu.innerHTML = `${alkuarvo_fix} K<br>=<br>${muunnos_fix} &degF`;
    }
}
