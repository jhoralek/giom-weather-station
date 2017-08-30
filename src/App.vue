<template>
  <div id="app">
    <div class="container">
      <nav class="navbar">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">GIOM 3000</a>
        </div>
        <div id="giomMenu" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="/data">
              <icon name="table" scale="1.5"></icon>&nbsp;Tabulka
            </a>
          </div>
          <div class="navbar-end">
            <a class="navbar-item is-hidden-desktop-only" href="https://github.com/jhoralek/giom-weather-station" target="_blank">
              <icon name="github" scale="1.5"></icon>
            </a>
          </div>
        </div>
      </nav>  
    </div>
    <section class="hero is-dark">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-vcentered">
              <div class="column">
                <p class="title">GIOM 3000</p>
                <p class="subtitle">Meteostanice Vlašim obec Bolinka</p>
              </div>
              <div class="column is-narrow">
                <div id="technology" class="box">
                  <div>
                    <span class="carbon-wrapp">
                      <a href="https://vuejs.org/" target="_blank" rel="noopener">
                        <img src="./assets/logo.png" class="vue-logo" alt="Vue.js" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-foot">
          <div class="container">
            <nav class="tabs is-boxed">
              <ul>
                <li><router-link to="/">Dashboard</router-link></li>
                <li><router-link to="today">Dnešní data</router-link></li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <section class="section">
          <router-view></router-view>
      </section>
      <footer class="footer">
        <div class="container">
          <div class="columns">
            <div class="column is-3">
                <div class="content">
                  
                </div>
            </div>
            <div class="column is-5">

            </div>
            <div class="column is-4">

            </div>
          </div>
        </div>
      </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.carbon-wrapp {
    font-size: 14px;
    text-align: left;
}

.vue-logo {
    display: block;
    height: 100px;
    width: 100px;
}

.carbon-text {
    display: block;
    color: #363636;
    line-height: 20px;
    padding: 15px 15px 35px 160px;
}

</style>
