-- Database: gamerproxela

-- DROP DATABASE IF EXISTS gamerproxela;

CREATE DATABASE gamerproxela
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'es_GT.UTF-8'
    LC_CTYPE = 'es_GT.UTF-8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

--ROLES
--ADMINISTRADOR =1
--CAJERO = 2
--bodega = 3
--INVENTARIO = 4
	SELECT *FROM administrador.usuario;
	SELECT *FROM administrador.sucursal;

	SELECT *FROM cajero.cliente;
--USUARIO ADMINISTRADOR
INSERT INTO administrador.usuario (user_name, pass, rol, direccion, id_sucursal)
VALUES ('admin', 'admin24', 1, 'Quetzaltenango', 1);

SELECT *FROM administrador.sucursal;
--SUCURSAL 1
INSERT INTO administrador.sucursal(nombre, adress, descripcion)
VALUES ('Sucursal Parque', 'Quetzaltenango', 'Sucursal de videojuegos')

--SUCURSAL 2
INSERT INTO administrador.sucursal(nombre, adress, descripcion)
VALUES ('Sucursal Centro1', 'Totonicapán', 'Sucursal de videojuegos')

--SUCURSAL 3
INSERT INTO administrador.sucursal(nombre, adress, descripcion)
VALUES ('Sucursal Centro2', 'Ciudad de Guatemala', 'Sucursal de videojuegos')

SELECT *FROM cajero.cajero;
SELECT *FROM administrador.usuario;

---USUARIOS DE CAJEROS DE SUCURSAL 1 ROL=2
INSERT INTO administrador.usuario (user_name, pass, rol, direccion, id_sucursal) VALUES 
('cajero1', 'cajero1', 2, 'Quetzaltenango', 1),
('cajero2', 'cajero2', 2, 'Quetzaltenango', 1),
('cajero3', 'cajero3', 2, 'Quetzaltenango', 1),
('cajero4', 'cajero4', 2, 'Quetzaltenango', 1),
('cajero5', 'cajero5', 2, 'Quetzaltenango', 1),
('cajero6', 'cajero6', 2, 'Quetzaltenango', 1);



---USUARIOS DE CAJEROS DE SUCURSAL 2 ROL=2
INSERT INTO administrador.usuario (user_name, pass, rol, direccion, id_sucursal) VALUES 
('cajeroT1', 'cajero1', 2, 'Toto', 2),
('cajeroT2', 'cajero2', 2, 'Toto', 2),
('cajeroT3', 'cajero3', 2, 'Toto', 2),
('cajeroT4', 'cajero4', 2, 'Toto', 2),
('cajeroT5', 'cajero5', 2, 'Toto', 2),
('cajeroT6', 'cajero6', 2, 'Toto', 2);


---USUARIOS DE CAJEROS DE SUCURSAL 3
INSERT INTO administrador.usuario (user_name, pass, rol, direccion, id_sucursal) 
VALUES 
('cajeroG1', 'cajero1', 2, 'Ciudad Guatemala', 3),
('cajeroG2', 'cajero2', 2, 'Ciudad Guatemala', 3),
('cajeroG3', 'cajero3', 2, 'Ciudad Guatemala', 3),
('cajeroG4', 'cajero4', 2, 'Ciudad Guatemala', 3),
('cajeroG5', 'cajero5', 2, 'Ciudad Guatemala', 3),
('cajeroG6', 'cajero6', 2, 'Ciudad Guatemala', 3);

---CAJEROS DE SUCURSAL 1
INSERT INTO cajero.cajero (fecha_ingreso_cajero, id_usuario, id_sucursal)
VALUES
('2024-08-25', '2', '1'),
('2024-08-25', '3', '1'),
('2024-08-25', '4', '1'),
('2024-08-25', '5', '1'),
('2024-08-25', '6', '1'),
('2024-08-25', '7', '1');


---CAJEROS DE SUCURSAL 2
INSERT INTO cajero.cajero(fecha_ingreso_cajero, id_usuario, id_sucursal) 
VALUES
('2024-08-25', '9', '2'),
('2024-08-25', '10', '2'),
('2024-08-25', '11', '2'),
('2024-08-25', '12', '2'),
('2024-08-25', '13', '2'),
('2024-08-25', '14', '2');


