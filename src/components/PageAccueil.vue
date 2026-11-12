<template>
  <div class="app">
    <NavBar></NavBar>

    <!-- En-tête : formes animées + titre -->
    <section class="hero">
      <div
        id="wrapper"
        :data-configuration="formes.configuration"
        :data-roundness="formes.roundness"
        aria-hidden="true"
      >
        <div class="shape" v-for="n in 7" :key="n"></div>
      </div>
      <h1 class="title">
        Association d'<span>arts plastiques</span> d'EFREI Paris
      </h1>
    </section>

    <!-- Actualités -->
    <section
      class="slider"
      aria-label="Actualités"
      @mouseenter="arreterDefilement"
      @mouseleave="lancerDefilement"
    >
      <article
        v-for="(slide, i) in slides"
        :key="slide.titre"
        class="slide"
        :class="{ active: i === slideActive }"
        :aria-hidden="i === slideActive ? 'false' : 'true'"
      >
        <img :src="slide.image" :alt="slide.titre" />
        <div class="info">
          <p class="date">📅 {{ slide.date }}</p>
          <h2>{{ slide.titre }}</h2>
          <p>{{ slide.texte }}</p>
        </div>
      </article>

      <button class="nav-btn prev-btn" aria-label="Actualité précédente" @click="precedent">
        <img src="@/assets/chevron-gauche.png" alt="" />
      </button>
      <button class="nav-btn next-btn" aria-label="Actualité suivante" @click="suivant">
        <img src="@/assets/chevron-droite.png" alt="" />
      </button>

      <div class="navigation-visibility">
        <button
          v-for="(slide, i) in slides"
          :key="'pt' + i"
          class="slide-icon"
          :class="{ active: i === slideActive }"
          :aria-label="'Afficher : ' + slide.titre"
          @click="allerA(i)"
        ></button>
      </div>
    </section>

    <!-- Mission -->
    <section class="bloc">
      <h2 class="bloc-titre">Notre mission</h2>
      <p class="mission">{{ asso.mission }}</p>
      <RouterLink to="/association" class="lien-asso">
        En savoir plus sur l'association →
      </RouterLink>
    </section>

    <!-- Présentation -->
    <section class="bloc">
      <h2 class="bloc-titre">Qui sommes-nous ?</h2>
      <div class="presentation">
        <p>
          Découvrez une toute nouvelle expérience artistique au cœur d'EFREI
          Paris avec Art'EFREI, l'association d'arts plastiques fraîchement
          créée.
        </p>
        <p>
          <mark>Que vous soyez débutant ou étudiant expérimenté,</mark> notre
          association vous ouvre ses portes pour explorer votre créativité.
          Depuis sa fondation, Art'EFREI propose une variété de séances
          hebdomadaires régulières, mettant en avant deux grands axes : l'Art
          du Papier, incluant l'origami et le papercraft, ainsi que le Dessin,
          qu'il soit traditionnel ou numérique.
        </p>
        <p>
          Dans le contexte difficile de la crise sanitaire du Covid-19, le
          campus a connu une pénurie d'activités artistiques. C'est dans ce
          cadre que nous avons lancé Art'EFREI pour répondre à la demande
          croissante des étudiants. Notre objectif principal est de leur offrir
          un espace d'expression artistique et de développement personnel.
          <mark>Parcourez notre site pour découvrir nos événements à venir et
            nos projets artistiques.</mark>
        </p>
      </div>
    </section>

    <!-- Chiffres clés -->
    <section class="bloc">
      <h2 class="bloc-titre">En quelques chiffres...</h2>
      <ul class="chiffres">
        <li class="chiffre">
          <strong>{{ anneesDepuisMars2022 }}</strong>
          <span><time datetime="2022-03-01">Mandats</time> d'ancienneté</span>
        </li>
        <li class="chiffre">
          <strong>{{ nombreAdherents }}</strong>
          <span>adhérents</span>
        </li>
        <li class="chiffre">
          <strong>+10</strong>
          <span>événements associatifs</span>
        </li>
      </ul>
    </section>

    <!-- Réseaux -->
    <section class="bloc">
      <h2 class="bloc-titre">Rejoignez-nous !</h2>
      <div class="reseaux">
        <article class="reseau">
          <img src="@/assets/insta_test.png" alt="" class="reseau-banniere" />
          <div class="reseau-corps">
            <h3>Instagram</h3>
            <p>
              Retrouvez les créations des membres d'Art'EFREI lors des
              différents événements de l'année, <mark>notamment l'Art'Ober !</mark>
              Vous serez aussi tenus au courant des prochains événements.
            </p>
            <a
              class="reseau-btn"
              href="https://www.instagram.com/artefrei/"
              target="_blank"
              rel="noopener"
              >Suivre @artefrei</a
            >
          </div>
        </article>
        <article class="reseau">
          <img src="@/assets/discord_test.png" alt="" class="reseau-banniere" />
          <div class="reseau-corps">
            <h3>Discord</h3>
            <p>
              Discutez avec les membres d'Art'EFREI ! Plein de salons sont à
              disposition pour partager vos œuvres,
              <mark>échanger des astuces de création</mark> ou proposer des idées
              pour l'avenir de l'association.
            </p>
            <a
              class="reseau-btn"
              href="https://discord.com/invite/KFMA3yggab"
              target="_blank"
              rel="noopener"
              >Rejoindre le serveur</a
            >
          </div>
        </article>
      </div>
    </section>

    <FooTer></FooTer>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import FooTer from "./FooTer.vue";
