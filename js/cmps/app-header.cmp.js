export default {
  template: `
    <header class="app-header">
      <section class="main-layout flex-space-between">
        <div class="logo">APPSUS</div>
        <nav>
          <ul class="nav-list clean-list">
            <li>
              <router-link @click="closeMenu" to="/">Home</router-link>
            </li>
            <li>
              <router-link @click="closeMenu" to="/about">About</router-link>
            </li>
            <li>
              <router-link @click="closeMenu" to="/book">Books</router-link>
            </li>
            <li>
              <router-link @click="closeMenu" to="/keep">Keep</router-link>
            </li>        
            <li>
              <router-link @click="closeMenu" to="/mail">Mail</router-link>
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
    closeMenu() {
      document.body.classList.remove('show-menu')
    },
  },
}
