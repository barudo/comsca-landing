export function getRegistrationPayload(data: FormData) {
  const text = (name: string) => {
    const value = data.get(name);
    return typeof value === "string" ? value : "";
  };
  return {
    firstname: text("firstname").trim(),
    lastname: text("lastname").trim(),
    phone: text("phone").trim(),
    groupName: text("groupName").trim(),
    slug: text("slug").trim(),
    password: text("password"),
  };
}

export function validateRegistrationPayload(payload: ReturnType<typeof getRegistrationPayload>) {
  if (!payload.firstname || !payload.lastname || !payload.phone || !payload.groupName || !payload.slug) {
    return "Please complete your first name, last name, phone number, group name, and group address.";
  }
  if (payload.password.length < 8) return "Your password must contain at least 8 characters.";
  if (new TextEncoder().encode(payload.password).length > 72) {
    return "Your password is too long. Use at most 72 bytes; accented letters and emoji can use more than one byte each.";
  }
  return "";
}
