<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input type="text" class="input" v-model="title"/>{{title}}

      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-one-half">
      <div contenteditable ref="contentEditable" @input="handleInput"></div>
    </div>

    <div class="column is-one-half">
     <div v-html="html"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref, watch, watchEffect} from 'vue';
import {Post} from "@/mocks";
import {parse} from 'marked';
import highlight from 'highlight.js';


export default defineComponent({
  name: 'PostWriter',
  props: {
    post: {
      type: Object as ()=> Post,
      required: true
    }
  },

  setup(props){
    const title = ref(props.post.title)
    const content = ref('## Title\nEnter your post content...')
    const contentEditable = ref<HTMLDivElement | null>(null)
    const html = ref('')

    watchEffect(()=>{
      html.value = parse(content.value, {
        gfm: true,
        breaks: true,
        highlight: (code: string)=> {
          return highlight.highlightAuto(code).value
        }
      })
    })


    const handleInput = () => {
      if (!contentEditable.value){
        throw Error('This should never happen')
      }
      content.value = contentEditable.value?.innerText || ''
    }

    onMounted(()=>{
      if (!contentEditable.value){
        throw Error('This should never happen')
      }
      contentEditable.value.innerText = content.value
    })

    return {title, content, contentEditable, handleInput, html}
  }

});


</script>

<style>
.column {
  overflow-y: scroll;
}
</style>


