<template>
    <v-container fluid>
        <h1>Marcas</h1>
        <v-row>
            <!-- Formulario para agregar cliente -->
            <v-col xs="12" sm="3" md="3" lg="3" xl="3" xxl="3">
                <v-text-field label="Nombre" maxlength="50" counter color="indigo" clearable
                    placeholder="Nombre de la marca" v-model="marca.nombre"></v-text-field>
                <v-btn prepend-icon="mdi-check" color="indigo" block @click="agregarMarcas">Agregar</v-btn>
            </v-col>
            <!-- Tabla para mostrar clientes -->
            <v-col cols="9" xs="12" sm="9" md="9" lg="9" xl="9" xxl="9">
                <v-card>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre marca</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(marca, i) in marcas" :key="i">
                                    <th>{{ marca.id }}</th>
                                    <th>{{ marca.nombre }}</th>
                                    <th>
                                        <v-btn-group>
                                            <v-btn icon="mdi-eye" color="indigo"
                                                @click="obtenerMarca(marca.id, 1)"></v-btn>
                                            <v-btn icon="mdi-pencil" color="green"
                                                @click="obtenerMarca(marca.id, 2)"></v-btn>
                                            <v-btn icon="mdi-delete" color="red"
                                                @click="eliminarMarca(marca.id)"></v-btn>
                                        </v-btn-group>
                                    </th>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Cuadro de diálogo para ver registro -->
        <v-dialog v-model="dialogOne" transition="dialog-top-transition" width="500">
            <v-card title="Ver" subtitle="Datos de la categoria">
                <v-card-text>
                    <v-list>
                        <v-list-item prepend-icon="mdi-adjust" :title="marca.id"></v-list-item>
                        <v-list-item prepend-icon="mdi-shape" :title="marca.nombre"></v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogTwo" transition="dialog-top-transition" width="500">
            <v-card title="Ver" subtitle="Datos de la marca">
                <v-card-text>
                    <v-text-field label="Nombre" maxlength="50" counter color="indigo" clearable
                        placeholder="Nombre de la marca" v-model="marca.nombre"></v-text-field>
                    <v-btn prepend-icon="mdi-check" color="indigo" block
                        @click="modificarMarca(marca.id)">Guardar</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="alertaEstado" color="blue-accent-1" timeout="2000">
            {{ mensaje }}
        </v-snackbar>
    </v-container>
</template>

<script>

// Importando axios 
import axios from 'axios'

export default {
    name: 'MarcaView',
    data() {
        return {
            marcas: [],
            alertaEstado: false,
            mensaje: '',
            marca: {},
            dialogOne: false,
            dialogTwo: false, 
            config: {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.getters.getToken
                }
            }
        }
    },
    methods: {
        agregarMarcas() {
            axios.post('http://127.0.0.1:8000/api/marcas/store', this.marca, this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        // Cambiar mensaje y visilidad de alerta 
                        this.alertaEstado = true
                        this.mensaje = response.data.data
                        // Limpiar formulario 
                        this.marca = {};
                        this.obtenerMarcas();
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        obtenerMarcas() {
            this.marcas = []
            axios.get('http://127.0.0.1:8000/api/marcas/select',this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        let res = response.data
                        this.marcas = res.data
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        obtenerMarca(id, action) {
            // Cambiar la visibilidad del modal ver/editar 
            if (action == 1) {
                this.dialogOne = true
            } else {
                this.dialogTwo = true
            }

            axios.get(`http://127.0.0.1:8000/api/marcas/find/${id}`, this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        let res = response.data
                        this.marca = res.data
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        modificarMarca(id) {
            axios.put(`http://127.0.0.1:8000/api/marcas/update/${id}`, this.marca, this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        // Cambiar mensaje y visilidad de alerta 
                        this.alertaEstado = true
                        this.mensaje = response.data.data
                        // Ocultar cuadro de diálogo 
                        this.dialogTwo = false
                        // Recargar tabla 
                        this.obtenerMarcas()
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        eliminarMarca(id) {
            axios.delete(`http://127.0.0.1:8000/api/marcas/delete/${id}`, this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        // Cambiar mensaje y visilidad de alerta 
                        this.alertaEstado = true
                        this.mensaje = response.data.data
                        // Recargar tabla 
                        this.obtenerMarcas()
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        async getToken() {
            this.config= {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.getters.getToken
                }
            }
        }
    },
    async created() {
        await this.getToken();
        this.obtenerMarcas();
    },
} 
</script>