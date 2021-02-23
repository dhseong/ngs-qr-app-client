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
  typeSummaryChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

class TypeSummary extends React.Component {

  render() {
    const { classes } = this.props;

    const options = typeSummaryChart.options;
    options.high = this.props.typeMax + 100;

    return (
      <GridItem xs={12} sm={12} md={4}>
        <Card chart>
          <CardHeader color="warning">
            <ChartistGraph
              className="ct-chart"
              data={this.props.typeObject.data}
              type="Bar"
              options={options}
              responsiveOptions={typeSummaryChart.responsiveOptions}
              listener={typeSummaryChart.animation}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Sequencing Types</h4>
            <p className={classes.cardCategory}>The number of Cell Line is presently {this.props.typeMax}</p>
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
        
export default withStyles(styles)(TypeSummary);