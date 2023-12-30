const opacitySpeed = 1;
function slowOpacity(textDiv, visionDiv) {
    let showParagraph = (i) => {
      let getFinish = new Promise((res, rej) => {
        textDiv.children[i].style.display = 'block';
        textDiv.children[i].classList.add('slowOpacity');
        let paragraph = textDiv.children[i].innerHTML;
        textDiv.children[i].innerHTML = '';
        let j = 0;
        let interval = setInterval(() => {
          textDiv.children[i].innerHTML += paragraph[j];
          j++;
          if (j == paragraph.length) {
            textDiv.children[i].classList.remove('slowOpacity');
            res();
            clearInterval(interval)


          }
        }, opacitySpeed);
      })
      getFinish.then(() => {
        if (i < textDiv.children.length - 1) {
          showParagraph(++i);
        } else {
          visionDiv.style.display = 'block';
          visionDiv.style.opacity = 1;

        }

      })
    }

    showParagraph(0);
  }
  export default slowOpacity;