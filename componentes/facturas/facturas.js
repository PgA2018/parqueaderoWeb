import { api } from "../../config/config.js";

var facturas = Vue.component('facturas', {
    template: `
    <div class="row">
        <div class="col-sm-8 col-sm-offset-2">
            <h2 class="text-center">Facturacion</h2>
            <div class="form">
                <form action="" class="text-center">
                    <br>
                    <input v-model="factura.num_fac" v-on:keyup.enter="crear" type="text" class="form-control" placeholder="Numero de Factura">
                    <br>
                    <input v-model="factura.fec_entrada" v-on:keyup.enter="crear" type="date" class="form-control" placeholder="Selecione la fecha">
                    <br>
                    <input v-model="factura.valor" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Valor">
                    <br>
                    <input v-model="factura.placa_vehiculo" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Placa del Vehiculo">
                    <br>
                    <br>
                        <select class="form-control"  v-model="plazas.id">
                            <option value="">Elija la plaza</option>
                            <option v-for="dis in disponibles" v-bind:value="dis.id">
                                {{ dis.id }} para {{dis.TipoVehiculo.nombre}}
                            </option>
                        </select>
                    <br>
                    <input v-model="factura.fec_salida" v-on:keyup.enter="crear" type="date" class="form-control" placeholder="Selecione la fecha">
                    <br>
                    <br>
                        <select class="form-control"  v-model="estados.id">
                            <option value="">Estado de la factura</option>
                            <option v-for="est in estado" v-bind:value="est.id">
                                {{ est.nombre }}
                            </option>
                        </select>
                    <br>
                    <input v-model="factura.id_estado_fac" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Estado de Factura">
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
                            <th>Numero de factura</th>
                            <th>Fecha de entrada</th>
                            <th>Precio</th>
                            <th>Placa del vehiculo</th>
                            <th>Plaza disponible</th>
                            <th>Fecha de salida</th>
                            <th>Estado de factura</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(con, index) in consulta">
                            <td> {{con.id}} </td>
                            <td>
                                <div v-if=" modId== con.id">
                                    <input v-model="facturaUpdate.num_fac" v-on:keyup.enter="crear" type="text" class="form-control" placeholder="num_fac">
                                </div>
                                <div v-else>{{con.num_fac}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="facturaUpdate.fec_entrada" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="fecha de entrada" disabled></div>
                                <div v-else>{{con.fec_entrada}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="facturaUpdate.valor" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="Correo"></div>
                                <div v-else>{{con.valor}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="facturaUpdate.placa_vehiculo" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="placa_vehiculo"></div>
                                <div v-else>{{con.placa_vehiculo}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="facturaUpdate.id_plaza" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="id_plaza"></div>
                                <div v-else>{{con.id_plaza}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="facturaUpdate.fec_salida" v-on:keyup.enter="crear" type="date" class="form-control" placeholder="fec_salida"></div>
                                <div v-else>{{con.fec_salida}}</div>
                            </td>
                            <td>
                                <div v-if="modId == con.id"><input v-model="facturaUpdate.id_estado_fac" v-on:keyup.enter="crear" type="email" class="form-control" placeholder="id_estado_fac"></div>
                                <div v-else>{{con.id_estado_fac}}</div>
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
            factura: {
                num_fac: "",
                fec_entrada: "",
                valor: "",
                placa_vehiculo: "",
                id_plaza: "",
                fec_salida: "",
                id_estado_fac: "",
            },
            facturaUpdate: {
                num_fac: "",
                fec_entrada: "",
                valor: "",
                placa_vehiculo: "",
                id_plaza: "",
                fec_salida: "",
                id_estado_fac: "",
            },
            plazas: {
                id: "",
                tipoVehiculo: {
                    nombre: "",
                },
            },
            estados: {
                id: "",
                nombre: "",
            },
            api: api,
            modId: -1,
            consulta: [],
            disponibles: [],
            estado: [],

            errores: []
        }
    },
    created: function() {
        this.consultar();
        this.plazasdisponibles();
        this.estadosfactura();
    },
    mounted: function() {

    },
    methods: {
        consultar: function() {
            const vue = this;
            axios.get(this.api + 'factura')
                .then(function(response) {
                    vue.consulta = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        plazasdisponibles: function() {
            const vue = this;
            axios.get(this.api + 'plazasDisponibles')
                .then(function(response) {
                    console.log(response.data);
                    vue.disponibles = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        estadosfactura: function() {
            const vue = this;
            axios.get(this.api + 'estadofactura')
                .then(function(response) {
                    console.log(response.data);
                    vue.estado = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        crear: function() {
            this.validarCrear();
            if (this.errores.length === 0) {
                const vue = this;
                var factura = {
                    num_fac: this.factura.num_fac,
                    fec_entrada: this.factura.fec_entrada,
                    valor: this.factura.valor,
                    placa_vehiculo: this.factura.placa_vehiculo,
                    id_plaza: this.plazas.id,
                    fec_salida: this.factura.fec_salida,
                    id_estado_fac: this.estados.id
                };
                axios.post(this.api + 'factura', factura)
                    .then(function(response) {
                        vue.consultar();
                        vue.factura.num_fac = "";
                        vue.factura.fec_entrada = "";
                        vue.factura.valor = "";
                        vue.factura.placa_vehiculo = "";
                        vue.factura.id_plaza = "";
                        vue.factura.fec_salida = "";
                        vue.factura.id_estado_fac = "";
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        modificar: function(factura) {
            this.modId = factura.id;
            this.facturaUpdate.num_fac = factura.num_fac;
            this.facturaUpdate.fec_entrada = factura.fec_entrada;
            this.facturaUpdate.valor = factura.valor;
            this.facturaUpdate.placa_vehiculo = factura.placa_vehiculo;
            this.facturaUpdate.id_plaza = factura.id_plaza;
            this.facturaUpdate.fec_salida = factura.fec_salida;
            this.facturaUpdate.id_estado_fac = factura.id_estado_fac;
        },
        actualizar: function(id) {
            this.validarActualizar();
            if (this.errores.length === 0) {
                const vue = this;
                var factura = {
                    num_fac: this.facturaUpdate.num_fac,
                    fec_entrada: this.facturaUpdate.fec_entrada,
                    valor: this.facturaUpdate.valor,
                    placa_vehiculo: this.facturaUpdate.placa_vehiculo,
                    id_plaza: this.facturaUpdate.id_plaza,
                    fec_salida: this.facturaUpdate.fec_salida,
                    id_estado_fac: this.facturaUpdate.id_estado_fac
                };
                axios.put(this.api + 'factura/' + this.modId, factura)
                    .then(function(response) {
                        vue.consultar();
                        vue.modId = -1;
                        vue.facturaUpdate.num_fac = "";
                        vue.facturaUpdate.fec_entrada = "";
                        vue.facturaUpdate.valor = "";
                        vue.facturaUpdate.placa_vehiculo = "";
                        vue.facturaUpdate.id_plaza = "";
                        vue.facturaUpdate.fec_salida = "";
                        vue.facturaUpdate.id_estado_fac = "";
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        eliminar: function(id) {
            console.log(id);
            const vue = this;
            axios.delete(this.api + 'factura/' + id)
                .then(function(response) {
                    vue.consultar();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        validarCrear: function() {
            this.errores = [];
            //if (this.validCampo(this.num_fac) == false) this.errores.push("El campo num_fac es requerido");
            //if (this.validCampo(this.fec_entrada) == false) this.errores.push("El campo fec_entrada es requerido");
        },
        validarActualizar: function() {
            this.errores = [];
            //if (this.validCampo(this.id_vehiculoUpdate) == false) this.errores.push("El campo num_fac es requerido");
            //if (this.validCampo(this.fec_entradaUpdate) == false) this.errores.push("El campo fec_entrada es requerido");
        },
        validCampo: function(campo) {
            if (campo == null || campo == 0 || /^\s+$/.test(campo)) {
                return false
            }
        }
    }
});

export { facturas };