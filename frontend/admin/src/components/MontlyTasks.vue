<script>
  import { Bar } from 'vue-chartjs'

  export default {
    extends: Bar,
    props: ['data'],
    watch: {
      data:{
        deep: true,
        handler(){
          this.renderChart({
            labels: [this.$t('month.january'), this.$t('month.february'), this.$t('month.march'), this.$t('month.april'), this.$t('month.may'), this.$t('month.june'), this.$t('month.july'), this.$t('month.august'), this.$t('month.september'), this.$t('month.october'), this.$t('month.november'), this.$t('month.december')],
            datasets: [
            {
              label: this.$t('task.createdTaskNumber'),
              backgroundColor: '#93E993',
              data: this.data
            }
            ]
          })
        }
      }
    },

  }
</script>
