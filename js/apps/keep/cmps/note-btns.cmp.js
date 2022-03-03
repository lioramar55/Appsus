export default {
  template: `
    <section class="note-edit">
      <div class="btns">
        <button @click="$emit('edit-action','pinned')">
          <img  src="assets/icons/pin.png">
        </button>
        <button @click="$emit('edit-action','duplicated')">
          <img  src="assets/icons/duplicate.png">
        </button>
          <button @click="onPaint">
            <img  src="assets/icons/paint.png">
          </button>
       
        <button @click="$emit('edit-action','edit')">
          <img  src="assets/icons/edit.png">
        </button>
        <button @click="$emit('edit-action','export')">
          <img  src="assets/icons/export.png">
        </button>
      </div>
      <div v-if="colorPalleteOpen" class="color-picker">
        <div v-for="color in colors" 
        :style="{'background-color': color}" 
        @click="setPaintColor(color)" class="color"></div>
      </div>
    </section>
  `,
  data() {
    return {
      colorPalleteOpen: false,
      colors: ['#333', '#999', 'salmon', 'lightgreen', 'lightcyan'],
    }
  },
  methods: {
    onPaint() {
      this.colorPalleteOpen = !this.colorPalleteOpen
      // this.$emit('edit-action', 'paint')
    },
    setPaintColor(color) {
      this.$emit('edit-action', 'paint', color)
      this.colorPalleteOpen = !this.colorPalleteOpen
    },
  },
}
