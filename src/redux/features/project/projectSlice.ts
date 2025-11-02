import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
  currentProjectId: number | null;
}

const initialState: ProjectState = {
  currentProjectId: null,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<number>) => {
      state.currentProjectId = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProjectId = null;
    },
  },
});

export const { setCurrentProject, clearCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;