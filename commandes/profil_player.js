const { zokou } = require('../framework/zokou');
const { insertPlayerProfile, getPlayerProfile, updatePlayerProfile } = require('../bdd/player_bdd');

const playerProfiles = {
  'tenno': {
    nomCom: 'tenno',
    playerName: 'Tęnnõ Sũpręmũs',
    imageUrl: 'https://i.ibb.co/cSxxrVFv/Image-2025-03-24-07-41-59-2.jpg'
  },
  'nelliel': { 
    nomCom: 'nelliel',
    playerName: 'Nelliel Volfir',
    imageUrl: 'https://i.ibb.co/20hx4jVR/Image-2025-03-24-07-41-59-1.jpg'
  },
  'louis': { 
    nomCom: 'louis',
    playerName: 'Lone Ink Louis',
    imageUrl: 'https://i.ibb.co/XrYFM8sR/Image-2025-03-27-02-14-52.jpg'
  },
  'aizen': { 
    nomCom: 'aizen',
    playerName: 'Aizen',
    imageUrl: 'https://i.ibb.co/JFSqdVSm/Image-2025-03-25-18-43-08.jpg'
  },
  'yu': { 
    nomCom: 'yu',
    playerName: 'DĒVIL Yû',
    imageUrl: 'https://i.ibb.co/CKJZvb5p/Image-2025-03-28-13-43-31-2.jpg'
  },
  'inferno': { 
    nomCom: 'inferno',
    playerName: 'Inferno',
    imageUrl: 'https://i.ibb.co/RTv16qdh/Image-2025-03-28-13-43-31-0.jpg'
  },
  'shadow': { 
    nomCom: 'shadow',
    playerName: 'Lloyd Shadow T.',
    imageUrl: 'https://i.ibb.co/4Z8r4mgn/Image-2025-03-28-13-43-31-1.jpg'
  },
  'vecta': { 
    nomCom: 'vecta',
    playerName: 'Vecta Uchiwa.',
    imageUrl: 'https://i.ibb.co/cXy8YsLq/Image-2025-03-30-00-24-06.jpg'
  },
  'sophie': { 
    nomCom: 'sophie',
    playerName: 'Sophie Scarlet Louis',
    imageUrl: 'https://i.ibb.co/PZwGRjNL/Image-2025-04-02-13-55-06-0.jpg'
  },
  'lord': { 
    nomCom: 'lord',
    playerName: 'Lord',
    imageUrl: 'https://i.ibb.co/5hPBn1j3/Image-2025-04-02-13-55-06-1.jpg'
  }
};


function formatProfileMessage(data) {
  return `▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
*▓▓▓▓▓[SRPN PROFIL]▓▓▓▓▓▓*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
> *👤 Nom :* ${data.name}  
> *♨️ Statut :* ${data.statut}  
> *🪀 Mode :* ${data.mode}  
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
*▓▓▓▓▓▓[EXPLOITS]▓▓▓▓▓▓▓*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ 
> *🧑‍🧑‍🧒‍🧒 DIVISION :* ${data.division}
> *🧘‍♂️ RANG :*  
> - *ABM :* ${data.rang_abm}  
> - *SPEED RUSH :* ${data.rang_speed_rush}  
> - *YU-GI-OH :* ${data.rang_yugioh}  
> *🏆 Champion :* ${data.champion}  
> *😎 Spécialité :* ${data.specialite}  
> *👑 Leader :* ${data.leader}  
> *🤼‍♂️ Challenge :* ${data.defis_remportes}  
> *💯 Légende :* ${data.legende}  
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
*▓▓▓▓▓▓▓[STATS]▓▓▓▓▓▓▓▓*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
> *👊 Battles :* V : 00${data.victoires} | D : 00${data.defaites} | L : 00${data.forfaits}   
> *🏅 TOP 3 :* 00${data.top3}  
> *🎭 Story Mode :* 
> M.W : 00${data.missions_reussies} / M.L : 00${data.missions_echouees}  
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
*▓▓▓▓▓▓▓[GAMES]▓▓▓▓▓▓▓▓*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
> *🀄 Cards ABM :* ${data.abm_cards}  
> *🚗 Vehicles :* ${data.vehicles} 
> *🃏 Yu-Gi-Oh :* ${data.yugioh_deck}  
> *🪐 Origamy Skins :*  
> - *🚻 Skins :* ${data.skins}  
> - *🎒 Items :* ${data.items}  
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
*▓▓▓▓▓▓▓[MONEY]▓▓▓▓▓▓▓▓*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
> *🧭 S Tokens :* ${data.s_tokens}🧭  
> *💎 S Gemmes :* ${data.s_gemmes}💎  
> *🎟️ Coupons :* ${data.coupons}🎟️  
> *🎁 Box VIP :* 0${data.box_vip}🎁
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
*▓▓▓▓▓▓[ACCOUNT]▓▓▓▓▓▓▓*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
> *💰 Dépenses :* ${data.depenses}FCFA  
> *💵 Profits :* ${data.profits}FCFA  
> *🏧 Retraits :* ${data.retraits}FCFA  
> *💳 Solde :* ${data.solde}FCFA
*▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔`;
}

for (const nomCom in playerProfiles) {
  zokou(
    {
      nomCom: nomCom,
      categorie: 'PLAYER-PROFIL'
    },
    async (dest, zk, commandeOptions) => {
      const { ms, repondre, arg, superUser } = commandeOptions;
      const profile = playerProfiles[nomCom];
      const playerName = profile.playerName;
      const imageUrl = profile.imageUrl;

      try {
        let data = await getPlayerProfile(playerName);

        if (!data) {
          await insertPlayerProfile(playerName);
          data = await getPlayerProfile(playerName);
          repondre(`Le profil du joueur ${playerName} a été créé.`);
        }

        if (!arg || arg.length === 0) {
          try {
            await zk.sendMessage(dest, { image: { url: imageUrl }, caption: formatProfileMessage(data) }, { quoted: ms });
          } catch (error) {
            console.error("Erreur lors de la récupération de l'image :", error);
            zk.sendMessage(dest, { text: formatProfileMessage(data) }, { quoted: ms });
          }
        } else if (superUser) {
          let updates = {};
          let fields = arg.join(' ').split(';');
          let changes = [];

          fields.forEach(fieldPair => {
            let [field, value] = fieldPair.split('=').map(item => item.trim());
            if (field && value) {
              const newValue = isNaN(value) ? value : Number(value);
              const oldValue = data[field] !== undefined ? data[field] : 'Non défini';

              if (oldValue !== newValue) {
                changes.push(`*${field}* : ${oldValue} -> ${newValue}`);
                updates[field] = newValue;
              }
            }
          });

          if (Object.keys(updates).length > 0) {
            await updatePlayerProfile(playerName, updates);
            data = await getPlayerProfile(playerName);
            let confirmationMessage = `Mise à jour du profil de ${playerName}:\n${changes.join('\n')}`;
            repondre(confirmationMessage);
          } else {
            repondre('Aucune modification détectée.');
          }
        }
      } catch (error) {
        console.error("Erreur lors du traitement de la commande :", error);
        repondre('Une erreur est survenue lors du traitement de la commande.');
      }
    }
  );
};