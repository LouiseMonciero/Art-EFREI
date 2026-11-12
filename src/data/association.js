/**
 * Informations officielles de l'association.
 * ⚠️ Fichier unique à compléter : elles sont affichées dans le pied de page,
 * la section « Notre mission » de l'accueil et la page « L'association ».
 *
 * Ces informations doivent être IDENTIQUES (au caractère près) à celles
 * déclarées en préfecture / au RNA et saisies dans la demande Google
 * pour les associations.
 *
 * Tant qu'une valeur commence par « À COMPLÉTER », elle s'affiche surlignée
 * en rouge sur le site pour qu'on ne l'oublie pas.
 */
export default {
  // --- Identité ---
  nomOfficiel: "Association Art'EFREI",
  formeJuridique: "Association loi 1901",
  rna: "W943010884",
  siret: "N/A",
  dateCreation: "19 avril 2022",

  // --- Siège social (adresse postale déclarée) ---
  adresse: {
    ligne1: "30 32 avenue de la Republique",
    ligne2: "", // complément éventuel (bâtiment, bureau des associations...)
    codePostal: "94800",
    ville: "Villejuif",
    pays: "France",
  },

  contact: "artefrei@efrei.net",

  // --- Mission (idéalement reprise de l'objet social des statuts) ---
  mission:
    "Art'EFREI a pour mission de rendre les arts plastiques accessibles à tous les étudiants d'EFREI Paris, débutants comme confirmés, et de leur offrir un espace d'expression artistique et de développement personnel.",
  objetStatuts:
    "Faire découvrir de nouveaux arts créatifs aux étudiants de l'école efrei, donner l'occasion de s'exprimer artistiquement, aider les étudiants ayant un projet professionnel en lien avec l'art à développer leurs compétences, favoriser l'inter-association et l'inter-école dans le thème de l'art",
  activites: [
    "Ateliers hebdomadaires à pratique libre !",
    "Événements artistiques sur le campus : Expositions, fresques participatives!",
    "Challenges en lignes sur notre discord : Art'Ober, Art'Pril ou Mermay",
    "Réalisation de décors et collaborations avec les autres associations d'EFREI Paris",
  ],

  // --- Bureau actuel (AUCUN e-mail personnel) ---
  // photo : facultative, ex. require("@/assets/bureau/prenom.jpg") ; sinon initiales.
  mandat: "2026-2027",
  bureau: [
    { role: "Présidente", nom: "Alina Frederic", photo: null },
    { role: "Vice-présidente", nom: "Morgane Cordier", photo: null },
    { role: "Trésoriere", nom: "Louise Monciero", photo: null },
    { role: "Secrétaire", nom: "Clémentine Fleuret", photo: null },
    { role: "Vice-Secrétaire", nom: "Arnaud Chadal", photo: null },

  ],

  // --- Mentions légales ---
  directeurPublication: "Alina Frederic en qualité de Présidente",
  hebergeur: {
    nom: "Association Club-Rézo",
    adresse: "30 32 avenue de la République - 94800 Villejuif - France",
    site: "https://club-rezo.net/",
  },
};
