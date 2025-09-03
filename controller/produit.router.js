const express = require("express");
const router = express.Router();
const produitController = require("./produit.controller");

router.get('/', produitController.getAllProduits);
router.get('/:id', produitController.getProduitById);
router.delete('/', produitController.deleteProduit);
router.post('/', produitController.addProduit);
router.put('/', produitController.editProduit);

module.exports = router;