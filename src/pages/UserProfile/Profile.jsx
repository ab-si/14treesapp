
import 'primeflex/primeflex.css';
import * as Axios from "../../api/local";
import './profile.scss'

import { useEffect, useState, useCallback } from "react";
import { NotFound } from '../notfound/NotFound';
import { useParams } from "react-router";
import { UserInfo } from "./UserInfo/UserInfo";
import { Overall } from "./Overall/Overall";
import { Trees } from "./Trees/Trees";
import { Map } from "./Map/Map";
import { Spinner } from "../../stories/Spinner/Spinner";

export const Profile = () => {
    const { saplingId } = useParams();
    const [saplingData, setSaplingData] = useState({});
    const [overallData, setOverallData] = useState({});
    const [pondsImages, setPondsImages] = useState({});
    const delay = ms => new Promise(res => setTimeout(res, ms));

    let [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        
        const response = await Axios.default.get(`/profile?id=${saplingId}`);
        console.log(response)
        if(response.status === 200) {
            setSaplingData(response.data);
        } else if (response.status === 204) {
            setLoading(false);
            setSaplingData(response.data);
        }
    
        const overallResponse = await Axios.default.get(`/analytics/totaltrees`);
        if(overallResponse.status === 200) {
            setOverallData(overallResponse.data);                
        }

        const pondImagesRes = await Axios.default.get(`/analytics/totalponds`);
        if(pondImagesRes.status === 200) {
            setPondsImages(pondImagesRes.data);                
        }

        await delay(1500);
        setLoading(false);
    }, [saplingId]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div className="main-content">
                {
                    Object.keys(saplingData).length === 0
                    ?
                        <NotFound/>
                    :
                        <div className="p-grid" style={{"marginTop":"15px"}}>
                            <div className="p-col-12 p-md-6 p-sm-12">
                                <UserInfo saplingData={saplingData}/>
                                <Trees trees={saplingData.trees}/>
                            </div>
                            <div className="p-col-12 p-md-6 p-sm-12">
                                <Overall trees={overallData} ponds={pondsImages}/>
                                <div style={{height: '54vh'}}>
                                    <h2 style={{marginTop:'18px'}}>Site Map</h2>
                                    <Map location={saplingData.trees}/>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}