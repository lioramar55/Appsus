import mailPreview from '../cmps/mail-preview.cmp.js'
import { mailService } from '../services/mail-service.js'

export default {
  template: `
    <section class="mail-app">
      <h1>mail app</h1>
      <table>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <mail-preview v-for="email in emails"
            :email="email"></mail-preview>
        </tbody>
      </table>
    </section>
  `,
  data() {
    return {
      emails: [],
    }
  },
  created() {
    mailService.query().then((emails) => (this.emails = [...emails]))
  },
  components: {
    mailPreview,
  },
}
