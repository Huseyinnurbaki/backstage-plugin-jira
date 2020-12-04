/*
 * Copyright 2020 RoadieHQ
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { useStatuses } from '../../../hooks';
import { SelectorsProps } from '../../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};

export const Selectors = ({
  projectKey,
  statusesNames,
  setStatusesNames,
  fetchProjectInfo,
}: SelectorsProps) => {
  const classes = useStyles();
  const { statuses, statusesLoading, statusesError } = useStatuses(projectKey);

  const handleStatusesChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setStatusesNames(event.target.value as string[]);
  };

  // Show selector only when needed
  return !statusesLoading &&
    !statusesError &&
    statuses &&
    statuses.length >= 2 ? (
    <Box py={2}>
      <Divider />
      <Box display="flex" justifyContent="flex-end" py={2}>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-multiple-projects-statuses">
            Statuses
          </InputLabel>
          <Select
            labelId="select-statuses-label"
            id="select-statuses"
            multiple
            value={statusesNames}
            onChange={handleStatusesChange}
            input={<Input />}
            renderValue={selected =>
              (selected as Array<string>).filter(Boolean).join(', ')
            }
            MenuProps={MenuProps}
            onClose={fetchProjectInfo}
          >
            {statuses.map(status => (
              <MenuItem key={status} value={status}>
                <Checkbox checked={statusesNames.indexOf(status) > -1} />
                <ListItemText primary={status} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  ) : null;
};
