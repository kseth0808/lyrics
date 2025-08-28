import express from "express";
import apps from "./routes/app.js"

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

app.use('/data', apps);


app.listen(3001, () => {
    console.log(`✅ Server started on http://localhost`);
}); 
