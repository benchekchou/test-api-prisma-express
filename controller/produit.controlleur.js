const express = require("express");
const router = express.Router();
const servise = require("../servise/produit.sevices");


//http://localhost:3000/api/produits/
router.get('/', async (req, res) => {
    const produits = await servise.getAllProduits()
    res.send(produits)
})

router.get('/:id', async (req, res) => {
    const produit = await servise.getProduitById(req.params.id)
    if (produit == undefined)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send(produit)
})

router.delete('/', async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json('Missing id in query');
    }
    const affectedRows = await servise.deleteProduit(id);
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + id);
    else
        res.send('deleted successfully.')
})

router.post('/', async (req, res) => {
    await servise.addProduit(req.body)
    res.status(201).send('created successfully.')
})

router.put('/', async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json('Missing id in query');
    }
    const affectedRows = await servise.editProduit(req.body, id);
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + id);
    else
        res.send('updated successfully.');
});



module.exports = router;
