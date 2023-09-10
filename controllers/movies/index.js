const express = require("express");
const router = express.Router();
const moviesMethods = require("./methods");
const authMiddleware = require("../../middlewares/authorization");

router.use(authMiddleware);

router.get("/list/all", async (req, res) => {
  // Ver las listas de todos los usuarios
  try {
    const data = await moviesMethods.verListas();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/list/:owner", async (req, res) => {
  // Consultar la lista de peliculas de un usuario "
  try {
    const data = await moviesMethods.verListasOwner(req.params.owner);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/list", (req, res) => {
  // Crear una lista de películas vacía
  try {
    const nuevaLista = moviesMethods.crearLista(req.body);
    res.status(201).json(nuevaLista);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/list/:id/add", async (req, res) => {
  // Añadir películas a una lista
  // en body debe ir: {movies: [{name, year, image}, ...]}
  try {
    const lista = await moviesMethods.actualizarLista(req.params.id, req.body);
    res.status(201).json(lista);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/list/:id/delete", async (req, res) => {
  // Borrar una lista
  try {
    const lista = await moviesMethods.borrarLista(req.params.id);
    res.send(`Lista: ${lista.name} borrada...`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/list/:id/delete/:movie_id", async (req, res) => {
  // Borrar una película con movie_id
  try {
    const lista = await moviesMethods.borrarPelicula(req.params.id, req.params.movie_id);
    res.status(200).json(lista);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/list/:id/rate", async (req, res) => {
  // Calificar listas
  // en body debe ir: {rating: 5}
  try {
    const lista = await moviesMethods.actualizarLista(req.params.id, req.body);
    res.status(200).json(lista);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
