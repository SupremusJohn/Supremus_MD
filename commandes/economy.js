// ============================================================
// Nom du fichier : economy.js
// Auteur : Luffy
// GitHub : https://github.com/FaouzKK
//
// Description : Ce fichier contient les fonctions et les logiques
//               liées à l'économie du bot Supremus.
//
// Date de création : 06/03/2025
// Dernière modification : 28/03/2025
//
// ============================================================


const { createWriteStream, readFileSync, writeFileSync, unlinkSync } = require('fs');
const { zokou } = require('../framework/zokou');
const { randomInt } = require('crypto');
const axios = require("axios");

/**
 * @type {string}
 * @description L'URL de l'API Supremus.
 * @docs https://supremus-api.vercel.app/api-doc Lien de la documentations de l'API Supremus.
 */
const supremusApi = 'https://supremus-api.vercel.app/api';

/**
 * @type {string}
 * @description Le token d'authentification pour l'API Supremus Necessaire pour s'authentifier a l'API.
 */
const supremusToken = '64b71f3b-f718-44a6-9a6a-af63601cf073';


/**
 * 
 * @param {string} path - Chemin de la requete de la requête.
 * @param {string} method - Methode de la requête.
 * @param {object|null} params - Paramètres de la requête.
 * @param {object|null} body - Corps de la requête.
 * 
 * @description Fonction pour effectuer une requête sur l'API Supremus.
 * 
 * @returns {Promise<object>} - Les données de la requête.
 */
const requestOnApi = async (path, method = 'GET', params = null, body = null) => {
    try {
        let url = new URL(supremusApi + path);

        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supremusToken}`
        };

        const options = {
            method: method,
            headers: headers
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        let result = await response.json();

        if (result.status) {
            return result.data;
        } else {
            throw new Error(result.message);
        }

    } catch (error) {
        console.error("Erreur dans requestOnApi :", error);
        throw error;
    }
};

// const requestOnApi = async (path, method = 'GET', params = null, body = null) => {
//     try {
//         const url = `${supremusApi}${path}`;

//         const config = {
//             method: method,
//             url: url,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${supremusToken}`
//             },
//             params: params,  // Ajout des paramètres GET si besoin
//             data: body ? body : null // `data` pour les requêtes POST, PUT...
//         };

//         const response = await axios(config);

//         // Vérification de la réponse
//         if (response.data.status) {
//             return response.data.data;
//         } else {
//             throw new Error(response.data.message);
//         }

//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };




zokou({
    nomCom: "addplayer",
    reaction: "👤",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu } = commandOptions;

    if (!superUser) return repondre("Vous n'êtes pas autorisé à exécuter cette commande !");

    try {
        const consigne = `*Veuillez répondre au message du joueur que vous souhaitez ajouter en suivant l'ordre :*
        
addplayer <nom> <coupons> <supremus_tokens> <supremus_gemmes>

*Ex:* addplayer JOHN 50 2000 100.`;

        if (!arg || arg.length === 0) {
            const imageUrl = "https://i.ibb.co/sJ9ypSfn/Image-2025-03-17-00-21-51-3.jpg";
            await zk.sendMessage(dest, {
                image: { url: imageUrl },
                caption: consigne,
            });
            return;
        }

        let id = null;
        let fetchIndex = null;

        if (msgRepondu) {
            id = auteurMsgRepondu;
            fetchIndex = 0;
        } else if (arg[0].startsWith("@")) {
            id = arg[0].replace("@", "") + "@s.whatsapp.net";
            fetchIndex = 1;
        } else {
            return repondre(consigne);
        }

        let username = arg[fetchIndex] || "";
        let coupons = arg[fetchIndex + 1] || 0;
        let supremus_tokens = arg[fetchIndex + 2] || 0;
        let supremus_gemmes = arg[fetchIndex + 3] || 0;

        if (isNaN(coupons) || isNaN(supremus_tokens) || isNaN(supremus_gemmes)) {
            return repondre("Les valeurs doivent être des nombres !");
        }

        coupons = parseInt(coupons);
        supremus_tokens = parseInt(supremus_tokens);
        supremus_gemmes = parseInt(supremus_gemmes);

        const response = await requestOnApi(`/users/add`, "POST", null, {
            id: id,
            username: username,
            coupons: coupons,
            supremus_tokens: supremus_tokens,
            supremus_gemmes: supremus_gemmes
        });

        repondre(`_✅ Le joueur ${response.username} a été ajouté avec succès !_`);
    } catch (error) {
        return repondre(error.message);
    }
});


