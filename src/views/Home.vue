<template>
  <div id="game-board" class="game-wrapper">

    <!-- Score Board -->
    <aside class="score-board">
      <h1 class="score-heading">
        <span>Rock</span>
        <span>Paper</span>
        <span>Scissors</span>
        <span>Lizard</span>
        <span>Spock</span>
      </h1>

      <div class="score-number">
        <h2 class="score-number-heading">
          Score
        </h2>
        <span class="score-number-text">
          {{ score }}
        </span>
      </div>
    </aside>

    <!-- Game Controls Btns -->
    <section
      v-if="gameState === 'player'"
      class="game-controls-btns"
      :style="'background-image: url('+pentagonImg+');'"
      :what="pentagonImg"
    >
      <div class="controls-row upper">
        <button @click.prevent="playerChoose('scissors')" class="controls-btn scissors">
          <Choice />
        </button>
      </div>
      <div class="controls-row middle">
        <button @click.prevent="playerChoose('spock')" class="controls-btn spock">
          <Choice kind="spock" />
        </button>
        <button @click.prevent="playerChoose('paper')" class="controls-btn paper">
          <Choice kind="paper" />
        </button>
      </div>
      <div class="controls-row bottom">
        <button @click.prevent="playerChoose('lizard')" class="controls-btn lizard">
          <Choice kind="lizard" />
        </button>
        <button @click.prevent="playerChoose('rock')" class="controls-btn rock">
          <Choice kind="rock" />
        </button>
      </div>
    </section>

    <!-- Results Board -->
    <section
      v-if="gameState === 'bot'"
      class="game-results-board"
    >
      <div class="result-row">
        <article class="player-choice">
          <h2 class="result-heading">You picked</h2>
          <button class="controls-btn" :class="playerChoice">
            <Choice :kind="playerChoice" />
          </button>
        </article>
        <article class="result-decision" v-if="playerChoice && botChoice">
          <h2 class="result-heading">
            You {{ result }} <br>
            <small v-if="result === 'Win'">+{{ 1 * change }}</small>
            <small v-if="result === 'Loose' && score != 0">-{{ 1 * change }}</small>
            <small v-if="result === 'had a Draw'">Next choice worth 2x</small>
          </h2>
          <a class="app-btn" href="#" @click.prevent="newGame">Play again</a>
        </article>
        <article class="bot-choice">
          <h2 class="result-heading">The house picked</h2>
          <button class="controls-btn" :class="[{ 'empty': !botChoice }, botChoice]">
            <Choice :kind="botChoice" />
          </button>
        </article>
      </div>
    </section>

    <!-- Rules CTA -->
    <a class="app-btn rules-cta" href="#" @click.prevent="showRules = true">Rules</a>

    <div v-if="showRules" class="rules-popup-overlay" @click.prevent="showRules = false"></div>
    <aside v-if="showRules" class="rules-popup">
      <h4 class="rules-heading">Rules</h4>
      <img src="@/assets/img/app/image-rules-bonus.svg" alt="Rules">
      <div class="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        Coded by <a href="https://github.com/VincentBourdeau" target="_blank" rel="noopener noreferrer">VincentBourdeau</a>.
        <br>
        <small>v.1.0.1</small>
      </div>

      <a @click.stop.prevent="showRules = false" class="close" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path fill="#3B4262" fill-rule="evenodd" d="M16.97 0l2.122 2.121-7.425 7.425 7.425 7.425-2.121 2.12-7.425-7.424-7.425 7.425L0 16.97l7.425-7.425L0 2.121 2.121 0l7.425 7.425L16.971 0z" opacity=".25"/></svg></a>
    </aside>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pentagon from '@/assets/img/app/bg-pentagon.svg'
import Choice from '@/components/Choice'