---CAJEROS DE SUCURSAL 3
INSERT INTO cajero.cajero(fecha_ingreso_cajero, id_usuario, id_sucursal)
VALUES 
('2024-08-25', '15', '3'),
('2024-08-25', '16', '3'),
('2024-08-25', '17', '3'),
('2024-08-25', '18', '3'),
('2024-08-25', '19', '3'),
('2024-08-25', '20', '3');

--4 encargados de inventario rol=4
---USUARIOS DE inventario DE SUCURSAL 1
INSERT INTO administrador.usuario (user_name, pass, rol, direccion, id_sucursal) 
VALUES 
('inventario1', 'inventario1', 4, 'Quetzaltenango', 1),
('inventario2', 'inventario2', 4, 'Quetzaltenango', 1),
('inventario3', 'inventario3', 4, 'Quetzaltenango', 1),
('inventario4', 'inventario4', 4, 'Quetzaltenango', 1);

---USUARIOS DE inventario DE SUCURSAL 2
INSERT INTO administrador.usuario (user_name, pass, rol, direccion, id_sucursal) 
VALUES 
('inventarioT1', 'inventariot1', 4, 'Toto', 2),
('inventarioT2', 'inventariot2', 4, 'Toto', 2),
('inventarioT3', 'inventariot3', 4, 'Toto', 2),
('inventarioT4', 'inventariot4', 4, 'Toto', 2);

---USUARIOS DE inventario DE SUCURSAL 3
INSERT INTO administrador.usuario (user_name, pass, rol, direccion, id_sucursal) 
VALUES 
('inventariog1', 'inventariotg1', 4, 'Toto', 3),
('inventariog2', 'inventariotg2', 4, 'Toto', 3),
('inventariog3', 'inventariotg3', 4, 'Toto', 3),
('inventariog4', 'inventariotg4', 4, 'Toto', 3);


--1 encargado de bodega. rol=3

INSERT INTO administrador.usuario (user_name, pass, rol, direccion, id_sucursal) 
VALUES 
('bodeguero1', 'inventariotg1', 3, 'Quetzaltenango', 1);


INSERT INTO administrador.usuario (user_name, pass, rol, direccion, id_sucursal) 
VALUES 
('bodegueroG1', 'inventariot1g', 3, 'Ciudad Guatemala', 2);


INSERT INTO administrador.usuario (user_name, pass, rol, direccion, id_sucursal) 
VALUES 
('bodegueroT1', 'inventariott', 3, 'Toto', 3);





SELECT *FROM  bodega.producto;
ALTER TABLE bodega.producto 
RENAME COLUMN fecha_vencimiento TO fecha_garantia;


INSERT INTO bodega.producto (nombre, descripcion, fecha_garantia) VALUES
('PlayStation 5', 'Consola de videojuegos de última generación.', '2025-12-31'),
('Xbox Series X', 'Consola de videojuegos de Microsoft.', '2025-12-31'),
('Nintendo Switch', 'Consola portátil y de sobremesa.', '2025-12-31'),
('The Legend of Zelda: Breath of the Wild', 'Juego de aventura para Nintendo Switch.', '2025-12-31'),
('FIFA 23', 'Juego de fútbol para múltiples plataformas.', '2025-12-31'),
('Call of Duty: Modern Warfare II', 'Juego de disparos en primera persona.', '2025-12-31'),
('Gran Turismo 7', 'Juego de carreras para PlayStation 5.', '2025-12-31'),
('Assassin’s Creed Valhalla', 'Juego de acción y aventura.', '2025-12-31'),
('Xbox Game Pass', 'Suscripción a juegos para Xbox.', '2025-12-31'),
('Controlador inalámbrico DualSense', 'Controlador para PlayStation 5.', '2025-12-31'),
('Controlador Xbox Wireless', 'Controlador para Xbox Series X.', '2025-12-31'),
('Auriculares gaming Razer', 'Auriculares de alta calidad para videojuegos.', '2025-12-31'),
('Tienda de juegos digitales', 'Tarjeta de regalo para comprar juegos en línea.', '2025-12-31'),
('Mando Pro de Nintendo', 'Mando para Nintendo Switch.', '2025-12-31'),
('Almacenamiento externo de 1TB', 'Disco duro para almacenamiento de juegos.', '2025-12-31'),
('FIFA Ultimate Team Points', 'Monedas virtuales para FIFA.', '2025-12-31'),
('Tarjeta de regalo PlayStation Store', 'Tarjeta para comprar contenido digital.', '2025-12-31'),
('Tarjeta de regalo Xbox Live', 'Tarjeta para suscripción en Xbox.', '2025-12-31'),
('Joystick de vuelo', 'Controlador para simuladores de vuelo.', '2025-12-31'),
('Cargador de consola', 'Cargador para PlayStation o Xbox.', '2025-12-31');


