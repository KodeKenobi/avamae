import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumbers: [""],
    message: "",
    includeAddressDetails: false,
    addressDetails: {
      addressLine1: "",
      addressLine2: "",
      cityTown: "",
      stateCounty: "",
      postcode: "",
      country: "",
    },
  });

  // Check if we're on mobile
  const isMobile = window.innerWidth <= 768;
  console.log("Device type:", isMobile ? "Mobile" : "Desktop");
  console.log("User agent:", navigator.userAgent);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        addressDetails: {
          ...prev.addressDetails,
          [addressField]: value,
        },
      }));
    } else if (name === "includeAddressDetails") {
      setFormData((prev) => ({
        ...prev,
        includeAddressDetails: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneNumberChange = (index, value) => {
    const newPhoneNumbers = [...formData.phoneNumbers];
    newPhoneNumbers[index] = value;
    setFormData((prev) => ({
      ...prev,
      phoneNumbers: newPhoneNumbers,
    }));
  };

  const addPhoneNumber = () => {
    setFormData((prev) => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, ""],
    }));
  };

  const removePhoneNumber = (index) => {
    if (formData.phoneNumbers.length > 1) {
      const newPhoneNumbers = formData.phoneNumbers.filter(
        (_, i) => i !== index
      );
      setFormData((prev) => ({
        ...prev,
        phoneNumbers: newPhoneNumbers,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Invalid email address";
    }

    if (
      formData.phoneNumbers.some((phone) => phone.trim() && phone.length > 20)
    ) {
      newErrors.phoneNumbers = "Phone number cannot exceed 20 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message cannot exceed 1000 characters";
    }

    if (formData.includeAddressDetails) {
      if (!formData.addressDetails.addressLine1.trim()) {
        newErrors.addressLine1 =
          "Address line 1 is required when including address details";
      }
      if (!formData.addressDetails.cityTown.trim()) {
        newErrors.cityTown =
          "City/Town is required when including address details";
      }
      if (!formData.addressDetails.stateCounty.trim()) {
        newErrors.stateCounty =
          "State/County is required when including address details";
      }
      if (!formData.addressDetails.postcode.trim()) {
        newErrors.postcode =
          "Postcode is required when including address details";
      } else if (
        !/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i.test(
          formData.addressDetails.postcode
        )
      ) {
        newErrors.postcode = "Invalid UK postcode format";
      }
      if (!formData.addressDetails.country.trim()) {
        newErrors.country =
          "Country is required when including address details";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission started");

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = {
        FullName: formData.fullName,
        EmailAddress: formData.emailAddress,
        PhoneNumbers: formData.phoneNumbers.filter((phone) => phone.trim()),
        Message: formData.message,
        bIncludeAddressDetails: formData.includeAddressDetails,
        AddressDetails: formData.includeAddressDetails
          ? formData.addressDetails
          : undefined,
      };

      console.log("Submitting payload:", payload);
      console.log(
        "API endpoint:",
        "https://interview-assessment.api.avamae.co.uk/api/v1/contact-us/submit"
      );

      const response = await axios.post(
        "https://interview-assessment.api.avamae.co.uk/api/v1/contact-us/submit",
        payload
      );

      console.log("API response:", response.data);

      if (response.data.Status === "Success" || response.data.Status === "1") {
        console.log("Form submitted successfully");
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          emailAddress: "",
          phoneNumbers: [""],
          message: "",
          includeAddressDetails: false,
          addressDetails: {
            addressLine1: "",
            addressLine2: "",
            cityTown: "",
            stateCounty: "",
            postcode: "",
            country: "",
          },
        });
      } else {
        console.log("API returned error status:", response.data.Status);
        setSubmitStatus("error");
        if (response.data.Errors && response.data.Errors.length > 0) {
          console.log("API errors:", response.data.Errors);
          const apiErrors = {};
          response.data.Errors.forEach((error) => {
            if (error.FieldName === "FullName")
              apiErrors.fullName = "Full name is required";
            else if (error.FieldName === "EmailAddress")
              apiErrors.emailAddress = "Invalid email address";
            else if (error.FieldName === "PhoneNumbers")
              apiErrors.phoneNumbers = "Invalid phone number";
            else if (error.FieldName === "Message")
              apiErrors.message = "Message exceeds maximum length";
            else if (error.FieldName === "Postcode")
              apiErrors.postcode = "Invalid UK postcode";
            else if (error.FieldName === "AddressLine1")
              apiErrors.addressLine1 = "Address line 1 is required";
            else if (error.FieldName === "CityTown")
              apiErrors.cityTown = "City/Town is required";
            else if (error.FieldName === "StateCounty")
              apiErrors.stateCounty = "State/County is required";
            else if (error.FieldName === "Country")
              apiErrors.country = "Country is required";
          });
          setErrors(apiErrors);
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-form-container">
              <h1 className="page-title">Contact us</h1>
              <p className="contact-intro">
                Fusce efficitur eu purus ac posuere nean imperdiet risus dolor,
                nec accumsan velit ornare sit amet.
              </p>

              {submitStatus === "success" ? (
                <div className="success-message">
                  <div className="success-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="success-title">
                    YOUR MESSAGE HAS BEEN SENT
                  </div>
                  <div className="success-subtitle">
                    We will be in contact with you within 24 hours.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName" className="form-label">
                        Full name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`input ${
                          errors.fullName ? "input-error" : ""
                        }`}
                      />
                      {errors.fullName && (
                        <span className="error-message">{errors.fullName}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="emailAddress" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        className={`input ${
                          errors.emailAddress ? "input-error" : ""
                        }`}
                      />
                      {errors.emailAddress && (
                        <span className="error-message">
                          {errors.emailAddress}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phone number 01 - optional
                    </label>
                    {formData.phoneNumbers.map((phone, index) => (
                      <div key={index} className="phone-input-group">
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) =>
                            handlePhoneNumberChange(index, e.target.value)
                          }
                          className={`input ${
                            errors.phoneNumbers ? "input-error" : ""
                          }`}
                          placeholder="Enter phone number"
                        />
                        {formData.phoneNumbers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePhoneNumber(index)}
                            className="remove-phone-btn"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addPhoneNumber}
                      className="btn btn-secondary add-phone-btn"
                    >
                      Add new phone number
                    </button>
                    {errors.phoneNumbers && (
                      <span className="error-message">
                        {errors.phoneNumbers}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message
                      <span className="input-info">
                        Maximum text length is 1000 characters
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="6"
                      className={`input ${errors.message ? "input-error" : ""}`}
                    />
                    {errors.message && (
                      <span className="error-message">{errors.message}</span>
                    )}
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="includeAddressDetails"
                        checked={formData.includeAddressDetails}
                        onChange={handleInputChange}
                        className="checkbox-input"
                      />
                      <span className="checkbox-text">Add address details</span>
                    </label>
                  </div>

                  {formData.includeAddressDetails && (
                    <div className="address-details">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="addressLine1" className="form-label">
                            Address line 1
                          </label>
                          <input
                            type="text"
                            id="addressLine1"
                            name="address.addressLine1"
                            value={formData.addressDetails.addressLine1}
                            onChange={handleInputChange}
                            className={`input ${
                              errors.addressLine1 ? "input-error" : ""
                            }`}
                          />
                          {errors.addressLine1 && (
                            <span className="error-message">
                              {errors.addressLine1}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="addressLine2" className="form-label">
                            Address line 2 - optional
                          </label>
                          <input
                            type="text"
                            id="addressLine2"
                            name="address.addressLine2"
                            value={formData.addressDetails.addressLine2}
                            onChange={handleInputChange}
                            className="input"
                          />
                        </div>
                      </div>

                      <div className="form-row-four">
                        <div className="form-group">
                          <label htmlFor="cityTown" className="form-label">
                            City/Town
                          </label>
                          <input
                            type="text"
                            id="cityTown"
                            name="address.cityTown"
                            value={formData.addressDetails.cityTown}
                            onChange={handleInputChange}
                            className={`input ${
                              errors.cityTown ? "input-error" : ""
                            }`}
                          />
                          {errors.cityTown && (
                            <span className="error-message">
                              {errors.cityTown}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="stateCounty" className="form-label">
                            State/County
                          </label>
                          <input
                            type="text"
                            id="stateCounty"
                            name="address.stateCounty"
                            value={formData.addressDetails.stateCounty}
                            onChange={handleInputChange}
                            className={`input ${
                              errors.stateCounty ? "input-error" : ""
                            }`}
                          />
                          {errors.stateCounty && (
                            <span className="error-message">
                              {errors.stateCounty}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="postcode" className="form-label">
                            Postcode
                          </label>
                          <input
                            type="text"
                            id="postcode"
                            name="address.postcode"
                            value={formData.addressDetails.postcode}
                            onChange={handleInputChange}
                            className={`input ${
                              errors.postcode ? "input-error" : ""
                            }`}
                          />
                          {errors.postcode && (
                            <span className="error-message">
                              {errors.postcode}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="country" className="form-label">
                            Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="address.country"
                            value={formData.addressDetails.country}
                            onChange={handleInputChange}
                            className={`input ${
                              errors.country ? "input-error" : ""
                            }`}
                          />
                          {errors.country && (
                            <span className="error-message">
                              {errors.country}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary submit-btn"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="submit-icon"
                    >
                      <path
                        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>

                  {submitStatus === "error" && (
                    <div className="error-message">
                      <strong>Form submission failed!</strong>
                      <br />
                      There was an error submitting your form. Please check the
                      console for details and try again.
                      <br />
                      <small>
                        If the problem persists, please check your internet
                        connection and try again.
                      </small>
                    </div>
                  )}
                </form>
              )}
            </div>

            <div className="contact-graphic">
              <img
                src="/Img_Contact.png"
                alt="Contact us graphic"
                className="contact-image"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
