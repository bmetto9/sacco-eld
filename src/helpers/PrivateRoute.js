import React, { useContext } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

function PrivateRoute({ component: RouteComponent, ...rest}) {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={routeProps => 
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Navigate to={"/?signIn=true"} />
                )
            }
        />
    )
}

export default PrivateRoute
