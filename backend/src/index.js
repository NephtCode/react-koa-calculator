import Koa from "koa";
import cors from "@koa/cors";
import KoaLogger from "koa-logger";
import { koaBody } from "koa-body";
import dotenv from "dotenv";
import router from "./routes.js";

const app = new Koa();

dotenv.config();

app.use(cors());
app.use(KoaLogger());

app.use(koaBody());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
