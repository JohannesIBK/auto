import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UseState } from "@/types/react";
import { createCustomer } from "@/lib/requests";

interface Props {
  open: boolean;
  setOpen: UseState<boolean>;
}

function CreateCustomerModal({ open, setOpen }: Props) {
  const form = useForm({
    initialValues: {
      name: "",
      licence: "",
    },
  });

  return (
    <Modal opened={open} onClose={() => setOpen(false)} title={"Create Customer"}>
      <form
        onSubmit={form.onSubmit((values) => {
          // TODO: Use mutation
          createCustomer(values).then(() => setOpen(false));
        })}>
        <TextInput label={"Name"} {...form.getInputProps("name")} />

        <Group>
          <Button type="submit">Create Customer</Button>
          <Button type="button" onClick={() => setOpen(false)} variant={"default"}>
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

export default CreateCustomerModal;
