import { api } from "../../config/config.js";

var sucursal = Vue.component('sucursal', {
    template: `
    <div class="row">
        <div class="col-sm-8 col-sm-offset-2">
            <h2 class="text-center">Administración de sucursal</h2>
            <div class="form">
                <form action="" class="text-center">
                    <br>
                    <select class="form-control"  v-model="parqueadero.id">
                        <option value="">Elija el tipo de usuario</option>
                        <option v-for="con in consultaParqueadero" v-bind:value="con.id">
                            {{ con.nombre }}
                        </option>
                    </select>
                    <br>
                    <input v-model="sucursal.direccion" v-on:keyup.enter="crear" type="text" class="form-control" placeholder="Direccion">
                    <br>
                    <input v-model="sucursal.telefono" v-on:keyup.enter="crear" type="text" class="form-control" placeholder="Telefono">
                    <br>
                    <input v-model="sucursal.descripcion" v-on:keyup.enter="crear" type="text" class="form-control" placeholder="Descripcion">
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
                            <th>Parqueadero</th>
                            <th>Dirección</th>
                            <th>Telefono</th>
                            <th>Dirección</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(con, index) in consulta">
                            <td> {{con.id}} </td>
                            <td>
                                <div v-if=" modId== con.id">
                                    <input v-model="sucursalUpdate.id_parqueadero" v-on:keyup.enter="crear" type="text" class="form-control" placeholder="Id_Vehiculo">
                                </div>
                                <div v-else>{{con.id_parqueadero}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="sucursalUpdate.direccion" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Llave"></div>
                                <div v-else>{{con.direccion}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="sucursalUpdate.telefono" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Correo"></div>
                                <div v-else>{{con.telefono}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="sucursalUpdate.descripcion" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Id_sucursal"></div>
                                <div v-else>{{con.descripcion}}</div>
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
    data: function () {
        return {
            sucursal: {
                id_parqueadero: "",
                direccion: "",
                telefono: "",
                descripcion: "",
            },
            sucursalUpdate: {
                id_parqueadero: "",
                direccion: "",
                telefono: "",
                descripcion: "",
            },
            parqueadero: {
                id: "",
                nombre: ""
            },
            api: api,
            modId: -1,
            consulta: [],
            consultaParqueadero: [],
            errores: []
        }
    },
    created: function () {
        this.consultar();
        this.consultarParqueadero();
    },
    methods: {
        consultar: function () {
            const vue = this;
            axios.get(this.api + 'sucursal')
                .then(function (response) {
                    vue.consulta = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        consultarParqueadero: function () {
            const vue = this;
            axios.get(this.api + 'parqueadero')
                .then(function (response) {
                    vue.consultaParqueadero = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        crear: function () {
            this.validarCrear();
            if (this.errores.length === 0) {
                const vue = this;
                var sucursal = {
                    id_parqueadero: this.parqueadero.id,
                    direccion: this.sucursal.direccion,
                    telefono: this.sucursal.telefono,
                    descripcion: this.sucursal.descripcion,
                };
                console.log(sucursal);

                axios.post(this.api + 'sucursal', sucursal)
                    .then(function (response) {
                        vue.consultar();
                        vue.sucursal.id_parqueadero = "";
                        vue.sucursal.direccion = "";
                        vue.sucursal.telefono = "";
                        vue.sucursal.descripcion = "";
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        modificar: function (sucursal) {
            this.modId = sucursal.id;
            this.sucursalUpdate.id_parqueadero = sucursal.id_parqueadero;
            this.sucursalUpdate.direccion = sucursal.direccion;
            this.sucursalUpdate.telefono = sucursal.telefono;
            this.sucursalUpdate.descripcion = sucursal.descripcion;
        },
        actualizar: function (id) {
            this.validarActualizar();
            if (this.errores.length === 0) {
                const vue = this;
                var sucursal = {
                    id_parqueadero: this.sucursalUpdate.id_parqueadero,
                    direccion: this.sucursalUpdate.direccion,
                    telefono: this.sucursalUpdate.telefono,
                    descripcion: this.sucursalUpdate.descripcion,
                };
                axios.put(this.api + 'sucursal/' + this.modId, sucursal)
                    .then(function (response) {
                        vue.consultar();
                        vue.modId = -1;
                        vue.sucursalUpdate.id_parqueadero = "";
                        vue.sucursalUpdate.direccion = "";
                        vue.sucursalUpdate.telefono = "";
                        vue.sucursalUpdate.descripcion = "";
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        eliminar: function (id) {
            console.log(id);
            const vue = this;
            if (confirm("¿está seguro que desea eliminar?")) {
                axios.delete(this.api + 'sucursal/' + id)
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
});

export { sucursal };