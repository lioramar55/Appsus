export default {
  //          "

  props: ['email'],
  template: `
    <tr @mouseover="hovered = true"
        @mouseleave="hovered = false" :class="isRead"
      @click.stop="onOpenEmail"  
      class="mail-preview">
      <td @click.stop="$emit('email-starred')"
        ><img :src="starImg"></td>
      <td  class="from">{{email.from}}</td>
      <td class="content">
        <span class="subj">{{subject}} - </span>
        <span class="body">{{formmatedBody}}</span>
      </td>
      <td class="time-sent">{{sentAt}}</td> 
      <tr><button v-if="hovered" @click.stop="$emit('delete-email')"><img title="Delete" src="assets/icons/trash.png" alt=""></button></tr>

    </tr>
    
  `,

  
  data() {
    return {
      hovered: false
    }
  },
  created() {},
  computed: {
    isRead() {
      return this.email.isRead ? 'read' : 'unread'
    },
    starImg() {
      return this.email.isStarred ? 'assets/icons/starred.png' : 'assets/icons/star.png'
    },
    subject() {
      return this.email.subject ? this.email.subject : 'No subject'
    },
    formmatedBody() {
      const text =
        this.email.body.length > 50 ? this.email.body.slice(0, 48) + '...' : this.email.body
      return text
    },
    sentAt() {
      let date = new Date(this.email.sentAt)
      let formmatedDate = date.toLocaleString('default', { month: 'short', day: 'numeric' })
      return `${formmatedDate}`
    },
  },

  methods: {
    onOpenEmail() {
      this.$emit('open-email')
    }
  },

}
