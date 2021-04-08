import { startCase } from "lodash";
import React, { useEffect, useState } from "react";
import {
  CheckboxProps,
  FormTextAreaProps,
  InputOnChangeData,
} from "semantic-ui-react";
import type { ErrorResult } from "../../pages/api/rpc/[trpc]";

interface FormHelper {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: boolean;
  loading: boolean;
}

type OnChangeHandler<TElement extends HTMLElement, TData> = (
  event: React.ChangeEvent<TElement>,
  data: TData
) => void;

interface FormElementHelper<TValue, TOnChange> {
  name: string;
  label: string;
  value: TValue;
  error: any;
  onChange: TOnChange;
}

type InputHelper = FormElementHelper<
  string,
  OnChangeHandler<HTMLInputElement, InputOnChangeData>
>;

type TextAreaHelper = FormElementHelper<
  string,
  OnChangeHandler<HTMLTextAreaElement, FormTextAreaProps>
>;

type RadioHelper = FormElementHelper<
  boolean,
  OnChangeHandler<HTMLInputElement, CheckboxProps>
>;

type RadioGroupHelper = FormElementHelper<
  string | number,
  OnChangeHandler<HTMLInputElement, CheckboxProps>
>;

interface UseFormHook<TModel extends Record<string, any>> {
  form: FormHelper;
  input: <TAttribute extends keyof TModel>(attr: TAttribute) => InputHelper;
  textarea: <TAttribute extends keyof TModel>(
    attr: TAttribute
  ) => TextAreaHelper;
  radio: <TAttribute extends keyof TModel>(
    attr: TAttribute,
    value: any
  ) => RadioHelper;
  radioGroup: <TAttribute extends keyof TModel>(
    attr: TAttribute
  ) => RadioGroupHelper;
  error: ErrorResult;
  reset: () => void;
}

export function useForm<TModel extends Record<string, any>>(
  initial: Partial<TModel> | Promise<Partial<TModel>>,
  onSubmit: (data: Partial<TModel>, setError: (ErrorResult) => void) => void
): UseFormHook<TModel> {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState<Partial<TModel>>({});
  const [error, setError] = useState<ErrorResult>();

  useEffect(() => {
    Promise.resolve(initial).then((values) => {
      setValues(values);
      setLoading(false);
    });
  }, []);

  function reset() {
    Promise.resolve(initial).then((values) => {
      setValues(values);
      setLoading(false);
    });
  }

  function errorMessage(result: ErrorResult, attr: string) {
    return result?.fieldErrors[attr];
  }

  const form = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      onSubmit(values, (e) => setError(e));
    },
    loading,
    error: !!error,
  };

  function input(attr: keyof TModel) {
    return {
      onChange(
        event: React.ChangeEvent<HTMLInputElement>,
        data: InputOnChangeData
      ) {
        event?.persist();
        setValues({
          ...values,
          [attr]: data.value,
        });
      },
      label: startCase(attr.toString()),
      name: attr as string,
      value: values[attr] || "",
      error: errorMessage(error, attr.toString()),
    };
  }

  function textarea(attr: keyof TModel) {
    return {
      onChange(
        event: React.ChangeEvent<HTMLTextAreaElement>,
        data: FormTextAreaProps
      ) {
        event?.persist();
        setValues({
          ...values,
          [attr]: data.value,
        });
      },
      label: startCase(attr.toString()),
      name: attr as string,
      value: values[attr] || "",
      error: errorMessage(error, attr.toString()),
    };
  }

  function radioGroup(attr: keyof TModel) {
    return {
      onChange(
        event: React.ChangeEvent<HTMLInputElement>,
        data: CheckboxProps
      ) {
        event?.persist();
        setValues({
          ...values,
          [attr]: data.value,
        });
      },
      label: startCase(attr.toString()),
      name: attr as string,
      value: values[attr] || "",
      error: errorMessage(error, attr.toString()),
    };
  }

  function radio<TAttr extends keyof TModel>(attr: TAttr, value: any) {
    return {
      onChange(
        event: React.ChangeEvent<HTMLInputElement>,
        data: CheckboxProps
      ) {
        event?.persist();
        setValues({
          ...values,
          [attr]: data.value,
        });
      },
      label: value,
      name: attr as string,
      value: value === values[attr],
      error: errorMessage(error, attr.toString()),
    };
  }

  return {
    form,
    input,
    textarea,
    radio,
    radioGroup,
    error,
    reset,
  };
}
