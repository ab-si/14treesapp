import { useEffect, useCallback, useState } from 'react';
import { Divider, Typography, Box, Grid } from "@mui/material";

import * as Axios from "../../../api/local";
import { treeByPlots, treeLoggedByDate } from '../../../store/adminAtoms';
import { TreeSummaryByPlot } from "./components/TreeSummaryByPlot";
import { useSetRecoilState } from 'recoil';
import { Spinner } from '../../../components/Spinner';
import { TreeLoggedByDate } from './components/TreeLoggedByDate';

export const Tree =() => {
    const [loading, setLoading] = useState(true);
    const setTreeByPlots = useSetRecoilState(treeByPlots);
    const setTreeLoggedByDate = useSetRecoilState(treeLoggedByDate);

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            let response = await Axios.default.get(`/trees/groupbyplots`);
            if (response.status === 200) {
                setTreeByPlots(response.data);
            }

            response = await Axios.default.get(`/trees/loggedbydate`);
            if (response.status === 200) {
                response.data.forEach((element, index) => {
                    element['_id'] = element['_id'].substring(0,10)
                });
                setTreeLoggedByDate(response.data);
            }
        } catch (error) {
            console.log(error)
        }

        setLoading(false);
    }, [setTreeByPlots, setTreeLoggedByDate]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    if (loading) {
        return <Spinner text={"Fetching Tree Data!"}/>
    } else {
        return (
            <>
                <Typography variant="h3">Trees</Typography>
                <Divider sx={{backgroundColor: '#ffffff'}}/>
                <Box sx={{p:3}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <Box sx={{backgroundColor:'#ffffff', p:2, borderRadius:3}}>
                                <TreeSummaryByPlot />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box sx={{backgroundColor:'#ffffff', p:2, borderRadius:3}}>
                                <TreeLoggedByDate />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </>
        )
    }
}