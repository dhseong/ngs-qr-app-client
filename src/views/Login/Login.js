import React from "react";
import {Box} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle";

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();

  const clientId = "syBsssojJQ4XR7Ki"
  const response_type = "code"
  const redirect_uri = "https://ngs-qr.herokuapp.com/admin/auth"
  const email_address = "ngsqr@email.com"
  const password = "11111"
  // const oauth2Url = `https://oauth2svr.herokuapp.com/oauth2/authorize?client_id=${clientId}&response_type=${response_type}&redirect_uri=${redirect_uri}`;
  const oauth2Url = `https://oauth2svr.herokuapp.com/oauth2/authorize?client_id=${clientId}&response_type=${response_type}&redirect_uri=${redirect_uri}&email=${email_address}&password=${password}`;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Box mt={3}>
                    <h1 className={classes.cardTitle}>
                      Sign in
                    </h1>
                    <h4 className={classes.cardCategory}>
                      Authentication & Authorization
                    </h4>
                  </Box>
                  <Box mt={8}>
                    <h4 className={classes.cardTitle}>
                      Use {' '} <b>ngsgr@email.com</b> {' '} and password {' '} <b>11111</b>
                    </h4>
                  </Box>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter stats>
              <Button color="success" href={oauth2Url}>
                LOG IN
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
