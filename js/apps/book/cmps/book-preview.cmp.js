import { utilService } from '../../../services/util-service.js'

export default {
  props: ['book'],
  template: `
    <div class="book">
      <router-link class="book-img" :to="'/book/'+ book.id">
        <img :src="book.thumbnail">
      </router-link>
      <h2>{{book.title}}</h2>
      <h3>{{formattedBookPrice}}</h3>
      <router-link class="btn" :to="'/book/'+ book.id">
        Details
      </router-link>
    </div>
  `,
  data() {
    return {}
  },
  components: {},
  methods: {},
  computed: {
    formattedBookPrice() {
      return utilService.formatPrice(this.book.listPrice)
    },
  },
}
