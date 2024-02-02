import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import { DOMEventHandlers, TitleLevel } from '@mindfiredigital/canvas-editor';
import { HeadingLevel } from '../../utils/constant';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const HeadingDropdownButton: React.FC = () => {
  const [selectedHeading, setSelectedHeading] = useState<string | null>(null);

  const handleHeadingSelect = (headingLevel: string | null) => {
    setSelectedHeading(headingLevel);
    const level = headingLevel
      ? HeadingLevel[headingLevel as keyof typeof HeadingLevel]
      : null;
    DOMEventHandlers.setTitle(level as TitleLevel | null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContentt: 'center',
        alignItems: 'center',
        margin: '0 0.5rem',
      }}
    >
      <FormControl
        sx={{ m: 1, minWidth: 80, width: 120 }}
        size="small"
        variant="standard"
      >
        <Select
          labelId="heading-label"
          sx={{ fontSize: '0.9rem' }}
          value={selectedHeading ? selectedHeading : 'Normal'}
        >
          {Object.keys(HeadingLevel).map((level) => (
            <MenuItem
              key={level}
              value={level}
              sx={{
                fontSize: `${
                  level === 'Normal'
                    ? 16
                    : 26 - Number(level.charAt(level.length - 1)) * 2
                }px`,
                fontWeight: `${level === 'Normal' ? '' : 'bold'}`,
              }}
              onClick={() =>
                handleHeadingSelect(level === 'Normal' ? null : level)
              }
            >
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default HeadingDropdownButton;
