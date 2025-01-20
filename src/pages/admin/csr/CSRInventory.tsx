import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import CSRTrees from "./CSRTrees";
import CSRPlotStates from "./CSRPlotStates";
import { AutocompleteWithPagination } from "../../../components/AutoComplete";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { bindActionCreators } from "@reduxjs/toolkit";
import { Group } from "../../../types/Group";
import * as groupActionCreators from '../../../redux/actions/groupActions';
import ApiClient from "../../../api/apiClient/apiClient";
import { toast } from "react-toastify";
import { Forest, GrassTwoTone, ModeOfTravel, NaturePeople } from "@mui/icons-material";
import CSRSiteStates from "./CSRSiteStates";
import SitesMap from "./SitesMap";

const CSRInventory: React.FC = () => {

    const dispatch = useAppDispatch();
    const { getGroups } = bindActionCreators(groupActionCreators, dispatch);

    ///*** GROUP ***/
    const [groupPage, setGroupPage] = useState(0);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [groupNameInput, setGroupNameInput] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            getGroupsData();
        }, 300);

        return () => {
            clearTimeout(handler);
        }
    }, [groupPage, groupNameInput]);

    const getGroupsData = async () => {
        const groupNameFilter = {
            columnField: "name",
            value: groupNameInput,
            operatorValue: "contains",
        };

        getGroups(groupPage * 10, 10, [groupNameFilter]);
    };

    let groupsList: Group[] = [];
    const groupData = useAppSelector((state) => state.groupsData);

    if (groupData) {
        groupsList = Object.values(groupData.groups);
        groupsList = groupsList.sort((a, b) => {
            return b.id - a.id;
        });
    }

    ///*** CSR Cards ***/
    const classes = useStyles();
    const [csrAnalytics, setCsrAnalytics] = useState<any>(null);

    useEffect(() => {
        const getCSRAnalytics = async () => {
            try {
                const apiClient = new ApiClient();
                const data = await apiClient.getCSRAnalytics(selectedGroup?.id);
                setCsrAnalytics(data);
            } catch (error) {
                toast.error("Failed to fetch CSR analytics data");
            }
        }

        getCSRAnalytics();
    }, [selectedGroup]);

    ///*** Tags ***/
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const getTags = async () => {
            try {
                const apiClient = new ApiClient();
                const tagsResp = await apiClient.getTags(0, 100);
                setTags(tagsResp.results.map(item => item.tag))
            } catch (error: any) {
                toast.error(error.message);
            }
        }

        getTags();
    }, []);

    return (
        <Box>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "4px 12px",
                }}
            >
                <Typography variant="h4" style={{ marginTop: '5px' }}>CSR Analytics</Typography>

                <AutocompleteWithPagination
                    label="Select a corporate group"
                    options={groupsList}
                    getOptionLabel={(option) => option?.name || ''}
                    onChange={(event, newValue) => {
                        setSelectedGroup(newValue);
                    }}
                    onInputChange={(event) => {
                        const { value } = event.target;
                        setGroupPage(0);
                        setGroupNameInput(value);
                    }}
                    setPage={setGroupPage}
                    size="small"
                    value={selectedGroup}
                />
            </div>
            <Divider sx={{ backgroundColor: "black", marginBottom: '15px' }} />

            {csrAnalytics && <Box style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}
            >
                <div className={classes.card}>
                    <Box sx={{ paddingTop: "10px" }}>
                        <Forest fontSize="large" style={{ color: "#53ad7a" }} />
                        <Typography variant="h3" color="#fff" sx={{ pt: 1, pb: 1 }}>
                            {csrAnalytics.sponsored_trees ? csrAnalytics.sponsored_trees : '0'}
                        </Typography>
                        <Typography variant="subtitle2" color="#1f3625">
                            Sponsored Trees
                        </Typography>
                    </Box>
                </div>
                <div className={classes.card}>
                    <Box sx={{ paddingTop: "10px" }}>
                        <NaturePeople
                            fontSize="large"
                            style={{ color: "#573D1C" }}
                        />
                        <Typography variant="h3" color="#fff" sx={{ pt: 1, pb: 1 }}>
                            {csrAnalytics.assigned_trees ? csrAnalytics.assigned_trees : '0'}
                        </Typography>
                        <Typography variant="subtitle2" color="#1f3625">
                            Assigned Trees
                        </Typography>
                    </Box>
                </div>
                <div className={classes.card}>
                    <Box sx={{ paddingTop: "10px" }}>
                        <GrassTwoTone fontSize="large" style={{ color: "#F94F25" }} />
                        <Typography variant="h3" color="#fff" sx={{ pt: 1, pb: 1 }}>
                            {csrAnalytics.plant_types ? csrAnalytics.plant_types : '0'}
                        </Typography>
                        <Typography variant="subtitle2" color="#1f3625">
                            Plant Types
                        </Typography>
                    </Box>
                </div>
                <div className={classes.card}>
                    <Box sx={{ paddingTop: "10px" }}>
                        <ModeOfTravel fontSize="large" style={{ color: "#078085" }} />
                        <Typography variant="h3" color="#fff" sx={{ pt: 1, pb: 1 }}>
                            {csrAnalytics.area ? csrAnalytics.area?.toFixed(2) : '0'}
                        </Typography>
                        <Typography variant="subtitle2" color="#1f3625">
                            Acres Sponsored
                        </Typography>
                    </Box>
                </div>
            </Box>}

            <CSRSiteStates groupId={selectedGroup?.id} tags={tags} />
            <Box style={{ marginBottom: '50px' }}>
                <SitesMap />
            </Box>
            <CSRPlotStates groupId={selectedGroup?.id} tags={tags} />
            <CSRTrees groupId={selectedGroup?.id} />
        </Box>
    );
}

export default CSRInventory;

const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            width: "100%",
            maxWidth: "180px",
            minHeight: "170px",
            maxHeight: "260px",
            borderRadius: "15px",
            textAlign: "center",
            padding: "16px",
            margin: "15px",
            background: "linear-gradient(145deg, #9faca3, #bdccc2)",
            // boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.15)',
            boxShadow: "7px 7px 14px #9eaaa1,-7px -7px 14px #c4d4c9",
        },
    })
);