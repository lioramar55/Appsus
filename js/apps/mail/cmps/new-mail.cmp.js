import { eventBus } from '../../../services/eventBus-service.js'

export default {
  template: `
     <section class="new-mail">
       <h1>Compose new mail</h1>
        <form @submit.prevent="onPostMail">
            <input required placeholder="To" type="email" v-model="mail.to" />
            <input type="text" placeholder="Subject" v-model="mail.subject"/>
            <textarea v-model="mail.body" rows="10" cols="30">
            </textarea> 
            <button>send</button>
        </form>   
        <button @click="$emit('close-modal')" class="close">X</button>
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
  created() {},

  methods: {
    onPostMail() {
      this.$emit('mail-sent', { ...this.mail })
      eventBus.emit('show-msg', { txt: 'Message sent', type: 'success' })
    },
  },
}
