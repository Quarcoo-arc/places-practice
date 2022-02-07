import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import {
  getCoordsFromFunction,
  getAddressFromCoords,
} from "./Utility/Location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");

    // this.shareBtn.addEventListener("click");
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render.call(this, coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
    const sharedLinkInputEl = document.getElementById("share-link");
    sharedLinkInputEl.value = `${location.origin}/my-place?address=${encodeURI(
      address
    )}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
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
      async (successResult) => {
        const coordinates = {
          lat: successResult.coords.latitude + Math.random() * 50,
          lng: successResult.coords.longitude + Math.random() * 50,
        };
        try {
          const address = await getAddressFromCoords(coordinates);
          console.log(coordinates);
          this.selectPlace(coordinates, address); //show map
        } catch (error) {
          alert(error.message);
        }
        modal.hide(); // hide modal
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
        this.selectPlace(coordinates, address);
        console.log(coordinates);
      }
    } catch (error) {
      alert(error.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
