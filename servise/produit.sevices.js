const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Récupère tous les produits de la base de données.
 * @returns {Promise<Array>} Liste des produits.
 */
module.exports.getAllProduits = async () => {
    try {
        return await prisma.prod.findMany();
    } catch (error) {
        throw { status: 500, message: "Erreur lors de la récupération des produits", details: error.message };
    }
};

/**
 * Récupère un produit par son ID.
 * @param {number} id - L'identifiant du produit.
 * @returns {Promise<Object|null>} Le produit ou null s'il n'existe pas.
 */
module.exports.getProduitById = async (id) => {
    try {
        return await prisma.prod.findUnique({ where: { id: Number(id) } });
    } catch (error) {
        throw { status: 500, message: "Erreur lors de la récupération du produit", details: error.message };
    }
};

/**
 * Supprime un produit par son ID.
 * @param {number} id - L'identifiant du produit à supprimer.
 * @returns {Promise<number>} 1 si supprimé, 0 sinon.
 */
module.exports.deleteProduit = async (id) => {
    try {
        const deleted = await prisma.prod.delete({ where: { id: Number(id) } });
        return deleted ? 1 : 0;
    } catch (error) {
        if (error.code === 'P2025') {
            // Prisma error code for "Record not found"
            throw { status: 404, message: "Aucun produit trouvé avec cet id", details: error.message };
        }
        throw { status: 500, message: "Erreur lors de la suppression du produit", details: error.message };
    }
};

/**
 * Ajoute un nouveau produit à la base de données.
 * @param {Object} obj - Les données du produit { nom, prix, quantite }.
 * @returns {Promise<number>} 1 si ajouté, 0 sinon.
 */
module.exports.addProduit = async (obj) => {
    try {
        const created = await prisma.prod.create({ data: obj });
        return created ? 1 : 0;
    } catch (error) {
        throw { status: 500, message: "Erreur lors de l'ajout du produit", details: error.message };
    }
};

/**
 * Modifie un produit existant par son ID.
 * @param {Object} obj - Les nouvelles données du produit { nom, prix, quantite }.
 * @param {number} id - L'identifiant du produit à modifier.
 * @returns {Promise<number>} 1 si modifié, 0 sinon.
 */
module.exports.editProduit = async (obj, id) => {
    try {
        const updated = await prisma.prod.update({
            where: { id: Number(id) },
            data: {
                nom: obj.nom,
                prix: obj.prix,
                quantite: obj.quantite
            }
        });
        return updated ? 1 : 0;
    } catch (error) {
        if (error.code === 'P2025') {
            // Prisma error code for "Record not found"
            throw { status: 404, message: "Aucun produit trouvé avec cet id", details: error.message };
        }
        throw { status: 500, message: "Erreur lors de la modification du produit", details: error.message };
    }
};
