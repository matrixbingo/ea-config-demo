import React, {Component /*,PropTypes*/} from 'react'
import {Redirect, Router, Route} from 'react-router'
import {page} from 'ea-react-dm'
import History from 'history/lib/createHashHistory'
import Test from '@component/test/Test'
import TestIndex from '../../view/components/test/utils/Index'
import adminlte from '@component/test/adminlte/Adminlte'
import app from '@component/test/material/containers/App'
import DaterangepickerTest from '../../view/components/test/utils/DaterangepickerTest'
import Queueanim from '../../view/components/test/queue-anim/Index'
import Login from '../../view/components/test/material/Login'
import TableList from '../components/utils/table/TableList'

class AppRouter extends Component {

    constructor(props) {
        super(props)
        // Opt-out of persistent state, not recommended.
        this.history = new History({
            queryKey: false
        })
    }

    /**
     * 页面路由总览，children为外接做入口，外接入口即为AppRouter
     */
    render() {
        return (
            <div>
                <Router history={this.history}>
                    <Route path="/test" component={Test}/>
                    <Route path="/testIndex" component={TestIndex}/>
                    <Route path="/index" component={adminlte}/>
                    <Route path="/app" component={app}/>
                    <Route path="/dateTest" component={DaterangepickerTest}/>
                    <Route path="/queueanim" component={Queueanim}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/tab" component={TableList}/>
                    <Redirect from="/" to="/index"/>
                </Router>
            </div>
        )
    }
}

export const rtools = page(AppRouter)