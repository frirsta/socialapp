import React from "react";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

const PostMenu = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "text", color: "neutral" } }}
      >
        <MoreHoriz />
      </MenuButton>
      <Menu>
        <MenuItem component="button" onClick={handleEdit}>
          Edit
        </MenuItem>
        <MenuItem component="button" onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default PostMenu;
