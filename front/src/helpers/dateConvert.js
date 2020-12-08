export function dateConvert(date) {
  if (date) {
    return new Date(date).toISOString().slice(0, 10);
  }
  return null;
}

export function calcAge(date) {
  const today = new Date();
  const birth = new Date(date);

  if (
    birth.getFullYear() > 1850 &&
    birth.getFullYear() <= today.getFullYear()
  ) {
    let years = today.getFullYear() - birth.getFullYear();

    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() == birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) {
      years -= 1;
    }

    return years;
  }
  return '';
}
