import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../services/uploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../utils/DownloadCSV";

const DevinfoDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');

const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.PEMAJU}</p>
const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.TAMAN}</p>
const p_numberTemplate2 = (rowData, { rowIndex }) => <p >{rowData.JUMLAH}</p>
const p_numberTemplate3 = (rowData, { rowIndex }) => <p >{rowData.BGREF}</p>
const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.BANKREF}</p>
const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.TARIKH}</p>
const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.R1}</p>
const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.R2}</p>
const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.CALL}</p>
const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.CATATAN}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-upload" text onClick={() => setShowUpload(true)} disabled={!false}/>;
    const paginatorRight = DownloadCSV({ data : items, fileName : "devinfo"});
    const exportCSV = () => {dt.current?.exportCSV();};

    return (
        <>
        <DataTable value={items} ref={dt} removableSort onRowClick={onRowClick} scrollable rowHover stripedRows paginator rows={10} rowsPerPageOptions={[10, 50, 250, 500]} size={"small"}  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} rowClassName="cursor-pointer" alwaysShowPaginator={!urlParams.singleUsersId} loading={loading}>
<Column field="PEMAJU" header="PEMAJU" body={pTemplate0} filter={selectedFilterFields.includes("PEMAJU")} hidden={selectedHideFields?.includes("PEMAJU")}  sortable style={{ minWidth: "8rem" }} />
<Column field="TAMAN" header="TAMAN" body={pTemplate1} filter={selectedFilterFields.includes("TAMAN")} hidden={selectedHideFields?.includes("TAMAN")}  sortable style={{ minWidth: "8rem" }} />
<Column field="JUMLAH" header="JUMLAH" body={p_numberTemplate2} filter={selectedFilterFields.includes("JUMLAH")} hidden={selectedHideFields?.includes("JUMLAH")}  sortable style={{ minWidth: "8rem" }} />
<Column field="BGREF" header="BGREF" body={p_numberTemplate3} filter={selectedFilterFields.includes("BGREF")} hidden={selectedHideFields?.includes("BGREF")}  sortable style={{ minWidth: "8rem" }} />
<Column field="BANKREF" header="BANKREF" body={pTemplate4} filter={selectedFilterFields.includes("BANKREF")} hidden={selectedHideFields?.includes("BANKREF")}  sortable style={{ minWidth: "8rem" }} />
<Column field="TARIKH" header="TARIKH" body={pTemplate5} filter={selectedFilterFields.includes("TARIKH")} hidden={selectedHideFields?.includes("TARIKH")}  sortable style={{ minWidth: "8rem" }} />
<Column field="R1" header="R1" body={pTemplate6} filter={selectedFilterFields.includes("R1")} hidden={selectedHideFields?.includes("R1")}  sortable style={{ minWidth: "8rem" }} />
<Column field="R2" header="R2" body={pTemplate7} filter={selectedFilterFields.includes("R2")} hidden={selectedHideFields?.includes("R2")}  sortable style={{ minWidth: "8rem" }} />
<Column field="CALL" header="CALL" body={pTemplate8} filter={selectedFilterFields.includes("CALL")} hidden={selectedHideFields?.includes("CALL")}  sortable style={{ minWidth: "8rem" }} />
<Column field="CATATAN" header="CATATAN" body={pTemplate9} filter={selectedFilterFields.includes("CATATAN")} hidden={selectedHideFields?.includes("CATATAN")}  sortable style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>
        <Dialog header="Upload Devinfo Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="devinfo"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search Devinfo" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default DevinfoDataTable;