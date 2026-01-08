const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const admin = require("firebase-admin");

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.FB_SERVICE_KEY) {
  throw new Error("FB_SERVICE_KEY environment variable is missing");
}

const decodedServiceKey = Buffer.from(
  process.env.FB_SERVICE_KEY,
  "base64"
).toString("utf8");

const serviceAccount = JSON.parse(decodedServiceKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// set CORS options
app.use(
  cors({
    origin: "http://shorty-m.pages.dev",
    credentials: true,
  })
);

app.use(express.json());

// Middleware to verify Firebase token
const verifyFireBaseToken = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.token_email = decoded.email;
    next();
  } catch (error) {
    return res.status(401).send({ message: "unauthorized access" });
  }
};

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is missing");
}

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
});

let linksCollection;

// Connect to MongoDB
async function connectDB() {
  if (!linksCollection) {
    await client.connect();

    const db = client.db("linksDB");
    linksCollection = db.collection("linksCollection");

    console.log("MongoDB connected successfully");
  }

  return { linksCollection };
}

// Routes
// Root route
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Shorty API</title>
        <style>
          body {
            font-family: system-ui, sans-serif;
            background-color: #f9fafb;
            color: #333;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          h1 {
            color: #2563eb;
          }
          a {
            color: blue;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
          }
          .box {
            background: white;
            padding: 2rem 3rem;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>Shorty Backend API</h1>
          <p>This is the backend server for the Shorty project.</p>
          <p>Please visit the frontend site:</p>
          <a href="https://shorty-m.pages.dev">Go to Shorty Frontend</a>
        </div>
      </body>
    </html>
  `);
});

// API to create a shortened link
app.post("/shorten", verifyFireBaseToken, async (req, res) => {
  const { linksCollection } = await connectDB();
  const { targetURL, shortenTag } = req.body;

  if (!targetURL || !shortenTag) {
    return res
      .status(400)
      .send({ message: "targetURL and shortenTag are required" });
  }

  const existingLink = await linksCollection.findOne({ shortenTag });

  if (existingLink) {
    return res.status(409).send({ message: "Shorten tag already exists" });
  }

  const newLink = {
    targetURL,
    shortenTag,
    createdAt: new Date(),
    hits: 0,
    createdBy: req.token_email,
  };

  await linksCollection.insertOne(newLink);

  res.status(201).send(newLink);
});

// API to get all links for the authenticated user
app.get("/links", verifyFireBaseToken, async (req, res) => {
  const { linksCollection } = await connectDB();

  const userEmail = req.token_email;

  const userLinks = await linksCollection
    .find({ createdBy: userEmail })
    .toArray();

  res.status(200).send(userLinks);
});

// API to get total number of links for the authenticated user
app.get("/links/total", verifyFireBaseToken, async (req, res) => {
  const { linksCollection } = await connectDB();
  const userEmail = req.token_email;
  linksCollection
    .countDocuments({ createdBy: userEmail })
    .then((count) => {
      res.status(200).send({ totalLinks: count });
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal server error" });
    });
});

// API to get target URL by shorten tag and increment hits
app.get("/links/:id", (req, res) => {
  const { id } = req.params;

  linksCollection
    .findOne({ shortenTag: id })
    .then((link) => {
      if (link) {
        linksCollection.updateOne({ shortenTag: id }, { $inc: { hits: 1 } });
        res.status(200).send({ targetURL: link.targetURL });
      } else {
        res.status(404).send({ message: "Link not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal server error" });
    });
});

// API to delete a link by shorten tag
app.delete("/links/:id", verifyFireBaseToken, async (req, res) => {
  const { linksCollection } = await connectDB();
  const { id } = req.params;

  const userEmail = req.token_email;

  const link = await linksCollection.findOne({ shortenTag: id });

  if (!link) {
    return res.status(404).send({ message: "Link not found" });
  }

  if (link.createdBy !== userEmail) {
    return res
      .status(403)
      .send({ message: "Forbidden: Not your link to delete" });
  }

  await linksCollection.deleteOne({ shortenTag: id });

  res.status(200).send({ message: "Link deleted successfully" });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
