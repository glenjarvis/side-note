import { noteModel } from "../models/noteModel.js";

/**
 * @param {import("express").Request} _req
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
// @ts-ignore
const getNotes = (_req, response, next) => {
  // TODO: Determine why I need @ts-ignore
  response.locals.notes = noteModel.find();
  next();
}

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
// @ts-ignore
const saveNote = (request, response, next) => {
  // TODO: Determine why I need @ts-ignore
  response.locals.savedNote = noteModel.insertOne(request.body);
  next();
}

export const noteController = { getNotes, saveNote };