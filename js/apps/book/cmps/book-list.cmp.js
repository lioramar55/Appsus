import bookPreview from './book-preview.cmp.js'

export default {
  props: ['books'],
  template: `
    <div class="books-container main-layout">
      <book-preview v-for="book in books" :key="book.id"
      :book="book"
      @bookDetails="onSelectBook(book)" />
    </div>
  `,
  data() {
    return {}
  },
  components: {
    'book-preview': bookPreview,
  },
  methods: {
    onSelectBook(book) {
      this.$emit('selected', book)
    },
  },
  computed: {},
}
