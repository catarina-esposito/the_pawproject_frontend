import { Form, Image } from 'react-bulma-components';
import { useRef } from 'react';
import "./ImageUpload.css";

export default function ImageUpload({ image, onChange, disabled }) {
    const inputRef = useRef();
    return (
        <div className="imageWrap">
            <Form.Input className="uploadFileInput" domRef={inputRef} type="file" onChange={(event) => {
                onChange(event.target.files)
            }} disabled={disabled} />
            <Image
                className="uploadImage"
                width={160}
                height={160}
                src={image || '/drop_gallery.svg'}
                alt="loading"
                onClick={() => inputRef.current.click()}
            />
        </div>
    );
}
