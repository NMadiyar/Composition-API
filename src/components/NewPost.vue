<template>
<PostWriter :post="newPost" @save="save"></PostWriter>
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

    const save = (post: Post)=> {
      console.log('123')
    }

    return { newPost, save }
  }

});
</script>