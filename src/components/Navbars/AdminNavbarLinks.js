import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import allAction from "action";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  const handleClickLogOut = () => {
    dispatch(allAction.userAction.logoutUser())
  };

  return (
    <div>
      {
      //   currentUser.login ? (
      //   <div className={classes.manager}>
      //     <Link to="/admin/login">
      //       <Button color="white" aria-label="edit" onClick={handleClickLogOut}>
      //         LOG OUT
      //       </Button>
      //     </Link>
      //   </div>
      // ) : (
        <div className={classes.manager}>
          {/*<Link to="/admin/login">*/}
            <Button color="white" aria-label="edit">
              LOG IN
            </Button>
          {/*</Link>*/}
        </div>
      // )
      }
    </div>
  );
}
