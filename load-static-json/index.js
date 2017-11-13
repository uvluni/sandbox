class ImportList {
  constructor() {
    this.list = document.getElementById('list');
    document.getElementById('files').addEventListener('change', event => this.handleFileSelect(event));
  }

  handleFileSelect(event) {
    let files = event.target.files;
    let file = files[0];

    let reader = new FileReader();

    reader.onload = file => {
      this.appendJsonToDom(JSON.parse(file.target.result), this.list);
    };

    reader.readAsText(file);
  }

  appendJsonToDom(data, domElement) {
    data.map(element => {
      if (element === undefined) {
        return;
      }

      let li = document.createElement('li');
      let span = document.createElement('span');
      span.innerHTML = element.name;
      span.setAttribute('data-desc', element.description);
      li.appendChild(span);

      domElement.appendChild(li);

      if (element.sub !== undefined) {
        this.addPlusSign(li);

        let newUl = document.createElement('ul');
        li.appendChild(newUl);
        this.appendJsonToDom(element.sub, newUl);
      }
    });
  }

  addPlusSign(domElement) {
    let plusSign = document.createElement('i');

    plusSign.classList.add('fa', 'fa-plus-square-o');
    plusSign.addEventListener('click', () => domElement.lastChild.classList.toggle('hide'));

    domElement.insertBefore(plusSign, domElement.firstChild);
  }
}

const importList = new ImportList();
