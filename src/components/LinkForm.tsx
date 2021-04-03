import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "../link.interface";

type props = {
    callback: Function,
    editingLink: Link | null
}

const LinkForm = (props: props) => {
    const initialValuesState: Link = {
        url: '',
        name: '',
        desc: ''
    };
    const [values, setValues] = useState(initialValuesState);

    useEffect(() => {
        if(props.editingLink) {
            setValues({...props.editingLink});
        } else {
            setValues({...initialValuesState});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.editingLink])

    const handleInputChange = (e: ChangeEvent) => {
        setValues({
            ...values,
            [(e.target as any).name]: (e.target as any).value
        });
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.callback(values);
        setValues(initialValuesState);
    }

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">link</i>
                </div>
                <input
                    value={values.url}
                    onChange={handleInputChange}
                    type="text"
                    name="url"
                    className="form-control"
                    placeholder="https://someurl.com"
                />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                    value={values.name}
                    onChange={handleInputChange}
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Website Name"
                />
            </div>
            <div className="form-group">
                <textarea
                    value={values.desc}
                    onChange={handleInputChange}
                    name="desc"
                    className="form-control"
                    placeholder="Write a description"
                ></textarea>
            </div>

            <button className="btn btn-primary btn-block">{props.editingLink ? 'Update' : 'Save'}</button>
        </form>
    )
}

export default LinkForm;