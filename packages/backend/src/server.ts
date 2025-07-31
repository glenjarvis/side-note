import express from "express";
import type { Request, Response } from "express";
import path from "path";

import { noteController } from "./controllers/notesController.js";

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

app.get("/notes", noteController.getNotes, (_: Request, response: Response) => {
  response.json(response.locals.notes);
});

app.post("/notes", noteController.saveNote, (_: Request, response: Response) => {
  response.status(201).json(response.locals.savedNote);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
