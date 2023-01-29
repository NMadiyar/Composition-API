import {mount} from '@vue/test-utils'
import Timeline from "@/components/Timeline.vue";
import {today, thisWeek, thisMonth} from "@/mocks";
import {nextTick} from "vue";


describe('Timeline', ()=>{
  it('renders today post default', function () {
    const wrapper = mount(Timeline)
    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
  });

  //requestAnimationFrame(()=> ...) при нажатии на элемент, на фоне происходит эта функция между фреймами и тесты его не делают сами
  it('update when the period is click',async () => {
    const wrapper = mount(Timeline)
   await wrapper.get('[data-test="This Week"]').trigger('click')
    // await nextTick()
    //wait for the next frame

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
  });

  it('update when the period is click',async () => {
    const wrapper = mount(Timeline)
   await wrapper.get('[data-test="This Month"]').trigger('click')


    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))
  });
})