import axios from "axios";

export async function getEvents() {
  const getEvents = await axios.get('https://gitlab.com/snippets/1871557/raw');
  return getEvents.data;
}

export async function postEvents(data){
  console.log(data)
  //const getEvents = await axios.post("Put your localhost api url here",{
  //   event:data.currentEvent,
  //   email:data.email,
  //   name:data.name,
  //   city:data.currentCity
  // })
  return data
}
