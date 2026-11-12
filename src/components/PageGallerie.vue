<template>
  <div>
    <NavBar></NavBar>
    <h1 class="page-titre">Galerie</h1>
    <p class="page-sous-titre">
      Retrouvez les créations des membres d'Art'EFREI, album par album.
    </p>

    <ul class="albums">
      <li v-for="album in albums" :key="album.id">
        <RouterLink :to="'/gallerie/' + album.id" class="album">
          <div class="couverture" :class="{ logo: !album.couverture }">
            <img :src="album.couverture || logo" :alt="album.titre" loading="lazy" />
          </div>
          <div class="album-corps">
            <h2>{{ album.titre }}</h2>
            <p>📅 {{ album.dates }}</p>
            <span class="voir">Voir l'album →</span>
          </div>
        </RouterLink>
      </li>
    </ul>

    <p class="droits">
      Les œuvres appartiennent à leurs auteur·rice·s. Toute reproduction ou
      réutilisation est interdite sans leur accord écrit.
    </p>

    <FooTer></FooTer>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import FooTer from "./FooTer.vue";
import albums from "@/data/albums.json";

export default {
  components: {
    NavBar,
    FooTer,
  },
  data() {
    return {
      logo: require("@/assets/logo_artefrei.png"),
      manifest: null,
      albums: albums.albums.map((a) => ({ ...a, couverture: null })),
    };
  },
  async mounted() {
    try {
      const reponse = await fetch(`${process.env.BASE_URL}images/web/manifest.json`, {
        cache: "no-store",
      });
      if (!reponse.ok) return;
      const manifest = await reponse.json();
      // Couverture = première œuvre de l'album
      this.albums = albums.albums.map((a) => {
        const premiere = (manifest[a.dossier] || [])[0];
        return {
          ...a,
          couverture: premiere
            ? `${process.env.BASE_URL}images/web/${a.dossier}/${premiere}`
            : null,
        };
      });
    } catch (e) {
      // Sans manifest : cartes avec le logo.
    }
  },
};
</script>

<style lang="scss" scoped>
.albums {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  width: min(100% - 2 * var(--gouttiere), 1200px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.album {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: var(--texte);
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--ombre);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  &:hover,
  &:focus-visible {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(1, 1, 1, 0.2);
  }
}

.couverture {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  &.logo {
    background: linear-gradient(160deg, var(--cyan) 0%, #ffffff 100%);
    display: grid;
    place-items: center;
    img {
      width: 55%;
      height: auto;
      object-fit: contain;
    }
  }
}

.album-corps {
  padding: 16px 20px 20px;
  h2 {
    font-family: "BebasNeue", sans-serif;
    font-weight: normal;
    font-size: 28px;
    letter-spacing: 1px;
    margin: 0;
  }
  p {
    margin: 4px 0 12px;
    color: var(--texte-doux);
  }
}

.voir {
  font-weight: 600;
  color: var(--magenta);
}

.droits {
  max-width: 800px;
  margin: 48px auto 0;
  padding: 0 var(--gouttiere);
  font-size: 14px;
  text-align: center;
  color: var(--texte-doux);
}
</style>
