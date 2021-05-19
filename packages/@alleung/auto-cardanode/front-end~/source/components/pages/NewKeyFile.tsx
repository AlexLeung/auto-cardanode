import * as React from 'react';
import { CenterVeritcalAndHorizontal } from '../layouts/CenterVertAndHoriz';
import { Button } from '../buttons/Button';
import { useStore } from '../../model/state';
import { Page } from '../../model/pages';
import { CenterHorizontal } from '../layouts/CenterHoriz';
import { Title } from '../Title';
import { TextInput, TextInputType } from '../TextInput';
import { ErrorReporter } from '../ErrorReporter';

const passwordsDontMatch = "passwords aren't matching";

export const NewKeyFile: React.FC = () => {
    const updatePage = useStore(state => state.updatePage);
    const [firstPassword, setFirstPassword] = React.useState("");
    const [secondPassword, setSecondPassword] = React.useState("");
    
    const errorText = firstPassword !== secondPassword ? passwordsDontMatch : undefined;
    

    return (
        <CenterVeritcalAndHorizontal>
            <TextInput type={TextInputType.Password}
                label="New Key File Password" onChange={setFirstPassword} />
            <TextInput type={TextInputType.Password}
                label="Repeat Password" onChange={setSecondPassword} />
            <ErrorReporter text={errorText} />
            <CenterHorizontal width={250}>
                <Button text="Back" onClick={() => updatePage(Page.Launch)} />
                <Button text="Submit" onClick={() => {}} disabled={true} />
            </CenterHorizontal>
        </CenterVeritcalAndHorizontal>
    )
}