import { api } from "../../config/config.js";

var plazas = Vue.component('plazas', {
    template: `
    <div class="row">
        <div class="col-sm-8 col-sm-offset-2">
            <h2 class="text-center">Administración de Plazas</h2>
            <div class="form">
                <form action="" class="text-center">
                    <br>
                    <input v-model="plaza.id_vehiculo" v-on:keyup.enter="crear" type="text" class="form-control" placeholder="Id_vehiculo">
                    <br>
                    <input v-model="plaza.llave" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Llave">
                    <br>
                    <input v-model="plaza.techo" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Techo">
                    <br>
                    <input v-model="plaza.id_sucursal" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Id_sucursal">
                    <br>
                    <input v-model="plaza.disponible" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Disponible">
                    <br>
                    <input v-on:click="crear" type="button" value="Agregar" class="btn btn-success">
                    <br><br>
                    <div class="alert alert-danger" v-if="errores.length">
                        <div v-for="error in errores">
                            {{error}}
                        </div>
                    </div>
                </form>
            </div>
            <br>
            <div class="table-resposive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Id_Vehiculo</th>
                            <th>Llave</th>
                            <th>Techo</th>
                            <th>Id_Sucursal</th>
                            <th>Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(con, index) in consulta">
                            <td> {{con.id}} </td>
                            <td>
                                <div v-if=" modId== con.id">
                                    <input v-model="plazaUpdate.id_vehiculo" v-on:keyup.enter="crear" type="text" class="form-control" placeholder="Id_Vehiculo">
                                </div>
                                <div v-else>{{con.id_vehiculo}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="plazaUpdate.llave" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Llave"></div>
                                <div v-else>{{con.llave}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="plazaUpdate.techo" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Correo"></div>
                                <div v-else>{{con.techo}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="plazaUpdate.id_sucursal" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Id_sucursal"></div>
                                <div v-else>{{con.id_sucursal}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="plazaUpdate.disponible" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Disponible"></div>
                                <div v-else>{{con.disponible}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id">
                                    <button v-on:click="actualizar(con.id)" class="btn btn-success">Guardar</button>
                                </div>
                                <div v-else>
                                    <button v-on:click="modificar(con)" class="btn btn-warning">Actualizar</button>
                                    <button v-on:click="eliminar(con.id)" class="btn btn-danger">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            plaza: {
                id_vehiculo: "",
                llave: "",
                techo: "",
                id_sucursal: "",
                disponible: "",
            },
            plazaUpdate: {
                id_vehiculo: "",
                llave: "",
                techo: "",
                id_sucursal: "",
                disponible: "",
            },
            api: api,
            modId: -1,
            consulta: [],
            errores: []
        }
    },
    created: function() {
        this.consultar();
    },
    methods: {
        consultar: function() {
            const vue = this;
            axios.get(this.api + 'plazas')
                .then(function(response) {
                    vue.consulta = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        crear: function() {
            this.validarCrear();
            if (this.errores.length === 0) {
                const vue = this;
                var plaza = {
                    id_vehiculo: this.plaza.id_vehiculo,
                    llave: this.plaza.llave,
                    techo: this.plaza.techo,
                    id_sucursal: this.plaza.id_sucursal,
                    disponible: this.plaza.disponible
                };
                axios.post(this.api + 'plazas', plaza)
                    .then(function(response) {
                        vue.consultar();
                        vue.plaza.id_vehiculo = "";
                        vue.plaza.llave = "";
                        vue.plaza.techo = "";
                        vue.plaza.id_sucursal = "";
                        vue.plaza.disponible = "";
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        modificar: function(plaza) {
            this.modId = plaza.id;
            this.plazaUpdate.id_vehiculoe = plaza.id_vehiculo;
            this.plazaUpdate.llavee = plaza.llave;
            this.plazaUpdate.techo = plaza.techo;
            this.plazaUpdate.id_sucursal = plaza.id_sucursal;
            this.plazaUpdate.disponible = plaza.disponible;
        },
        actualizar: function(id) {
            this.validarActualizar();
            if (this.errores.length === 0) {
                const vue = this;
                var plaza = {
                    id_vehiculo: this.plazaUpdate.id_vehiculo,
                    llave: this.plazaUpdate.llave,
                    techo: this.plazaUpdate.techo,
                    id_sucursal: this.plazaUpdate.id_sucursal,
                    disponible: this.plazaUpdate.disponible
                };
                axios.put(this.api + 'plazas/' + this.modId, plaza)
                    .then(function(response) {
                        vue.consultar();
                        vue.modId = -1;
                        vue.plazaUpdate.id_vehiculo = "";
                        vue.plazaUpdate.llave = "";
                        vue.plazaUpdate.techo = "";
                        vue.plazaUpdate.id_sucursal = "";
                        vue.plazaUpdate.disponible = "";
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        eliminar: function(id) {
            console.log(id);
            const vue = this;
            axios.delete(this.api + 'plazas/' + id)
                .then(function(response) {
                    vue.consultar();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        validarCrear: function() {
            this.errores = [];
            //if (this.validCampo(this.id_vehiculo) == false) this.errores.push("El campo id_vehiculo es requerido");
            //if (this.validCampo(this.llave) == false) this.errores.push("El campo llave es requerido");
        },
        validarActualizar: function() {
            this.errores = [];
            //if (this.validCampo(this.id_vehiculoUpdate) == false) this.errores.push("El campo id_vehiculo es requerido");
            //if (this.validCampo(this.llaveUpdate) == false) this.errores.push("El campo llave es requerido");
        },
        validCampo: function(campo) {
            if (campo == null || campo == 0 || /^\s+$/.test(campo)) {
                return false
            }
        }
    }
});

export { plazas };