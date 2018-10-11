var barraNavegacion = Vue.component('barra-navegacion', {
    template: `
    <nav class="navbar color-barranav">
        <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Aparque</a>
        </div>
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">Inicio</a></li>
            <li><a href="#">Acerca de nosotros</a></li>
            <li><a href="#">Únete</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">Administrar <span class="caret"></span></a>
                <ul class="dropdown-menu">
                <li><router-link to="/admin/componente1">Parqueadero</router-link></li>
                <li><router-link to="/admin/componente2">Sucursal</router-link></li>
                <li><router-link to="/admin/plazas">Plazas</router-link></li>
                </ul>
            </li>
            <li><a href="#"><span class="glyphicon glyphicon-user"></span> Registrate</a></li>
            <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Inicia sesión</a></li>
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