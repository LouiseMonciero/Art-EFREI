<template>
  <div>
    <NavBar></NavBar>
    <RouterLink to="/gallerie" class="retour">← Retour à la galerie</RouterLink>
    <h1 class="page-titre">{{ titre }}</h1>
    <p v-if="sousTitre" class="page-sous-titre">{{ sousTitre }}</p>

    <p v-if="!jours.length" class="travaux">🚧 En cours de travaux 🚧</p>

    <section v-for="(jour, j) in jours" :key="jour.nom" class="jour">
      <h2 class="jour-titre">
        Jour {{ j + 1 }} : <span>{{ jour.nom }}</span>
      </h2>
      <ul class="grille">
        <li v-for="(oeuvre, i) in jour.oeuvres" :key="oeuvre.image">
          <button class="vignette" @click="ouvrir(j, i)" :aria-label="'Agrandir l\'œuvre de ' + oeuvre.artiste">
            <img :src="oeuvre.image" :alt="'Œuvre de ' + oeuvre.artiste + ' – ' + jour.nom" loading="lazy" />
            <span class="artiste">{{ oeuvre.artiste }}</span>
          </button>
        </li>
      </ul>
    </section>

    <!-- Visionneuse plein écran -->
    <div
      v-if="courant"
      class="visionneuse"
      role="dialog"
      aria-modal="true"
      :aria-label="'Œuvre de ' + courant.artiste"
      @click.self="fermer"
    >
      <button class="v-fermer" aria-label="Fermer" @click="fermer">✕</button>
      <button class="v-nav v-prec" aria-label="Œuvre précédente" @click="deplacer(-1)">‹</button>
      <figure>
        <img :src="courant.image" :alt="'Œuvre de ' + courant.artiste" />
        <figcaption>
          {{ jours[selection.j].nom }} — Artiste : <strong>{{ courant.artiste }}</strong>
        </figcaption>
      </figure>
      <button class="v-nav v-suiv" aria-label="Œuvre suivante" @click="deplacer(1)">›</button>
    </div>

    <FooTer></FooTer>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import FooTer from "./FooTer.vue";

export default {
  components: { NavBar, FooTer },
  props: {
    titre: { type: String, required: true },
    sousTitre: { type: String, default: "" },
    // [{ nom: "Citrouille", oeuvres: [{ image, artiste }] }]
    jours: { type: Array, default: () => [] },
  },
  data() {
    return {
      selection: null,
    };
  },
  computed: {
    aplati() {
      const liste = [];
      this.jours.forEach((jour, j) =>
        jour.oeuvres.forEach((_, i) => liste.push({ j, i }))
      );
      return liste;
    },
    courant() {
      if (!this.selection) return null;
      return this.jours[this.selection.j].oeuvres[this.selection.i];
    },
  },
  methods: {
    ouvrir(j, i) {
      this.selection = { j, i };
      document.body.style.overflow = "hidden";
    },
    fermer() {
      this.selection = null;
      document.body.style.overflow = "";
    },
    deplacer(pas) {
      const n = this.aplati.length;
      const pos = this.aplati.findIndex(
        (p) => p.j === this.selection.j && p.i === this.selection.i
      );
      this.selection = this.aplati[(pos + pas + n) % n];
    },
    surTouche(e) {
      if (!this.selection) return;
      if (e.key === "Escape") this.fermer();
      if (e.key === "ArrowRight") this.deplacer(1);
      if (e.key === "ArrowLeft") this.deplacer(-1);
    },
  },
  mounted() {
    window.addEventListener("keydown", this.surTouche);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.surTouche);
    document.body.style.overflow = "";
  },
};
</script>

<style lang="scss" scoped>
.retour {
  display: inline-block;
  margin: 20px var(--gouttiere) 0;
  color: var(--texte-doux);
  text-decoration: none;
  font-weight: 600;
  &:hover {
    color: var(--magenta);
  }
}

.travaux {
  text-align: center;
  font-family: "BebasNeue", sans-serif;
  font-size: 30px;
  margin: 40px var(--gouttiere);
}

.jour {
  width: min(100% - 2 * var(--gouttiere), 1300px);
  margin: 48px auto 0;
}

.jour-titre {
  font-family: "BebasNeue", sans-serif;
  font-weight: normal;
  font-size: clamp(26px, 3vw, 34px);
  letter-spacing: 1px;
  margin: 0 0 16px;
  span {
    background-color: var(--jaune);
    padding: 0 6px;
  }
}

.grille {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

@media (max-width: 560px) {
  .grille {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

.vignette {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  cursor: zoom-in;
  background: #f2f2f2;
  border-radius: 14px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  box-shadow: var(--ombre);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }
  &:hover img,
  &:focus-visible img {
    transform: scale(1.06);
  }
}

.artiste {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24px 12px 8px;
  text-align: left;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Visionneuse */
.visionneuse {
  position: fixed;
  inset: 0;
  z-index: 20000;
  background: rgba(10, 10, 12, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 64px;
  figure {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    max-height: 100%;
  }
  img {
    max-width: 100%;
    max-height: calc(100vh - 160px);
    object-fit: contain;
    border-radius: 8px;
  }
  figcaption {
    color: #fff;
    margin-top: 12px;
    text-align: center;
  }
}

.v-fermer,
.v-nav {
  position: absolute;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  cursor: pointer;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 26px;
  line-height: 1;
  display: grid;
  place-items: center;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

.v-fermer {
  top: 14px;
  right: 14px;
  font-size: 20px;
}

.v-nav {
  top: 50%;
  transform: translateY(-50%);
  font-size: 34px;
}
.v-prec {
  left: 10px;
}
.v-suiv {
  right: 10px;
}

@media (max-width: 640px) {
  .visionneuse {
    padding: 64px 12px 96px;
  }
  .v-nav {
    top: auto;
    bottom: 24px;
    transform: none;
  }
  .v-prec {
    left: calc(50% - 60px);
  }
  .v-suiv {
    right: calc(50% - 60px);
  }
}
</style>
