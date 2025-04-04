const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "MON-BOT" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    var coms = {};
    var mode = (s.MODE).toLowerCase() === "yes" ? "public" : "private";

    // Organiser les commandes par catégorie
    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    // Format de la date et de l'heure
    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Informations sur le bot
    let infoMsg = `
┏━━━━━ *${s.BOT}* ━━━━━━┓
> *🔑 Prefixe :* ${s.PREFIXE}
> *👤 Proprio :* ${s.OWNER_NAME}
> *🔄 Mode    :* ${mode}
> *🧮 Commandes :* ${cm.length}
> *💾 Stockage :* ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
> *🧑‍💻 Développeur :* Jøhñ Sũpręmũs
┗━━━━━━━━━━━━━━━━━━━┛
`;

    // Liste des commandes
    let menuMsg = `\n*Liste des commandes :*\n`;
    for (const cat in coms) {
        menuMsg += `\n🪀 *${cat}*
┏━━━━━━━━━━━━━━━━━━━┓\n`;
        for (const cmd of coms[cat]) {
            menuMsg += `> *${cmd}*\n`;
        }
        menuMsg += `┗━━━━━━━━━━━━━━━━━━━┛\n`;
    }
    menuMsg += `      🪀 𝙎𝙐𝙋𝙍𝙀𝙈𝙐𝙎 𝙋𝙍𝙊𝘿 🪀\n`;

    // Envoi du menu
    var lien = mybotpic();
    try {
        if (lien.match(/\.(mp4|gif)$/i)) {
            zk.sendMessage(dest, {
                video: { url: lien },
                caption: infoMsg + menuMsg,
                footer: "Je suis *Supremus-MD*, développé par Jøhñ Sũpręmũs",
                gifPlayback: true
            }, { quoted: ms });
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            zk.sendMessage(dest, {
                image: { url: lien },
                caption: infoMsg + menuMsg,
                footer: "Je suis *Supremus-MD*, développé par Jøhñ Sũpręmũs"
            }, { quoted: ms });
        } else {
            repondre(infoMsg + menuMsg);
        }
    } catch (e) {
        console.log("🥵 Menu erreur " + e);
        repondre("🥵 Menu erreur " + e);
    }
});