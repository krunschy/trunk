import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "./Input";
import { UpdateUser, User } from "../../api/auth/register";
import { getRandomInt } from "../../helpers/getRandomInt";
import { Button } from "./Button";
import { updateMe } from "../../api/users/updateMe";
import { toast } from "react-toastify";

interface UpdateUserFormProps {
  user: User,
}

const updateUser = {
  email: yup.string().email().required(),
  userName: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  isBio: yup.boolean(),
  isVegan: yup.boolean(),
  isVegetarian: yup.boolean(),
};

const updateUserSchema = yup.object().shape(updateUser);

const updateInitialValues = (user: User): UpdateUser => ({
  email: user.email || '',
  userName: user.userName || '',
  firstName: user.firstName || '',
  lastName: user.lastName || '',
  isBio: user.isBio || false,
  isVegan: user.isVegan || false,
  isVegetarian: user.isVegetarian || false,
});

const mOrF = getRandomInt(2);

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const form = useFormik({
    initialValues: updateInitialValues(user),
    validationSchema: updateUserSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        await updateMe(values as UpdateUser);
        toast.success('User wurde erfolgreich aktualisiert!');
      } catch {
        toast.error('User wurde aktualisiert! Bitte versuchen Sie es nocheinmal!');
      }
    },
  });

  return (
    <div className="sm:max-w-sm max-w-[100vw] p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h1
        className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-3xl dark:text-white"
      >
        User aktualisieren
      </h1>
      <form className="max-w-[100vw] sm:max-w-md" onSubmit={form.handleSubmit}>
        <Input
          id="email"
          type="email"
          label="E-Mail Adresse"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.email}
          errors={form.touched.email && !!form.errors?.email}
          placeholder={mOrF === 0 ? 'max.mustermann@email.com' : 'erika.musterfrau@email.com'}
          errorMessage={form.errors.email}
        />
        <Input
          id="userName"
          type="text"
          label="Username"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.userName}
          placeholder={mOrF === 0 ? 'Max86' : 'Erika007'}
          errors={form.touched.userName && !!form.errors?.userName}
          errorMessage={form.errors.userName}
        />
        <Input
          id="firstName"
          type="text"
          label="Vorname"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.firstName}
          placeholder={mOrF === 0 ? 'Max' : 'Erika'}
          errors={form.touched.firstName && !!form.errors?.firstName}
          errorMessage={form.errors.firstName}
        />
        <Input
          id="lastName"
          type="text"
          label="Familienname"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.lastName}
          placeholder={mOrF === 0 ? 'Mustermann' : 'Musterfrau'}
          errors={form.touched.lastName && !!form.errors?.lastName}
          errorMessage={form.errors.lastName}
        />
        <Button type="submit">Speichern</Button>
      </form>
    </div>
  );
}
