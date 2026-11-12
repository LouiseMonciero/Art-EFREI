<template>
  <div :class="{ 'fade-in': isPageLoaded }">
    <router-view />
    <button
      v-show="showBackToTop"
      id="backtotop"
      aria-label="Retour en haut de la page"
      @click="scrollToTop"
    >
      <img src="@/assets/arrow.png" alt="" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPageLoaded: false,
      showBackToTop: false,
    };
  },
  mounted() {
    this.isPageLoaded = true;
    window.addEventListener("scroll", this.onScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      this.showBackToTop = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
  },
  watch: {
    $route() {
      this.isPageLoaded = false;
      setTimeout(() => {
        this.isPageLoaded = true;
      }, 20);
    },
  },
};
</script>

<!-- Styles globaux (non scopés) partagés par toutes les pages -->
<style lang="scss">
@font-face {
  font-family: "BebasNeue";
  src: url("@/assets/BebasNeue-Regular.woff2") format("woff2"),
    url("@/assets/BebasNeue-Regular.ttf") format("truetype");
  font-display: swap;
}

@font-face {
  font-family: "Amarillo";
  src: url("@/assets/Amarillo.ttf") format("truetype");
  font-display: swap;
}

:root {
  --cyan: #00adef;
  --magenta: #ec008b;
  --jaune: #fef200;
  --texte: #1d1d1f;
  --texte-doux: #4a4a4f;
  --ombre: 0 5px 20px rgba(1, 1, 1, 0.15);
  --nav-h: 76px;
  --gouttiere: clamp(16px, 4vw, 48px);
}

@media (max-width: 1024px) {
  :root {
    --nav-h: 64px;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto,
    sans-serif;
  color: var(--texte);
  background: #fff;
  line-height: 1.6;
  overflow-x: hidden;
}

img {
  max-width: 100%;
}

/* Titre de page commun */
.page-titre {
  font-family: "BebasNeue", sans-serif;
  font-size: clamp(32px, 6vw, 56px);
  line-height: 1.1;
  text-align: center;
  margin: 40px var(--gouttiere) 8px;
  letter-spacing: 1px;
  span {
    background-color: var(--jaune);
    padding: 0 6px;
  }
}

.page-sous-titre {
  font-family: "Inter", sans-serif;
  text-align: center;
  color: var(--texte-doux);
  margin: 0 var(--gouttiere) 32px;
  font-size: clamp(15px, 2vw, 18px);
}
</style>

<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

#backtotop {
  position: fixed;
  bottom: 24px;
  right: 20px;
  z-index: 998;
  background-color: var(--cyan);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  box-shadow: var(--ombre);
  transition: background-color 0.2s ease;
}

#backtotop img {
  width: 20px;
  height: 20px;
}

#backtotop:hover {
  background-color: var(--magenta);
}
</style>
