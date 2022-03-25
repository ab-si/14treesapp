import { createStyles, makeStyles } from '@mui/styles';
import { Typography, Box, Grid } from "@mui/material";
import ParkTwoToneIcon from '@mui/icons-material/ParkTwoTone';
import GrassTwoToneIcon from '@mui/icons-material/GrassTwoTone';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import TerrainTwoToneIcon from '@mui/icons-material/TerrainTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import { useRecoilValue } from 'recoil';

import {
    summary
} from '../../../store/adminAtoms';
import { TreeLogCumulative } from './TreeLogCumulative';
import { OpacityTwoTone } from '@mui/icons-material';

export const AdminHome = () => {
    const adminSummary = useRecoilValue(summary);
    const classes = useStyles();
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Typography sx={{ p: 3, pb: 1 }} variant='h5'>
                        Summary
                    </Typography>
                </Grid>
                <Grid item xs={4} md={3} xl={2}>
                    <div className={classes.card}>
                        <Box sx={{ paddingTop: '10px' }}>
                            <ParkTwoToneIcon fontSize='large' />
                            <Typography variant="h3" color="#9BC53D" sx={{ pt: 1, pb: 1 }}>{adminSummary.treeCount}</Typography>
                            <Typography color="#1f3625" variant="subtitle2">Trees</Typography>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={4} md={3} xl={2}>
                    <div className={classes.card}>
                        <Box sx={{ paddingTop: '10px' }}>
                            <GrassTwoToneIcon fontSize='large' />
                            <Typography variant="h3" color="#9BC53D" sx={{ pt: 1, pb: 1 }}>{adminSummary.treeTypeCount}</Typography>
                            <Typography variant="subtitle2" color="#1f3625">Tree Types</Typography>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={4} md={3} xl={2}>
                    <div className={classes.card}>
                        <Box sx={{ paddingTop: '10px' }}>
                            <AssignmentIndTwoToneIcon fontSize='large' />
                            <Typography variant="h3" color="#9BC53D" sx={{ pt: 1, pb: 1 }}>{adminSummary.assignedTreeCount}</Typography>
                            <Typography variant="subtitle2" color="#1f3625">Assigned Trees</Typography>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={4} md={3} xl={2}>
                    <div className={classes.card}>
                        <Box sx={{ paddingTop: '10px' }}>
                            <PermIdentityTwoToneIcon fontSize='large' />
                            <Typography variant="h3" color="#9BC53D" sx={{ pt: 1, pb: 1 }}>{adminSummary.userCount}</Typography>
                            <Typography variant="subtitle2" color="#1f3625">Unique Profiles</Typography>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={4} md={3} xl={2}>
                    <div className={classes.card}>
                        <Box sx={{ paddingTop: '10px' }}>
                            <TerrainTwoToneIcon fontSize='large' />
                            <Typography variant="h3" color="#9BC53D" sx={{ pt: 1, pb: 1 }}>{adminSummary.plotCount}</Typography>
                            <Typography variant="subtitle2" color="#1f3625">Total Plots</Typography>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={4} md={3} xl={2}>
                    <div className={classes.card}>
                        <Box sx={{ paddingTop: '10px' }}>
                            <OpacityTwoTone fontSize='large' />
                            <Typography variant="h3" color="#9BC53D" sx={{ pt: 1, pb: 1 }}>{adminSummary.pondCount}</Typography>
                            <Typography variant="subtitle2" color="#1f3625">Total Ponds</Typography>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ backgroundColor: '#ffffff', p: 2, m:2, borderRadius: 3, boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.15)' }}>
                    <TreeLogCumulative />
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}


const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            width: '100%',
            maxWidth: '180px',
            minHeight: '170px',
            maxHeight: '260px',
            borderRadius: '15px',
            backgroundColor: '#ffffff',
            textAlign: 'center',
            padding: '16px',
            margin: '16px',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.15)',
        },
    })
)