import { useState, useCallback, type ChangeEvent } from "react";
import type { TranslationStructure } from "../../types";
import { CONTACT, EMAIL_REGEX, COLORS, SIZES } from "../../config";

interface Props {
  t: TranslationStructure["contact"];
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ t }: Props) {
  const f = t.form;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!fields.name.trim()) e.name = f.required;
    if (!fields.email.trim()) e.email = f.required;
    else if (!EMAIL_REGEX.test(fields.email)) e.email = f.invalidEmail;
    if (!fields.message.trim()) e.message = f.required;
    return e;
  }

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch(CONTACT.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setFields({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="form-success">
        <div className="form-success__icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="t-body-md" style={{ color: "var(--c-on-surface)" }}>
          {f.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex-col gap-10">
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 8 }}>
        <Field
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          label={f.name}
          placeholder={f.namePlaceholder}
          value={fields.name}
          error={errors.name}
          focused={focused === "name"}
          onChange={handleChange}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
        />
        <Field
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          label={f.email}
          placeholder={f.emailPlaceholder}
          value={fields.email}
          error={errors.email}
          focused={focused === "email"}
          onChange={handleChange}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
        />
      </div>

      <TextareaField
        id="cf-message"
        name="message"
        label={f.message}
        placeholder={f.messagePlaceholder}
        value={fields.message}
        error={errors.message}
        focused={focused === "message"}
        onChange={handleChange}
        onFocus={() => setFocused("message")}
        onBlur={() => setFocused(null)}
      />

      {status === "error" && (
        <p className="t-label-md form-label--error" style={{ marginTop: -4 }}>
          {f.error}
        </p>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 4,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-filled"
          style={{
            opacity: status === "submitting" ? 0.65 : 1,
            cursor: status === "submitting" ? "not-allowed" : "pointer",
          }}
        >
          {status === "submitting" ? (
            <>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ animation: "spin 0.8s linear infinite" }}
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              {f.submitting}
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              {f.submit}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  name: string;
  type: string;
  autoComplete?: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  focused: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
}

function labelClass(hasError: boolean, focused: boolean) {
  const parts = ["t-label-sm", "form-label"];
  if (hasError) parts.push("form-label--error");
  else if (focused) parts.push("form-label--focused");
  return parts.join(" ");
}

function fieldClass(hasError: boolean) {
  return hasError ? "form-field form-field--error" : "form-field";
}

function Field({
  id,
  name,
  type,
  autoComplete,
  label,
  placeholder,
  value,
  error,
  focused,
  onChange,
  onFocus,
  onBlur,
}: FieldProps) {
  const hasError = !!error;
  return (
    <div className="flex-col gap-6">
      <label htmlFor={id} className={labelClass(hasError, focused)}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={fieldClass(hasError)}
        style={{ fontSize: SIZES.form.inputFontSize }}
      />
      {hasError && <p className="t-label-sm form-error">{error}</p>}
    </div>
  );
}

interface TextareaFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  focused: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
}

function TextareaField({
  id,
  name,
  label,
  placeholder,
  value,
  error,
  focused,
  onChange,
  onFocus,
  onBlur,
}: TextareaFieldProps) {
  const hasError = !!error;
  return (
    <div className="flex-col gap-6">
      <label htmlFor={id} className={labelClass(hasError, focused)}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`${fieldClass(hasError)} form-field--textarea`}
        style={{ fontSize: SIZES.form.inputFontSize, minHeight: SIZES.form.textareaMinHeight }}
      />
      {hasError && <p className="t-label-sm form-error">{error}</p>}
    </div>
  );
}
