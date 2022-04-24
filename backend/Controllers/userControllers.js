import express from "express";
import asyncHandler from "express-async-handler";
import users from "../data/users.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(`${process.env.GOOGLE_CLIENT_ID}`);

const register = asyncHandler((req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    res.status(401);
    throw new Error("User already exists. Please login");
  }

  const hashedPw = bcrypt.hashSync(password, 10)
  users.push({name: name, email: email, password: hashedPw});

  const user = users.find((user) => user.email === email);

  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler((req, res) => {
  const { email, password } = req.body;
  const loggedUser = users.find((user) => user.email === email);
  if (loggedUser) {
    const verifiedPwd = bcrypt.compareSync(password, loggedUser.password);
    if (verifiedPwd) {
      console.log("Logged in successfully");
      res.status(200).json({
        name: loggedUser.name,
        email: loggedUser.email,
      });
    } else {
      res.status(401);
      throw new Error("Please check your password");
    }
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const googleLogin = asyncHandler((req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience: `${process.env.GOOGLE_CLIENT_ID}`,
    })
    .then((response) => {
      const { email_verified, email } = response.payload;
      if (email_verified) {
        const loggedUser = users.find((user) => user.email === email);
        if (loggedUser) {
          res.status(200).json({
            name: loggedUser.name,
            email: loggedUser.email,
          });
        } else {
          res.status(401).json({ error: "Sorry, User not found!" });
        }
      } else {
        res.status(401).json({ error: "Something went wrong, try again!" });
      }
    });
});

export { authUser, googleLogin, register };
