import React from "react";
import ChartistGraph from "react-chartist";

import { withStyles } from "@material-ui/core/styles";
import AccessTime from "@material-ui/icons/AccessTime";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";

import {
  celllineSummaryChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

class CelllineSummary extends React.Component {

  render() {
    const { classes } = this.props;

    const options = celllineSummaryChart.options;
    options.high = this.props.cellineMax + 100;

    return (
      <GridItem xs={12} sm={12} md={4}>
        <Card chart>
          <CardHeader color="danger">
            <ChartistGraph
              className="ct-chart"
              data={this.props.celllineObject.data}
              type="Line"
              options={celllineSummaryChart.options}
              listener={celllineSummaryChart.animation}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Cell Line</h4>
            <p className={classes.cardCategory}>Last Campaign Performance</p>
          </CardBody>
          <CardFooter chart>
            <div className={classes.stats}>
              <AccessTime /> campaign sent 2 days ago
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    )
  }
}
        
export default withStyles(styles)(CelllineSummary);