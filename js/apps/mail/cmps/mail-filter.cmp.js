export default {
  template: `
        <section class="mail-filter">
        
            <form @submit.prevent="setFilter">
            <label>Name:
            <input type="text" name="text" v-model="byTxt" 
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
