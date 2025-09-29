import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { APP_PORT } from "./config/index.js";
import mongodbConnection from "./config/mongodb.js";
import { pgConnection } from "./config/pg.js";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(compression());
app.use(helmet());

app.get("/", (req, res) => {
    res.send("Hello from Healthcare Appointment System");
});

app.use(routes);

await pgConnection();
await mongodbConnection();

app.listen(APP_PORT, () => {
    console.log(`Server Running on PORT ${APP_PORT}`);
});
