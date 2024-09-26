const { Client } = require('pg');

function createClient(userId) {
  // Configuración de conexión para diferentes usuarios
  const configs = {
        '1': {
            user: 'administrador',
            password: 'admin24@',
        },
        '2': {
            user: 'cajero',
            password: 'cajero24@',
        },
        '3': {
            user: 'bodega',
            password: 'bodega24@',
        },
        '4': {
            user: 'inventario',
            password: 'inventario24@'
        }
    };

  const userConfig = configs[userId] || configs['default']; // Usa configuración por defecto si no se encuentra el ID

  const config = {
    user: userConfig.user,
    host: 'localhost',
    database: 'gamerproxela',
    password: userConfig.password,
    port: 5432,
  };

  const client = new Client(config);
  return client;
}

module.exports = createClient;