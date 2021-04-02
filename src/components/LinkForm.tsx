import React, { ChangeEvent, FormEvent, useState } from "react";

type props = {
    callback: Function
}

const LinkForm = (props: props) => {
    const initialState = {
        url: '',
        name: '',
        desc: ''
    };

    const [values, setValues] = useState(initialState);

    const handleInputChange = (e: ChangeEvent) => {
        setValues({
            ...values,
            [(e.target as any).name]: (e.target as any).value
        });
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.callback(values);
        setValues(initialState);
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

            <button className="btn btn-primary btn-block">Save</button>
        </form>
    )
}

export default LinkForm;