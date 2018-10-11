import { componente } from "../componentes/componente.js";
import { componente2 } from "../componentes/componente2.js";
import { barraNavegacion } from "../componentes/barranavegacion/barraNavegacion.js";
import { plazas } from "../componentes/plazas/plazas.js";

const routes = [
    { path: '/administracion/componente1', component: componente },
    { path: '/administracion/componente2', component: componente2 },
    { path: '/administracion/plazas', component: plazas },
];

const router = new VueRouter({
    routes
});


export { router };