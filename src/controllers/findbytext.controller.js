const axios = require('axios')
const googleSearchCtrl = {};


googleSearchCtrl.getFindByText = async (req, res) => {

    console.log(req.body.texto);
    const palabra = req.body.texto;
    const newpalabra =  palabra.replace(/ /g, "%");
    console.log(newpalabra);
    
    //const latitud= 31.8621378;
    //const longitud = -116.6244962;
    const places = await axios.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+newpalabra+"&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,place_id&key=AIzaSyBq85Capapk3Mj7-UOhYoKq9pK6AW94954");
    const datosSinOrdenar = [];
    
    res.json(places.data.candidates);

  };



  module.exports = googleSearchCtrl;