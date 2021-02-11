import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ReviewComponent from './ReviewComponent';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid item container style={{ padding: 16 }}>
          {children}
        </Grid>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

export default function InfoSection(props) {
  const classes = useStyles();

  const [value, setValue] = useState(4);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item container direction="column">
      <Grid item>
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
            centered
          >
            <Tab label="Description" />
            <Tab label="Amenities" />
            <Tab label="Services" />
            <Tab label="Reviews" />
            <Tab label="Write a Review" />
          </Tabs>
        </Paper>
      </Grid>
      <TabPanel value={value} index={0}>
        <Typography>{props.description}</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid item container justify="space-between" spacing={3}>
          {props.amenities.map((amenity, index) => (
            <Grid item md={6} key={`${amenity}-${index}`}>
              {amenity}
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid item container justify="space-between" spacing={3}>
          {props.services.map((service, index) => (
            <Grid item md={6} key={`${service}-${index}`}>
              {service}
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid item container>
          {props.reviews}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Grid item container direction="column">
          <ReviewComponent
            reviewError={props.reviewError}
            accommodationId={props.accommodationId}
          />
        </Grid>
      </TabPanel>
    </Grid>
  );
}
