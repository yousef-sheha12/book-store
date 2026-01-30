import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function LoginPage() {

    const handleLogin = async (values) => {
        console.log(values)
        try {
            const res = await axios.post("http://localhost:1337/api/auth/local", values);
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const lgoinSchema = Yup.object({
        identifier: Yup.string().required("لازم تكتب ايميل").email("يا حبيبي ركز انت مش كاتب ايميل صصح"),
        password: Yup.string().required("لازم تكتب باسوورد")
    })

    return (
        <>
            <div className="h-dvh bg-[#4e0303] flex justify-center items-center">
                <Formik initialValues={{ identifier: "", password: "" }} validationSchema={lgoinSchema} onSubmit={(values) => { handleLogin(values) }}>
                    <Form className="p-5 shadow rounded-lg flex flex-col gap-2 bg-white text-black w-100">
                        <h2 className="text-2xl capitalize font-bold">login form</h2>
                        <label htmlFor="email">Email</label>
                        <Field name="identifier" type="text" id="email" placeholder="Enter yor email"
                            className="border border-[#22222233] rounded-lg p-4 w-full placeholder:text-[#22222280]"
                        />
                        <ErrorMessage name="identifier" component={"p"} className="text-red-500 py-2 font-semibold" />
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" id="password" placeholder="Enter yor password"
                            className="border border-[#22222233] rounded-lg p-4 w-full placeholder:text-[#22222280]"
                        />
                        <ErrorMessage name="password" component={"p"} className="text-red-500 py-2 font-semibold" />
                        <button type="submit" className="btn btn-primary w-full">login</button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}