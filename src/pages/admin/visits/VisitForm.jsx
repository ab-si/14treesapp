import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { VisitTypeList } from "../../../types/visits";
import * as groupActionCreators from "../../../redux/actions/groupActions";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { bindActionCreators } from "@reduxjs/toolkit";
import ApiClient from "../../../api/apiClient/apiClient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  maxWidth: 600,
  height: 300,
  overflow: "auto",
  scrollbarWidth: "thin",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const VisitForm = ({ mode, open, handleClose, onSubmit, visit = null }) => {

  const dispatch = useAppDispatch();
  const { getGroups } = bindActionCreators(groupActionCreators, dispatch);
  const [searchStr, setSearchStr] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [formData, setFormData] = useState({
    visit_name: '',
    visit_date: '',
    visit_type: null,
    group_id: null
  });

  const getGroup = async (groupId) => {
    const apiClient = new ApiClient();
    const response = await apiClient.getGroups(0, 1, [{ columnField: 'id', operatorValue: 'equals', value: groupId }]);
    if (response.results.length === 1) {
      setSelectedGroup(response.results[0]);
    }
  }

  useEffect(() => {
    if (visit) {
      setFormData({
        visit_name: visit.visit_name,
        visit_date: visit.visit_date,
        visit_type: VisitTypeList.find((visitType) => visitType.id === visit.visit_type),
        group_id: visit.group_id,
      });

      if (visit.group_id) getGroup(visit.group_id);
      else setSelectedGroup(null);
    }
  }, [visit])

  useEffect(() => {
    getGroups(0, 20);
  }, [])

  useEffect(() => {
    if (searchStr.length > 2) getGroups(0, 20, [{ columnField: 'name', operatorValue: 'contains', value: searchStr }]);
  }, [searchStr])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = visit ? { ...visit } : {};
    data = {
      ...data,
      visit_name: formData.visit_name,
      visit_date: formData.visit_date,
      visit_type: formData.visit_type.id,
      group_id: formData.visit_type.id === 'corporate' ? formData.group_id : null,
    }

    onSubmit(data);
    setFormData({
      visit_name: '',
      visit_date: '',
      visit_type: null,
      group_id: null,
    });

    handleClose();
  };

  let groupList = [];
  const groupsData = useAppSelector(
    (state) => state.groupsData
  );
  if (groupsData) {
    groupList = Object.values(groupsData.groups);
    const idx = groupList.findIndex(group => group.id === formData.group_id);
    if (idx < 0 && selectedGroup) groupList.push(selectedGroup);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" align="center" sx={{ marginBottom: "8px" }}>
            {mode === 'add' ? 'Add Visit' : 'Edit Visit'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid item xs={12}>
                <TextField
                  required
                  name="visit_name"
                  label="Visit Name"
                  value={formData.visit_name}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  name="visit_type"
                  disablePortal
                  options={VisitTypeList}
                  value={formData.visit_type}
                  renderInput={(params) => (
                    <TextField {...params} label="Visit Type" required />
                  )}
                  onChange={(event, value) => {
                    if (VisitTypeList.includes(value))
                      setFormData((prevState) => ({
                        ...prevState,
                        visit_type: value,
                      }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="visit_date"
                  label="Visit Date"
                  type="date"
                  value={formData.visit_date}
                  onChange={handleChange}
                />
              </Grid>
              {(formData.visit_type && formData.visit_type.id === 'corporate') && <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  name="group_id"
                  disablePortal
                  options={groupList}
                  getOptionLabel={(option) => option.name}
                  value={selectedGroup}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Group" onChange={(e) => setSearchStr(e.target.value)} required />
                  )}
                  onChange={(event, value) => {
                    if (value) {
                      setFormData((prevState) => ({
                        ...prevState,
                        group_id: value.id,
                      }));
                      setSelectedGroup(value);
                    }
                  }}
                />
              </Grid>}
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button variant="outlined" color="error" onClick={handleClose} sx={{ marginRight: "8px" }}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit" color="success">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default VisitForm;