/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Modal, Box } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
};
const CustomeModalt: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="absolute  left-[50%] -translate-x-1/2 translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none"
        sx={{
          maxHeight: "90vh", // Ensures the modal doesn't overflow on smaller screens
          overflowY: "auto", // Adds scroll if the content overflows vertically
        }}
      >
        <Component setRoute={setRoute} setOpen={setOpen} />
      </Box>
    </Modal>
  );
};

export default CustomeModalt;