INSERT INTO bodega.producto (nombre, descripcion, fecha_garantia) VALUES
('Gaming PC Razer', 'Computadora de alto rendimiento para juegos.', '2026-06-30'),
('Monitor gaming ASUS', 'Monitor con alta tasa de refresco para juegos.', '2026-06-30'),
('Teclado mecánico Logitech', 'Teclado mecánico con retroiluminación RGB.', '2026-06-30'),
('Ratón gaming Corsair', 'Ratón con múltiples botones programables.', '2026-06-30'),
('Silla gaming DXRacer', 'Silla ergonómica diseñada para jugadores.', '2026-06-30'),
('Volante de carreras Thrustmaster', 'Volante con pedales para juegos de carreras.', '2026-06-30'),
('Cámara web Logitech', 'Cámara para streaming y video llamadas.', '2026-06-30'),
('Micrófono USB Blue Yeti', 'Micrófono de alta calidad para streaming y grabación.', '2026-06-30'),
('Tarjeta de captura Elgato', 'Captura y graba videojuegos en alta definición.', '2026-06-30'),
('Suscripción a PlayStation Plus', 'Acceso a juegos y servicios en línea.', '2026-06-30'),
('FIFA 24', 'Juego de fútbol para múltiples plataformas.', '2026-06-30'),
('The Last of Us Part II', 'Juego de acción y aventura post-apocalíptico.', '2026-06-30'),
('Ghost of Tsushima', 'Juego de acción y aventura en el Japón feudal.', '2026-06-30'),
('Valorant', 'Juego de disparos táctico en primera persona.', '2026-06-30'),
('Among Us', 'Juego multijugador de deducción social.', '2026-06-30'),
('Minecraft', 'Juego de construcción y aventura en un mundo abierto.', '2026-06-30'),
('Doom Eternal', 'Juego de disparos en primera persona de acción intensa.', '2026-06-30'),
('Gears 5', 'Juego de disparos en tercera persona, parte de la saga Gears of War.', '2026-06-30'),
('Overwatch', 'Juego de disparos en equipo con héroes únicos.', '2026-06-30'),
('Rocket League', 'Juego de fútbol con coches.', '2026-06-30');


