const { zokou } = require("../framework/zokou");

const arenesABM = [
    { nom: 'Infinity Fortress', image: 'https://i.ibb.co/1gGcfDr/Image-2025-03-21-14-41-20-14.jpg' },
    { nom: 'Shibuya Champ de Destruction', image: 'https://i.ibb.co/4v7vxCC/Image-2025-03-21-14-41-20-13.jpg' },
    { nom: 'Vallée de la Fin', image: 'https://i.ibb.co/0pn2SJmf/Image-2025-03-21-14-41-20-11.jpg' },
    { nom: 'Dimension de Jigen', image: 'https://i.ibb.co/0yz8yqpM/Image-2025-03-21-14-41-20-12.jpg' },
    { nom: 'Greed Island', image: 'https://i.ibb.co/0y8CzHZR/Image-2025-03-21-14-41-20-8.jpg' },
    { nom: 'Repair Uchiha', image: 'https://i.ibb.co/ksnG6xmC/Image-2025-03-21-14-41-20-9.jpg' },
    { nom: 'Desert Egyptien', image: 'https://i.ibb.co/39Jb3jYp/Image-2025-03-21-14-41-20-10.jpg' },
    { nom: 'Plaine Rocheuse', image: 'https://i.ibb.co/Y7F7H1Ky/Image-2025-03-21-14-41-20-6.jpg' },
    { nom: 'Tokyo Exorcism School', image: 'https://i.ibb.co/fVsbHtx8/Image-2025-03-21-14-41-20-7.jpg' },
    { nom: 'Temple des Dieux', image: 'https://i.ibb.co/VcjTcFHx/Image-2025-03-21-14-41-20-5.jpg' },
    { nom: 'Place Enneigée', image: 'https://i.ibb.co/G3JDksbn/Image-2025-03-21-14-41-20-1.jpg' },
    { nom: 'Ville Z', image: 'https://i.ibb.co/7dzdXJvD/Image-2025-03-21-14-41-20-2.jpg' },
    { nom: 'Clover Arena', image: 'https://i.ibb.co/PGtVPx8M/Image-2025-03-21-14-41-20-3.jpg' },
    { nom: 'Forêt Dense', image: 'https://i.ibb.co/XxzW23W7/Image-2025-03-21-14-41-20-0.jpg' }
];

let duelsABM = {};
let lastArenaIndex = -1;

function tirerArABM() {
    let index;
    do {
        index = Math.floor(Math.random() * arenesABM.length);
    } while (index === lastArenaIndex);
    lastArenaIndex = index;
    return arenesABM[index];
}

function limiterStatsABM(stats, stat, valeur) {
    if (stats[stat] === 100 && valeur > 0) {
        return { stats, message: '_⚠️ Statistique déjà au maximum!_' };
    }
    stats[stat] = Math.min(stats[stat] + valeur, 100);
    return { stats, message: null };
}

