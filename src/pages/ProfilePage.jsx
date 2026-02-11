import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuthStore } from "../store";

const ProfilePage = () => {
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get("http://localhost:1337/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      updateUser(res.data);
    };
    fetchUserData();
  }, []);

  const userData = useAuthStore((state) => state.userData);
  const updateUser = useAuthStore((state) => state.updateUser);
  const token = useAuthStore((state) => state.token);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("الاسم الأول مطلوب"),
    lastName: Yup.string().required("الاسم الأخير مطلوب"),
    email: Yup.string().email("بريد غير صالح").required("البريد مطلوب"),
    phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
    address: Yup.string().required("العنوان مطلوب"),
  });

  const initialValues = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    phoneNumber: userData?.phoneNumber || "",
    address: userData?.address || "",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-2xl mt-20">
        <h2 className="text-center text-xl font-bold mb-8 text-gray-800">
          General information
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const res = await axios.put(
                `http://localhost:1337/api/users/${userData.id}`,
                values,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );

              updateUser(res.data);

              alert("Profile Updated Successfully! 🎉");
            } catch (error) {
              console.error("Error updating profile:", error.response?.data);
              alert(
                "Update failed: " +
                  (error.response?.data?.error?.message || "Check Permissions"),
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5 text-black">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-400 mb-1">
                    First Name
                  </label>
                  <Field
                    name="firstName"
                    className="p-3 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-pink-500"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="span"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-400 mb-1">
                    Last Name
                  </label>
                  <Field
                    name="lastName"
                    className="p-3 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-pink-500"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="span"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-400 mb-1">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="p-3 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-pink-500"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-400 mb-1">
                  Phone number
                </label>
                <Field
                  name="phoneNumber"
                  className="p-3 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-pink-500"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="span"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-400 mb-1">Address</label>
                <Field
                  name="address"
                  className="p-3 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-pink-500"
                />
                <ErrorMessage
                  name="address"
                  component="span"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#d61f69] text-white px-10 py-3 rounded-lg font-semibold hover:bg-[#b01a56] transition-all disabled:bg-gray-400"
                >
                  {isSubmitting ? "جاري التحديث..." : "Update information"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfilePage;
