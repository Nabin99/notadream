import emailjs from "@emailjs/browser";
import {
  Button,
  Page,
  TextAreaInput,
  TextInput,
  BrowserLink,
} from "@notadream/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { ContentBox, SocialLinks } from "../../components";

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    isSubmitting: false,
    successful: false,
    hasError: false,
  });

  useEffect(() => {
    emailjs.init({
      publicKey: "xjbCaLkYMZiZzQOp0",
      // Do not allow headless browsers
      blockHeadless: true,
      blockList: {
        // Block the suspended emails
        list: ["foo@emailjs.com", "bar@emailjs.com"],
        // The variable contains the email address
        watchVariable: "userEmail",
      },
      limitRate: {
        // Set the limit rate for the application
        id: "app",
        // Allow 1 request per 60s
        throttle: 60000,
      },
    });
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // First Name Validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    // Last Name Validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Message Validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    event_: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event_.target.name]: event_.target.value,
    });
  };

  const handleSubmit = async (event_: React.FormEvent) => {
    setSubmissionStatus({
      isSubmitting: true,
      successful: false,
      hasError: false,
    });

    event_.preventDefault();

    if (validateForm()) {
      const response = await emailjs.send(
        "service_8ydegqh",
        "template_tuc61gb",
        formData
      );

      if (response.status === 200) {
        toast.success("Message sent successfully!", {
          position: "bottom-right",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
        setSubmissionStatus({
          isSubmitting: false,
          successful: true,
          hasError: false,
        });
      } else {
        toast.error("Message sent Failed!", {
          position: "bottom-right",
        });
        setSubmissionStatus({
          isSubmitting: false,
          successful: false,
          hasError: true,
        });
      }
    } else {
      setSubmissionStatus({
        isSubmitting: false,
        successful: false,
        hasError: false,
      });
    }
  };

  return (
    <Page className="contact-page">
      <ContentBox>
        <section className="contact-details">
          <div className="contact-info">
            <h1>
              Contact <span>Me</span>
            </h1>
            <p className="contact-title">
              Let&apos;s Build Something <span>Amazing Together</span>
            </p>
            <p className="contact-description">
              Thank you for taking the time to explore my portfolio. Whether
              you&apos;re looking to collaborate, have a project in mind, or
              just want to say hello, I&apos;d be delighted to connect with you.
              Please feel free to use the form below, email me directly, or find
              me on social media.
            </p>
            <p className="contact-email">
              Reach me directly at:
              <BrowserLink
                variant="borderless"
                size="small"
                href="mailto:dhitalnabin224@gmail.com"
              >
                dhitalnabin224@gmail.com
              </BrowserLink>
            </p>

            <div>
              <SocialLinks />
            </div>
          </div>
          <div className="background-art left"></div>
          <div className="background-art right"></div>
          <div className="contact-form">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>
                Have a question or want to <span>work together?</span>
              </h2>
              <p>
                I&apos;d love to hear from you! Feel free to drop a message, and
                I&apos;ll respond promptly.
              </p>

              <TextInput
                name="firstName"
                fieldSize="medium"
                placeholder="First Name..."
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />

              <TextInput
                name="lastName"
                fieldSize="medium"
                placeholder="Last Name..."
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />

              <TextInput
                name="email"
                fieldSize="medium"
                placeholder="Your Email..."
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <TextInput
                name="subject"
                fieldSize="medium"
                placeholder="Subject..."
                value={formData.subject}
                onChange={handleChange}
              />

              <TextAreaInput
                name="message"
                fieldSize="medium"
                rows={8}
                placeholder="Tell me about your project, query, or idea here..."
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
              />

              {submissionStatus.hasError && (
                <p className="error-message">
                  There was an error sending your message. Please try again
                  later.
                </p>
              )}

              <Button
                size="medium"
                type="submit"
                label="Send Message"
                loading={submissionStatus.isSubmitting}
              />
            </form>
          </div>
        </section>
        <ToastContainer />
      </ContentBox>
    </Page>
  );
};
