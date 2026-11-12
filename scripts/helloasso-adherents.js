/**
 * Récupère le nombre d'adhérents depuis l'API HelloAsso et l'écrit dans
 * public/adherents.json (lu par la page d'accueil).
 *
 * Les identifiants restent côté serveur/build : ils ne sont jamais envoyés
 * au navigateur. Lancé automatiquement avant `npm run serve` et `npm run build`.
 * Peut aussi être relancé seul : `npm run adherents`.
 */
const fs = require("fs");
const path = require("path");

try {
  process.loadEnvFile(path.join(__dirname, "..", ".env"));
} catch (e) {
  // Pas de .env : on utilise les variables d'environnement déjà définies.
}

const API = "https://api.helloasso.com";
const SORTIE = path.join(__dirname, "..", "public", "adherents.json");

const {
  HELLOASSO_CLIENT_ID,
  HELLOASSO_CLIENT_SECRET,
  HELLOASSO_ORGANIZATION_SLUG,
  HELLOASSO_MEMBERSHIP_FORM_SLUG,
} = process.env;

async function obtenirJeton() {
  const reponse = await fetch(`${API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: HELLOASSO_CLIENT_ID,
      client_secret: HELLOASSO_CLIENT_SECRET,
    }),
  });
  if (!reponse.ok) {
    throw new Error(`authentification refusée (HTTP ${reponse.status})`);
  }
  return (await reponse.json()).access_token;
}

async function compterAdherents(jeton) {
  const url = new URL(
    `${API}/v5/organizations/${encodeURIComponent(HELLOASSO_ORGANIZATION_SLUG)}` +
      `/forms/Membership/${encodeURIComponent(HELLOASSO_MEMBERSHIP_FORM_SLUG)}/items`
  );
  url.searchParams.set("itemStates", "Processed"); // adhésions payées/validées
  const TAILLE_PAGE = 100;
  url.searchParams.set("pageSize", String(TAILLE_PAGE));

  // HelloAsso ne calcule pas le total (totalCount = -1) : on parcourt les
  // pages grâce au continuationToken et on compte les adhésions.
  let total = 0;
  for (let page = 1; page <= 1000; page++) {
    const reponse = await fetch(url, {
      headers: { Authorization: `Bearer ${jeton}` },
    });
    if (!reponse.ok) {
      throw new Error(`lecture des adhésions impossible (HTTP ${reponse.status})`);
    }
    const { data = [], pagination = {} } = await reponse.json();

    if (pagination.totalCount >= 0) return pagination.totalCount;

    total += data.length;
    if (data.length < TAILLE_PAGE || !pagination.continuationToken) break;
    url.searchParams.set("continuationToken", pagination.continuationToken);
  }
  return total;
}

async function main() {
  const manquantes = [
    "HELLOASSO_CLIENT_ID",
    "HELLOASSO_CLIENT_SECRET",
    "HELLOASSO_ORGANIZATION_SLUG",
    "HELLOASSO_MEMBERSHIP_FORM_SLUG",
  ].filter((nom) => !process.env[nom]);

  if (manquantes.length) {
    console.warn(
      `[adhérents] Variables manquantes dans .env : ${manquantes.join(", ")}. ` +
        "La valeur par défaut sera affichée."
    );
    return;
  }

  const nombre = await compterAdherents(await obtenirJeton());
  fs.writeFileSync(
    SORTIE,
    JSON.stringify({ nombre, misAJour: new Date().toISOString() }, null, 2) + "\n"
  );
  console.log(`[adhérents] ${nombre} adhérents récupérés depuis HelloAsso.`);
}

// Un échec ne doit jamais bloquer le lancement ou le build du site.
main().catch((erreur) => {
  console.warn(
    `[adhérents] HelloAsso indisponible : ${erreur.message}. ` +
      "La dernière valeur connue (ou la valeur par défaut) sera affichée."
  );
});
