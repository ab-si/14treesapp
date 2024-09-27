import ApiClient from "../../api/apiClient/apiClient";
import { PaginatedResponse } from "../../types/pagination";
import { toast } from 'react-toastify';
import giftCardActionTypes from "../actionTypes/giftCardActionTypes";
import { GiftCard, GiftCardUser } from "../../types/gift_card";
import { User } from "../../types/user";


export const getGiftCards = (offset: number, limit: number, filters?: any[]) => {
    const apiClient = new ApiClient()
    return (dispatch: any) => {
        dispatch({
            type: giftCardActionTypes.GET_GIFT_CARDS_REQUESTED,
        });
        apiClient.getGiftCards(offset, limit, filters).then(
            (value: PaginatedResponse<GiftCard>) => {

                dispatch({
                    type: giftCardActionTypes.GET_GIFT_CARDS_SUCCEEDED,
                    payload: value,
                });
            },
            (error: any) => {
                console.log(error)
                dispatch({
                    type: giftCardActionTypes.GET_GIFT_CARDS_FAILED,
                    payload: error
                });
            }
        )
    }
};


export const createGiftCard = (noOfCards: number, userId: number, groupId?: number) => {
    const apiClient = new ApiClient();
    return (dispatch: any) => {
        dispatch({
            type: giftCardActionTypes.CREATE_GIFT_CARD_REQUESTED,
        });
        apiClient.createGiftCard(noOfCards, userId, groupId).then(
            (value: GiftCard) => {
                toast.success('New GiftCard Added successfully')
                dispatch({
                    type: giftCardActionTypes.CREATE_GIFT_CARD_SUCCEEDED,
                    payload: value,

                });
                return (value)
            },
            (error: any) => {
                dispatch({
                    type: giftCardActionTypes.CREATE_GIFT_CARD_FAILED,
                });
                return (error)
            }
        )
    };
};

export const getBookedGiftCards = (giftCardId: number, offset: number = 0, limit: number = 10) => {
    const apiClient = new ApiClient();
    return (dispatch: any) => {
        dispatch({
            type: giftCardActionTypes.GET_BOOKED_GIFT_CARDS_REQUESTED,
        });
        apiClient.getBookedGiftCards(giftCardId, offset, limit).then(
            (value: PaginatedResponse<GiftCardUser>) => {
                dispatch({
                    type: giftCardActionTypes.GET_BOOKED_GIFT_CARDS_SUCCEEDED,
                    payload: value,
                });
            },
            (error: any) => {
                dispatch({
                    type: giftCardActionTypes.GET_BOOKED_GIFT_CARDS_FAILED,
                });
            }
        )
    }
}

export const redeemGiftCard = (giftCardId: number, saplingId: string, treeId: number, user: User) => {
    const apiClient = new ApiClient();
    return (dispatch: any) => {
        dispatch({
            type: giftCardActionTypes.REDEEM_GIFT_CARD_REQUESTED,
        });
        apiClient.redeemGiftCardTemplate(giftCardId, saplingId, treeId, user).then(
            (value: GiftCardUser) => {
                dispatch({
                    type: giftCardActionTypes.REDEEM_GIFT_CARD_SUCCEEDED,
                    payload: value,
                });

                toast.success("Gift card redeemed successfully");
            },
            (error: any) => {
                dispatch({
                    type: giftCardActionTypes.REDEEM_GIFT_CARD_FAILED,
                });

                toast.error(error.message);
            }
        )
    }
}