import { createWebHistory, createRouter } from "vue-router"
import PageAccueil from "@/components/PageAccueil.vue"
import PageHistorique from "@/components/PageHistorique.vue"
import PageGallerie from "@/components/PageGallerie.vue"
import PageError404 from "@/components/PageError404.vue"
import PageLoading from "@/components/PageLoading.vue"
import PagePaint from "@/components/PagePaint.vue"
import PageAssociation from "@/components/PageAssociation.vue"

import PageArtober2023_P1 from "@/albums/PageArtober2023_P1.vue"
import PageArtober2023_P2 from "@/albums/PageArtober2023_P2.vue"
import PageArtober2023_P3 from "@/albums/PageArtober2023_P3.vue"

const routes = [
  {
    path: "/",
    name: "accueil",
    component: PageAccueil,
  },
  {
    path: "/history",
    name: "history",
    component: PageHistorique,
  },
  {
    path: "/association",
    name: "association",
    component: PageAssociation,
  },
  {
    path: '/:catchAll(.*)*',
    name: "error_404",
    component: PageError404,
  },
  {
    path: '/paint',
    name: "paint",
    component: PagePaint,
  },
  {
    path: '/loading',
    name: "loading",
    component: PageLoading,
  },
  {
    path: '/gallerie',
    name: "gallerie",
    component: PageGallerie,
  },
  {
    path: '/gallerie/artober-2023-p1',
    name: "artober-2023-p1",
    component: PageArtober2023_P1,
  },
  {
    path: '/gallerie/artober-2023-p2',
    name: "artober-2023-p2",
    component: PageArtober2023_P2,
  },
  {
    path: '/gallerie/artober-2023-p3',
    name: "artober-2023-p3",
    component: PageArtober2023_P3,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Ancres (#bureau, #mentions-legales...) sous la barre de navigation fixe
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 90, behavior: "smooth" }
    return { top: 0 }
  },
})

export default router