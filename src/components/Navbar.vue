<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button class="button" @click="show">Sign Up</button>
        <router-link to="/posts/new" class="button">New Post</router-link>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <SignUp></SignUp>
  </teleport>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useModal} from "@/useModal";
import SignUp from "@/components/SignUp.vue";


export default defineComponent({
  name: 'App',
  components: {SignUp},
  setup(){
    const modal = useModal()

    return{
      show: ()=> {
        modal.showModal()
      }
    }
  }
});
</script>