function generateFicheDuelABM(duel) {
    return `▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
*▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
    🌐 𝐒𝐔𝐏𝐑𝐄𝐌𝐔𝐒 𝐍𝐀𝐓𝐈𝐎𝐍 🌐
   👊 𝐀𝐧𝐢𝐦𝐞 𝐁𝐚𝐭𝐭𝐥𝐞 𝐌𝐮𝐥𝐭𝐢𝐯𝐞𝐫𝐬 👊
*▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*\`👤 ${duel.equipe1[0].nom} :\`* 
> ❤️: ${duel.equipe1[0].stats.vie} | 🌀: ${duel.equipe1[0].stats.energie} | 🫀: ${duel.equipe1[0].stats.heart}

                     *𝙑𝙎*

*\`👤 ${duel.equipe2[0].nom} :\`* 
> ❤️: ${duel.equipe2[0].stats.vie} | 🌀: ${duel.equipe2[0].stats.energie} | 🫀: ${duel.equipe2[0].stats.heart}
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
          *\`FIGHTING RULE\`*

> - *Wtf :* MC
> - *Latence :* +100ms⚡
> - *Potentiel :* ${duel.statsCustom}
> - *Items :* (voir perso)
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
> *🔄 Tourneur :* ${duel.equipe2[0].nom} -> ${duel.equipe1[0].nom}
> *⚖️ Arbitre :* Auto Modo
> *🌦️ Météo :* (voir arène)
> *🌍 Zone :*  ${duel.arene.nom}
> *📌 Distance initiale :* 5m
> *⭕ Arène Stats :* (voir arène)
> *⏱️ Délai :* 5 + 1min max
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
> *🌍 Environnement :* (voir arène)

▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
    *MAÎTRISE INITIALE "⭐" : 5*

> *❌ Sans Visuel :* -1⭐
> *❌ Pavé Lassant :* -2⭐
> *❌ Contredit Verdict :* -2⭐
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
> *🥇 Easy: 3:* Victory.
> *🥈 Medium: 2:* +30%🫀def
> *🥉 Hard: 1:* -70%❤️/+50%🫀
> *🏅 Perfect: 5:* No variation.
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
> *⚠️ Si vous achevez l'adversaire d'un seul coup, c'est un "ONE SHOT" +2⭐. Si vous l'achevez en full power, c'est "RAMPAGE" +2⭐. Et si vous gagnez contre un personnage de rang supérieur, c'est "MONSTER KILLER" +4⭐.*
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
> *⏱️ DELAY:* Si vous ne parvenez pas à battre l'adversaire avant la fin du compteur, la victoire revient au joueur en meilleure posture *(stats ou domination).*
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
*▓▓▓▓[ CHARGEMENT... ]▓▓▓▓*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔`;
}

// Commande pour démarrer un duel
zokou(
    { nomCom: 'abm_rule', categorie: 'ABM' },
    async (dest, zk, { repondre, arg, ms }) => {
        if (!arg[0]) {
            return repondre('Usage: -duel_abm joueur1 vs joueur2 / stats. Ex: -duel_abm Gojo vs Sukuna / Sukuna F: Gray');
        }

        try {
            const input = arg.join(' ');
            const [joueursInput, statsCustom] = input.split('/').map(p => p.trim());
            const [equipe1Str, equipe2Str] = joueursInput.split('vs').map(p => p.trim());

            if (!equipe1Str || !equipe2Str) return repondre('Erreur de format !');

            const equipe1 = equipe1Str.split(',').map(n => ({ nom: n.trim(), stats: { heart: 100, energie: 100, vie: 100 } }));
            const equipe2 = equipe2Str.split(',').map(n => ({ nom: n.trim(), stats: { heart: 100, energie: 100, vie: 100 } }));
            const areneT = tirerArABM();

            const duelKey = `${equipe1Str} vs ${equipe2Str}`;
            duelsABM[duelKey] = { equipe1, equipe2, statsCustom: statsCustom || 'Aucune stat personnalisée', arene: areneT };

            const ficheDuel = generateFicheDuelABM(duelsABM[duelKey]);
            await zk.sendMessage(dest, { image: { url: areneT.image }, caption: ficheDuel }, { quoted: ms });

        } catch (error) {
            console.error('Erreur lors du duel ABM:', error);
            repondre('Une erreur est survenue.');
        }
    }
);