INSERT INTO bodega.producto (nombre, descripcion, fecha_garantia) VALUES
('Acer Predator Helios 300', 'Laptop gaming de alto rendimiento con GPU dedicada.', '2027-07-15'),
('SteelSeries Apex Pro', 'Teclado mecánico con retroiluminación RGB y teclas ajustables.', '2027-07-15'),
('Logitech G Pro X', 'Ratón gaming con diseño ambidiestro y alta precisión.', '2027-07-15'),
('Razer Kraken X', 'Auriculares ligeros con sonido envolvente 7.1.', '2027-07-15'),
('HyperX Cloud II', 'Auriculares para gamers con micrófono desmontable.', '2027-07-15'),
('Blue Snowball iCE', 'Micrófono USB ideal para streamers y podcasters.', '2027-07-15'),
('Elgato Stream Deck', 'Controlador para streamers con botones personalizables.', '2027-07-15'),
('Samsung Odyssey G5', 'Monitor curvo para gaming con alta tasa de refresco.', '2027-07-15'),
('Corsair K95 RGB Platinum', 'Teclado mecánico con teclas programables y retroiluminación.', '2027-07-15'),
('Dell Alienware AW2521H', 'Monitor gaming 360Hz con G-SYNC.', '2027-07-15'),
('Gaming Chair Secretlab', 'Silla ergonómica diseñada para largas horas de juego.', '2027-07-15'),
('NVIDIA GeForce RTX 3080', 'Tarjeta gráfica de última generación para gaming.', '2027-07-15'),
('AMD Ryzen 5 5600X', 'Procesador de 6 núcleos ideal para gaming.', '2027-07-15'),
('Corsair Vengeance LPX 16GB', 'Memoria RAM de alto rendimiento para PC gaming.', '2027-07-15'),
('Kingston A2000 1TB NVMe', 'Disco SSD rápido para juegos y aplicaciones.', '2027-07-15'),
('ASUS ROG Strix B550-F', 'Placa madre con soporte para AMD Ryzen y RGB.', '2027-07-15'),
('MSI MAG Forge 100M', 'Caja de PC con gran ventilación y diseño moderno.', '2027-07-15'),
('AOC 24G2', 'Monitor gaming de 24 pulgadas con 144Hz de tasa de refresco.', '2027-07-15'),
('Razer Viper Ultimate', 'Ratón inalámbrico para gaming con sensor óptico.', '2027-07-15'),
('Gigabyte AORUS AC300W', 'Caja de PC con panel de vidrio templado y RGB.', '2027-07-15'),
('Turtle Beach Stealth 600', 'Auriculares inalámbricos para PS4 y Xbox.', '2027-07-15'),
('Logitech G935', 'Auriculares inalámbricos con sonido envolvente 7.1.', '2027-07-15'),
('Sabrent 4-Port USB 3.0 Hub', 'Hub USB para ampliar conexiones.', '2027-07-15'),
('TP-Link Archer AX6000', 'Router gaming con tecnología Wi-Fi 6.', '2027-07-15'),
('Elgato HD60 S+', 'Capturadora de video para streaming y grabación.', '2027-07-15'),
('HyperX Alloy FPS Pro', 'Teclado mecánico compacto para gamers en movimiento.', '2027-07-15'),
('Razer Firefly V2', 'Alfombrilla de mouse con iluminación RGB.', '2027-07-15'),
('Logitech G610 Orion Red', 'Teclado mecánico con retroiluminación roja.', '2027-07-15'),
('Cooler Master MasterLiquid ML240L', 'Sistema de refrigeración líquida para CPU.', '2027-07-15'),
('BitFenix Nova', 'Caja de PC con soporte para refrigeración líquida.', '2027-07-15'),
('HP Omen 15', 'Laptop gaming con diseño atractivo y alto rendimiento.', '2027-07-15'),
('Dell G5 Gaming Desktop', 'PC de escritorio para gaming con un diseño elegante.', '2027-07-15'),
('Razer Blade 15', 'Laptop de gaming premium con pantalla 4K.', '2027-07-15'),
('Tenda Nova MW6', 'Sistema de malla Wi-Fi para cobertura total.', '2027-07-15'),
('Corsair K55 RGB', 'Teclado de membrana con retroiluminación RGB.', '2027-07-15'),
('AOC Agon AG241QX', 'Monitor gaming con 165Hz y FreeSync.', '2027-07-15'),
('Razer BlackWidow Lite', 'Teclado mecánico compacto y silencioso.', '2027-07-15'),
('ASUS ROG Swift PG259QN', 'Monitor de esports con 360Hz y G-SYNC.', '2027-07-15'),
('Turtle Beach Recon 70', 'Auriculares ligeros para Xbox y PS4.', '2027-07-15'),
('Samsung 970 EVO Plus 500GB', 'SSD NVMe para alto rendimiento.', '2027-07-15'),
('MSI Gaming GeForce GTX 1660 Ti', 'Tarjeta gráfica para gaming a 1080p.', '2027-07-15'),
('ZOTAC ZBOX CI329 Nano', 'Mini PC compacto y eficiente.', '2027-07-15'),
('Lenovo Legion 5', 'Laptop gaming con rendimiento excepcional.', '2027-07-15'),
('Razer Seiren Mini', 'Micrófono compacto para streaming.', '2027-07-15'),
('Razer Goliathus Extended', 'Alfombrilla de mouse de gran tamaño y suave.', '2027-07-15'),
('Corsair Void Elite RGB', 'Auriculares gaming con sonido envolvente y micrófono.', '2027-07-15'),
('Ducky One 2 Mini', 'Teclado mecánico compacto para gamers.', '2027-07-15'),
('MSI Optix MAG272CQR', 'Monitor curvo de 27 pulgadas para gaming.', '2027-07-15'),
('ZOTAC Gaming GeForce RTX 3060', 'Tarjeta gráfica con tecnología ray tracing.', '2027-07-15');

