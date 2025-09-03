const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const produitRoute = require("./controller/produit.router");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});
app.use(express.json());
app.use('/api/produits', produitRoute);
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send('Something went wrong!');
});

// Vérifie la connexion Prisma avant de démarrer le serveur
async function startServer() {
    try {
        await prisma.$connect();
        console.log('Prisma connection succeeded.');
        app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
    } catch (err) {
        console.log('Prisma connection failed.\n' + err);
    }
}

startServer();