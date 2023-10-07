"use client";
import { newMealSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import CreateMeal from "./CreateMeal";

export type FormSchemaType = z.infer<typeof newMealSchema>;

const CreateTemplateMealPage: FC = () => {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(newMealSchema),
  });
  return (
    <FormProvider {...methods}>
      <CreateMeal />
    </FormProvider>
  );
};

export default CreateTemplateMealPage;
