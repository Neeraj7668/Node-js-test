const Joi = require("joi");

// USER VALIDATION SCHEMA
const signUpSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(2)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(2)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

// FOLDERS VALIDATION SCHEMA
const createFolderSchema = Joi.object({
  userId: Joi.string().required(),
  folderName: Joi.string().required(),
});

const updateFolderSchema = Joi.object({
  userId: Joi.string().required(),
  folderName: Joi.string().required(),
  folderId: Joi.string().required(),
});

const moveSongsUnderFolderSchema = Joi.object({
  folders: Joi.array().min(1).required(),
  songs: Joi.array().min(1).required(),
});

// SONG VALIDATION SCHEMA
const createSongSchema = Joi.object({
  userId: Joi.string().required(),
  songHeading: Joi.string().required(),
  songDescription: Joi.string().required(),
});

const updateSongSchema = Joi.object({
  userId: Joi.string().required(),
  songId: Joi.string().required(),
  songHeading: Joi.string(),
  songDescription: Joi.string(),
});

// SONG VALIDATION SCHEMA

const getSongBlockSchema = Joi.object({
  userId: Joi.string().required(),
  songId: Joi.string().required(),
});

const createSongBlockSchema = Joi.object({
  userId: Joi.string().required(),
  songId: Joi.string().required(),
  songBlockHeading: Joi.string().required(),
  songBlockDescription: Joi.string().required(),
});

const updateSongBlockSchema = Joi.object({
  songBlockId: Joi.string().required(),
  songBlockHeading: Joi.string(),
  songBlockDescription: Joi.string(),
});

module.exports = {
  signUpSchema: signUpSchema,
  authSchema: authSchema,
  createFolderSchema,
  updateFolderSchema,
  moveSongsUnderFolderSchema,
  createSongSchema,
  updateSongSchema,
  getSongBlockSchema,
  createSongBlockSchema,
  updateSongBlockSchema,
};
