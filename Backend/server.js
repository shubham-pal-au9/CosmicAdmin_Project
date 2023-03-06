const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.get("/test", (req, res) => {
  res.send("Testing API");
});

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

//Define routes
app.use("/api/logincredentials", require("./routes/api/login"));
app.use("/api/resgistercredentials", require("./routes/api/register"));
app.use("/api/getusercount", require("./routes/api/getTotalCount"));
app.use("/api/list", require("./routes/api/getPlayerList"));
app.use("/api/updatestatus", require("./routes/api/updatePlayerStatus"));
app.use("/api/loadouts", require("./routes/api/weaponLoadout"));
app.use("/api/loadoutsCharacter/", require("./routes/api/characterLoadout"));
app.use("/api/players/", require("./routes/api/loadoutsPlayer"));
app.use("/api/wallet/", require("./routes/api/getplayerWallet"));
app.use("/api/tournament/", require("./routes/api/getTournament"));
app.use("/api/password/", require("./routes/api/forgetReset"));
app.use("/api/getFriend/", require("./routes/api/friendLists"));
app.use("/api/bldTokenStore/", require("./routes/api/bldTokenStore"));
app.use("/api/bldPurchase/", require("./routes/api/bldPurchaseHistory"));

app.use("/api/updatestatus", require("./routes/api/updateCharacterStatus"));
app.use("/api/updatestatus", require("./routes/api/updateWeaponsStatus"));

app.use("/uploads", express.static("./uploads"));

// Set Port for listening request
const PORT = process.env.PORT || 8080;

//PROCESS.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
