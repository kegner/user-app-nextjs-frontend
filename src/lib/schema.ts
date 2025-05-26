import z from 'zod';

const FormSchema = z.object({
  id: z.string().readonly(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z
    .string()
    .email({ message: 'Email not in the correct format' })
    .nonempty(),
});

export const CreateUserSchema = FormSchema.omit({ id: true });
export const UpdateUserSchema = FormSchema;

export type UserFormSchema = z.infer<typeof FormSchema>;
