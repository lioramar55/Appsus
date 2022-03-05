export default {
  template: `
  <header >
    <div class="main-layout">
      <div class="logo">
        <router-link to="/">
          Miss Books
        </router-link>
        </div>
        <nav>
          <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/book">Books</router-link>
          </li>
          <li>
            <router-link to="/about">About</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  `,
}
