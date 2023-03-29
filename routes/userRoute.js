const { express } = require("../helper/imports");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  register,
  userProfile,
  walletLogin,
} = require("../controllers/userController");

router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.get("/profile", authMiddleware, userProfile);
router.post("/login", walletLogin);
router.post("/register", register);

module.exports = router;
