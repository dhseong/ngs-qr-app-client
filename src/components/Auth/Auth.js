import React from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';
import qs from 'query-string';
import {useDispatch, useSelector} from "react-redux";
import allAction from "action";
import {Box} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import Button from "../CustomButtons/Button";
import styles from "../../assets/jss/material-dashboard-react/layouts/adminStyle";

const useStyles = makeStyles(styles);

const Auth = props => {
  const classes = useStyles();

  const {location} = props;
  let {code} = qs.parse(location.search);

  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getToken = async () => {
      const url = "https://oauth2svr.herokuapp.com/oauth2/token";
      const data = {
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: "https://ngs-qr.herokuapp.com/admin/auth"
        // redirect_uri: "http://skku-milab.ddns.net:3300/admin/auth"
      };
      const clientInfo = Buffer.from(
        `syBsssojJQ4XR7Ki:WnWBmlOL7neRFqtfSvL5dm566oH4C0qXcmP06XaZwyLVrxhvHaD9VlwjwOxPvhNz`,
        'utf8'
      ).toString('base64');
      const config = {
        headers: {
          Authorization: `Basic ${clientInfo}`
        },
        withCredentials: true
      };
      await axios
        .post(url, data, config)
        .then(async response => {
          if (response.status === 200) {
            await dispatch(allAction.userAction.loginUser(response.data));
            console.log(response.data)

            const tokenUrl = `http://skku-milab.ddns.net:5000/api/create`;
            // const tokenUrl = `http://skku-milab.ddns.net:5000/api/create`;
            const tokenData = response.data.access_token;
            const tokenCofing = {
              headers: {
                "Content-Type": "application/json"
              },
              withCredentials: true
            }

            await axios
              .post(tokenUrl, tokenData, tokenCofing)
              .then(response => {
                if (response.status === 200) {
                  console.log("Token saved")
                }
              })
              .catch(err => {
                console.log('MongoDB error:', err);
              })
          } else {
            console.log('error');
          }
        })
        .catch(err => {
          console.log('error is : ', err);
        });
    };
    getToken().then(r => {
      console.log("Authenticated")
    });
  }, [code, dispatch]);

  return (
    <div>
      {currentUser.login ? (
        <Redirect to="/admin/dashboard"/>
      ) : (
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
                  <Button color="success">
                    LOADING ...
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      )}
    </div>
  );
};

export default Auth;
