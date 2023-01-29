import {flushPromises, mount} from '@vue/test-utils'
import Timeline from "@/components/Timeline.vue";
import {today, thisWeek, thisMonth} from "@/mocks";
import {nextTick} from "vue";
import {defineComponent} from "vue";

export default defineComponent({
    components: {Timeline}
})

jest.mock('axios', ()=> ({
    get: (url: string) => {
        return Promise.resolve({
            data: [today, thisWeek, thisMonth]
        })
    }
}))

function mountTimeline(){
    return mount({
        components: {Timeline},
        template: `
        <suspense>
        <template #default>
        <Timeline></Timeline>
        </template>
        <template #fallback>
          Loading...
        </template>
        <suspense/>`
    })
}
describe('Timeline', ()=>{
  it('renders today post default', async function () {
    const wrapper = mountTimeline()
      await flushPromises()
      console.log(wrapper.html())
    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
  });

  //requestAnimationFrame(()=> ...) при нажатии на элемент, на фоне происходит эта функция между фреймами и тесты его не делают сами
  it('update when the period is click',async () => {
    const wrapper = mountTimeline()
      await flushPromises()
   await wrapper.get('[data-test="This Week"]').trigger('click')
    // await nextTick()
    //wait for the next frame

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
  });

  it.only('update when the period is click',async () => {
      const wrapper = mountTimeline()
      await flushPromises()
   await wrapper.get('[data-test="This Month"]').trigger('click')


    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))
  });
})