zokou({
    nomCom: "getplayer",
    reaction: "👨🏻‍💻",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

    let userId = null;

    if (msgRepondu) {
        userId = auteurMsgRepondu;
    }
    else if (arg?.length > 0 && arg[0].startsWith("@")) {
        userId = arg[0].replace("@", "") + "@s.whatsapp.net";
    }
    else {
        userId = auteurMessage;
    }

    try {
        const response = await requestOnApi(`/users/${userId}`, "GET");

        const rpgStyleMessage = `*👤PLAYER : ${response.username}*
▛▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▜
> *🎫 Coupons*: ${response.coupons}
> *🧭 $ Tokens*: ${response.supremus_tokens}
> *💎 $ Gemmes*: ${response.supremus_gemmes}
▙▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▟`;

        const imageUrl = "https://i.ibb.co/xNZVw6g/image.jpg"; // URL de l'image

        await zk.sendMessage(dest, {
            image: { url: imageUrl },
            caption: rpgStyleMessage,
        });
    } catch (error) {
        return repondre(error.message);
    }
});



zokou({
    nomCom: "updateplayer",
    reaction: "🔄",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu } = commandOptions;

    if (!superUser) return repondre("Vous n'êtes pas autorisé à exécuter cette commande !");

    try {
        const consigne = `*Veuillez répondre au message d'un joueur en ajoutant le préfixe de la variable à modifier :*
        
updateplayer <variable> <valeur> <méthode>

*[tag]* : à ignorer si vous répondez au message du joueur
*[variable]* : supremus_tokens, coupons, supremus_gemmes, username
*[valeur]* : la nouvelle valeur
*[méthode]* : add, new (par défaut c'est *add*, c'est-à-dire que la valeur entrée est additionnée à celle initialement sauvegardée)

*Exemple:* updateplayer coupons 200 new.`;

        if (!arg || arg.length === 0) {
            const imageUrl = 'https://i.ibb.co/sJ9ypSfn/Image-2025-03-17-00-21-51-3.jpg';
            await zk.sendMessage(dest, {
                image: { url: imageUrl },
                caption: consigne,
            });
            return;
        }

        let id = null;
        let index = 0;

        if (msgRepondu) {
            id = auteurMsgRepondu;
            index = 0;
        } else if (arg[0].startsWith("@")) {
            id = arg[0].replace("@", "") + "@s.whatsapp.net";
            index = 1;
        } else {
            return repondre(consigne);
        }

        let variable = arg[index];
        let valeur = arg[index + 1];
        let type = arg[index + 2] || "add";

        if (!['supremus_tokens', 'coupons', 'supremus_gemmes', 'username'].includes(variable)) {
            return repondre("*La variable doit être une des suivantes : supremus_tokens, coupons, supremus_gemmes, username*");
        }

        if (variable !== "username" && isNaN(valeur)) {
            return repondre("La valeur doit être un nombre !");
        }

        // Convertir en nombre si ce n'est pas un username
        if (variable !== "username") valeur = parseInt(valeur);

        let data = { [variable]: valeur };

        // Ajouter l'option pour l'addition ou la mise à jour
        data.appendCurrency = (type === "add");

        const response = await requestOnApi(`/users/${id}`, 'PUT', null, data);

        const rpgStyleMessage = `*👤 PLAYER : ${response.username}*
▛▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▜
> *🎫 Coupons*: ${response.coupons}
> *🧭 Tokens*: ${response.supremus_tokens}
> *💎 Gemmes*: ${response.supremus_gemmes}
▙▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▟`;

        const imageUrl = "https://i.ibb.co/sJ9ypSfn/Image-2025-03-17-00-21-51-3.jpg'";

        await zk.sendMessage(dest, {
            image: { url: imageUrl },
            caption: rpgStyleMessage,
        });
    } catch (error) {
        return repondre(error.message);
    }
});




