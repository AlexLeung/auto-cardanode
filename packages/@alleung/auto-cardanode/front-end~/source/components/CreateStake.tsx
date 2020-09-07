import * as React from 'react';
import { Button } from './buttons/Button';
import { Page } from './pages';
import { useStore } from './state';

export interface CreateForm {
    name: string;
    ticker: string;
    desc: string;
    pledge: number;
    websiteURL: string;
    password: string;
}

// export const validateStakeForm =() => {
//     if
// }

export const CreateStake: React.FC = (name, ) => {
    const updatePage = useStore(state => state.updatePage);
    // const myChangeHandler = (e: void) => {
    //     //thi
    // }
    return <div>
        
        <div className="createPage" style={{
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3a4660'
        }}>
            {/* Start of the form */}
            <h1>Create New Pool</h1>
            <form action="" style={{
                minWidth: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    width: '100%',
                    paddingTop:'10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label>Name </label>
                    <input type="text" id="formName"/>
                </div>
                <div style={{
                    width: '100%',
                    paddingTop:'10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label>Website Url</label>
                    <input type="url" id="formUrl"/>
                </div>
                <div style={{
                    width: '100%',
                    paddingTop:'10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label>Description </label>
                    <textarea cols={20} rows={3}></textarea>
                </div>
                <div>
                    <Button text="Back" onClick={() => updatePage(Page.Launch)} />
                    &nbsp;
                    <Button text="Create" onClick={() => updatePage(Page.MasterPassword)} />
                </div>
            </form>

        </div>
    </div>
}