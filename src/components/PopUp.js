import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 640,
  bgcolor: "background.paper",
  boxShadow: 28,
  p: 2,
  outline: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const PopUpModal = ({ open, handleClose, handleGenerateData }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box>
          <Typography variant="h6" component="h2">
            Mission Creation
          </Typography>
          <Paper
            elevation={3}
            sx={{ p: 2, mt: 2, border: 1, borderColor: "grey.300" }}
          >
            <Typography>
            Click on the map to mark points of the route and then press ↩ complete the route.
            </Typography>
          </Paper>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateData}
          >
            Generate Data
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PopUpModal;
