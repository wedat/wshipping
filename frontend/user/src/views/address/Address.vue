<template>
  <div class="profile-page">

    <section class="section-profile-cover section-shaped my-0">
    <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </section>
  <section class="section section-lg pt-lg-0 section-contact-us">
            <div class="container">
                <div class="row justify-content-center mt--300">
                    <div class="col-lg-12 mt--150">
                        <card gradient="secondary" shadow body-classes="p-lg-5">
            <!-- Buttons -->
             <div class="float-right">
            <router-link :to="{name: 'addressCreate'}" class="btn btn-outline-info btn-sm btn-flat">{{ $t('new') }}</router-link>
            </div> <h3 class="h4 text-success font-weight-bold mb-4">{{ $t('addresses') }}</h3>

            <!-- Button styles -->
            <div class="row py-3 align-items-left">
 <table class="table table-striped">
            <thead>
              <tr>
                <th style="width: 10px">#</th>
                <th>{{ $t('form.name') }}</th>
                <th>{{ $t('form.city') }}</th>
                <th>{{ $t('form.district') }}</th>
                <th style="width: 240px">{{ $t('actions') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="address in addresses.data" :key="address.id">
                <td>{{ address.id }}</td>
                <td>{{ address.name }}</td>
                <td>{{ address.city.name }}</td>
                <td>{{ address.district.name }}</td>
                <td><div>
                  <router-link style="margin-right: 11px"  :to="{name: 'addressEdit', params: { id: address.id }}" class="btn btn-outline-info btn-sm btn-flat">{{ $t('edit') }}</router-link>
                  <base-button size="sm" class="btn btn-outline-danger btn-xs btn-flat" @click.prevent="deleteAddressConfirm(address.id)">{{ $t('delete') }}
                  </base-button></div>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          <ul class="pagination pagination-sm m-0 float-right">
            <pagination class="float-right" :data="addresses" @pagination-change-page="getAddresses"></pagination>
          </ul>
          </card>
                    </div>
                </div>
            </div>
        </section>
  </div>
</template>
<script>
 import { mapGetters, mapActions } from "vuex";
 import Swal from 'sweetalert2'
 window.Swal = Swal

 export default {
  data() {
    return {
      myaddresses: {}
    }
  },

  computed: {
    ...mapGetters("address", ["addresses"])
  },
  created() {
    this.getAddresses().then(() => {
        this.myaddresses = this.addresses
      });
  },
  methods: {
    ...mapActions("address", ["getAddresses","deleteAddress"]),

    deleteAddressConfirm(id){
      Swal.fire({
        title: this.$t('areYouSure'),
        text: this.$t('noRevert'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.$t('yesDelete')
      }).then((result) => {
        if (result.value) {
          this.deleteAddressConfirmed(id)
        }
      });
    },
    deleteAddressConfirmed: function(id) {
      this.deleteAddress(id).then(() => {
        this.myToast('success',this.$t('addressDeleted'));
      });
    }
  }
}
</script>
