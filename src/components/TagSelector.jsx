import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

const TagSelector = ({ showLabels = true, systemTags, userTags, value, handleChange, margin = "none" }) => {
    const [options, setOptions] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState(value ?? []);

    useEffect(() => {
        const tags = [];
        if (systemTags) tags.push(...systemTags)
        if (userTags) tags.push(...userTags)
        setTags(tags)

        const options = [];
        if (systemTags) {
            if (showLabels) options.push('System Tags');
            options.push(...systemTags);
        }
        if (userTags) {
            if (showLabels) options.push('User Tags');
            options.push(...userTags);
        }

        setOptions(options)
    }, [systemTags, userTags])

    useEffect(() => {
        if (value) setSelectedTags(value);
    }, [value])

    const handleCreateTag = (event, newValue) => {
        console.log(newValue)
        if (newValue && newValue.inputValue) {
            const newTag = newValue.inputValue;
            setTags([...tags, newTag]);
            setSelectedTags([...selectedTags, newTag]);
            handleChange([...selectedTags, newTag]);
        } else {
            const newValues = []
            newValue.forEach(value => {
                if (typeof value === "string") newValues.push(value);
                else if (value && value.inputValue) newValues.push(value.inputValue);
            })
            setSelectedTags(newValues);
            handleChange(newValues);
        }
    };

    return (
        <Autocomplete
            multiple
            value={selectedTags}
            onChange={handleCreateTag}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new tag
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={options}
            getOptionLabel={(option) => {
                if (option === 'System Tags' || option === 'User Tags') return ''; // Skip label from being selectable
                if (typeof option === 'string') return option; // For selected string tags
                if (option.inputValue) return option.inputValue; // For newly created tags
                return option;
            }}
            renderOption={(props, option) => (
                (option === 'System Tags' || option === 'User Tags')
                    ? <li {...props}><strong>{option}</strong></li> // Render label sections
                    : <li {...props}>{option.title || option}</li> // Render tag options
            )}
            freeSolo
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        variant="outlined"
                        label={option.inputValue || option}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Tags"
                    placeholder="Select tags"
                    margin={margin}
                />
            )}
        />
    );
};

export default TagSelector;
