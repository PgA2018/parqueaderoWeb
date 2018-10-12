import { api } from "../../config/config.js";

var parqueadero = Vue.component('parqueadero',
    {
        template: `<div class="row">
        <div class="col-sm-8 col-sm-offset-2">
            <h2 class="text-center">Administración de parqueaderos</h2>
            <div class="form">
                <form action="" class="text-center">
                    <br>
                    <input v-model="parqueadero.nombre" v-on:keyup.enter="crear" type="text" class="form-control" placeholder="nombre">
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
                            <th>id</th>
                            <th>nombre</th>
                            <th>operación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(con, index) in consulta">
                            <td> {{con.id}} </td>
                            <td>
                                <div v-if=" modId== con.id">
                                    <input v-model="parqueaderoUpdate.nombre" v-on:keyup.enter="crear" type="text" class="form-control" placeholder="nombre">
                                </div>
                                <div v-else>{{con.nombre}}</div>
                            </td>
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
        data: function () {
            return {
                parqueadero: {
                    id: '',
                    nombre: ''
                },
                parqueaderoUpdate: {
                    id: '',
                    nombre: ''
                },
                api: api,
                modId: -1,
                consulta: [],
                errores: []
            }
        },
        created: function () {
            this.consultar();
        },
        methods: {
            consultar: function () {
                const vue = this;
                axios.get(this.api + 'parqueadero')
                    .then(function (response) {
                        vue.consulta = response.data;
                    })
                    .catch(function (error) {
                        alert(error);
                    }
                    )
            },
            crear: function () {
                this.validarCrear();
                if (this.errores.length === 0) {
                    const vue = this;
                    var parqueadero = {
                        nombre: this.parqueadero.nombre,
                    };
                    axios.post(this.api + 'parqueadero', parqueadero)
                        .then(function (response) {
                            vue.consultar();
                            vue.parqueadero.nombre = "";
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            modificar: function (parqueadero) {
                this.modId = parqueadero.id;
                this.parqueaderoUpdate.nombre = parqueadero.nombre;

            },
            actualizar: function (id) {
                this.validarActualizar();
                if (this.errores.length === 0) {
                    const vue = this;
                    var parqueadero = {
                        nombre: this.parqueaderoUpdate.nombre,
                    };
                    axios.put(this.api + 'parqueadero/' + this.modId, parqueadero)
                        .then(function (response) {
                            vue.consultar();
                            vue.modId = -1;
                            vue.parqueadero.nombre = "";
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            eliminar: function (id) {
                console.log(id);
                if (confirm("¿está seguro que desea eliminar el parqueadero?")) {
                    const vue = this;
                    axios.delete(this.api + 'parqueadero/' + id)
                        .then(function (response) {
                            vue.consultar();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            validarCrear: function () {
                this.errores = [];
                //if (this.validCampo(this.id_vehiculo) == false) this.errores.push("El campo id_vehiculo es requerido");
                //if (this.validCampo(this.llave) == false) this.errores.push("El campo llave es requerido");
            },
            validarActualizar: function () {
                this.errores = [];
                //if (this.validCampo(this.id_vehiculoUpdate) == false) this.errores.push("El campo id_vehiculo es requerido");
                //if (this.validCampo(this.llaveUpdate) == false) this.errores.push("El campo llave es requerido");
            },
            validCampo: function (campo) {
                if (campo == null || campo == 0 || /^\s+$/.test(campo)) {
                    return false
                }
            }
        }

    })

export { parqueadero }