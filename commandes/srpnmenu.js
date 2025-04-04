const { zokou } = require('../framework/zokou');

// Fonction générique pour envoyer une image avec un lien donné
const envoyerImage = async (dest, zk, ms, lien, caption = '') => {
    await zk.sendMessage(dest, { image: { url: lien }, caption }, { quoted: ms });
};

// Commande guide
zokou(
    { nomCom: 'guide', categorie: 'CENTRAL' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
        const lien = 'https://i.ibb.co/9385N887/Image-2025-03-15-09-31-07-0.jpg';
        await envoyerImage(dest, zk, ms, lien);
    }
);

// Commande competition
zokou(
    { nomCom: 'competition', categorie: 'CENTRAL' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
        const lien = 'https://i.ibb.co/fd6rWQTV/Image-2025-03-15-09-31-07-1.jpg';
        await envoyerImage(dest, zk, ms, lien);
    }
);

// Commande reward
/*zokou(
    { nomCom: 'reward', categorie: 'CENTRAL' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
        const lien = 'https://i.ibb.co/Xxs9yD6/Picsart-24-09-18-13-44-38-374.jpg';
        await envoyerImage(dest, zk, ms, lien);
    }
);*/

// Commande currency
zokou(
    { nomCom: 'currency', categorie: 'CENTRAL' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
        const lien = 'https://i.ibb.co/5xjZ3kg9/Image-2025-03-15-09-31-07-2.jpg';
        await envoyerImage(dest, zk, ms, lien);
    }
);

// Commande generale
zokou(
    { nomCom: 'generale', categorie: 'CENTRAL' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
        const lien = 'https://i.ibb.co/V02kdXWt/Image-2025-03-15-09-31-07-3.jpg';
        await envoyerImage(dest, zk, ms, lien);
    }
);

// Commande guide_pro
/*zokou(
    { nomCom: 'guide_pro', categorie: 'CENTRAL' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
        const lien = 'https://i.ibb.co/hKyphPC/Picsart-24-09-17-22-41-09-565-1.jpg';
        await envoyerImage(dest, zk, ms, lien);
    }
);*/

// Commande speedrush_system
zokou(
    { nomCom: 'speedrush', categorie: 'SPEED-RUSH' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
        const liens = [
            'https://i.ibb.co/1YQvT04g/Image-2025-03-27-01-56-16-1.jpg',
            'https://i.ibb.co/PpFzC4C/Image-2025-03-27-01-56-16-0.jpg'
        ];
        for (const lien of liens) {
            await envoyerImage(dest, zk, ms, lien);
        }
    }
);

// Commande amb_system
zokou(
    { nomCom: 'abm', categorie: 'ABM' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
        const liens = [
            'https://i.ibb.co/QFY5HnG0/Image-2025-03-17-06-59-48-2.jpg',
            'https://i.ibb.co/4qRr9b4/Image-2025-03-17-06-59-48-1.jpg',
            'https://i.ibb.co/qMVzB1Jt/Image-2025-03-17-06-59-48-0.jpg'
        ];
        for (const lien of liens) {
            await envoyerImage(dest, zk, ms, lien);
        }
    }
);

// Commande origamy_system
zokou(
    { nomCom: 'origamy', categorie: 'ORIGAMY' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
        const liens = [
            'https://i.ibb.co/VWwGgGMg/Image-2025-03-18-21-31-47-2.jpg',
            'https://i.ibb.co/LzrGD9wg/Image-2025-03-18-21-31-47-1.jpg',
            'https://i.ibb.co/xcpVWb3/Image-2025-03-18-21-31-47-0.jpg'
        ];
        for (const lien of liens) {
            await envoyerImage(dest, zk, ms, lien);
        }
    }
);

// Commande system_yugioh
zokou(
    { nomCom: 'yugioh', categorie: 'YU-GI-OH' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
        const lien = 'https://i.ibb.co/gbYPs2CL/Image-2025-03-27-01-57-49.jpg';
        const msg = '*🎴 C\'est l\'heure du duel !*';
        await envoyerImage(dest, zk, ms, lien, msg);
    }
);