import asso from "@/data/association";

const COMBINAISONS = [
  { configuration: 1, roundness: 1 },
  { configuration: 1, roundness: 2 },
  { configuration: 1, roundness: 4 },
  { configuration: 2, roundness: 2 },
  { configuration: 2, roundness: 3 },
  { configuration: 3, roundness: 3 },
];

export default {
  components: {
    NavBar,
    FooTer,
  },
  data() {
    return {
      formes: COMBINAISONS[0],
      indexFormes: 0,
      slideActive: 0,
      minuteurSlider: null,
      minuteurFormes: null,
      // Nombre d'adhérents HelloAsso (null tant qu'il n'est pas chargé)
      adherents: null,
      asso,
      slides: [
        {
          image: require("@/assets/SFA.jpg"),
          date: "19/03/2024",
          titre: "Art'EFREI au SFA 2024",
          texte:
            "On dit bravo à tous les membres d'Art'EFREI qui ont contribué à la création des décors du Spectacle de Fin d'Année ! 👏",
        },
        {
          image: require("@/assets/IntDay.jpg"),
          date: "14/03/2024",
          titre: "Art'EFREI à la Journée Internationale",
          texte:
            "Toujours pas assez d'origamis créés cette année, et ce n'est pas Morgane qui dira le contraire ! 🥳",
        },
        {
          image: require("@/assets/NDE.png"),
          date: "09/12/2023",
          titre: "Art'EFREI au Noël des Enfants",
          texte:
            "Au programme : construction de sapins de Noël avec des bâtons en bois et atelier coloriage ! 🤩",
        },
        {
          image: require("@/assets/SDA.jpg"),
          date: "14/11/2023",
          titre: "Art'EFREI x BDA",
          texte:
            "Art'EFREI participe à la Semaine Des Arts. N'hésitez pas à venir nous voir ! 😎",
        },
        {
          image: require("@/assets/JPO.jpeg"),
          date: "21/09/2023",
          titre: "Art'EFREI à la Journée Associative",
          texte:
            "Merci à tous ceux qui sont passés faire un dessin ! La fresque pour le WEI a été bien remplie ! 🤣",
        },
      ],
    };
  },
  methods: {
    allerA(i) {
      const n = this.slides.length;
      this.slideActive = (i + n) % n;
    },
    suivant() {
      this.allerA(this.slideActive + 1);
    },
    precedent() {
      this.allerA(this.slideActive - 1);
    },
    lancerDefilement() {
      this.arreterDefilement();
      this.minuteurSlider = setInterval(this.suivant, 5000);
    },
    arreterDefilement() {
      clearInterval(this.minuteurSlider);
    },
    async chargerAdherents() {
      // Fichier généré par scripts/helloasso-adherents.js (les identifiants
      // HelloAsso ne sont jamais exposés au navigateur).
      try {
        const reponse = await fetch(
          `${process.env.BASE_URL}adherents.json`,
          { cache: "no-store" }
        );
        if (!reponse.ok) return;
        const { nombre } = await reponse.json();
        if (Number.isInteger(nombre) && nombre > 0) this.adherents = nombre;
      } catch (e) {
        // On garde la valeur par défaut.
      }
    },
  },
  computed: {
    nombreAdherents() {
      return this.adherents === null
        ? process.env.VUE_APP_ADHERENTS_DEFAUT || "+50"
        : this.adherents;
    },
    anneesDepuisMars2022() {
      const debut = new Date("2022-03-01T00:00:00");
      const maintenant = new Date();
      let annees = maintenant.getFullYear() - debut.getFullYear();

      if (
        maintenant.getMonth() < debut.getMonth() ||
        (maintenant.getMonth() === debut.getMonth() &&
          maintenant.getDate() < debut.getDate())
      ) {
        annees--;
      }

      return Math.max(0, annees);
    },
  },
  mounted() {
    this.chargerAdherents();
    this.lancerDefilement();
    this.minuteurFormes = setInterval(() => {
      let suivant = this.indexFormes;
      while (suivant === this.indexFormes) {
        suivant = Math.floor(Math.random() * COMBINAISONS.length);
      }
      this.indexFormes = suivant;
      this.formes = COMBINAISONS[suivant];
    }, 3000);
  },
  beforeUnmount() {
    this.arreterDefilement();
    clearInterval(this.minuteurFormes);
  },
};
</script>

