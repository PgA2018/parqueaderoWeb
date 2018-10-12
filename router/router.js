import { barraNavegacion } from "../componentes/barranavegacion/barraNavegacion.js";
import { plazas } from "../componentes/plazas/plazas.js";
import { usuario } from "../componentes/usuario/usuario.js";
import { inicio } from "../componentes/inicio/inicio.js";
import { nosotros } from "../componentes/nosotros/nosotros.js";
import { unete } from "../componentes/unete/unete.js";
import { login } from "../componentes/sesion/login.js";
import { barraInferior } from "../componentes/barraInferior/barraInferior.js";
<<<<<<< HEAD
import { facturas } from "../componentes/facturas/facturas.js";
=======
import { notFound } from "../componentes/not-found/not-found.js"
import { parqueadero } from "../componentes/parqueadero/parqueadero.js";
<<<<<<< HEAD
import { sucursal } from "../componentes/sucursal/sucursal.js";
=======
>>>>>>> 1435c06064c09394e8a91bc2d8682b82d79d2a49
>>>>>>> 7e042a5cf1e4d48acb463d00889dba6788cc647c

const routes = [
    { path: '/', component: inicio },
    { path: '/inicio', component: inicio },
    { path: '/nosotros', component: nosotros },
    { path: '/unete', component: unete },
    { path: '/admin/plazas', component: plazas },
    { path: '/admin/usuario', component: usuario },
<<<<<<< HEAD
    { path: '/admin/facturas', component: facturas },
=======
    { path: '/admin/parqueadero', component: parqueadero },
    { path: '/admin/sucursal', component: sucursal },
    { path: '*', component: notFound },
>>>>>>> 1435c06064c09394e8a91bc2d8682b82d79d2a49
];

const router = new VueRouter({
    routes
});


export { router };