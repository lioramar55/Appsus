import mailList from '../cmps/mail-list.cmp.js'
import mailDetails from '../cmps/mail-details.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import asideMail from '../cmps/aside-mail.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'
import { mailService } from '../services/mail-service.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
  template: `
    <section class="mail-app main-mail-layout">
      <mail-filter @set-sort="setSort" @set-filter="setFilter"></mail-filter>
      <div class="mail-layout">
        <div class="side-content-container">
      <aside-mail @compose-mail="isComposeMail = true" @status-filter="setFilter"></aside-mail>
        <!-- <div>Unread {{unRead}}</div> -->
        </div>
        <mail-list @delete-email="onDeleteEmail"  @email-starred="onEmailStar" @email-selected="onOpenEmail" :emails="emails"></mail-list>
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
      sort: {
        by: '',
        dir: 1,
      },
      isComposeMail: false,
      unRead: null,
    }
  },
  created() {
    mailService
      .query({ ...this.criteria })
      .then((emails) => (this.emails = emails))
      .then((emails) => emails.filter((email) => !email.isRead))
      .then((unReadedEmails) => (this.unRead = unReadedEmails.length))
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
      mailService
        .updateMail(email)
        .then((updatedEmail) => {
          let idx = this.emails.findIndex((email) => email.id === updatedEmail.id)
          this.emails.splice(idx, 1, updatedEmail)
        })
        .then(this.updateEmails)
    },

    sendNewMail(newEmail) {
      this.isComposeMail = !this.isComposeMail
      mailService.postMail(newEmail).then(this.updateEmails)
    },

    updateEmails() {
      mailService.query({ ...this.criteria }).then((emails) => (this.emails = emails))
    },

    setFilter(key, status) {
      this.criteria[key] = status
      this.updateEmails()
    },

    setSort(sortBy) {
      if (this.sort.by === sortBy) this.sort.dir = -1 * this.sort.dir
      if (sortBy === 'title') {
        this.sort.by = sortBy
        this.emails.sort((a, b) => a.subject.localeCompare(b.subject) * this.sort.dir)
      }
      if (sortBy === 'date') {
        this.sort.by = sortBy
        this.emails.sort((a, b) => (b.sentAt - a.sentAt) * this.sort.dir)
      }
    },

    onDeleteEmail(email) {
      console.log(email)
      mailService.deleteMail({ ...email })
      .then(this.updateEmails)
      .then(eventBus.emit('show-msg', { txt: 'Mail deleted', type: 'success' }))
    }
  },
}
