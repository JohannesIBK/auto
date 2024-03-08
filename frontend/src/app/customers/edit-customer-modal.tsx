import { Button, Modal } from "@mantine/core";
import { UseState } from "@/types/react";
import { deleteCustomer } from "@/lib/requests";
import { Customer } from "@/types/customer";

interface Props {
  open: Customer | null;
  setOpen: UseState<Customer | null>;
}

function EditCustomerModal({ open, setOpen }: Props) {
  return (
    <Modal opened={!!open} onClose={() => setOpen(null)} title={"Edit customer"}>
      <Button
        color={"red"}
        onClick={() => {
          // TODO: Use mutation
          deleteCustomer(open!.id).then(() => {
            setOpen(null);
          });
        }}>
        Delete Customer
      </Button>
    </Modal>
  );
}

export default EditCustomerModal;
