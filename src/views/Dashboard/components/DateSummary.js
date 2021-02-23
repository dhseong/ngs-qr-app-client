import React from "react";
import ChartistGraph from "react-chartist";

import { withStyles } from "@material-ui/core/styles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";

import {
  casesByYearChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

class DateSummary extends React.Component {

  render() {
    const { classes } = this.props;

    const options = casesByYearChart.options;
    options.high = this.props.dateMax + 100;

    return (
      <GridItem xs={12} sm={12} md={4}>
        <Card chart>
          <CardHeader color="success">
            <ChartistGraph
              className="ct-chart"
              data={this.props.dateObject.data}
              type="Line"
              options={options}
              listener={casesByYearChart.animation}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Cases by Year</h4>
            <p className={classes.cardCategory}>
              <span className={classes.successText}>
                <ArrowUpward className={classes.upArrowCardCategory} /> 55%
              </span>{" "}
              increase in today sales.
            </p>
          </CardBody>
          <CardFooter chart>
            <div className={classes.stats}>
              <AccessTime /> updated 4 minutes ago
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    )
  }
}
        
export default withStyles(styles)(DateSummary);