import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from './pages/Home';
import { MasterPassword } from './pages/MasterPassword';
import { Page } from '../model/pages';
import { useStore } from '../model/state';
import { CreateNewPool } from './pages/CreateNewPool';
import { Dashboard } from './pages/Dashboard';
import { Header } from './Header';
import { NewKeyFile } from './pages/NewKeyFile';
import { theme } from './theme';

const App: React.FC = () => {
    const currentPage = useStore(state => state.currentPage);
    function getPage(): JSX.Element {
        switch(currentPage) {
            case Page.Launch:
                return <Home />;
            case Page.MasterPassword:
                return <MasterPassword />;
            case Page.CreateNewPool:
                return <CreateNewPool />;
            case Page.Dashboard:
                return <Dashboard />
            case Page.CreateNewKeyFile:
                return <NewKeyFile />
        }
    }
    return (
        <div style={{
            margin: '0',
            padding: '0',
            boxSizing: 'border-box',
            fontFamily: theme.fontFamily,
            background: theme.background
        }}>
            { getPage() }
        </div>
    )
}

export function render() {
    ReactDOM.render(
        <App />,
        window.document.getElementById("app")
    );    
}