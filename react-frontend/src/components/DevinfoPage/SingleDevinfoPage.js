import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleDevinfoPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("devinfo")
            .get(urlParams.singleDevinfoId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Devinfo", type: "error", message: error.message || "Failed get devinfo" });
            });
    }, [props,urlParams.singleDevinfoId]);


    const goBack = () => {
        navigate("/devinfo");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Devinfo</h3>
                </div>
                <p>devinfo/{urlParams.singleDevinfoId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">PEMAJU</label><p className="m-0 ml-3" >{_entity?.PEMAJU}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">TAMAN</label><p className="m-0 ml-3" >{_entity?.TAMAN}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">JUMLAH</label><p className="m-0 ml-3" >{Number(_entity?.JUMLAH)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">BGREF</label><p className="m-0 ml-3" >{Number(_entity?.BGREF)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">BANKREF</label><p className="m-0 ml-3" >{_entity?.BANKREF}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">TARIKH</label><p className="m-0 ml-3" >{_entity?.TARIKH}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">R1</label><p className="m-0 ml-3" >{_entity?.R1}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">R2</label><p className="m-0 ml-3" >{_entity?.R2}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">CALL</label><p className="m-0 ml-3" >{_entity?.CALL}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">CATATAN</label><p className="m-0 ml-3" >{_entity?.CATATAN}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleDevinfoPage);
