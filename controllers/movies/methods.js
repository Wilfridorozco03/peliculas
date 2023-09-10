const movieList = require("../../models/movieList");

// ver listas de películas
const verListas = () => movieList.find();

// ver listas de un usuario (owner)
const verListasOwner = (owner) => movieList.find({ owner });

// crear lista de películas
const crearLista = (body) => {
  const data = new movieList({
    name: body.name,
    owner: body.owner,
    rating: body.rating,
    movies: [],
  });
  // devuelve los datos adicionales que coloca mongoDB
  return data.save();
};

// actualizar lista
const actualizarLista = (id, body) => movieList.findByIdAndUpdate(id, body, { new: true });

// borrar lista
const borrarLista = (id) => movieList.findByIdAndDelete(id);

// borrar película dentro de una lista
const borrarPelicula = async (id, movie_id) => {
    // cargar lista
    const lista = await movieList.findById(id);
    // buscar dentro de movies el :movie_id
    const i = lista.movies.findIndex((e) => e._id == movie_id);
    // si existe, borrarlo
    if (i !== -1) lista.movies.splice(i, 1);
    // salvar la lista
    lista.save();
    // retornar cómo quedó la lista
    return lista
}


module.exports = { verListas, verListasOwner, crearLista, actualizarLista, borrarLista, borrarPelicula };
