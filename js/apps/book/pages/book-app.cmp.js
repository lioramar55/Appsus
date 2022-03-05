import bookDetails from '../cmps/book-details.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import { bookService } from '../services/book-service.js'

export default {
  template: `
      <section v-if="books" class="book-app">
        <book-filter v-if="!selectedBook"
          @added-book="addBook"
          @filtered="setFilter"></book-filter>
        <book-list v-if="!selectedBook" :books="booksToShow" @selected="selectBook" />
        <div  v-if="selectedBook" class="book-details">
          <book-details :book="selectedBook"
          @close="closeBookDetails"></book-details> 
        </div>
      </section>
      <div v-else class="loading">Loading...</div>
    `,
  components: {
    bookFilter,
    bookDetails,
    bookList,
  },
  data() {
    return {
      books: null,
      filterBy: null,
      selectedBook: null,
    }
  },
  created() {
    bookService.query().then((books) => {
      this.books = books
    })
  },
  methods: {
    addBook() {
      bookService.query().then((books) => {
        this.books = books
      })
    },
    selectBook(book) {
      this.selectedBook = book
    },
    closeBookDetails() {
      this.selectedBook = null
    },
    setFilter(filterBy) {
      this.filterBy = filterBy
    },
  },
  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books
      let books = this.books
      if (this.filterBy.price.min) {
        books = books.filter((book) => book.listPrice.amount >= this.filterBy.price.min)
      }
      if (this.filterBy.price.max) {
        books = books.filter((book) => book.listPrice.amount <= this.filterBy.price.max)
      }
      if (this.filterBy.name) {
        let regex = new RegExp(this.filterBy.name, 'i')
        books = books.filter((book) => {
          if (regex.test(book.name)) return book
          if (regex.test(book.title)) return book
          if (regex.test(book.subtitle)) return book
        })
      }
      return books
    },
  },
}
