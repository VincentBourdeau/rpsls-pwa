<template>
  <header class="navbar" :class="{ offline: !networkOnLine }">

  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
</style>
