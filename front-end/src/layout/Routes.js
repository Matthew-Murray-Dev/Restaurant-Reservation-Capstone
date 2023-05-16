import React from "react";

import { Redirect, Route, Switch,} from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Search from "../search/Search";
import NewReservation from "../createAndUpdate/newReservation/NewReseration";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";


/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */




function Routes() {
  const query = useQuery();
let date = query.get("date")
  console.log(query.get("date"))
if (!date){date=today()}
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} />
      </Route>
      <Route exact={true} path="/search">
        <Search/>
      </Route>
      <Route exact={true} path="/reservations/new"><NewReservation/></Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
