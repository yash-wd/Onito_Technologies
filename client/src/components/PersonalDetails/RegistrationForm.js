import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./RegistrationForm.css";

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your Name"),
  dob: Yup.string().required("Please enter your Date of Birth or Age"),
  sex: Yup.mixed()
    .oneOf(["male", "female", "other"])
    .required("Please enter your Sex"),
  mobile: Yup.string().matches(/^[6-9]\d{9}$/, "Invalid mobile number"),
  emergency_contact: Yup.string().matches(
    /^[6-9]\d{9}$/,
    "Invalid emergency contact number"
  ),
  govt: Yup.string()
    .oneOf(["Aadhar", "PAN"])
    .required("Please select a valid Govt Issued ID Type"),
  govtId: Yup.string()
    .when("govt", (govt, schema) => {
      return govt === "Aadhar"
        ? schema
            .matches(/^\d{12}$/, "Invalid Aadhar number")
            .required("Please enter your Aadhar number")
        : schema
            .matches(/^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/, "Invalid PAN number")
            .required("Please enter your PAN number");
    })
    .nullable(),
});

function RegistrationForm() {
  const [
    // eslint-disable-next-line
    formValues,
    setFormValues,
  ] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const govt = watch("govt");

  const onSubmit = (data) => {
    console.log(data);
    fetch("http://localhost:5000/api/users/post", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancel = () => {
    setFormValues({});
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      handleCancel();
    }
    if (e.ctrlKey && e.key === "s") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <h1>User Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} onKeyPress={handleKeyPress}>
        <h2>Personal Details</h2>
        <div className="sectionn">
          <label htmlFor="name">
            Name<span className="mandatory">*</span>{" "}
          </label>
          <input
            placeholder="Enter Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="error-message">
              {/* Please enter your Name */}
              {errors.name.message}
            </span>
          )}
          <label htmlFor="dob">
            Date of Birth or Age<span className="mandatory">*</span>{" "}
          </label>
          <input
            type="number"
            placeholder="DD/MM/YYYY or Age in Years"
            {...register("dob", { required: true })}
          />
          {errors.dob && (
            <span className="error-message">
              {/* Please enter your Date of Birth or Age */}
              {errors.dob.message}
            </span>
          )}
          <label htmlFor="sex">
            Sex<span className="mandatory">*</span>{" "}
          </label>
          <select {...register("sex", { defaultValue: "" })}>
            <option value="">Enter Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>{" "}
        </div>

        <div className="sectionn">
          <label htmlFor="mobile">Mobile </label>
          <input
            type="number"
            placeholder="Enter Mobile"
            {...register("mobile", { required: true })}
          />
          {errors.mobile && (
            <span className="error-message">
              {/* Please enter your Mobile Number */}
              {errors.mobile.message}
            </span>
          )}

          <label htmlFor="govt">Govt Issued ID </label>
          <select {...register("govt")}>
            <option value="">ID Type</option>
            <option value="Aadhar">Aadhar</option>
            <option value="PAN">PAN</option>
            <option value="other">Other</option>
          </select>

          {govt === "Aadhar" && (
            <div>
              <label htmlFor="govtId"></label>
              <input type="text" {...register("govtId")} />
              {errors.govtId && (
                <span className="error-message">{errors.govtId.message}</span>
              )}
            </div>
          )}

          {govt === "PAN" && (
            <div>
              <label htmlFor="govtId"></label>
              <input type="text" {...register("govtId")} />
              {errors.govtId && (
                <span className="error-message">{errors.govtId.message}</span>
              )}
            </div>
          )}
        </div>

        <h2>Contact Details</h2>
        <div className="sectionn">
          <label htmlFor="guardian">Guardian Details </label>
          <select {...register("guardian")}>
            <option value="">Enter Label</option>
            <option value="parent">Parent</option>
            <option value="guardian">Guardian</option>
            <option value="other">Other</option>
          </select>
          <input
            placeholder="Enter Guardian Name"
            {...register("guardianName")}
          />

          <label htmlFor="email">Email </label>
          <input
            placeholder="Enter Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="error-message">Please enter your Email ID</span>
          )}

          <label htmlFor="emergency_contact">Emergency Contact Number </label>
          <input
            type="number"
            placeholder="Enter Emergency No."
            {...register("emergency_contact", { required: true })}
          />
          {errors.emergency_contact && (
            <span className="error-message">
              Please enter your Emergency Contact Number
            </span>
          )}
        </div>

        <h2>Address Details</h2>
        <div className="sectionn">
          <label htmlFor="address">Address </label>
          <input placeholder="Enter Address" {...register("address")} />

          <label htmlFor="state">State </label>
          <select {...register("state")}>
            <option value="">Enter State</option>
            <option value="andhra">Andhra Pradesh</option>
            <option value="telangana">Telangana</option>
            <option value="karnataka">Karnataka</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="orissa">Orissa</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="city">City </label>
          <select {...register("city")}>
            <option value="">Enter City/Town/Village</option>
            <option value="vizag">Vizag</option>
            <option value="hyderabad">Hydderabad</option>
            <option value="banglore">Banglore</option>
            <option value="mumbai">Mumbai</option>
            <option value="bhubanshwar">Bhubaneshwar</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="sectionn">
          <label htmlFor="country">Country</label>
          <input placeholder="Enter Country" {...register("country")} />

          <label htmlFor="pincode">Pincode</label>
          <input
            type="number"
            placeholder="Enter Pincode"
            {...register("pincode")}
          />
        </div>

        <h2>Other Details</h2>
        <div className="sectionn">
          <label htmlFor="occupation">Occupation</label>
          <input placeholder="Enter Occupation" {...register("occupation")} />

          <label htmlFor="religion">Religion</label>
          <select {...register("religion")}>
            <option value="">Enter Religion</option>
            <option value="hindu">Hindu</option>
            <option value="muslim">Muslim</option>
            <option value="christian">Christian</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="marital_status">Marital Status</label>
          <select {...register("marital_status")}>
            <option value="">Enter Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>

          <label htmlFor="blood_group">Blood Group</label>
          <select {...register("blood_group")}>
            <option value="">Group</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="ab">AB</option>
            <option value="o">O</option>
          </select>
        </div>

        <div className="sectionn">
          <label htmlFor="nationality">Nationality</label>
          <input placeholder="Enter Nationality" {...register("occupation")} />
        </div>

        <div className="button-container">
          <input type="button" value={`CANCEL\n(ESC)`} onClick={handleCancel} />
          <input type="submit" value={`SUBMIT\n⊞  S`} />
        </div>
      </form>
    </>
  );
}

export default RegistrationForm;
