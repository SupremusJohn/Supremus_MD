const { zokou } = require('../framework/zokou');
const { select_cars } = require('../commandes/select_cars');

/**
 * Fonction pour envoyer l'image et les informations d'un véhicule spécifique.
 * @param {string} dest - L'identifiant du destinataire.
 * @param {object} zk - Instance du bot.
 * @param {object} ms - Message source pour la citation.
 * @param {string} vehicule - Nom du véhicule recherché.
 */
async function envoyerVehicule(dest, zk, ms, vehicule) {
    let vehiculeTrouve = false;
    const vehiculeUpper = vehicule.toUpperCase();

    // Parcourir toutes les catégories et types pour trouver le véhicule
    for (const [categorie, types] of Object.entries(select_cars)) {
        for (const [type, vehicules] of Object.entries(types)) {
            if (vehicules[vehiculeUpper]) {
                vehiculeTrouve = true;
                const { lien } = vehicules[vehiculeUpper];

                // Envoi de l'image avec une légende contenant le nom, la catégorie et le type du véhicule.
                zk.sendMessage(dest, { 
                    image: { url: lien }, 
                    caption: `*${vehiculeUpper} | ${categorie} | ${type}*`
                }, { quoted: ms });

                return; // On arrête la recherche dès qu'on trouve un véhicule correspondant.
            }
        }
    }

    // Message d'erreur si le véhicule n'est pas trouvé.
    if (!vehiculeTrouve) {
        zk.sendMessage(dest, { text: `*❌ Véhicule ${vehicule} indisponible.*` }, { quoted: ms });
    }
}

/**
 * Fonction pour envoyer la liste complète des véhicules disponibles.
 * @param {string} dest - L'identifiant du destinataire.
 * @param {object} zk - Instance du bot.
 * @param {object} ms - Message source pour la citation.
 */
async function envoyerListeVehicules(dest, zk, ms) {
    let message = '*🚗 Liste des véhicules disponibles:*\n\n';

    for (const [categorie, types] of Object.entries(select_cars)) {
        message += `*🚀 ${categorie} :*\n`;
        for (const [type, vehicules] of Object.entries(types)) {
            message += `\n🔹 *${type} :*\n`;
            message += Object.keys(vehicules).join('\n') + '\n';
        }
        message += '\n';
    }

    zk.sendMessage(dest, { text: message }, { quoted: ms });
}

/**
 * Fonction pour sélectionner un véhicule aléatoire selon les critères donnés.
 * @param {string} dest - L'identifiant du destinataire.
 * @param {object} zk - Instance du bot.
 * @param {object} ms - Message source pour la citation.
 * @param {string|null} categorie - Catégorie du véhicule (optionnel).
 * @param {string|null} type - Type du véhicule (optionnel).
 */
async function vehiculeAleatoire(dest, zk, ms, categorie = null, type = null) {
    let vehiculesFiltres = [];

    // Filtrage des véhicules selon les critères
    for (const [c, types] of Object.entries(select_cars)) {
        if (categorie && c !== categorie.toUpperCase()) continue;

        for (const [t, vehicules] of Object.entries(types)) {
            if (type && t !== type.toUpperCase()) continue;

            for (const [nom, data] of Object.entries(vehicules)) {
                vehiculesFiltres.push({ nom, categorie: c, type: t, lien: data.lien });
            }
        }
    }

    if (vehiculesFiltres.length === 0) {
        zk.sendMessage(dest, { text: 'Aucun véhicule trouvé avec ces critères.' }, { quoted: ms });
        return;
    }

    // Sélection aléatoire
    const randomVehicule = vehiculesFiltres[Math.floor(Math.random() * vehiculesFiltres.length)];

    // Envoi du véhicule sélectionné
    zk.sendMessage(dest, { 
        image: { url: randomVehicule.lien }, 
        caption: `*${randomVehicule.nom} | ${randomVehicule.categorie} | ${randomVehicule.type}*`
    }, { quoted: ms });
}

// Commande principale pour la gestion des véhicules
zokou(
    {
        nomCom: 'vehicles',
        categorie: 'SPEED-RUSH'
    },
    async (dest, zk, commandeOptions) => {
        const { arg, ms } = commandeOptions;

        if (!arg || arg.length === 0) {
            await envoyerListeVehicules(dest, zk, ms);
        } 
        else if (arg[0].toUpperCase() === 'RANDOM') {
            const categorie = arg[1] ? arg[1].toUpperCase() : null;
            const type = arg[2] ? arg[2].toUpperCase() : null;
            await vehiculeAleatoire(dest, zk, ms, categorie, type);
        } 
        else {
            await envoyerVehicule(dest, zk, ms, arg[0]);
        }
    }
);
