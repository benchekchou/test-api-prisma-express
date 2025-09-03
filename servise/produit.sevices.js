const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.getAllProduits = async () => {
    try {
        return await prisma.prod.findMany();
    } catch (error) {
        throw { status: 500, message: "Erreur lors de la récupération des produits", details: error.message };
    }
};

module.exports.getProduitById = async (id) => {
    try {
        return await prisma.prod.findUnique({ where: { id: Number(id) } });
    } catch (error) {
        throw { status: 500, message: "Erreur lors de la récupération du produit", details: error.message };
    }
};

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

module.exports.addProduit = async (obj) => {
    try {
        const created = await prisma.prod.create({ data: obj });
        return created ? 1 : 0;
    } catch (error) {
        throw { status: 500, message: "Erreur lors de l'ajout du produit", details: error.message };
    }
};

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
