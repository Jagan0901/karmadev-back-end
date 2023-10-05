import { client } from "./index.js";
import bcrypt from "bcrypt";

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
}


export async function createUser(email, hashedPassword) {
  return await client
    .db("KarmaDev")
    .collection("users")
    .insertOne({ email: email, password: hashedPassword });
}

export async function getUserByMail(email) {
  return await client
    .db("KarmaDev")
    .collection("users")
    .findOne({ email: email });
}


//Products

export async function getProducts(req) {
  return await client
    .db("KarmaDev")
    .collection("products")
    .find(req.query)
    .toArray();
}

export async function addProducts(newMovie) {
  return await client.db("KarmaDev").collection("products").insertOne(newMovie);
}

export async function getProductsById(movieId) {
  return await client
    .db("KarmaDev")
    .collection("products")
    .findOne({ id: movieId });
}

export async function deleteProductsById(movieId) {
  return await client
    .db("KarmaDev")
    .collection("products")
    .deleteOne({ id: movieId });
}

export async function editProductsById(movieId, updatedMovie) {
  return await client
    .db("KarmaDev")
    .collection("products")
    .updateOne({ id: movieId }, { $set: updatedMovie });
}
