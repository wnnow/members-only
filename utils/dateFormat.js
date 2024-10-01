function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
}

module.exports = { formatDate };
