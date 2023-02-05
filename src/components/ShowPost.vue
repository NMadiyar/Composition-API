<template>
  <suspense>
    <template #default>
      <PostViewer/>
    </template>
    <template #fallback>
      <spinner/>
    </template>

  </suspense>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import PostViewer from "@/components/PostViewer.vue";
import Spinner from "@/components/Spinner.vue";


export default defineComponent({
  components: {Spinner, PostViewer}
})
</script>