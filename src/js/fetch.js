const input = document.getElementById(`input-query`);

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// const renderProfileBlock = () => {
//         const markup = `<li>
//       <div id="image-box">
//         <img id="image"/>
//         <div id="institution-name-box">
//           <p id="institution-name"></p>
//         </div>
//         <div id="launch-icon"></div>
//         <div id="map-icon"></div>
//       </div>
//     </div>
//     </li>`;
// insertAdjacentHTML(beforeend, markup)
// };

class ProfileManager {
  constructor(button) {
    this.page = 0;
    this.button = button;
    this.insertProfile(0);
    this.button.onclick = this.insertProfile;
  }

  insertProfile = async () => {
    const profiles = await this.getInstitutionProfiles(this.page);
    const parentPre = document.getElementById("container");
    removeAllChildNodes(parentPre);
    console.log(profiles);

    const ul = document.createElement("ul");
    const div1 = document.createElement("div");

    //loop through
    for (let record of profiles.data.records) {
      const li = document.createElement("li");

      const div2 = document.createElement("div");
      const img = document.createElement("img");
      const title = document.createElement("h2");
      const paragraph = document.createElement("p");

      // image stuff
      img.src = record.capex_profile_img;
      // img.style.height = "200px";
      // img.style.width = "400px";

      //div stuff
      div1.id = "inner-container";
      div2.id = "image-box";
      //paragraph
      paragraph.id = "location-name";

      // header title stuff
      title.innerText = record.name;
      paragraph.innerText = `${record.city}, ${record.state}`;

      div1.appendChild(div2);
      div2.appendChild(img);
      div2.appendChild(title);
      div2.appendChild(paragraph);
    }

    //Display the Page number
    const page = document.getElementById("display-page");
    page.innerHTML = `Page: ${this.page + 1}`;

    parentPre.appendChild(div1);
    this.page++;
  };

  getInstitutionProfiles = async (page = 0) => {
    const data = await fetch(
      `https://search.youvisit.com/institution-profiles?page=${page}`
    );
    return await data.json();
  };
}

const main = async () => {
  const btn = document.getElementById("btn");
  const profile = new ProfileManager(btn);
};
window.onload = () => {
  main();
};
