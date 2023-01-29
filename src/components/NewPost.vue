<template>
<PostWriter :post="newPost"></PostWriter>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostWriter from "@/components/PostWriter.vue";
import {Post} from "@/mocks";
import moment from 'moment';


export default defineComponent({
  name: 'NewPost',
  components: {PostWriter},

  setup(){
    const newPost: Post = {
      id: '-1',
      title: 'Enter your title',
      created: moment()
    }

    return { newPost }
  }

});
</script>