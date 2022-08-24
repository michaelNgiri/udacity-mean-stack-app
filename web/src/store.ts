import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Link{
    id: Number,
    original_link: String,
    short_link: String,
    link_owner_id: Number,
    updatedAt: String
}

interface LinksSliceState{
    links: Link[]
}

const initialState: LinksSliceState = {
  links:[]
}

export const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {
    fetchLinks: (state, action:PayloadAction<String>) => {
      state.links = [
        ...state.links,
        {
          id: state.links.length,
          original_link: action.payload,
          short_link: action.payload,
          link_owner_id: state.links.length,
          updatedAt: ''
        }
      ]
    },
    addLink: (state, action:PayloadAction<String>) => {
      state.links = [
        ...state.links,
        {
          id: state.links.length,
          original_link: action.payload,
          short_link: action.payload,
          link_owner_id: state.links.length,
          updatedAt: ''
        }
      ]
    }
  },
})

export const { addLink, fetchLinks } = linkSlice.actions;
   
const store = configureStore({
  reducer: {
     
    }
});

export default store;