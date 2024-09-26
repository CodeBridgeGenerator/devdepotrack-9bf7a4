import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const DevinfoCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            PEMAJU: _entity?.PEMAJU,
TAMAN: _entity?.TAMAN,
JUMLAH: _entity?.JUMLAH,
BGREF: _entity?.BGREF,
BANKREF: _entity?.BANKREF,
TARIKH: _entity?.TARIKH,
R1: _entity?.R1,
R2: _entity?.R2,
CALL: _entity?.CALL,
CATATAN: _entity?.CATATAN,
        };

        setLoading(true);
        try {
            
        const result = await client.service("devinfo").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info devinfo updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit Devinfo" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="devinfo-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="PEMAJU">PEMAJU:</label>
            <InputText id="PEMAJU" className="w-full mb-3 p-inputtext-sm" value={_entity?.PEMAJU} onChange={(e) => setValByKey("PEMAJU", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="TAMAN">TAMAN:</label>
            <InputText id="TAMAN" className="w-full mb-3 p-inputtext-sm" value={_entity?.TAMAN} onChange={(e) => setValByKey("TAMAN", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="JUMLAH">JUMLAH:</label>
            <InputNumber id="JUMLAH" className="w-full mb-3 p-inputtext-sm" value={_entity?.JUMLAH} onChange={(e) => setValByKey("JUMLAH", e.value)}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="BGREF">BGREF:</label>
            <InputNumber id="BGREF" className="w-full mb-3 p-inputtext-sm" value={_entity?.BGREF} onChange={(e) => setValByKey("BGREF", e.value)}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="BANKREF">BANKREF:</label>
            <InputText id="BANKREF" className="w-full mb-3 p-inputtext-sm" value={_entity?.BANKREF} onChange={(e) => setValByKey("BANKREF", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="TARIKH">TARIKH:</label>
            <InputText id="TARIKH" className="w-full mb-3 p-inputtext-sm" value={_entity?.TARIKH} onChange={(e) => setValByKey("TARIKH", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="R1">R1:</label>
            <InputText id="R1" className="w-full mb-3 p-inputtext-sm" value={_entity?.R1} onChange={(e) => setValByKey("R1", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="R2">R2:</label>
            <InputText id="R2" className="w-full mb-3 p-inputtext-sm" value={_entity?.R2} onChange={(e) => setValByKey("R2", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="CALL">CALL:</label>
            <InputText id="CALL" className="w-full mb-3 p-inputtext-sm" value={_entity?.CALL} onChange={(e) => setValByKey("CALL", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="CATATAN">CATATAN:</label>
            <InputText id="CATATAN" className="w-full mb-3 p-inputtext-sm" value={_entity?.CATATAN} onChange={(e) => setValByKey("CATATAN", e.target.value)}  required  />
        </span>
        </div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created At:"></Tag>{" " + moment(_entity?.createdAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created By:"></Tag>{" " +_entity?.createdBy?.name}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated At:"></Tag>{" " + moment(_entity?.updatedAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated By:"></Tag>{" " +_entity?.updatedBy?.name}</p></div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(DevinfoCreateDialogComponent);
