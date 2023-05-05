const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8080;

const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const authRouter = require("./routes/auth.routes");

app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);

app.listen(port, () => console.log(`Connected to port - ${port}`));
