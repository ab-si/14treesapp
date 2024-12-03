import { UnknownAction } from "redux";
import { Donation, DonationDataState } from "../../types/donation";
import donationActionTypes from "../actionTypes/donationActionTypes";
import { PaginatedResponse } from "../../types/pagination";

export const donationsDataReducer = (state = { totalDonations: 0, donations: {}, paginationMapping: {} }, action: UnknownAction): DonationDataState => {
    switch (action.type) {
        case donationActionTypes.GET_DONATIONS_SUCCEEDED:
            if (action.payload) {
                let donationsDataState: DonationDataState = {
                    totalDonations: state.totalDonations,
                    donations: { ...state.donations },
                    paginationMapping: { ...state.paginationMapping }
                };

                let payload = action.payload as PaginatedResponse<Donation>;
                let donations = payload.results;
                const offset = payload.offset;

                if (payload.offset === 0) {
                    donationsDataState.donations = {}
                    donationsDataState.paginationMapping = {}
                }
                for (let i = 0; i < donations.length; i++) {
                    donations[i].key = donations[i].id
                    donationsDataState.donations[donations[i].id] = donations[i]
                    donationsDataState.paginationMapping[offset + i] = donations[i].id
                }
                return { ...donationsDataState, totalDonations: payload.total };
            }
            return state;


        case donationActionTypes.CREATE_DONATION_SUCCEEDED:
            if (action.payload) {
                const nextState: DonationDataState = { 
                    totalDonations: state.totalDonations, 
                    donations: { ...state.donations },
                    paginationMapping: { ...state.paginationMapping }
                };

                let payload = action.payload as Donation
                payload.key = payload.id
                nextState.donations[payload.id] = payload;
                nextState.totalDonations += 1;
                return nextState;
            }
            return state;
        case donationActionTypes.UPDATE_DONATION_SUCCEEDED:
            if (action.payload) {
                const nextState: DonationDataState = { 
                    totalDonations: state.totalDonations, 
                    donations: { ...state.donations },
                    paginationMapping: { ...state.paginationMapping }
                };
                
                let payload = action.payload as Donation
                payload.key = payload.id
                nextState.donations[payload.id] = payload;
                return nextState;
            }
            return state;
        case donationActionTypes.DELETE_DONATION_SUCCEEDED:
            if (action.payload) {
                const nextState: DonationDataState = { 
                    totalDonations: state.totalDonations, 
                    donations: { ...state.donations },
                    paginationMapping: { ...state.paginationMapping }
                };
                
                Reflect.deleteProperty(nextState.donations, action.payload as number)
                nextState.totalDonations -= 1;
                return nextState;
            }
            return state;

        default:
            return state;
    }
};

