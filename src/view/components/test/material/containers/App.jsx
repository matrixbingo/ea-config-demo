import React, {PropTypes} from 'react'
import Component from '../../../utils/base/Component'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from '../components/Header'
import LeftDrawer from '../components/LeftDrawer'
//import /* withWidth,*/ {LARGE, SMALL} from 'material-ui/utils/withWidth'
import ThemeDefault from '../theme-default'
import Data from '../data'
import DashboardPage from './MRealTimePage'
import '../styles.less'
import 'font-awesome/css/font-awesome.css'
import 'flexboxgrid/css/flexboxgrid.css'
import Alert from 'react-s-alert'
import {View} from 'ea-react-dm'
import {PageControl} from '../../../../../controller/Index'
import InstCapitalInfo from './InstCapitalInfo'
import QueueAnim from 'rc-queue-anim'

@View(PageControl)
export default class App extends Component {

    static propTypes = {
        children: PropTypes.element,
        width: PropTypes.number
    }

    constructor(props) {
        super(props)
        const screenW = window.innerWidth
        this.state = {
            navDrawerOpen: screenW < 776 ? false : true,
            width: window.innerWidth
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.width !== nextProps.width) {
            this.setState({})
        }
    }

    handleChangeRequestNavDrawer() {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = () => {
        const screenWidth = window.innerWidth
        if (screenWidth < 776) {
            this.setState({
                navDrawerOpen: false,
                width: screenWidth
            })
        } else {
            this.setState({
                navDrawerOpen: true,
                width: screenWidth
            })
        }
    }

    toggle() {
        //const pageShow = this.getValueByReducers('PageModel.pageShow').toJS()
    }

    // pageShow() {
    //     const pageShow = this.getValueByReducers('PageModel.pageShow').toJS()
    //     return {pageShow.boxed ? [<DashboardPage {...this.props} show={pageShow.boxed}/>] : null}
    //     if (pageShow.boxed) {
    //         return <DashboardPage {...this.props} show={pageShow.boxed}/>
    //     } else if (pageShow.index) {
    //         return <InstCapitalInfo/>
    //     }
    // }

    render() {
        let {navDrawerOpen} = this.state
        const pageShow = this.getValueByReducers('PageModel.pageShow').toJS()
        const paddingLeftDrawerOpen = 236

        const styles = {
            header: {
                paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
            },
            container: {
                margin: '80px 20px 20px 15px',
                paddingLeft: navDrawerOpen && this.state.width > 776 ? paddingLeftDrawerOpen : 0
            }
        }

        return (
            <div>
                <Alert stack={true} timeout={4000}/>
                <MuiThemeProvider muiTheme={ThemeDefault}>
                    <div>

                        <Header styles={styles.header} key="header"
                                handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

                        <LeftDrawer navDrawerOpen={navDrawerOpen}
                                    menus={Data.menus}
                                    username="黄金眼"/>

                        <div style={styles.container}>
                            <QueueAnim delay={pageShow.boxed ? 500:10}>
                                {pageShow.boxed ? <DashboardPage {...this.props} show={pageShow.boxed}/> : null}
                            </QueueAnim>
                            <QueueAnim delay={pageShow.index ? 500:10}>
                                {pageShow.index ? <InstCapitalInfo/> : null}
                            </QueueAnim>

                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}