import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../routes';

import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../components';
import HomePage from '../pages/HomePage';
import { Layout } from 'antd';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const { Footer} = Layout;

const TwoFooter = styled(Footer)`
  background-color:#7dbcea;
  display:flex;
`;
const UpperBox = styled.div`
  display:flex;
  padding-top: 20px;
  background-color:#7dbcea;
  justify-content:center;
  align-item:center;
`;

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, [dispatch]);

    return (
        <>
        <Router history={history}>
            <Layout>
            {localStorage.username&&<Header/>}
             <div className="jumbotron">
                <div className="container">
                    <div className="col-md-12 offset-md-0">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Switch>
                        <PrivateRoute exact path="/homepage" component={ HomePage } />
                        {ROUTES.map((route) => (
                            <Route
                            key={route.key}
                            path={route.path}
                            exact
                            component={route.page}
                            />
                        ))}
                        </Switch>
                    </div>
                </div>
            </div>
            {localStorage.username&&
            <UpperBox>
                <Link to ='/homepage'>
                <TwoFooter className="font-weight-bolder">-Scent Searcher-</TwoFooter>
                </Link>
                <Link to ='/userprofile'>
                <TwoFooter className="font-weight-bolder">-My Profile-</TwoFooter>
                </Link>
                {localStorage.username==="admin"&&                
                <Link to ='/adminpage'>
                <TwoFooter className="font-weight-bolder">-Admin Page-</TwoFooter>
                </Link>}

            </UpperBox>}
        </Layout>
      </Router>
      </>
    );
}

export { App };