import React, { useState } from "react";
import LineString from "ol/geom/LineString";
import { getLength } from "ol/sphere";
import {
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const getDistance = (c1, c2) => {
  const line = new LineString([c1, c2]);
  return getLength(line) * 100 * 1000;
};

const CoordinateInfo = ({
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
    setAnchorEl(null);
  };

  return (
    data && (
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>{String(index + 1).padStart(2, "0")}</TableCell>
        <TableCell>{Array.isArray(data) ? data.join(", ") : "N/A"}</TableCell>
        <TableCell>
          {coord1 && coord1.type !== "polygon"
            ? getDistance(data, coord1).toFixed(1)
            : "N/A"}
        </TableCell>
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
              Insert Polygon Before
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handlePolygonDrawing("after", index);
              }}
            >
              Insert Polygon After
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    )
  );
};

export default CoordinateInfo;
