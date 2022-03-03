export default {
  template: `
      <div class="btns">
        <button @click="$emit('set-type' ,'note-txt')"><img src="assets/icons/text.png"></button>
        <button @click="$emit('set-type' ,'note-img')"><img src="assets/icons/image.png"></button>
        <button @click="$emit('set-type' ,'note-video')"><img src="assets/icons/video.png"></button>
        <button @click="$emit('set-type' ,'note-audio')"><img src="assets/icons/audio.png"></button>
        <button @click="$emit('set-type' ,'note-todo')"><img src="assets/icons/list.png"></button>
      </div>
    `,
}
