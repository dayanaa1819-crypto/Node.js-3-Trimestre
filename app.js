import express from 'express';
import {configDotenv} from 'dotenv';
configDotenv();

const app = express();

const port = process.env.PUERT || 3000;

app.get("/", (_, res) => {
    res.send("Hola mundo");
});

app.listen(port, () => {
    console.log(`SERVIDOR: http://localhost:${port}`);
});