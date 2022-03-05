import { bookService } from '../services/book-service.js'

export default {
  props: ['book'],
  template: `
    <section class="review-add">
      <h2>Add a review</h2>
      <form  @submit.prevent="onSubmit">
        <label >
          First name:
          <input type="text" placeholder="Enter your first name"
            v-model="review.name" required>
        </label>
          <label >
            Rating: 
          <select v-model="review.rate" required>
            <option v-for="rate in rates" :value="rate">{{'*'.repeat(rate)}}</option>
          </select>
        </label>
        <label >
          Read at:
          <input type="date" v-model="review.date" required>
        </label>
        <label>Your review:
          <textarea cols="30" rows="10" v-model="review.text" required></textarea>
        </label>
        <button>Submit</button>
      </form>
      <button @click="closeReview" class="close-review">X</button>
    </section>
  `,
  data() {
    return {
      review: {
        name: '',
        rate: '',
        date: new Date().toISOString().slice(0, 10),
        text: '',
      },
      rates: [1, 2, 3, 4, 5],
    }
  },
  created() {},
  methods: {
    onSubmit() {
      this.book.reviews.push(this.review)
      this.$emit('review-added', this.book)
      this.review = {
        name: '',
        rate: '',
        date: new Date().toISOString().slice(0, 10),
        text: '',
      }
    },

    closeReview() {
      this.$emit('close-review')
    },
  },
  computed: {},
}
