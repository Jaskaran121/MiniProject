import axios from "axios";

export async function getEvents() {
  var events = [];
  const getEvents = await axios.get('https://gitlab.com/snippets/1871557/raw');
  return getEvents.data;
}