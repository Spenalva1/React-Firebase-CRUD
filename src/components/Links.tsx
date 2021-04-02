import React, { useState } from "react";
import firestore from "../firebase";
import { Link } from "../link.interface";
import LinkForm from "./LinkForm";

const Links = () => {
    const initialState: Link[] = [];
    const [links, setLinks] = useState(initialState);

    const addOrEditLink = async (link: Link) => {
        await firestore.collection('links').doc().set(link);
        console.log('New Task Added');
    }

    return (
        <div className="col-12">
            <div className="row mb-4">
                <div className="link-form-ctn col-xs-12 col-md-8 offset-md-2">
                    <LinkForm callback={addOrEditLink} />
                </div>
            </div>
            <div className="row justify-content-around">
                {links.map((l) =>(
                    <div className="col-xs-12 col-md-4 card card-body">
                        <h5 className="card-title">{l.name}</h5>
                        <p className="card-text">{l.url}</p>
                        <p className="card-text">{l.desc}</p>
                    </div>)
                )}
            </div>
        </div>
    )
}

export default Links;