zokou({
    nomCom: "buypack",
    reaction: "🎁",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

    try {
        const packList = await requestOnApi('/packs/list', 'GET');

        let texte = `*Packs disponibles choisissez un par son index*\n\n`

        for (const pack in packList) {
            texte += `${parseInt(pack) + 1} :  ${packList[pack]}\n`
        }

        texte += `\n *Choissiez un pack par son index et un grade (bronze, argent, or, special ) Exemple 1 bronze*`;

        // URL ou chemin de l'image représentant les packs
        const imageUrl = "https://i.ibb.co/ycJLcFn6/Image-2025-03-17-00-21-51-2.jpg";

        await zk.sendMessage(dest, {
            image: { url: imageUrl },
            caption: texte,
        });

        let userResponse;

        try {
            userResponse = await zk.awaitForMessage({
                sender: auteurMessage,
                chatJid: dest,
                timeout: 60000,
            });

        } catch (error) {
            return repondre(`Achat aborder`);
        }

        if (!userResponse) {
            return repondre('Aucune réponse reçue, achat annulé.');
        }

        let [index, grade] = userResponse.message?.extendedTextMessage?.text?.split(" ") || userResponse.message?.conversation?.split(" ") || [];

        if (!index || !grade) {
            return repondre('Veuillez entrer un index et un grade');
        }

        if (isNaN(index)) {
            return repondre('Veuillez entrer un index valide');
        }

        if (!["bronze", "argent", "or", "special"].includes(grade)) {
            return repondre('Veuillez entrer un grade valide');
        }

        const response = await requestOnApi('/packs/buy', 'POST', null, {
            packType: packList[parseInt(index) - 1],
            packGrade: grade,
            userId: auteurMessage
        });

        // URL de l'image à envoyer avec le résumé de l'achat
        const responseImageUrl = "https://i.ibb.co/sJ9ypSfn/Image-2025-03-17-00-21-51-3.jpg"; // Remplacer par l'URL de l'image spécifique que tu souhaites

        await zk.sendMessage(dest, {
            image: { url: responseImageUrl },
            caption: response.summary,  // Envoi du résumé de la réponse avec l'image
        });

    } catch (error) {
        return repondre(error.message);
    }
});



zokou({
    nomCom: "getitems",
    reaction: "📦",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

    try {

        const userId = msgRepondu ? auteurMsgRepondu : auteurMessage;

        console.log(userId)

        const result = await requestOnApi(`/inventory/users/${userId}`, 'GET');

        const filename = randomInt(10000) + '.html';

        writeFileSync(filename, result.html);

        await zk.sendMessage(dest, {
            document: readFileSync(filename),
            mimetype: 'text/html',
            filename: 'items.html',
            caption: '*📦 Inventaire de :* ' + result.user.username
        }, { quoted: ms });

        unlinkSync(filename);
    }
    catch (error) {
        return repondre(error.message);
    }
});


zokou({
    nomCom: "sell",
    reaction: "💸",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

    try {
        const consigne = `*Veuillez entrer l'ID de l'item à vendre.*`;

        if (!arg || arg.length < 1) {
            // URL de l'image à envoyer
            const imageURL = 'https://i.ibb.co/5gMVCyFD/Image-2025-03-17-00-21-51-0.jpg';

            await zk.sendMessage(dest, {
                image: { url: imageURL },
                caption: consigne,
            });
            return;
        }

        const itemId = arg[0];

        const response = await requestOnApi('/market/additem', 'POST', null, {
            objectId: itemId,
            ownerId: auteurMessage
        });

        // Vérifie si la réponse contient les informations sur l'item
        if (response?.item?.name && response?.market?.object_price) {
            repondre(`_✅ L’item *${response.item.name}* est mis en vente pour *${response.market.object_price}🧭*._`);
        } else {
            repondre("_❌ Mise en vente échouée. Veuillez vérifier l'ID de l'item ou réessayer plus tard._");
        }
    }
    catch (error) {
        return repondre(error.message);
    }
});


zokou({
    nomCom: "market",
    reaction: "🛒",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

    try {

        const result = await requestOnApi('/market/items', 'GET');

        const filename = randomInt(10000) + '.html';

        writeFileSync(filename, result.html);

        await zk.sendMessage(dest, {
            document: readFileSync(filename),
            mimetype: 'text/html',
            filename: 'market.html',
            caption: '*🛒 SRPN MARKET 🛍️*'
        });

        unlinkSync(filename);

    } catch (error) {
        return repondre(error.message);
    }
});


zokou({
    nomCom: "unsell",
    reaction: "🔄",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

    try {
        const consigne = `*Veuillez entrer l'ID de l'item à annuler la mise en vente (récupérable sur le marché).*`;

        if (!arg || arg.length < 1) {
            // URL de l'image à envoyer
            const imageURL = 'https://i.ibb.co/5gMVCyFD/Image-2025-03-17-00-21-51-0.jpg';

            await zk.sendMessage(dest, {
                image: { url: imageURL },
                caption: consigne,
            });
            return;
        }

        const itemId = arg[0];

        const response = await requestOnApi('/market/cancelitem', 'PUT', null, {
            marketId: itemId,
            ownerId: auteurMessage
        });

        repondre("_✅ Mise en vente annulée avec succès !_");
    } catch (error) {
        return repondre(error.message);
    }
});


