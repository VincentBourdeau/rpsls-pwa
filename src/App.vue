<template>
  <div id="app">
    <nav-bar></nav-bar>

    <main class="main-wrapper">
      <router-view />
    </main>

    <new-content-available-toastr
      v-if="newContentAvailable"
      class="new-content-available-toastr"
      :refreshing-app="refreshingApp"
      @refresh="serviceWorkerSkipWaiting"
    ></new-content-available-toastr>
    <apple-add-to-home-screen-modal
      v-if="showAddToHomeScreenModalForApple"
      class="apple-add-to-home-screen-modal"
      @close="closeAddToHomeScreenModalForApple(false)"
    >
    </apple-add-to-home-screen-modal>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import NewContentAvailableToastr from '@/components/NewContentAvailableToastr'
import AppleAddToHomeScreenModal from '@/components/AppleAddToHomeScreenModal'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { NavBar, NewContentAvailableToastr, AppleAddToHomeScreenModal },
  computed: {
    ...mapGetters('app', ['newContentAvailable']),
    ...mapState('app', ['showAddToHomeScreenModalForApple', 'refreshingApp'])
  },
  methods: mapActions('app', [
    'closeAddToHomeScreenModalForApple',
    'serviceWorkerSkipWaiting'
  ])
}
</script>

<style lang="scss">
@import '@/theme/variables.scss';
@import '@/theme/btns.scss';

* {
  box-sizing: border-box;
}

html,
body {
  position: relative;
  width: 100vw;
  height: 100vh;
}

html {
  background: $radial-gradient-alternate;
  background: -moz-linear-gradient(top,  $radial-gradient 0%, $radial-gradient-alternate 100%);
  background: -webkit-linear-gradient(top,  $radial-gradient 0%,$radial-gradient-alternate 100%);
  background: linear-gradient(to bottom,  $radial-gradient 0%,$radial-gradient-alternate 100%);

  font-family: $font-stack;
  font-weight: 300;
}

body {
  margin: 0;

  a {
    font-weight: 500;
    text-decoration: none;
    color: $scissors;
  }
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
}
</style>
