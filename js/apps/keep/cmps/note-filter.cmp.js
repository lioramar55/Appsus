export default {
  template: `
    <section class="note-filter">
      <label>
          <input @keyup.enter="setFilter('txt')" type="text" v-model="filterBy.txt" 
          placeholder="Search for a note" />
      </label>
      <select @change="setFilter('type')" v-model="filterBy.type">
        <option value="all">All</option>
        <option value="note-txt">Text</option>
        <option value="note-todos">Todos</option>
        <option value="note-img">Images</option>
        <option value="note-video">Videos</option>
        <option value="note-audio">Audio</option>
      </select>
    </section>
    `,
  data() {
    return {
      filterBy: {
        txt: '',
        type: 'all',
      },
    }
  },
  methods: {
    setFilter(filterBy) {
      this.$emit('set-filter', filterBy, this.filterBy[filterBy])
    },
  },
}
