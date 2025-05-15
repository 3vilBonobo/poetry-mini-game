<template>
  <div class="game-console">
    <!-- Top screen: story text -->
    <div class="screen top-screen">
      <p class="story-text" v-html="current.text"></p>
    </div>

    <!-- Bottom screen: options or replay -->
    <div class="screen bottom-screen">
      <template v-if="current.options">
        <button
          v-for="(opt, i) in current.options"
          :key="i"
          class="option-btn"
          @click="choose(opt.next)"
        >
          <span class="icon">{{ opt.icon }}</span>
          {{ opt.text }}
        </button>
      </template>
      <button v-else-if="current.end" class="option-btn" @click="reset">
        Play Again
      </button>
      <template v-else>
        <button class="option-btn" @click="choose(current.next)">
          Συνέχεια...
        </button>
      </template>
    </div>

    <!-- Home & Sound controls -->
    <button class="control-btn home-btn" @click="reset">Home</button>
    <button class="control-btn sound-btn" @click="toggleSound">
      {{ muted ? "🔇" : "🔊" }}
    </button>

    <!-- Background music -->
    <audio ref="bg" :src="musicSrc" loop autoplay :muted="muted"></audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import story from "@/assets/story.json";
// Import the MP3 so Webpack bundles it under your publicPath
import musicSrc from "@/assets/music.mp3";

const currentId = ref("start");
const muted = ref(true); // start muted so autoplay is allowed
const bg = ref(null);

const current = computed(() => story[currentId.value]);

function choose(nextId) {
  currentId.value = nextId;
}

function reset() {
  currentId.value = "start";
}

function toggleSound() {
  if (!bg.value) return;

  // If currently muted, unmute and play (inside click handler = allowed)
  if (muted.value) {
    muted.value = false;
    bg.value.muted = false;
    bg.value
      .play()
      .catch((err) => console.warn("Playback still blocked:", err));
  } else {
    // Otherwise pause & mute
    bg.value.pause();
    muted.value = true;
    bg.value.muted = true;
  }
}

onMounted(() => {
  if (!bg.value) return;
  // Ensure it's muted on load so autoplay is permitted
  bg.value.muted = true;
  bg.value.play().catch(() => {
    // Silent fail is fine — we just want the audio context unlocked
  });
});
</script>

<style scoped>
.game-console {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1100px;
  height: 650px;
  background: url("/src/assets/console.png") no-repeat center center;
  background-size: cover;
  z-index: 10;
}

/* both screens share styling */
.screen {
  position: absolute;
  padding: 1rem;
  color: purple;
  overflow-y: auto;
  z-index: 2;
}

/* Top screen */
.top-screen {
  top: 7rem;
  left: 30rem;
  width: 260px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 0;
}

/* Bottom screen */
.bottom-screen {
  bottom: 12rem;
  left: 30rem;
  width: 260px;
  height: 160px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  z-index: 0;
}

.story-text {
  white-space: pre-wrap;
  font-size: 1.2rem;
  text-align: center;
}

/* Option buttons */
.option-btn {
  border: 2px solid purple;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  backdrop-filter: blur(4px);
  z-index: 3;
}

/* Home & Sound controls */
.control-btn {
  position: absolute;
  border: none;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  z-index: 5;
  cursor: pointer;
  color: transparent;
}

.home-btn {
  bottom: 14rem;
  left: 18rem;
  background: transparent;
}
.home-btn:hover {
  background-color: rgba(0, 0, 0, 0.148);
}

.sound-btn {
  bottom: 14.5rem;
  right: 23.5rem;
  background-color: transparent;
}
.sound-btn:hover {
  background-color: rgba(0, 0, 0, 0.148);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .top-screen,
  .bottom-screen {
    width: 90%;
    height: auto;
  }
  .top-screen {
    top: 5%;
  }
  .bottom-screen {
    bottom: 5%;
  }
  .control-btn {
    width: 4rem;
    height: 4rem;
  }
  .home-btn {
    bottom: 10%;
    left: 5%;
  }
  .sound-btn {
    bottom: 10%;
    right: 5%;
  }
}
</style>
