function showNewWork(data) {
  const worksContainer = document.querySelector(".works-section-content");
  const workTemplate = document.querySelector("#work-template");
  data.map((e) => {
    let workImg = workTemplate.content.querySelector(".work-img");
    workImg.setAttribute("src", e.img);
    workImg.setAttribute("alt", e.altImg);
    let workTitle = workTemplate.content.querySelector(".work-content-title");
    workTitle.textContent = e.title;
    let workDesc = workTemplate.content.querySelector(".work-content-desc");
    workDesc.textContent = e.description;
    let workLink = workTemplate.content.querySelector(".work-content-link");
    workLink.setAttribute("href", e.url);
    //acá "clono" el contenido del template
    const node = document.importNode(workTemplate.content, true);
    //acá agrego cada template al worksContainer
    worksContainer.appendChild(node);
  });
}

function createNewWork(json) {
  const newWork = json.items.map((e) => {
    let altImg = "";
    let img = "";
    //busco la url de la imagen por el id, ya que vienen por lugares separados
    for (const elementContainingImg of json.includes.Asset) {
      if (elementContainingImg.sys.id == e.fields.imagen.sys.id) {
        img = elementContainingImg.fields.file.url;
        altImg = elementContainingImg.fields.title;
      }
    }
    const data = {
      title: e.fields.titulo,
      description: e.fields.descripcion,
      url: e.fields.url,
      altImg: altImg,
      img: "https:" + img,
    };
    return data;
  });
  //devuelvo newWork que es una collection con todos los items
  return newWork;
}
function getContentfulEntries() {
  return fetch(
    "https://cdn.contentful.com/spaces/8b7skyzta8a4/environments/master/entries?access_token=CjFhI4GUCiIEaGDAcFuIesyrsqz8jjfJwUU4559oCGw"
  ).then((res) => {
    return res.json();
  });
}

function main() {
  getContentfulEntries().then((json) => {
    const newWork = createNewWork(json);
    showNewWork(newWork);
  });
}
main();
