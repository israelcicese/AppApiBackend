const axios = require('axios')
const googleCtrl = {};


googleCtrl.getByCoordinatesPlaces = async (req, res) => {

    //console.log(req.body.latitud);
    //const palabra = "Hola como estas"
    //const newpalabra =  palabra.replace(/ /g, "+");
    //console.log(newpalabra);

    const tipoLugar = req.body.tipo;
    const latitud = req.body.latitud;
    const longitud = req.body.longitud;
    
    //const latitud= 31.8621378;
    //const longitud = -116.6244962;
    const places = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+latitud+","+longitud+"&radius=1500&type="+tipoLugar+"&language=es-419&keyword=cruise&key=AIzaSyBq85Capapk3Mj7-UOhYoKq9pK6AW94954");
    const datosSinOrdenar = [];
    //console.log(places.data.results[0]);
    //console.log(places.data.results);
    
    for (var p in  places.data.results) {
  
      const posicion = {};
      posicion['puntaje'] = places.data.results[p].rating;
      posicion['nombre']= places.data.results[p].name;
      posicion['place_id']=places.data.results[p].place_id;

      datosSinOrdenar.push(posicion);
    }

    datosSinOrdenar.sort (function(a,b){
      return b.puntaje - a.puntaje});

    res.json(datosSinOrdenar);

  };



  module.exports = googleCtrl;
    




