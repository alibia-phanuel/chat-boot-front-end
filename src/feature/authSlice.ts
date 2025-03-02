import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Chargement de l'URL de base depuis l'environnement
const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

/**
 * Définition de l'interface représentant les données utilisateur après connexion.
 */
interface User {
  uuid: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Définition de l'interface pour les erreurs retournées par l'API.
 */
interface ErrorResponse {
  msg: string; // Message d'erreur renvoyé par l'API en cas de problème
}

/**
 * Définition de l'état initial du slice d'authentification.
 */
type AuthState = {
  user: User | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string | null;
};

const initialState: AuthState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/**
 * Action asynchrone pour connecter un utilisateur.
 */
export const LoginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("user/LoginUser", async (user, thunkAPI) => {
  try {
    const response = await axios.post<User>(`${baseURL}/login`, user, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as ErrorResponse)?.msg || "Erreur inconnue";
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue("Une erreur inconnue s'est produite");
  }
});

/**
 * Action asynchrone pour récupérer les informations de l'utilisateur connecté.
 */
export const getMe = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/getMe",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<User>(`${baseURL}/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as ErrorResponse)?.msg || "Erreur inconnue";
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue("Une erreur inconnue s'est produite");
    }
  }
);

/**
 * Action asynchrone pour déconnecter l'utilisateur.
 */
export const LogOut = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/LogOut",
  async (_, thunkAPI) => {
    try {
      await axios.delete(`${baseURL}/logout`, { withCredentials: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { msg?: string })?.msg ||
          "Erreur lors de la déconnexion";
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue("Une erreur inconnue s'est produite");
    }
  }
);

/**
 * Déclaration du slice d'authentification avec Redux Toolkit.
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(LogOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LogOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(LogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
