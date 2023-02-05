<template>
  <div class="navbar">
    <div class="navbar-end">

      <div class="buttons"
      v-if="auth">
        <router-link to="/posts/new" class="button">New Post</router-link>
        <button class="button" @click="signOut" data-test="sign-up">Sign Out</button>
      </div>

      <div class="buttons"
      v-else>
        <button class="button" @click="signUp">Sign Up</button>
        <button class="button" @click="signIn">Sign In</button>
      </div>


      </div>
    </div>
  <teleport to="#modal">
    <component :is="component"/>
  </teleport>
</template>

<script lang="ts">
import {computed, defineComponent, markRaw} from 'vue';
import {useModal} from "@/useModal";
import SignUp from "@/components/SignUp.vue";
import {useStore} from "@/store";


export default defineComponent({
  name: 'App',
  components: {SignUp},
  setup(){
    const modal = useModal()
    const store = useStore()

    const auth = computed(()=>{
      return !!store.getState().authors.currentUserId
    })
    const signIn = () => {}
    const signUp = () => {
      modal.component.value = markRaw(SignUp)
      modal.showModal()
    }
    const signOut = () => {}

    return{
      auth,
      component: modal.component,
      signIn,
      signUp,
      signOut,
    }
  }
});
</script>