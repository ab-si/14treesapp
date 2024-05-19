import { UnknownAction } from "redux";
import { PondDataState, Pond, SearchPondsDataState } from "../../types/pond";
import pondActionTypes from "../actionTypes/pondActionTypes";
import { fetchDataFromLocal } from "../../api/apiClient/apiClient";

export const pondsDataReducer = (state = fetchDataFromLocal("PondDataState"), action: UnknownAction ): PondDataState => {
    switch (action.type) {
        case pondActionTypes.GET_PONDS_SUCCEEDED:
            if (action.payload) {
                let pondDataState: PondDataState = {}
                let payload = action.payload as [Pond]
                for (let i = 0; i < payload.length; i++) {
                    if (payload[i]?._id) {
                        payload[i].key = payload[i]._id
                        pondDataState[payload[i]._id] = payload[i]
                    }
                }
                const nextState: PondDataState = pondDataState;
                return nextState;
            }
            return state;
        case pondActionTypes.CREATE_POND_SUCCEEDED:
            if (action.payload) {
                const nextState = { ...state } as PondDataState;
                let payload = action.payload as Pond
                payload.key = payload._id
                nextState[payload._id] = payload;
                return nextState;
            }
            return state;
        case pondActionTypes.UPDATE_POND_SUCCEEDED:
            if (action.payload) {
                const nextState = { ...state } as PondDataState;
                let payload = action.payload as Pond
                payload.key = payload._id
                nextState[payload._id] = payload;
                return nextState;
            }
            return state;
        case pondActionTypes.UPDATE_POND_WATER_LVL_SUCCEEDED:
            return state;
        case pondActionTypes.DELETE_POND_SUCCEEDED:
            if (action.payload) {
                const nextState = { ...state } as PondDataState;
                Reflect.deleteProperty(nextState, action.payload as string)
                return nextState;
            }
            return state;
        
        default:
            return state;
    }
};

export const searchPondsDataReducer = (state = {}, action: UnknownAction): SearchPondsDataState => {
    switch(action.type) {
        case pondActionTypes.SEARCH_PONDS_SUCCEEDED:
            if (action.payload) {
                let pondsDataState: SearchPondsDataState = {}
                let payload = action.payload as [Pond]
                for (let i = 0; i < payload.length; i++) {
                    if (payload[i]?._id) {
                        payload[i].key = payload[i]._id
                        pondsDataState[payload[i]._id] = payload[i]
                    }
                }
                const nextState: SearchPondsDataState = pondsDataState;
                return nextState;
            }
            return state;
        default:
            return state;
    }
}