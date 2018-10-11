import { barraNavegacion } from "../componentes/barranavegacion/barraNavegacion.js";
import { plazas } from "../componentes/plazas/plazas.js";

const routes = [
    { path: '/admin/plazas', component: plazas },
];

const router = new VueRouter({
    routes
});


export { router };