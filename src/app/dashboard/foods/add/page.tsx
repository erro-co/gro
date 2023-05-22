"use client";
import AddNewFoodForm from "@/components/forms/AddNewFood";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { newFoodSchema } from "@/lib/schemas";

export type FormSchemaType = z.infer<typeof newFoodSchema>;
const AddNewFoodPage: FC = () => {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(newFoodSchema),
    defaultValues: {
      servings: [{ measure: "", grams: undefined }],
    },
  });
  return (
    <FormProvider {...methods}>
      <AddNewFoodForm />
    </FormProvider>
  );
};

export default AddNewFoodPage;
