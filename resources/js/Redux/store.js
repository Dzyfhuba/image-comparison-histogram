import axios from 'axios';
import { createStore, action, thunk, } from 'easy-peasy';
const store = createStore({
    members: [],
    setMembers: action((state, payload) => {
        state.members = payload;
    }),
    fetchMembers: thunk(async (actions) => {
        const data = await axios.get('/api/members')
            .then((res) => {
            return res.data;
        })
            .catch(err => {
            console.error(err);
            return [];
        });
        actions.setMembers(data);
    }),
});
export default store;
