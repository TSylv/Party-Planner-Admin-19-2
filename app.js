const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2506-FTB-CT-WEB-PT";
const API = `${BASE_URL}/${COHORT}`;


//Fetch
let state = {
  parties: [],
  selectedParty: null,
};

const fetchParties = async () => {
  try {
    const response = await fetch(`${API}/events`);
    const data = await response.json();
    state.parties = data;
    console.log("Fetched parties:", state.parties);
renderPartyList(state.parties);
  } catch (err) {
    console.error("Error fetching parties:", err);
  }
};

fetchParties();

const fetchSingleParty = async (id) => {
  try {
    const response = await fetch(`${API}/events/${id}`);
    const data = await response.json();
    state.selectedParty = data;
    renderPartyDetails(data);
  } catch (err) {
    console.error("Error fetching single party:", err);
  }
};

function renderPartyList(parties) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const listContainer = document.createElement("div");

  parties.forEach((party) => {
    const partyButton = document.createElement("button");
    partyButton.textContent = party.name;
    partyButton.addEventListener("click", () => {
      fetchSingleParty(party.id);
    });

    listContainer.appendChild(partyButton);
  });

  app.appendChild(listContainer);
}

function renderPartyDetails(party) {
  const app = document.getElementById("app");

  const detailDiv = document.createElement("div");
  detailDiv.innerHTML = `
    <h2>${party.name}</h2>
    <p><strong>Date:</strong> ${new Date(party.date).toLocaleString()}</p>
    <p><strong>Location:</strong> ${party.location}</p>
    <p><strong>Description:</strong> ${party.description}</p>
  `;

  app.appendChild(detailDiv);
}