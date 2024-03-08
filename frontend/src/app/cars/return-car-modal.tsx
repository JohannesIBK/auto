import { Button, Group, Modal, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UseState } from "@/types/react";
import { Car } from "@/types/car";
import { returnCar } from "@/lib/requests";

interface Props {
  open: Car | null;
  setOpen: UseState<Car | null>;
}

function ReturnCarModal({ open, setOpen }: Props) {
  const form = useForm({
    initialValues: {
      distance: 0,
    },
  });

  return (
    <Modal opened={!!open} onClose={() => setOpen(null)} title={"Return Car"}>
      <form
        onSubmit={form.onSubmit(() => {
          returnCar({ carId: open!.id, distance: form.values.distance }).then(() => setOpen(null));
        })}>
        <NumberInput label={"Distance driven"} {...form.getInputProps("distance")} allowNegative={false} />

        <Group>
          <Button type="submit">Return</Button>
          <Button type="button" onClick={() => setOpen(null)} variant={"default"}>
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

export default ReturnCarModal;
