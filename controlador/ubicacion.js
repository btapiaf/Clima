const axios = require('axios');

const getCiudadLatLon = async(nombre) => {

    const ciudad = encodeURI(nombre);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${ciudad}`, //llamamos a la api donde se encuentra la localizacion de la ciudad
        headers: { 'X-RapidAPI-Key': '8ac05538ebmsh1d8d2bb9ae49d50p1737a9jsn3064fa337c89' } //
    });

    const resp = await instance.get();

    if (resp.data.Results.length === 0) { 
        throw new Error(`No existe resultados para ${nombre}`);
    }

    const data = resp.data.Results[0]; //tomamos el valor inicial en la variable data
    const name = data.name;
    const lat = data.lat;
    const lon = data.lon;

    return {    //retornamos los datos para ser utilizados en otro lado
        name,
        lat,
        lon
    }
}

module.exports = {
    getCiudadLatLon //exportamos el respectivo modulo con los datos de ciudad y latitud
}
