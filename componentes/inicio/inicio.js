var inicio = Vue.component('inicio', {
    template: `
    <div class="container text-center">
        <div class="row">
            <div class="col-lg-12">
                <img class="img-responsive" src="./img/parqueadero-inicio.jpg">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="col-sm-4">
                    <hr>
                    <h3>Administra tu parqueadero</h3>
                    <p>Administra la información correspondiente a tu </p>
                    <p>parqueadero, sucursales</p>
                </div>
                <div class="col-sm-4">
                    <hr>
                    <h3>Adminstración de usuarios</h3>
                    <p>Administra los usuarios de tu parqueadero o sucursal</p>
                    <p>Accesos</p>
                </div>
                <div class="col-sm-4">
                    <hr>
                    <h3>Facturación</h3>
                    <p>Gestión de facturas de tus parqueaderos o sucursales</p>
                    <p>disponibilidad de cupos</p>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {

        }
    }
})

export { inicio }