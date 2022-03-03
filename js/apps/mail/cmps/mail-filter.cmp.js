export default {
  template: `
        <section class="mail-filter">
        
            <form @submit.prevent="setFilter">
            <label>
            <img src="assets/icons/gmaillogo.png"> 
            <input v-on:keyup.enter="submit" type="text" name="text" v-model="byTxt" 
            placeholder="Search mail" />
            </label>
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
