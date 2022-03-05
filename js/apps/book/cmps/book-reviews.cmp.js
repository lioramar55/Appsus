import { bookService } from '../services/book-service.js'

export default {
  props: ['book', 'reviews'],
  template: `
    <section class="book-reviews">
      <h1>Book Reviews</h1>
      <div v-if="isReviewsExist"  class="reviews">
        <div v-for="(review, idx) in reviews" class="review">
          <p><span>From:</span> {{review.name}}</p>
          <p><span>At:</span> {{review.date}}</p>
          <p><span>Rate:</span> {{review.rate}}</p>
          <p><span>Review:</span> {{review.text}}</p>
          <button @click="removeReview(idx)">X</button>
        </div>
      </div>
      <div v-else  class="no-reviews">
        <h1>This book still has no reviews, try being the first!</h1>
      </div>
    </section>
  `,
  data() {
    return {}
  },
  components: {},
  methods: {
    removeReview(idx) {
      bookService.removeReview(idx, this.book).then((book) => this.$emit('book-updated', book))
    },
  },
  computed: {
    isReviewsExist() {
      return this.reviews && this.reviews.length > 0
    },
  },
}
