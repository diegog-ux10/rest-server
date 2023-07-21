const { Router } = require("express");
const { check } = require("express-validator");
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/user");
const { validateFields } = require("../middlewares/validateFields");
const {
  isValidRole,
  emailExists,
  userExistsById,
} = require("../helpers/db-validators");
const { validateJwt } = require("../middlewares/validateJwt");

const router = Router();

router.get("/", usersGet);

router.put(
  "/:id",
  [
    check("id", "Not Valid Id").isMongoId(),
    check("id").custom(userExistsById),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPut
);

router.post(
  "/",
  [
    check("email", "Invalid Email").isEmail(),
    check("email").custom(emailExists),
    check(
      "password",
      "Password is required and More than 6 characters"
    ).isLength({ min: 6 }),
    check("name", "Name is Required").not().isEmpty(),
    // check("role", "Not a valid Role").isIn(["ADMIN_ROLE", "USER_ ROLE"]),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPost
);

router.delete(
  "/:id",
  validateJwt,
  check("id", "No es un ID Válido").isMongoId(),
  check("id").custom(userExistsById),
  usersDelete
);

module.exports = router;
