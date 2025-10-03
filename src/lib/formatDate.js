
export function formatBrazilDate(datetime) {
  if (!datetime) return "";

  return new Date(datetime).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
