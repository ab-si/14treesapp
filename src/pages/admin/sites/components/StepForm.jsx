import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
  // Typography,
  Autocomplete,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { message, Steps, theme } from "antd";
import {
  ownerOptions,
  LandTypeOptions,
  LandStrataOptions,
  SampatiPatraOptions,
  DistrictOptions,
  TalukaOptions,
  BudhanaOptions,
  JalgaonOptions,
  PuneOptions,
  SambhajinagarOptions,
  BudhanaDTOptions,
  BudhanaKhamgaonOptions,
  BudhanaMalkapurOptions,
  BudhanaMotalaOptions,
  BudhanaNanduraOptions,
  JalgaonJamnerOptions,
  PuneAmbegaonOptions,
  PuneIndapurOptions,
  PuneKhedOptions,
  SambhajiNagarOptions,
} from "../temp_data/Form_Data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StepForm = ({ open, handleClose, useCase, data, submitFunction }) => {
  const [current, setCurrent] = useState(0);

  const nextStep = () => {
    console.log(
      "Next button is clicked and the value of current is: ",
      current
    );
    setCurrent(current + 1);
  };

  const prevStep = () => {
    setCurrent(current - 1);
  };

  const StepFormSteps = [
    {
      title: "Primary Details",
      content: "First-content",
    },
    {
      title: "Land Details",
      content: "Second-content",
    },
    {
      title: "Location Info",
      content: "Third-content",
    },
    {
      title: "Misc Details",
      content: "Last-content",
    },
  ];

  const items = StepFormSteps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const [name_english, setName_English] = useState(data.name_english);
  const [name_marathi, setName_Marathi] = useState(data.name_marathi);
  const [owner, setOwner] = useState(data.owner);

  const [district, setDistrict] = useState(data.district);
  const [districtFlag, setFlag] = useState(data.district?.value);

  const [taluka, setTaluka] = useState(data.taluka);
  const [talukaFlag, setTalukaFlag] = useState(data.taluka?.value);

  const [village, setVillage] = useState(data.village);
  const [area, setArea] = useState(data.area);
  const [land_type, setLand_Type] = useState(data.land_type);
  const [land_strata, setLand_Strata] = useState(data.land_strata);
  const [length, setLength] = useState(data.length);
  const [sampatiPatra, setSampatiPatra] = useState(data.sampatiPatra);
  const [maintenence_type, setMaintenenceType] = useState(
    data.maintenence_type
  );
  // const [landtypeflag, setLandTypeFlag] = useState("");

  const handleOwnerChange = (e, value) => {
    console.log("owner change value for backend : ", value);
    setOwner(value);
  };

  const handleDistrictChange = (e, value) => {
    setDistrict(value);
    console.log("data of district flag", value.value);
    setFlag(value.value);
  };

  const handleTalukaChange = (e, value) => {
    setTaluka(value);
    setTalukaFlag(value.label);
  };

  const handleVillageChange = (e, value) => {
    setVillage(value);
  };

  const handleLandTypeChange = (e) => {
    setLand_Type(e.target.value);
    console.log("land_type: ", land_type);
    // setLandTypeFlag(land_type);
    //console.log("land type flag: ", landtypeflag);
  };

  const handleSubmit = () => {
    if (useCase === "Add Site") {
      const newSiteData = {
        name_marathi: name_marathi,
        name_english: name_english,
        owner: owner.value,
        taluka: taluka.value,
        district: district.value,
        land_type: land_type,
        land_strata: land_strata,
        village: village.value,
        area: area,
        length: length,
        sampatiPatra: sampatiPatra.value,
        maintenence_type: maintenence_type,
      };

      try {
        const response = submitFunction(newSiteData);
        toast.success("New Site Added", response);
        console.log("New site Data : ", response);
      } catch (error) {
        toast.error("Failed to add new site");
        console.log("Error : ", error.message);
      }
      setName_English("");
      setName_Marathi("");
      setOwner("");
      setDistrict("");
      setTaluka("");
      setVillage("");
      setArea("");
      setLand_Type("");
      setLand_Strata("");
      setLength("");
      setSampatiPatra("");
      setMaintenenceType("");

      handleClose();
      setCurrent(0);
    } else {
      const updatedSiteData = {
        id: data.id,
        name_marathi: name_marathi,
        name_english: name_english,
        owner: owner.value,
        taluka: taluka.value,
        district: district.value,
        land_type: land_type,
        land_strata: land_strata,
        village: village.value,
        area: area,
        length: length,
        sampatiPatra: sampatiPatra,
      };
      try {
        const response = submitFunction(updatedSiteData);
        toast.success("Updated Site Data");
        console.log("response from backend: ", response);
      } catch (error) {
        toast.error("Failed to update site data");
        console.log("Error in updating: ", error.message);
      }

      console.log("Updated site Data : ", updatedSiteData);
      setName_English("");
      setName_Marathi("");
      setOwner("");
      setDistrict("");
      setTaluka("");
      setVillage("");
      setArea("");
      setLand_Type("");
      setLand_Strata("");
      setLength("");
      setSampatiPatra("");
      setMaintenenceType("");

      handleClose();
      setCurrent(0);
    }
  };

  useEffect(() => {
    console.log("intial data : ", data);
    console.log("value of taluka: ", taluka);
    console.log("value of taluka flag: ", talukaFlag);
    console.log("value of sampati patra : ", sampatiPatra);

    console.log("value of district flag : ", districtFlag);
  }, data);

  return (
    <>
      <ToastContainer />
      <div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle align="center">{useCase}</DialogTitle>{" "}
          {/*useCase will tell if it is Add or Edit */}
          <Steps current={current} items={items} style={{ padding: "40px" }} />
          <form style={{ padding: "40px" }}>
            <DialogContent>
              {current === 0 && (
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="name_marathi"
                    label="Name (Marathi)"
                    type="text"
                    fullWidth
                    value={name_marathi}
                    onChange={(e) => {
                      setName_Marathi(e.target.value);
                    }}
                  />
                  <TextField
                    margin="dense"
                    name="name_english"
                    label="Name (English)"
                    type="text"
                    fullWidth
                    value={name_english}
                    onChange={(e) => {
                      setName_English(e.target.value);
                    }}
                  />
                  <Autocomplete
                    options={ownerOptions}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    value={owner}
                    onChange={handleOwnerChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="dense"
                        name="owner"
                        label="Owner Type"
                        type="text"
                        fullWidth
                      />
                    )}
                  />
                </>
              )}

              {current === 1 && (
                <DialogContent>
                  <TextField
                    margin="dense"
                    name="area_acres"
                    label="Area (Acres)"
                    type="text"
                    fullWidth
                    value={area}
                    // disabled={landtypeflag === "Roadside (रस्ता)"}
                    onChange={(e) => {
                      setArea(e.target.value);
                    }}
                  />

                  <TextField
                    margin="dense"
                    name="length_km"
                    label="Length (Km)"
                    type="text"
                    fullWidth
                    value={length}
                    // disabled={landtypeflag !== "Roadside (रस्ता)"}
                    onChange={(e) => {
                      setLength(e.target.value);
                    }}
                  />

                  <TextField
                    select
                    margin="dense"
                    name="land_type"
                    label="Land Type"
                    type="text"
                    fullWidth
                    value={land_type}
                    onChange={handleLandTypeChange}
                  >
                    {LandTypeOptions.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    margin="dense"
                    name="land_strata"
                    label="Land Strata"
                    type="text"
                    fullWidth
                    value={land_strata}
                    onChange={(e) => {
                      setLand_Strata(e.target.value);
                    }}
                  >
                    {LandStrataOptions.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </DialogContent>
              )}

              {current === 2 && (
                <DialogContent>
                  <Autocomplete
                    options={DistrictOptions}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    value={district}
                    onChange={handleDistrictChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="dense"
                        name="district"
                        label="District"
                        type="text"
                        fullWidth
                      />
                    )}
                  />
                  {districtFlag === "" && (
                    <TextField
                      select
                      margin="dense"
                      name="taluka"
                      label="Taluka"
                      type="text"
                      fullWidth
                      value={taluka}
                      onChange={handleTalukaChange}
                      disabled={districtFlag === ""}
                    />
                  )}
                  {districtFlag == "Buldhana (बुलढाणा)" && (
                    <Autocomplete
                      options={BudhanaOptions}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      value={taluka}
                      onChange={handleTalukaChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="dense"
                          name="taluka"
                          label="Taluka"
                          type="text"
                          fullWidth
                        />
                      )}
                    />
                  )}{" "}
                  {districtFlag == "Pune (पुणे)" && (
                    <Autocomplete
                      options={PuneOptions}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      value={taluka}
                      onChange={handleTalukaChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="dense"
                          name="taluka"
                          label="Taluka"
                          type="text"
                          fullWidth
                        />
                      )}
                    />
                  )}{" "}
                  {districtFlag == "Sambhajinagar (संभाजीनगर)" && (
                    <Autocomplete
                      options={SambhajinagarOptions}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      value={taluka}
                      onChange={handleTalukaChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="dense"
                          name="taluka"
                          label="Taluka"
                          type="text"
                          fullWidth
                        />
                      )}
                    />
                  )}{" "}
                  {districtFlag == "Jalgaon (जळगाव)" && (
                    <Autocomplete
                      options={JalgaonOptions}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      value={taluka}
                      onChange={handleTalukaChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="dense"
                          name="taluka"
                          label="Taluka"
                          type="text"
                          fullWidth
                        />
                      )}
                    />
                  )}
                  {talukaFlag == "" && (
                    <TextField
                      select
                      margin="dense"
                      name="village"
                      label="Village"
                      type="text"
                      fullWidth
                      value={village}
                      onChange={handleVillageChange}
                      disabled={talukaFlag === ""}
                    ></TextField>
                  )}
                  {districtFlag === "Buldhana (बुलढाणा)" &&
                    talukaFlag === "Buldhana (बुलढाणा)" && (
                      <Autocomplete
                        options={BudhanaDTOptions}
                        getOptionLabel={(option) => option.label}
                        value={village}
                        onChange={handleVillageChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            name="village"
                            label="Village"
                            type="text"
                            fullWidth
                          />
                        )}
                      />
                    )}
                  {districtFlag === "Buldhana (बुलढाणा)" &&
                    talukaFlag === "Khamgaon (खामगाव)" && (
                      <Autocomplete
                        options={BudhanaKhamgaonOptions}
                        getOptionLabel={(option) => option.label}
                        value={village}
                        onChange={handleVillageChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            name="village"
                            label="Village"
                            type="text"
                            fullWidth
                          />
                        )}
                      />
                    )}
                  {districtFlag === "Buldhana (बुलढाणा)" &&
                    talukaFlag === "Malkapur (मलकापूर)" && (
                      <Autocomplete
                        options={BudhanaMalkapurOptions}
                        getOptionLabel={(option) => option.label}
                        value={village}
                        onChange={handleVillageChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            name="village"
                            label="Village"
                            type="text"
                            fullWidth
                          />
                        )}
                      />
                    )}
                  {districtFlag === "Buldhana (बुलढाणा)" &&
                    talukaFlag === "Motala (मोताळा)" && (
                      <Autocomplete
                        options={BudhanaMotalaOptions}
                        getOptionLabel={(option) => option.label}
                        value={village}
                        onChange={handleVillageChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            name="village"
                            label="Village"
                            type="text"
                            fullWidth
                          />
                        )}
                      />
                    )}
                  {districtFlag === "Buldhana (बुलढाणा)" &&
                    talukaFlag === "Nandura (नांदुरा)" && (
                      <Autocomplete
                        options={BudhanaNanduraOptions}
                        getOptionLabel={(option) => option.label}
                        value={village}
                        onChange={handleVillageChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            name="village"
                            label="Village"
                            type="text"
                            fullWidth
                          />
                        )}
                      />
                    )}
                  {districtFlag === "Jalgaon (जळगाव)" &&
                    talukaFlag === "Jamner (जामनेर)" && (
                      <Autocomplete
                        options={JalgaonJamnerOptions}
                        getOptionLabel={(option) => option.label}
                        value={village}
                        onChange={handleVillageChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            name="village"
                            label="Village"
                            type="text"
                            fullWidth
                          />
                        )}
                      />
                    )}
                  {districtFlag === "Pune (पुणे)" &&
                    talukaFlag === "Ambegaon (आंबेगाव)" && (
                      <Autocomplete
                        options={PuneAmbegaonOptions}
                        getOptionLabel={(option) => option.label}
                        value={village}
                        onChange={handleVillageChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            name="village"
                            label="Village"
                            type="text"
                            fullWidth
                          />
                        )}
                      />
                    )}
                  {districtFlag === "Pune (पुणे)" &&
                    talukaFlag === "Indapur (इंदापूर)" && (
                      <Autocomplete
                        options={PuneIndapurOptions}
                        getOptionLabel={(option) => option.label}
                        value={village}
                        onChange={handleVillageChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            name="village"
                            label="Village"
                            type="text"
                            fullWidth
                          />
                        )}
                      />
                    )}
                  {districtFlag === "Pune (पुणे)" &&
                    talukaFlag === "Khed (खेड)" && (
                      <Autocomplete
                        options={PuneKhedOptions}
                        getOptionLabel={(option) => option.label}
                        value={village}
                        onChange={handleVillageChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            name="village"
                            label="Village"
                            type="text"
                            fullWidth
                          />
                        )}
                      />
                    )}
                  {districtFlag === "Sambhajinagar (संभाजीनगर)" &&
                    talukaFlag === "Soegaon" && (
                      <Autocomplete
                        options={SambhajiNagarOptions}
                        getOptionLabel={(option) => option.label}
                        value={village}
                        onChange={handleVillageChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            name="village"
                            label="Village"
                            type="text"
                            fullWidth
                          />
                        )}
                      />
                    )}
                </DialogContent>
              )}

              {current === 3 && (
                <DialogContent>
                  <TextField
                    select
                    margin="dense"
                    name="sampatiPatra"
                    label="Sampati Patra"
                    type="text"
                    fullWidth
                    value={sampatiPatra}
                    onChange={(e) => {
                      setSampatiPatra(e.target.value);
                    }}
                  >
                    {SampatiPatraOptions.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    margin="dense"
                    name="maintenence_type"
                    label="Maintenece Type"
                    type="text"
                    fullWidth
                    value={maintenence_type}
                    onChange={(e) => {
                      setMaintenenceType(e.target.value);
                    }}
                  />
                </DialogContent>
              )}
              <DialogActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              ></DialogActions>
            </DialogContent>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {current <= StepFormSteps.length - 1 && (
              <Button
                variant="contained"
                type="primary"
                color="primary"
                style={{ margin: "0 8px 20px 8px" }}
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            )}
            {current > 0 && (
              <Button
                variant="contained"
                type="primary"
                color="primary"
                style={{ margin: "0 8px 20px 8px" }}
                onClick={() => prevStep()}
              >
                Previous
              </Button>
            )}
            {current < StepFormSteps.length - 1 && (
              <Button
                variant="contained"
                type="primary"
                color="primary"
                style={{ margin: "0 8px 20px 8px" }}
                onClick={() => nextStep()}
              >
                Next
              </Button>
            )}

            {current === StepFormSteps.length - 1 && (
              <Button
                variant="contained"
                type="submit"
                color="primary"
                style={{ margin: "0 8px 20px 8px" }}
                onClick={() => handleSubmit()}
              >
                Done
              </Button>
            )}
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default StepForm;
