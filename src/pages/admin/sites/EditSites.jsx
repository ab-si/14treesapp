import React, { useState } from "react";
import StepForm from "../sites/components/StepForm";
import { ownerOptions } from "./temp_data/Form_Data";
import { maintainence_type } from "../../../types/site";
function EditSites({ row, openeditModal, closeEditModal, editSubmit }) {
  const [formData, setFormData] = useState(row);

  const initialValues = {
    id: formData.id,
    name_english: formData.name_english,
    name_marathi: formData.name_marathi,
    owner: {
      value: formData.owner,
      label: formData.owner,
    },
    district: {
      value: formData.district,
      label: formData.district,
    },
    taluka: {
      value: formData.taluka,
      label: formData.taluka,
    },
    village: {
      value: formData.village,
      label: formData.village,
    },
    area: formData.area_acres,
    land_type: formData.land_type,
    land_strata: formData.land_strata,
    length: formData.length_km,
    sampatiPatra: formData.consent_letter,
    maintainence_type: formData.maintainence_type,
  };

  return (
    <StepForm
      open={openeditModal}
      handleClose={closeEditModal}
      useCase={"Edit Site"}
      data={initialValues}
      submitFunction={editSubmit}
    />
  );
}

export default EditSites;
