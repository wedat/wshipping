<template>
  <div class="card card-primary card-outline">
    <div class="card-header">
      <h3 class="card-title">{{ $t('city.cityTasks') }}</h3>
    </div>
    <!-- /.card-header -->
    <!-- /.card-header -->
    <div class="card-body p-0">
      <table class="table table-striped projects">
        <thead>
          <tr>
            <th style="width: 10px">#</th>
            <th>{{ $t('form.senderName') }}</th>
            <th>{{ $t('form.senderPhone') }}</th>
            <th>{{ $t('form.receiverName') }}</th>
            <th>{{ $t('form.receiverPhone') }}</th>
            <th>{{ $t('form.price') }}</th>
            <th>{{ $t('form.createdAt') }}</th>
            <th>{{ $t('form.status') }}</th>
            <th style="width: 70px">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in cityTasks.data" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.sender.name}}</td>
            <td>{{ task.sender.phone}}</td>
            <td>{{ task.receiver.name}}</td>
            <td>{{ task.receiver.phone}}</td>
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
     <small v-show="cityTasks == ''"><center>{{ $t('notFound') }}</center></small>
     <pagination class="float-right" :data="cityTasks" @pagination-change-page="getCityTasks"></pagination>
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
    }
  },
  components: {
    TaskStatus
  },
  computed: {
    ...mapGetters(["currency"]),
    ...mapGetters("city", ["cityTasks"]),
  },
  mounted() {
    // this.$store.commit('city/setcityTasks', {});
  },
  created() {
    this.$store.commit('city/setCityID', this.$route.params.id);
    this.getCityTasks();
  },
  methods: {
    ...mapActions("city", ["getCityTasks"]),
  }
}
</script>
