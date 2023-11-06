export function Converttimeformat(time) {
  let hrs = Number(time.match(/^(\d+)/)[1]);
  let mnts = Number(time.match(/:(\d+)/)[1]);
  let formatTime = time.match(/\s(.*)$/)[1];

  if (formatTime == "PM" && hrs < 12) hrs = hrs + 12;
  if (formatTime == "AM" && hrs == 12) hrs = hrs - 12;

  let hours = hrs.toString();
  let minutes = mnts.toString();

  if (hrs < 10) hours = "0" + hours;
  if (mnts < 10) minutes = "0" + minutes;

  return {hours, minutes};
}
