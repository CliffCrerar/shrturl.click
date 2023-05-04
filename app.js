const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const shortid = require("shortid");
const path = require('path');
const fs = require('fs');

dotenv.config();

const PORT = process.env['PORT'] || 3000

// Dependancies

const app = express();
app.use(express.json());

// Exposing files

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'www')))
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')))
app.use('/icons', express.static(path.join(__dirname, 'node_modules', 'bootstrap-icons', 'font')))

// Pages



// Api section

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Url = mongoose.model("Url", urlSchema);

app.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.json({ shortId: existingUrl.shortId });
    }

    const shortId = shortid.generate();
    const newUrl = new Url({ originalUrl, shortId });
    await newUrl.save();

    res.json({ shortId });
  } catch (err) {
    res.status(500).type('text').write(err);
    res.end();
  }

});

app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).send("URL not found");
    }

    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).type('text').write(err);
    res.end();
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
