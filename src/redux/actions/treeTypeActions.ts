import ApiClient from "../../api/apiClient/apiClient";
import treeTypeActionTypes from "../actionTypes/treeTypeActionTypes";
import { TreeType } from "../../types/treeType";

export const getTreeTypes = () => {
    const apiClient = new ApiClient()
    return (dispatch: any) => {
        dispatch({
            type: treeTypeActionTypes.GET_TREE_TYPES_REQUESTED,
        });
        apiClient.getTreeTypes().then(
            (value: TreeType[]) => {
                for (let i = 0; i < value.length; i++) {
                    if (value[i]?._id) {
                        value[i].key = value[i]._id
                    }
                }
                dispatch({
                    type: treeTypeActionTypes.GET_TREE_TYPES_SUCCEEDED,
                    payload: value,
                });
            },
            (error: any) => {
                console.log(error)
                dispatch({
                    type: treeTypeActionTypes.GET_TREE_TYPES_FAILED,
                    payload: error
                });
            }
        )
    }
};

export const createTreeTypes = (record: TreeType) => {
    const apiClient = new ApiClient();
    return (dispatch: any) => {
        dispatch({
            type: treeTypeActionTypes.CREATE_TREE_TYPE_REQUESTED,
        });
        apiClient.createTreeType(record).then(
            (value: TreeType) => {
                dispatch({
                    type: treeTypeActionTypes.CREATE_TREE_TYPE_SUCCEEDED,
                    payload: value,
                });
            },
            (error: any) => {
                console.error(error);
                dispatch({
                    type: treeTypeActionTypes.CREATE_TREE_TYPE_FAILED,
                });
            }
        )
    };
}
