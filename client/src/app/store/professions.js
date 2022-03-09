import { createSlice } from "@reduxjs/toolkit";
import professionService from "../service/profession.service";

const professionSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionRequested: (state) => {
            state.isLoading = true;
        },
        professionsRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        professionRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionReducer, actions } = professionSlice;
const { professionRequested, professionsRecieved, professionRequestFailed } =
    actions;

function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutDated(lastFetch)) {
        dispatch(professionRequested());
        try {
            const { content } = await professionService.get();
            dispatch(professionsRecieved(content));
        } catch (error) {
            dispatch(professionRequestFailed(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionById = (professionId) => (state) => {
    if (state.users.entities) {
        return state.professions.entities.find(
            (prof) => prof._id === professionId
        );
    }
};

export default professionReducer;
