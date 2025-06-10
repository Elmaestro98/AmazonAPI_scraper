const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcom to Amazone API");
});

//Get PRODUCTS
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.status(500).json({
      message: "error at importing data........",
      error: error.message,
      details: error.error,
    });
  }
});

//GET REVIEWS
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.status(500).json({
      message: "error at importing data........",
      error: error.message,
      details: error.error,
    });
  }
});

//Get PRODUCTS reviews
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.status(500).json({ message: "error at importing data.........." });
  }
});

//Get serch
app.get("/search/:searchQuery", async (req, res) => {
  const { api_key } = req.query;
  const { searchQuery } = req.params;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.status(500).json({
      message: "Error d importation de donnée",
      error: error.message,
      details: error.error,
    });
  }
});

//Start a SERVER
app.listen(PORT, () => {
  console.log(`votre serveur tourne au port ${PORT}`);
});
