const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Asegúrate de importar el Pool de pg
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes JSON

// Configuración de usuarios y contraseñas
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

app.post('/auth/login', async (req, res) => {
    const { username, password, role } = req.body;

    // Verifica si el rol existe en la configuración
    const config = configs[role];

    // Verifica las credenciales
    if (config && config.user === username) {
        // Compara la contraseña enviada con la contraseña almacenada
        if (config.password === password) {
            // Conecta a la base de datos con las credenciales del usuario
            const userPool = new Pool({
                user: config.user, // Usa el usuario de la configuración
                host: 'localhost',
                database: 'gamerproxela', // Cambia esto por tu base de datos
                password: config.password, // Usa la contraseña de la configuración
                port: 5432, // Cambia esto si usas otro puerto
            });

            try {
                // Intenta conectarse a la base de datos
                await userPool.connect(); // Conexión a la base de datos exitosa

                // Aquí puedes realizar alguna acción adicional si lo deseas
                res.json({
                    message: 'Login exitoso',
                    role: role, // Incluye el rol en la respuesta
                    username: username // Incluye el nombre de usuario si es necesario
                });
            } catch (error) {
                console.error('Error en la conexión a la base de datos:', error);
                res.status(500).json({ message: 'Error en el servidor', error: error.message });
            } finally {
                await userPool.end(); // Cierra la conexión
            }
        } else {
            res.status(401).json({ message: 'Contraseña incorrecta' });
        }
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});

const PORT = 8080; // Asegúrate de que este puerto esté disponible
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
