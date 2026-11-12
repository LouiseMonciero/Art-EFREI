/**
 * Génère les versions web des œuvres : taille réduite, filigrane discret,
 * format WebP. Les originaux (pleine résolution) ne sont jamais servis par le site.
 *
 * Source  : src/albums/images_albums/**
 * Sortie  : public/images/web/**  (ignoré par git, régénéré à chaque build)
 *
 * Lancé automatiquement avant `npm run serve` et `npm run build`.
 * Relance seul : `npm run images`.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const RACINE = path.join(__dirname, "..");
const SOURCE = path.join(RACINE, "src", "albums", "images_albums");
const SORTIE = path.join(RACINE, "public", "images", "web");

const LARGEUR_MAX = 1000; // suffisant pour l'écran, inutilisable pour l'impression
const QUALITE = 80;
const FILIGRANE = "© Art'EFREI";
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

function listerImages(dossier) {
  return fs.readdirSync(dossier, { withFileTypes: true }).flatMap((entree) => {
    const chemin = path.join(dossier, entree.name);
    if (entree.isDirectory()) return listerImages(chemin);
    return EXTENSIONS.includes(path.extname(entree.name).toLowerCase())
      ? [chemin]
      : [];
  });
}

// Filigrane en bas à droite, taille proportionnelle à l'image, semi-transparent
function filigraneSvg(largeur, hauteur) {
  const taille = Math.max(14, Math.round(largeur * 0.065));
  const marge = Math.round(taille * 0.6);
  const texte = FILIGRANE.replace("'", "&apos;");
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${largeur}" height="${hauteur}">
      <text x="${largeur - marge}" y="${hauteur - marge}" text-anchor="end"
            font-family="Helvetica, Arial, sans-serif" font-size="${taille}"
            font-weight="bold" fill="#ffffff" fill-opacity="0.7"
            stroke="#000000" stroke-opacity="0.35" stroke-width="${Math.max(1, taille / 12)}"
            paint-order="stroke">${texte}</text>
    </svg>`);
}

async function traiter(fichier) {
  const relatif = path.relative(SOURCE, fichier);
  const sortie = path.join(SORTIE, relatif.replace(/\.[^.]+$/, ".webp"));

  // Ne retraite que si l'original est plus récent que la version web
  if (fs.existsSync(sortie) && fs.statSync(sortie).mtimeMs >= fs.statSync(fichier).mtimeMs) {
    return "ignoré";
  }

  fs.mkdirSync(path.dirname(sortie), { recursive: true });
  const animee = path.extname(fichier).toLowerCase() === ".gif";

  // 1. Redimensionnement (toutes les frames pour un GIF)
  const redimensionnee = await sharp(fichier, { animated: animee, limitInputPixels: false })
    .resize({ width: LARGEUR_MAX, withoutEnlargement: true })
    .toBuffer({ resolveWithObject: true });

  // 2. Filigrane aux dimensions réelles de l'image redimensionnée
  const { width, height } = redimensionnee.info;
  const hauteurFrame = redimensionnee.info.pageHeight || height;
  await sharp(redimensionnee.data, { animated: animee, limitInputPixels: false })
    .composite([{ input: filigraneSvg(width, hauteurFrame), top: 0, left: 0, tile: animee }])
    .webp({ quality: QUALITE, effort: 5 })
    .toFile(sortie);

  return "généré";
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.warn(`[images] Dossier source introuvable : ${SOURCE}`);
    return;
  }
  const fichiers = listerImages(SOURCE);
  let generees = 0;
  for (const fichier of fichiers) {
    const etat = await traiter(fichier);
    if (etat === "généré") generees++;
  }

  // Index des œuvres par album (lu par le site pour construire les galeries)
  const index = {};
  for (const dossier of fs.readdirSync(SOURCE, { withFileTypes: true })) {
    if (!dossier.isDirectory()) continue;
    index[dossier.name] = listerImages(path.join(SOURCE, dossier.name))
      .map((f) => path.basename(f).replace(/\.[^.]+$/, ".webp"))
      .sort();
  }
  fs.mkdirSync(SORTIE, { recursive: true });
  fs.writeFileSync(path.join(SORTIE, "manifest.json"), JSON.stringify(index, null, 2) + "\n");

  console.log(`[images] ${fichiers.length} œuvres prêtes (${generees} générées, versions web dans public/images/web).`);
}

main().catch((erreur) => {
  // Échec non bloquant : le build continue, mais il faut le voir.
  console.error(`[images] Erreur lors de la génération : ${erreur.message}`);
  process.exitCode = 1;
});
