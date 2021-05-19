import * as React from 'react';
import { Header } from '../../Header';
import { Button } from '../../buttons/Button';
import { useStore } from '../../../model/state';
import { Page } from '../../../model/pages';

export const SignedInPage: React.FC = props => {
    const [currentPage, updatePage] = useStore(store => [store.currentPage, store.updatePage]);
    return (
        <div>
            <Header 
                left={
                    <>
                        <Button text="Dashboard" onClick={() => updatePage(Page.Dashboard)} disabled={currentPage === Page.Dashboard} />
                        <Button text="Register Infrastructure" onClick={() => updatePage(Page.RegisterInfrastructure)} disabled={currentPage === Page.RegisterInfrastructure} />
                        <Button text="Create Stake Pool" onClick={() => updatePage(Page.CreateNewPool)} disabled={currentPage === Page.CreateNewPool} />
                    </>
                }
                right={
                    <Button text="Sign Out" onClick={() => updatePage(Page.Launch)} /> 
                }
            />
            <div>
                { props.children }
            </div>
        </div>
    )
}