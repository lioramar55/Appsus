export default {
  template: `
    <header class="app-header">
      <section class="main-layout flex-space-between">
        <div class="logo">APPSUS</div>
        <nav>
          <ul class="nav-list clean-list">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/about">About</router-link>
            </li>
            <li>
              <router-link to="/book">Books</router-link>
            </li>
            <li>
              <router-link to="/keep">Keep</router-link>
            </li>        
            <li>
              <router-link to="/mail">Mail</router-link>
            </li>        
          </ul>
          <button @click="showMenu" class="nav-burger"><img src="assets/icons/nav-burger.png"></button>
        </nav>
      </section>
    </header>
    `,
  methods: {
    showMenu() {
      document.body.classList.toggle('show-menu')
    },
  },
}
