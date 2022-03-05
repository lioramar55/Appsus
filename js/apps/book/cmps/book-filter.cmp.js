import { bookService } from '../services/book-service.js'
export default {
  template: `
    <section class="book-filter main-layout">
      <form class="search" @submit.prevent="onSearch">
          <input type="text" v-model="query" placeholder="Search for book">          
          <button>Search</button>
          <div v-if="results.length" class="result-list">
            <ul class="search-results clean-list">
              <li v-for="res in results" 
                class="result">
                {{res.title}}
                <img @click="addBook(res)" class="plus" src="assets/icons/plus.png">
              </li>
            </ul>
          </div>
      </form>
      <form @submit.prevent="onSetFilter">
        <label >
          Search
          <input type="text" placeholder="Search by string"  v-model="filterBy.name">
        </label>
        <label>
          Min:
          <input type="number" min="0" max="300" v-model="filterBy.price.min">
        </label>
        <label>
          Max:
          <input type="number" min="0" max="300" v-model="filterBy.price.max">
        </label>
        <button>Filter</button>
      </form>
    </section>
  `,
  data() {
    return {
      filterBy: {
        name: '',
        price: { min: '', max: '' },
      },
      query: '',
      results: [],
    }
  },
  components: {},
  methods: {
    addBook(book) {
      bookService.postBook(book).then(() => {
        this.$emit('added-book')
        this.results = []
        this.query = ''
      })
    },
    onSearch() {
      const userQuery = this.query.split(' ').join('%20')
      bookService
        .getBookFromGoogle(userQuery)
        .then((results) => (this.results = results.map((res) => res.volumeInfo)))
    },
    onSetFilter() {
      this.$emit('filtered', JSON.parse(JSON.stringify({ ...this.filterBy })))
    },
  },
  computed: {},
}
