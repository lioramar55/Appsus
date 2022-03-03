export default {
  template: `
     <section class="new-mail">
        <form @submit.prevent="onPostMail">
            <label>
            <input required placeholder="To" type="email" v-model="mail.to" />
            </label>
            <label>
            <input type="text" placeholder="Subject" v-model="mail.subject"/>
            </label>
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
    },
  },
}
