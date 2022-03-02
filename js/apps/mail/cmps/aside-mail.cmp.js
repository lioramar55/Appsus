export default {
  template: `
        <aside class="aside-filter">
            <button @click="$emit('compose-mail')" class="compose btn">Compose</button>
            <ul class="clean-list">
                <li @click="$emit('status-filter','status',  'inbox')">
                    Inbox
                </li>
                <li @click="$emit('status-filter','status',  'sent')">
                    Sent
                </li>
                <li  @click="$emit('status-filter','isStared',  true)">
                    Starred
                </li>
                <li @click="$emit('status-filter','status',  'drafts')">
                    Drafts
                </li>
                <li @click="$emit('status-filter','status',  'trash')">
                    Trash
                </li>
            </ul>
        </aside>
    `,
  data() {
    return {
      filterBy: {
        status: '',
      },
    }
  },
  methods: {},
}
