<template>
  <img v-if="kind === 'scissors'" src="@/assets/img/app/icon-scissors.svg" alt="Scissors">
  <img v-else-if="kind === 'spock'" src="@/assets/img/app/icon-spock.svg" alt="Spock">
  <img v-else-if="kind === 'paper'" src="@/assets/img/app/icon-paper.svg" alt="Paper">
  <img v-else-if="kind === 'lizard'" src="@/assets/img/app/icon-lizard.svg" alt="Lizard">
  <img v-else-if="kind === 'rock'" src="@/assets/img/app/icon-rock.svg" alt="Rock">
</template>

<script>
  export default {
    props: {
      kind: {
        type: String,
        default: 'scissors'
      }
    }
  }
</script>
