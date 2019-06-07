import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Button, Input } from '@storybook/design-system';

const MailingListFormUIWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const EmailInput = styled(Input)`
  flex: 1;
`;

const SendButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const MailingListFormUI = ({ handleBlur, handleChange, isSubmitting, value }) => (
  <MailingListFormUIWrapper>
    <EmailInput
      id="email"
      icon="email"
      type="email"
      name="email"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      autoCapitalize="off"
      autoCorrect="off"
      label={null}
      appearance="secondary"
    />

    <SendButton appearance="secondary" type="submit" isUnclickable={isSubmitting}>
      {'Send'}
    </SendButton>
  </MailingListFormUIWrapper>
);

MailingListFormUI.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  value: PropTypes.string,
};

MailingListFormUI.defaultProps = {
  value: '',
};

const validateForm = values => {
  if (!values.email) {
    return { email: 'Required' };
  }

  return {};
};

const listUrl =
  'https://hichroma.us15.list-manage.com/subscribe/post?u=0cd563f2d5b0ef7aa4471c045&amp;id=17ebbc4cc4';

const onSubmitForm = async values => {
  const data = {
    MERGE0: values.email,
  };

  fetch(listUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    mode: 'no-cors',
  });
};

const MailingListSignup = () => (
  <Formik validate={validateForm} onSubmit={onSubmitForm}>
    {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit}>
        <MailingListFormUI
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          isSubmitting={isSubmitting}
        />
      </form>
    )}
  </Formik>
);

export default MailingListSignup;