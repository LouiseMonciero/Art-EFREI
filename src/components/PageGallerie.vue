<template>
  <div>
    <NavBar></NavBar>
    <h1 class="page-titre">Galerie</h1>
    <p class="page-sous-titre">
      Retrouvez les créations des membres d'Art'EFREI, album par album.
    </p>

    <ul class="albums">
      <li v-for="album in albums" :key="album.lien">
        <RouterLink :to="album.lien" class="album">
          <div class="couverture" :class="{ logo: !album.photo }">
            <img :src="album.couverture" :alt="album.titre" loading="lazy" />
          </div>
          <div class="album-corps">
            <h2>{{ album.titre }}</h2>
            <p>📅 {{ album.dates }}</p>
            <span class="voir">{{ album.photo ? "Voir l'album →" : "Bientôt disponible" }}</span>
          </div>
        </RouterLink>
      </li>
    </ul>

    <FooTer></FooTer>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import FooTer from "./FooTer.vue";

export default {
  components: {
    NavBar,
    FooTer,
  },
  data() {
    const logo = require("@/assets/logo_artefrei.png");
    return {
      albums: [
        {
          lien: "/gallerie/artober-2023-p1",
          titre: "Art'Ober 2023 – Partie 1",
          dates: "01/10/2023 ➡ 10/10/2023",
          couverture: require("@/albums/images_albums/artober2023/ART2023_SOPH_D2.jpg"),
          photo: true,
        },
        {
          lien: "/gallerie/artober-2023-p2",
          titre: "Art'Ober 2023 – Partie 2",
          dates: "11/10/2023 ➡ 20/10/2023",
          couverture: logo,
          photo: false,
        },
        {
          lien: "/gallerie/artober-2023-p3",
          titre: "Art'Ober 2023 – Partie 3",
          dates: "21/10/2023 ➡ 31/10/2023",
          couverture: logo,
          photo: false,
        },
      ],
    };
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
</style>
