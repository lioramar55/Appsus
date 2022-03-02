export default {
  template: `
        <section class="mail-filter">
        
            <form @submit.prevent="setFilter">
            <label>
            <input type="text" name="text" v-model="filterBy.byTxt" 
            placeholder="Search..." />
            </label>
              <button>search</button>
              </form>
             </section>
    `,
  data() {
    return {
      byTxt: '',
    }
  },
  methods: {
    setFilter() {
      this.$emit('text-filter', 'txt', this.byTxt)
    },
  },
}
