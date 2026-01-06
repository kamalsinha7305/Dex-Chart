import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const BITQUERY_URL = "https://graphql.bitquery.io";

app.get("/api/ohlc", async (req, res) => {
  try {
    const query = `
    {
      Solana {
        DEXTrades(
          limit: { count: 5 }
          orderBy: { descending: Block_Time }
        ) {
          Block { Time }
          Trade { Price Amount }
        }
      }
    }
    `;

    const response = await fetch(BITQUERY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.BITQUERY_API_KEY}`
      },
      body: JSON.stringify({ query })
    });

    const raw = await response.text();
    console.log("BITQUERY RAW:", raw);

    res.status(response.ok ? 200 : 401).send(raw);

  } catch (err) {
    console.error("Backend crash:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
