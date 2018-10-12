import { api } from "../../config/config.js";
var usuario = Vue.component('usuario', {
    template: `
    <div class="row">
        <div class="col-sm-8 col-sm-offset-2">
            <h2 class="text-center">Administración de Usuarios</h2>
            <div class="form">
                <form action="" class="text-center">
                    <br>
                    <input v-model="usuario.nombre" v-on:keyup.enter="crear" type="text" class="form-control" placeholder="nombre">
                    <br>
                    <input v-model="usuario.identificacion" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="identificacion">
                    <br>
                    <input v-model="usuario.direccion" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="direccion">
                    <br>
                    <input v-model="usuario.telefono" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="telefono">
                    <br>
                    <input v-model="usuario.password" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="password">
                    <br>
                    <br>
                        <select class="form-control"  v-model="tipousuario.id">
                            <option value="">Elija el tipo de usuario</option>
                            <option v-for="con in consultatipo" v-bind:value="con.id">
                                {{ con.nombre }}
                            </option>
                        </select>
                    <br>
                    <br>

                        <select class="form-control"  v-model="parqueadero.id">
                            <option value="">Elija parqueadero</option>
                            <option v-for="con in consultaparqueadero" v-bind:value="con.id">
                                {{ con.nombre }}
                            </option>
                        </select>
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
                            <th>identificacion</th>
                            <th>direccion</th>
                            <th>telefono</th>
                            <th>password</th>
                            <th>tipo de usuario</th>
                            <th>parqueadero</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(con, index) in consulta">
                            <td> {{con.id}} </td>
                            <td>
                                <div v-if=" modId== con.id">
                                    <input v-model="usuarioUpdate.nombre" v-on:keyup.enter="crear" type="text" class="form-control" placeholder="nombre">
                                </div>
                                <div v-else>{{con.nombre}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="usuarioUpdate.identificacion" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="identificacion"></div>
                                <div v-else>{{con.identificacion}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="usuarioUpdate.direccion" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="direccion"></div>
                                <div v-else>{{con.direccion}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="usuarioUpdate.telefono" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="telefono"></div>
                                <div v-else>{{con.telefono}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="usuarioUpdate.password" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="password"></div>
                                <div v-else>{{con.password}}</div>
                            </td>

                            <td>
                                <div v-if="modId == con.id"><input v-model="usuarioUpdate.tipo_usuario" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="tipo usuario"></div>
                                <div v-else>{{con.tipo_usuario}}</div>
                            </td>

                            <td>
                                <div v-if="modId == con.id"><input v-model="usuarioUpdate.id_parqueadero" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="parqueadero"></div>
                                <div v-else>{{con.id_parqueadero}}</div>
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
            usuario: {
                nombre: "",
                identificacion: "",
                direccion: "",
                telefono: "",
                password: "",
                tipo_usuario: "",
                id_parqueadero: "",
            },
            usuarioUpdate: {
                nombre: "",
                identificacion: "",
                direccion: "",
                telefono: "",
                password: "",
                tipo_usuario: "",
                id_parqueadero: "",
            },
            tipousuario: {
                id: "",
                nombre: "",
            },
            parqueadero: {
                id: "",
                nombre: "",
            },
            api: api,
            modId: -1,
            consulta: [],
            consultatipo: [],
            consultaparqueadero: [],
            errores: []
        }
    },
    created: function() {
        this.consultar();
        this.consultartipo();
        this.consultarparqueadero();
    },
    methods: {
        consultar: function() {
            const vue = this;
            axios.get(this.api + 'usuario')
                .then(function(response) {
                    console.log(response.data);
                    vue.consulta = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });

        },
        consultartipo: function() {
            const vue = this;
            axios.get(this.api + 'tipousuario')
                .then(function(response) {
                    console.log(response.data);
                    vue.consultatipo = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });

        },

        consultarparqueadero: function() {
            const vue = this;
            axios.get(this.api + 'parqueadero')
                .then(function(response) {
                    console.log(response.data);
                    vue.consultaparqueadero = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });

        },
        crear: function() {
            this.validarCrear();
            if (this.errores.length === 0) {
                const vue = this;
                var usuario = {
                    nombre: this.usuario.nombre,
                    identificacion: this.usuario.identificacion,
                    direccion: this.usuario.direccion,
                    telefono: this.usuario.telefono,
                    password: this.usuario.password,
                    tipo_usuario: this.tipousuario.id,
                    id_parqueadero: this.parqueadero.id
                };
                axios.post(this.api + 'usuario', usuario)
                    .then(function(response) {
                        vue.consultar();
                        vue.usuario.nombre = "";
                        vue.usuario.identificacion = "";
                        vue.usuario.direccion = "";
                        vue.usuario.telefono = "";
                        vue.usuario.password = "";
                        vue.usuario.tipo_usuario = "";
                        vue.usuario.id_parqueadero = "";
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        modificar: function(usuario) {
            this.modId = usuario.id;
            this.usuarioUpdate.nombre = usuario.nombre;
            this.usuarioUpdate.identificacion = usuario.identificacion;
            this.usuarioUpdate.direccion = usuario.direccion;
            this.usuarioUpdate.telefono = usuario.telefono;
            this.usuarioUpdate.password = usuario.password;
            this.usuarioUpdate.tipo_usuario = usuario.tipo_usuario;
            this.usuarioUpdate.id_parqueadero = usuario.id_parqueadero;
        },
        actualizar: function(id) {
            this.validarActualizar();
            if (this.errores.length === 0) {
                const vue = this;
                var usuario = {
                    nombre: this.usuarioUpdate.nombre,
                    identificacion: this.usuarioUpdate.identificacion,
                    direccion: this.usuarioUpdate.direccion,
                    telefono: this.usuarioUpdate.telefono,
                    password: this.usuarioUpdate.password,
                    tipo_usuario: this.usuarioUpdate.tipo_usuario,
                    id_parqueadero: this.usuarioUpdate.id_parqueadero
                };
                axios.put(this.api + 'usuario/' + this.modId, usuario)
                    .then(function(response) {
                        vue.consultar();
                        vue.modId = -1;
                        vue.usuarioUpdate.nombre = "";
                        vue.usuarioUpdate.identificacion = "";
                        vue.usuarioUpdate.direccion = "";
                        vue.usuarioUpdate.telefono = "";
                        vue.usuarioUpdate.password = "";
                        vue.usuarioUpdate.tipo_usuario = "";
                        vue.usuarioUpdate.id_parqueadero = "";
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        eliminar: function(id) {
            console.log(id);
            const vue = this;
            axios.delete(this.api + 'usuario/' + id)
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

export { usuario };