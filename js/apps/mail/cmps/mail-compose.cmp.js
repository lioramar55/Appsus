import { mailService } from '../services/mail-service.js'

export default {
  template: `
     <section class="new-mail compose-mail">
       <h1>Compose new mail</h1>
        <form @submit.prevent="onPostMail">
            <label>
            <input required placeholder="To" type="email" v-model="mail.to" />
            </label>
            <label>
            <input type="text" placeholder="Subject" v-model="mail.subject"/>
            </label>
            <textarea v-model="mail.body" rows="10" cols="30">
            </textarea> 
            <button>Send</button>
        </form>   
      </section>
    `,
  data() {
    return {
      mail: {
        from: 'Mahatma Appsus',
        to: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: Date.now(),
      },
    }
  },
  created() {
    this.mail.subject = this.$route.query.title
    this.mail.body = this.$route.query.body
  },

  methods: {
    onPostMail() {
      mailService.postMail({ ...this.mail }).then(this.$router.push('/mail'))
    },
  },
}
