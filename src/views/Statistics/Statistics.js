/*eslint-disable*/
import React from "react";
import {useSelector} from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Icons() {
  // styles
  const classes = useStyles();
  // states and functions
  const currentUser = useSelector(state => state.currentUser);

  return (
    <div>
      {!currentUser.login ? (
        <div>
          <Redirect to="/admin/login"/>
        </div>
      ) : (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Statistical Analysis</h4>
                <p className={classes.cardCategoryWhite}>
                  R package using {" "}
                  <a
                    href="http://www.shinyapps.io/"
                    target="_blank"
                  >
                    shinyapps.io
                  </a>
                </p>
              </CardHeader>
              <CardBody>
                <iframe
                  className={classes.iframe}
                  src="https://dhseong.shinyapps.io/NGS-QR-App/"
                  title="iframe"
                >
                  <p>Your browser does not support iframes.</p>
                </iframe>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </div>
  );
}
