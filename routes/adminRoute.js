const { express } = require("../helper/imports");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const {
  adminLogin,
  adminProfile,
  adminRegister,
  getAdminUserById,
  getAllAdminUsers,
} = require("../controllers/adminController");

router.get("/", authMiddleware, getAllAdminUsers);
router.get("/:id", authMiddleware, getAdminUserById);
router.get("/profile", authMiddleware, adminProfile);
router.post("/login", adminLogin);
router.post("/register", adminRegister);

module.exports = router;
