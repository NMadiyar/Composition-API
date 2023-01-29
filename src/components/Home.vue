<template>

    <div class="container">
      <suspense>
        <template #default>
          <Timeline></Timeline>
        </template>

        <template #fallback>
          <Spinner></Spinner>
        </template>
      </suspense>
    </div>


</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Timeline from "@/components/Timeline.vue";
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  name: 'Home',
  components: {
    Spinner,
    Timeline,
  }
});
</script>

