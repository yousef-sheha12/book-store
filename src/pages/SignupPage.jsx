import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const navigate = useNavigate();

    const handleRegister = async (values) => {
        if (values.password !== values.confirmPassword) {
            alert("password not matching")
        } else {
            const data = {
                username: values.username,
                email: values.email,
                password: values.password
            }
            try {
                const res = await axios.post("http://localhost:1337/api/auth/local/register", data);
                navigate("/login")
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const registerSchema = Yup.object({
        username: Yup.string().required().max(10),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        confirmPassword: Yup.string().required()
    })

    return (
        <div className="h-dvh bg-[#630505] flex justify-center items-center">
            <Formik initialValues={{ username: "", email: "", password: "", confirmPassword: "" }} validationSchema={registerSchema} onSubmit={(values) => { handleRegister(values) }}>
                <Form className="p-5 shadow rounded-lg flex flex-col gap-2 bg-white text-black w-100">
                    <h2 className="text-2xl capitalize font-bold">sign up form</h2>
                    <label htmlFor="username">username</label>
                    <Field name="username" type="text" id="username" placeholder="Enter your username"
                        className="border border-[#22222233] rounded-lg p-4 w-full placeholder:text-[#22222280]"
                    />
                    <ErrorMessage name="username" component={"p"} className="text-red-500 py-2 font-semibold" />
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" id="email" placeholder="Enter your email"
                        className="border border-[#22222233] rounded-lg p-4 w-full placeholder:text-[#22222280]"
                    />
                    <ErrorMessage name="email" component={"p"} className="text-red-500 py-2 font-semibold" />
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" id="password" placeholder="Enter your password"
                        className="border border-[#22222233] rounded-lg p-4 w-full placeholder:text-[#22222280]"
                    />
                    <ErrorMessage name="password" component={"p"} className="text-red-500 py-2 font-semibold" />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field name="confirmPassword" type="password" id="confirmPassword" placeholder="Enter confirm password"
                        className="border border-[#22222233] rounded-lg p-4 w-full placeholder:text-[#22222280]"
                    />
                    <ErrorMessage name="confirmPassword" component={"p"} className="text-red-500 py-2 font-semibold" />
                    <button type="submit" className="btn btn-primary w-full">Register</button>
                </Form>
            </Formik>
        </div>
    )
}