INSERT INTO bodega.producto (nombre, descripcion, fecha_garantia) VALUES
('Acer Aspire 5', 'Laptop ligera y versátil para uso diario.', '2027-08-01'),
('Samsung Galaxy Tab S7', 'Tableta premium con S Pen incluido.', '2027-08-01'),
('Apple iPad Air', 'Tableta de alto rendimiento con chip M1.', '2027-08-01'),
('Fitbit Charge 5', 'Reloj inteligente con seguimiento de salud y ejercicio.', '2027-08-01'),
('Garmin Forerunner 245', 'Reloj GPS para corredores con funciones avanzadas.', '2027-08-01'),
('Logitech K380', 'Teclado inalámbrico compacto y portátil.', '2027-08-01'),
('Dell XPS 13', 'Laptop ultradelgada con pantalla InfinityEdge.', '2027-08-01'),
('Bose QuietComfort 35 II', 'Auriculares inalámbricos con cancelación de ruido.', '2027-08-01'),
('Sony WH-1000XM4', 'Auriculares de alta gama con cancelación de ruido.', '2027-08-01'),
('Oculus Quest 2', 'Gafas de realidad virtual todo en uno.', '2027-08-01'),
('Apple Watch Series 7', 'Reloj inteligente con pantalla siempre encendida.', '2027-08-01'),
('Kindle Paperwhite', 'E-reader con pantalla de alta resolución.', '2027-08-01'),
('GoPro HERO10 Black', 'Cámara de acción con grabación en 5.3K.', '2027-08-01'),
('DJI Mini 2', 'Dron compacto con grabación 4K.', '2027-08-01'),
('Anker PowerCore 10000', 'Batería portátil de alta capacidad.', '2027-08-01'),
('Apple AirPods Pro', 'Auriculares inalámbricos con cancelación de ruido.', '2027-08-01'),
('Samsung Galaxy Buds 2', 'Auriculares inalámbricos con sonido de calidad.', '2027-08-01'),
('Google Nest Hub', 'Asistente inteligente con pantalla táctil.', '2027-08-01'),
('Amazon Echo Dot', 'Altavoz inteligente con Alexa.', '2027-08-01'),
('Philips Hue White LED', 'Bombilla inteligente con control por voz.', '2027-08-01'),
('Logitech C920 HD Pro', 'Cámara web con grabación en 1080p.', '2027-08-01'),
('Elgato Cam Link 4K', 'Capturadora de video para streaming.', '2027-08-01'),
('Raspberry Pi 4', 'Mini computadora para proyectos DIY.', '2027-08-01'),
('Lenovo ThinkPad X1 Carbon', 'Laptop empresarial ultradelgada y ligera.', '2027-08-01'),
('Huawei MateBook X Pro', 'Laptop premium con pantalla táctil.', '2027-08-01'),
('MSI GS66 Stealth', 'Laptop gaming con diseño elegante y potente rendimiento.', '2027-08-01'),
('TCL 10 Pro', 'Smartphone con pantalla AMOLED y cuádruple cámara.', '2027-08-01'),
('Xiaomi Mi 11', 'Smartphone con cámara de 108 MP y carga rápida.', '2027-08-01'),
('OnePlus 9', 'Smartphone con carga rápida y rendimiento fluido.', '2027-08-01'),
('Apple MacBook Air M1', 'Laptop ligera y potente con chip M1.', '2027-08-01'),
('Asus ROG Zephyrus G14', 'Laptop gaming compacta y poderosa.', '2027-08-01'),
('Samsung Galaxy S21', 'Smartphone con pantalla dinámica y triple cámara.', '2027-08-01'),
('Sony PlayStation VR', 'Sistema de realidad virtual para PlayStation.', '2027-08-01'),
('Nintendo Switch Lite', 'Versión portátil de la consola Nintendo Switch.', '2027-08-01'),
('Logitech G923', 'Volante de carreras con retroalimentación háptica.', '2027-08-01'),
('BenQ GW2480', 'Monitor Full HD con tecnología sin parpadeo.', '2027-08-01'),
('Acer R240HY', 'Monitor IPS de 24 pulgadas con resolución Full HD.', '2027-08-01'),
('HP Envy x360', 'Laptop convertible con pantalla táctil.', '2027-08-01'),
('Canon EOS M50 Mark II', 'Cámara sin espejo para creadores de contenido.', '2027-08-01'),
('Nikon Z50', 'Cámara sin espejo compacta con excelente rendimiento.', '2027-08-01'),
('Fujifilm X-T30', 'Cámara sin espejo de estilo retro con rendimiento avanzado.', '2027-08-01'),
('Logitech G935 Lightsync', 'Auriculares gaming con sonido envolvente y RGB.', '2027-08-01'),
('HyperX Pulsefire FPS Pro', 'Ratón gaming con sensor preciso y retroiluminación.', '2027-08-01'),
('Corsair Scimitar RGB', 'Ratón gaming con múltiples botones programables.', '2027-08-01'),
('MSI MPG Z490 Gaming Plus', 'Placa madre para procesadores Intel de décima generación.', '2027-08-01'),
('Corsair 4000D Airflow', 'Caja de PC con excelente flujo de aire.', '2027-08-01'),
('Thermaltake Floe RC 360', 'Sistema de refrigeración líquida para CPU.', '2027-08-01'),
('G.Skill Ripjaws V 32GB', 'Memoria RAM de alto rendimiento.', '2027-08-01'),
('ADATA XPG SX8200 Pro 1TB', 'SSD NVMe para alto rendimiento en gaming.', '2027-08-01');


