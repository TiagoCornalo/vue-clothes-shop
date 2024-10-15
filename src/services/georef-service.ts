import axios from 'axios'

export interface Province {
  id: number
  nombre: string
}

export interface City {
  id: number
  nombre: string
}

export const getArgentinaStates = async () => {
  const response = await axios.get(
    'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre'
  )
  const provinces = response.data.provincias

  return provinces
}

export const getArgentinaCities = async (provinceId: number) => {
  const response = await axios.get(
    `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinceId}&campos=id,nombre&max=100`
  )
  const cities = response.data.municipios

  cities.sort((a: City, b: City) => {
    if (a.nombre < b.nombre) {
      return -1;
    }
    if (a.nombre > b.nombre) {
      return 1;
    }
    return 0;
  });

  return cities
}
