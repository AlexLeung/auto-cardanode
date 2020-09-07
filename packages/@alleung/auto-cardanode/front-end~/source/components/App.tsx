import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from './Home';
import { MasterPassword } from './MasterPassword';
import { Page } from './pages';
import { useStore } from './state';
import { CreateStake } from './CreateStake';
import { Dashboard } from './Dashboard';
import { Header } from './Header';

const App: React.FC = () => {
    const currentPage = useStore(state => state.currentPage);
    function getPage(): JSX.Element {
        switch(currentPage) {
            case Page.Launch:
                return <Home />;
            case Page.MasterPassword:
                return <MasterPassword />;
            case Page.CreateNewPool:
                return <CreateStake />;
            case Page.Dashboard:
                return <Dashboard />
        }
    }
    return (
        <div id="container" style={{
            margin: '0',
            padding: '0',
            boxSizing: 'border-box',
            fontFamily:'sans-serif',
            background: '#feffff'
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