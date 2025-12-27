import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { getAllmembers, deleteMember, updateMemberStatus } from '../api/MemberApi.js';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Box , Typography} from "@mui/material";
import {toast} from 'react-toastify'
import { getThemeControl } from '../utils.js';
function MemberList() {
  const [rows, setRows] = useState([]);
  const [loadingRowId, setLoadingRowId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const {textColor,memberHeadColor, memberCellColor,activeColor, inActiveColor, activeColorHover, inActiveColorHover} =getThemeControl() 
  const fetchMembers = async () => {
    try {
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
    setLoadingRowId(selectedMember.id);
    handleCloseDialog();
    try {
      if (dialogType === "status") {
        try{
        await updateMemberStatus(selectedMember.id, !selectedMember.is_active);
        toast.success("switch status changed")
        }
        catch(err){
          toast.error("Member was taken book from library")
        }
        
      }
      if (dialogType === "delete") {
        try{
        await deleteMember(selectedMember.id);
        toast.success("Deleted succesfully")
        }
        catch(err){
          toast.error("Member was taken book from library")
        }
      }
      await fetchMembers();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRowId(null);
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
        const isLoading = loadingRowId === params.row.id;
        return (
          <Button
            disabled={isLoading}
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
            {isLoading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : (params.value ? 'Active' : 'Inactive')}
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
        const isLoading = loadingRowId === params.row.id;
        return (
          <Button
            variant="outlined"
            color="error"
            size="small"
            disabled={isLoading}
            onClick={() => handleOpenDialog("delete", params.row)}
            sx={{ borderRadius: '8px' }}
          >
            {isLoading ? <CircularProgress size={16} color="inherit" /> : 'Delete'}
          </Button>
        );
      }
    }
  ];
 
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogType === "delete" ? "Confirm Delete" : "Confirm Status Change"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {dialogType === "delete" 
              ? `Are you sure you want to delete ${selectedMember?.name}?`
              : `Change status of ${selectedMember?.name} to ${selectedMember?.is_active ? 'Inactive' : 'Active'}?`
            }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleConfirmAction} 
            variant="contained" 
            color={dialogType === "delete" ? "error" : "primary"}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MemberList;