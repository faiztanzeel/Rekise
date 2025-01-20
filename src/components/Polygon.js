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
            {/* <span class="material-symbols-outlined">
          arrow_left_alt
          </span> */}
            Insert Polygon Before
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handlePolygonDrawing("after", index);
            }}
          >
          {/*  <span class="material-symbols-outlined">
          arrow_right_alt
          </span> */}
            Insert Polygon After
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default PolygonRow;
