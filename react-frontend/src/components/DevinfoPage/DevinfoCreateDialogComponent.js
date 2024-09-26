import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const DevinfoCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.PEMAJU)) {
                error["PEMAJU"] = `PEMAJU field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.TAMAN)) {
                error["TAMAN"] = `TAMAN field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.BANKREF)) {
                error["BANKREF"] = `BANKREF field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.TARIKH)) {
                error["TARIKH"] = `TARIKH field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.R1)) {
                error["R1"] = `R1 field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.R2)) {
                error["R2"] = `R2 field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.CALL)) {
                error["CALL"] = `CALL field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.CATATAN)) {
                error["CATATAN"] = `CATATAN field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            PEMAJU: _entity?.PEMAJU,TAMAN: _entity?.TAMAN,JUMLAH: _entity?.JUMLAH,BGREF: _entity?.BGREF,BANKREF: _entity?.BANKREF,TARIKH: _entity?.TARIKH,R1: _entity?.R1,R2: _entity?.R2,CALL: _entity?.CALL,CATATAN: _entity?.CATATAN,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("devinfo").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Devinfo created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Devinfo" });
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
        <Dialog header="Create Devinfo" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="devinfo-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="PEMAJU">PEMAJU:</label>
                <InputText id="PEMAJU" className="w-full mb-3 p-inputtext-sm" value={_entity?.PEMAJU} onChange={(e) => setValByKey("PEMAJU", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["PEMAJU"]) ? (
              <p className="m-0" key="error-PEMAJU">
                {error["PEMAJU"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="TAMAN">TAMAN:</label>
                <InputText id="TAMAN" className="w-full mb-3 p-inputtext-sm" value={_entity?.TAMAN} onChange={(e) => setValByKey("TAMAN", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["TAMAN"]) ? (
              <p className="m-0" key="error-TAMAN">
                {error["TAMAN"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="JUMLAH">JUMLAH:</label>
                <InputNumber id="JUMLAH" className="w-full mb-3 p-inputtext-sm" value={_entity?.JUMLAH} onChange={(e) => setValByKey("JUMLAH", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["JUMLAH"]) ? (
              <p className="m-0" key="error-JUMLAH">
                {error["JUMLAH"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="BGREF">BGREF:</label>
                <InputNumber id="BGREF" className="w-full mb-3 p-inputtext-sm" value={_entity?.BGREF} onChange={(e) => setValByKey("BGREF", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["BGREF"]) ? (
              <p className="m-0" key="error-BGREF">
                {error["BGREF"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="BANKREF">BANKREF:</label>
                <InputText id="BANKREF" className="w-full mb-3 p-inputtext-sm" value={_entity?.BANKREF} onChange={(e) => setValByKey("BANKREF", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["BANKREF"]) ? (
              <p className="m-0" key="error-BANKREF">
                {error["BANKREF"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="TARIKH">TARIKH:</label>
                <InputText id="TARIKH" className="w-full mb-3 p-inputtext-sm" value={_entity?.TARIKH} onChange={(e) => setValByKey("TARIKH", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["TARIKH"]) ? (
              <p className="m-0" key="error-TARIKH">
                {error["TARIKH"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="R1">R1:</label>
                <InputText id="R1" className="w-full mb-3 p-inputtext-sm" value={_entity?.R1} onChange={(e) => setValByKey("R1", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["R1"]) ? (
              <p className="m-0" key="error-R1">
                {error["R1"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="R2">R2:</label>
                <InputText id="R2" className="w-full mb-3 p-inputtext-sm" value={_entity?.R2} onChange={(e) => setValByKey("R2", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["R2"]) ? (
              <p className="m-0" key="error-R2">
                {error["R2"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="CALL">CALL:</label>
                <InputText id="CALL" className="w-full mb-3 p-inputtext-sm" value={_entity?.CALL} onChange={(e) => setValByKey("CALL", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["CALL"]) ? (
              <p className="m-0" key="error-CALL">
                {error["CALL"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="CATATAN">CATATAN:</label>
                <InputText id="CATATAN" className="w-full mb-3 p-inputtext-sm" value={_entity?.CATATAN} onChange={(e) => setValByKey("CATATAN", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["CATATAN"]) ? (
              <p className="m-0" key="error-CATATAN">
                {error["CATATAN"]}
              </p>
            ) : null}
          </small>
            </div>
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
