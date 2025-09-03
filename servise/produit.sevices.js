const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.getAllProduits = async () => {
    return await prisma.prod.findMany();
};

module.exports.getProduitById = async (id) => {
    return await prisma.prod.findUnique({ where: { id: Number(id) } });
};

module.exports.deleteProduit = async (id) => {
    const deleted = await prisma.prod.delete({ where: { id: Number(id) } });
    return deleted ? 1 : 0;
};

module.exports.addProduit = async (obj) => {
    const created = await prisma.prod.create({ data: obj });
    return created ? 1 : 0;
};

module.exports.editProduit = async (obj, id) => {
    const updated = await prisma.prod.update({
        where: { id: Number(id) },
        data: obj
    });
    return updated ? 1 : 0;
};