<style lang="scss" scoped>
mark {
  background-color: var(--jaune);
  color: inherit;
  padding: 0 2px;
}

/* ---------- En-tête ---------- */
.hero {
  padding: 32px var(--gouttiere) 8px;
  text-align: center;
}

.title {
  font-family: "BebasNeue", sans-serif;
  font-weight: normal;
  font-size: clamp(30px, 5vw, 52px);
  line-height: 1.15;
  margin: 28px 0 0;
  span {
    background-color: var(--jaune);
    padding: 0 6px;
  }
}

#wrapper {
  aspect-ratio: 1.618;
  width: min(100%, 560px);
  position: relative;
  margin: 0 auto;
}

#wrapper > .shape {
  height: 30%;
  width: 30%;
  position: absolute;
  transition: left, top, height, width, border-radius;
  transition-duration: 750ms;
  transition-timing-function: ease-in-out;
}

#wrapper > .shape:nth-child(1),
#wrapper > .shape:nth-child(5) {
  background-color: var(--magenta);
}
#wrapper > .shape:nth-child(2),
#wrapper > .shape:nth-child(6) {
  background-color: var(--jaune);
}
#wrapper > .shape:nth-child(3),
#wrapper > .shape:nth-child(4) {
  background-color: var(--cyan);
}
#wrapper > .shape:nth-child(7) {
  background-color: rgba(255, 255, 255, 0.05);
}

#wrapper[data-configuration="1"] {
  > .shape:nth-child(1) { left: 0%; top: 0%; height: 50%; width: 20%; }
  > .shape:nth-child(2) { left: 20%; top: 0%; height: 50%; width: 30%; }
  > .shape:nth-child(3) { left: 50%; top: 0%; height: 100%; width: 50%; }
  > .shape:nth-child(4) { left: 0%; top: 50%; height: 50%; width: 30%; }
  > .shape:nth-child(5) { left: 30%; top: 50%; height: 50%; width: 20%; }
  > .shape:nth-child(6) { left: 70%; top: 50%; height: 50%; width: 30%; }
  > .shape:nth-child(7) { left: 85%; top: 75%; height: 25%; width: 15%; }
}