zokou(
    { nomCom: 'duel_abm', categorie: 'ABM' },
    (dest, zk, { repondre, arg, ms }) => {
        if (arg.length < 1) return repondre(
            'Format: \n' +
            '- Pour ajuster des stats : @Joueur stat +/- valeur [@Joueur stat +/- valeur ...]\n' +
            '  Ex: duel_abm Sukuna heart - 30 energie + 20\n' +
            '- Pour réinitialiser un joueur : reset @Joueur\n' +
            '- Pour réinitialiser tous les joueurs : reset all\n' +
            '- Pour supprimer tous les duels : delete'
        );

        const action = arg[0].trim().toLowerCase();

        // Suppression de tous les duels
        if (action === 'delete') {
            duelsABM = {}; // Réinitialisation complète
            return repondre('Tous les duels en cours ont été supprimés.');
        }

        // Réinitialisation des statistiques
        if (action === 'reset') {
            if (arg.length < 2) return repondre('Format: reset @Joueur ou reset all');

            const joueurId = arg[1].trim().toLowerCase();

            if (joueurId === 'all') {
                for (const key in duelsABM) {
                    duelsABM[key].equipe1.forEach(j => j.stats = { heart: 100, energie: 100, vie: 100 });
                    duelsABM[key].equipe2.forEach(j => j.stats = { heart: 100, energie: 100, vie: 100 });
                }
                return repondre('Les statistiques de tous les joueurs ont été réinitialisées.');
            }

            const duelKey = Object.keys(duelsABM).find(key => key.includes(joueurId));
            if (!duelKey) return repondre('Joueur non trouvé.');

            const duel = duelsABM[duelKey];
            const joueur = duel.equipe1.find(j => j.nom.toLowerCase() === joueurId) || duel.equipe2.find(j => j.nom.toLowerCase() === joueurId);
            if (!joueur) return repondre('Joueur non trouvé.');

            joueur.stats = { heart: 100, energie: 100, vie: 100 };
            repondre(`Les statistiques de ${joueur.nom} ont été réinitialisées.`);

            const ficheDuel = generateFicheDuelABM(duel);
            return zk.sendMessage(dest, { image: { url: duel.arene.image }, caption: ficheDuel }, { quoted: ms });
        }

        // Gestion de l'ajustement des stats pour plusieurs joueurs
        if (arg.length < 4) return repondre('Format: @Joueur stat +/- valeur [@Joueur stat +/- valeur ...]');

        let i = 0;
        let modifsEffectuées = false;
        while (i < arg.length) {
            const joueurId = arg[i];
            const stat = arg[i + 1];
            const signe = arg[i + 2];
            const valeurStr = arg[i + 3];

            if (!joueurId || !stat || !signe || !valeurStr) break; // Arrêter si format incorrect

            const valeur = parseInt(valeurStr);
            if (isNaN(valeur)) return repondre(`Valeur invalide pour ${joueurId}.`);

            const duelKey = Object.keys(duelsABM).find(key => key.includes(joueurId));
            if (!duelKey) return repondre(`Joueur ${joueurId} non trouvé.`);

            const duel = duelsABM[duelKey];
            const joueur = duel.equipe1.find(j => j.nom === joueurId) || duel.equipe2.find(j => j.nom === joueurId);
            if (!joueur || !['heart', 'energie', 'vie'].includes(stat)) return repondre(`Stat invalide pour ${joueurId}.`);

            const { stats, message } = limiterStatsABM(joueur.stats, stat, (signe === '-' ? -valeur : valeur));
            joueur.stats = stats;
            if (message) repondre(message);

            modifsEffectuées = true;
            i += 4; // Passer au prochain joueur/stat
        }

        if (modifsEffectuées) {
            const duelKey = Object.keys(duelsABM)[0]; // On prend un duel quelconque pour renvoyer une fiche mise à jour
            const duel = duelsABM[duelKey];
            const ficheDuel = generateFicheDuelABM(duel);
            return zk.sendMessage(dest, { image: { url: duel.arene.image }, caption: ficheDuel }, { quoted: ms });
        }
    }
);

// Définition des circuits
const circuitsSpeedRush = [
  { nom: 'Burnwood', image: 'https://i.ibb.co/xGtFbZ9/Image-2024-09-24-07-37-21-0.jpg' },
  { nom: 'Franklin Terrace', image: 'https://i.ibb.co/Xj1hmx0/Image-2024-09-24-07-37-21-1.jpg' },
  { nom: 'Crescent Mountains', image: 'https://i.ibb.co/WP917KC/Image-2024-09-24-07-37-21-2.jpg' },
  { nom: 'El Rey', image: 'https://i.ibb.co/Q8HpY8w/Image-2024-09-24-07-37-21-3.jpg' }
];

// Stockage des courses en cours
let coursesSpeedRush = {};