zokou(
    {
        nomCom: 'activites',
        categorie: 'CENTRAL'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://i.ibb.co/5GLqTHG/Image-2024-10-23-08-42-33.jpg';
            const msg = `░░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
  *PROGRAMME D'ACTIVITÉS*
▁▁▁▁▁▁▁ *SRPN* ▁▁▁▁▁▁▁▁
░░░░░░░░░░░░░░░░░░░░
*Pour tout savoir sur les activités, le programme, et services :*
 
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
               *EN SEMAINE*
▔╔ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  ╗▔
     *ACTIVITÉS RÉGULIÈRES :*
   ╚                                               ╝

1️⃣ *Défis Quotidien ABM :* Chaque jour, un nouveau défi de combat ABM avec des règles spéciales. Vous obtenez le double de récompense si vous réalisez le défi.

2️⃣ *Speed Rush Time Attack :* Défiez le chrono sur un circuit différent chaque jour et grimpez au classement. Vous obtenez le double de récompense en réalisant ce défi.

3️⃣ *Yu-Gi-Oh! Speed Duel Practice :* Sessions d'entraînement et de duels amicaux pour tester de nouveaux decks et améliorer vos compétences. Vous touché la récompense en réalisant ce défi.

4️⃣ *Origamy World Speed Quest :* Petites quêtes et missions courtes dans Origamy World pour gagner de l'XP et des récompenses. Vous obtenez +10pts chaque 5 tours réalisé et -5pts pour chaque pavé contraire au système de jeu.

5️⃣ *Casino SRPN :* Tentez votre chance aux jeux de hasard pour gagner des 🧭 et des 💎. Assuré vous d'avoir suffisamment de fonds sur votre compte *Transact Zone* sous peine d'amendement.

6️⃣ *Day off :* Jour de repos pour les joueurs et agents de DRPN généralement fixé le lundi.
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
               *EN WEEK-END*
▔╔ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  ╗▔
     *ACTIVITÉS RÉGULIÈRES :*
   ╚                                               ╝

🏆 *Supremus Cup :* La *Supremus Cup* est une compétition indirectement lié à la *Supremus Ligue*, lorsque vous atteigné la "Division Émeraude" et finissez "🥇Golden Star" vous obtenez la "Supremus Cup" ce qui vous fait gagner un "🌟Star Awards".
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
    *▷ SUPREMUS AWARDS ◁*
> - "🥇Golden Star" obtient "1🎁🏅 & 20.000🧭 & 2.000💎 & 600🎟️"
> - "🥈Silver Star" obtient "1🎁🥇 & 15.000🧭 & 1.500💎 & 400🎟️"
> - "🥉Brown Star" obtient "2🎁🥈 & 10.000🧭 & 1.000💎 & 200🎟️"
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🎖️ *Supremus Ligue :* Lancement de la *Supremus Ligue*, compte tout les activités de jeu. La *Supremus Ligue* est divisé en 5 divisions "Bronze, Argent, Or, Diamant et Émeraude" vous devez accumuler un maximum de points pour atteindre le *🔝TOP5* afin de passé en division supérieure à la fin de la ligue.
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
    *▷ SUPREMUS AWARDS ◁*

*▶ Division Bronze :* 
> - "🥇Golden Star" obtient "1🎁🥉 & 600💎 & 60🎟️"
> - "🥈Silver Star" obtient "400💎 & 40🎟️"
> - "🥉Brown Star" obtient "200💎 & 20🎟️"
> - "🧑‍🧑‍🧒‍🧒Concurrents" obtiennent "100💎".

*▶ Division Argent :* 
> - "🥇Golden Star" obtient "2🎁🥉 & 800💎 & 80🎟️"
> - "🥈Silver Star" obtient "1🎁🥉 & 600💎 & 60🎟️"
> - "🥉Brown Star" obtient "400💎 & 40🎟️"
> - "🧑‍🧑‍🧒‍🧒Concurrents" obtiennent "200💎".

*▶ Division Or :* 
> - "🥇Golden Star" obtient "1🎁🥈 & 1000💎 & 100🎟️"
> - "🥈Silver Star" obtient "1🎁🥉 & 800💎 & 80🎟️"
> - "🥉Brown Star" obtient "1🎁🥉 & 600💎 & 60🎟️"
> - "🧑‍🧑‍🧒‍🧒Concurrents" obtiennent "400💎".

*▶ Division Diamant :* 
> - "🥇Golden Star" obtient "2🎁🥈 & 1200💎 & 120🎟️"
> - "🥈Silver Star" obtient "1🎁🥈 & 1.000💎 & 100🎟️"
> - "🥉Brown Star" obtient "1🎁🥉 & 800💎 & 80🎟️"
> - "🧑‍🧑‍🧒‍🧒Concurrents" obtiennent "800💎".

*▶ Division Émeraude :* 
> - "🥇Golden Star" obtient "1🎁🏅 & 2.000💎 & 250🎟️"
> - "🥈Silver Star" obtient "1🎁🥇 & 1.500💎 & 200🎟️"
> - "🥉Brown Star" obtient "1🎁🥈 & 1.000💎 & 150🎟️"
> - "🧑‍🧑‍🧒‍🧒Concurrents" obtiennent "1.000💎".

> *⚠️ Les récompenses peuvent être réclamés seulement si vous avez réalisé minimum 5 activités.*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🌐 *Origamy World Story Event :* Lancement d'un événements narratifs spéciaux dans *Origamy World* avec des quêtes complexes et des récompenses épiques.

🎡 *Challenge Wheel :* Lancement de la roue du défi pour des affrontements aléatoires en 1 vs 1, jouables en solo ou en duo.

▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                     *DRPN*
▔╔ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  ╗▔
     *ACTIVITÉS DE LA DRPN :*
 (Direction de Rôle Play Nation)
   ╚                                               ╝

🤝 *Recrutement et Formation :* Sessions de recrutement et de formation pour les nouveaux joueurs et agents de DRPN.

✍🏻 *Rédaction d'annonce :* Rédaction, planification et diffusion des annonces et des résumés d'événements.

🛂 *Supervision :* Arbitrage des combats, des duels et mise à jour des fiches de joueurs.

👨🏻‍💻 *Gestion des Transactions :* Vérification des transactions, résolution des problèmes liés aux transactions et actualisation des données joueurs.

🖼️ *Création de Visuels :* Conception de bannières, d'icônes et d'autres éléments visuels pour la communauté.

🎭 *Mode Histoire :* Création de nouvelles quêtes, de nouveaux personnages et d'événements spéciaux pour le mode histoire.
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
░░░░░░░░░░░░░░░░░░░░░`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });

        }
    }
);

