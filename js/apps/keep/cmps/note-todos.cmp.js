export default {
  props: ['note'],
  template: `
  <div @click="$emit('inform','open-edit-note', note)" class="note-todos">
    <h2>{{label}}</h2>
    <ul class="clean-list">
      <li v-for="todo in note.info.todos" 
      @click.stop="onToggleTodo(todo.txt)" 
      :class="{done: todo.doneAt}">
      {{todo.txt}} 
      <span v-if="todo.doneAt" class="time">{{todo.doneAt}}</span>
    </li>
  </ul>
</div>
  `,

  created() {},
  methods: {
    onToggleTodo(txt) {
      this.$emit('inform', 'toggle-todo', txt, this.note)
    },
    isTodoDone(isDone) {
      return isDone ? 'done' : ''
    },
  },
  computed: {
    formatTime() {
      let date = new Date(this.note.info.todos.doneAt)
      return `${date.getUTCDate()}`
    },
    label() {
      return this.note.info.label ? this.note.info.label : 'Label placeholder'
    },
  },
}
