import * as React from 'react';
import { Header } from '../../Header';

export const SignedInPage: React.FC = props => {
    return (
        <div>
            <Header />
            <div>
                { props.children }
            </div>
        </div>
    )
}