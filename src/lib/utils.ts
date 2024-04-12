export function getColorByDay(day: string) {
  switch (day) {
    case "Monday":
      return "red";
    case "Tuesday":
      return "orange";
    case "Wednesday":
      return "yellow";
    case "Thursday":
      return "green";
    case "Friday":
      return "blue";
    case "Saturday":
      return "pink";
    case "Sunday":
      return "purple";
    default:
      return "gray";
  }
}
