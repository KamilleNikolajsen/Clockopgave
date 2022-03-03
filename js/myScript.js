const url = "http://worldtimeapi.org/api/timezone/";

let intervalID;
const dropdown = document.getElementById('dropdown');
dropdown.addEventListener('change', selectTimeZone);


function getTimeZones(){
  return fetch(url).then(response => {
    return response.json()
  });
}

function fillDropDown(item, index){
  const el = document.createElement("option");
  el.textContent = item;
  el.value = index;


  dropdown.appendChild(el);
}

async function dropDown(){
  const timeZoneList = await getTimeZones();
  timeZoneList.forEach(fillDropDown);
}

function selectTimeZone(){
  dropdown.value;
  const selindex = dropdown.selectedIndex;
  const selectedTimeZone = dropdown.options[selindex];
  //console.log(selindex);
  //console.log(selectedTimeZone);
  //console.log(selectedTimeZone.innerText);
  //console.log(selectedTimeZone.value);
  getTime(selectedTimeZone);
  return selectedTimeZone;
}


async function getTime(timezone) {

  console.log("Interval ID: ", intervalID);
  clearInterval(intervalID);

  console.log(timezone);

  let options = {
      timeZone: timezone.innerText,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
    formatter = new Intl.DateTimeFormat([],options);

  intervalID = setInterval(() => {
    console.log(formatter.format(new Date()));
    document.getElementById('time').innerText = formatter.format(new Date());
  }, 1000);
  console.log(intervalID)

}

dropDown();