SELECT *FROM inventario.productos_bodega_estateria;
-- Ejemplo de inserción de datos
INSERT INTO inventario.productos_bodega_estateria (cantidad_estanteria, cantidad_bodega, pasillo_bodega, pasillo_estanteria, id_producto, id_sucursal) VALUES
(20, 30, 1, 1, 1, 1),  -- 20 unidades del producto 1 en la Sucursal 1
(15, 25, 1, 2, 2, 1),  -- 15 unidades del producto 2 en la Sucursal 1
(10, 5, 2, 1, 1, 2),   -- 10 unidades del producto 1 en la Sucursal 2
(0, 20, 1, 2, 3, 2),   -- 0 unidades del producto 3 en la Sucursal 2, pero 20 en la bodega
(5, 10, 2, 1, 2, 3);   -- 5 unidades del producto 2 en la Sucursal 3


-- Asumiendo que tienes 100 productos (id_producto 1 a 100)
INSERT INTO inventario.productos_bodega_estateria (cantidad_estanteria, cantidad_bodega, pasillo_bodega, pasillo_estanteria, id_producto, id_sucursal)
SELECT 10, 20, 1, 1, generate_series(1, 100), 1;  -- 10 en estantería y 20 en bodega para cada uno de los 100 productos


-- Asumiendo que tienes 75 productos (id_producto 1 a 75)
INSERT INTO inventario.productos_bodega_estateria (cantidad_estanteria, cantidad_bodega, pasillo_bodega, pasillo_estanteria, id_producto, id_sucursal)
SELECT 5, 15, 2, 1, generate_series(1, 75), 2;  -- 5 en estantería y 15 en bodega para cada uno de los 75 productos


-- Asumiendo que tienes 75 productos (id_producto 1 a 75)
INSERT INTO inventario.productos_bodega_estateria (cantidad_estanteria, cantidad_bodega, pasillo_bodega, pasillo_estanteria, id_producto, id_sucursal)
SELECT 7, 8, 2, 2, generate_series(1, 75), 3;  -- 7 en estantería y 8 en bodega para cada uno de los 75 productos




