const app = require("./app");
const port = 3000;

const main = async () => {
  const db = require("./db/client");
  await db.connectToMongoDB();

  app.listen(port, () => {
    console.log(`Aplicación 'Lista de Películas' escuchando en el puerto ${port} ...`);
  });
};

main();
