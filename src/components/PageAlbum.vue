<template>
  <GalerieAlbum
    :titre="album ? album.titre : 'Album introuvable'"
    :sous-titre="album && album.dates !== 'À COMPLÉTER' ? album.dates : ''"
    :jours="jours"
  />
</template>

<script>
import GalerieAlbum from "./GalerieAlbum.vue";
import albums from "@/data/albums.json";

// Construit les jours et les œuvres à partir de :
// - src/data/albums.json : titre, thème par jour, anagramme -> nom d'artiste
// - public/images/web/manifest.json : photos réellement présentes (généré par le script d'images)
export default {
  components: { GalerieAlbum },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return { manifest: null };
  },
  computed: {
    album() {
      return albums.albums.find((a) => a.id === this.id) || null;
    },
    jours() {
      if (!this.album || !this.manifest) return [];
      const fichiers = this.manifest[this.album.dossier] || [];
      const parJour = {};

      for (const fichier of fichiers) {
        // Nom attendu : ART20XX_ANAGRAMME_DXX.webp
        const m = fichier.match(/^ART\d{4}_([A-Za-z0-9]+)_D(\d+)\.webp$/);
        if (!m) continue;
        const [, anagramme, jour] = m;
        (parJour[jour] = parJour[jour] || []).push({
          image: `${process.env.BASE_URL}images/web/${this.album.dossier}/${fichier}`,
          artiste: this.album.artistes[anagramme] || "À COMPLÉTER",
        });
      }

      return Object.keys(parJour)
        .map(Number)
        .sort((a, b) => a - b)
        .map((numero) => ({
          nom: this.album.jours[numero] || `Jour ${numero}`,
          oeuvres: parJour[numero],
        }));
    },
  },
  async mounted() {
    try {
      const reponse = await fetch(`${process.env.BASE_URL}images/web/manifest.json`, {
        cache: "no-store",
      });
      if (reponse.ok) this.manifest = await reponse.json();
    } catch (e) {
      // Pas de manifest : la page affichera « En cours de travaux ».
    }
  },
};
</script>
