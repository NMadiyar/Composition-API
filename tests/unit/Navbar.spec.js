import {Store} from "@/store";
import Navbar from "@/components/Navbar.vue";
import {createRouter, createWebHistory} from "vue-router";
import SignUp from "@/components/SignUp.vue";


describe('Navbar', ()=> {
    it('shows a signup model via teleport', async  ()=> {
        const store = new Store({
            posts: {
                all: new Map(),
                ids: [],
                loaded: false
            }
        })

        const el = document.createElement('div')
        el.id = 'modal'
        document.body.appendChild(el)

        const wrapper = mount(Navbar, {
            attachTo: document.body,
            global: {
                components: {
                    RouterLink: {
                        template: `<div></div>`
                    }
                },
                plugins: [store]
            }
        })

        const form =  wrapper.getComponent(SignUp)
        expect(document.body.outerHTML).toContain('The value must be between 10 and 40')

        form.find('#Username').setValue('Username')
        form.find('#Password').setValue('12345678910')

        expect(document.body.outerHTML).not.toContain('The value must be between 10 and 40')

        await form.trigger('submit.prevent')
    });
})