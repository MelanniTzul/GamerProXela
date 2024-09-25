//*Importaciones
const { Router } = require("express");
const router = Router();
//*Importacion
const userController = require("../controllers/user.controller");
const { ValidateInputs } = require("../middlewares/index");
const { check } = require("express-validator");

//*Rutas
router.post(
  "/iniciarSesion",
  // [
  //   check("username", "El correo es obligatorio")
  //     .isR
  //     .withMessage("El correo no es valido"),
  //   check("password", "Contraseña obligatorio").isStrongPassword(),
  //   ValidateInputs
  // ],
  userController.login
);

//*Modulo
module.exports = router;
