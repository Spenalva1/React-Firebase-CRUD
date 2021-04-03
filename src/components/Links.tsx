import React, { useEffect, useState } from "react";
import firestore from "../firebase";
import { Link } from "../link.interface";
import LinkForm from "./LinkForm";
import { toast } from 'react-toastify'

const Links = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [editingLink, setEditingLink] = useState<Link | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getLinks = async () => {
        setIsLoading(true);
        let newLinks: Link[];
        firestore.collection('links').onSnapshot(doc => {
            newLinks = [];
            doc.forEach(d => {
                newLinks.push({
                    id: d.id,
                    ...(d.data() as Link)
                })
            });
            setLinks(newLinks);
            setIsLoading(false);
        });

    }

    useEffect(() => {
        getLinks();
    }, [])

    const addOrEditLink = async (link: Link) => {
        setIsLoading(true);
        if(!editingLink) {
            await firestore.collection('links').doc().set(link);
            toast('New Link Added', {
                type: 'success',
                autoClose: 2000
            });
            setIsLoading(false);
        } else {
            await firestore.collection('links').doc(editingLink.id).update(link);
            setEditingLink(null);
            toast('Link Updated', {
                type: 'info',
                autoClose: 2000
            });
            setIsLoading(false);
        }
    }

    const deleteLink = async (id: string | undefined) => {
        setIsLoading(true);
        await firestore.collection('links').doc(id).delete()
        toast('Link Deleted', {
            type: 'error'
        });
        setIsLoading(false);
    }

    const openInNewTab = (url: string) => {
        const newWindow = window.open('//' + url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div className="col-12">
            <div className="row mb-4">
                <div className="link-form-ctn col-xs-12 col-md-8 offset-md-2">
                    <LinkForm isLoading={isLoading} editingLink={editingLink} callback={addOrEditLink} />
                </div>
            </div>
            <div className="row justify-content-around" style={{'paddingLeft': '15px','paddingRight': '15px'}}>
                {links.map(l =>(
                    <div key={l.id} className="col-xs-12 col-md-4 card mb-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4 className="card-title">{l.name}</h4>
                                <div>
                                    <i style={{cursor: 'pointer'}} onClick={() => setEditingLink(l)} className="material-icons">create</i>
                                    <i style={{cursor: 'pointer'}} onClick={() => deleteLink(l.id)} className="material-icons text-danger">close</i>
                                </div>
                            </div>
                            <p className="card-text">{l.desc}</p>
                            <button onClick={() => openInNewTab(l.url)} className="link">{l.url}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Links;