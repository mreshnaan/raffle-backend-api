const { express, cors, configs } = require("./helper/imports");

const app = express();
//database connection
const dbConnection = require("./utils/dbConnection");
dbConnection();

//import routes
const adminRoute = require("./routes/adminRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiPerfix = "/api/v1";

app.use(`${apiPerfix}/admin`, adminRoute);

app.get("/", (req, res, next) => {
  res.status(200).send({
    message: "Welcome to raffel backend",
  });
});

let server = app.listen(configs.port, () => {
  console.log(`Server is listing on port ${configs.port} ${configs.baseURL}`);
});
server.on("error", (e) => console.error("Error", e));
