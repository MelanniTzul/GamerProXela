--* 1 ADMINISTRADOR
user: administrador
password: admin24@
--* 2 CAJERO
user: cajero
password:cajero24@

--* 3 BODEGA
user:bodega
password: bodega24@

--* 4 INVENTARIO
user: inventario
password: inventario24@


-- Crear usuarios
CREATE USER administrador WITH PASSWORD 'admin24@';
CREATE USER cajero WITH PASSWORD 'cajero24@';
CREATE USER bodega WITH PASSWORD 'bodega24@';
CREATE USER inventario WITH PASSWORD 'inventario24@';

-- Asignar permisos a los esquemas existentes
GRANT USAGE ON SCHEMA administrador TO administrador;
GRANT USAGE ON SCHEMA cajero TO cajero;
GRANT USAGE ON SCHEMA bodega TO bodega;
GRANT USAGE ON SCHEMA inventario TO inventario;

SELECT *FROM administrador.usuario;


