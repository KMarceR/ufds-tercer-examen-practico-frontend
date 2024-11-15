<template>
    <v-container fluid>
        <h1>Productos</h1>
        <v-row>
            <!-- Formulario para agregar cliente -->
            <v-col xs="12" sm="3" md="3" lg="3" xl="3" xxl="3">
                <v-text-field label="Nombre" maxlength="50" counter color="indigo" clearable
                    placeholder="Nombre de la categoria"></v-text-field>
                <v-btn prepend-icon="mdi-check" color="indigo" block>Agregar</v-btn>
            </v-col>
            <!-- Tabla para mostrar clientes -->
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
                                <tr>
                                    <th>1</th>
                                    <th>Marcela</th>
                                    <th>Marcela</th>
                                    <th>Marcela</th>
                                    <th>Marcela</th>
                                    <th>
                                        <v-btn-group>
                                            <v-btn icon="mdi-eye" color="indigo"></v-btn>
                                            <v-btn icon="mdi-pencil" color="green"></v-btn>
                                            <v-btn icon="mdi-delete" color="red"></v-btn>
                                        </v-btn-group>
                                    </th>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'ProductoView'
} 
</script>