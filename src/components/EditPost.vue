<template>
  <suspense>
    <template #default>
      <PostEditor/>
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
import PostEditor from "@/components/PostEditor.vue";


export default defineComponent({
  components: {PostEditor, Spinner, PostViewer}
})
</script>