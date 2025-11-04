import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminUser } from "@/types/admin";

interface AdminAuthState {
  admin: AdminUser | null;
}

const initialState: AdminAuthState = {
  admin: null,
};

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLoggedIn: (state, action: PayloadAction<{ admin: AdminUser }>) => {
      state.admin = action.payload.admin;
    },
    adminLogout: (state) => {
      state.admin = null;
    },
  },
});

export const { adminLoggedIn, adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;


