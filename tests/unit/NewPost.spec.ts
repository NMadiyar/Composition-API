import {Store} from "@/store";
import {mount} from "@vue/test-utils";
import NewPost from "@/components/NewPost.vue";


describe('NewPost', ()=>{
    const store = new Store({
        posts: {
            all: new Map(),
            ids: [],
            loaded: false
        },
        authors: {
            ids: ['100'],
            all: new Map([['100',{username: 'username', id: '100'}]]),
            loaded: false,
            currentUserId: '100'
        }
    })

    beforeEach(()=>{
       const routes = []
    })

    it('creates a post and redirects to /', async ()=> {
       const wrapper = mount(NewPost,{
           global: {
               plugins: [store]
           }
       })

       expect(store.getState().posts.ids).toHaveLength(0)
       await wrapper.find('[data-test="submit"]').trigger('click')
    });
})