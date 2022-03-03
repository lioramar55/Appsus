export default {
  template: `
        <section class="mail-filter">
          <label>
              <input v-on:keyup.enter="setFilter" type="text" name="text" v-model="byTxt" 
              placeholder="Search mail" />
          </label>
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
