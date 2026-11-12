<template>
  <div>
    <header class="nav-menu" :class="{ ouvert: menuOuvert }">
      <div class="nav-content">
        <RouterLink to="/" class="logo" aria-label="Art'EFREI – Accueil">
          <img src="@/assets/logo_artefrei.png" alt="Logo Art'EFREI" class="logo-img" />
          <img src="@/assets/artefreiBlack.png" alt="Art'EFREI" class="logo-texte" />
        </RouterLink>

        <button
          class="burger"
          :class="{ actif: menuOuvert }"
          :aria-expanded="menuOuvert ? 'true' : 'false'"
          aria-controls="menu-principal"
          :aria-label="menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'"
          @click="basculerMenu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <!-- Ordinateur : panneau latéral / Tablette & téléphone : menu déroulant depuis le haut -->
      <nav id="menu-principal" class="panneau" :class="{ ouvert: menuOuvert }">
        <ul>
          <li><RouterLink to="/" class="lien" @click="fermerMenu">Accueil</RouterLink></li>
          <li><RouterLink to="/gallerie" class="lien" @click="fermerMenu">Galerie</RouterLink></li>
          <li><RouterLink to="/history" class="lien" @click="fermerMenu">Historique</RouterLink></li>
          <li>
            <RouterLink to="/paint" class="lien lien-atelier" @click="fermerMenu">
              🎨 Peins toi-même !
            </RouterLink>
          </li>
        </ul>
      </nav>
    </header>

    <div class="voile" :class="{ ouvert: menuOuvert }" @click="fermerMenu"></div>

    <!-- Réserve la hauteur de la barre fixe pour que le contenu ne passe pas dessous -->
    <div class="nav-espace" aria-hidden="true"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOuvert: false,
    };
  },
  methods: {
    basculerMenu() {
      this.menuOuvert = !this.menuOuvert;
    },
    fermerMenu() {
      this.menuOuvert = false;
    },
    surTouche(e) {
      if (e.key === "Escape") this.fermerMenu();
    },
  },
  mounted() {
    window.addEventListener("keydown", this.surTouche);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.surTouche);
  },
};
</script>

<style lang="scss" scoped>
.nav-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  background: #fff;
  box-shadow: 0 2px 14px rgba(1, 1, 1, 0.12);
}

.nav-content {
  position: relative;
  z-index: 2;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--gouttiere);
  background: #fff;
}

.nav-espace {
  height: var(--nav-h);
}

.logo {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  min-width: 0;
}

.logo-img {
  height: calc(var(--nav-h) - 20px);
  width: auto;
}

.logo-texte {
  height: 30px;
  width: auto;
}

/* Bouton burger (3 traits qui se transforment en croix) */
.burger {
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  border-radius: 10px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f2f2f2;
  }
  span {
    display: block;
    height: 3px;
    width: 100%;
    background: var(--texte);
    border-radius: 3px;
    transition: transform 0.3s ease, opacity 0.2s ease;
  }
  &.actif span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  &.actif span:nth-child(2) {
    opacity: 0;
  }
  &.actif span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
}

.panneau ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.lien {
  display: block;
  font-family: "BebasNeue", sans-serif;
  font-size: 30px;
  letter-spacing: 1px;
  color: var(--texte);
  text-decoration: none;
  padding: 10px 28px;
  border-left: 4px solid transparent;
  transition: background-color 0.2s ease, border-color 0.2s ease,
    color 0.2s ease;
  &:hover {
    background-color: #f6f6f6;
    border-left-color: var(--cyan);
  }
  &.router-link-exact-active {
    border-left-color: var(--magenta);
    color: var(--magenta);
  }
}

.lien-atelier {
  color: var(--magenta);
}

.voile {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  &.ouvert {
    opacity: 1;
    pointer-events: auto;
  }
}

/* ---------- Ordinateur : panneau qui glisse depuis le côté ---------- */
@media (min-width: 1025px) {
  .panneau {
    position: fixed;
    top: var(--nav-h);
    right: 0;
    bottom: 0;
    width: 300px;
    background: #fff;
    box-shadow: -6px 0 20px rgba(1, 1, 1, 0.12);
    padding-top: 24px;
    transform: translateX(100%);
    visibility: hidden;
    transition: transform 0.35s ease, visibility 0.35s;
    overflow-y: auto;
    &.ouvert {
      transform: translateX(0);
      visibility: visible;
    }
  }
}

/* ---------- Tablette & téléphone : menu déroulant depuis le haut ---------- */
@media (max-width: 1024px) {
  .panneau {
    max-height: 0;
    overflow: hidden;
    visibility: hidden;
    background: #fff;
    transition: max-height 0.35s ease, visibility 0.35s;
    &.ouvert {
      max-height: 340px;
      visibility: visible;
      border-top: 1px solid #eee;
    }
    ul {
      padding: 8px 0 16px;
    }
  }

  .lien {
    text-align: center;
    border-left: none;
    font-size: 26px;
    padding: 8px 20px;
    &.router-link-exact-active {
      background-color: #fdf2f8;
    }
  }
}

@media (max-width: 480px) {
  .logo-texte {
    height: 22px;
  }
  .logo {
    gap: 8px;
  }
}
</style>
