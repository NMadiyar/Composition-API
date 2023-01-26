<template>
  <section class="section">
    <div class="container">
      <Timeline></Timeline>
    </div>
  </section>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Timeline from "@/components/Timeline.vue";

export default defineComponent({
  name: 'App',
  components: {
    Timeline,
  }
});
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
