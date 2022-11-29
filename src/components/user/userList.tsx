import { makeStyles } from "@material-ui/core";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridColumnHeaderParams,
  GridToolbar,
} from "@material-ui/data-grid";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { GridActionsCellItem } from "@mui/x-data-grid/components";
import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import { useUserDetail } from "../hooks/useUserDetail";
const useStyles = makeStyles(() => ({
  buttons: {
    margin: "15px",
  },
}));

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const handleEdit = (id: number) => {
    navigate(`/userList/${id}`);
  };
  const classes = useStyles();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 1, editable: false },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      minWidth: 150,
      flex: 1,
      editable: true,
      type: "number",
    },
    {
      field: "birthday",
      type: "date",
      minWidth: 150,
      flex: 1,
      editable: true,
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {"Birthday"}
          <span role="img" aria-label="enjoy">
            🎂
          </span>
        </strong>
      ),
    },
    {
      field: "actions",
      type: "actions",
      width: 100,
      renderCell(params: GridCellParams) {
        return (
          <>
            <GridActionsCellItem
              icon={<EditIcon />}
              onClick={() => handleEdit(params.row.id)}
              label="Edit"
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              onClick={() => hanldDeleteRow(params.row.id)}
              label="Delete"
            />
          </>
        );
      },
    },
  ];
  const { userList, getUser, delUserItem } = useUserDetail();
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hanldUpdateRow = () => {
    navigate(`/userList/0`);
  };
  const hanldDeleteRow = (id: number) => {
    delUserItem(id);
  };
  return (
    <>
      <Stack>
        <Button
          className={classes.buttons}
          variant="contained"
          onClick={hanldUpdateRow}
        >
          ADD DEFAULT NEW
        </Button>
      </Stack>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={userList || []}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </>
  );
};
export default UserList;
