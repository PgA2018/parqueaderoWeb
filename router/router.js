import { barraNavegacion } from "../componentes/barranavegacion/barraNavegacion.js";
import { plazas } from "../componentes/plazas/plazas.js";
import { usuario } from "../componentes/usuario/usuario.js";
import { inicio } from "../componentes/inicio/inicio.js";
import { nosotros } from "../componentes/nosotros/nosotros.js";
import { unete } from "../componentes/unete/unete.js";
import { login } from "../componentes/sesion/login.js";
import { barraInferior } from "../componentes/barraInferior/barraInferior.js";

const routes = [
    { path: '/', component: inicio },
    { path: '/inicio', component: inicio },
    { path: '/nosotros', component: nosotros },
    { path: '/unete', component: unete },
    { path: '/admin/plazas', component: plazas },
    { path: '/admin/usuario', component: usuario },
];

const router = new VueRouter({
    routes
});


export { router };