<template>
  <form  @submit.prevent="submit">
      <FormInput v-model="username" name="Username" type="text" :error="usernameStatus.message"/>
      <FormInput v-model="password" name="Password" type="password" :error="passwordStatus.message"/>

    <button  class="button is-primary" :disabled="!usernameStatus.valid || !passwordStatus.valid">Submit</button>
  </form>

</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import FormInput from "@/components/FormInput.vue";
import {required, Status, validate, length} from "@/validation";
import {User, useStore} from "@/store";
import {useModal} from "@/useModal";


export default defineComponent({
  name: 'SignUp',
  components: {FormInput},
  setup(){
    const username = ref('username')

    const usernameStatus = computed<Status>(()=>{
      return validate(username.value,[required(), length({min: 5, max: 10})])
    })

    const password = ref('username')

    const passwordStatus = computed<Status>(()=>{
      return validate(password.value,[required(), length({min: 10, max: 40})])
    })

    const store = useStore()
    const modal = useModal()

    const submit = async (evt: Event) => {

      if(!usernameStatus.value.valid || !passwordStatus.value.valid ){
          return
      }

      const newUser: User = {
        id: '-1',
        username: username.value,
        password: password.value
      }
      await store.createUser(newUser)

      modal.hideModal()
    }

    return{
      submit,
      username,
      usernameStatus,
      password,
      passwordStatus,

    }
  }
});
</script>

<style scoped>
form {
  padding: 15px;
  background: white;
}
</style>

