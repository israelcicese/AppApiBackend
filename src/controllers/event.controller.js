const notesCtrl = {};
const Event = require('../models/Event');
const axios = require('axios')
notesCtrl.getEvents = async (req, res) => {

    // adquisición de todos los eventos cercanos
    const tipoLugar = req.body.tipo;
    const latitud = req.body.latitud;
    const longitud = req.body.longitud;

    const places = await axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitud + "," + longitud + "&radius=1500&type=" + tipoLugar + "&language=es-419&keyword=cruise&key=AIzaSyBq85Capapk3Mj7-UOhYoKq9pK6AW94954");
    const datosSinOrdenar = [];

    for (var p in places.data.results) {

        const posicion = {};
        posicion['place_id'] = places.data.results[p].place_id;
        // se elimnan datos que no son de utilidad para la consulta
        datosSinOrdenar.push(posicion);
    }

    const datosOrdenados = datosSinOrdenar.sort(function (a, b) {
        return b.puntaje - a.puntaje
    });


    // parte de adquisición de los eventos por medio del id_places de datos ordenados

    const eventResults = [];

    for (var e of datosOrdenados) {

        const place = {};
        place['place_id'] = e.place_id;
        
        const event = await Event.find(place);
        
        if (event[0]!=null){
            eventResults.push(event[0]);
        }
    }
    console.log(eventResults);
    res.json(eventResults);






};
notesCtrl.createEvent = async (req, res) => {
    const { name, content, date, author, place_id } = req.body;
    const newEvent = new Event({
        name: name,
        content: content,
        date: date,
        author: author,
        place_id: place_id

    });
    console.log(newEvent);
    await newEvent.save();
    res.json({ message: 'Event Saved' })
};
notesCtrl.getEvent = async (req, res) => {
    const place = {
        place_id: req.params.id
    };
    console.log(place);

    const event = await Event.find(place);
    console.log(event);
    res.json(event);
};
notesCtrl.updateNote = async (req, res) => {
    const { name, content, author, importancia, date, place_id } = req.body;
    await Event.findByIdAndUpdate(req.params.id, {
        name,
        author,
        content,
        importancia,
        date,
        place_id
    });
    console.log(req.params.id, req.body);
    res.json({ message: 'Event Updated' });
};
notesCtrl.deleteNote = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event Deleted' });

};
module.exports = notesCtrl;