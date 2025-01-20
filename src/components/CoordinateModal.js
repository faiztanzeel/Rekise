import React, { useEffect, useState } from "react";
import CoordinateInfo from "./CoordInfo";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PolygonRow from "./Polygon";

const CoordinateModal = ({ drawData, handlePolygonDrawing }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (drawData.length > 0) {
      setOpen(true);
    }
  }, [drawData]);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  return (
    <div>
      {isMobile && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          Open Modal
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            position: "absolute",
            top: isMobile ? "auto" : "20px",
            left: isMobile ? "auto" : "20px",
            padding: "24px 0",
            margin: 0,
            width: isMobile ? "" : "640px",
            pointerEvents: "auto",
          },
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: '#f0f0f0',
          color: '#333', 
          padding: '16px 24px'
        }}>Mission Creation</DialogTitle>
        <DialogContent style={{ pointerEvents: "auto" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>WP</TableCell>
                  <TableCell>Coordinates</TableCell>
                  <TableCell>Distance (m)</TableCell>
                  <TableCell><span class="material-symbols-outlined">
upload
</span></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drawData?.map((item, index) =>
                  item.type === "polygon" ? (
                    <PolygonRow
                      key={index}
                      index={index}
                      handlePolygonDrawing={handlePolygonDrawing}
                      handleClose={handleClose}
                    />
                  ) : (
                    <CoordinateInfo
                      key={index}
                      data={item}
                      coord1={index !== 0 ? drawData[index - 1] : ""}
                      index={index}
                      handlePolygonDrawing={handlePolygonDrawing}
                      handleClose={handleClose}
                    />
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoordinateModal;
