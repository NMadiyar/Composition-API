<template>
  <router-link class="panel-block" :to="to">
    <div class="is-flex is-flex-direction-column is-align-items-flex-start">
    <a href="">{{post.title}}</a>
    <div>{{post.created.format('Do MMM')}}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Post} from "@/mocks";

export default defineComponent({
  name: 'TimelinePost',
  props: {
    post: {
      type: Object as ()=> Post,
      required: true
    },
  },
  setup(props){
    return {
      to: `/posts/${props.post.id}`
    }
  }
})
</script>