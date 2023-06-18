import Router from "koa-router";
import { add, subtract, multiply, divide } from "./operations.js";

const router = new Router();

router.get("/addition/:num1/:num2", async (ctx) => {
  const { num1, num2 } = ctx.params;

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    ctx.body = { status: "error", result: "Invalid input" };
    return;
  }

  const result = add(parseFloat(num1), parseFloat(num2));
  ctx.body = { status: "success", result };
});

router.post("/subtraction", async (ctx) => {
  const { num1, num2 } = ctx.request.body;

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    ctx.status = 400;
    ctx.body = { status: "error", result: "Invalid input" };
    return;
  }

  const result = subtract(parseFloat(num1), parseFloat(num2));
  ctx.body = { status: "success", result };
});

router.get("/multiply/:num1/:num2", async (ctx) => {
  const { num1, num2 } = ctx.params;

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    ctx.body = { status: "error", result: "Invalid input" };
    return;
  }

  const result = multiply(parseFloat(num1), parseFloat(num2));
  ctx.body = { status: "success", result };
});

router.post("/divide", async (ctx) => {
  const { num1, num2 } = ctx.request.body;

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    ctx.status = 400;
    ctx.body = { status: "error", result: "Invalid input" };
    return;
  }
  if (parseFloat(num2) === 0) {
    ctx.status = 400;
    ctx.body = { status: "error", result: "Cannot divide by zero" };
    return;
  }

  const result = divide(parseFloat(num1), parseFloat(num2));
  ctx.body = { status: "success", result };
});

export default router;
