import React from 'react'
import ReactGA from 'react-ga'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { NucleotideExplorer } from './components/Explorer/Nucleotide'
import { RdrpExplorer } from './components/Explorer/Rdrp'
import { About } from './pages/About'
import { Team } from './pages/Team'
import { Jbrowse } from './pages/Jbrowse'
import { Access } from './pages/Access'
import { Footer } from './components/Footer'
import { Geo } from './components/Geo'
import { Trees } from './components/Trees'
import './styles/main.css'

export const App = () => {
    React.useEffect(() => {
        // track initial page load
        ReactGA.pageview(window.location.pathname + window.location.search)
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/explorer' component={NucleotideExplorer} />
                <Route exact path='/explorer-rdrp' component={RdrpExplorer} />
                <Route exact path='/about' component={About} />
                <Route exact path='/team' component={Team} />
                <Route exact path='/jbrowse' component={Jbrowse} />
                <Route exact path='/geo' component={Geo} />
                <Route exact path='/trees' component={Trees} />
                <Route exact path='/access' component={Access} />
                <Route
                    exact
                    path='/family'
                    component={() => {
                        return <Redirect to='/explorer' />
                    }}
                />
                <Route
                    exact
                    path='/explore'
                    component={() => {
                        return <Redirect to='/explorer' />
                    }}
                />
                <Route
                    exact
                    path='/query'
                    component={() => {
                        return <Redirect to='/explorer' />
                    }}
                />
                <Route
                    exact
                    path='/explorer-nt'
                    component={() => {
                        return <Redirect to='/explorer' />
                    }}
                />
            </Switch>
            {window.location.pathname !== '/' && <Footer />}
        </div>
    )
}