#wrapper[data-configuration="2"] {
  > .shape:nth-child(1) { left: 25%; top: 20%; height: 80%; width: 15%; }
  > .shape:nth-child(2) { left: 40%; top: 20%; height: 50%; width: 10%; }
  > .shape:nth-child(3) { left: 50%; top: 0%; height: 100%; width: 25%; }
  > .shape:nth-child(4) { left: 0%; top: 0%; height: 50%; width: 10%; }
  > .shape:nth-child(5) { left: 10%; top: 0%; height: 70%; width: 15%; }
  > .shape:nth-child(6) { left: 75%; top: 10%; height: 80%; width: 15%; }
  > .shape:nth-child(7) { left: 90%; top: 40%; height: 60%; width: 10%; }
}

#wrapper[data-configuration="3"] {
  > .shape:nth-child(1) { left: 0%; top: 16.5%; height: 32%; width: 20%; }
  > .shape:nth-child(2) { left: 20%; top: 2.7%; height: 55%; width: 34%; }
  > .shape:nth-child(3) { left: 38%; top: 0%; height: 100%; width: 62%; }
  > .shape:nth-child(4) { left: 0%; top: 47.3%; height: 55%; width: 34%; }
  > .shape:nth-child(5) { left: 34%; top: 56.4%; height: 32%; width: 20%; }
  > .shape:nth-child(6) { left: 66%; top: 45%; height: 55%; width: 34%; }
  > .shape:nth-child(7) { left: 80%; top: 68%; height: 32%; width: 20%; }
}

#wrapper[data-roundness="1"] > .shape { border-radius: 6rem; }
#wrapper[data-roundness="2"] > .shape { border-radius: 0; }
#wrapper[data-roundness="3"] > .shape { border-radius: 30rem; }
#wrapper[data-roundness="4"] {
  > .shape:nth-child(1) { border-bottom-left-radius: 10rem; }
  > .shape:nth-child(2) { border-radius: 20rem; }
  > .shape:nth-child(3) { border-top-right-radius: 12rem; }
  > .shape:nth-child(4) { border-top-right-radius: 10rem; border-bottom-right-radius: 10rem; }
  > .shape:nth-child(5) { border-bottom-left-radius: 10rem; }
  > .shape:nth-child(6) { border-top-left-radius: 16rem; }
  > .shape:nth-child(7) { border-top-left-radius: 10rem; }
}

/* ---------- Slider d'actualités ---------- */
.slider {
  position: relative;
  display: grid;
  /* Largeur limitée par l'écran ET par sa hauteur : le carrousel (16/9)
     ne dépasse jamais ~70 % de la hauteur visible, même sur très grand écran */
  width: min(
    100% - 2 * var(--gouttiere),
    1100px,
    (100vh - var(--nav-h)) * 0.7 * 16 / 9
  );
  margin: 40px auto 0;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--ombre);
  background: #fff;
}