// Fonction pour tirer un circuit aléatoire
function tirerCircuitSpeedRush() {
  return circuitsSpeedRush[Math.floor(Math.random() * circuitsSpeedRush.length)];
}

// Fonction pour limiter les stats (0-100)
function limiterStatsSpeedRush(stats, stat, valeur) {
  if (stats[stat] === 100 && valeur > 0) {
    return { stats, message: '⚠️ Statistique déjà au maximum!' };
  }
  stats[stat] = Math.max(0, Math.min(stats[stat] + valeur, 100)); // S'assure que la valeur reste entre 0 et 100
  return { stats, message: null };
}

// Fonction pour générer la fiche de course
function generateFicheCourseSpeedRush(course) {
  return `▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   🌐 𝐒𝐔𝐏𝐑𝐄𝐌𝐔𝐒 𝐍𝐀𝐓𝐈𝐎𝐍 🌐
             🏁 𝐒𝐩𝐞𝐞𝐝 𝐑𝐮𝐬𝐡 🏁
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🏎️ ${course.pilote1.nom} :* 
> 🚘: ${course.pilote1.stats.voiture} | ⛽: ${course.pilote1.stats.essence} | 🛢️: ${course.pilote1.stats.turbo}

*🏎️ ${course.pilote2.nom} :* 
> 🚘: ${course.pilote2.stats.voiture} | ⛽: ${course.pilote2.stats.essence} | 🛢️: ${course.pilote2.stats.turbo}

${course.pilote3 ? `*🏎️ ${course.pilote3.nom} :*\n> 🚘: ${course.pilote3.stats.voiture} | ⛽: ${course.pilote3.stats.essence} | 🛢️: ${course.pilote3.stats.turbo}` : ''}
═══════════════════
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 *⚠️ RÈGLES DE COURSE ⚠️*

> - Saut de défi : Reboot 🔄
> - Latence : Tour Suivant
> - Gadgets : 3 max
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
*🔄 Tourneur :* ${course.tourneur}
*⚖️ Master :* ${course.master}
*🌦️ Conditions :* ${course.conditions}
*🌐 Circuit :* ${course.circuit.nom}
*📌 Départ :* ${course.depart}
*⏱️ Latence :* 5 + 1min max
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
═══════════════════
 *MAÎTRISE INITIALE "⭐" : 5*

> *❌ Sortie de Piste :* -1⭐
> *❌ Collision obstacle :* -2⭐
> *❌ Saut de défi :* -1⭐
═══════════════════
> *🥇 1ère PLACE: 3*
> *🥈 2ème PLACE: 2*
> *🥉 3ème PLACE: 1*
═══════════════════
> *⚠️ Si vous dépassez vos adversaires dans le dernier tour, c'est un "OVERTAKE" +2⭐. Si vous finissez la course avec boost total, c'est "TURBO MASTER" +2⭐. Et si vous gagnez sans avoir reçu de dégâts au véhicule, c'est "KING OF THE ROAD" +4⭐.*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
> *⏱️ TEMPS LIMITE: Si vous ne terminez pas avant la fin du chrono, la victoire revient au pilote avec le meilleur chrono ou la meilleure position.*
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔`;
}

// Commande pour démarrer une course
zokou(
  { nomCom: 'sr_rule', categorie: 'SPEED-RUSH' },
  (dest, zk, { repondre, arg, ms }) => {
    if (arg.length < 2) {
      return repondre('*Usage:* -sr_rule pilote1 pilote2 [pilote3] / <tourneur> <master> <conditions> <depart>');
    }

    try {
      const [pilotesStr, detailsCourse] = arg.join(' ').split('/').map(p => p.trim());
      const pilotes = pilotesStr.split(' ').map(p => ({ nom: p.trim(), stats: { voiture: 100, essence: 100, turbo: 100 } }));

      if (pilotes.length < 2 || pilotes.length > 3) {
        return repondre('Il faut 2 ou 3 pilotes pour démarrer une course.');
      }

      const [tourneur, master, conditions, depart] = detailsCourse ? detailsCourse.split(' ').map(p => p.trim()) : ['Auto', 'Auto', 'Sec', 'Ligne'];

      const circuit = tirerCircuitSpeedRush();

      const courseKey = `${pilotes[0].nom} vs ${pilotes[1].nom}${pilotes.length === 3 ? ' vs ' + pilotes[2].nom : ''}`;
      coursesSpeedRush[courseKey] = {
        pilote1: pilotes[0],
        pilote2: pilotes[1],
        pilote3: pilotes.length === 3 ? pilotes[2] : null,
        tourneur,
        master,
        conditions,
        depart,
        circuit
      };

      const ficheCourse = generateFicheCourseSpeedRush(coursesSpeedRush[courseKey]);
      zk.sendMessage(dest, { image: { url: circuit.image }, caption: ficheCourse }, { quoted: ms });

    } catch (error) {
      console.error('Erreur lors du démarrage de la course Speed Rush:', error);
      repondre('Une erreur est survenue lors du démarrage de la course.');
    }
  }
);

