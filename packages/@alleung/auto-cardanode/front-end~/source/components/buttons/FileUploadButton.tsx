import * as React from 'react';
import { Button } from './Button';

export const FileUploadSubmitButton: React.FC<{text:string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = (props) => (
    <Button text={props.text}>
        <label style={{display: "block", position: "absolute", top: 0, left: 0, height: '100%', width: '100%', cursor: 'pointer'}}>
            <input type="file" style={{display:'none'}} onChange={props.onChange}/>
        </label>
    </Button>
)