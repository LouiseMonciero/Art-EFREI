<template>
  <div>
    <NavBar></NavBar>
    <h1 class="page-titre">L'<span>association</span></h1>
    <p class="page-sous-titre">
      Qui nous sommes, qui nous représente et les informations légales.
    </p>

    <nav class="sommaire" aria-label="Sommaire">
      <a href="#mission">Mission</a>
      <a href="#bureau">Le bureau</a>
      <a href="#mentions-legales">Mentions légales</a>
    </nav>

    <!-- Mission -->
    <section id="mission" class="bloc">
      <h2 class="bloc-titre">Notre mission</h2>
      <p class="mission">{{ asso.mission }}</p>
      <h3 class="sous-titre">Objet de l'association (statuts)</h3>
      <p><ChampAsso :valeur="asso.objetStatuts" /></p>
      <h3 class="sous-titre">Nos activités</h3>
      <ul class="activites">
        <li v-for="activite in asso.activites" :key="activite">{{ activite }}</li>
      </ul>
    </section>

    <!-- Bureau -->
    <section id="bureau" class="bloc">
      <h2 class="bloc-titre">Le bureau</h2>
      <p class="mandat">Mandat <ChampAsso :valeur="asso.mandat" /></p>
      <ul class="bureau">
        <li v-for="(membre, i) in asso.bureau" :key="membre.role" class="membre">
          <img v-if="membre.photo" :src="membre.photo" :alt="membre.nom" class="avatar" />
          <span v-else class="avatar initiales" :class="'couleur-' + (i % 3)" aria-hidden="true">
            {{ initiales(membre.nom) }}
          </span>
          <strong class="nom"><ChampAsso :valeur="membre.nom" /></strong>
          <span class="role">{{ membre.role }}</span>
        </li>
      </ul>
      <p class="note">
        Envie de rejoindre l'aventure ou de contacter le bureau ? Écrivez à
        l'association : {{ asso.contact }}.
        Les anciens bureaux sont présentés dans
        <RouterLink to="/history">l'Historique</RouterLink>.
      </p>
    </section>

    <!-- Mentions légales -->
    <section id="mentions-legales" class="bloc legal">
      <h2 class="bloc-titre">Mentions légales</h2>

      <h3 class="sous-titre">Éditeur du site</h3>
      <p>
        Le site artefrei.fr est édité par {{ asso.nomOfficiel }},
        {{ asso.formeJuridique.toLowerCase() }}, enregistrée sous le numéro RNA
        <ChampAsso :valeur="asso.rna" /><template v-if="asso.siret">
          (SIRET <ChampAsso :valeur="asso.siret" />)</template>, dont le siège
        social est situé <ChampAsso :valeur="asso.adresse.ligne1" />,
        <template v-if="asso.adresse.ligne2"><ChampAsso :valeur="asso.adresse.ligne2" />, </template>
        <ChampAsso :valeur="asso.adresse.codePostal" />
        <ChampAsso :valeur="asso.adresse.ville" />. Contact : {{ asso.contact }}.
      </p>

      <h3 class="sous-titre">Directeur·rice de la publication</h3>
      <p><ChampAsso :valeur="asso.directeurPublication" /></p>

      <h3 class="sous-titre">Hébergement</h3>
      <p>
        <ChampAsso :valeur="asso.hebergeur.nom" /> —
        <ChampAsso :valeur="asso.hebergeur.adresse" /> —
        <ChampAsso :valeur="asso.hebergeur.site" />
      </p>

      <h3 class="sous-titre">Propriété intellectuelle</h3>
      <p>
        Les œuvres présentées dans la galerie restent la propriété de leurs
        auteurs respectifs et ne peuvent être reproduites sans leur accord. Les
        autres contenus du site (textes, logos, photos) appartiennent à
        {{ asso.nomOfficiel }}.
      </p>

      <h3 class="sous-titre">Données personnelles et cookies</h3>
      <p>
        Ce site ne dépose aucun cookie et ne collecte aucune donnée personnelle
        de ses visiteurs. Le nombre d'adhérents affiché sur l'accueil est un
        total anonyme. Pour toute question, contactez-nous à
        {{ asso.contact }}.
      </p>
    </section>

    <FooTer></FooTer>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import FooTer from "./FooTer.vue";
import ChampAsso from "./ChampAsso.vue";
import asso from "@/data/association";

export default {
  components: { NavBar, FooTer, ChampAsso },
  data() {
    return { asso };
  },
  methods: {
    initiales(nom) {
      if (nom.startsWith("À COMPLÉTER")) return "?";
      return nom
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((mot) => mot[0].toUpperCase())
        .join("");
    },
  },
};
</script>

<style lang="scss" scoped>
.sommaire {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 12px;
  margin: 0 var(--gouttiere);
  a {
    text-decoration: none;
    color: var(--texte);
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 999px;
    background: #f2f2f2;
    transition: background-color 0.2s ease, color 0.2s ease;
    &:hover {
      background: var(--magenta);
      color: #fff;
    }
  }
}

.bloc {
  width: min(100% - 2 * var(--gouttiere), 1000px);
  margin: 56px auto 0;
  scroll-margin-top: calc(var(--nav-h) + 16px);
}

.bloc-titre {
  font-family: "Amarillo", sans-serif;
  font-weight: normal;
  font-size: clamp(28px, 4vw, 38px);
  margin: 0 0 20px;
}

.sous-titre {
  font-family: "BebasNeue", sans-serif;
  font-weight: normal;
  font-size: 24px;
  letter-spacing: 1px;
  margin: 24px 0 6px;
}

/* Fiche d'identité */
.fiche {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
  > div {
    background: #fff;
    border-radius: 16px;
    padding: 14px 18px;
    box-shadow: var(--ombre);
    border-left: 4px solid var(--cyan);
  }
  dt {
    font-family: "BebasNeue", sans-serif;
    font-size: 18px;
    letter-spacing: 1px;
    color: var(--texte-doux);
  }
  dd {
    margin: 2px 0 0;
    font-weight: 600;
  }
  address {
    font-style: normal;
  }
}

/* Mission */
.mission {
  font-size: clamp(18px, 2vw, 22px);
  line-height: 1.6;
  margin: 0;
  padding: 18px 22px;
  border-radius: 16px;
  background: #fffbcc;
  border-left: 4px solid var(--jaune);
}

.activites {
  margin: 0;
  padding-left: 20px;
  li {
    margin: 4px 0;
  }
}

/* Bureau */
.mandat {
  margin: -8px 0 20px;
  color: var(--texte-doux);
}

.bureau {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.membre {
  background: #fff;
  border-radius: 20px;
  box-shadow: var(--ombre);
  padding: 24px 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
}

.initiales {
  display: grid;
  place-items: center;
  font-family: "BebasNeue", sans-serif;
  font-size: 40px;
  color: #fff;
  &.couleur-0 { background: var(--magenta); }
  &.couleur-1 { background: var(--cyan); }
  &.couleur-2 { background: var(--jaune); color: var(--texte); }
}

.nom {
  font-size: 17px;
}

.role {
  font-family: "BebasNeue", sans-serif;
  font-size: 20px;
  letter-spacing: 1px;
  color: var(--magenta);
}

.note {
  margin-top: 20px;
  color: var(--texte-doux);
  a {
    color: var(--magenta);
  }
}

.legal p {
  margin: 0;
  color: var(--texte-doux);
}
</style>
