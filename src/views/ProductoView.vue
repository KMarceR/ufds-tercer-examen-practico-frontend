<template>
    <v-container fluid>
        <h1>Productos</h1>
        <v-row>
            <!-- Formulario para agregar producto -->
            <v-col xs="12" sm="3" md="3" lg="3" xl="3" xxl="3">
                <v-text-field label="Nombre" maxlength="50" counter color="indigo" clearable
                    placeholder="Nombre del producto" v-model="producto.nombre"></v-text-field>
                <v-text-field label="Precio" maxlength="50" counter color="indigo" clearable
                    placeholder="Precio del producto" v-model="producto.precio"></v-text-field>
                <v-select color="indigo" label="Marca" :items="marcas" item-value="id" item-title="nombre"
                    v-model="producto.fk_marca"></v-select>
                <v-select color="indigo" label="Categoria" :items="categorias" item-value="id" item-title="nombre"
                    v-model="producto.fk_categoria"></v-select>
                <v-btn prepend-icon="mdi-check" color="indigo" block @click="agregarProducto">Agregar</v-btn>
            </v-col>
            <!-- Tabla para mostrar productos -->
            <v-col cols="9" xs="12" sm="9" md="9" lg="9" xl="9" xxl="9">
                <v-card>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Marca</th>
                                    <th>Categoria</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(producto, i) in productos" :key="i">
                                    <th>{{ producto.id }}</th>
                                    <th>{{ producto.nombre }}</th>
                                    <th>{{ producto.precio }}</th>
                                    <th>{{ producto.marca.nombre }}</th>
                                    <th>{{ producto.categoria.nombre }}</th>
                                    <th>
                                        <v-btn-group>
                                            <v-btn icon="mdi-eye" color="indigo"
                                                @click="obtenerProducto(producto.id, 1)"></v-btn>
                                            <v-btn icon="mdi-pencil" color="green"
                                                @click="obtenerProducto(producto.id, 2)"></v-btn>
                                            <v-btn icon="mdi-delete" color="red"
                                                @click="eliminarProducto(producto.id)"></v-btn>
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
            <v-card title="Ver" subtitle="Datos del producto">
                <v-card-text>
                    <v-list>
                        <v-list-item prepend-icon="mdi-adjust" :title="producto.id"></v-list-item>
                        <v-list-item prepend-icon="mdi-shape" :title="producto.nombre"></v-list-item>
                        <v-list-item prepend-icon="mdi-shape" :title="producto.precio"></v-list-item>
                        <v-list-item prepend-icon="mdi-shape" :title="producto.marca.nombre"></v-list-item>
                        <v-list-item prepend-icon="mdi-shape" :title="producto.categoria.nombre"></v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogTwo" transition="dialog-top-transition" width="500">
            <v-card title="Ver" subtitle="Datos de la categoria">
                <v-card-text>
                    <v-text-field label="Nombre" maxlength="50" counter color="indigo" clearable
                        placeholder="Nombre del producto" v-model="producto.nombre"></v-text-field>
                    <v-text-field label="Precio" maxlength="50" counter color="indigo" clearable
                        placeholder="Precio del producto" v-model="producto.precio"></v-text-field>
                    <v-select color="indigo" label="Marca" :items="marcas" item-value="id" item-title="nombre"
                        v-model="producto.fk_marca"></v-select>
                    <v-select color="indigo" label="Categoria" :items="categorias" item-value="id" item-title="nombre"
                        v-model="producto.fk_categoria"></v-select>
                    <v-btn prepend-icon="mdi-check" color="indigo" block
                        @click="modificarProducto(producto.id)">Guardar</v-btn>
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
    name: 'ProductoView',
    data() {
        return {
            productos: [],
            alertaEstado: false,
            mensaje: '',
            producto: {},
            dialogOne: false,
            dialogTwo: false,
            marcas: [],
            caregorias: [],
            config: {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.getters.getToken
                }
            }
        }
    },
    methods: {
        agregarProducto() {
            axios.post('http://127.0.0.1:8000/api/productos/store', this.producto, this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        // Cambiar mensaje y visilidad de alerta 
                        this.alertaEstado = true
                        this.mensaje = response.data.data
                        // Limpiar formulario 
                        this.producto = {};
                        this.obtenerProductos();
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        obtenerProductos() {
            this.productos = []
            axios.get('http://127.0.0.1:8000/api/productos/select', this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        let res = response.data
                        this.productos = res.data
                        this.marcas = res.marcas
                        this.categorias = res.categorias
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        obtenerProducto(id, action) {
            // Cambiar la visibilidad del modal ver/editar 
            if (action == 1) {
                this.dialogOne = true
            } else {
                this.dialogTwo = true
            }

            axios.get(`http://127.0.0.1:8000/api/productos/find/${id}`, this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        let res = response.data
                        this.producto = res.data
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        modificarProducto(id) {
            axios.put(`http://127.0.0.1:8000/api/productos/update/${id}`, this.producto, this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        // Cambiar mensaje y visilidad de alerta 
                        this.alertaEstado = true
                        this.mensaje = response.data.data
                        // Ocultar cuadro de diálogo 
                        this.dialogTwo = false
                        // Recargar tabla 
                        this.obtenerProductos()
                    }
                })
                .catch(error => console.log('Ha ocurrido un error ' + error))
        },
        eliminarProducto(id) {
            axios.delete(`http://127.0.0.1:8000/api/productos/delete/${id}`, this.config)
                .then(response => {
                    if (response.data.code == 200) {
                        // Cambiar mensaje y visilidad de alerta 
                        this.alertaEstado = true
                        this.mensaje = response.data.data
                        // Recargar tabla 
                        this.obtenerProductos()
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
        this.obtenerProductos();
    },
} 
</script>