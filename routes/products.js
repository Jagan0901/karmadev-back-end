import express from "express";
import {
  addProducts,
  getProductsById,
  deleteProductsById,
  editProductsById,
  getProducts,
} from "../helper.js";


const router = express.Router();

//POST method
router.post("/",  async (req, res) => {
  const newMovie = req.body;
  console.log(newMovie);
  const create = await addProducts(newMovie);
  res.send(create);
});

// Movies/id
router.get("/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const movie = await getProductsById(movieId);
  // const movie = movies.find((mv) => mv.id == movieId)
  movie ? res.send(movie) : res.status(404).send({ message: "No Movie Found" });
});

//Delete Book
router.delete("/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const movie = await deleteProductsById(movieId);
  // const movie = movies.find((mv) => mv.id == movieId)
  res.send(movie);
});

//Update movie
router.put("/:movieId",  async (req, res) => {
  const { movieId } = req.params;
  const updatedMovie = req.body;
  // console.log(newMovie);
  const edit = await editProductsById(movieId, updatedMovie);
  res.send(edit);
});


router.get("/", async (req, res) => {
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  const product = await getProducts(req);
  res.send(product);
});

export const productRouter = router;
