import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UseState } from "@/types/react";
import { createCar } from "@/lib/requests";

interface Props {
  open: boolean;
  setOpen: UseState<boolean>;
}

function ReturnCarModal({ open, setOpen }: Props) {
  const form = useForm({
    initialValues: {
      name: "",
      licence: "",
    },
  });

  return (
    <Modal opened={open} onClose={() => setOpen(false)} title={"Create Car"}>
      <form
        onSubmit={form.onSubmit((values) => {
          // TODO: Use mutation
          createCar(values).then(() => setOpen(false));
        })}>
        <TextInput label={"Name"} {...form.getInputProps("name")} />
        <TextInput label={"Licence"} {...form.getInputProps("licence")} />

        <Group>
          <Button type="submit">Create car</Button>
          <Button type="button" onClick={() => setOpen(false)} variant={"default"}>
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

export default ReturnCarModal;
