import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const coin = req.query.coin;
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets",{
            params: {
                vs_currency: "usd",
                ids: coin,
                price_change_percentage: "24h"
            }
        });  

        const crypto = response.data[0];

        if (!crypto) {
            return res.render("index.ejs", {
            crypto: null,
            error: "Cryptocurrency not found"
    });
}

        res.render("index.ejs", { crypto : crypto, error: null });
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
