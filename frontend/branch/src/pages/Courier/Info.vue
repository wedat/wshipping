<template>
   <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{ $t('courier.couriersDetails') }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('home') }}</router-link>
                <li class="breadcrumb-item"><router-link to="/courier">{{ $t('courier.couriers') }}</router-link>
                  <li class="breadcrumb-item active">{{ $t('courier.couriersDetails') }}</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
          <Sidebar />
        <!-- /.col -->
        <div class="col-md-9">
          <router-view></router-view>
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
  import Sidebar from '../../layouts/courier/Sidebar.vue'

  export default {
    components: {
      Sidebar,
    },
  }
</script>
