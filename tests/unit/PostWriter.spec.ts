import { mount} from '@vue/test-utils'
import PostWriter from "../../src/components/PostWriter.vue";


const functionUnderTest = (arg: any, callback: any) => { callback(arg)}

describe('Postwriter', ()=>{
  // @ts-ignore
    it('emits a save event with new post',  async (done) => {
    const wrapper = mount(PostWriter as any, {
        props: {
            post: {
                title: 'new title'
            }
        }
    })

     await wrapper.find('[data-test="title"]').setValue('My new title')

      const $content = wrapper.find<HTMLDivElement>('[data-test="content"]')
        $content.element.innerText = '## New content'
     await $content.trigger('input')

      setTimeout(async()=>{
          await wrapper.find('[data-test="submit"]').trigger('click')
          const emitted = (wrapper.emitted()['save'] as any)[0][0]

          expect(emitted.title).toBe('My new title')
          expect(emitted.markdown).toBe('## New content')
          expect(emitted.html).toBe('<h2 id="new-content">New content</h2>\n')
          console.log(emitted)
          done()

      },300)


  });
})