import React, { useEffect } from "react";
//we need current user details so we copy paste it
import { useSelector, useDispatch } from "react-redux";
import Userslist from "./Userslist";
import Orderslist from "./Orderslist";
import Addpizza from "./Addpizza";
import Pizzaslist from "./Pizzaslist";
import { Switch,Route } from "react-router";
import { Link } from "react-router-dom";
import Editpizza from "./Editpizza";

export default function Adminscreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  //destructure the current user
  const { currentUser } = userstate;
  const dispatch = useDispatch();

  useEffect(() => {
    //in this useEffect im gonna check if the current user has admin access or not

    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <div className="row justify-content-center p-3">
        <div className="col-md-10">
          <h2 style={{ fontSize: "35px" }}>Admin Panel</h2>
          <ul className="adminfunctions">
            <li>{/*Link tag is used to avoid page refreshing*/ }
              {/*<a href="/admin/userslist">Users List</a>*/}
              <Link to="/admin/userslist">Users List</Link>
            </li>
            <li>
              {/*<a href="/admin/pizzaslist">Pizzas List</a>*/}
              <Link to="/admin/pizzaslist">Pizzas List</Link>
            </li>
            <li>
              {/*<a href="/admin/addpizza">Add New Pizza</a>*/}
              <Link to="/admin/addpizza">Add New Pizza</Link>
            </li>
            <li>
              {/*<a href="/admin/orderslist">Orders List</a>*/}
              <Link to="/admin/orderslist">Orders List</Link>
            </li>
          </ul>
          <Switch>
              <Route path="/admin" component={Userslist} exact/>
              <Route path="/admin/userslist" component={Userslist} exact/>
              <Route path="/admin/orderslist" component={Orderslist} exact/>
              <Route path="/admin/addpizza" component={Addpizza} exact/>
              <Route path="/admin/pizzaslist" component={Pizzaslist} exact/>
              <Route path="/admin/editpizza/:pizzaid" component={Editpizza} exact/>
          </Switch>
        </div>
      </div>
    </div>
  );
}
