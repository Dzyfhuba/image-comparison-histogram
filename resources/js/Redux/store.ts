import axios from 'axios';
import {
  createStore,
  action,
  Action,
  computed,
  Computed,
  thunk,
  Thunk,
} from 'easy-peasy';

interface MemberInterface {
    id: string
    username: string
    kyc_image: string
    created_at: string
    updated_at: string
}

export interface Model {
    members: MemberInterface[]
    setMembers: Action<Model, MemberInterface[]>
    fetchMembers: Thunk<Model>
}

const store = createStore<Model>({
  members: [],
  setMembers: action((state, payload) => {
    state.members = payload;
  }),
  fetchMembers: thunk(async (actions) => {
    const data = await axios.get('/api/members')
      .then((res) => {
        return res.data
      })
      .catch(err => {
        console.error(err)
        return []
      })
    actions.setMembers(data)
  }),
});

export default store
