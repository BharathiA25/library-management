import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { getAllmembers, deleteMember, updateMemberStatus } from '../api/MemberApi.js';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Box , Typography} from "@mui/material";
import {toast} from 'react-toastify'
import { getThemeControl } from '../utils.js';
import CommonShimmer from '../components/CommonShimmer.jsx';
import DeleteMember from '../dialogBox/DeleteMember.jsx';
import SwitchStatusDialog from '../dialogBox/SwitchStatusDialog.jsx';
function MemberList() {
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [dialogLoading, setDialogLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const {textColor,memberHeadColor, memberCellColor,activeColor, inActiveColor, activeColorHover, inActiveColorHover, deleteColor, deleteColorHover} =getThemeControl() 
  const fetchMembers = async () => {
    try {
      setLoading(true)
      const members = await getAllmembers();
      const formattedMembers = members.map((member) => ({
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        is_active: member.is_active,
      }));
      setRows(formattedMembers);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers();
  }, [])

  const handleOpenDialog = (type, member) => {
    setDialogType(type);
    setSelectedMember(member);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMember(null);
  };

  const handleConfirmAction = async () => {
    if (!selectedMember) return;
      setDialogLoading(true)
    try {
      if (dialogType === "status") {
        await updateMemberStatus(selectedMember.id, !selectedMember.is_active);
        toast.success("switch status changed")
        }
      if (dialogType === "delete") {
        await deleteMember(selectedMember.id);
        toast.success("Deleted succesfully")
      }
      await fetchMembers();
      setOpenDialog(false);
      setSelectedMember(null)
    } catch (err) {
      const message =
      err?.response?.data?.message ||
      err?.response?.data?.detail ||
      "Operation failed. Please try again.";

    toast.error(message);
    } finally {
      setDialogLoading(false)
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70 },
    { field: 'name', headerName: 'Name', flex: 1.5, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 2, minWidth: 200 },
    { field: 'role', headerName: 'Role', flex: 1, minWidth: 100 },
    {
      field: 'is_active',
      headerName: 'Status',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        return (
          <Button
            disabled={dialogLoading}
            sx={{
              backgroundColor: params.value ? activeColor : inActiveColor,
              color: textColor,
              textTransform: 'none',
              borderRadius: '20px',
              width: '90px',
              height: '30px',
              fontSize: '0.8rem',
              '&:hover': { backgroundColor: params.value ? activeColorHover : inActiveColorHover }
            }}
            onClick={() => handleOpenDialog("status", params.row)}
          >
            {params.value ? 'Active' : 'Inactive'}
          </Button>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        return (
          <Button 
            disabled={dialogLoading}
            onClick={() => handleOpenDialog("delete", params.row)}
            sx={{
              backgroundColor: deleteColor,
              color: textColor,
              textTransform: 'none',
              borderRadius: '20px',
              width: '90px',
              height: '30px',
              fontSize: '0.8rem',
              '&:hover': { backgroundColor: deleteColorHover

              }}}  
          >
            Delete
          </Button>
        );
      }
    }
  ];
 
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
   {loading ? (
      <CommonShimmer type="table" count={8} /> 
    ) : (
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        disableColumnMenu // Simplifies header view
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: memberHeadColor,
            color: textColor,
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: memberHeadColor,
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            color: textColor,
          },
          '& .MuiDataGrid-cell': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color : textColor,
            backgroundColor:memberCellColor
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            justifyContent: 'center',
          }
        }}
      /> )
      }
     <DeleteMember
  open={openDialog && dialogType === "delete"}
  onClose={handleCloseDialog}
  member={selectedMember}
  loading={dialogLoading}
  colors={{
    deleteColor,
    deleteColorHover,
    textColor,
  }}
  onConfirm={handleConfirmAction}
/>

<SwitchStatusDialog
  open={openDialog && dialogType === "status"}
  onClose={handleCloseDialog}
  member={selectedMember}
  loading={dialogLoading}
  colors={{
    activeColor,
    activeColorHover,
    inActiveColor,
    inActiveColorHover,
    textColor,
  }}
  onConfirm={handleConfirmAction}
/>

    </Box>
  );
}

export default MemberList;