import express from "express";
import apps from "./routes/app.js"

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

app.use('/data', apps);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

