import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "../link.interface";

type props = {
    callback: Function,
    editingLink: Link | null,
    isLoading: boolean
}

type formValues = {
    url: string,
    name: string,
    desc: string
}

const LinkForm = (props: props) => {
    const {register, setValue, reset, handleSubmit, formState: { errors }} = useForm<formValues>()

    useEffect(() => {
        if(props.editingLink) {
            setValue('url', props.editingLink.url);
            setValue('name', props.editingLink.name);
            setValue('desc', props.editingLink.desc);
        } else {
            reset();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.editingLink])

    const onSubmit = (values: formValues) => {
        props.callback(values);
        reset();
    }

    // const handleSubmit = (e: FormEvent) => {
        // e.preventDefault();
        // if (values.url === '') {
        //     return;
        // }
        // props.callback(values);
        // setValues(initialValuesState);
    // }

    return (
        <form className="card card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-group input-group is-invalid">
                <div className="input-group-text bg-light">
                    <i className="material-icons">link</i>
                </div>
                <input
                    type="text"
                    {...register("url", {required: true})}
                    className="form-control"
                    placeholder="https://someurl.com"
                    required
                />
                {errors.url && (
                    <div className="invalid-feedback d-block">
                        Please enter a url.
                    </div>)
                }
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                    type="text"
                    {...register("name", {required: true})}
                    className="form-control"
                    placeholder="Website Name"
                />
                {errors.name && (
                    <div className="invalid-feedback d-block">
                        Please choose a name.
                    </div>)
                }
            </div>
            <div className="form-group">
                <textarea
                    {...register("desc")}
                    className="form-control"
                    placeholder="Write a description"
                ></textarea>
            </div>

            <button disabled={props.isLoading} className="btn btn-primary btn-block">{props.editingLink ? 'Update' : 'Save'}</button>
        </form>
    )
}

export default LinkForm;