// Commande pour suivre une course 
zokou(
  { nomCom: 'sr', categorie: 'SPEED-RUSH' },
  (dest, zk, { repondre, arg, ms }) => {
    if (arg.length < 1) {
      return repondre('*Usage:* -sr stats/delete [options]');
    }

    const action = arg[0].toLowerCase();

    switch (action) {
      case 'stats':
        if (arg.length < 5) {
          return repondre('*Usage:* -sr stats @Pilote stat +/- valeur [@Pilote stat +/- valeur ...]\n' +
            'Ex: -sr stats @Pilote1 voiture - 20 essence + 15 @Pilote2 turbo - 10');
        }

        let i = 1;
        let modificationsEffectuées = false;

        while (i < arg.length) {
          const piloteId = arg[i];
          const stat = arg[i + 1];
          const signe = arg[i + 2];
          const valeurStr = arg[i + 3];

          if (!piloteId || !stat || !signe || !valeurStr) break; // Arrêter si format incorrect

          const valeur = parseInt(valeurStr);
          if (isNaN(valeur)) return repondre(`Valeur invalide pour ${piloteId}.`);

          if (!['voiture', 'essence', 'turbo'].includes(stat)) {
            return repondre(`Stat invalide pour ${piloteId}. Les stats valides sont : voiture, essence, turbo.`);
          }

          const courseKey = Object.keys(coursesSpeedRush).find(key => key.includes(piloteId));
          if (!courseKey) return repondre(`Pilote ${piloteId} non trouvé dans une course en cours.`);

          const course = coursesSpeedRush[courseKey];
          let pilote = [course.pilote1, course.pilote2, course.pilote3].find(p => p?.nom === piloteId);

          if (!pilote) return repondre(`Pilote ${piloteId} non trouvé dans cette course.`);

          const { stats, message } = limiterStatsSpeedRush(pilote.stats, stat, (signe === '-' ? -valeur : valeur));
          pilote.stats = stats;
          if (message) repondre(message);

          modificationsEffectuées = true;
          i += 4; // Passer au prochain bloc de stats
        }

        if (modificationsEffectuées) {
          const courseKey = Object.keys(coursesSpeedRush)[0]; // On prend une course quelconque pour renvoyer une fiche mise à jour
          const course = coursesSpeedRush[courseKey];
          const ficheCourse = generateFicheCourseSpeedRush(course);
          return zk.sendMessage(dest, { image: { url: course.circuit.image }, caption: ficheCourse }, { quoted: ms });
        }
        break;

      case 'delete':
        if (arg.length < 2) {
          return repondre('*Usage:* -sr delete courseKey. Ex: -sr delete @Pilote1 vs @Pilote2');
        }

        const courseKeyToDelete = arg.slice(1).join(' ');

        if (!coursesSpeedRush[courseKeyToDelete]) {
          return repondre('Course non trouvée.');
        }

        delete coursesSpeedRush[courseKeyToDelete];
        return repondre(`La course ${courseKeyToDelete} a été supprimée.`);

      default:
        return repondre('Action invalide. Utilisez "stats" ou "delete".');
    }
  }
);