export default {
  head() {
    return {
      title: {
        inner: 'Play'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle}`,
          id: 'desc'
        }
      ]
    }
  },
  components: { Choice },
  data() {
    return {
      pentagonImg: pentagon,
      gameState: 'player', // 'player', 'bot', 'result'
      choices: ['scissors', 'spock', 'paper', 'lizard', 'rock'],
      values: {
        scissors: {
          beats: ['paper', 'lizard'],
          loses: ['spock', 'rock']
        },
        spock: {
          beats: ['scissors', 'rock'],
          loses: ['lizard', 'paper']
        },
        paper: {
          beats: ['rock', 'spock'],
          loses: ['scissors', 'lizard']
        },
        lizard: {
          beats: ['spock', 'paper'],
          loses: ['rock', 'scissors']
        },
        rock: {
          beats: ['lizard', 'scissors'],
          loses: ['spock', 'paper']
        }
      },
      playerChoice: null,
      botChoice: null,
      result: null,
      score: 0,
      modifier: 1,
      change: null,
      showRules: false
    }
  },
  methods: {
    playerChoose(choice) {
      this.playerChoice = choice
      this.gameState = 'bot'

      this.botChoose()
    },
    botChoose() {
      setTimeout(() => {
        this.botChoice = this.choices[Math.floor(Math.random() * this.choices.length)]

        this.validateChoices()
      }, 2075)
    },
    validateChoices() {

      if (this.playerChoice === this.botChoice) {
        this.result = 'had a Draw'
        this.modifier = 2
        return
      }

      if (this.values[this.playerChoice].beats.includes(this.botChoice)) {
        this.result = 'Win'
        this.score = this.score + (1 * this.modifier)
      } else {
        this.result = 'Loose'
        if (this.score > 0) {
          this.score = this.score - (1 * this.modifier)
        }

        if (this.score < 0) {
          this.score = 0
        }
      }

      this.change = (1 * this.modifier)
      this.modifier = 1
    },
    newGame() {
      this.playerChoice = null
      this.botChoice = null
      this.result = null
      this.gameState = 'player'
    }
  },
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.game-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;

  padding: 0 10px;

  @media all and (min-width: 600px) {
    padding: 0 20px;
  }
}

.score-board {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin: 25px auto;
  padding: 10px;
  border: 2px solid rgba(#fff, 0.25);
  border-radius: 15px;
  font-size: 0.85rem;

  @media all and (min-width: 375px) {
    font-size: 1rem;
  }

  @media all and (min-width: 600px) {
    margin: 45px auto;
    padding: 10px 15px;
  }

  .score-heading {
    margin: 0;
    padding: 0;
    color: #fff;
    line-height: 0.80;
    text-transform: uppercase;

    span {
      display: block;
    }
  }

  .score-number {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 10px;
    padding: 5px 25px;
    text-align: center;

    @media all and (min-width: 600px) {
      padding: 5px 40px;
    }

    .score-number-heading {
      margin: 5px 0 0 0;
      padding: 0;
      line-height: 1;
      text-transform: uppercase;
      font-size: 1rem;
      letter-spacing: 0.05rem;
      color: $dark-text
    }

    .score-number-text {
      font-size: 2.75rem;
      color: $header-outline;
      font-weight: 700;

      @media all and (min-width: 375px) {
        font-size: 3.5rem;
      }
    }
  }
}

.game-controls-btns {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -44%, 0) scale(0.60);
  backface-visibility: hidden;

  background-position: center;
  background-repeat: no-repeat;

  @media all and (min-width: 375px) {
    transform: translate3d(-50%, -44%, 0) scale(0.70);
  }

  @media all and (min-width: 600px) {
    transform: translate3d(-50%, -50%, 0) scale(1);
  }
}

.controls-btn {
  position: relative;
  margin: 1rem 6rem;
  padding: 3.5rem;
  border: 1rem solid $scissors;
  background: #fff;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  box-shadow: inset 0 4px 0 1px rgba(#000, 0.10);
  cursor: pointer;
  outline: none;

  transform: scale(1);
  transition: transform 0.35s ease 0s, box-shadow 0.35s ease 0s;
  will-change: transform;
  backface-visibility: hidden;

  &:before {
    content: '';

    position: absolute;
    top: 0.5rem;
    right: -1rem;
    left: -1rem;
    height: 100%;
    z-index: 2;
    background: transparent;
    border-radius: 50%;
    box-shadow: 0 6px 0 1px rgba(#000, 0.10);
  }

  @media screen and (min-width: 768px) {
    &:hover {
      transform: scale(0.9756);
      box-shadow: inset 0 2px 0 1px rgba(#000, 0.10);
    }
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    backface-visibility: hidden;
  }

  &.spock {
    border-color: $spock;
  }

  &.paper {
    border-color: $paper;
  }

  &.lizard {
    border-color: $lizard;
  }

  &.rock {
    border-color: $rock;
  }

  &.empty {
    border-color: transparent;
    box-shadow: none;
    background: rgba(#000, 0.15);

    &:before {
      box-shadow: none;
    }

    img {
      opacity: 0
    }
  }
}

.controls-row {
  display: flex;
  align-items: center;
  justify-content: center;

  &.upper {
    .controls-btn {
      margin: 0;
      margin-bottom: -1rem;
    }
  }

  &.bottom {
    .controls-btn {
      margin: 1.5rem;
    }
  }
}

.game-results-board {
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.05rem;

  .result-row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    @media all and (min-width: 600px) {
      flex-wrap: no-wrap;
    }

    > article {
      margin: 0 0;

      @media all and (min-width: 375px) {
        margin: 0 0;
      }

      @media all and (min-width: 600px) {
        margin: 0 2rem;
      }
    }

    .result-heading {
      margin-bottom: 1rem;
      font-size: 0.85rem;

      small {
        text-transform: none;
        font-weight: 300;
      }

      @media all and (min-width: 600px) {
        margin-bottom: 2rem;
        font-size: 1.5rem;
      }
    }

    > .player-choice {
      margin-right: auto;

      @media all and (min-width: 600px) {
        margin-right: 0;
      }
    }

    > .result-decision {
      order: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .result-heading {
        margin-bottom: 2rem;
      }

      @media all and (min-width: 600px) {
        order: unset;
      }
    }
  }

  .controls-btn {
    margin: 1rem 0;
    padding: 3.4rem;
    transform: scale(0.85);

    @media all and (min-width: 600px) {
      transform: scale(1.75);
      margin: 5rem;
    }

    &.empty {
      transform: scale(1.45);
      animation: shake 3s linear infinite;
    }
  }
}

.rules-cta {
  position: fixed;
  right: 50%;
  bottom: 7%;
  transform: translate3d(50%, 0, 0);

  @media all and (min-width: 600px) {
    transform: none;
    right: 5%;
    bottom: 5%;
  }
}

.rules-popup-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 8;
  background: rgba(#000, 0.45);
}

.rules-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0) scale(0.75);
  z-index: 9;
  width: 100%;
  max-width: 475px;
  padding: 25px 25px 50px 25px;
  border-radius: 15px;
  background: #fff;

  @media all and (min-width: 375px) {
    transform: translate3d(-50%, -50%, 0) scale(0.85);
  }

  @media all and (min-width: 600px) {
    transform: translate3d(-50%, -50%, 0) scale(1);
  }

  .rules-heading {
    margin: 0 0 25px 0;
    padding: 0;
    text-transform: uppercase;
    color: $dark-text;
    letter-spacing: 0.05rem;
    font-size: 2rem;
    font-weight: 700;
  }

  img {
    display: block;
    width: 100%;
  }

  .attribution {
    font-size: 0.80rem;
    text-align: center;
    color: $dark-text;
    padding: 20px 0 0 0;

    @media all and (min-width: 375px) {
      padding: 40px 0 0 0;
    }
  }

  .close {
    position: absolute;
    top: 5%;
    right: 5%;
  }
}

@keyframes shake {
  5% { transform: scale(1) translateY(-3px) }
  10%, 20%, 30%, 40% { transform: scale(1) translateY(-3px) }
  15%, 25%, 35%, 45% { transform: scale(1.45) translateY(-3px) }
  50%, 100% { transform: scale(1.45) translateY(0px) }
}
</style>
