export default {
  template: `
    <header class="app-header">
      <div class="logo">LOGO</div>
      <nav>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
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
      </nav>
    </header>
    `,
}
