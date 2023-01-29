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

  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="save">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref, watch, watchEffect} from 'vue';
import {Post} from "@/mocks";
import {parse} from 'marked';
import highlight from 'highlight.js';
import {debounce} from "lodash";


export default defineComponent({
  name: 'PostWriter',
  props: {
    post: {
      type: Object as ()=> Post,
      required: true
    }
  },
  emits: {
    save: (post: Post) => {
      return true
    }
  },

  setup(props, ctx){
    const title = ref(props.post.title)
    const content = ref('## Title\nEnter your post content...')
    const contentEditable = ref<HTMLDivElement | null>(null)
    const html = ref('')
    const parseHtml = (str:string)=>{
      html.value = parse(str, {
        gfm: true,
        breaks: true,
        highlight: (code: string)=> {
          return highlight.highlightAuto(code).value
        }
      })
    }

    watch(content, debounce((newVal)=> {
      parseHtml(newVal)
    },250), {immediate: true})

    // watch(content, debounce(parseHtml,250),{immediate: true}) более короткая версия верхнего кода




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

    const save = () => {
      const newPost: Post = {
        ...props.post,
        title: title.value,
        html: html.value,
        markdown: content.value
      }
      ctx.emit('save', newPost)
    }

    return {title, content, contentEditable, handleInput, html, save}
  }

});


</script>

<style>
.column {
  overflow-y: scroll;
}
</style>


