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
    </section>
  `,
  data() {
    return {
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
      bookService
        .getBookFromGoogle(this.query)
        .then((results) => (this.results = results.map((res) => res.volumeInfo)))
    },
  },
  computed: {},
}
