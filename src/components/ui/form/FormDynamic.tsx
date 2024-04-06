"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { schemaResultForm } from "./schemas/schema-result";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const conceptOptions = [
  {
    value: "1",
    label: "Premio 1",
  },
  {
    value: "2",
    label: "Premio 2",
  },
  {
    value: "3",
    label: "Premio 3",
  },
];

const raffleOptions = [
  { value: "4506", label: "4506", product: "Product 1", product_id: "1" },
  { value: "4520", label: "4520", product: "Product 2", product_id: "2" },
  { value: "4869", label: "4869", product: "Product 3", product_id: "3" },
];

const FormDynamic = () => {
  const form = useForm<z.infer<typeof schemaResultForm>>({
    resolver: zodResolver(schemaResultForm),
    defaultValues: {
      raffle_id: "",
      product_id: "",
      results: [
        {
          reward_concept_id: "",
          resultNumber: "1234",
          resultSerie: "123",
        },
      ],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "results",
    control: form.control,
  });

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  async function onSubmit({ ...values }: z.infer<typeof schemaResultForm>) {
    const raffle_id = Number(values.raffle_id);
    const product_id = Number(values.product_id);
    const data = {
      results: values.results.map((result) => ({
        product_id,
        raffle_id,
        reward_concept_id: Number(result.reward_concept_id),
        number: `${result.resultNumber};${result.resultSerie}`,
      })),
    };
    console.log(data);
    form.reset();
  }

  React.useEffect(() => {
    form.setValue("raffle_id", value);
    form.setValue(
      "product_id",
      raffleOptions.find((item) => item.value === value)?.product_id ?? ""
    );
  }, [value, form]);

  return (
    <div className="w-full h-full p-10">
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[195px] justify-between dark:text-white"
            >
              {value
                ? `${
                    raffleOptions.find((item) => item.value === value)?.label
                  } - ${
                    raffleOptions.find((item) => item.value === value)?.product
                  }`
                : "Seleccione un sorteo"}
              <ChevronsUpDown className="hidden w-4 h-4 ml-2 opacity-50 shrink-0 lg:block" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Buscar sorteo" />
              <CommandList>
                <CommandEmpty>Sorteo no encontrado.</CommandEmpty>
                <CommandGroup>
                  {raffleOptions.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        if (currentValue === value) {
                          setOpen(false);
                        } else {
                          setValue(currentValue);
                          setOpen(false);
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {`${item.label} - ${item.product}`}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {value && value !== "" && (
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-end justify-center gap-4 mx-auto w-fit"
            >
              <h1 className="text-2xl font-medium text-center">
                Complete Form
              </h1>

              <div className="flex flex-col w-full gap-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-center gap-4"
                  >
                    <FormField
                      control={form.control}
                      name={`results.${index}.reward_concept_id`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reward Concept ID</FormLabel>
                          <Select onValueChange={field.onChange} {...field}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione un concepto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {conceptOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`results.${index}.resultNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Result Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`results.${index}.resultSerie`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Result Serie</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {fields.length > 1 && (
                      <Button
                        variant={"destructive"}
                        type="button"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    if (fields.length < conceptOptions.length) {
                      append({
                        reward_concept_id: "",
                        resultNumber: "1234",
                        resultSerie: "123",
                      });
                    }
                  }}
                >
                  Add
                </Button>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default FormDynamic;
