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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { schemaResultForm } from "./schemas/schema-result";

const FormDynamic = () => {
  const form = useForm<z.infer<typeof schemaResultForm>>({
    resolver: zodResolver(schemaResultForm),
    defaultValues: {
      results: [
        {
          raffle_id: 1,
          reward_concept_id: 1,
          resultNumber: "1234",
          resultSerie: "123",
        },
      ],
    },
    mode: "onBlur",
  });

  async function onSubmit({ ...values }: z.infer<typeof schemaResultForm>) {
    const data = {
      results: values.results.map((result) => ({
        raffle_id: result.raffle_id,
        reward_concept_id: result.reward_concept_id,
        number: `${result.resultNumber};${result.resultSerie}`,
      })),
    };
    console.log(data);
  }
  const { fields, append, remove } = useFieldArray({
    name: "results",
    control: form.control,
  });

  return (
    <div className="w-full h-full p-10">
      <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
      <div>
        <Form {...form}>
          <div className="my-4">
            <h1 className="text-2xl font-medium">Complete Form</h1>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col w-full gap-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center justify-center gap-4"
                >
                  <FormField
                    control={form.control}
                    name={`results.${index}.raffle_id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rafle ID</FormLabel>
                        <FormControl>
                          <Input disabled {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`results.${index}.reward_concept_id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reward Concept ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
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

                  <Button
                    variant={"destructive"}
                    type="button"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                onClick={() => {
                  append({
                    raffle_id: 1,
                    reward_concept_id: 1,
                    resultNumber: "1234",
                    resultSerie: "123",
                  });
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
    </div>
  );
};

export default FormDynamic;
