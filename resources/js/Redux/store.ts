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
    members: MemberInterface[];
    setMembers: Action<Model, MemberInterface[]>;
    modalVisibility: boolean,
    setModalVisibility: Action<Model, boolean>
}

const store = createStore<Model>({
  members: [],
  setMembers: action((state, payload) => {
    state.members = payload;
  }),

  modalVisibility: false,
  setModalVisibility: action((state, payload) => {
    state.modalVisibility = payload
  })
});

export default store
