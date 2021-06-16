require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const wallet = {
  1: { balance: 0.0 },
  2: { balance: 0.0 },
  3: { balance: 0.0 },
  4: { balance: 0.0 },
};

const stations = {
  abuja: { name: "abuja", type: "natural", orbit: "earth" },
  moon: { name: "moon", type: "natural", orbit: "earth" },
  spock: { name: "spock", type: "natural", orbit: "mars" },
  iss: { name: "iss", type: "manmade", orbit: "earth" },
};

const rockets = ["falcon 1", "falcon 9"];

const prices = {
  "inter-orbit": { "falcon 1": 250, "falcon 9": 500 },
  "intra-orbit": { "falcon 1": 50, "falcon 9": 100 },
  royalty: { "falcon 1": 200, "falcon 9": 200 },
};

// Get Wallet Balance
app.get("/api/v1/wallets/:id", (req, res) => {
  const { id } = req.params;

  if (!wallet[id])
    return res
      .status(404)
      .json({ status: "failed", error: "customer does not exist" });
  const { balance } = wallet[id];

  return res.status(200).json({ balance, status: "success" });
});

// fund wallet
app.post("/api/v1/wallets", (req, res) => {
  const { customer_id, amount } = req.body;

  if (wallet[customer_id]) {
    const initialBalance = wallet[customer_id].balance;
    wallet[customer_id].balance = initialBalance + amount;
  } else {
    wallet[customer_id] = { balance: amount };
  }

  res
    .status(200)
    .json({ status: "success", balance: wallet[customer_id].balance });
});

// Take a trip
app.post("/api/v1/trip", (req, res) => {
  const { customer_id, from, to, rocket } = req.body;

  if (!stations[from] || !stations[to])
    return res
      .status(400)
      .json({ status: "failed", error: "space station(s) is unavailable" });
  if (!rockets.includes(rocket))
    return res
      .status(400)
      .json({ status: "failed", error: "rocket not available" });

  const journey =
    stations[from].orbit === stations[to].orbit ? "intra-orbit" : "inter-orbit";
  const royalty = stations[to].type === "manmade" ? prices.royalty[rocket] : 0;
  const bill = prices[journey][rocket] + royalty;

  const initialBalance = wallet[customer_id].balance;
  if (bill > initialBalance)
    return res
      .status(400)
      .status({ status: "failed", message: "insufficient funds" });

  wallet[customer_id].balance = initialBalance - bill;
  return res
    .status(200)
    .json({ bill, balance: wallet[customer_id].balance, status: "success" });
});

app.listen(port, () => {
  console.log("Server is up and listening on port " + port);
});
