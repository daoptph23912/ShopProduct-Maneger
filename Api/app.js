const   express  = require("express");
const  bodyParser = require("body-parser");
const  viewEngine = require("./config/viewEngine");
const  initWebRouter = require("./route/web");
const  connectDB = require("./config/connectDB");
const  cors = require("cors");
var cookieParser = require('cookie-parser')
const  {createJWT,verifyToken} = require("./middleware/JWTAction");

require('dotenv').config();

// createJWT()
// let data = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmd1eeG7hW4gVsSDbiBIaeG7g24iLCJhZGRyZXNzIjoiSOG6o2kgRMawxqFuZyIsImlhdCI6MTY4MDg3ODk5N30.bi7cnkkNJ-a31uZuPYRwkQcl413mp_4IqdcX0wIEzs8")
// console.log(data)
const app = express();
app.use(cookieParser())
app.use(cors({origin:true}))
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));

viewEngine(app);
initWebRouter(app);
connectDB();

let port = process.env.PORT;

app.listen(port,()=>{
    console.log("API đang chạy PORT: " + port);
});