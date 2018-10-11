var barraInferior = Vue.component('barra-inferior', {
    template: `
    <div class="row">
        <div class="col-sm-12">
            <div class="container text-center">
                <hr>
                <div class="row">
                    <div class="col-lg-12">
                        <ul class="nav nav-pills nav-justified">
                            <li><a href="/">© 2018 Aparca.</a></li>
                            <li><a href="#">Terminos y servicios</a></li>
                            <li><a href="#">Privacidad</a></li>
                        </ul>
                    </div>
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

export { barraInferior }