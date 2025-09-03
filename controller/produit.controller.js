const servise = require("../servise/produit.sevices");

/**
 * Récupère tous les produits de la base de données.
 * GET /api/produits
 */
exports.getAllProduits = async (req, res) => {
    const produits = await servise.getAllProduits();
    res.send(produits);
};

/**
 * Récupère un produit par son ID.
 * GET /api/produits/:id
 */
exports.getProduitById = async (req, res) => {
    const produit = await servise.getProduitById(req.params.id);
    if (produit == undefined)
        res.status(404).json('no record with given id : ' + req.params.id);
    else
        res.send(produit);
};

/**
 * Supprime un produit par son ID (passé en query).
 * DELETE /api/produits?id=ID
 */
exports.deleteProduit = async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json('Missing id in query');
    }
    const affectedRows = await servise.deleteProduit(id);
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + id);
    else
        res.send('deleted successfully.');
};

/**
 * Ajoute un nouveau produit.
 * POST /api/produits
 * Body: { nom, prix, quantite }
 */
exports.addProduit = async (req, res) => {
    await servise.addProduit(req.body);
    res.status(201).send('created successfully.');
};

/**
 * Modifie un produit existant par son ID (passé en query).
 * PUT /api/produits?id=ID
 * Body: { nom, prix, quantite }
 */
exports.editProduit = async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json('Missing id in query');
    }
    const affectedRows = await servise.editProduit(req.body, id);
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + id);
    else
        res.send('updated successfully.');
};