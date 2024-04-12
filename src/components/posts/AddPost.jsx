import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  BottomNavigationAction,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

const AddPost = ({ openSidebar }) => {
  const isMobileScreen = useMediaQuery("(max-width:600px)");
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {isMobileScreen ? (
        <BottomNavigationAction
          onClick={() => setOpenModal(true)}
          value="create"
          icon={<AddBoxIcon />}
        ></BottomNavigationAction>
      ) : (
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: openSidebar ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              onClick={() => setOpenModal(true)}
              sx={{
                minWidth: 0,
                mr: openSidebar ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText
              primary="Create"
              sx={{ opacity: openSidebar ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      )}

      <Modal keepMounted open={openModal} onClose={() => setOpenModal(false)}>
        <ModalDialog>
          <DialogTitle>Add post modal</DialogTitle>
          <DialogContent>Post modal content</DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default AddPost;
