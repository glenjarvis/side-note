/**
 * @param {import("express").Request} _req
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
// @ts-ignore
const getNotes = (_req, response, next) => {
  // TODO: Determine why I need @ts-ignore
  response.locals.notes = [{ id: 1, text: "Note from NoteController" }];
  next();
}

/**
 * @param {import("express").Request} _req
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
// @ts-ignore
const saveNote = (_req, response, next) => {
  // TODO: Determine why I need @ts-ignore
  response.locals.savedNote = [{ id: 2, text: "Saved NoteX" }];
  next();
}

export const noteController = { getNotes, saveNote };