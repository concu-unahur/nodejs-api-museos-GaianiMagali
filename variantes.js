const superagent = require('superagent');
const fs = require('fs'); 


const end = (err,data) => {
    if (err) throw err;
    console.log(data.toString())
    console.log('ejecución finalizada');
  }; 


function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }
  
  const museos = respuesta.body.results;

  const museums = museos.map( m => {
    console.log('escribiendo museo en archivo');
    return `Museos: El museo se llama ${m.nombre} (${m.direccion}. Por cualquier consulta comunicarse al ${m.telefono}) \n`
  })

  fs.appendFile('museosOrganismos.txt', museums, leerArchivos);
}


function imprimirOrganismos(error,respuesta) {
  if(error){
    throw new Error('something bronke',error);
  }

  const  organismos = respuesta.body.results;

  const organism = organismos.map(o =>{
    console.log('escribiendo organismo en archivo');  
    return `Organismos: Dirección de Relaciones Institucionales ${o.direccion}. Por cualquiero consulta comunicarse al ${o.telefono} \n`
  })

  fs.appendFile('museosOrganismos.txt', organism, requestMuseos )

}

function leerArchivos() {
   fs.readFile('museosOrganismos.txt', end);
}


function requestMuseos(){
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/museos')
    .query({ format: 'json' })
    .end(imprimirMuseos);
    console.log('descargando museos');
    
}

function requestOrganismos() {
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/organismos')
    .query({ format: 'json' })
    .end(imprimirOrganismos);
    console.log('descargando organismos');
}

requestOrganismos()