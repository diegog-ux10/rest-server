const { Router } = require("express");
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/user");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { isValidRole, emailExists } = require("../helpers/db-validators");

const router = Router();

router.get("/", usersGet);

router.put("/:id", usersPut);

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

router.delete("/", usersDelete);

module.exports = router;
