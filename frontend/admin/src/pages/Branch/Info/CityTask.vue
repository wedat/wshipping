<template>
  <div class="card card-primary card-outline">
    <div class="card-header">
      <h3 class="card-title">{{ $t('branch.branchCityTasks') }}</h3>
      <div class=" float-right col-sm-6" >
        <multiselect v-model="branch.city" :deselect-label="$t('select.cantRemove')" track-by="name" label="name" :placeholder="$t('select.selectCity')" :options="branchCity" :searchable="true" :allow-empty="false" @input='getCityTasks'>
          <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong> {{ $t('select.selected') }}<strong>  {{ option.language }}</strong></template>
        </multiselect>
      </div>
      <!-- /.card-tools -->
    </div>
    <!-- /.card-header -->
    <!-- /.card-header -->
    <div class="card-body p-0">
      <table class="table table-striped projects">
        <thead>
          <tr>
            <th style="width: 10px">#ID</th>
            <th>{{ $t('form.description') }}</th>
            <th>{{ $t('form.price') }}</th>
            <th>{{ $t('form.createdAt') }}</th>
            <th>{{ $t('form.status') }}</th>
            <th style="width: 70px">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
         <tr v-for="task in branchCityTasks.data" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.description}}</td>
            <td>{{ task.price}} {{currency}}</td>
            <td>{{ task.created_at | moment("MMMM Do YYYY") }}</td>
            <td>
                 <task-status v-show="!task.deleted_at" :status=task.status />
              <span v-show="task.deleted_at" class="badge badge-danger">{{ $t('form.deleted') }}</span>
            </td>
            <td>
              <router-link style="margin-right: 11px"  :to="{name: 'EditTask', params: { id: task.id }}" class="btn btn-outline-info btn-xs btn-flat"><i class="fas fa-edit"></i></router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer">
     <small v-show="empty"><center>{{ $t('select.selectCity') }}</center></small>
     <small v-show="!empty && branchCityTasks == ''"><center>{{ $t('notFound') }}</center></small>
      <pagination class="float-right" :data="branchCityTasks" @pagination-change-page="getBranchCityTasks"></pagination>
   </div>
 </div>
 <!-- /.card -->
</template>
<script>
 import TaskStatus from '../../../components/TaskStatus.vue'
 import { mapGetters, mapActions} from "vuex";
 export default {
  data() {
    return {
      empty: true,
    }
  },
  components: {
    TaskStatus
  },
  computed: {
    ...mapGetters(["currency"]),
    ...mapGetters("branch", ["branch","branchCity","branchCityTasks"]),
  },
  created() {
    this.$store.commit("branch/setBranchCityTasks", {});
    this.$store.commit("branch/setBranch", {}); //bu olmazsa detailsden birden fazla city id gelir city task hata verir
    this.getBranchCities();
  },
  methods: {
    ...mapActions("branch", ["getBranchCity","getBranchCityTasks"]),
    getBranchCities: function() {
      this.getBranchCity(this.$route.params.id).then(() => {

      });
    },
    getCityTasks: function() {
      this.$store.commit("branch/setBranchCityID", this.branch.city.id);
      this.getBranchCityTasks().then(() => {
        this.empty = false;
      });
    },
  }
}
</script>