SELECT 
    s.nombre AS sucursal,
    COUNT(DISTINCT pbe.id_producto) AS total_productos
FROM 
    inventario.productos_bodega_estateria pbe
JOIN 
    administrador.sucursal s ON pbe.id_sucursal = s.id_sucursal
GROUP BY 
    s.nombre
ORDER BY 
    s.nombre;



--FUNCION QUE ME PERMITE ASIGNAR A LAS SUCURSALES PRODUCTOS EN ESTANTERIA Y BODEGA Y HACEN EL TOTAL REQUERIDO
CREATE OR REPLACE FUNCTION  bodega.insertar_productos_sucursal()
RETURNS VOID AS $$
BEGIN
    -- Para Sucursal Parque con 100 productos
    INSERT INTO inventario.productos_bodega_estateria (cantidad_estanteria, cantidad_bodega, pasillo_bodega, pasillo_estanteria, id_producto, id_sucursal)
    SELECT 50, 50, 1, 1, id_producto, 1
    FROM bodega.producto
    WHERE id_producto BETWEEN 1 AND 100;  

    -- Para Sucursal Centro1 con 75 productos
    INSERT INTO inventario.productos_bodega_estateria (cantidad_estanteria, cantidad_bodega, pasillo_bodega, pasillo_estanteria, id_producto, id_sucursal)
    SELECT 37, 38, 1, 1, id_producto, 2
    FROM bodega.producto
    WHERE id_producto BETWEEN 1 AND 75; 

    -- Para Sucursal Centro2 con 75 productos
    INSERT INTO inventario.productos_bodega_estateria (cantidad_estanteria, cantidad_bodega, pasillo_bodega, pasillo_estanteria, id_producto, id_sucursal)
    SELECT 38, 37, 1, 1, id_producto, 3
    FROM bodega.producto
    WHERE id_producto BETWEEN 1 AND 75;  

    RAISE NOTICE 'Productos insertados en las sucursales exitosamente.';
END;
$$ LANGUAGE plpgsql;

--SELECT bodega.insertar_productos_sucursal();
SELECT *FROM inventario.productos_bodega_estateria;
--TRUNCATE inventario.productos_bodega_estateria;

SELECT *FROM inventario.productos_bodega_estateria WHERE id_sucursal =1;

--FUNCION PARA INGRESAR CLIENTES

-- crear usuario
SELECT *FROM administrador.usuario;
CREATE OR REPLACE PROCEDURE administrador.ingresoUsuario(
    p_user_name VARCHAR,
    p_pass VARCHAR,
    r_rol INTEGER,
    d_direccion text,
	i_id_sucursal INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO administrador.usuario (user_name, pass, rol,direccion, id_sucursal)
    VALUES (p_user_name, p_pass, r_rol, d_direccion,i_id_sucursal);
END;
$$;
SELECT *FROM cajero.cajero;
CALL administrador.ingresoUsuario('cajero7', 'cajero7', 1, 'Quetzaltenango', 1);




CREATE OR REPLACE FUNCTION  administrador.getUsuario()
RETURNS VOID AS $$
BEGIN
	SELECT *FROM     

    RAISE NOTICE 'Productos insertados en las sucursales exitosamente.';
END;
$$ LANGUAGE plpgsql;


SELECT *FROM administrador.usuario;

-- insertando la funcion para llamar a los usuarios
CREATE OR REPLACE FUNCTION administrador.getUsuario(user_name_ VARCHAR, pass_ VARCHAR, rol_ INTEGER)
RETURNS TABLE(id_usuario INTEGER, user_name VARCHAR, pass VARCHAR, rol INTEGER, direccion TEXT, id_sucursal INTEGER)
AS $$
BEGIN
	RETURN QUERY
		SELECT u.id_usuario, u.user_name, u.pass, u.rol, u.direccion, u.id_sucursal
		FROM administrador.usuario u
		WHERE u.rol = rol_ and u.user_name=user_name_ and u.pass=pass_;
	
END;
$$ LANGUAGE plpgsql;   


SELECT *FROM administrador.getusuario('cajero1', 'cajero1', 2);












