import emailjs from "@emailjs/browser";
import {
  Button,
  Page,
  TextAreaInput,
  TextInput,
  BrowserLink,
  useTranslation,
  getAppConfig,
} from "@notadream/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { ContentBox, SocialLinks } from "../../components";

export const Contact = () => {
  const email = getAppConfig().appEmail;
  const { t } = useTranslation("contactPage");

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
      newErrors.firstName = t("form.fieldsError.firstName.required");
    }

    // Last Name Validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = t("form.fieldsError.lastName.required");
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t("form.fieldsError.email.required");
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t("form.fieldsError.email.invalidFormat");
    }

    // Message Validation
    if (!formData.message.trim()) {
      newErrors.message = t("form.fieldsError.message.required");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("form.fieldsError.message.insufficient");
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
        toast.success(t("form.toastMessage.success"), {
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
        toast.error(t("form.toastMessage.failed"), {
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
              {t("title").split("$$$")[0]}
              <span>{t("title").split("$$$")[1]}</span>
            </h1>
            <p className="contact-title">
              {t("subtitle").split("$$$")[0]}
              <span>{t("subtitle").split("$$$")[1]}</span>
            </p>
            <p className="contact-description">{t("description")}</p>
            <p className="contact-email">
              {t("directContact")}
              <BrowserLink
                variant="borderless"
                size="small"
                href={`mailto:${email}`}
              >
                {email}
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
                {t("form.title").split("$$$")[0]}{" "}
                <span>{t("form.title").split("$$$")[1]}</span>
              </h2>
              <p>{t("form.caption")}</p>

              <TextInput
                name="firstName"
                fieldSize="medium"
                placeholder={t("form.fields.firstName")}
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />

              <TextInput
                name="lastName"
                fieldSize="medium"
                placeholder={t("form.fields.lastName")}
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />

              <TextInput
                name="email"
                fieldSize="medium"
                placeholder={t("form.fields.email")}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <TextInput
                name="subject"
                fieldSize="medium"
                placeholder={t("form.fields.subject")}
                value={formData.subject}
                onChange={handleChange}
              />

              <TextAreaInput
                name="message"
                fieldSize="medium"
                rows={5}
                placeholder={t("form.fields.message")}
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
              />

              <Button
                size="medium"
                type="submit"
                label={t("form.button.submit")}
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
