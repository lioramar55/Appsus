export default {
    template: `
        <section class="mail-filter">
        
            <form @submit.prevent="setFilter">
            <label>Name:
            <input type="text" name="text" v-model="filterBy.byTxt" 
            placeholder="Name of the book.." />
            </label>
              <button>search</button>
              </form>
             </section>
    `,
    data() {
        return {
            filterBy: {
                byTxt: '',
            }
        };
    },
    methods: {
            setFilter() {
                this.$emit('filtered', {...this.filterBy});
            },
     
    }
}