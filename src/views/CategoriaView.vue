<template>
    <v-container fluid>
        <h1>Categorias</h1>
        <v-row>
            <!-- Formulario para agregar cliente -->
            <v-col xs="12" sm="3" md="3" lg="3" xl="3" xxl="3">
                <v-text-field label="Nombre" maxlength="50" counter color="indigo" clearable
                    placeholder="Nombre de la categoria" v-model="categoria.nombre"></v-text-field>
                <v-btn prepend-icon="mdi-check" color="indigo" block @click="agregarCategoria">Agregar</v-btn>
            </v-col>
            <!-- Tabla para mostrar clientes -->
            <v-col cols="9" xs="12" sm="9" md="9" lg="9" xl="9" xxl="9">
                <v-card>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre categoria</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(categoria, i) in categorias" :key="i">
                                    <th>{{ categoria.id }}</th>
                                    <th>{{ categoria.nombre }}</th>
                                    <th>
                                        <v-btn-group>
                                            <v-btn icon="mdi-eye" color="indigo"
                                                @click="obtenerCategoria(categoria.id, 1)"></v-btn>
                                            <v-btn icon="mdi-pencil" color="green"
                                                @click="obtenerCategoria(categoria.id, 2)"></v-btn>
                                            <v-btn icon="mdi-delete" color="red"
                                                @click="eliminarCategoria(categoria.id)"></v-btn>
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
                        <v-list-item prepend-icon="mdi-adjust" :title="categoria.id"></v-list-item>
                        <v-list-item prepend-icon="mdi-shape" :title="categoria.nombre"></v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogTwo" transition="dialog-top-transition" width="500">
            <v-card title="Ver" subtitle="Datos de la categoria">
                <v-card-text>
                    <v-text-field label="Nombre" maxlength="50" counter color="indigo" clearable
                        placeholder="Nombre de la categoria" v-model="categoria.nombre"></v-text-field>
                    <v-btn prepend-icon="mdi-check" color="indigo" block
                        @click="modificarCategoria(categoria.id)">Guardar</v-btn>
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
    name: 'CategoriaView',
    data() {
        return {
            categorias: [],
            alertaEstado: false,
            mensaje: '',
            categoria: {},
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
        agregarCategoria() {
            axios.post('http://127.0.0.1:8000/api/categorias/store',{nombre:this.categoria.nombre}, this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        // Cambiar mensaje y visilidad de alerta 
                        this.alertaEstado = true
                        this.mensaje = response.data.data
                        // Limpiar formulario 
                        this.categoria = {};
                        this.obtenerCategorias();
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        obtenerCategorias() {
            this.categorias = []
            axios.get('http://127.0.0.1:8000/api/categorias/select', this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        let res = response.data
                        this.categorias = res.data
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        obtenerCategoria(id, action) {
            // Cambiar la visibilidad del modal ver/editar 
            if (action == 1) {
                this.dialogOne = true
            } else {
                this.dialogTwo = true
            }

            axios.get(`http://127.0.0.1:8000/api/categorias/find/${id}`, this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        let res = response.data
                        this.categoria = res.data
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        modificarCategoria(id) {
            axios.put(`http://127.0.0.1:8000/api/categorias/update/${id}`, this.categoria, this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        // Cambiar mensaje y visilidad de alerta 
                        this.alertaEstado = true
                        this.mensaje = response.data.data
                        // Ocultar cuadro de diálogo 
                        this.dialogTwo = false
                        // Recargar tabla 
                        this.obtenerCategorias()
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        eliminarCategoria(id) {
            axios.delete(`http://127.0.0.1:8000/api/categorias/delete/${id}`, this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        // Cambiar mensaje y visilidad de alerta 
                        this.alertaEstado = true
                        this.mensaje = response.data.data
                        // Recargar tabla 
                        this.obtenerCategorias()
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        async getToken() {
            this.config = {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.getters.getToken
                }
            }
        }
    },
    async created() {
        await this.getToken();
        this.obtenerCategorias();
    },
} 
</script>