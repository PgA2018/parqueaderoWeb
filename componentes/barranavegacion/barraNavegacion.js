var barraNavegacion = Vue.component('barra-navegacion', {
    template: `
    <nav class="navbar color-barranav">
    
        <login></login>

        <div class="container-fluid">
        <div class="navbar-header">
            <router-link to="/" class="navbar-brand">Aparque</router-link>
        </div>
        <ul class="nav navbar-nav">
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/nosotros">Nosotros</router-link></li>
            <li><router-link to="/unete">Únete</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">Administrar <span class="caret"></span></a>
                <ul class="dropdown-menu">
                <li><router-link to="/admin/usuario">Usuario</router-link></li>
                <li><router-link to="/admin/parqueadero">Parqueadero</router-link></li>
                <li><router-link to="/admin/sucursal">Sucursal</router-link></li>
                <li><router-link to="/admin/plazas">Plazas</router-link></li>
                </ul>
            </li>
            <li><a href="#"><span class="glyphicon glyphicon-user"></span> Registrate</a></li>
            <li data-toggle="modal" data-target="#myModal"><a href="#"><span class="glyphicon glyphicon-log-in"></span> Inicia sesión</a></li>
        </ul>
        </div>
    </nav>
    `,
    data: function() {
        return {

        }
    }
})

export { barraNavegacion }