/* Toutes les diapositives occupent la même cellule : la hauteur suit la plus grande */
.slide {
  grid-area: 1 / 1;
  position: relative;
  aspect-ratio: 16 / 9;
  min-height: 340px;
  clip-path: circle(0% at 0 50%);
  transition: clip-path 1.5s ease;
  z-index: 0;
  &.active {
    clip-path: circle(150% at 0 50%);
    z-index: 1;
  }
  > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.info {
  position: absolute;
  left: 24px;
  bottom: 48px;
  max-width: min(480px, calc(100% - 48px));
  background: rgba(255, 255, 255, 0.92);
  padding: 16px 20px;
  border-radius: 16px;
  box-shadow: var(--ombre);
  h2 {
    font-size: clamp(18px, 2vw, 24px);
    line-height: 1.25;
    margin: 4px 0 6px;
  }
  p {
    margin: 0;
    font-size: clamp(14px, 1.4vw, 17px);
  }
  .date {
    font-family: "BebasNeue", sans-serif;
    font-size: 17px;
    letter-spacing: 1px;
    color: var(--texte-doux);
  }
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  border: none;
  cursor: pointer;
  background-color: var(--jaune);
  padding: 12px 10px;
  display: grid;
  place-items: center;
  opacity: 0.85;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
  img {
    width: 22px;
    height: 22px;
  }
}

.prev-btn {
  left: 0;
  border-radius: 0 16px 16px 0;
}

.next-btn {
  right: 0;
  border-radius: 16px 0 0 16px;
}

.navigation-visibility {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 16px;
  z-index: 3;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.slide-icon {
  border: none;
  cursor: pointer;
  padding: 0;
  background: rgba(0, 0, 0, 0.6);
  width: 22px;
  height: 10px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  &.active {
    background: var(--magenta);
  }
}

/* ---------- Blocs de contenu ---------- */
.bloc {
  width: min(100% - 2 * var(--gouttiere), 1100px);
  margin: 64px auto 0;
}

.bloc-titre {
  font-family: "Amarillo", sans-serif;
  font-weight: normal;
  font-size: clamp(28px, 4vw, 40px);
  margin: 0 0 24px;
}

.presentation {
  font-size: clamp(16px, 1.6vw, 19px);
  line-height: 1.7;
  max-width: 75ch;
  p {
    margin: 0 0 16px;
  }
}

/* Mission */
.mission {
  font-size: clamp(18px, 2vw, 22px);
  line-height: 1.6;
  max-width: 75ch;
  margin: 0;
  padding: 18px 22px;
  border-radius: 16px;
  background: #fffbcc;
  border-left: 4px solid var(--jaune);
}

.lien-asso {
  display: inline-block;
  margin-top: 14px;
  font-weight: 600;
  color: var(--magenta);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

/* Chiffres clés */
.chiffres {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.chiffre {
  background: linear-gradient(160deg, var(--cyan) 0%, #8fdcf7 100%);
  border-radius: 20px;
  padding: 28px 24px;
  box-shadow: var(--ombre);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 14px;
  strong {
    font-family: "Amarillo", sans-serif;
    font-weight: normal;
    font-size: clamp(44px, 6vw, 64px);
    line-height: 1;
    color: #fff;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  span {
    font-family: "BebasNeue", sans-serif;
    font-size: 24px;
    letter-spacing: 1px;
    background: #fff;
    padding: 2px 12px;
    border-radius: 20px;
  }
}

/* Réseaux sociaux */
.reseaux {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.reseau {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--ombre);
  transition: transform 0.25s ease;
  &:hover {
    transform: translateY(-4px);
  }
}

.reseau-banniere {
  display: block;
  width: 100%;
  aspect-ratio: 2 / 1;
  height: auto;
  max-height: 180px;
  object-fit: cover;
}

.reseau-corps {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 24px 24px;
  h3 {
    font-family: "BebasNeue", sans-serif;
    font-weight: normal;
    font-size: 32px;
    letter-spacing: 1px;
    color: var(--magenta);
    margin: 0 0 8px;
  }
  p {
    flex: 1;
    margin: 0 0 20px;
    font-size: 16px;
    line-height: 1.65;
    color: var(--texte-doux);
  }
}

.reseau-btn {
  align-self: flex-start;
  background: var(--magenta);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 999px;
  transition: background-color 0.2s ease;
  &:hover {
    background: #c40074;
  }
}

/* ---------- Tablette & téléphone ---------- */
@media (max-width: 640px) {
  .slider {
    width: 100%;
    border-radius: 0;
  }

  /* L'image passe au-dessus, le texte en dessous : plus lisible */
  .slide {
    height: auto;
    aspect-ratio: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    > img {
      position: static;
      height: 260px;
    }
  }

  .info {
    position: static;
    max-width: none;
    border-radius: 0;
    box-shadow: none;
    padding: 16px var(--gouttiere) 44px;
    background: #fff;
  }

  .nav-btn {
    top: 130px;
  }

  .navigation-visibility {
    bottom: 14px;
  }

  .reseau-btn {
    align-self: stretch;
    text-align: center;
  }
}
</style>
