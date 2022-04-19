<template>
  <div>
    <b-card title="Mi Agenda">
      <b-container fluid>
        <b-row>
          <b-col md="6" lg="4">
            <b-form-group
              label="Mostrar Registros"
              label-for="filter-input"
              label-cols-lg="4"
              label-cols-md="12"
              label-cols-sm="12"
              label-align-md="left"
              label-align-lg="left"
              label-align-sm="center"
            >
              <b-form-select 
              v-model="perPage" 
              :options="options"
              >
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6" lg="6" offset-lg="2" class="mb-1">
            <b-form-group
              label="Buscar"
              label-for="filter-input"
              label-cols-lg="6"
              label-cols-md="12"
              label-cols-sm="12"
              label-align-md="right"
              label-align-lg="right"
              label-align-sm="center"
              class="mb-1"
            >
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Escriba para buacar"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <b-table
          id="miagenda-table"
          striped
          hover
          :items="items"
          :fields="fields"
          :sort-by= false
          :sort-desc= false
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          responsive
          @filtered="onFiltered"
        >
        <template #cell(actions)>
        <b-button-group>
          <b-button
            variant="primary"
            @click="editItem(item)"
            icon="editIcon"
          >
          </b-button>
        </b-button-group>
        </template>

        </b-table>
        <div class="overflow-auto mt-2">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="miagenda-table"
            align="center"
          ></b-pagination>
        </div>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardText,
  BLink,
  BTable,
  BPagination,
  BFormInput,
  BFormGroup,
  BFormSelect,
  BRow,
  BButton,
  BButtonGroup,
  BCol,
} from "bootstrap-vue";
import miAgenda from "@auth/miagenda";

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BTable,
    BPagination,
    BFormInput,
    BFormGroup,
    BFormSelect,
    BRow,
    BCol,
    BButton,
    BButtonGroup
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      filter: null,
      options: [
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 20, text: "20" },
        { value: 50, text: "50" },
      ],
      filterOn: [],
      fields: [
        {
          key: "paciente.nombre",
          label: "Paciente",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "paciente.direccion",
          label: "Direccción",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "paciente.barrio",
          label: "Barrio",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "paciente.telefono",
          label: "Telefono",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "ordentrabajo_id",
          label: "Orden de trabajo",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "ordenservicio_id",
          label: "Orden de servicio",
          sortable: false,
          sortDirection: "asc",
        },
        {
          key: "servicio",
          label: "Servicio",
          sortable: false,
          sortDirection: "asc",
        },
        {
          key: "ordentrabajo_validahasta",
          label: "Valido Hasta",
          sortable: false,
          sortDirection: "asc",
        },
        {
          key: "actividades_asignadas",
          label: "Asig.",
          sortable: false,
          sortDirection: "asc",
        },
        {
          key: "actividades_realizadas",
          label: "Real.",
          sortable: false,
          sortDirection: "asc",
        },
        {
          key: "observaciones",
          label: "Obs.",
          sortable: false,
          sortDirection: "asc",
        },
        {
          key: "firma",
          label: "Firma.",
          sortable: false,
          sortDirection: "asc",
        },
        {
          key: "actions",
          label: "Action.",
          sortable: false,
          sortDirection: "asc",
        },
      ],
      items: [],
    };
  },
  created() {
    document.title = "Mi Agenda - Home Healt Care";
  },
  computed: {
    items() {
      this.filter ? this.items.filter(item =>
          item.paciente.nombre.includes(this.filter) ||
            item.paciente.direccion.includes(this.filter) ||
            item.paciente.barrio.includes(this.filter) ||
            item.paciente.telefono.includes(this.filter) ||
            item.ordentrabajo_id.includes(this.filter) ||
            item.ordenservicio_id.includes(this.filter) ||
            item.servicio.includes(this.filter) ||
            item.ordentrabajo_validahasta.includes(this.filter) ||
            item.actividades_asignadas.includes(this.filter) ||
            item.actividades_realizadas.includes(this.filter)) : this.items;    
    },
    rows() {
      return this.items.length;
    },
  },
  mounted() {
    this.miAgenda();
  },
  methods: {
    async miAgenda() {
      try {
        await miAgenda.miAgenda().then((res) => {
            this.items = res.data;
          });
      } catch (error) {}
    },
  },
};
</script>

<style></style>
