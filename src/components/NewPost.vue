<template>
<PostWriter :post="newPost" @save="save"></PostWriter>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostWriter from "@/components/PostWriter.vue";
import {Post} from "@/mocks";
import moment from 'moment';
import { useStore } from '@/store';
import {useRouter} from "vue-router";


export default defineComponent({
  name: 'NewPost',
  components: {PostWriter},

  setup(){
    const router = useRouter()

    const store = useStore()
    const authorId = store.getState().authors.currentUserId

    if (!authorId){
      throw Error('AuthorId was not found')
    }

    const newPost: Post = {
      id: '-1',
      title: 'Enter your title',
      created: moment().subtract(1,'second'),
      authorId
    }

    const save = async(post: Post)=> {
     await store.createPost(post)
      router.push('/')
    }

    return { newPost, save }
  }

});
</script>