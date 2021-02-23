import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Cases extends React.Component {
  render() {
    const { classes } = this.props;

    var count = numberWithCommas(this.props.count);

    return (
      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="primary" stats icon>
            <CardIcon color="primary">
              <Icon>content_copy</Icon>
            </CardIcon>
            <p className={classes.cardCategory}>CASES</p>
            <h3 className={classes.cardTitle}>{count}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              <LocalOffer />
              <Update />
              Last 24 Hours
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    )
  }
}

export default withStyles(styles)(Cases);
