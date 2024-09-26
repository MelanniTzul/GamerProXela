	--*CREACION DE LA BASE DE DATOS
CREATE DATABASE gamerproxela;  

    --* CREACION DE SCHEMAS
CREATE SCHEMA administrador;
CREATE SCHEMA cajero; 
CREATE SCHEMA bodega;  
CREATE SCHEMA inventario;


--* Crear tabla sucursal primero, ya que otras tablas dependen de ella
CREATE TABLE administrador.sucursal(
  id_sucursal SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  adress VARCHAR(50) NOT NULL,
  descripcion TEXT
);



CREATE TABLE bodega.producto (
  id_producto SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  descripcion TEXT,
  fecha_vencimiento DATE NOT NULL
);

CREATE TABLE inventario.productos_bodega_estateria (
  id SERIAL PRIMARY KEY,
  cantidad_estanteria INT NOT NULL,
  cantidad_bodega INT NOT NULL,
  pasillo_bodega INT NOT NULL,
  pasillo_estanteria INT NOT NULL,
  id_producto INTEGER REFERENCES bodega.producto(id_producto) ON DELETE CASCADE ON UPDATE CASCADE,
  id_sucursal INTEGER REFERENCES administrador.sucursal(id_sucursal) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE administrador.usuario(
  id_usuario SERIAL PRIMARY KEY,
  user_name VARCHAR(50) UNIQUE NOT NULL,
  pass VARCHAR(50) NOT NULL,
  rol INT,
  direccion TEXT,
  id_sucursal INT REFERENCES administrador.sucursal(id_sucursal) ON DELETE CASCADE
);



CREATE TABLE cajero.cliente(
  id_cliente SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  nit_cf CHAR(20) NOT NULL
);


CREATE TABLE cajero.cajero (
  id_cajero SERIAL PRIMARY KEY,
  fecha_ingreso_cajero DATE NOT NULL,
  id_usuario INTEGER UNIQUE REFERENCES administrador.usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
  id_sucursal INTEGER REFERENCES administrador.sucursal(id_sucursal) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE cajero.venta (
  id_venta SERIAL PRIMARY KEY,
  total_sin_descuentos DECIMAL(10, 2) NOT NULL,
  total_con_descuentos DECIMAL(10, 2) NOT NULL,
  fecha_venta DATE NOT NULL,
  id_usuario INTEGER REFERENCES administrador.usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
  id_cliente INTEGER REFERENCES cajero.cliente(id_cliente) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE cajero.detalle_venta(
  id_detalle_venta SERIAL PRIMARY KEY,
  cantidad_vendido DECIMAL(7,2) NOT NULL,
  sub_total DECIMAL(7,2) NOT NULL,
  total DECIMAL(7,2) NOT NULL,
  id_venta INTEGER REFERENCES cajero.venta(id_venta) ON DELETE CASCADE ON UPDATE CASCADE,
  id_producto INTEGER REFERENCES bodega.producto(id_producto) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE bodega.compra (
  id_compra SERIAL PRIMARY KEY,
  id_usuario INT REFERENCES administrador.usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
  id_sucursal INT REFERENCES administrador.sucursal(id_sucursal) ON DELETE CASCADE ON UPDATE CASCADE,
  total_compra DECIMAL(10, 2) NOT NULL,
  descripcion TEXT,
  fecha_ingreso DATE NOT NULL
);


CREATE TABLE bodega.detalle_compra (
  id_detalle_compra SERIAL PRIMARY KEY,
  tipo VARCHAR(20),
  puntos_acumulados INT,
  id_compra INT REFERENCES bodega.compra(id_compra) ON DELETE CASCADE ON UPDATE CASCADE,
  id_producto INT REFERENCES bodega.producto(id_producto) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE administrador.solicitud_tarjeta(
  id_tarjeta_solicitud SERIAL PRIMARY KEY,
  estado BOOLEAN NOT NULL,
  asunto TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  id_cliente INTEGER REFERENCES cajero.cliente(id_cliente) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE administrador.tarjeta_descuento(
  id_tarjeta SERIAL PRIMARY KEY,
  tipo CHAR(10) NOT NULL,
  puntos_acumulados INT NOT NULL,
  fecha_emision DATE NOT NULL,
  fecha_ultimo_cambio DATE NOT NULL,
  monto_gastado DECIMAL(7,2) NOT NULL,
  estado BOOLEAN NOT NULL,
  id_cliente INTEGER REFERENCES cajero.cliente(id_cliente) ON DELETE CASCADE ON UPDATE CASCADE
);



