export default {
  template: `
        <section class="mail-filter">
        <div class="wrap">
          <label>
              <input v-on:keyup.enter="setFilter('txt')" type="text" name="text" v-model="filterBy.txt" 
              placeholder="Search for email" />
          </label>
            <select value="All" @change="setFilter('isRead')" v-model="filterBy.isRead">
              <option >All</option>
              <option >Read</option>
              <option >Unread</option>
            </select>
            </div>
            <div class="wrap">
            <button @click="$emit('set-sort','title')">Sort by title</button>
            <button @click="$emit('set-sort','date')">Sort by date</button> 
            </div>    
            </section>
    `,
  data() {
    return {
      filterBy: {
        txt: '',
        isRead: 'All',
      },
    }
  },
  methods: {
    setFilter(filterBy) {
      this.$emit('set-filter', filterBy, this.filterBy[filterBy])
    },
  },
}
