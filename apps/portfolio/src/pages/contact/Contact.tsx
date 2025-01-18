import { Button, Page, TextAreaInput, TextInput } from "@notadream/react";

import { ContentBox } from "../../components";

export const Contact = () => {
  return (
    <Page className="contact-page">
      <ContentBox>
        <section className="contact-details">
          <div className="contact-text-container">
            <h1>Contact</h1>
            <p>
              I am always open to new opportunities and collaborations. Feel
              free to reach out to me with any questions or inquiries.
            </p>
          </div>
          <div className="contact-form-container">
            <form className="contact-form">
              <TextInput
                name="first-name"
                fieldSize="medium"
                placeholder="First Name..."
              />
              <TextInput
                name="last-name"
                fieldSize="medium"
                placeholder="Last Name..."
              />
              <TextInput
                name="email"
                fieldSize="medium"
                placeholder="Email..."
              />
              <TextInput
                name="subject"
                fieldSize="medium"
                placeholder="Subject..."
              />
              <TextAreaInput
                name="message"
                fieldSize="medium"
                rows={5}
                placeholder="Message..."
              />
              <Button size="medium" label="Send" />
            </form>
          </div>
        </section>
      </ContentBox>
    </Page>
  );
};
