import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const PolygonRow = ({
  data,
  coord1,
  index,
  handlePolygonDrawing,
  handleClose,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    handleClose();
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>{String(index + 1).padStart(2, "0")}</TableCell>
      <TableCell>Polygon</TableCell>
      <TableCell>N/A</TableCell>
      <TableCell>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handlePolygonDrawing("before", index);
            }}
          >
            
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7CA7D8"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg>
            Insert Polygon Before
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handlePolygonDrawing("after", index);
            }}
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7CA7D8"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
          
            Insert Polygon After
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default PolygonRow;
