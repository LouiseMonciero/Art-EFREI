<template>
  <footer class="footer">
    <ul class="social-icons">
      <li>
        <a href="https://www.youtube.com/channel/UCSH2SH5ZKSdmS2RLYfLOWjQ" target="_blank" rel="noopener" aria-label="YouTube">
          <img src="@/assets/youtube.png" alt="YouTube" />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/company/art-efrei" target="_blank" rel="noopener" aria-label="LinkedIn">
          <img src="@/assets/linkedin.png" alt="LinkedIn" />
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/artefrei/" target="_blank" rel="noopener" aria-label="Instagram">
          <img src="@/assets/instagram.png" alt="Instagram" />
        </a>
      </li>
      <li>
        <a href="https://discord.com/invite/KFMA3yggab" target="_blank" rel="noopener" aria-label="Discord">
          <img src="@/assets/discord.png" alt="Discord" />
        </a>
      </li>
      <li>
        <a href="mailto:artefrei@efrei.net" aria-label="E-mail">
          <img src="@/assets/email.png" alt="E-mail" />
        </a>
      </li>
    </ul>
    <p class="contact">artefrei@efrei.net</p>
    <p class="identite">
      {{ asso.nomOfficiel }} — {{ asso.formeJuridique }} — RNA
      <ChampAsso :valeur="asso.rna" /><template v-if="asso.siret">
        — SIRET <ChampAsso :valeur="asso.siret" /></template><br />
      Siège : <ChampAsso :valeur="asso.adresse.ligne1" />,
      <template v-if="asso.adresse.ligne2"><ChampAsso :valeur="asso.adresse.ligne2" />, </template>
      <ChampAsso :valeur="asso.adresse.codePostal" />
      <ChampAsso :valeur="asso.adresse.ville" />
    </p>
    <p class="liens-legaux">
      <RouterLink to="/association">L'association</RouterLink> ·
      <RouterLink to="/association#bureau">Le bureau</RouterLink> ·
      <RouterLink to="/association#mentions-legales">Mentions légales</RouterLink>
    </p>
    <p class="copyright">
      Copyright &copy; 2024 | Tous droits réservés
      <RouterLink to="/" class="marque">Art'EFREI</RouterLink>
    </p>
  </footer>
</template>

<script>
import ChampAsso from "./ChampAsso.vue";
import asso from "@/data/association";

export default {
  components: { ChampAsso },
  data() {
    return { asso };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 64px;
  background: var(--cyan);
  color: #fff;
  text-align: center;
  padding: 28px var(--gouttiere) 24px;
}

.social-icons {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  a {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    transition: transform 0.2s ease, background-color 0.2s ease;
    &:hover,
    &:focus-visible {
      transform: scale(1.1);
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  img {
    width: 40px;
    height: 40px;
  }
}

.contact {
  margin: 12px 0 0;
  font-size: 15px;
}

.identite {
  margin: 14px auto 0;
  max-width: 720px;
  font-size: 13px;
  line-height: 1.6;
}

.liens-legaux {
  margin: 8px 0 0;
  font-size: 14px;
  a {
    color: #fff;
    font-weight: 600;
  }
}

.copyright {
  margin: 6px 0 0;
  font-size: 14px;
  opacity: 0.95;
}

.marque {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}
</style>
