<template>
  <GalerieAlbum
    titre="Art'Ober 2023 – Partie 1"
    sous-titre="Du 01/10/2023 au 10/10/2023"
    :jours="jours"
  />
</template>

<script>
import GalerieAlbum from "@/components/GalerieAlbum.vue";

const img = (fichier) => require("./images_albums/artober2023/" + fichier);

export default {
  components: { GalerieAlbum },
  data() {
    return {
      jours: [
        {
          nom: "Mexique & Folklore étranger",
          oeuvres: [
            { image: img("ART2023_THEO_D1.jpg"), artiste: "blackrabbit974" },
            { image: img("ART2023_NEBS_D1.png"), artiste: "nebsu." },
            { image: img("ART2023_THMS_D1.jpg"), artiste: "vamlack" },
            { image: img("ART2023_LOSE_D1.jpg"), artiste: "louise2585" },
            { image: img("ART2023_ADRI_D1.jpg"), artiste: "zeobuilder10" },
            { image: img("ART2023_ANDR_D1.jpg"), artiste: "assyah" },
          ],
        },
        {
          nom: "Citrouille",
          oeuvres: [
            { image: img("ART2023_SOPH_D2.jpg"), artiste: "sosomi22" },
            { image: img("ART2023_MATH_D2.jpg"), artiste: "___zombie___" },
            { image: img("ART2023_AMAN_D2.jpg"), artiste: "amandine3068" },
            { image: img("ART2023_SEA_D2.png"), artiste: "s.e_a" },
            { image: img("ART2023_KAIS_D2.jpg"), artiste: "_kaishi_" },
            { image: img("ART2023_PIER_D2.jpg"), artiste: "duolinova" },
          ],
        },
        {
          nom: "Sorcellerie",
          oeuvres: [
            { image: img("ART2023_HCTR_D3.jpg"), artiste: "relo.pataloo" },
            { image: img("ART2023_SAPH_D3.png"), artiste: "saphir_8565" },
            { image: img("ART2023_ADRI_D3.jpg"), artiste: "zeobuilder10" },
            { image: img("ART2023_PIER_D3.jpg"), artiste: "duolinova" },
            { image: img("ART2023_THMS_D3.jpg"), artiste: "vamlack" },
            { image: img("ART2023_KRME_D3.jpg"), artiste: "ikrome" },
          ],
        },
        {
          nom: "Temps",
          oeuvres: [
            { image: img("ART2023_LIPS_D4.jpg"), artiste: "lipsem1651" },
            { image: img("ART2023_KAIS_D4.jpg"), artiste: "_kaishi_" },
            { image: img("ART2023_AMAN_D4.jpg"), artiste: "amandine3068" },
            { image: img("ART2023_MATH_D4.jpg"), artiste: "___zombie___" },
            { image: img("ART2023_THEO_D4.jpg"), artiste: "blackrabbit974" },
            { image: img("ART2023_ADRI_D4.jpg"), artiste: "zeobuilder10" },
          ],
        },
        {
          nom: "Vampire",
          oeuvres: [
            { image: img("ART2023_ALIN_D5.jpg"), artiste: "__patate" },
            { image: img("ART2023_LOUI_D5.jpg"), artiste: "szlouis" },
            { image: img("ART2023_NEBS_D5.jpg"), artiste: "nebsu." },
            { image: img("ART2023_SEA_D5.png"), artiste: "s.e_a" },
            { image: img("ART2023_PIER_D5.jpg"), artiste: "duolinova" },
            { image: img("ART2023_THEO_D5.jpg"), artiste: "blackrabbit974" },
          ],
        },
        {
          nom: "Esprits",
          oeuvres: [
            { image: img("ART2023_PATA_D6.jpg"), artiste: "_patatra" },
            { image: img("ART2023_AMAN_D6.jpg"), artiste: "amandine3068" },
            { image: img("ART2023_HCTR_D6.jpg"), artiste: "relo.pataloo" },
            { image: img("ART2023_LOSE_D6.jpg"), artiste: "louise2585" },
            { image: img("ART2023_KRME_D6.jpg"), artiste: "ikrome" },
            { image: img("ART2023_LIPS_D6.jpg"), artiste: "lipsem1651" },
          ],
        },
        {
          nom: "Insectes",
          oeuvres: [
            { image: img("ART2023_MORA_D7.jpg"), artiste: "morangec" },
            { image: img("ART2023_NEBS_D7.jpg"), artiste: "nebsu." },
            { image: img("ART2023_SOPH_D7.jpg"), artiste: "sosomi22" },
            { image: img("ART2023_AMAN_D7.jpg"), artiste: "amandine3068" },
            { image: img("ART2023_CLEM_D7.webp"), artiste: "chelseannamonroll" },
            { image: img("ART2023_ADRI_D7.jpg"), artiste: "zeobuilder10" },
          ],
        },
        {
          nom: "Cinéma",
          oeuvres: [
            { image: img("ART2023_SAPH_D8.png"), artiste: "saphir_8565" },
            { image: img("ART2023_MORA_D8.jpg"), artiste: "morangec" },
            { image: img("ART2023_SOPH_D8.jpg"), artiste: "sosomi22" },
            { image: img("ART2023_PIER_D8.jpg"), artiste: "duolinova" },
            { image: img("ART2023_HCTR_D8.jpg"), artiste: "relo.pataloo" },
            { image: img("ART2023_YASS_D8.jpg"), artiste: "yassten" },
          ],
        },
        {
          nom: "Sanguin",
          oeuvres: [
            { image: img("ART2023_SAPH_D9.png"), artiste: "saphir_8565" },
            { image: img("ART2023_LOUI_D9.png"), artiste: "szlouis" },
            { image: img("ART2023_SEA_D9.png"), artiste: "s.e_a" },
            { image: img("ART2023_THEO_D9.jpg"), artiste: "blackrabbit974" },
            { image: img("ART2023_LIPS_D9.jpg"), artiste: "lipsem1651" },
            { image: img("ART2023_PIER_D9.jpg"), artiste: "duolinova" },
          ],
        },
        {
          nom: "Monstre",
          oeuvres: [
            { image: img("ART2023_TELU_D10.jpg"), artiste: "telulum" },
            { image: img("ART2023_PATA_D10.gif"), artiste: "_patatra" },
            { image: img("ART2023_MARI_D10.png"), artiste: "nextsmile" },
            { image: img("ART2023_SEA_D10.png"), artiste: "s.e_a" },
            { image: img("ART2023_ADRI_D10.jpg"), artiste: "zeobuilder10" },
            { image: img("ART2023_KAIS_D10.jpg"), artiste: "_kaishi_" },
          ],
        },
      ],
    };
  },
};
</script>
