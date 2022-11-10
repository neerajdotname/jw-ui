import React, { useEffect, useCallback, useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import { Form as FormikForm, useFormikContext } from "formik";

const FormWrapper = forwardRef(({ formProps, children, onSubmit }, ref) => {
  const internalFormWrapperRef = useRef(null);
  const formRef = ref || internalFormWrapperRef;

  const { values, validateForm, setErrors, setTouched } = useFormikContext();

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key !== "Enter") return;

      if (event.shiftKey) {
        event.preventDefault();
        return;
      } else {
        validateForm().then((errors) => {
          if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setTouched(errors);
          } else {
            onSubmit(values);
          }
        });
        event.preventDefault();
      }
    },
    [values, validateForm, setErrors, setTouched, onSubmit]
  );

  useEffect(() => {
    formRef?.current.addEventListener("keydown", handleKeyDown);

    return () => {
      formRef?.current.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSubmit, values, handleKeyDown, formRef]);

  return (
    <FormikForm noValidate ref={formRef} {...formProps}>
      {children}
    </FormikForm>
  );
});

FormWrapper.propTypes = {
  children: PropTypes.node,
  formProps: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default FormWrapper;