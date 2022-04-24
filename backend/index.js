import express from "express";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

import userRoutes from "./Routes/userRoutes.js";

const app = express();
app.use(express.json());


app.use("/api/users", userRoutes);

app.use(errorHandler);
app.use(notFound);

app.listen(5000, () => {
  console.log("Server is running in port 5000");
});