zokou({
    nomCom: "buy",
    reaction: "🛍️",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

    try {
        const consigne = `*Veuillez entrer l'ID de l'item à acheter (récupérable sur le marché).*`;

        if (!arg || arg.length < 1) {
            // URL de l'image à envoyer
            const imageURL = 'https://i.ibb.co/5gMVCyFD/Image-2025-03-17-00-21-51-0.jpg';

            await zk.sendMessage(dest, {
                image: { url: imageURL },
                caption: consigne,
            });
            return;
        }

        const itemId = arg[0];

        const response = await requestOnApi('/market/buyitem', 'POST', null, {
            marketId: itemId,
            userId: auteurMessage
        });

        // Vérifie si la réponse contient les informations sur l'acheteur
        if (response?.transaction?.buyer?.summary) {
            // URL de l'image à envoyer avec la réponse
            const imageURL = 'https://i.ibb.co/5gMVCyFD/Image-2025-03-17-00-21-51-0.jpg'; // Remplacer par l'URL de l'image spécifique

            await zk.sendMessage(dest, {
                image: { url: imageURL },
                caption: response.transaction.buyer.summary,  // Envoi du résumé de l'achat avec l'image
            });
        } else {
            await zk.sendMessage(dest, {
                image: { url: 'https://i.ibb.co/5gMVCyFD/Image-2025-03-17-00-21-51-0.jpg' },  // Image d'erreur ou générique
                caption: "_❌ Achat échoué. Veuillez vérifier l'ID de l'item (récupérable sur le marché)._",
            });
        }
    } catch (error) {
        return repondre(error.message);
    }
});



zokou({
    nomCom: "newbet",
    reaction: "💲",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

    try {

        if (!superUser) return repondre("Vous n'êtes pas autorisé à utiliser cette commande.");

        const consigne = `*Usage :*
        
newbet <titre> / <description> / <option 1>, <option 2>, <option n> / <type de monnaie> / <montant de la mise>`

        if (!arg || arg.length < 1) {
    const imageUrl = "https://i.ibb.co/Hf8N8p2g/Image-2025-03-17-00-21-51-4.jpg"; // URL de l'image

    await zk.sendMessage(dest, {
        image: { url: imageUrl },
        caption: consigne,
    });

    return;
}

        const args = arg.join(" ").split("/").map(e => e.trim());

        let titre = args[0];
        let description = args[1];
        let options = args[2].split(',');
        let typeMonnaie = args[3];
        let montant = args[4];

        console.log(titre, description, options, typeMonnaie, montant)

        if (!titre || !description || !options || !typeMonnaie || !montant) {
            return repondre(consigne);
        }

        if (options.length < 2) {
            return repondre("Il faut au moins 2 options");
        }

        if (!["supremus_tokens", "supremus_gemmes", "coupons"].includes(typeMonnaie)) {
            return repondre("Type de monnaie invalide")
        }

        if (isNaN(montant)) {
            return repondre("Montant invalide");
        }

        montant = parseInt(montant);

        const response = await requestOnApi('/bets/new', 'POST', null, {
            name: titre,
            description: description,
            options: options,
            currencyType: typeMonnaie,
            amount: montant
        });

        repondre(`Parie ${response.eventName} initier`);

    }
    catch (error) {
        return repondre(error.message);
    }
});



zokou({
    nomCom: "betlist",
    reaction: "💹",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

    try {

        const response = await requestOnApi('/bets', 'GET', null, null);

        const filename = randomInt(1000, 9999) + '.html';

        writeFileSync(filename, response.html);

        await zk.sendMessage(dest, {
            document: readFileSync(filename),
            mimetype: 'text/html',
            filename: 'Paries.html',
            caption: '*🎰 Liste des paries en cours*'
        });

        unlinkSync(filename);
    }
    catch (error) {
        return repondre(error.message);
    }
});



