import { barraNavegacion } from "../componentes/barranavegacion/barraNavegacion.js";
import { plazas } from "../componentes/plazas/plazas.js";
import { usuario } from "../componentes/usuario/usuario.js";

const routes = [
    { path: '/admin/plazas', component: plazas },
    { path: '/admin/usuario', component: usuario },
];

const router = new VueRouter({
    routes
});


export { router };