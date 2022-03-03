import mailList from '../cmps/mail-list.cmp.js'
import mailDetails from '../cmps/mail-details.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import asideMail from '../cmps/aside-mail.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'
import { mailService } from '../services/mail-service.js'

export default {
  template: `
    <section class="mail-app main-layout">

      <mail-filter @text-filter="setFilter"></mail-filter>
      <div class="mail-layout">
        <mail-list  @email-starred="onEmailStar" @email-selected="onOpenEmail" :emails="emails"></mail-list>
        <aside-mail @compose-mail="isComposeMail = true" @status-filter="setFilter"></aside-mail>
      </div>
      <new-mail v-if="isComposeMail"
       @close-modal="isComposeMail = false" @mail-sent="sendNewMail"></new-mail>
    </section>
  `,
  data() {
    return {
      emails: [],
      selectedEmail: null,
      email: null,
      criteria: {
        status: 'inbox',
        txt: '',
        isRead: null,
        isStared: null,
        // lables: ['important', 'romantic']
      },
      isComposeMail: false,
    }
  },
  created() {
    mailService.query({ ...this.criteria }).then((emails) => (this.emails = emails))
  },
  components: {
    mailList,
    mailDetails,
    mailFilter,
    asideMail,
    newMail,
  },
  methods: {
    onOpenEmail(email) {
      email.isRead = true
      mailService.updateMail(email).then((email) => {
        this.selectedEmail = email
        mailService.query().then((emails) => {
          this.emails = emails
          this.$router.push(`/mail/details/${email.id}`)
        })
      })
    },

    onEmailStar(email) {
      email.isStarred = !email.isStarred
      mailService.updateMail(email).then((updatedEmail) => {
        let idx = this.emails.findIndex((email) => email.id === updatedEmail.id)
        this.emails.splice(idx, 1, updatedEmail)
      })
    },

    sendNewMail(newEmail) {
      this.isComposeMail = !this.isComposeMail
      mailService.postMail(newEmail)
      .then(mailService.query({...this.criteria})
      .then((emails) => (this.emails = emails)))
    },

    setFilter(key, status) {
      this.criteria[key] = status
      mailService.query({ ...this.criteria }).then((emails) => (this.emails = emails))
    },
  },
}
