import express from "express";
import type { Request, Response } from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  "/assets",
  express.static(path.resolve(import.meta.dirname, "./assets"))
);

app.use(express.json());

app.get('/', (_: Request, response: Response) => {
  response.redirect('/assets/demo.html');
})

app.get("/notes", (_: Request, response: Response) => {
  response.json([{ id: 1, text: "Hello from backend!" }]);
});

app.post("/notes", (request: Request, response: Response) => {
  console.log("New note:", request.body);
  response.status(201).json({ message: "Note received" });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
