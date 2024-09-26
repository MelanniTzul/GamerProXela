const createClient = require('../db');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json()); 

// Objeto para almacenar clientes según userId
const clients = {};
// Ruta de conexion de un usuario segun su rol
app.post('/login', async (req, res) => {
  const {username, password, role}=req.body;

  if (clients[role]) {
    clients[role].end();
    delete clients[role];//lo elimina para asegurarnos que se cierre la conexion que tenia anteriormete
    //return res.status(200).send('Usuario ya conectado');
  }

  const client = createClient(role);
  try {
    await client.connect();
    clients[role] = client; // Guarda el cliente en el objeto
    const result = await client.query('SELECT * from administrador.getUsuario($1,$2,$3);',
      [username,password,role]);
    if(result.rows.length>0){
      console.log("Existe la hora es como si existe el usuario");
      res.status(200).json(result.rows[0]);
    }else{
      return res.status(404).send('usuario no encontrado');
    }
  } catch (err) {
    res.status(500).send('Error al conectar a PostgreSQL: ' + err.message);
  }
});

// Función para cerrar todas las conexiones
async function closeAllConnections() {
  for (const userId in clients) {
    if (clients[userId]) {
      await clients[userId].end();
    }
  }
  console.log('Conexiones a PostgreSQL cerradas');
}

// Ruta para desconectar todos los clientes
app.post('/disconnect', async (req, res) => {
  try {
    await closeAllConnections();
    res.status(200).send('Todas las conexiones a PostgreSQL se han cerrado');
  } catch (err) {
    res.status(500).send('Error al cerrar conexiones: ' + err.message);
  }
});

// Maneja el cierre de la conexión al detener el servidor
process.on('SIGINT', async () => {
  await closeAllConnections();
  process.exit(0); // Salir de manera segura cuando se interrumpa el servidor
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = clients;