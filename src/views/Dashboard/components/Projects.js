import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import DateRange from "@material-ui/icons/DateRange";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";



class Projects extends React.Component {
  render() {
    const { classes } = this.props;

    // var count = numberWithCommas(this.props.count);
    var oldDate = this.props.oldDate.substring(0,10);
    var newDate = this.props.newDate.substring(0,10);

    return (
      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="info" stats icon>
            <CardIcon color="info">
              <Icon>apps</Icon>
            </CardIcon>
            <p className={classes.cardCategory}>PROJECTS</p>
            <h3 className={classes.cardTitle}>{count}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              {oldDate} ~ {newDate}
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    )
  }
}

export default withStyles(styles)(Projects);