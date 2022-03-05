import { bookService } from '../services/book-service.js'
import { utilService } from '../../../services/util-service.js'
import bookReviews from './book-reviews.cmp.js'
import longText from './long-text.cmp.js'
import reviewAdd from './review-add.cmp.js'

export default {
  template: `
    <section v-if="book && !isLoading" class="book-details main-app main-layout">
      <div class="img">
        <img :src="imgUrl" >
        <div v-if="book.listPrice.isOnSale" class="sale">Sale</div>
      </div>
      <div class="details">
        <h2>{{book.title}}</h2>
        <h3>{{book.subtitle}}</h3>
        <h4 v-for="author in book.authors" :key="author">{{author}}</h4>
        <h4>{{published}}</h4>
        <h4>{{descLen}}</h4>
        <long-text :txt="desc"></long-text>
        <h3 :class="price">{{formattedBookPrice}}</h3>
        <div class="btn-section">
          <button @click="isReview=true" class="btn">Add a review</button>
          <router-link  to="/book" class="btn">Close</router-link>
        </div>  
      </div>
      <book-reviews 
       :reviews="book.reviews" @book-updated="bookUpdated"
       :book="book" class="review-section" ></book-reviews>
      <review-add v-if="isReview"
       @review-added="reviewAdded"
       @close-review="isReview = !isReview"
       :book="book" ></review-add>
    </section>
  `,
  data() {
    return {
      isLoading: true,
      imgUrl: '',
      book: null,
      isReview: false,
    }
  },
  created() {
    let elImg = new Image()
    bookService.getBookById(this.$route.params.bookId).then((book) => {
      this.book = book
      elImg.src = this.book.thumbnail
    })
    elImg.onload = () => {
      this.isLoading = false
      this.imgUrl = this.book.thumbnail
    }
  },
  mounted() {},
  components: {
    reviewAdd,
    longText,
    bookReviews,
  },
  methods: {
    reviewAdded(updatedBook) {
      bookService.updateBook(updatedBook).then((book) => {
        this.isReview = !this.isReview
        this.book = book
      })
    },
    bookUpdated(book) {
      this.book = book
    },
  },
  computed: {
    desc() {
      if (!this.book.description) return
      return this.book.description
    },
    published() {
      const date = new Date()
      let msg = date.getFullYear() - this.book.publishedDate >= 10 ? 'Veteran Book' : 'New!'
      return (msg += ', published at ' + this.book.publishedDate)
    },
    formattedBookPrice() {
      return utilService.formatPrice(this.book.listPrice)
    },
    descLen() {
      if (!this.book.description) return
      let len = this.book.description.length
      return len > 500 ? 'Long reading' : len > 100 ? 'Decent reading' : 'Light reading'
    },
    price() {
      return this.book.listPrice.amount > 150
        ? 'red'
        : this.book.listPrice.amount < 20
        ? 'green'
        : ''
    },
  },
}
