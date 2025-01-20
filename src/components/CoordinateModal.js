import React, { useEffect, useState } from "react";
import './../App.css';
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
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
            boxShadow: 24,
            borderRadius: "28px",
            top: isMobile ? "auto" : "20px",
            left: isMobile ? "auto" : "20px",
            padding: "24px 0",
            margin: 0,
            width: isMobile ? "" : "640px",
            pointerEvents: "auto",
          },
        }}
      >
        <Paper
            elevation={2}
            sx={{ p: 2, mt: 2, border: 0.5, borderColor: "grey.200" }}
          >
        <DialogTitle sx={{ 
          // backgroundColor: '#f0f0f0',
          color: '#333', 
          padding: '16px 24px',
          
        }}>Mission Creation</DialogTitle></Paper>
        <DialogContent style={{ pointerEvents: "auto" }}>
          <TableContainer>
            <Table>
              <TableHead >
                <TableRow >
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell><strong>WP</strong></TableCell>
                  <TableCell><strong>Coordinates</strong></TableCell>
                  <TableCell><strong>Distance (m)</strong></TableCell>
                  <TableCell><span className="material-symbols-outlined">
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
        <Paper
            elevation={2}
            sx={{ p: 2, mt: 2, border: 0.5, borderColor: "grey.200" }}
          >
            <Typography>
            Click on the map to mark points of the route and then press ↩ complete the route.
            </Typography>
          </Paper>
        <div className="mission-box-footer">
        <button className="generate-button">Generate Data</button>
      </div>

      </Dialog>      
      
    </div>
  );
};

export default CoordinateModal;