zokou(
    {
        nomCom: 'annonce',
        categorie: 'DRPN'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            // const lien = '';
            const msg = `▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
*▓▓▓▓▓▓[ ANNONCE ]▓▓▓▓▓▓*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎤[Annonceur] :* [Résumé]

▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
*👤[Gagnant] :*
> 🧠 Maîtrise:
> 💯 Score:
> 💢 Difficult:
> 🎤 Comment:

*👤[Perdant] :*
> 🧠 Maîtrise:
> 💯 Score:
> 💢 Difficult:
> 🎤 Comment:
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*👾 GAME :* 
*🌐 SERVEUR :* 
*🛂 MASTER :* 

*_✒️ Signature : ⟮ ✓ ⟯_*
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔`;
           // zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   repondre(msg);
        }
    }
);

// Commande de classement
zokou(
    { nomCom: 'challenge', categorie: 'CENTRAL' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
        const lien = 'https://i.ibb.co/C3h9Bkt6/Image-2025-03-29-08-45-37.jpg';
        const msg = `🕹️🪀 𝗦𝗨𝗣𝗥𝗘𝗠𝗨𝗦 𝗥𝗢𝗟𝗘 
                       𝗣𝗟𝗔𝗬 𝗡𝗔𝗧𝗜𝗢𝗡 🔝🏆
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*Découvrez où vous en êtes dans la compétition en consultant le classement ici :* https://challenge.place/c/67da00da1ae03084306ecb5e?utm_source=android_app&utm_medium=share

*N’oubliez pas de follow la page pour rester à jour sur les prochains défis et compétitions ! 🏆🔝*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
              📱𝗦𝗨𝗣𝗥𝗘𝗠𝗨𝗦 𝗣𝗥𝗢𝗗 🪀`;
        await envoyerImage(dest, zk, ms, lien, msg);
    }
);