zokou({
    nomCom: 'bet',
    reaction: "💰",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

    try {

        const consigne = `*usage :* 
        
bet <ID> <numero de l'option>`;

        if (!arg || arg.length < 2) {
            const imageUrl = "https://i.ibb.co/273YJ1yW/Image-2025-03-17-00-21-51-1.jpg"; // URL de l'image

            await zk.sendMessage(dest, {
                image: { url: imageUrl },
                caption: consigne,
            });

            return; // On arrête la fonction après avoir envoyé l'image et le message
        }

        let [id, option] = arg.map(e => e.trim());

        if (isNaN(option)) {
            return repondre("Le numero de l'option doit etre un nombre");
        }

        option = parseInt(option);

        const response = await requestOnApi('/bets/vote/' + id, 'POST', null, {
            betOption: option,
            userId: auteurMessage
        });

        repondre(`Vous avez vote pour l'option ${option} du parie ${response.eventId}`);
    }
    catch (error) {
        return repondre(error.message);
    }
});



zokou({
    nomCom: "finishbet",
    reaction: "⚖️",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    try {

        const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

        if (!superUser) return repondre("Vous n'avez pas les droits pour finir un parie")

        const consigne = `*usage :*
        
finishbet <id du parie> <option gagnant>`

        if (!arg || arg.length < 2) {
    const imageUrl = "https://i.ibb.co/Hf8N8p2g/Image-2025-03-17-00-21-51-4.jpg"; // URL de l'image

    await zk.sendMessage(dest, {
        image: { url: imageUrl },
        caption: consigne,
    });

    return;
}

        let [id, option] = arg.map(e => e.trim());

        if (isNaN(option)) {
            return repondre("Le numero de l'option doit etre un nombre");
        }

        option = parseInt(option);

        const response = await requestOnApi('/bets/finish/' + id, 'PUT', null, {
            winningOption: option
        });

        repondre(`*Parie ${response.event.eventName} conlus sur l'option ${response.event.winningOption}*

*🎊 Vainqueur(s):*

${response.winners.map(e => e?.username || null).join("\n")}

*🎁 Gains:* ${response.event.amount * 2} ${response.event.currencyType}`);

    } catch (error) {
        console.log(error);
    }
});


zokou({
    nomCom: "cancelbet",
    reaction: "🔄",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

    if (!superUser) return repondre("Vous n'avez pas les droits pour annuler un parie");

    try {

        consigne = `*Usage:*
        
cancelbet <ID>`

        if (!arg || arg.length < 1) {
    const imageUrl = "https://i.ibb.co/Hf8N8p2g/Image-2025-03-17-00-21-51-4.jpg"; // URL de l'image

    await zk.sendMessage(dest, {
        image: { url: imageUrl },
        caption: consigne,
    });

    return;
}

        const id = arg[0].trim();

        const response = await requestOnApi('/bets/cancel/' + id, 'PUT', null, null);

        repondre(`Parie ${response.eventName} annule`);
    }
    catch {
        return repondre("Une erreur est survenue");
    }
});


zokou({
    nomCom: "exchange",
    reaction: "💱",
    categorie: "ECONOMY",
}, async (dest, zk, commandOptions) => {

    const { repondre, ms, arg, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandOptions;

    try {

        const consigne = `*usage:*
        
exchange <montant> <monnaie_source> <monnaie_cible>`

        if (!arg || arg.length < 3) {
            const imageUrl = "https://i.ibb.co/5gMVCyFD/Image-2025-03-17-00-21-51-0.jpg"; // Correctement déclaré avant
            await zk.sendMessage(dest, {
                image: { url: imageUrl },
                caption: consigne,
            });
            return; // Arrêter l'exécution après l'envoi de l'image
        }

        let [montant, monnaieSource, monnaieCible] = arg.map(e => e.trim());

        if (isNaN(montant)) {
            return repondre("Le montant doit etre un nombre");
        }

        montant = parseInt(montant);

        const valideCurrency = ["supremus_tokens", "supremus_gemmes", "coupons"]

        if (!valideCurrency.includes(monnaieSource) || !valideCurrency.includes(monnaieCible)) {
            return repondre("Les monnaies doivent etre dans la liste suivante : " + valideCurrency.join(", "));
        }

        const response = await requestOnApi('/exchanges', 'POST', null, {
            fromCurrency: monnaieSource,
            toCurrency: monnaieCible,
            amount: montant,
            userId: auteurMessage
        });

                // URL de l'image à envoyer avec le résumé de l'achat
        const responseImageUrl = "https://i.ibb.co/sJ9ypSfn/Image-2025-03-17-00-21-51-3.jpg"; // Remplacer par l'URL de l'image spécifique que tu souhaites

        await zk.sendMessage(dest, {
            image: { url: responseImageUrl },
            caption: response.transaction.summary,  // Envoi du résumé de la réponse avec l'image
        });
    }
    catch (error) {
        return repondre(error.message);
    }
});