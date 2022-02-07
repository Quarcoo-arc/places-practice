import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromFunction } from "./Utility/Location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render.call(this, coordinates);
    } else {
      this.map = new Map(coordinates);
    }
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Location feature is not available in your browser - please use a more modern browser or manually enter an address."
      );
      return;
    }

    const modal = new Modal(
      "loading-modal-content",
      "Loading location... Please wait!"
    );
    modal.show();

    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        modal.hide(); // hide modal
        const coordinates = {
          lat: successResult.coords.latitude + Math.random() * 50,
          lng: successResult.coords.longitude + Math.random() * 50,
        };
        console.log(coordinates);
        this.selectPlace(coordinates); //show map
      },
      (error) => {
        alert(
          "Could not locate you unfortunately. Please enter an address manually!"
        );
        modal.hide(); // hide modal
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value.trim();
    if (!address) {
      alert("Invalid address entered. Please try again!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location... Please wait!"
    );
    modal.show();

    try {
      const coordinates = await getCoordsFromFunction(address);
      if (await coordinates) {
        modal.hide();
        this.selectPlace(coordinates);
        console.log(coordinates);
      }
    } catch (error) {
      alert(error.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
